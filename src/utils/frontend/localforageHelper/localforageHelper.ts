import localforage from 'localforage';
import { EncryptedFile, EncryptedFileHead } from "@/types/encryptedFile";


type ReadFileResult = {
  status: 'failed',
  file: null,
} | {
  status: 'successful',
  file: EncryptedFile
}
export const readFileFromLocalForage = async ( fileId: string ): Promise<ReadFileResult> => {
  try {
    const instance = localforage.createInstance({ name: fileId });
    
    const head = await instance.getItem('head') as EncryptedFileHead;

    if ( head === null ) {
      return ({
        status: 'failed',
        file: null
      })
    }

    const data: string[] = [];
    for( let i = 0; i < head.chunks; i++ ) {
      const chunk = await instance.getItem(`${i}`) as string;
      data[i] = chunk;
    }
  
    const encryptedFile: EncryptedFile = {
      head,
      data
    }
    return ({
      status: 'successful',
      file: encryptedFile
    });
  } catch(err) {
    console.error(err);
    return ({
      status: 'failed',
      file: null
    });
  }
};

type ReadChunkResult = {
  status: 'failed',
  file: null,
} | {
  status: 'successful',
  file: string,
}
export const readChunkFromLocalForage = async ( fileId: string, chunkId: string ): Promise<ReadChunkResult> => {
  try {
    const instance = localforage.createInstance({ name: 'files-storage', storeName: fileId });
    
    const chunk = await instance.getItem(chunkId);

    if ( chunk === null ) {
      return ({
        status: 'failed',
        file: null,
      })
    }


    return ({
      status: 'successful',
      file: chunk as string,
    });
  } catch(err) {
    console.error(err);
    return ({
      status: 'failed',
      file: null,
    });
  }
};

export const writeFileToLocalForage = async ( file: EncryptedFile, uuid: string ): Promise<Boolean> => {
  try {
    const instance = localforage.createInstance({ name: 'files-storage', storeName: uuid });
    await instance.setItem('head', file.head);
    for( let i = 0; i < file.data.length; i++ ) {
      await instance.setItem(`${i}`, file.data[i]);
    }
    return true
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const writeChunkToLocalForage = async ( chunk: string, chunkId: string, uuid: string ): Promise<Boolean> => {
  try {
    const instance = localforage.createInstance({ name: 'files-storage', storeName: uuid });
    await instance.setItem(chunkId, chunk);
    return true
  } catch (err) {
    console.error(err);
    return false;
  }
};