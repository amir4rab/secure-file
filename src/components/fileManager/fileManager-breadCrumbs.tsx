import React from 'react';
import { Center, UnstyledButton, Breadcrumbs } from '@mantine/core';
import { FolderEventHandler } from '@/types/useFileManager';


const breadCrumbsItems = (inputArray: { name: string, uuid: string }[], folderEvent: FolderEventHandler) => {
  return (
    inputArray.map(item => (
      <UnstyledButton onClick={ () => folderEvent(item.uuid, 'open') } key={ item.uuid }>
        { item.name }
      </UnstyledButton>
    ))
  )
}

interface Props {
  currentRout: { name: string, uuid: string }[];
  folderEvent: FolderEventHandler;
}

function BreadCrumbs({ currentRout, folderEvent }: Props) {
  return (
    <Center sx={{ justifyContent: 'flex-start', marginBottom: '.5rem' }}>
      <Breadcrumbs>
        { breadCrumbsItems(currentRout, folderEvent) }
      </Breadcrumbs>
    </Center>
  )
}

export default BreadCrumbs