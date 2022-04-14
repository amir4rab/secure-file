import React, { useEffect, useState } from 'react';
import { useUserAgent } from 'next-useragent'

const supportedBrowsersArray = [
  'firefox',
  'chrome'
];

type UnsupportedBrowserErrors = 'unsupportedBrowser' | 'oldBrowser' | '';

const checkRequirements = ( browser: string, version: number  ): { supported: true, error: null } | { supported: false, error: UnsupportedBrowserErrors } => {
  if( !supportedBrowsersArray.includes(browser.toLocaleLowerCase()) ) return ({
    supported: false,
    error: 'unsupportedBrowser'
  })

  if ( version < 100 ) return ({
    supported: false,
    error: 'oldBrowser'
  })

  return ({
    supported: true,
    error: null
  })
}

function useIsSupported() {
  const { browser, browserVersion } = useUserAgent( typeof window !== 'undefined' ? window.navigator.userAgent : '');
  const [ error, setError ] = useState< UnsupportedBrowserErrors >('');
  const [ isSupported, setIsSupported ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if ( typeof window === 'undefined' ) return;

    const { error, supported } = checkRequirements( browser, browserVersion );
    setIsSupported(supported);

    if ( !supported ) {
      setError(error);
    }

    setIsLoading(false);

  }, [ browser, browserVersion ]);

  return ({
    error, isSupported, isLoading, userBrowser: browser, browserVersion
  })
}

export default useIsSupported