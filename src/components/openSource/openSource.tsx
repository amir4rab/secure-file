import { Box, Title, Text, Anchor, Group, Image } from '@mantine/core'
import React from 'react'
import Link from '../link'

import { SiGnu, SiGithub } from 'react-icons/si'

const githubLink = 'https://github.com/amir4rab/secure-file';
const gnuV3License = 'https://www.gnu.org/licenses/gpl-3.0.en.html'

function OpenSource() {
  return (
    <Box>
      <Image src='/images/license.jpg' alt='banner' radius='md' mb='lg' />
      <Title mb='md' order={1}>
        Secure File is Open Source
      </Title>
      <Box>
        <Text>
          Secure file is an open source project, under <Link data-testid='licenseLink' path='/license' >GPL V3 license</Link>, feel free to check out our source code on <Anchor href={ githubLink } target='_blank' rel='noreferrer' data-testid='githubLink'>Github</Anchor>.
        </Text>
      </Box>
      <Box mt='lg'>
        <Title my='md' order={3}>Links</Title>
        <Group my='md'>
          <Anchor data-testid='gplLink' href={ gnuV3License } target='_blank' rel='noreferrer'>
            <Group>
              <SiGnu />
              <Text>GPL V3 license</Text>
            </Group>
          </Anchor>
        </Group>
        <Group my='md'>  
          <Anchor href={ githubLink } target='_blank' rel='noreferrer'>
            <Group>
              <SiGithub />
              <Text>Github Repository</Text>
            </Group>
          </Anchor>
        </Group>
      </Box>
    </Box>
  )
}

export default OpenSource