import useIsPwa from '@/hooks/useIsPwa'
import { Title, Text, Button, Box, Center, Loader } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation';
import React from 'react'
import { IoBrowsers } from 'react-icons/io5';

interface Props {
  doneFn: () => void
}
function SetupSuggestPwa({ doneFn }: Props) {
  const { install, isInstallReady } = useIsPwa();
  const { t } = useTranslation('setup');
  const { t: commonT } = useTranslation('common');

  const installEvent = async () => {
    const result = await install();
    if ( result ) doneFn();
  }

  return (
    <>
      <Center my='xl' sx={{ justifyContent: 'flex-start' }}>
        <IoBrowsers style={{ fontSize: '1.5rem' }} />
        <Title ml='sm' order={3}>
          { t('installingPWA') }
        </Title>
      </Center>
      <Text>
        { t('installingPWAText') }
      </Text>
      <Text sx={(theme) => ({ minHeight: '5rem', paddingTop: theme.spacing.md })}>
        { isInstallReady ? null : t('installingPWAWait') }
      </Text>
      <Center sx={(theme) => ({ alignItems: 'center', justifyContent: 'flex-start', marginTop: theme.spacing.xl * 3 })}>
        <Button onClick={ installEvent } mr='sm' size='md'>
        { !isInstallReady ?  <Loader /> : commonT('install') }
        </Button>
        <Button onClick={ doneFn } variant='subtle' size='sm'>
          { commonT('skipInstall') } 
        </Button>
      </Center>
    </>
  )
}

export default SetupSuggestPwa