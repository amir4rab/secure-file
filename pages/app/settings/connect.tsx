import React from 'react'
import type { NextPage } from 'next';

import HeadDetails from '@/components/headDetails';
import { ConnectSettings } from '@/components/settings-components';

const AccountSettingsPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Settings' />
      <ConnectSettings />
    </>
  )
}

export default AccountSettingsPage