import React from 'react';

import { ReceiveFile, SendFile } from '@/types/connect';

import { Box, Group, createStyles, Text } from '@mantine/core';
import ConnectFileIcon from './connectFile-icon';
import { readableSize } from '@/utils/frontend/fileUtils';
import ConnectFileAction from './connectFile-action';

import { FileEvent as FileEventHandler } from '@/providers/connectContext';


const useStyles = createStyles((theme) => ({
  file: {
    padding: `${theme.spacing.xs}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginBottom: theme.spacing.sm
    }
  },
  name: {
    fontSize: theme.fontSizes.md,
    [ theme.fn.smallerThan('md') ]:{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: '40vw',
      textOverflow: 'ellipsis'
    }
  },
  size: {
    fontSize: theme.fontSizes.xs,
    opacity: .8
  }
}));

interface SendFileProps {
  isSummery?: boolean,
  type: 'send',
  fileData: SendFile,
  eventHandler?: FileEventHandler,
}
interface ReceiveFileProps {
  isSummery?: boolean,
  type: 'receive',
  fileData: ReceiveFile,
  eventHandler?: FileEventHandler,
}
type Props = SendFileProps | ReceiveFileProps;
const ConnectFile = ( { type, fileData:{ name, state, size, uuid }, isSummery= false, eventHandler }: Props ) => {
  const { classes } = useStyles();

  return (
    <div className={ classes.file }>
      <Group>
        <ConnectFileIcon name={ name } />
        <div>
          <Text className={ classes.name }>
            { name }
          </Text>
          <Text className={ classes.size }>
            { readableSize(size) }
          </Text>
        </div>
      </Group>
      <Box>
        <ConnectFileAction uuid={ uuid } eventHandler={ eventHandler && eventHandler } operation={ isSummery ? 'summery' : type } state={ state } />
      </Box>
    </div>
  )
}

export default ConnectFile