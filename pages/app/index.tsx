import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import HeadDetails from '@/components/headDetails';
import FileManager from '@/components/fileManager';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Secure File App' />
      </Head>
      <FileManager />
    </>
  )
}

export default Home