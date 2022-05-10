import { Title, Box, Button } from '@mantine/core'
import useTranslation from '@/translation/useTranslation';;
import React from 'react';

interface Props {
  reset: () => void;
}
function ParserEncryptDone({ reset }: Props ) {
  const { t } = useTranslation('parser-encrypt')

  return (
    <Box>
      <Title mb='xl' order={3}>
        { t('doneTile') }
      </Title>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={ reset }>
          { t('donePrompt') }
        </Button>
      </Box>
    </Box>
  )
}

export default ParserEncryptDone