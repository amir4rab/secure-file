export type Feature = 'file' | 'parser' | 'connect'; 

// const browserList = [ 'chrome', 'chromium', 'firefox', 'electron', 'safari' ];

// const fileUnsupported  = [ 'safari' ];
// const parserUnsupported  = [ 'safari' ];
// const sendUnsupported  = [ 'firefox' ];

const fileSupported  = [ 'chrome', 'chromium', 'firefox', 'electron' ];
const parserSupported  = [ 'chrome', 'chromium', 'firefox', 'electron' ];
const connectSupported  = [ 'chrome', 'chromium', 'electron', 'safari' ]

const isFeatureSupported = ( userBrowser: string, feature: Feature ) => {
  console.log(connectSupported.includes(userBrowser.toLowerCase()))

  switch ( feature ) {
    case 'file': {
      return fileSupported.includes(userBrowser.toLowerCase());
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