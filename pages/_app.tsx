import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import Layout from '@/layouts/layout';
import HeadDetails from '@/components/headDetails';
import PwaHead from '@/components/pwaHead';
import { AuthProvider } from '@/hooks/useAuth';

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
        }}
      >
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}