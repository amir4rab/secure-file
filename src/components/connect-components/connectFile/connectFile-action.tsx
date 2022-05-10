import React from 'react'

// mantine components //
import { Button, Loader, createStyles, Tooltip } from '@mantine/core';

// icons //
import { IoCloudDownload, IoCloudUpload, IoChatbubble, IoCheckmarkDone, IoWarning, IoDownload } from 'react-icons/io5'

// types //
import type { FileEvent as FileEventHandler } from '@/providers/connectContext';
import type { ReceiveFile, SendFile } from '@/types/connect';
import useTranslation from '@/translation/useTranslation';;

// translation //

const useStyles = createStyles((theme) => ({
  button: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 400,
    borderRadius: theme.radius.xl
  }
}));

type eventProps = {
  eventHandler?: FileEventHandler;
  uuid: string,
  isDisabled: boolean,
}
interface SendFileActionProps extends eventProps {
  operation: 'send' | 'summery',
  state: SendFile['state'],
};
interface ReceiveFileActionProps extends eventProps {
  operation: 'receive' | 'summery',
  state: ReceiveFile['state'],
};
type Props = SendFileActionProps | ReceiveFileActionProps;
function ConnectFileAction({ operation, state, eventHandler, uuid, isDisabled }: Props) {
  const { t } = useTranslation('common');
  const { classes } = useStyles();

  switch ( operation ) {
    case 'summery': return (
      <div>
        {
          state === 'requested' ? 
            <IoChatbubble /> :
          state === 'sended' ? 
            <IoCheckmarkDone /> :
          state === 'sending' ? 
            <Loader size='sm'/> : null
        }
      </div>
    );
    case 'send': return (
      <div>
        {
          state === 'requested' ? 
            <Button 
              className={ classes.button }
              disabled={ isDisabled }
              size='xs' 
              color='yellow' 
              leftIcon={ <IoWarning /> } 
              onClick={ () => eventHandler && eventHandler(uuid, 'cancel') }
            >
              { t('cancel') }
            </Button>:
          state === 'sended' ?
            <Tooltip label={ t('sended') }>
              <IoCloudUpload />
            </Tooltip> :
          state === 'sending' ? <Loader size='sm'/> : null
        }
      </div>
    );
    case 'receive': return (
      <div>
        {
          state === 'requested' ? 
            <Button 
              className={ classes.button }
              disabled={ isDisabled } 
              size='xs' 
              color='green' 
              leftIcon={ <IoDownload /> } 
              onClick={ () => eventHandler && eventHandler(uuid, 'request') }
            >
              { t('accept') }
            </Button>:
          state === 'sended' ? 
            <Tooltip label={ t('received') }>
              <IoCloudDownload />
            </Tooltip> :
          state === 'sending' ? <Loader size='sm'/> : null
        }
      </div>
    );
    default: return (
      <></>
    )
  }
}

export default ConnectFileAction