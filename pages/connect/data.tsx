import { NextPage } from 'next';
import React from 'react'

import HeadDetails from '@/components/headDetails';
import ConnectDataWrapper from '@/components/connect-components/connectDataWrapper';

const DataConnectionPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Secure File Connect' />
      <ConnectDataWrapper />
    </>
  )
}

export default DataConnectionPage