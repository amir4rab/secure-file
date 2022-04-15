import React, { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';

interface IsPwaInterface {
  isPwa: boolean;
  install: () => Promise<boolean>;
  isLoading: boolean;
}

const isPwaContextDefaultValues : IsPwaInterface = {
  isPwa: false,
  install: async () => false,
  isLoading: true
};

const IsPwaContext = createContext<IsPwaInterface>(isPwaContextDefaultValues);

export const IsPwaProvider = ({ children }:{ children: JSX.Element | JSX.Element[] }) => {
  const [ isPwa, setIsPwa ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const deferredPrompt = useRef<Event>();
  
  useEffect(() => {
    if ( typeof window === 'undefined' ) return;

    //@ts-ignore
    if ( window.navigator.standalone! ) { 
      setIsPwa(true) 
    } else if ( window.matchMedia('(display-mode: standalone)').matches ) {
      setIsPwa(true)
    };
    setIsLoading(false)

    window.addEventListener("beforeinstallprompt", e => {
      // beforeinstallprompt fired;
      // Prevent Chrome 76 and earlier from automatically showing a prompt
      e.preventDefault();

      // Stash the event so it can be triggered later.
      deferredPrompt.current = e;
    });
    
  }, [])

  const install = () => new Promise< boolean >(( resolve ) => {
    try {
      // Show the prompt
      //@ts-ignore
      deferredPrompt.current && deferredPrompt.current.prompt();
  
      // Wait for the user to respond to the prompt
      //@ts-ignore
      deferredPrompt.current && deferredPrompt.current.userChoice.then( choiceResult => {
        if (choiceResult.outcome === "accepted") {
          // PWA setup accepted;
          resolve(true);
        } else {
          // PWA setup rejected;
          resolve(false);
        }
      });

      if ( deferredPrompt.current === null || typeof deferredPrompt.current === 'undefined' ) {
        resolve(false);
      }
    } catch(err) {
      console.error(err);
      resolve(false);
    }
  });
  
  const values = {
    isPwa, install, isLoading
  }

  return (
    <IsPwaContext.Provider value={ values }>
      { children }
    </IsPwaContext.Provider>
  )
}

const useIsPwa = () => {
  const { ...values } = useContext(IsPwaContext);

  return ( values )
};

export default useIsPwa;