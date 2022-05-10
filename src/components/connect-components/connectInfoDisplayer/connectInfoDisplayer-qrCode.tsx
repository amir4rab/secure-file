import React, { useRef } from 'react'
import { Box, Title, Group } from '@mantine/core';
import { ChildProps as Props } from './connectInfoDisplayer-interface';
import { IoQrCode } from 'react-icons/io5';
import useTranslation from '@/translation/useTranslation';;
import generateConnectUrl from '@/utils/frontend/generateConnectUrl';
import QrCode from '@/components/qrCode'


function ConnectInfoDisplayerQrCode({ id, secret, onCopy }: Props ) {
  const urlRef = useRef(generateConnectUrl(id, secret));
  const { t } = useTranslation('connect-info-displayer');

  return (
    <Box>
      <Group mb='md'>
        <IoQrCode />
        <Title order={ 4 }>
          { t('qrCode') }
        </Title>
      </Group>
      <Group>
        <QrCode onCopy={ onCopy } value={ urlRef.current }/>
      </Group>
    </Box>
  )
}

export default ConnectInfoDisplayerQrCode