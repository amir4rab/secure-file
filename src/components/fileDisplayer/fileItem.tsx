import React, { useState } from 'react';

// mantine components
import { Button, Text, Group, Menu, Divider, ThemeIcon, createStyles } from '@mantine/core'

// icons
import { IoFolder, IoMusicalNotes, IoDocument, IoFilm, IoImage, IoHelp, IoOpen, IoCloudDownload, IoTrash, IoFolderOpen } from 'react-icons/io5';

// utils
import { getFormat, readableSize } from '@/utils/frontend/fileUtils';
import { getFamilyFormat, isMediaOpenable } from '@/utils/frontend/mediaFormats';

// translation
import useTranslation from '@/translation/useTranslation';;

// types
import type { FolderItem, FolderEventHandler} from '@/types/useFileManager';

// icons styles 
const useIconStyles = createStyles((theme) => ({
  icon: {
    borderRadius: theme.radius.md
  },
  folder: {
    background: `hsl(${100}, 200%, 87.5%)`
  },
  audio: {
    background: `hsl(${300}, 200%, 87.5%)`
  },
  video: {
    background: `hsl(${150}, 200%, 87.5%)`
  },
  image: {
    background: `hsl(${240}, 200%, 87.5%)`
  },
  document: {
    background: `hsl(${10}, 200%, 87.5%)`
  },
  unknown: {
    background: `hsl(${190}, 200%, 87.5%)`
  }
}));

// file icon component
const FileIcon = ({ name, type }:{ name: string, type: string }) => {
  const { classes } = useIconStyles();
  const sharedStyles: React.CSSProperties = {
    color: 'black',
  }

  if ( type === 'folder' ) {
    return <ThemeIcon className={[ classes.folder, classes.icon ].join(' ')} size='lg'><IoFolder style={ sharedStyles }/></ThemeIcon>
  }
  const format = getFormat(name);
  const formatFamily = getFamilyFormat(format); 

  switch( formatFamily ) {
    case 'audio': 
      return (
        <ThemeIcon className={[ classes.audio, classes.icon ].join(' ')} size='lg'>
          <IoMusicalNotes style={ sharedStyles }/>
        </ThemeIcon>
      );
    case 'video': 
      return (
        <ThemeIcon className={[ classes.video, classes.icon ].join(' ')} size='lg'>
          <IoFilm style={ sharedStyles }/>
        </ThemeIcon>
      );
    case 'image': 
      return (
        <ThemeIcon className={[ classes.image, classes.icon ].join(' ')} size='lg'>
          <IoImage style={ sharedStyles }/>
        </ThemeIcon>
        );
    case 'document': 
      return (
        <ThemeIcon className={[ classes.document, classes.icon ].join(' ')} size='lg'>
          <IoDocument style={ sharedStyles }/>
        </ThemeIcon>
      );
    default: 
      return (
        <ThemeIcon className={[ classes.unknown, classes.icon ].join(' ')} size='lg'>
          <IoHelp style={ sharedStyles }/>
        </ThemeIcon>
      );
  }
};

// styles
const useStyles = createStyles((theme) => ({
  fileWrapper: {
    padding: theme.spacing.md,
    width: '100%',
    background: theme.colors.dark[6],
    transition: 'background .15s ease-in-out',
    borderRadius: theme.radius.md,
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    ['&:not(:last-child)']: {
      marginBottom: '.5rem'
    },
    ['&:hover']: {
      cursor: 'pointer'
    },
    ['&:hover, &:focus']: {
      background: theme.colors.dark[5],
    },
    ['&:active']: {
      background: theme.colors.cyan[9],
    }
  },
  info: {
    pointerEvents: 'none',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    [ theme.fn.largerThan('md') ]: { 
      flexDirection: 'row',
      alignItems: 'center' 
    }
  },
  desktopControls: {
    [ theme.fn.smallerThan('md') ]: {
      display: 'none'
    }
  },
  mobileControls: {
    [ theme.fn.largerThan('md') ]: {
      display: 'none'
    }
  },
  name: {
    userSelect: 'none',
    maxWidth: '40vw',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
}));
const FileItem = ({ item, fileEvent, folderEvent }:{ item: FolderItem, fileEvent: ( id: string, event: 'open' | 'extract' | 'delete' ) => void , folderEvent: FolderEventHandler }) => {
  const [ isOpenable ] = useState< boolean >( item.type === 'folder' ? true : isMediaOpenable(item.format) );
  const { classes } = useStyles();
  const { t } = useTranslation('common')

  const onItemClickEvent: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ( !isOpenable ) return;
    const id = (e.target as HTMLElement).id as string;
    if ( id === 'wrapper-element' ) item.type === 'folder' ?
      folderEvent(item.id, 'open') :
      isOpenable && fileEvent(item.id, 'open');
  };

  return (
    <Group id='wrapper-element' onClick={ onItemClickEvent } className={ classes.fileWrapper } key={ item.id } >
      
      {/* Information Elements */}
      <Group className={ classes.info }>
        <Group>
          <FileIcon name={ item.name } type={ item.type } />
          <Text className={ classes.name }>{ item.name }</Text>
        </Group>
        {
          item.type !== 'folder' ?
          <Group>
            <Text sx={{ fontSize: '.8rem', opacity: .8 }}>{ readableSize(item.size) }</Text>
          </Group> : null
        }
      </Group>

      {/* Desktop Elements */}
      <Group className={ classes.desktopControls }>
          {
            item.type !== 'folder' ? 
            <>
              <Button disabled={ !isOpenable } onClick={() => fileEvent(item.id, 'open')} size='xs' radius='md' variant='light' color='gray' aria-label='open'>
                <IoOpen />
              </Button>
              <Button onClick={() => fileEvent(item.id, 'extract')} size='xs' radius='md' variant='light' color='gray' aria-label='send'>
                <IoCloudDownload />
              </Button>
              <Button onClick={() => fileEvent(item.id, 'delete')} size='xs' radius='md' variant='light' color='red' aria-label='remove'>
                <IoTrash />
              </Button>
            </> : null
          }
          {
            item.type === 'folder' ? 
            <>
              <Button onClick={() => folderEvent(item.id, 'open')} size='xs' radius='md' variant='light' color='gray' aria-label='send'>
                <IoFolderOpen />
              </Button>
              <Button onClick={() => folderEvent(item.id, 'delete')} size='xs' radius='md' variant='light' color='red' aria-label='delete'>
                <IoTrash />
              </Button>
            </> : null
          }
      </Group>

      {/* Mobile Elements */}
      <Group className={ classes.mobileControls }>
          <Menu aria-label='function-menu' shadow='lg' radius='md'>
            {
              item.type !== 'folder' ?
              <>
                <Menu.Label>{ t('actions') }</Menu.Label>
                <Menu.Item onClick={() => fileEvent(item.id, 'open')} icon={<IoOpen />}>{ t('open') }</Menu.Item>
                <Menu.Item onClick={() => fileEvent(item.id, 'extract')} icon={<IoCloudDownload />}>{ t('save') }</Menu.Item>
                <Divider />
                <Menu.Label>{ t('dangerZone') }</Menu.Label>
                <Menu.Item color='red' onClick={() => fileEvent(item.id, 'delete')} icon={<IoTrash />}>{ t('delete') }</Menu.Item>
              </> : null
            }
            {
              item.type === 'folder' ?
              <>
                <Menu.Label>{ t('actions') }</Menu.Label>
                <Menu.Item onClick={() => folderEvent(item.id, 'open')} icon={<IoFolderOpen />}>{ t('open') }</Menu.Item>
                <Divider />
                <Menu.Label>{ t('dangerZone') }</Menu.Label>
                <Menu.Item onClick={() => folderEvent(item.id, 'delete')} color='red' icon={<IoTrash />}>{ t('delete') }</Menu.Item>
              </> : null
            }
          </Menu>
      </Group>
    </Group>
  )
};

export default FileItem;