import { useState, useEffect, useCallback } from "react";
import { FileEvent, CurrentRout, InteractionEvent, IsLoading, FolderArray, Folder } from '@/types/useFileManager';
import localforage, { key } from 'localforage';
import { v4 as uuidV4 } from 'uuid';

// utils functions //
import { fileReader, fileUnifier } from '@/utils/frontend/fileUtils';
import { encryptAndStoreFileWorkerized, readAndDecryptFileWorkerized } from '@/utils/frontend/fileCrypto/fileCrypto';

// hooks //
import useAuth from "../useAuth";
import useStorageQuota from "../useStorageQuota";

// types //
import { aesDecrypt, aesEncrypt, pbkdf2KeyGenerate } from "@amir4rab/crypto";

const useFileManager = () => {
  const { quota, usage } = useStorageQuota();
  const { uuidV5NameSpace } = useAuth();
  const [ isLoading, setIsLoading ] = useState< IsLoading >(true);
  const [ currentRout, setCurrentRout ] = useState< CurrentRout >([{ name: 'Home', uuid: 'root-folder' }]);
  const [ filesArray, setFilesArray ] = useState< FolderArray >([]);

  const getCurrentRout = () => currentRout[currentRout.length - 1].uuid;

  const interactionEvent: InteractionEvent = async ( id: string ) => {
    return true;
  };

  const storeFolder = async ( filesArray: FolderArray ,folderUuid: string ) => {
    const password = sessionStorage.getItem('password') as string;
    const key = await pbkdf2KeyGenerate(password);

    const encryptedFolder = await aesEncrypt(JSON.stringify({
      folder: filesArray
    }), key);

    try {
      if( folderUuid === 'root-folder' ) {
        await localforage.setItem('root-folder', encryptedFolder);
      } else {
        const instance = localforage.createInstance({ name: 'folders-storage', storeName: folderUuid });
        await instance.setItem('content', encryptedFolder);
      }
    } catch (err) {
      console.error(`Something went wrong when storing a folder with uuid of ${folderUuid}`,err)
    }
  };

  const readFolder = useCallback(async ( folderUuid: string ): Promise<{ operation: 'unsuccessful', result: null }|{ operation: 'successful', result: FolderArray }> => {
    const password = sessionStorage.getItem('password') as string;
    const key = await pbkdf2KeyGenerate(password);
    
    let encryptedFolder = null
    if ( folderUuid === 'root-folder' ) {
      encryptedFolder = await localforage.getItem('root-folder');
    } else {
      const instance = localforage.createInstance({ name: 'folders-storage', storeName: folderUuid });
      encryptedFolder = await instance.getItem('content');
    }

    if ( encryptedFolder === null ) {
      return ({
        result: null,
        operation: 'unsuccessful'
      })
    }

    const decryptedFolder = await aesDecrypt(encryptedFolder as string, key);
    const { folder } = await JSON.parse(decryptedFolder) as ({ folder: FolderArray });
    return ({
      result: folder,
      operation: 'successful'
    });
  }, []);

  const fileEvent: FileEvent = async ( id: string, event: 'open' | 'extract' | 'delete' ) => {
    const password = sessionStorage.getItem('password');
  
    
    if ( password === null || uuidV5NameSpace === null ) {
      console.log(`Couldn't found key from session storage!`)
      return ({ result: null, operation: false, fileHead: null })
    }
    if ( event === 'open' || event === 'extract' ) {
      const { file:decryptedFile, status } = await readAndDecryptFileWorkerized(id, password);
      if ( status !== 'successful' ) {
        return ({ result: null, operation: false, fileHead: null })
      }
  
      const unifiedFile = await fileUnifier(decryptedFile);
      const url = URL.createObjectURL(unifiedFile);
      return ({ result: url, operation: true, fileHead: decryptedFile.head })
    } else {
      // console.log('Deleting file...')
      await localforage.dropInstance({ storeName: id, name: 'files-storage' });
      const newFolder = filesArray.filter( item => item?.id !== id );

      await storeFolder(newFolder, getCurrentRout());
      setFilesArray(newFolder);

      return ({ result: null, operation: true, fileHead: null })
    }
  };

  const folderEvent = async ( folderId: string, event: 'open' | 'delete' ): Promise<'successful'|'unsuccessful'> => {
    if ( folderId === 'root-folder' ) {
      const { result } = await readFolder('root-folder');

      if ( result === null ) {
        return 'unsuccessful'
      }
      setCurrentRout( routes => routes.filter( route => route.uuid === 'root-folder' ) )

      setFilesArray(result)

      return ('successful')
    } else {
      switch ( event ) {
        case 'open': {
          const instance = localforage.createInstance({ name: 'folders-storage', storeName: folderId });
          const encryptedFolderName = await instance.getItem('name');
      
          if ( encryptedFolderName === null ) {
            return ('unsuccessful');
          }

          const password = sessionStorage.getItem('password') as string;
          const key = await pbkdf2KeyGenerate(password);
          const decryptedFolderName = await aesDecrypt( encryptedFolderName as string, key );
          
          await updateRouts(folderId, decryptedFolderName);
          await updateCurrentDirectory(folderId);

      
          return ('successful');
        };
        case 'delete': {
          const { result: files, operation } = await readFolder( folderId );
          if ( operation === 'unsuccessful' || files === null ) {
            return ('unsuccessful');
          }

          // deleting folders content
          for( let i = 0; i < files.length; i++ ) {
            if( files[i].type === 'file' ) { // incase item is a file
              await fileEvent(files[i].id, 'delete');
            }
            //! Deleting folders has been disabled Temporarily !//
            // else if ( files[i].type === 'folder' ) { // incase item is a folder
            //   await  folderEvent(files[i].id, 'delete');
            // }
          }

          // deleting folder
          try {
            localforage.dropInstance({ name: 'folders-storage', storeName: folderId });
          } catch(err) {
            console.error('Something went wrong when dropping instance', err);
            return 'unsuccessful';
          }

          // updating rootFolder
          const { result: rootFiles, operation: secondOperation } = await readFolder( 'root-folder' );
          if ( secondOperation === 'unsuccessful' || rootFiles === null ) {
            return ('unsuccessful');
          }
          const updatedRootFolder = rootFiles.filter(item => item.id !== folderId);
          await storeFolder(updatedRootFolder, 'root-folder');

          // updating UI
          await updateCurrentDirectory();
          return('successful');
        };
        default: {
          return ('unsuccessful')
        }
      }
    }
  }  

  const updateCurrentDirectory = async ( folderUUid: string = '' ) => {
    const { result: files, operation } = await readFolder( folderUUid === '' ? currentRout[currentRout.length-1].uuid : folderUUid );
    if ( operation === 'unsuccessful' ) {
      return (false);
    }
    setFilesArray(files);
    return true;
  }

  const navigateTo = async ( folderId: string ): Promise<'successful'|'unsuccessful'> => {
    const instance = localforage.createInstance({ name: 'folders-storage', storeName: folderId });
    const folderName = await instance.getItem('name');

    if ( folderName === null ) {
      return ('unsuccessful');
    }
    
    await updateRouts(folderId, folderName as string);

    const { result: files, operation } = await readFolder(folderId);
    if ( operation === 'unsuccessful' ) {
      return ('unsuccessful');
    }
    setFilesArray(files);

    return ('successful')
  }  

  const addFile = async ( file: File ) => {
    try {
      const remindedSpace = quota - usage;
      const hasFreeSpace = file.size < remindedSpace;

      if ( !hasFreeSpace ) {
        console.error('No more free Space')
        return false;
      }
    } catch(err) {
      console.warn(`Could not estimate remaining space!`);
      console.error(err);
    }

    try {
      const password = sessionStorage.getItem('password');
      if ( password === null || uuidV5NameSpace === null ) {
        console.log(`Couldn't found key from session storage!`)
        return false
      }

      
      const fileData = await fileReader(file);
      const uuid = uuidV4();
      const result = await encryptAndStoreFileWorkerized( fileData, uuid, password );

      if ( !result ) {
        return false
      }

  
      const newFolder : FolderArray = [
        ...filesArray,
        {
          ...fileData.head,
          id: uuid,
          type: 'file'
        },
      ];
      await storeFolder(newFolder, getCurrentRout())
      setFilesArray(newFolder);
      return true
    } catch(err) {
      console.error(err);
      return false;
    }
  }

  const addFolder = async ( folderName: string ) => {
    //! Adding folders with more than 0 has been disabled Temporarily !//
    if ( currentRout.length > 1 ) {
      return false;
    }

    const folderUuid = uuidV4();
    await storeFolder([] as FolderArray, folderUuid)
    
    const instance = localforage.createInstance({ name: 'folders-storage', storeName: folderUuid });

    const password = sessionStorage.getItem('password') as string;
    const key = await pbkdf2KeyGenerate(password);
    const encryptedFolderName = await aesEncrypt(folderName, key);

    await instance.setItem( 'name', encryptedFolderName );

    const newFolder : FolderArray = [
      ...filesArray,
      {
        name: folderName,
        id: folderUuid,
        type: 'folder'
      },
    ];
    await storeFolder(newFolder, getCurrentRout())
    setFilesArray(newFolder);
    return true;
  }

  const initialSetup = useCallback(async () => {
    const rootItem: FolderArray =[];
    await storeFolder(rootItem, 'root-folder');
  },[]);

  const updateRouts = async ( folderId: string, folderName: string ) => {
    let isNavigatingBack = false;
    currentRout.forEach(item => {
      if ( item.uuid === folderId ) {
        isNavigatingBack = true;
      }
    });

    if ( !isNavigatingBack ) { // if navigating back in folder tree
      setCurrentRout(perRouts => ([
        ...perRouts,
        { name: folderName as string, uuid: folderId }
      ]))
    } else { // if navigating to a new folder tree
      let passedCurrentPosition = false;
      let currentPosition: CurrentRout;
      setCurrentRout(perRouts => {
        const filteredRouts = perRouts.filter(item => {
          if ( item.uuid === folderId ) {
            passedCurrentPosition = true
            currentPosition = [item]
          };
          if ( !passedCurrentPosition ) return item;
        })
        filteredRouts.push(currentPosition[0]);
        return filteredRouts;
      })
    }
  }

  const init = useCallback(async () => {
    const { result } = await readFolder('root-folder');
    
    if ( result === null ) {
      await initialSetup()
      setFilesArray([])
    } else {
      setFilesArray(result)
    }
    setIsLoading(false);

  }, [ readFolder, initialSetup ]);

  useEffect(() => {
    init();
  }, [ init ]);

  return ({
    loading: isLoading,
    currentRout,
    filesArray,
    interactionEvent,
    fileEvent,
    addFile,
    addFolder,
    navigateTo,
    folderEvent
  });
}

export default useFileManager;