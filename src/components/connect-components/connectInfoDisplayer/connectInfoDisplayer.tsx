import React, { useState, useRef, useEffect } from 'react';

import { Title, Tabs, Box, Popover, Text, createStyles } from '@mantine/core';
import Props from './connectInfoDisplayer-interface';
import { useClipboard } from '@mantine/hooks';

import ConnectInfoDisplayerUrl from './connectInfoDisplayer-url';
import ConnectInfoDisplayerSession from './connectInfoDisplayer-session';
import ConnectInfoDisplayerQrCode from './connectInfoDisplayer-qrCode';
import useTranslation from '@/translation/useTranslation';
import BackToButton from '@/components/backToButton';

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
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  }
}));

function ConnectInfoDisplayer({ id, secret }: Props ) {
  const [ activeTab, setActiveTab ] = useState(0);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  const { classes } = useStyles();
  const { t } = useTranslation('connect-info-displayer');
  const { t: commonT } = useTranslation('common');
  const clipboard = useClipboard({ timeout: 1000 });

  useEffect(() => {
    const timeOut = timeOutRef.current;
    return () => {
      timeOut && clearTimeout(timeOut);
    }
  }, [])

  const onCopy = ( value: string = '', copy= true ) => {
    clipboard.copy(value)
  }

  return (
    <div className={ classes.main }>
      <div className={ classes.header }>
        <BackToButton route='/connect' />
        <Title order={2}>
          { t('yourSessionDetails') }
        </Title>
      </div>
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
          opened={ clipboard.copied }
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