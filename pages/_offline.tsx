import Offline from '@/components/error/offline'
import Head from 'next/head';
import type { NextPage } from 'next';


const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Offline</title>
      </Head>
      <Offline />
    </>
  )
}

export default NotFoundPage