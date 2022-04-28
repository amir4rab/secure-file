import React, { useRef, useEffect, useState } from 'react'
import { Button, Box, Tooltip, Title, Group, Loader } from '@mantine/core';
import { ChildProps as Props } from './connectInfoDisplayer-interface';
import { IoPin } from 'react-icons/io5';
import useTranslation from 'next-translate/useTranslation';

import generateConnectUrl from '@/utils/frontend/generateConnectUrl';

function ConnectInfoDisplayerUrl({ id, secret, onCopy }: Props ) {
  const [ url, setUrl ] = useState< null | string >(null);
  const { t } = useTranslation('connect-info-displayer');

  useEffect(() => {
    setUrl(generateConnectUrl(id, secret))
  }, [ id, secret ])

  return (
    <Box>
      <Group mb='md'>
        <IoPin />
        <Title order={ 4 }>
          { t('url') }
        </Title>
      </Group>
      <Group>
        <Button sx={{ fontWeight: '400', fontSize: '.9rem', maxWidth: '100%', overflow: 'hidden' }} onClick={ () => onCopy( url !== null ? url : '' ) } variant='light' color='gray' size='md'>
          { url !== null ? url : <Loader /> }
        </Button>
      </Group>
    </Box>
  )
}

export default ConnectInfoDisplayerUrl