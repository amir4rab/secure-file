// next.js
import type { AppProps } from 'next/app';

// mantine components
import { MantineProvider } from '@mantine/core';

// layouts
import Layout from '@/layouts/layout';

// components
import HeadDetails from '@/components/headDetails';
import PwaHead from '@/components/pwaHead';
import ProgressMeter from '@/components/progressMeter';
import UpdateModal from '@/components/updateModal';

// hook's providers
import { AuthProvider } from '@/hooks/useAuth';
import { IsPwaProvider } from '@/hooks/useIsPwa';
import TranslationProvider from '@/translation/translationProvider';
import BrowserInfoProvider from '@/hooks/useBrowserInfo';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  

  return (
    <>
      <HeadDetails />
      <PwaHead />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Provides translation */}
        <TranslationProvider>
          {/* Provides authentication status */}
          <AuthProvider>
            {/* Checks if webapp has been registered as a pwa */}
            <IsPwaProvider>
              {/* Progress Meter Indicator */}
              <ProgressMeter />
              {/* Shows updated to service worker */}
              <UpdateModal />
              {/* Provides browser info */}
              <BrowserInfoProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </BrowserInfoProvider>
            </IsPwaProvider>
          </AuthProvider>
        </TranslationProvider>
      </MantineProvider>
    </>
  );
}