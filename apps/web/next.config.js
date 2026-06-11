/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cg-techno/config', '@cg-techno/utils', '@cg-techno/features'],
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_SITE_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'POST' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
