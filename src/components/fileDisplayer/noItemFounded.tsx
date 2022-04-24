import { Text } from '@mantine/core'
import Trans from 'next-translate/Trans';
import React from 'react'

interface Props {
  searchQuery: string
}
function NoItemFounded({ searchQuery }: Props) {
  return (
    <Text pt='lg' align='center' sx={{ width: '100%' }}>
      <Trans
        i18nKey='file-displayer:noSearchResult'
        values={{ searchQuery }}
      />
    </Text>
  )
}

export default NoItemFounded