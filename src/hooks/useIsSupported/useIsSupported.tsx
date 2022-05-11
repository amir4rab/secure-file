import { useCallback, useEffect, useState } from 'react';
import UaParserJs from 'ua-parser-js'

const supportedBrowsersArray = [
  'firefox',
  'chrome',
  'chrome webview',
  'electron'
];

export type UnsupportedBrowserErrors = 'unsupportedBrowser' | 'oldBrowser' | 'limitedBrowser';

const checkRequirements = async ( browser: string, version: number, os: string  ): Promise<{ supported: true, error: null } | { supported: false, error: UnsupportedBrowserErrors }> => {
  if ( browser.toLocaleLowerCase() === 'electron' ) return ({
    supported: true,
    error: null
  })

  if ( os.toLocaleLowerCase() === 'ios' ) return ({
    supported: false,
    error: 'limitedBrowser'
  })

  if( !supportedBrowsersArray.includes(browser.toLocaleLowerCase()) ) return ({
    supported: false,
    error: 'unsupportedBrowser'
  })

  if ( version < 80 ) return ({
    supported: false,
    error: 'oldBrowser'
  });

  const estimate = await navigator.storage.estimate();
  if( estimate.quota! < 3_000_000_000 ) return ({
    supported: false,
    error: 'limitedBrowser'
  });

  return ({
    supported: true,
    error: null
  })
}

function useIsSupported() {
  const [ error, setError ] = useState< UnsupportedBrowserErrors >();
  const [ isSupported, setIsSupported ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ browser, setBrowser ] = useState('');
  const [ browserVersion, setBrowserVersion ] = useState(0);

  const init = useCallback( async () => {
    const uaParserJs = new UaParserJs();
    const { name= '', version= '0' } = uaParserJs.getBrowser()
    const { name: os } = uaParserJs.getOS();

    const { error, supported } = await checkRequirements( name, parseInt(version), os as string );
    setIsSupported(supported);
    setBrowserVersion(parseInt(version))
    setBrowser(name)

    if ( !supported ) {
      setError(error);
    }

    setIsLoading(false);
  }, [])

  useEffect(() => {
    if ( typeof window === 'undefined' ) return;
    init();
  }, [ init ]);

  return ({
    error, isSupported, isLoading, userBrowser: browser, browserVersion
  })
}

export default useIsSupported