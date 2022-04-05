import React, { useState, useEffect } from 'react'
import { MediaQuery, Tabs, createStyles } from '@mantine/core';
import { IoSettings, IoFolder, IoPaperPlane } from 'react-icons/io5';
import { useRouter } from 'next/router';

const locationsArray = [
  '/',
  '/connect',
  '/settings'
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
    width: '30%',
    borderRadius: '.5rem'
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
})) 

const AppHeader = () => {
  const router = useRouter();
  const [ activeTab, setActiveTab ] = useState(0);
  const [ initialLoad, setInitialLoad ] = useState(true);
  const { classes } = useStyles();

  const changeTab = ( input: number ) => {
    router.push('/app' + locationsArray[input]);
    setActiveTab(input);
  };

  useEffect(() => {
    if ( !initialLoad ) return;
    setInitialLoad(false)

    const currentPath = ( router.pathname.endsWith('app') ? router.pathname + '/' : router.pathname ).slice(4);
    const arrayIndex = locationsArray.findIndex(item => item === currentPath);
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
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoFolder/> } label='Folder' />
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoPaperPlane/> } label='Connect' />
        <Tabs.Tab className={ classes.mobileNavbarItem } icon={ <IoSettings/> } label='Settings' />
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
        <Tabs.Tab icon={ <IoSettings/> } label='Settings' />
      </Tabs>
    </>
  )
}

export default AppHeader