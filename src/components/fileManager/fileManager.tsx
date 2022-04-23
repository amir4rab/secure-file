import { useRef, useState } from 'react';

// visual components
import { LoadingOverlay, Loader, Box, Text } from '@mantine/core';

// hooks
import useFileManagerEngine from '@/hooks/useFileManagerEngine';
import useAuth from '@/hooks/useAuth';

// components
import FileDisplayer from '@/components/fileDisplayer';
import MediaPlayerModal from '@/components/mediaPlayerModal';
import AddFolderModal from '@/components/addFolderModal';
import DropzoneModal from './fileManager-dropzoneModa';

// partial components
import MenuButton from './fileManager-menuButton';
import BreadCrumbs from './fileManager-breadCrumbs';
import LoadingSkeleton from './fileManager-loadingSkeleton';
import FileManagerHeader from './fileManager-header';

// types
import { EncryptedFileHead } from '@/types/encryptedFile';
import useStorageQuota from '@/hooks/useStorageQuota';


function FileManager() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ addModalIsOpened, setAddModalIsOpened ] = useState(false);
  const [ addFolderModalIsOpened, setAddFolderModalIsOpened ] = useState(false);
  const [ filePlayerModalIsOpen, setFilePlayerModalIsOpen ] = useState(false);
  const [ fileUrl, setFileUrl ] = useState< null | string >(null);
  const [ fileHead, setFileHead ] = useState< null | EncryptedFileHead >(null);
  const [ downloadLinkName, setDownloadLinkName ] = useState< null | string >(null);
  const hiddenDownloadRef = useRef< HTMLAnchorElement >(null)
  const { quota, usage } = useStorageQuota();
  const { isLimitedUser } = useAuth();

  const {
    loading: initialLoading,
    currentRout,
    filesArray,
    fileEvent,
    addFile,
    addFolder,
    folderEvent
  } = useFileManagerEngine();

  const onFile = async ( files: File[] ) => {
    setAddModalIsOpened(false)
    setIsLoading(true);

    await addFile(files[0]);

    setIsLoading(false);
  }

  const onFolderEvent = async ( id: string, event: 'open' | 'delete') =>  {
    setIsLoading(true);
    const result = await folderEvent(id, event);

    setIsLoading(false);
  }

  const onFileEvent = async ( id: string, event: 'open' | 'extract' | 'delete' ) => {
    setIsLoading(true);
    const { result, operation , fileHead} = await fileEvent(id, event);

    if ( operation !== true ) {
      return ({ result, operation });
    }
    switch( event ) {
      case 'open': {
        setFileUrl(result);
        setFileHead(fileHead);
        setFilePlayerModalIsOpen(true);
        setIsLoading(false)
        break;
      };
      case 'extract': {
        setFileUrl(result);
        setDownloadLinkName(fileHead?.name as string);

        hiddenDownloadRef.current?.click();
        URL.revokeObjectURL(result as string);

        setIsLoading(false);
        setFileUrl(null);
        setDownloadLinkName(null);
        break;
      }
      case 'delete': {
        setIsLoading(false);
      }
    }
  }

  const onCloseModal = async () => {
    if( fileUrl === null ) {
      return;
    }
    setFilePlayerModalIsOpen(false);
    URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setFileHead(null);
  };

  if( isLimitedUser ) return (
    <Box sx={(theme) => ({ minHeight: 'calc(100vh - 8rem)', [`@media(min-width:${theme.breakpoints.md}px)`]: { minHeight: 'calc(100vh-1rem)' } })}>
      <Text>
        Sorry, duo to your browser limitations this part of application is disabled for you!
      </Text>
    </Box>
  )

  return (
    <Box sx={(theme) => ({ minHeight: 'calc(100vh - 8rem)', [`@media(min-width:${theme.breakpoints.md}px)`]: { minHeight: 'calc(100vh-1rem)' } })}>
      {/**  Main Title **/}
      <FileManagerHeader />

      {/** Add file Modal **/}
      <DropzoneModal 
        onClose={ setAddModalIsOpened } 
        opened={ addModalIsOpened } 
        onDrop={ onFile }
        storageIsFull={ quota <= usage }
      />

      {/** Add Folder Modal **/}
      <AddFolderModal 
        submit={ addFolder } 
        isOpen={ addFolderModalIsOpened } 
        setIsOpen={ setAddFolderModalIsOpened } 
      />

      {/** MediaPlayer Modal **/}
      <MediaPlayerModal
        fileUrl={ fileUrl }
        fileHead={ fileHead }
        modalState={ filePlayerModalIsOpen }
        closeModal={ onCloseModal }
      />

      {/** Loading overlay **/}
      <LoadingOverlay 
        loader={ <Loader variant='bars' /> } 
        visible={ isLoading } 
      />

      {/** hidden download link **/}
      <a ref={ hiddenDownloadRef } hidden download={ downloadLinkName } href={ fileUrl === null ? '' : fileUrl } />

      {/** Bead Crumbs **/}
      <BreadCrumbs currentRout={ currentRout } folderEvent={ folderEvent } />

      {
        // Files Displayer
        !initialLoading ?
        <FileDisplayer 
          filesArray={ filesArray }
          folderEvent={ onFolderEvent }
          fileEvent={ onFileEvent } 
        /> : <LoadingSkeleton />
      }

      {/** Menu Button **/}
      <MenuButton
        disabled={ initialLoading || isLoading }
        currentRout={ currentRout } 
        openAddFileModal={ () => setAddModalIsOpened(true) } 
        openAddFolderModal={ () => setAddFolderModalIsOpened(true) } 
      />
    </Box>
  )
}

export default FileManager;