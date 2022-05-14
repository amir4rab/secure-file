import { NextPage } from 'next'
import React from 'react'

import HeadDetails from '@/components/headDetails';
import Parser from '@/components/parser'

const ParserPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Parser' />
      <Parser />
    </>
  )
}

export default ParserPage