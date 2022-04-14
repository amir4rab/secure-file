import React from 'react';
import { Modal, Text } from '@mantine/core';
import Dropzone from '@/components/dropzone';

interface Props {
  opened: boolean,
  onClose: ( v: boolean ) => void;
  onDrop: ( file: File[] ) => void;
  storageIsFull: boolean;
}

function DropzoneModal( { opened, onClose, onDrop, storageIsFull }: Props ) {
  return (
    <Modal
      transition='pop'
      radius='md'
      opened={ opened }
      onClose={ () => onClose(false) }
      title='Add file'
      centered
    >
      {
        !storageIsFull ?
        <Dropzone onDrop={ onDrop } /> : null
      }
      {
        storageIsFull ?
        <Text color='yellow'>
          Sorry your browser storage is Full, please Delete some files before adding new ones!
        </Text> : null
      }
    </Modal>
  )
}

export default DropzoneModal