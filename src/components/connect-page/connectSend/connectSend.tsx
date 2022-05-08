import React, { useState } from 'react';

// mantine components
import { Box, Button, Title, createStyles } from '@mantine/core'

// components
import ConnectFile from '@/components/connect-components/connectFile';
import DropzoneModal from '@/components/fileManager/fileManager-dropzoneModa';

// icons
import { IoAdd } from 'react-icons/io5'

// types
import { SendArray } from '@/types/connect';

// hooks
import { useConnectContext } from '@/providers/connectContext';

// translation
import useTranslation from 'next-translate/useTranslation';

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
  filesArray: SendArray
}
function ConnectSend({ filesArray }: Props ) {
  const { sendFile, fileEvent, isBusy } = useConnectContext();
  const [ modalState, setModalState ] = useState(false);
  const { classes } = useStyles();
  const { t } = useTranslation('connect-data');

  const onDrop = ( files: File[] ) => {
    sendFile(files[0]);
    setModalState(false);
  }
    
  return (
    <>
      <DropzoneModal 
        onClose={ () => setModalState(false) }
        onDrop={ onDrop }
        opened={ modalState }
        storageIsFull={ false }
      />
      <Box mb='xl' className={ classes.header }>
        <Title order={3}>{ t('send') }</Title>
        <Button onClick={ () => setModalState(true) } className={ classes.addButton } radius='xl' leftIcon={ <IoAdd size={18}/> }>Add File</Button>
      </Box>
      <div>
        { 
          filesArray.map(( file ) => (
            <ConnectFile isDisabled={ isBusy } eventHandler={ fileEvent } key={ file.uuid } type='send' fileData={ file }/>
          )) 
        }
      </div>
    </>
  )
}

export default ConnectSend