import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';

import HeadDetails from '@/components/headDetails';
import ConnectPrompt from '@/components/connect-components/connectPrompt';

const ConnectPage: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Secure File Connect' />
      </Head>
      <main>
        {/* <ConnectPrompt /> */}
        <p>Coming soon</p>
      </main>
    </>
  )
}

export default ConnectPage