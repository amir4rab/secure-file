export type Feature = 'file' | 'parser' | 'connect'; 

const fileSupported  = [ 'chrome', 'chromium', 'firefox', 'electron' ];
const parserSupported  = [ 'chrome', 'chromium', 'firefox', 'electron' ];
const connectSupported  = [ 'chrome', 'chromium', 'electron', 'safari', 'mobile safari' ];

const isFeatureSupported = ( userBrowser: string, feature: Feature, quota: null | number ) => {
  switch ( feature ) {
    case 'file': {
      if ( !fileSupported.includes(userBrowser.toLowerCase()) ) return false;
      if ( quota !== null && quota < 3_000_000_000 ) return false;
      return true;
    };
    case 'parser': {
      return parserSupported.includes(userBrowser.toLowerCase());
    }
    case 'connect': {
      return connectSupported.includes(userBrowser.toLowerCase());
    }
  }

  return false;
}

export default isFeatureSupported