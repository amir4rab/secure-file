import React, { useEffect, useState } from 'react';

// Next.js hooks
import { useRouter } from 'next/router';

// Mantine components
import { AppShell, Container, LoadingOverlay, Space } from '@mantine/core';

// components
import { WebHeader, MobileNavbar } from '@/components/header/web';
import AppHeader from '@/components/header/app';
import Affix from '@/components/affix';
import Footer from '@/components/footer';

// layouts
import { LayoutProvider } from './layout.provider';

// hooks
import useAuth from '@/hooks/useAuth';
import useMediaQuery from '@/hooks/useMediaQuery';
import useInit from '@/hooks/useInit';

const Layout = ({ children }:{ children: JSX.Element }) => {
  // App states
  const [ isApp, setIsApp ] = useState( typeof process.env.NEXT_PUBLIC_IS_APP !== 'undefined' ? process.env.NEXT_PUBLIC_IS_APP === 'true' : false );
  const [ appLoaded, setAppLoaded ] = useState(false);

  // default states
  const [ initialLoad, setInitialLoad ] = useState(true);
  
  // hooks
  const { status } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const router = useRouter();

  // initial re-routing //
  useEffect(() => {
    if ( !initialLoad || status === 'loading' ) return;

    if ( router.pathname.includes('/app') ) {
      switch(status) {
        case 'newUser' : {
          router.push('/auth')
          break;
        }
        case 'unauthenticated' : {
          router.push('/auth')
          break;
        }
      }
      setInitialLoad(false);
    }

    if ( router.pathname.includes('/setup') ) {
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
  }, [ router, status, initialLoad ]);

  // checks if running as a electron app //
  useInit( async () => {
    if ( isApp ) {
      await router.push('/auth');
      setAppLoaded(true);
    }
  }, false)

  if ( isApp && !appLoaded ) {
    //* Displays Loading screen until app is loaded *//
    <LayoutProvider>
      <LoadingOverlay visible={ true } />
    </LayoutProvider>
  } else if ( router.pathname.includes('/app') && status !== 'authenticated' ) {
    //* Displays loading on login page if user isn't logged in *//
    return (
      <LayoutProvider>
        <Container sx={(theme) => ({ [`@media(max-width:${theme.breakpoints.md}px)`]: { padding: '4rem 0 2rem 10rem' }, padding: '2rem', paddingBottom: '10vh', minHeight: '100vh', position: 'relative' })}>
        </Container>
      </LayoutProvider>
    )
  } else if ( router.pathname.includes('/app') && status === 'authenticated' || router.pathname.includes('/parser') || router.pathname.includes('/connect') ) {
    //* Displays App navigation *//
    return (
      <LayoutProvider>
        <Container sx={(theme) => ({ [`@media(min-width:${theme.breakpoints.md}px)`]: { padding: '4rem 0 2rem 10rem' }, padding: '2rem', paddingBottom: '10vh', minHeight: '100vh', position: 'relative' })}>
          { children }
          <AppHeader />
        </Container>
      </LayoutProvider>
    );
  } else {
    //* Displays Website navigation *//
    return (
      <LayoutProvider>
        <AppShell
          fixed
          padding="md"
          header={ <WebHeader height={ isDesktop ? '6rem' : '3rem'}/> }
          navbar={ <MobileNavbar /> }
        >
          <Space h={  isDesktop ? 6 * 18 : 3 * 18 } />
          <Container>
            { children }
          </Container>
          <Footer />
          <Affix />
        </AppShell>
      </LayoutProvider>
    );
  }

  return (
    //* Displays Loading screen *//
    <LayoutProvider>
      <LoadingOverlay visible={ true } />
    </LayoutProvider>
  )
}

export default Layout