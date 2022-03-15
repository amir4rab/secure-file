import Head from "next/head";

const title = 'Secure File';
const description = 'Store your files safely inside your browser';
const webAddress = 'https://sf.amir4rab.com';
const creatorTwitter = 'amir4rab'

const PwaHead = () => {
  return (
    <Head>
      <meta name='application-name' content={ title } />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content={ title } />
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
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/pwa/safari-pinned-tab.svg' color='#4DABF7' />
      <link rel='shortcut icon' href='/favicon.svg' />
          
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={ webAddress } />
      <meta name='twitter:title' content={ title } />
      <meta name='twitter:description' content={ description } />
      <meta name='twitter:image' content={`${ webAddress }/pwa/android-chrome-192x192.png`} />
      <meta name='twitter:creator' content={ `@${creatorTwitter}` } />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={ title } />
      <meta property='og:description' content={ description } />
      <meta property='og:site_name' content={ title } />
      <meta property='og:url' content={ webAddress } />
      <meta property='og:image' content={`${ webAddress }/pwa/apple-touch-icon.png`} />

      {/* apple splash screen images */}
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_2048.png' sizes='2048x2732' />
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_1668.png' sizes='1668x2224' />
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_1536.png' sizes='1536x2048' />
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_1125.png' sizes='1125x2436' />
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_1242.png' sizes='1242x2208' />
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_750.png' sizes='750x1334' />
      <link rel='apple-touch-startup-image' href='/pwa/apple_splash_640.png' sizes='640x1136' />

      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
    </Head>
  )
}

export default PwaHead