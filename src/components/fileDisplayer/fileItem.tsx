import { Button, Text, Group, MediaQuery, Menu, Divider, CSSObject, MantineTheme, ThemeIcon } from '@mantine/core'
import { FolderItem, FolderEventHandler} from '@/types/useFileManager';

import { getFormat, readableSize } from '@/utils/frontend/fileUtils';
import { getFamilyFormat, isMediaOpenable } from '@/utils/frontend/mediaFormats';

import { IoFolder, IoMusicalNotes, IoDocument, IoFilm, IoImage, IoHelp, IoOpen, IoCloudDownload, IoTrash, IoFolderOpen } from 'react-icons/io5';
import { useState } from 'react';

const fileStyles: ( theme: MantineTheme ) => CSSObject = (( theme: MantineTheme ) => ({
  padding: theme.spacing.md,
  width: '100%',
  background: theme.colors.dark[6],
  transition: 'background .15s ease-in-out',
  borderRadius: theme.radius.md,
  justifyContent: 'space-between',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  '&:not(:last-child)': {
    marginBottom: '.5rem'
  },
  '&:hover': {
    cursor: 'pointer'
  },
  '&:hover, &:focus': {
    background: theme.colors.dark[5],
  },
  '&:active': {
    background: theme.colors.cyan[9],
  }
}));

const FileIcon = ({ name, type }:{ name: string, type: string }) => {
  const sharedStyles: React.CSSProperties = {
    color: 'black',
  }

  if ( type === 'folder' ) {
    return <ThemeIcon radius='md' size='lg' sx={{ background: `hsl(${100}, 200%, 87.5%)` }}><IoFolder style={ sharedStyles }/></ThemeIcon>
  }
  const format = getFormat(name);
  const formatFamily = getFamilyFormat(format); 

  switch( formatFamily ) {
    case 'audio': return <ThemeIcon radius='md' size='lg' sx={{ background: `hsl(${300}, 200%, 87.5%)` }}><IoMusicalNotes style={ sharedStyles }/></ThemeIcon> ;
    case 'video': return <ThemeIcon radius='md' size='lg' sx={{ background: `hsl(${150}, 200%, 87.5%)` }}><IoFilm style={ sharedStyles }/></ThemeIcon>;
    case 'image': return <ThemeIcon radius='md' size='lg' sx={{ background: `hsl(${240}, 200%, 87.5%)` }}><IoImage style={ sharedStyles }/></ThemeIcon> ;
    case 'document': return <ThemeIcon radius='md' size='lg' sx={{ background: `hsl(${10}, 200%, 87.5%)` }}><IoDocument style={ sharedStyles }/></ThemeIcon> ;
    default: return <ThemeIcon radius='md' size='lg' sx={{ background: `hsl(${190}, 200%, 87.5%)` }}><IoHelp style={ sharedStyles }/></ThemeIcon> ;
  }
};

const shortenTitle = (title: string) => title.length > 20 ? title.slice(0,17) + '...' : title

const FileItem = ({ item, fileEvent, folderEvent }:{ item: FolderItem, fileEvent: ( id: string, event: 'open' | 'extract' | 'delete' ) => void , folderEvent: FolderEventHandler }) => {
  const [ isOpenable ] = useState< boolean >( item.type === 'folder' ? true : isMediaOpenable(item.format) )

  const onItemClickEvent: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ( !isOpenable ) return;
    const id = (e.target as HTMLElement).id as string;
    if ( id === 'wrapper-element' ) item.type === 'folder' ? folderEvent(item.id, 'open') : fileEvent(item.id, 'open');
  }

  // console.log(isMediaOpenable(item.format))

  return (
    <Group id='wrapper-element' onClick={ onItemClickEvent } sx={ fileStyles } key={ item.id } >
      
      {/* Information Elements */}
      <Group sx={(theme) => ({ display: 'flex', alignItems: 'flex-start', flexDirection: 'column',  [`@media(min-width:${theme.breakpoints.md}px)`]: { flexDirection: 'row', alignItems: 'center' } })}>
        <Group>
          <FileIcon name={ item.name } type={ item.type } />
          <Text sx={{ userSelect: 'none' }}>{ shortenTitle(item.name) }</Text>
        </Group>
        {
          item.type !== 'folder' ?
          <Group>
            <Text sx={{ fontSize: '.8rem', opacity: .8 }}>{ readableSize(item.size) }</Text>
          </Group> : null
        }
      </Group>

      {/* Desktop Elements */}
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <Group>
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
      </MediaQuery>

      {/* Mobile Elements */}
      <MediaQuery largerThan='md' styles={{ display: 'none' }}>
        <Group>
            <Menu shadow='lg' radius='md'>
              {
                item.type !== 'folder' ?
                <>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item onClick={() => fileEvent(item.id, 'open')} icon={<IoOpen />}>Open</Menu.Item>
                  <Menu.Item onClick={() => fileEvent(item.id, 'extract')} icon={<IoCloudDownload />}>Save</Menu.Item>
                  <Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item color='red' onClick={() => fileEvent(item.id, 'delete')} icon={<IoTrash />}>Delete</Menu.Item>
                </> : null
              }
              {
                item.type === 'folder' ?
                <>
                  <Menu.Label>Actions</Menu.Label>
                  <Menu.Item onClick={() => folderEvent(item.id, 'open')} icon={<IoFolderOpen />}>Open</Menu.Item>
                  <Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item onClick={() => folderEvent(item.id, 'delete')} color='red' icon={<IoTrash />}>Delete</Menu.Item>
                </> : null
              }
            </Menu>
        </Group>
      </MediaQuery>
    </Group>
  )
};

export default FileItem;