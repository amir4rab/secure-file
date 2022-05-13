const skipPwaInstall = ( userBrowser: string ): boolean => {
  const browserList = [ 'firefox', 'safari', 'electron' ];

  if ( browserList.includes(userBrowser.toLocaleLowerCase()) ) {
    return true;
  }

  return false
};

export default skipPwaInstall;