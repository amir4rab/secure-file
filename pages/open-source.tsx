import React from 'react'
import { NextPage } from 'next';
import HeadDetails from '@/components/headDetails';
import OpenSource from '@/components/openSource';

const OpenSourcePage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Reset Page' />
      <OpenSource />
    </>
  )
}

export default OpenSourcePage