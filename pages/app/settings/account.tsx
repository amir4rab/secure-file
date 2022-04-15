import React from 'react'
import type { NextPage } from 'next';
import Head from 'next/head';
import HeadDetails from '@/components/headDetails';
import { AccountSettings } from '@/components/settings-components';

const AccountSettingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <HeadDetails title='Settings' />
      </Head>
      <AccountSettings />
    </>
  )
}

export default AccountSettingsPage