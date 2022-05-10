import { Title, Box, Button } from '@mantine/core'
import useTranslation from '@/translation/useTranslation';;
import React from 'react'
import Dropzone from '../dropzone';

interface Props {
  submit: ( file: File ) => void;
}
function ParserEncryptDropzone({ submit }: Props) {
  const { t } = useTranslation('parser-encrypt');

  const dropHandler = ( filesArray: File[] ) => {
    submit(filesArray[0])
  }

  return (
    <Box>
      <Title mb='xl' order={3}>
        { t('choseFile') }
      </Title>
      <Dropzone onDrop={ dropHandler }/>
    </Box>
  )
}

export default ParserEncryptDropzone