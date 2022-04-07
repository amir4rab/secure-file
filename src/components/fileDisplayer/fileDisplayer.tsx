import { Button, Text, Center, Group, CSSObject, MantineTheme, ThemeIcon, MediaQuery, Menu, Divider, Box, Input } from '@mantine/core'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import { FolderArray, FolderItem, FolderEventHandler} from '@/types/useFileManager';


import EmptyFolder from './emptyFolder';
import FileDisplayerHeader from './fileDisplayerHeader';
import FileItem from './fileItem';
import NoItemFounded from './noItemFounded';

import sortFileAndFolderArray from '@/utils/frontend/sortArray/sortFileAndFolderArray';
import filterItems from './filterItems';

interface Props {
  filesArray: FolderArray;
  fileEvent: ( id: string, event: 'open' | 'extract' | 'delete' ) => void;
  folderEvent: FolderEventHandler;
};

function FileDisplayer({ filesArray, fileEvent, folderEvent }: Props) {
  const [ sortedArray, setSortedArray ] = useState<FolderArray>(filesArray);
  const [ searchInputValue, setSearchInputValue ] = useState<string>('');
  const [ sortedBy, setSortedBy ] = useState('default');

  useEffect(() => {
    const newArray = sortFileAndFolderArray({ input: filesArray , sortBy: sortedBy as  'default' | 'alphabet' | 'size' })
    const filteredArray = filterItems(newArray, searchInputValue)
    setSortedArray(filteredArray); 
  }, [ sortedBy, filesArray, searchInputValue ])

  return (
    <Center sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', paddingTop: '1rem', paddingBottom: '5vh' }}>
      {
        filesArray.length !== 0 ?
        <FileDisplayerHeader setSortedBy={ setSortedBy } sortedBy={ sortedBy } setSearchInputValue={ setSearchInputValue } searchInputValue={ searchInputValue } /> : null
      }
      {
        filesArray.length === 0 ?
        <EmptyFolder /> : null
      }
      {
        sortedArray.length === 0 && filesArray.length !== 0 ? 
        <NoItemFounded searchQuery={ searchInputValue } /> : null
      }
      {
        sortedArray.map( item => ( <FileItem key={item.id} item={ item } fileEvent={ fileEvent } folderEvent={ folderEvent } /> ))
      }
    </Center>
  )
}

export default FileDisplayer