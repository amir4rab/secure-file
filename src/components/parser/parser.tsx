import React from 'react';

// mantine components
import { Box, Title, SimpleGrid, Text } from '@mantine/core';

// translation
import useTranslation from '@/translation/useTranslation';

// icons
import { IoLockClosed, IoLockOpen } from 'react-icons/io5';

// components
import ParserCard from './parser-card';

// hooks
import { useBrowserInfo } from '@/hooks/useBrowserInfo';

function Parser() {
  const { t } = useTranslation('parser');
  const { t: commonErrorsT } = useTranslation('common-errors');
  const { checkSupport, isLoading: useBrowserLoading } = useBrowserInfo();

  if( !checkSupport('parser') && !useBrowserLoading ) return (
    <Box sx={(theme) => ({ minHeight: 'calc(100vh - 8rem)', [`@media(min-width:${theme.breakpoints.md}px)`]: { minHeight: 'calc(100vh-1rem)' } })}>
      <Text>
        { commonErrorsT('disabledDueToLimitation') }
      </Text>
    </Box>
  )

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