import { Box, Title, SimpleGrid } from '@mantine/core'
import useTranslation from '@/translation/useTranslation';;
import React from 'react'
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';

import ParserCard from './parser-card';

function Parser() {
  const { t } = useTranslation('parser');

  return (
    <Box>
      <Title order={1} mb='xl' mt='md'>
        { t('title') }
      </Title>
      <SimpleGrid 
        cols={2} 
        spacing='xl' 
        breakpoints={[
          { maxWidth: 'md', cols: 1, spacing: 'md' },
        ]}
      >
        <ParserCard
          title={ t('encrypt') }
          description={ t('encryptText') }
          prompt={ t('encryptPrompt') }
          icon={ <IoLockClosed style={{ fontSize: '1.25rem' }} /> }
          path='/encrypt'
        />
        <ParserCard
          title={ t('decrypt') }
          description={ t('decryptText') }
          prompt={ t('decryptPrompt') }
          icon={ <IoLockOpen style={{ fontSize: '1.25rem' }} /> }
          path='/decrypt'
        />
      </SimpleGrid>
    </Box>
  )
}

export default Parser