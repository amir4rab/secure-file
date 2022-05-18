import React from 'react';

// mantine components
import { Title, Anchor, Box, Group, createStyles, Badge, ActionIcon } from '@mantine/core'

// components
import ApplicationRowItem from './applicationRowItem';

// types
import type { ghRelease } from '@/types/ghReleases';

// icons
import { SiGithub } from 'react-icons/si';

// styles
const useStyles = createStyles((theme) => ({
  downloadBox: {
    marginTop: theme.spacing.xl * 3
  },
  downloadTitle: {
    marginBottom: theme.spacing.xl
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md
  }
}));

const getOsFromFileName = ( name: string ) => {
  const format = name.slice(name.lastIndexOf('.') + 1, name.length);
  
  switch( format.toLocaleLowerCase() ){
    case 'exe': return 'Windows';
    case 'appimage': return 'Linux';
  }

  return null;
}

interface Props {
  release: ghRelease;
  os: string;
  oldVersion?: boolean;
};
const ReleaseBox = ({ release, os, oldVersion= false }: Props ) => {
  const { classes } = useStyles();

  return (
    <Box className={ classes.downloadBox }>
      <Anchor variant='text' rel='noreferrer' target='_blank' href={ release.html_url }>
        <Group className={ classes.header }>
            <ActionIcon>
              <SiGithub style={{ fontSize:'1.5rem' }}/>
            </ActionIcon>
            <Title order={ 3 }>
              { release.name }
            </Title>
          {
            oldVersion ?
            <Badge size='sm' color='red'>
              out of date
            </Badge> : null
          }
          {
            release.prerelease ?
            <Badge size='sm' color='yellow'>
              prerelease
            </Badge> : null
          }
        </Group>
      </Anchor>
      <>
        {
          release.assets.map((releaseDetails, i) => (
            <ApplicationRowItem
              name={ releaseDetails.name }
              isActive={ os === getOsFromFileName(releaseDetails.name)?.toLocaleLowerCase() }
              os={ getOsFromFileName(releaseDetails.name) }
              size={ releaseDetails.size }
              url={ releaseDetails.browser_download_url }
              key={ i } 
            />
          ))
        }
      </>
    </Box>
  )
}

export default ReleaseBox