import useIsPwa from '@/hooks/useIsPwa'
import { Button, Modal, Text, Center } from '@mantine/core';
import React from 'react'

// import DynamicNamespaces from 'next-translate/DynamicNamespaces';
import Trans from '@/translation/Trans';

function UpdateModal() {
  const { newVersionIsAvailable, updateWorker } = useIsPwa();
  const closeEvent = () => {
    updateWorker(false);
  }

  return (
    // <DynamicNamespaces namespaces={[ 'update-modal' ]}>
      <Modal
        opened={ newVersionIsAvailable }
        onClose={ closeEvent }
        title={ <Trans ns='common' i18nKey='update' /> }
        transition='slide-up'
        centered
        closeOnClickOutside={ false }
      >
        <Text sx={(theme) => ({ paddingBottom: theme.spacing.xl * 2 })}>
          { <Trans ns='update-modal' i18nKey='prompt' /> }
        </Text>
        <Center sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={ () => updateWorker(true) } mr='lg'>
            { <Trans ns='common' i18nKey='update' /> }
          </Button>
          <Button onClick={ closeEvent } variant='subtle' color='gray'>
            { <Trans ns='common' i18nKey='skip' /> }
          </Button>
        </Center>
      </Modal>
    // </DynamicNamespaces>
  )
}

export default UpdateModal