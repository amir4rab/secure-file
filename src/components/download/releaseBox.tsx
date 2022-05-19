import React, { useState } from 'react';

// mantine components
import { Title, Anchor, Box, Group, createStyles, Badge, ActionIcon, Text } from '@mantine/core'

// components
import ApplicationRowItem from './applicationRowItem';

// types
import type { GhRelease } from '@/types/ghReleases';

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
  title: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
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

const getDownloads = ( release: GhRelease ) => {
  let downloadCount = 0;
  release.assets.forEach( ghRelease => {
    downloadCount += ghRelease.download_count;
  });
  return downloadCount;
}

interface Props {
  release: GhRelease;
  os: string;
  oldVersion?: boolean;
};
const ReleaseBox = ({ release, os, oldVersion= false }: Props ) => {
  const { classes } = useStyles();
  const [ dlCount, setDlCount ] = useState(getDownloads(release)); 

  const onDownload = () => setDlCount(currentDlCount => currentDlCount + 1);

  return (
    <Box className={ classes.downloadBox }>
      <Group className={ classes.header }>
        <Anchor variant='text' rel='noreferrer' target='_blank' href={ release.html_url }>
          <Group className={ classes.title }>
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
        <Group>
          <Text size='xs' color='gray'>
            {`Downloads: ${ dlCount }`}
          </Text>
        </Group>
      </Group>
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
              onDownload={ onDownload }
            />
          ))
        }
      </>
    </Box>
  )
}

export default ReleaseBox