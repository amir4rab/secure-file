import React from 'react'
import { Center, Title } from '@mantine/core'
import UsageDisplayer from '../usageDisplayer'

function FileManagerHeader() {

  return (
    <Center sx={{ justifyContent: 'space-between' }}>
      <Title sx={{ marginBottom: '1rem' }} order={1}>Home</Title>
      <UsageDisplayer />
    </Center>
  )
}

export default FileManagerHeader