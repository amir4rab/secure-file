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
        <Text pb='md' size='lg'>
          {`Copyright (C) 2021  amir4rab`}
        </Text>
          {`This program is free software: you can redistribute it and/or modify
          it under the terms of the GNU General Public License as published by
          the Free Software Foundation, either version 3 of the License, or
          (at your option) any later version.`}
        <Text pb='md'>
          {`This program is distributed in the hope that it will be useful,
          but WITHOUT ANY WARRANTY; without even the implied warranty of
          MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
          GNU General Public License for more details.`}
        </Text>
        <Text pb='md'>
          You should have received a copy of the GNU General Public License
          along with this program.  If not, see <Anchor href='https://www.gnu.org/licenses' target='_blank' rel='noreferrer'>https://www.gnu.org/licenses</Anchor>.
        </Text>
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
              <Text>Github Repository</Text>
            </Group>
          </Anchor>
        </Group>
      </Box>
    </Box>
  )
}

export default OpenSource