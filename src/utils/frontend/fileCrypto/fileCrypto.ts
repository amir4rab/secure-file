import * as Comlink from "comlink";
import { FileCryptoWorker } from './fileCrypto.worker';
import { File } from '@/types/file';
import { EncryptedFile, EncryptedFileHead } from '@/types/encryptedFile';
import { aesKeyGenerate, aesEncrypt, aesDecrypt, wrapCryptoKey, unwrapCryptoKey, pbkdf2KeyGenerate } from '@amir4rab/crypto';
import { writeChunkToLocalForage, readChunkFromLocalForage } from '@/utils/frontend/localforageHelper';

export const encryptFile = async ( file: File, aesKey: string ): Promise<EncryptedFile> => {
  const encryptingKey = await aesKeyGenerate();
  const wrappedKey = await wrapCryptoKey(encryptingKey, aesKey);

  const encryptedData: string[] = [];
  for( let i = 0; i < file.data.length ; i++ ) {
    const encryptedChunk = await aesEncrypt( file.data[i], encryptingKey );
    encryptedData[i] = encryptedChunk;
  }

  const head: EncryptedFileHead = {
    ...file.head,
    wrappedKey: wrappedKey,
    route: 'test'
  }

  return ({
    head,
    data: encryptedData
  })
}

export const decryptFile = async ( encryptedFile: EncryptedFile, aesKey: string ): Promise<File> => {
  const decryptingKey = await unwrapCryptoKey(encryptedFile.head.wrappedKey, aesKey);

  const data: string[] = [];
  for( let i = 0; i < encryptedFile.data.length ; i++ ) {
    const decryptedChunk = await aesDecrypt( encryptedFile.data[i], decryptingKey );
    data[i] = decryptedChunk;
  }

  return ({
    head: encryptedFile.head,
    data
  })
}

export const encryptAndStoreFile = async ( file: File, uuid: string, password: string, stats: boolean = true ): Promise<Boolean> => {
  try {
    const operationStartTime = performance.now();
    const mainKey = await pbkdf2KeyGenerate(password);
    const encryptingKey = await aesKeyGenerate();
    const wrappedKey = await wrapCryptoKey(encryptingKey, mainKey);

    const head: EncryptedFileHead = {
      ...file.head,
      wrappedKey: wrappedKey,
      route: 'test'
    }
    const encryptedHead = await aesEncrypt(head, mainKey);
    await writeChunkToLocalForage(encryptedHead, 'head', uuid);

    for( let i = 0; i < file.data.length ; i++ ) {
      const encryptedChunk = await aesEncrypt( file.data[i], encryptingKey );
      await writeChunkToLocalForage(encryptedChunk, `${i}`, uuid);
    }

    const operationEndTime = performance.now();
    if ( stats ) console.log(`Operation took ${((operationEndTime - operationStartTime)/100).toFixed(0)}ms`);
    return true;
  } catch(err) {
    console.error(err);
    return false
  }
};

type ReadAndDecryptFileResult = { status: 'failed', file: null } | { status: 'successful', file: EncryptedFile };
export const readAndDecryptFile = async ( uuid: string, password:string ): Promise<ReadAndDecryptFileResult> => {
  try {
    const mainKey = await pbkdf2KeyGenerate(password);

    const { file: encryptedHead, status } = await readChunkFromLocalForage(uuid, 'head');
    if ( status === 'failed' ) {
      console.error( 'failed to find file head with uuid of: ' + uuid );
      return ({ status: 'failed', file: null });
    }

    const decryptedHeadString = await aesDecrypt( encryptedHead, mainKey );
    const head = JSON.parse(decryptedHeadString) as EncryptedFileHead;

    const decryptingKey = await unwrapCryptoKey(head.wrappedKey, mainKey);


    const data: string[] = [];
    for( let i = 0; i < head.chunks ; i++ ) {
      const { file: encryptedChunk, status } = await readChunkFromLocalForage(uuid, `${i}`);

      if ( status === 'failed' ) {
        console.error( 'failed to find chunk number ' + i + ', with file uuid of: ' + uuid );
        return ({ status: 'failed', file: null });
      };

      const decryptedChunk = await aesDecrypt( encryptedChunk, decryptingKey );
      data[i] = decryptedChunk;
    };

    return ({
      file:  {
        head,
        data
      },
      status: 'successful'
    })
  } catch(err) {
    console.error(err);
    return ({ status: 'failed', file: null })
  }
  
};

const getChunkSizes = ( totalChunks: number, chunkSlices: number ) => {
  const chunkSize = +(totalChunks / chunkSlices).toFixed(0);

  const resultArray: { start: number, end: number }[] = [];
  for ( let i = 0; i < chunkSlices; i++ ) {
    resultArray.push({
      start: i * chunkSize,
      end: chunkSlices === i + 1 ? totalChunks : ( i + 1 ) * chunkSize,
    })
  }
  return resultArray;
}

const getCores = () => navigator.hardwareConcurrency > 1 ? navigator.hardwareConcurrency - 1 : navigator.hardwareConcurrency;

const encryptChunkArray = async ( uuid:string, encryptingKey:string, chunkArray: string[], startChunk: number ) => {
  const worker = Comlink.wrap(new Worker(new URL('./fileCrypto.worker.ts', import.meta.url))) as FileCryptoWorker;
  const result = await worker.encryptAndStoreArray(chunkArray, uuid, encryptingKey, startChunk);
  return result;
};

const decryptChunkArray = async ( uuid: string, encryptingKey: string, startChunk: number, endChunk: number ) => {
  const worker = Comlink.wrap(new Worker(new URL('./fileCrypto.worker.ts', import.meta.url))) as FileCryptoWorker;
  const result = await worker.readAndDecryptArray(uuid, encryptingKey, startChunk, endChunk);
  return result;
};

export const encryptAndStoreFileWorkerized = async ( file: File, uuid: string, password: string, passwordAsDecryptingKey= false, stats: boolean = true ): Promise<Boolean> => {
  try {
    const operationStartTime = performance.now();

    const mainKey = await pbkdf2KeyGenerate(password);
    const encryptingKey = !passwordAsDecryptingKey ? await aesKeyGenerate() : mainKey;
    const wrappedKey = !passwordAsDecryptingKey ? await wrapCryptoKey(encryptingKey, mainKey) : '';

    const head: EncryptedFileHead = {
      ...file.head,
      wrappedKey: wrappedKey,
      route: 'test'
    }
    const encryptedHead = await aesEncrypt(head, mainKey);
    await writeChunkToLocalForage(encryptedHead, 'head', uuid);

    const cpuThreads = getCores();
    const chunks = getChunkSizes(file.data.length, cpuThreads);

    let operationWasSuccessful = true;
    const result = await Promise.all(chunks.map(({ start, end }) => encryptChunkArray( uuid, encryptingKey, file.data.slice(start, end), start )))
    operationWasSuccessful = !result.join(' ').includes('false')
    if ( !operationWasSuccessful ) {
      return false;
    }

    const operationEndTime = performance.now();
    if ( stats ) console.log(`Operation took ${((operationEndTime - operationStartTime)/100).toFixed(0)}ms`);
    return true;
  } catch(err) {
    console.error(err);
    return false
  }
};

export const readAndDecryptFileWorkerized = async ( uuid: string, password:string, passwordAsDecryptingKey= false ): Promise<ReadAndDecryptFileResult> => {
  try {

    const mainKey = await pbkdf2KeyGenerate(password);

    const { file: encryptedHead, status } = await readChunkFromLocalForage(uuid, 'head');
    if ( status === 'failed' ) {
      console.error( 'failed to find file head with uuid of: ' + uuid );
      return ({ status: 'failed', file: null });
    }

    
    const decryptedHeadString = await aesDecrypt( encryptedHead, mainKey );
    const head = JSON.parse(decryptedHeadString) as EncryptedFileHead;
    
    const decryptingKey = passwordAsDecryptingKey ? mainKey : await unwrapCryptoKey(head.wrappedKey, mainKey);
    
    
    const data: string[] = [];
    
    const cpuThreads = getCores();

    if ( cpuThreads > head.chunks ) {
      const result = await (decryptChunkArray( uuid, decryptingKey, 0, head.chunks ));
      
      if ( result === null ) return ({ status: 'failed', file: null });
  
      return ({
        file:  {
          head,
          data: result
        },
        status: 'successful'
      })
    } else {
      const chunks = getChunkSizes(head.chunks, cpuThreads);
  
      let operationWasSuccessful = true;
      const result = await Promise.all(chunks.map(({ start, end }) => {
        return (decryptChunkArray( uuid, decryptingKey, start, end ));
      }))
      result.forEach(item => {
        if ( item?.length === 0 || item === null ) {
          operationWasSuccessful = false;
          return;
        };
        data.push(...item)
      })
      if ( !operationWasSuccessful ) return ({ status: 'failed', file: null });
  

      return ({
        file:  {
          head,
          data
        },
        status: 'successful'
      })
    }
  } catch(err) {
    console.error(err);
    return ({ status: 'failed', file: null })
  }
  
};