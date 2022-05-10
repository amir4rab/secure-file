import { Text } from '@mantine/core'
import Trans from '@/translation/Trans';
import React from 'react'

interface Props {
  searchQuery: string
}
function NoItemFounded({ searchQuery }: Props) {
  return (
    <Text pt='lg' align='center' sx={{ width: '100%' }}>
      <Trans
        ns='file-displayer'
        i18nKey='noSearchResult'
        values={{ searchQuery }}
      />
    </Text>
  )
}

export default NoItemFounded