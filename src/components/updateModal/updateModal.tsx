import useIsPwa from '@/hooks/useIsPwa'
import { Button, Modal, Text, Center } from '@mantine/core';
import React from 'react'

function UpdateModal() {
  const { newVersionIsAvailable, updateWorker } = useIsPwa();

  const closeEvent = () => {
    updateWorker(false);
  }

  return (
    <Modal
      opened={ newVersionIsAvailable }
      onClose={ closeEvent }
      title='Update'
      transition='slide-up'
      centered
    >
      <Text sx={(theme) => ({ paddingBottom: theme.spacing.xl * 2 })}>
        There is a new update available!
      </Text>
      <Center sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={ () => updateWorker(true) } mr='lg'>
          Update
        </Button>
        <Button onClick={ closeEvent } variant='subtle' color='gray'>
          Skip
        </Button>
      </Center>
    </Modal>
  )
}

export default UpdateModal