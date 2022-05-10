import { Title, Text, Anchor } from '@mantine/core'
import Trans from '@/translation/Trans';
import useTranslation from '@/translation/useTranslation';;
import React from 'react';

function ReportBugs() {
  const { t } = useTranslation('bug');

  return (
    <div>
      <Title mb='lg' order={1}>
        { t('title') }
      </Title>
      <Text>
        { t('subtitle') }
      </Text>
      <Trans
        ns='bug'
        i18nKey='footer'
        components={[
          <Text key={ 0 } />,
          <Anchor  href='https://github.com/amir4rab/secure-file/issues' target='_blank' rel='noreferrer' key={ 1 } />
        ]}
      />
    </div>
  )
}

export default ReportBugs