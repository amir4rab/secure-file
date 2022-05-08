import React, { useState } from 'react';

// mantine components
import { Box, createStyles, Title, Checkbox, Group, Button, Space } from '@mantine/core';

// hooks
import { useConnectContext } from '@/providers/connectContext'

// translation
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

// styles
const useStyles = createStyles((theme) => ({
  topBox: {
    [ theme.fn.smallerThan('md') ]: {
      minHeight: '60vh'
    },
    [ theme.fn.largerThan('md') ]: {
      marginBottom: theme.spacing.xl * 3
    }
  },
  errorBox: {
    marginTop: theme.spacing.xl,
    minHeight: '4rem',
    color: theme.colors.red[7]
  }
}))

function ConnectExit() {
  const { isBusy } = useConnectContext();
  const { t } = useTranslation('connect-data');
  const [ endConn, setEndConn ] = useState(false);
  const { classes } = useStyles();
  const router = useRouter();
  
  const endConnFn = () => {
    router.push('/connect')
  }

  return (
    <>
      <Box className={ classes.topBox } mb='xl'>
        <Title order={3}>{ t('exit') }</Title>
        <Space h='xl' />
        <Checkbox
          checked={ endConn }
          onChange={ (e) => setEndConn(e.target.checked) }
          label={ t('endConnection') }
          />
        <Box className={ classes.errorBox }>
          { isBusy ? t('currentlyTransferring') : null }
        </Box>
      </Box>
      <Group mt='xl' position='right'>
        <Button onClick={ endConnFn } disabled={ !endConn } color='red'>
          { t('terminateConnection') }
        </Button>
      </Group>
    </>
  )
}

export default ConnectExit