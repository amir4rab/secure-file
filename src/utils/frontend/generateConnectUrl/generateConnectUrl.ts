const generateConnectUrl = ( id: string, secret: string ) => {
  if ( typeof window === 'undefined' ) return '';

  const hostname = 
    typeof process.env.NEXT_PUBLIC_WEBSITE_URL !== 'undefined' ? 
    process.env.NEXT_PUBLIC_WEBSITE_URL :
    window.location.hostname;

  const pathName = `/connect/data?id=${id}&secret=${secret}&initializer=false`;

  return 'https://' + hostname + pathName;
}

export default generateConnectUrl;