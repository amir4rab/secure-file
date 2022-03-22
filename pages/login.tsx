import React from 'react'
import type { NextPage } from 'next';
import HeadDetails from '@/components/headDetails';
import Head from 'next/head';
import Login from '@/components/login';

const LoginPage: NextPage = () => {
  return (
    <>
      <HeadDetails title='Setup Page' />
      <Login />
    </>
  )
}

export default LoginPage