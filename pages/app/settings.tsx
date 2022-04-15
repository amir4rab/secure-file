import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import HeadDetails from '@/components/headDetails';
import Settings from '@/components/settings';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Secure File App' />
      </Head>
      <Settings />
    </>
  )
}

export default Home