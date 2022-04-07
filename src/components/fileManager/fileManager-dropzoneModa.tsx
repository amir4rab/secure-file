import React from 'react';
import { Modal } from '@mantine/core';
import Dropzone from '@/components/dropzone';

interface Props {
  opened: boolean,
  onClose: ( v: boolean ) => void;
  onDrop: ( file: File[] ) => void;
}

function DropzoneModal( { opened, onClose, onDrop }: Props ) {
  return (
    <Modal
      transition='pop'
      radius='md'
      opened={ opened }
      onClose={ () => onClose(false) }
      title='Add file'
      centered
    >
      <Dropzone onDrop={ onDrop } />
    </Modal>
  )
}

export default DropzoneModal