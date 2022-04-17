import { Title, Box, Text, Center, Anchor } from '@mantine/core'
import React from 'react'
import { SiGithub } from 'react-icons/si'

function About() {
  return (
    <>
      <Title my='lg' order={1}>
        About
      </Title>
      <Box>
        <Text>
          {`Secure file is a free and open-source web-application under GPL-3 license, with hope of being useful for it's users`}
        </Text>
        <Title order={3} mt='lg' mb='md'>
          Links
        </Title>
        <Center sx={{ justifyContent: 'flex-start' }}>
          <Anchor href={ process.env.NEXT_PUBLIC_GITHUB_URL } target='_blank' rel='noreferrer' sx={{ display: 'flex', alignItems: 'center' }}>
            <SiGithub style={{ marginRight: '.5rem', display: 'block' }} />
            <Text>
              Github
            </Text>
          </Anchor>
        </Center>
      </Box>
    </>
  )
}

export default About