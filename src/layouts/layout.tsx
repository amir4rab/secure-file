import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell, Container } from '@mantine/core';

import { WebHeader, MobileNavbar } from '@/components/header/web';
import AppHeader from '@/components/header/app';
import { LayoutProvider } from './layout.provider';
import useAuth from '@/hooks/useAuth';

const Layout = ({ children }:{ children: JSX.Element }) => {
  const [ initialLoad, setInitialLoad ] = useState(true);
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if ( status === 'loading' ) return;
    // if ( !initialLoad || status === 'loading' ) return;

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
      <Container sx={{ '@media(min-width: 992px)': { padding: '4rem 0 2rem 10rem' }, padding: '2rem', paddingBottom: '10vh', minHeight: '100vh', position: 'relative' }}>
          <p>loading...</p>
      </Container>
    </LayoutProvider>
  }

  if( router.pathname.includes('/app') && status === 'authenticated'  ) {
    return (
      <LayoutProvider>
        <Container sx={{ '@media(min-width: 992px)': { padding: '4rem 0 2rem 10rem' }, padding: '2rem', paddingBottom: '10vh', minHeight: '100vh', position: 'relative' }}>
          { children }
          <AppHeader />
        </Container>
      </LayoutProvider>
    )
  }

  return (
    <LayoutProvider>
      <AppShell
        fixed
        padding="md"
        header={ <WebHeader height={60}/> }
        navbar={ <MobileNavbar /> }
      >
        <Container>
          { children }
        </Container>
      </AppShell>
    </LayoutProvider>
  )
}

export default Layout