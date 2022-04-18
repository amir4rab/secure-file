/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');

module.exports = withPlugins(
  [
    withPWA,
    nextTranslate
  ], 
  {
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV !== 'production',
    },
    experimental: {
      outputStandalone: process.env.IS_DOCKER_BUILD === 'true' ? true : false,
    },
  }
);