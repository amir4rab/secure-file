import NotFoundComponent from '@/components/error/404'
import Head from 'next/head';
import type { NextPage } from 'next';


const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta typeof=''></meta>
      </Head>
      <NotFoundComponent />
    </>
  )
}

export default NotFoundPage