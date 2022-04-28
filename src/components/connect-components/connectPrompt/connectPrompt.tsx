import React from 'react';
import { createStyles, Box, Title, Text, Group, Button } from '@mantine/core';
import { useRouter } from 'next/router';

import { IoChatbubble } from 'react-icons/io5'

import ConnectPromptForm from './connectPrompt-form';

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
  const { classes } = useStyles();
  const router = useRouter();

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

  return (
    <div>
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
    </div>
  )
}

export default ConnectPrompt