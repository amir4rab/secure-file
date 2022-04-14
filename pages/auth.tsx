import React, { useEffect } from 'react'
import type { NextPage } from 'next';
import dynamic from 'next/dynamic'

import HeadDetails from '@/components/headDetails';
import Head from 'next/head';
import useAuth from '@/hooks/useAuth';
import { LoadingOverlay } from '@mantine/core';

import Setup from '@/components/setup';
import { useRouter } from 'next/router';

const DynamicSetup = dynamic(() => import('@/components/setup'), { loading: () => <LoadingOverlay visible={ true } />, ssr: false })
const DynamicLogin = dynamic(() => import('@/components/login'), { loading: () => <LoadingOverlay visible={ true } />, ssr: false })

const AuthPage: NextPage = () => {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if ( status === 'authenticated' ) router.push('app');
  }, [ status, router ])


  return (
    <>
      <HeadDetails title='Authentication Page' />
      {
        status === 'newUser' ? <DynamicSetup /> :
        status === 'unauthenticated' ? <DynamicLogin /> :
        status === 'loading' ? <LoadingOverlay visible={ true } /> : null
      }
    </>
  )
}

export default AuthPage