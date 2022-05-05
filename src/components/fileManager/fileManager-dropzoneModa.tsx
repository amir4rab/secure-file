import React from 'react';
import { Modal, Text } from '@mantine/core';
import Dropzone from '@/components/dropzone';

// translation //
import DynamicNamespaces from 'next-translate/DynamicNamespaces';
import Trans from 'next-translate/Trans';

interface Props {
  opened: boolean,
  onClose: ( v: boolean ) => void;
  onDrop: ( file: File[] ) => void;
  storageIsFull: boolean;
}

function DropzoneModal( { opened, onClose, onDrop, storageIsFull }: Props ) {

  return (
    <DynamicNamespaces namespaces={[ 'dropzone-modal' ]}>
      <Modal
        transition='pop'
        radius='md'
        opened={ opened }
        onClose={ () => onClose(false) }
        title={ <Trans i18nKey='dropzone-modal:addFileModal'/> }
        centered
      >
        {
          !storageIsFull ?
          <Dropzone onDrop={ onDrop } /> : null
        }
        {
          storageIsFull ?
          <Text color='yellow'>
            <Trans i18nKey='dropzone-modal:fullStorageError'/>
          </Text> : null
        }
      </Modal>
    </DynamicNamespaces>
  )
}

export default DropzoneModal