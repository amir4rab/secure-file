import React from 'react';

// mantine components
import { Box, Title, createStyles } from '@mantine/core'

// components
import ConnectFile from '@/components/connect-components/connectFile';

// types //
import { ReceiveArray } from '@/types/connect';

// hooks //
import { useConnectContext } from '@/providers/connectContext';
import useTranslation from '@/translation/useTranslation';;

// styles
const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 400,
    [ theme.fn.largerThan('md') ] : {
      fontSize: theme.fontSizes.sm,
    }
  }
}));

interface Props {
  filesArray: ReceiveArray
}
function ConnectReceive({ filesArray }: Props ) {
  const { classes } = useStyles();
  const { fileEvent, isBusy } = useConnectContext();
  const { t } = useTranslation('connect-data');

  return (
    <>
      <Box mb='xl' className={ classes.header }>
        <Title order={3}>{ t('receive') }</Title>
      </Box>
      <div>
        { 
          filesArray.map(( file ) => (
            <ConnectFile isDisabled={ isBusy } eventHandler={ fileEvent } key={ file.uuid } type='receive' fileData={ file }/>
          )) 
        }
      </div>
    </>
  )
}

export default ConnectReceive