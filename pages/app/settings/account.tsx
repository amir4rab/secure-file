import React from 'react'
import type { NextPage } from 'next';

import HeadDetails from '@/components/headDetails';
import { AccountSettings } from '@/components/settings-components';

const AccountSettingsPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Settings' />
      <AccountSettings />
    </>
  )
}

export default AccountSettingsPage