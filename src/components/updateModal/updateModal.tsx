import React, { useState } from 'react';

// mantine components
import { Button, Modal, Text, Center } from '@mantine/core';

// hooks
import useIsPwa from '@/hooks/useIsPwa'

// translation
import Trans from '@/translation/Trans';

function UpdateModal() {
  const { newVersionIsAvailable, updateWorker } = useIsPwa();
  const [ isUpdating, setIsUpdating ] = useState(false);

  const closeEvent = () => {
    updateWorker(false);
    setIsUpdating(true);
  }

  return (
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
        <Button loading={ isUpdating } onClick={ closeEvent } variant='subtle' color='gray'>
          { <Trans ns='common' i18nKey='skip' /> }
        </Button>
      </Center>
    </Modal>
  )
}

export default UpdateModal