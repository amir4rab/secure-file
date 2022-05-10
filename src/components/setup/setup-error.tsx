import React from 'react';

import { IoCloudDownload, IoFlashOff, IoSad } from 'react-icons/io5';
import { Title, Text, List, Anchor, Center, Button } from '@mantine/core';

import { SiFirefoxbrowser, SiGooglechrome } from 'react-icons/si';

import { UnsupportedBrowserErrors } from '@/hooks/useIsSupported';

import useTranslation from '@/translation/useTranslation';;
import Trans from '@/translation/Trans';

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
  const { t } = useTranslation('setup');
  const { t: commonT } = useTranslation('common');

  const setBrowserLimitations = () => {
    localStorage.setItem('limitedBrowser', '1')
    skipError();
  }

  if ( error === 'oldBrowser' ) {
    return (
      <>
        <Center mb='md' sx={{ alignContent: 'center', justifyContent: 'flex-start' }}>
          <IoCloudDownload style={{ fontSize: '2rem', display: 'block' }}/>
          <Title order={3} ml='sm'>{ t('outOfDateBrowser') }</Title>
        </Center>
        <Text>
          <Trans
            ns='setup'
            i18nKey='outOfDateBrowserText'
            values={{ userBrowser, browserVersion }}
          />
        </Text>
      </>
    )
  }
  if ( error === 'unsupportedBrowser' ) {
    return (
      <>
        <Center mb='md' sx={{ alignContent: 'center', justifyContent: 'flex-start' }}>
          <IoFlashOff style={{ fontSize: '2rem', display: 'block' }} />
          <Title order={3} ml='sm'>{ t('unsupportedBrowser') }</Title>
        </Center>
        <Text>
          <Trans
            ns='setup'
            i18nKey='unsupportedBrowserText'
            values={{ userBrowser }}
          />
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
          <Title order={3} ml='sm'>{ t('limitedBrowser') }</Title>
        </Center>
        <Text>
          { t('limitedBrowserText') }
        </Text>
        <Center sx={(theme) => ({ justifyContent: 'flex-end', marginTop: theme.spacing.xl * 3 })}>
          <Button onClick={ setBrowserLimitations }>
            { commonT('continue') }
          </Button>
        </Center>
      </>
    )
  }
  return ( <p /> )
}

export default SetupError