/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins(
  [
    withPWA,
    nextTranslate,
    withBundleAnalyzer
  ], 
  {
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV !== 'production',
      skipWaiting: false
    },
    experimental: {
      outputStandalone: process.env.IS_DOCKER_BUILD === 'true' ? true : false,
    },
  }
);