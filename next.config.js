/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  }
];

module.exports = withPlugins(
  [
    withPWA,
    withBundleAnalyzer
  ], 
  {
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_IS_APP === 'true',
      skipWaiting: false
    },
    experimental: {
      outputStandalone: process.env.IS_DOCKER_BUILD === 'true' ? true : false,
    },
    // async headers() {
    //   if ( process.env.NODE_ENV !== 'production' ) return [];
    //   return [
    //     {
    //       // Apply these headers to all routes in your application.
    //       source: '/:path*',
    //       headers: securityHeaders,
    //     }
    //   ]
    // }
  }
);