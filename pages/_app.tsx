import { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import Layout from '@/layouts/layout';
import HeadDetails from '@/components/headDetails';
import PwaHead from '@/components/pwaHead';
import { AuthProvider } from '@/hooks/useAuth';
import ProgressMeter from '@/components/progressMeter';
import { IsPwaProvider } from '@/hooks/useIsPwa';
import UpdateModal from '@/components/updateModal';
import TranslationProvider from '@/translation/translationProvider';


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
        <TranslationProvider>
          <AuthProvider>
            <IsPwaProvider>
              <ProgressMeter />
              <UpdateModal />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </IsPwaProvider>
          </AuthProvider>
        </TranslationProvider>
      </MantineProvider>
    </>
  );
}