import { Title, Box, Text, Center, Anchor } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { SiGithub } from 'react-icons/si'

function About() {
  const { t } = useTranslation('about');
  const { t: commonT } = useTranslation('common');

  return (
    <>
      <Title my='lg' order={1}>
        { t('title') }
      </Title>
      <Box>
        <Text>
          { t('subtitle') }
        </Text>
        <Title order={3} mt='lg' mb='md'>
          { commonT('links') }
        </Title>
        <Center sx={{ justifyContent: 'flex-start' }}>
          <Anchor href={ process.env.NEXT_PUBLIC_GITHUB_URL } target='_blank' rel='noreferrer' sx={{ display: 'flex', alignItems: 'center' }}>
            <SiGithub style={{ marginRight: '.5rem', display: 'block' }} />
            <Text>
              { commonT('github') }
            </Text>
          </Anchor>
        </Center>
      </Box>
    </>
  )
}

export default About