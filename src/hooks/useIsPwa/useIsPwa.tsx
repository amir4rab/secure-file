import React, { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';

interface IsPwaInterface {
  isPwa: boolean;
  install: () => Promise<boolean>;
  isLoading: boolean;
  isInstallReady: boolean;
  newVersionIsAvailable: boolean;
  updateWorker: ( a: boolean ) => void;
}

const isPwaContextDefaultValues : IsPwaInterface = {
  isPwa: false,
  install: async () => false,
  updateWorker: async ( a: boolean ) => false,
  isLoading: true,
  isInstallReady: false,
  newVersionIsAvailable: false
};

const IsPwaContext = createContext<IsPwaInterface>(isPwaContextDefaultValues);

export const IsPwaProvider = ({ children }:{ children: JSX.Element | JSX.Element[] }) => {
  const [ isPwa, setIsPwa ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isInstallReady, setIsInstallReady ] = useState(false);
  const [ newVersionIsAvailable, setNewVersionIsAvailable ] = useState(false);
  const deferredPrompt = useRef<Event>();

  useEffect( () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      
      // @ts-ignore
      wb.addEventListener('installed', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      
      // @ts-ignore
      wb.addEventListener('controlling', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
      
      // @ts-ignore
      wb.addEventListener('activated', event => {
        console.log(`Event ${event.type} is triggered.`)
        console.log(event)
      })
    
      const promptNewVersionAvailable = () => {
        setNewVersionIsAvailable( true );
      }

      // @ts-ignore
      wb.addEventListener('waiting', promptNewVersionAvailable)
    }
  }, []);

  const updateWorker = ( accepted: boolean ) => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      if ( accepted ) {
        // @ts-ignore
        wb.addEventListener('controlling', () => {
          window.location.reload()
        })

        // Send a message to the waiting service worker, instructing it to activate.
        // @ts-ignore
        wb.messageSkipWaiting()
      } else {
        setNewVersionIsAvailable(false);
        console.log(
          'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
        )
      }
    }
  }
  
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
      setIsInstallReady(true)

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
    isPwa, install, isLoading, isInstallReady, newVersionIsAvailable, updateWorker
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