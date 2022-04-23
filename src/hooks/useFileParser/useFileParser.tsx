import localforage from 'localforage';
import { v4 as uuidV4 } from 'uuid';
import { aesDecrypt, aesEncrypt, pbkdf2KeyGenerate } from "@amir4rab/crypto";

// utils functions //
import { fileReader, fileUnifier } from '@/utils/frontend/fileUtils';
import { encryptAndStoreFileWorkerized, readAndDecryptFileWorkerized } from '@/utils/frontend/fileCrypto/fileCrypto';
import { writeChunkToLocalForage, readChunkFromLocalForage } from '@/utils/frontend/localforageHelper';
import { addPadding, removePadding } from '@/utils/frontend/padding'
import { encryptedFileReader, encryptedFileUnifier, readEncryptedFileHead } from '@/utils/frontend/fileUtils/fileUtils';

// types //
import { FileHead } from '@/types/file';

const useFileParser = () => {

  //** Cleanup Method **//
  const cleanUp = ( uuid = 'temporary-file' ) => {
    localforage.dropInstance({ name: 'files-storage', storeName: uuid })
  }

  //** Encrypt file Method **//

  const encryptFile = ( file: File, password: string ) => new Promise<string | null>( async (resolve) => {
    try {
      const randomUuid = uuidV4();
      const fileData = await fileReader(file);
      const result = await encryptAndStoreFileWorkerized( fileData, randomUuid, password, true );

      if ( !result ) {
        resolve(null)
      }

      const array: string[] = [];
      
      const key = await pbkdf2KeyGenerate(password);
      const encryptedHead = await aesEncrypt(
        JSON.stringify(fileData.head),
        key
      )
      const encryptedHeadWithPadding = addPadding(encryptedHead, 32_000);
      array.push(encryptedHeadWithPadding);

      for ( let i = 0; i< fileData.head.chunks; i++ ) {
        const { file } = await readChunkFromLocalForage( randomUuid, `${i}`);
        array.push(file !== null ? file : '');
      }

      const unifiedFile = await encryptedFileUnifier(array);
      const url = URL.createObjectURL(unifiedFile);

      cleanUp(randomUuid);
      console.log(fileData.head.chunks);

      resolve(url)
    } catch(err) {
      console.error(err);
      resolve(null);
    }
  })

  //** Decrypt file Method **//
  interface SuccessfulDecryptedFile {
    error: null;
    url: string;
    head: FileHead;
  };
  interface FailedDecryptedFile {
    error: string;
    url: null;
    head: null;
  };
  const decryptFile = ( file: File, password: string ) => new Promise< SuccessfulDecryptedFile | FailedDecryptedFile >( async ( resolve ) => {
    //*****                                                                              *****//
    //**                                                                                    **//
    //**   Method spec:                                                                     **//
    //**   must extract head from body                                                      **//
    //**   must slice body into chunks and store it in temporary storage inside IndexedDB   **//
    //**   must decrypt body and unify it again an return unified body and head             **//
    //**                                                                                    **//
    //*****                                                                              *****//

    const randomUuid = uuidV4();
    const fileData = await encryptedFileReader(file);
    
    const key = await pbkdf2KeyGenerate(password)
    
    const headString = removePadding(fileData.headBase64);

    let decryptedHeadString = '';
    try {
      decryptedHeadString = await aesDecrypt(headString, key);
    } catch {
      resolve({ error: 'falsePassword', url: null, head: null });
      return;
    }
    
    const decryptedHead = await JSON.parse(decryptedHeadString) as FileHead;
    
    const encryptedHead = await aesEncrypt(fileData.head, key);
    await writeChunkToLocalForage( encryptedHead, 'head', randomUuid );

    for ( let i = 0; i < fileData.head.chunks; i++ ) {
      await writeChunkToLocalForage(fileData.data[i], `${i}` , randomUuid );
    }

    const { file: decryptedFile, status } = await readAndDecryptFileWorkerized( randomUuid, password, true );
    
    if ( status === 'failed' || decryptedFile === null ) {
      resolve({ error: 'falsePassword', url: null, head: null });
      return;
    }

    cleanUp(randomUuid);
    
    const unifiedFile = await fileUnifier({ data: decryptedFile.data, head: decryptedHead });
    const url = URL.createObjectURL(unifiedFile);

    resolve({ url, head: decryptedHead, error: null });
  });

  const verifyFilePassword = async ( file: File, password: string ) => {
    try {
      const base64ileHead = await readEncryptedFileHead(file)
      
      const key = await pbkdf2KeyGenerate(password)
      
      const headString = removePadding(base64ileHead);

      const decryptedHeadString = await aesDecrypt(headString, key);

      if ( decryptedHeadString === '' ) return false;

      return true;
    } catch {
      return false;
    }
  }

  return ({ encryptFile, decryptFile, verifyFilePassword })
}

export default useFileParser