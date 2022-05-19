import { useState, createContext, useContext } from 'react'
import UaParserJs from 'ua-parser-js'
import useInit from '../useInit';

import isFeatureSupported, { Feature } from '@/utils/frontend/isFeatureSupported';
import getQuota from '@/utils/frontend/getQuota';


interface BrowserInfo {
  name: string;
  version: number;
};

interface BrowserInfoContextInterface { 
  browser: BrowserInfo;
  isLoading: boolean;
  quota: number | null;
}

const browserInfoContextDefaultValue: BrowserInfoContextInterface = {
  browser: {
    name: '',
    version: 0
  },
  isLoading: true,
  quota: null
}

const BrowserInfoContext = createContext<BrowserInfoContextInterface>(browserInfoContextDefaultValue);

const BrowserInfoProvider = ({ children }:{ children: JSX.Element | JSX.Element[] }) => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ browser, setBrowser ] = useState< BrowserInfo >(browserInfoContextDefaultValue.browser);
  const [ quota, setQuota ] = useState< null | number >(null);

  useInit(() => {
    const uaParserJs = new UaParserJs();
    const { name= '', version= '0' } = uaParserJs.getBrowser()
    setBrowser({ name, version: +version });
    setIsLoading(false);
    getQuota().then( value => setQuota(value) );
  }, false)

  const value: BrowserInfoContextInterface = {
    isLoading,
    browser,
    quota
  }

  return (
    <BrowserInfoContext.Provider value={ value } >
      { children }
    </BrowserInfoContext.Provider>
  )
}

export const useBrowserInfo = () => {
  const browserInfo = useContext(BrowserInfoContext);

  const checkSupport = ( feature: Feature ) => isFeatureSupported(browserInfo.browser.name, feature, browserInfo.quota);

  return ({ ...browserInfo, checkSupport })
}

export default BrowserInfoProvider