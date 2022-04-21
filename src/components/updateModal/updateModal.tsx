import useIsPwa from '@/hooks/useIsPwa'
import { Button, Modal, Text, Center } from '@mantine/core';
import React from 'react'
import DynamicNamespaces from 'next-translate/DynamicNamespaces';
import useTranslation from 'next-translate/useTranslation';

function UpdateModal() {
  const { newVersionIsAvailable, updateWorker } = useIsPwa();
  const { t } = useTranslation('update-modal');
  const { t: commonT } = useTranslation('common');

  const closeEvent = () => {
    updateWorker(false);
  }

  return (
    <Modal
      opened={ newVersionIsAvailable }
      onClose={ closeEvent }
      title={ commonT('update') }
      transition='slide-up'
      centered
    >
      <Text sx={(theme) => ({ paddingBottom: theme.spacing.xl * 2 })}>
        { t('prompt') }
      </Text>
      <Center sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={ () => updateWorker(true) } mr='lg'>
          { commonT('update') }
        </Button>
        <Button onClick={ closeEvent } variant='subtle' color='gray'>
          { commonT('skip') }
        </Button>
      </Center>
    </Modal>
  )
}

export default UpdateModal