import React, { useState } from 'react';

// mantine components
import { Title, Text, Anchor, createStyles, Button, Center, Divider } from '@mantine/core'

// mantine hooks
import { useOs } from '@mantine/hooks';

// types
import type { GhReleases } from '@/types/ghReleases';
import ReleaseBox from './releaseBox';
import LegacyRelease from './legacyRelease';

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
  releases: GhReleases
}
const DownloadPage = ({ releases }: Props ) => {
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
        // latestReleaseVersion={ releases[0].name }
      />
      <LegacyRelease releases={ releases } os={ os } />
    </div>
  )
}

export default DownloadPage