import React from 'react'

// mantine components //
import { Title, Box, createStyles, ScrollArea, Center, Group, Text, SimpleGrid, ThemeIcon } from '@mantine/core';

// components //
import ConnectFile from '@/components/connect-components/connectFile';

// icons //
import { IoPaperPlane, IoArchive, IoArrowUp, IoArrowDown } from 'react-icons/io5';

// types //
import { SendArray, ReceiveArray } from '@/types/connect';
import { IconType } from 'react-icons';

// hooks //
import { useConnectContext } from '@/providers/connectContext';
import useTranslation from '@/translation/useTranslation';;
import ConnectSummeryFooter from './connectSummery-footer';

// styles //
const useStyles = createStyles((theme) => ({
  title: {
    marginBottom: theme.spacing.md
  },
  box: {
    minHeight: '35vh',
    '@:not(:last-child)': {
      marginBottom: theme.spacing.xl
    }
  },
  scrollAreaStyles: {
    height: '30vh'
  },
  emptyBox: {
    minHeight: '30vh',
  }
}));

interface EmptyAreaProps {
  text: string,
  icon: JSX.Element;
}
const EmptyArea = ( { text, icon }: EmptyAreaProps ) => {
  const { classes } = useStyles();

  return (
    <Center className={ classes.emptyBox }>
      <Group>
        { icon }
        <Text size='sm' color='gray' >{ text }</Text>
      </Group>
    </Center>
  )
}

interface Props {
  sendArray: SendArray
  receiveArray: ReceiveArray
}
function ConnectSummery({ sendArray, receiveArray }: Props ) {
  const { t } = useTranslation('connect-data');
  const { classes } = useStyles();

  return (
    <>
      <Box className={ classes.box }>
        <Title order={ 4 } className={ classes.title }>
          { t('sendSummery') }
        </Title>
        {
          sendArray.length === 0 ?
          <EmptyArea
            text={`You haven't sended any file yet`}
            icon={<IoPaperPlane />}
          /> :
          <ScrollArea type='hover' className={ classes.scrollAreaStyles } offsetScrollbars>
            { 
              sendArray.map(( file ) => (
                <ConnectFile key={ file.uuid } isSummery={ true } type='send' fileData={ file }/>
              )) 
            }
          </ScrollArea>
        }
      </Box>
      <Box className={ classes.box }>
        <Title order={ 4 } className={ classes.title }>
          { t('receiveSummery') }
        </Title>
        {
          receiveArray.length === 0 ?
          <EmptyArea
            text={`You haven't received any file yet`}
            icon={<IoArchive />}
          /> :
          <ScrollArea type='hover' className={ classes.scrollAreaStyles } offsetScrollbars>
            { 
              receiveArray.map(( file ) => (
                <ConnectFile key={ file.uuid } isSummery={ true } type='receive' fileData={ file }/>
              )) 
            }
          </ScrollArea>
        }
      </Box>
      <ConnectSummeryFooter />
    </>
  )
}

export default ConnectSummery