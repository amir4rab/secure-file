import React, { useState, useEffect } from 'react'
import { MediaQuery, Tabs } from '@mantine/core';
import { IoSettings, IoFolder, IoPaperPlane } from 'react-icons/io5';
import { useRouter } from 'next/router';

const locationsArray = [
  '/',
  '/connect',
  '/settings'
]

const AppHeader = () => {
  const router = useRouter();
  const [ activeTab, setActiveTab ] = useState(0);
  const [ initialLoad, setInitialLoad ] = useState(true);

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
      <MediaQuery largerThan='md' styles={{ display: 'none' }}>
        <Tabs
          sx={(theme) => ({ 
            position: 'fixed', 
            left: '1rem', 
            bottom: '1rem', 
            background: theme.colors.dark[5], 
            padding: '1rem .5rem', 
            borderRadius: '1rem', 
            width: 'calc(100% - 2rem)',
          })} 
          active={activeTab} 
          onTabChange={changeTab}
          variant='pills'
          tabPadding='md'
          position='center'
        >
          <Tabs.Tab sx={{ width: '30%', borderRadius: '.5rem' }} icon={ <IoFolder/> } label="Folder" />
          <Tabs.Tab sx={{ width: '30%', borderRadius: '.5rem' }} icon={ <IoPaperPlane/> } label="Connect" />
          <Tabs.Tab sx={{ width: '30%', borderRadius: '.5rem' }} icon={ <IoSettings/> } label="Settings" />
        </Tabs>
      </MediaQuery>
      <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
        <Tabs
          sx={(theme) => ({ 
            position: 'fixed',
            top: '2rem',
            left: '0rem', 
            bottom: '0rem', 
            height: 'calc(100% - 2rem)',
            width: '10rem',
            padding: '2rem 0',
            '@media(min-width:960px)': {
              left: 'calc(calc(100vw - 960px)/2)'
            }
          })} 
          active={activeTab} 
          onTabChange={changeTab}
          orientation='vertical'
          tabPadding='lg'
        >
          <Tabs.Tab icon={ <IoFolder/> } label="Folder" />
          <Tabs.Tab icon={ <IoPaperPlane/> } label="Connect" />
          <Tabs.Tab icon={ <IoSettings/> } label="Settings" />
        </Tabs>
      </MediaQuery>
    </>
  )
}

export default AppHeader