import Head from 'next/head';
import React from 'react'

const defaultTitle= 'Secure file';
const defaultImageUrl= '/banner.jpg';
const defaultDescription= 'Store your files safely inside your browser';

interface Props {
  title?: string;
  imageUrl?: string;
  description?: string;
}

const HeadDetails = ({ title= defaultTitle, imageUrl= defaultImageUrl, description= defaultDescription }:Props) => {
  return (
    <Head>
      <title>{ title }</title>
      <meta name="description" content={ description } />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  )
}

export default HeadDetails