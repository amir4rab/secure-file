import React, { useEffect, useState } from 'react';

// Next.js hooks
import { useRouter } from 'next/router';

// Mantine components
import { AppShell, Container, createStyles, LoadingOverlay, Space } from '@mantine/core';

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
import LoadingOverlayProvider from '@/providers/loadingOverlayContext';

// styles
const useStyles = createStyles((theme) => ({
  appLayout: { 
    [ theme.fn.largerThan('md') ]: { 
      padding: '4rem 0 2rem 10rem'
    }, 
    padding: '2rem 1rem',
    paddingBottom: '10vh',
    minHeight: '100vh',
    position: 'relative'
  }
}));

const layoutDetector = ( currentPage: string ) => {
  const appPages = [ '/app', '/parser', '/connect' ];
  let useAppLayout = false;
  appPages.forEach(item => {
    if ( currentPage.startsWith(item) ){
      useAppLayout = true
    }
  })
  return useAppLayout
}

const Layout = ({ children }:{ children: JSX.Element }) => {
  // App states
  const [ isApp ] = useState( typeof process.env.NEXT_PUBLIC_IS_APP !== 'undefined' ? process.env.NEXT_PUBLIC_IS_APP === 'true' : false );
  const [ appLoaded, setAppLoaded ] = useState(false);
  
  // Classes
  const { classes } = useStyles();

  // hooks
  const { status } = useAuth();
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const router = useRouter();

  // default states
  const [ initialLoad, setInitialLoad ] = useState(true);

  // initial re-routing //
  useEffect(() => {
    if ( !initialLoad || status === 'loading' ) return;

    if ( router.pathname.includes('/app') && ( status === 'newUser' || status === 'unauthenticated') ) {
      router.push('/auth');
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

  //* Displays Loading screen until app is loaded *//
  if ( isApp && !appLoaded ) {
    return (
      <LayoutProvider>
        <LoadingOverlay visible={ true } />
      </LayoutProvider>
    )
  }; 
  
  //* Displays loading on login page if user isn't logged in *//
  if ( router.pathname.includes('/app') && status !== 'authenticated' ) {
    return (
      <LayoutProvider>
        <Container className={ classes.appLayout }>
        </Container>
      </LayoutProvider>
    )
  };

  //* Displays App navigation *//
  if ( layoutDetector(router.pathname) && status === 'authenticated' || layoutDetector(router.pathname) ) {
    return (
      <LoadingOverlayProvider>
        <LayoutProvider>
          <Container className={ classes.appLayout }>
            { children }
            <AppHeader />
          </Container>
        </LayoutProvider>
      </LoadingOverlayProvider>
    );
  };

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

export default Layout