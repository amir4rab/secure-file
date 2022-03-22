import React from 'react'
import type { NextPage } from 'next';
import HeadDetails from '@/components/headDetails';
import Head from 'next/head';
import Setup from '@/components/setup';

const SetupPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Setup Page' />
      <Setup />
    </>
  )
}

export default SetupPage