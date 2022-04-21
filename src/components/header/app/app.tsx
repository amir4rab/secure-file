import React, { useState, useEffect } from 'react'
import { Tabs, createStyles } from '@mantine/core';
import { IoSettings, IoFolder, IoPaperPlane, IoLockOpen } from 'react-icons/io5';
import { useRouter } from 'next/router';

const locationsArray = [
  {
    path: '/',
    url: '',
    isAbsolute: false
  },
  {
    path: '/connect',
    url: 'connect',
    isAbsolute: false
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
  const currentPath = pathname.includes('app') ? 
    ( pathname.endsWith('app') ? pathname + '/' : pathname ).slice(5):
    ( pathname.endsWith('parser') ? pathname + '/' : pathname ).slice(1);

  // removes the end of path
  // eg: settings/account => settings
  const currentPathString = currentPath.indexOf('/') !== -1 ? currentPath.slice(0, currentPath.indexOf('/')) : currentPath;

  return currentPathString
}

const AppHeader = () => {
  const router = useRouter();
  const [ activeTab, setActiveTab ] = useState(0);
  const [ initialLoad, setInitialLoad ] = useState(true);
  const { classes } = useStyles();

  const changeTab = ( input: number ) => {
    router.push( !locationsArray[input].isAbsolute ? '/app' + locationsArray[input].path : locationsArray[input].path );
  };

  useEffect(() => {
    const currentPath = getPathName(router.pathname);
    
    const arrayIndex = locationsArray.findIndex(({ url }) => url === currentPath );
    if( arrayIndex === activeTab ) {
      return;
    }
    setActiveTab(arrayIndex);

  }, [ router, activeTab, initialLoad ]);

  return (
    <>
      {/* Mobile Navbar */}
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