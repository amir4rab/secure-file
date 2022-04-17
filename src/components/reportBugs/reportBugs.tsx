import { Title, Text, Anchor } from '@mantine/core'
import React from 'react'
import Link from '../link'

function ReportBugs() {
  return (
    <div>
      <Title mb='lg' order={1}>
        Report Bugs
      </Title>
      <Text>
        Reporting bugs are a massive help to us in our development journey, please consider reporting any bugs you have received.
      </Text>
      <Text>
        You can report any bugs you have seen <Anchor  href='https://github.com/amir4rab/secure-file/issues' target='_blank' rel='noreferrer'>here</Anchor>.
      </Text>
    </div>
  )
}

export default ReportBugs