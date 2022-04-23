import Head from 'next/head';

const title = 'Secure File';
const description = 'Store your files safely inside your browser';
const webAddress = 'https://secure-file.amir4rab.com';
const creatorTwitter = 'amir4rab'

const PwaHead = () => {
  return (
    <Head>
      <link rel='manifest' href='/app.webmanifest' />

      <meta name='application-name' content={ title } />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={ title } />
      <meta name='apple-touch-fullscreen' content='yes' />

      <meta name='description' content={ description } />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#1A1B1E' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#1A1B1E' />

      <link rel='apple-touch-icon' href='/pwa/touch-icon-iphone.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/pwa/touch-icon-iphone-retina.png' />
      <link rel='apple-touch-icon' sizes='167x167' href='/pwa/touch-icon-ipad-retina.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/pwa/touch-icon-ipad.png' />

      <link rel='icon' type='image/png' sizes='32x32' href='/pwa/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/pwa/favicon-16x16.png' />
      <link rel='mask-icon' href='/pwa/safari-pinned-tab.svg' color='#4DABF7' />
      <link rel='shortcut icon' href='/favicon.svg' />
          
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={ webAddress } />
      <meta name='twitter:title' content={ title } />
      <meta name='twitter:description' content={ description } />
      <meta name='twitter:image' content={`${ webAddress }/banner.png`} />
      <meta name='twitter:creator' content={ `@${creatorTwitter}` } />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={ title } />
      <meta property='og:description' content={ description } />
      <meta property='og:site_name' content={ title } />
      <meta property='og:url' content={ webAddress } />
      <meta property='og:image' content={`${ webAddress }/banner.png`} />

      {/* apple splash screen images */}
      <link href='/pwa/iphone5_splash.png' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
      <link href='/pwa/iphone6_splash.png' media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
      <link href='/pwa/iphoneplus_splash.png' media='(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)' rel='apple-touch-startup-image' />
      <link href='/pwa/iphonex_splash.png' media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' rel='apple-touch-startup-image' />
      <link href='/pwa/iphonexr_splash.png' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
      <link href='/pwa/iphonexsmax_splash.png' media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)' rel='apple-touch-startup-image' />
      <link href='/pwa/ipad_splash.png' media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
      <link href='/pwa/ipadpro1_splash.png' media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
      <link href='/pwa/ipadpro3_splash.png' media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />
      <link href='/pwa/ipadpro2_splash.png' media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image' />

      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
    </Head>
  )
}

export default PwaHead