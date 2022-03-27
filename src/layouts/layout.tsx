import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell, Container, LoadingOverlay } from '@mantine/core';

import { WebHeader, MobileNavbar } from '@/components/header/web';
import AppHeader from '@/components/header/app';
import { LayoutProvider } from './layout.provider';
import useAuth from '@/hooks/useAuth';
import Affix from '@/components/affix';
import { useMediaQuery } from '@mantine/hooks';

const Layout = ({ children }:{ children: JSX.Element }) => {
  const [ initialLoad, setInitialLoad ] = useState(true);
  const { status } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const router = useRouter();

  useEffect(() => {
    // if ( status === 'loading' ) return;
    if ( !initialLoad || status === 'loading' ) return;

    if ( router.pathname.includes('/app') ) {
      switch(status) {
        case 'newUser' : {
          router.push('/setup')
          break;
        }
        case 'unauthenticated' : {
          router.push('/login')
          break;
        }
      }
      setInitialLoad(false);
    }

    if ( router.pathname.includes('/setup') ) {
      switch(status) {
        case 'unauthenticated' : {
          router.push('/login')
          break;
        }
        case 'authenticated' : {
          router.push('/app')
          break;
        }
      }
      setInitialLoad(false);
    }

    if ( router.pathname.includes('/login') ) {
      switch(status) {
        case 'newUser' : {
          router.push('/setup')
          break;
        }
        case 'authenticated' : {
          router.push('/app')
          break;
        }
      }
      setInitialLoad(false);
    }
  }, [ router, status, initialLoad ])

  if ( router.pathname.includes('/app') && status !== 'authenticated' ) {
    <LayoutProvider>
      <Container sx={(theme) => ({  [`@media(max-width:${theme.breakpoints.md}px)`]: { padding: '4rem 0 2rem 10rem' }, padding: '2rem', paddingBottom: '10vh', minHeight: '100vh', position: 'relative' })}>
      </Container>
    </LayoutProvider>
  } else if ( router.pathname.includes('/app') && status === 'authenticated'  ) {
    return (
      <LayoutProvider>
        <Container sx={(theme) => ({ [`@media(min-width:${theme.breakpoints.md}px)`]: { padding: '4rem 0 2rem 10rem' }, padding: '2rem', paddingBottom: '10vh', minHeight: '100vh', position: 'relative' })}>
          { children }
          <AppHeader />
        </Container>
      </LayoutProvider>
    )
  } else {
    return (
      <LayoutProvider>
        <AppShell
          fixed
          padding="md"
          header={ <WebHeader height={ isDesktop ? '6rem' : '3rem'}/> }
          navbar={ <MobileNavbar /> }
        >
          <Container>
            { children }
          </Container>
          <Affix />
        </AppShell>
      </LayoutProvider>
    )
  }
  return (
    <LayoutProvider>
      <LoadingOverlay visible={ true } />
    </LayoutProvider>
  )
}

export default Layout