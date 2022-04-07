import { Text } from '@mantine/core'
import React from 'react'

interface Props {
  searchQuery: string
}
function NoItemFounded({ searchQuery }: Props) {
  return (
    <Text pt='lg' align='center' sx={{ width: '100%' }}>
      { `Sorry couldn't find any item by name of "${ searchQuery }"` }
    </Text>
  )
}

export default NoItemFounded