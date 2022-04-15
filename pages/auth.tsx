import React, { useEffect } from 'react'
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'

import useAuth from '@/hooks/useAuth';

import { LoadingOverlay } from '@mantine/core';

import HeadDetails from '@/components/headDetails';
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