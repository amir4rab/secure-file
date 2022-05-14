import React, { useState } from 'react';

// next.js hooks
import { useRouter } from 'next/router';

// mantine components
import { createStyles, Box, Title, Text, Group, Button } from '@mantine/core';

// icons
import { IoChatbubble } from 'react-icons/io5'

// components
import ConnectPromptForm from './connectPrompt-form';
import ConnectPromptNoNode from './connectPromptNoNode';

// translations
import useTranslation from '@/translation/useTranslation';

// hooks
import useInit from '@/hooks/useInit';
import { useBrowserInfo } from '@/hooks/useBrowserInfo';
import { useLoadingOverlay } from '@/providers/loadingOverlayContext';

const useStyles = createStyles((theme) => ({
  box: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl * 1.5,
    width: '47.5%',
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      '&:not(:last-child)': {
        marginBottom: theme.spacing.xl
      }
    }
  },
  boxTitle: {
    fontSize: theme.fontSizes.xl,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.fontSizes.md,
    }
  },
  boxIcon: {
    display: 'block',
    fontSize: theme.fontSizes.xl,
    [theme.fn.smallerThan('md')]: {
      fontSize: theme.fontSizes.md,
    }
  },
  boxHeader: {
    marginBottom: theme.spacing.md,
    display: 'flex',
    alignItems: 'center'
  },
  boxWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    alignItems: 'stretch',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column'
    }
  },
  text: {
    flexGrow: 1,
    color: theme.colors.gray[6],
    marginBottom: theme.spacing.lg
  }
}));

const ConnectPrompt = () => {
  const { setIsLoading } = useLoadingOverlay();
  const { classes } = useStyles();
  const [ nodeIsNotConfigured, setNodeIsNotConfigured ] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common-errors');
  const { checkSupport, isLoading: useBrowserLoading } = useBrowserInfo();

  const onPeerDetailsSubmit = ({ id, secret }:{ id: string, secret: string }) => {
    router.push({
      pathname: 'connect/data',
      query: {
        id,
        secret,
        initializer: false
      }
    });
  }

  const onStartConnection = () => {
    router.push({
      pathname: 'connect/data',
      query: {
        initializer: true
      }
    });
  }

  useInit(() => {
    const node = window.localStorage.getItem('connectNode');
    if ( node === null ) setNodeIsNotConfigured(true);

    setIsLoading(false)
  }, false);

  if( !checkSupport('connect') && !useBrowserLoading ) return (
    <Box sx={(theme) => ({ minHeight: 'calc(100vh - 8rem)', [`@media(min-width:${theme.breakpoints.md}px)`]: { minHeight: 'calc(100vh-1rem)' } })}>
      <Text>
        { t('disabledDueToLimitation') }
      </Text>
    </Box>
  )

  return (
    <>
      {
        !nodeIsNotConfigured ?
        <>
          <Title order={1} mb='xl'>
            Connect
          </Title>
          <Box className={ classes.boxWrapper }>
            <Box className={ classes.box }>
              <Group className={ classes.boxHeader }>
                <IoChatbubble className={ classes.boxIcon }/>
                <Title className={ classes.boxTitle } order={3}>Connect to some one</Title>
              </Group>
              <ConnectPromptForm onSubmit={ onPeerDetailsSubmit }/>
            </Box>
            <Box className={ classes.box }>
              <Group className={ classes.boxHeader }>
                <IoChatbubble className={ classes.boxIcon }/>
                <Title className={ classes.boxTitle } order={3}>Start a connection</Title>
              </Group>
              <Text className={ classes.text }>
                you can start a connection and send your information for someone to connect to you!
              </Text>
              <Group position="right" mt="md">
                <Button onClick={ onStartConnection }>Start</Button>
              </Group>
            </Box>
          </Box>
        </> : <ConnectPromptNoNode />
      }
    </>
  )
}

export default ConnectPrompt