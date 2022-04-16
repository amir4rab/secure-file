import { Title, Text, List, Anchor, Center, Button } from '@mantine/core';
import React from 'react';
import { IoCloudDownload, IoFlashOff, IoSad } from 'react-icons/io5';

import { SiFirefoxbrowser, SiGooglechrome } from 'react-icons/si';

import { UnsupportedBrowserErrors } from '@/hooks/useIsSupported';

const supportedBrowserList = [
  {
    name: 'Chrome',
    href: 'https://www.google.com/chrome/',
    logo: () => <SiGooglechrome style={{ display: 'block', fontSize: '1.5rem' }} />
  },
  {
    name: 'Chromium',
    href: 'https://www.chromium.org/getting-involved/download-chromium/',
    logo: () => <SiGooglechrome style={{ display: 'block', fontSize: '1.5rem' }} />
  },
  {
    name: 'Firefox',
    href: 'https://www.mozilla.org/en-US/firefox/new/',
    logo: () => <SiFirefoxbrowser style={{ display: 'block', fontSize: '1.5rem' }} />
  }
]

interface Props {
  userBrowser: string;
  browserVersion: number;
  error: UnsupportedBrowserErrors | undefined;
  skipError: () => void;
};
function SetupError({ userBrowser, browserVersion, error, skipError }: Props) {

  const setBrowserLimitations = () => {
    localStorage.setItem('limitedBrowser', '1')
    skipError();
  }

  if ( error === 'oldBrowser' ) {
    return (
      <>
        <Center mb='md' sx={{ alignContent: 'center', justifyContent: 'flex-start' }}>
          <IoCloudDownload style={{ fontSize: '2rem', display: 'block' }}/>
          <Title order={3} ml='sm'>Sorry, you need to update your browser!</Title>
        </Center>
        <Text>
          { `You are currently using ${ userBrowser } version ${browserVersion}, you browser need's to be at least on version 95` }
        </Text>
      </>
    )
  }
  if ( error === 'unsupportedBrowser' ) {
    return (
      <>
        <Center mb='md' sx={{ alignContent: 'center', justifyContent: 'flex-start' }}>
          <IoFlashOff style={{ fontSize: '2rem', display: 'block' }} />
          <Title order={3} ml='sm'>Sorry, you browser is not Supported!</Title>
        </Center>
        <Text>
          { `You are currently using ${ userBrowser }, unfortunately this browser is not supported by us, here is a list of supported browsers and their respected Website` }
        </Text>
        <List>
          {
            supportedBrowserList.map(item => (
              <List.Item my='md' icon={ <item.logo /> } key={ item.href }>
                <Anchor sx={{ display: 'block' }} href={ item.href } target='_blank' rel='noreferrer'>
                  { item.name }
                </Anchor>
              </List.Item>
            ))
          }
        </List>
      </>
    )
  }
  if ( error === 'limitedBrowser' ) {
    return (
      <>
        <Center mb='md' sx={{ alignContent: 'center', justifyContent: 'flex-start' }}>
          <IoSad style={{ fontSize: '2rem', display: 'block' }} />
          <Title order={3} ml='sm'>Sorry, you browser is fully compatible!</Title>
        </Center>
        <Text>
          { `You still can use some of secure-file features, but unfortunately do to your browser limitations, we can't give you the full experience` }
        </Text>
        <Center sx={(theme) => ({ justifyContent: 'flex-end', marginTop: theme.spacing.xl * 3 })}>
          <Button onClick={ setBrowserLimitations }>
            Continue
          </Button>
        </Center>
      </>
    )
  }
  return ( <p /> )
}

export default SetupError