import useInit from '@/hooks/useInit';
import { LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useContext, createContext, useState, useEffect, useRef } from 'react';

const pagesWithInitialLoading = [
  '/app',
  '/connect',
  '/connect/data'
];

const doesPageNeedInitialLoading = () => {
  if ( typeof window === 'undefined' ) return false;
  
  return pagesWithInitialLoading.includes(window.location.pathname)
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

  useInit(() => {
    if ( !doesPageNeedInitialLoading() ) setVisible(false);
  }, false)

  const setIsLoading = ( a: boolean ) => {
    receivedPageRender.current = window.location.pathname;
    setVisible(a);
  }

  useEffect(() => {
    if ( typeof window === 'undefined' ) return;
    if ( receivedPageRender.current === router.pathname ) return;

    pagesWithInitialLoading.includes(router.pathname) ? 
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