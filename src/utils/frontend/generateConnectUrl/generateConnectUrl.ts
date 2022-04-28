const generateConnectUrl = ( id: string, secret: string ) => {
  if ( typeof window === 'undefined' ) return '';

  const hostname = window.location.hostname;

  const pathName = `/connect/data?id=${id}&secret=${secret}&initializer=false`;

  return 'https://' + hostname + pathName;
}

export default generateConnectUrl;