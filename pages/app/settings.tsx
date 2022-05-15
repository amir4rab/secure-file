import React from 'react'
import type { NextPage } from 'next';

import HeadDetails from '@/components/headDetails';
import Settings from '@/components/settings';

const Home: NextPage = () => {
  return (
    <>
      <HeadDetails title='Secure File App' />
      <Settings />
    </>
  )
}

export default Home