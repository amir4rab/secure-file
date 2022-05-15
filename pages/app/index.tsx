import React from 'react'
import type { NextPage } from 'next';

import HeadDetails from '@/components/headDetails';
import FileManager from '@/components/fileManager';

const Home: NextPage = () => {
  return (
    <>
      <HeadDetails title='Secure File App' />
      <FileManager />
    </>
  )
}

export default Home