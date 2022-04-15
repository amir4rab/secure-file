import React, { useCallback, useEffect, useState } from 'react';
import { useUserAgent } from 'next-useragent'

const supportedBrowsersArray = [
  'firefox',
  'chrome'
];

type UnsupportedBrowserErrors = 'unsupportedBrowser' | 'oldBrowser' | '';

const checkRequirements = async ( browser: string, version: number  ): Promise<{ supported: true, error: null } | { supported: false, error: UnsupportedBrowserErrors }> => {
  if( !supportedBrowsersArray.includes(browser.toLocaleLowerCase()) ) return ({
    supported: false,
    error: 'unsupportedBrowser'
  })

  if ( version < 95 ) return ({
    supported: false,
    error: 'oldBrowser'
  })

  const estimate = await navigator.storage.estimate();
  if( estimate.quota! < 3_000_000_000 ) return ({
    supported: false,
    error: 'unsupportedBrowser'
  });

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

  const init = useCallback( async () => {
    const { error, supported } = await checkRequirements( browser, browserVersion );
    setIsSupported(supported);

    if ( !supported ) {
      setError(error);
    }

    setIsLoading(false);
  }, [ browser, browserVersion ])

  useEffect(() => {
    if ( typeof window === 'undefined' ) return;
    init();
  }, [ init ]);

  return ({
    error, isSupported, isLoading, userBrowser: browser, browserVersion
  })
}

export default useIsSupported