import { Box, Title, Text, Anchor, Group, Image } from '@mantine/core'
import React from 'react'
import Link from '../link'

import { SiGnu, SiGithub } from 'react-icons/si'
import useTranslation from '@/translation/useTranslation';;
import Trans from '@/translation/Trans';

const githubLink = 'https://github.com/amir4rab/secure-file';

function OpenSource() {
  const { t } = useTranslation('openSource');
  const { t: commonT } = useTranslation('common');

  return (
    <Box>
      <Image src='/images/license.jpg' alt='banner' radius='md' mb='lg' />
      <Title mb='md' order={1}>
        { t('title') }
      </Title>
      <Box>
        <Text pb='md' size='lg'>
          { t('licenseHead') }
        </Text>
          { t('licenseBody0') }
        <Text pb='md'>
          { t('licenseBody1') }
        </Text>
        <Trans 
          ns='openSource'
          i18nKey='licenseFooter'
          components={[
            <Text pb='md' key={0} />,
            <Anchor href='https://www.gnu.org/licenses' target='_blank' rel='noreferrer' key={1} />
          ]}
        />
      </Box>
      <Box mt='lg'>
        <Title my='md' order={3}>Links</Title>
        <Group my='md'>
          <Link data-testid='gplLink' path='/license'>
            <Group>
              <SiGnu />
              <Text>GPL V3 license</Text>
            </Group>
          </Link>
        </Group>
        <Group my='md'>  
          <Anchor href={ githubLink } target='_blank' rel='noreferrer'>
            <Group>
              <SiGithub />
              <Text>{ commonT('github') + ' ' + commonT('repository') }</Text>
            </Group>
          </Anchor>
        </Group>
      </Box>
    </Box>
  )
}

export default OpenSource