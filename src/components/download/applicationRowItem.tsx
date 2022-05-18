import React, { useEffect, useState } from 'react';

// mantine components
import { Title, Text, Anchor, Box, ThemeIcon, Group, Button, createStyles, Badge } from '@mantine/core'

// icons
import { SiWindows, SiApple, SiUbuntu } from 'react-icons/si';
import { IoCloudDownload, IoCodeSlash } from 'react-icons/io5';

// utils
import { readableSize } from '@/utils/frontend/fileUtils';

// styles
const useStyles = createStyles((theme) => ({
  rowGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    padding: `${theme.spacing.md}px 0`,
    opacity: .5,
    transition: 'opacity .2s ease-in-out',
    '&:hover': {
      opacity: 1,
    }
  },
  active: {
    opacity: 1
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginRight: theme.spacing.xl
  },
  subDetails: {
    display: 'flex'
  }
}));

const ReleaseIcon = ({ os }:{ os: string | null }) => {
  switch( os?.toLocaleLowerCase() ){
    case 'windows': return <SiWindows />;
    case 'linux': return <SiUbuntu />;
    case 'macos': return <SiApple />;
  }
  return <IoCodeSlash />;
}

interface Props {
  os?: string | null;
  isActive: boolean;
  url: string;
  size: number;
  name: string
}
const ApplicationRowItem = ( { os = null, isActive, url, size, name }: Props ) => {
  const { classes } = useStyles();
  const [ forYou, setForYou ] = useState(false);

  useEffect(() => {
    setForYou(isActive)
  }, [ isActive ])

  return (
    <div className={[ classes.rowGroup, forYou ? classes.active : null ].join(' ')}>
      <Group>
        <ThemeIcon variant='light' size='xl'>
          <ReleaseIcon os={ os } />
        </ThemeIcon>
        <div className={ classes.details }>
          <Text weight='bold'>
            { name }
          </Text>
          <div className={ classes.subDetails }>
            {
              os !== null ?
              <Text size='xs' mr='xs' weight='bold' component='span'>
                { os }
              </Text> : null
            }
            <Text color='gray' size='xs' component='span'>
              { readableSize(size) }
            </Text>
          </div>
        </div>
        {
          forYou ? 
          <Badge size='xs' color='green'>
            for you
          </Badge> : null
        }
      </Group>
      <Group>
        <Button variant='light' size='sm' leftIcon={ <IoCloudDownload /> } component='a' download={ name } href={ url }>
          Download
        </Button>
      </Group>
    </div>
  )
}

export default ApplicationRowItem;