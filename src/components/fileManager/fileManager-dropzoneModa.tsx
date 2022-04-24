import React from 'react';
import { Modal, Text } from '@mantine/core';
import Dropzone from '@/components/dropzone';
import useTranslation from 'next-translate/useTranslation';

interface Props {
  opened: boolean,
  onClose: ( v: boolean ) => void;
  onDrop: ( file: File[] ) => void;
  storageIsFull: boolean;
}

function DropzoneModal( { opened, onClose, onDrop, storageIsFull }: Props ) {
  const { t } = useTranslation('file-manager');

  return (
    <Modal
      transition='pop'
      radius='md'
      opened={ opened }
      onClose={ () => onClose(false) }
      title={ t('addFileModal') }
      centered
    >
      {
        !storageIsFull ?
        <Dropzone onDrop={ onDrop } /> : null
      }
      {
        storageIsFull ?
        <Text color='yellow'>
          { t('fullStorageError') }
        </Text> : null
      }
    </Modal>
  )
}

export default DropzoneModal