import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic';

import { Title, Tabs, Tab, Box, Popover, Text, createStyles } from '@mantine/core';
import Props from './connectInfoDisplayer-interface';

import ConnectInfoDisplayerUrl from './connectInfoDisplayer-url';
import ConnectInfoDisplayerSession from './connectInfoDisplayer-session';
import ConnectInfoDisplayerQrCode from './connectInfoDisplayer-qrCode';
import useTranslation from 'next-translate/useTranslation';

// const DynamicConnectInfoDisplayerQrCode = dynamic(
//   () => import('./connectInfoDisplayer-qrCode'),
//   { 
//     loading: () => <p>Loading...</p>,
//     ssr: false
//   }
// )

const useStyles = createStyles((theme) => ({
  main: {
    maxWidth: '100%',
    overflow: 'hidden'
  },
  tab: {
    minHeight: '70vh',
    [ theme.fn.smallerThan('md') ]: {
      minHeight: '60vh',
    }
  },
  footer: {
    margin: `${theme.spacing.xl}px 0`,
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    background: theme.colors.dark[5],
    color: theme.colors.gray[3],
  }
}));

function ConnectInfoDisplayer({ id, secret }: Props ) {
  const [ activeTab, setActiveTab ] = useState(0);
  const [ copiedNotificationIsActive, setCopiedNotificationIsActive ] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const { classes } = useStyles();
  const { t } = useTranslation('connect-info-displayer');
  const { t: commonT } = useTranslation('common');

  useEffect(() => {
    const timeOut = timeOutRef.current;
    return () => {
      timeOut && clearTimeout(timeOut);
    }
  }, [])

  const onCopy = ( value: string, copy= true ) => {
    timeOutRef.current && clearTimeout(timeOutRef.current);
    setCopiedNotificationIsActive(true);
    // console.warn(value);

    timeOutRef.current = setTimeout(() => {
      setCopiedNotificationIsActive(false);
    }, 1000)
  }

  return (
    <div className={ classes.main }>
      <Title order={2}>
        { t('yourSessionDetails') }
      </Title>
      <Tabs className={ classes.tab } grow={ true } variant='outline' tabPadding='xl' mt='xl' active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label={ t('url') }>
          <ConnectInfoDisplayerUrl id={ id } secret={ secret } onCopy={ onCopy }/>
        </Tabs.Tab>
        <Tabs.Tab label={ t('sessionDetails') }>
          <ConnectInfoDisplayerSession id={ id } secret={ secret } onCopy={ onCopy }/>
        </Tabs.Tab>
        <Tabs.Tab label={ t('qrCode') }>
          <ConnectInfoDisplayerQrCode id={ id } secret={ secret } onCopy={ onCopy }/>
        </Tabs.Tab>
      </Tabs>
      <Box className={ classes.footer }>
        <Popover
          opened={ copiedNotificationIsActive }
          onClose={() => setCopiedNotificationIsActive(false)}
          target={<Text>{ t('clickToCopy') }</Text>}
          width={260}
          position='top'
          transition='slide-up'
        >
          <Text size='xs'>
            { commonT('copied') }
          </Text>
        </Popover>
      </Box>
    </div>
  )
}

export default ConnectInfoDisplayer