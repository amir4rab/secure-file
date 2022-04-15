import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import HeadDetails from '@/components/headDetails';
import { ConnectSettings } from '@/components/settings-components';

const AccountSettingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Settings' />
      </Head>
      <ConnectSettings />
    </>
  )
}

export default AccountSettingsPage