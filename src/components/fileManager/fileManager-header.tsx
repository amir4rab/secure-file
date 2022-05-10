import React from 'react'
import { Center, Title } from '@mantine/core'
import UsageDisplayer from '../usageDisplayer'
import useTranslation from '@/translation/useTranslation';

function FileManagerHeader() {
  const { t } = useTranslation('file-manager');

  return (
    <Center sx={{ justifyContent: 'space-between' }}>
      <Title sx={{ marginBottom: '1rem' }} order={1}>{ t('folders') }</Title>
      <UsageDisplayer />
    </Center>
  )
}

export default FileManagerHeader