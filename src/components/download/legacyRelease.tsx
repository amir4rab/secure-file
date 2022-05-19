import React, { useState } from 'react';

// mantine components
import { Title, Text, Anchor, createStyles, Button, Center, Divider, Autocomplete, Select } from '@mantine/core'

// mantine hooks
import { useOs } from '@mantine/hooks';

// types
import type { GhReleases } from '@/types/ghReleases';

// components
import ReleaseBox from './releaseBox';

interface Props {
  releases: GhReleases;
  os: string
}
function LegacyRelease({ releases, os }: Props) {
  const [ showOldReleases, setShowOldReleases ] = useState(false);
  const [ selectedOlderIndex, setSelectedOlderIndex ] = useState(0); // we start from 1 to hide the latest release //

  return (
    <>
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
          <>
            <Select
              label='Select Version'
              value={ ( selectedOlderIndex )+ '' }
              onChange={ e => setSelectedOlderIndex( parseInt(e as string) ) }
              data={ 
                releases.slice(1).map((release, i) => {
                  return ({
                    label: release.tag_name,
                    value: i + ''
                  })
                })
              }
            />
            <ReleaseBox
              oldVersion
              os={ os }
              release={ releases[selectedOlderIndex + 1] }
            /> 
          </> : null
      }
    </>
  )
}

export default LegacyRelease