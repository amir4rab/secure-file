import React, { useContext, createContext, useState, useEffect, useRef } from 'react';
import { useBrowserInfo } from '@/hooks/useBrowserInfo';
import useInit from '@/hooks/useInit';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import { Feature } from '@/utils/frontend/isFeatureSupported';

type PageObject = { url: string, name: Feature }
const pagesWithInitialLoading: PageObject[] = [
  {
    url: '/app',
    name: 'file',
  },
  {
    url: '/connect',
    name: 'connect',
  },
  {
    url: '/connect/data',
    name: 'connect',
  }
];

const doesPageNeedInitialLoading = () => {
  if ( typeof window === 'undefined' ) return false;
  
  // return pagesWithInitialLoading.includes(page => page.url === window.location.pathname)
  let res = false;
  pagesWithInitialLoading.forEach(({ url }) => {
    if ( url === window.location.pathname ) res = true;
  });
  return res;
}

const currentPageObj = (): null | PageObject => {
  let res = null;
  pagesWithInitialLoading.forEach(pageObj => {
    if ( pageObj.url === window.location.pathname ) res = pageObj;
  });
  return res;
}

interface LoadingOverlayContextValue {
  isLoading: boolean;
  setIsLoading: ( a: boolean ) => void
}

const defaultLoadingOverlayContext: LoadingOverlayContextValue = {
  isLoading: false,
  setIsLoading: () => {}
}

const LoadingOverlayContext = createContext< LoadingOverlayContextValue >(defaultLoadingOverlayContext);

const LoadingOverlayProvider = ({ children }:{ children: JSX.Element | JSX.Element[] }) => {
  const [ visible, setVisible ] = useState< boolean >(true);
  const router = useRouter();
  const receivedPageRender = useRef< null | string >(null);
  const { checkSupport } = useBrowserInfo();

  useInit(() => {
    if ( !doesPageNeedInitialLoading() ) setVisible(false);
    if ( currentPageObj() !== null && checkSupport(currentPageObj()?.name as Feature) ) setVisible(false);
  }, false)

  const setIsLoading = ( a: boolean ) => {
    receivedPageRender.current = window.location.pathname;
    setVisible(a);
  }

  useEffect(() => {
    if ( typeof window === 'undefined' ) return;
    if ( receivedPageRender.current === router.pathname ) return;

    doesPageNeedInitialLoading() ? 
      setVisible(true):
      setVisible(false);
  }, [ router ])

  return (
    <LoadingOverlayContext.Provider value={{ isLoading: visible, setIsLoading }}>
      <LoadingOverlay visible={ visible } style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%' }} />
      { children }
    </LoadingOverlayContext.Provider>
  )
};

export const useLoadingOverlay = () => {
  const context = useContext(LoadingOverlayContext);

  return context;
}

export default LoadingOverlayProvider;