import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import HeadDetails from '@/components/headDetails';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Secure file App' />
      </Head>
      <main>
        Connect will be added in feature updates
      </main>
    </>
  )
}

export default Home