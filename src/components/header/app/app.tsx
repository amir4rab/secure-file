import React, { useState, useEffect, useRef } from 'react'
import { Tabs, createStyles } from '@mantine/core';
import { IoSettings, IoFolder, IoPaperPlane, IoLockOpen } from 'react-icons/io5';
import { NextRouter, useRouter } from 'next/router';

type LocationArray = {
  path: string,
  url: string,
  isAbsolute: boolean
}[]
const locationsArray: LocationArray = [
  {
    path: '/',
    url: '',
    isAbsolute: false
  },
  {
    path: '/connect',
    url: 'connect',
    isAbsolute: true
  },
  {
    path: '/parser',
    url: 'parser',
    isAbsolute: true
  },
  {
    path: '/settings',
    url: 'settings',
    isAbsolute: false
  },
]

const useStyles = createStyles((theme) => ({
  mobileNavbar: {
    [theme.fn.largerThan('md')]: {
      display: 'none'
    },
    position: 'fixed', 
    left: '1rem', 
    bottom: '1rem', 
    background: theme.colors.dark[5],
    padding: '1rem .5rem', 
    borderRadius: '1rem', 
    width: 'calc(100% - 2rem)',
    zIndex: 1,
  },
  mobileBackDrop: {
    zIndex: 0,
    left: 0,
    bottom: '-.25rem',
    width: '100%',
    height: '10vh',
    background: `linear-gradient(0deg, ${theme.colors.dark[7]}, ${theme.colors.dark[7]}00)`,
    position: 'fixed',
    [ theme.fn.largerThan('md') ] : {
      display: 'none'
    }
  },
  mobileNavbarItem: {
    width: '20%',
    borderRadius: '.5rem',
    padding: theme.spacing.sm
  },
  desktopNavbar: {
    position: 'fixed',
    top: '2rem',
    left: '0rem', 
    bottom: '0rem', 
    height: 'calc(100% - 2rem)',
    width: '10rem',
    padding: '2rem 0',
    [theme.fn.largerThan('md')]: {
      left: 'calc(calc(100vw - 960px)/2)'
    },
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  }
}));

const getPathName = ( pathname: string ) => {
  // removes the first part of path
  // eg: app/settings => settings
  const currentPath = 
    pathname.includes('app') ? ( pathname.endsWith('app') ? pathname + '/' : pathname ).slice(5):
    pathname.includes('parser') ? ( pathname.endsWith('parser') ? pathname + '/' : pathname ).slice(1):
    pathname.includes('connect') ? ( pathname.endsWith('connect') ? pathname + '/' : pathname ).slice(1): '';

  // removes the end of path
  // eg: settings/account => settings
  const currentPathString = currentPath.indexOf('/') !== -1 ? currentPath.slice(0, currentPath.indexOf('/')) : currentPath;

  return currentPathString
}

const prefetchPages = ( router: NextRouter, pathArray: LocationArray ) => {
  pathArray.forEach(({ isAbsolute, path }) => {
    router.prefetch(!isAbsolute ? '/app' + path : path)
  })
}

const AppHeader = () => {
  const router = useRouter();
  const initialRender = useRef(true);
  const [ activeTab, setActiveTab ] = useState(0);
  const { classes } = useStyles();

  const changeTab = ( input: number ) => {
    router.push( !locationsArray[input].isAbsolute ? '/app' + locationsArray[input].path : locationsArray[input].path );
  };

  useEffect(() => {
    if ( !initialRender.current ) return;

    prefetchPages(router, locationsArray)

    initialRender.current = false;
  }, [ router ])

  useEffect(() => {
    const currentPath = getPathName(router.pathname);
    
    const arrayIndex = locationsArray.findIndex(({ url }) => url === currentPath );
    if( arrayIndex === activeTab ) {
      return;
    }
    setActiveTab(arrayIndex);

  }, [ router, activeTab ]);

  return (
    <>
      {/* Mobile Navbar */}
      <div aria-label='hidden' className={ classes.mobileBackDrop }/>
      <Tabs
        className={ classes.mobileNavbar }
        active={activeTab} 
        onTabChange={changeTab}
        variant='pills'
        tabPadding='md'
        position='center'
      >
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoFolder/> } />
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoPaperPlane/> } />
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoLockOpen/> } />
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoSettings/> } />
      </Tabs>

      {/* Desktop Navbar */}
      <Tabs
        className={ classes.desktopNavbar }
        active={activeTab} 
        onTabChange={changeTab}
        orientation='vertical'
        tabPadding='lg'
      >
        <Tabs.Tab icon={ <IoFolder/> } label='Folder' />
        <Tabs.Tab icon={ <IoPaperPlane/> } label='Connect' />
        <Tabs.Tab icon={ <IoLockOpen/> } label='Parser' />
        <Tabs.Tab icon={ <IoSettings/> } label='Settings' />
      </Tabs>
    </>
  )
}

export default AppHeader