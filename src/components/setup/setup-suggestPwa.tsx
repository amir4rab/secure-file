import useIsPwa from '@/hooks/useIsPwa'
import { Title, Text, Button, Box, Center, Loader } from '@mantine/core'
import React from 'react'
import { IoBrowsers } from 'react-icons/io5';

interface Props {
  doneFn: () => void
}
function SetupSuggestPwa({ doneFn }: Props) {
  const { install, isInstallReady } = useIsPwa();

  const installEvent = async () => {
    const result = await install();
    if ( result ) doneFn();
  }

  return (
    <>
      <Center my='xl' sx={{ justifyContent: 'flex-start' }}>
        <IoBrowsers style={{ fontSize: '1.5rem' }} />
        <Title ml='sm' order={3}>
          Installing as an PWA
        </Title>
      </Center>
      <Text>
        Do to how browser works it is advised to install this web-app as pwa, feel free to skip this part if your trying to test it out.
      </Text>
      <Text sx={(theme) => ({ minHeight: '5rem', paddingTop: theme.spacing.md })}>
        { isInstallReady ? null : 'please wait while app is downloading!' }
      </Text>
      <Center sx={(theme) => ({ alignItems: 'center', justifyContent: 'flex-start', marginTop: theme.spacing.xl * 3 })}>
        <Button onClick={ installEvent } mr='sm' size='md'>
        { !isInstallReady ?  <Loader /> : `Install` }
        </Button>
        <Button onClick={ doneFn } variant='subtle' size='sm'>
          Skip installation
        </Button>
      </Center>
    </>
  )
}

export default SetupSuggestPwa