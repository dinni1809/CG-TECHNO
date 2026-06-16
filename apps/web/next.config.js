/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.BUILD_DIR || '.next',
  transpilePackages: ['@cg-techno/config', '@cg-techno/utils', '@cg-techno/features'],
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
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
// Force dev server reload comment v4

