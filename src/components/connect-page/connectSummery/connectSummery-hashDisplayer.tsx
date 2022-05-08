import React from 'react'


// utils
import strToArray from '@/utils/frontend/strToArray';
import { SimpleGrid } from '@mantine/core';

interface Props {
  hash: string
}
const ConnectSummeryHashDisplayer = ( { hash }: Props ) => {
  return (
    <SimpleGrid mb='xl' cols={8} spacing='xs' breakpoints={[{ cols: 4, maxWidth: 'md' }]}>
      { strToArray(hash).map(value => (<p style={{ textAlign: 'center' }} key={value}>{ value }</p>))}
    </SimpleGrid>
  )
}

export default ConnectSummeryHashDisplayer