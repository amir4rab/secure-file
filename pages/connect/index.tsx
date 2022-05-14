import React from 'react'
import { NextPage } from 'next';

import HeadDetails from '@/components/headDetails';
import ConnectPrompt from '@/components/connect-components/connectPrompt';

const ConnectPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Secure File Connect' />
      <ConnectPrompt />
    </>
  )
}

export default ConnectPage