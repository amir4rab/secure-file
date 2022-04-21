import Parser from '@/components/parser'
import { NextPage } from 'next'
import React from 'react'
import HeadDetails from '@/components/headDetails';

const ParserPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Parser' />
      <Parser />
    </>
  )
}

export default ParserPage