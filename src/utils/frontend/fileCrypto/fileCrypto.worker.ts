import * as Comlink from "comlink";
import { aesEncrypt, aesDecrypt } from '@amir4rab/crypto';
import { writeChunkToLocalForage, readChunkFromLocalForage } from '@/utils/frontend/localforageHelper';

const encryptAndStoreArray = async ( dataArray: string[], uuid: string, encryptingKey: string, startChunk: number = 0 ): Promise<Boolean> => {
  try {
    let startIndex = 0;
    for( let i = startChunk; i < dataArray.length + startChunk ; i++ ) {
      const encryptedChunk = await aesEncrypt( dataArray[startIndex], encryptingKey );
      await writeChunkToLocalForage(encryptedChunk, `${i}`, uuid);
      startIndex++
    }
    return true;
  } catch(err) {
    console.error(err);
    return false
  }
};

const readAndDecryptArray = async ( uuid: string, decryptingKey:string, chunkStartRange: number, chunkEndRange: number ): Promise<string[] | null> => {
  try {
    const data: string[] = [];
    for( let i = chunkStartRange; i < chunkEndRange ; i++ ) { 
      const { file: encryptedChunk, status } = await readChunkFromLocalForage(uuid, `${i}`);
      if ( status === 'failed' ) {
        console.error( 'failed to find chunk number ' + i + ', with file uuid of: ' + uuid );
        return null;
      };

      const decryptedChunk = await aesDecrypt( encryptedChunk, decryptingKey );
      data.push(decryptedChunk);
    };

    return (data);
  } catch(err) {
    console.error(err);
    return null
  }
};

export interface FileCryptoWorker {
  encryptAndStoreArray: ( dataArray: string[], uuid: string, encryptingKey: string, startChunk?: number ) => Promise<Boolean>;
  readAndDecryptArray: ( uuid: string, decryptingKey:string, chunkStartRange: number, chunkEndRange: number ) => Promise<string[] | null>;
}

const fileCryptoWorker: FileCryptoWorker = {
  encryptAndStoreArray,
  readAndDecryptArray
}

Comlink.expose(fileCryptoWorker);