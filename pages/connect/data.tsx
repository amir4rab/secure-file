import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';

import HeadDetails from '@/components/headDetails';
import ConnectDataWrapper from '@/components/connect-components/connectDataWrapper';

const DataConnectionPage: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Secure File Connect' />
      </Head>
      <main>
        <ConnectDataWrapper />
      </main>
    </>
  )
}

export default DataConnectionPage