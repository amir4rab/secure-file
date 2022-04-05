/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
  experimental: {
    outputStandalone: process.env.IS_DOCKER_BUILD === 'true' ? true : false,
  },
})