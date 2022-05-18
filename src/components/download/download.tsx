import React, { useState } from 'react';

// mantine components
import { Title, Text, Anchor, createStyles, Button, Center, Divider } from '@mantine/core'

// mantine hooks
import { useOs } from '@mantine/hooks';

// types
import type { ghReleases } from '@/types/ghReleases';
import ReleaseBox from './releaseBox';

const useStyles = createStyles((theme) => ({
  downloadBox: {
    marginTop: theme.spacing.xl * 3
  },
  downloadTitle: {
    marginBottom: theme.spacing.xl
  },
  mainWrapper: {
    marginBottom: theme.spacing.xl * 3
  }
}))

interface Props {
  releases: ghReleases
}
const DownloadPage = ({ releases }: Props ) => {
  const [ showOldReleases, setShowOldReleases ] = useState(false);
  const { classes } = useStyles();
  const os = useOs();

  return (
    <div className={ classes.mainWrapper }>
      <Title mb='xl' mt='sm' order={ 1 }>
        Download Secure file Application
      </Title>
      <Text>
        Native application is more secure than the Web App, and might be a better option for those with weak internet connection, although both of application share the same source code, native application is packaged with <Anchor href='electronjs.org' rel='noreferrer' target='_blank'>electron.js</Anchor>.
      </Text>
      <ReleaseBox
        os={ os }
        release={ releases[0] }
      />
      <Divider
        my='xl'
        variant='solid'
        labelPosition='center'
        label={
          <Button onClick={ () => setShowOldReleases(current => !current) } variant='light' size='xs' color='gray'>
            {
              !showOldReleases ? 'Show old releases' : 'Hide old releases'
            }
          </Button>
        }
      />
      {
        showOldReleases ? 
        releases.map((release, i) => {
          if ( i === 0 ) return null; 
          return (
            <ReleaseBox
              oldVersion
              os={ os }
              release={ release }
              key={ release.id }
            />
          )
        }) : null
      }
    </div>
  )
}

export default DownloadPage