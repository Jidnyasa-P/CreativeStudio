/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  
  // React Compiler for performance
  experimental: {
    reactCompiler: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true, // Added from diff
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true, // Added from diff
  },

  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ],

  // Redirects for old paths
  redirects: async () => [
    // Add any URL redirects needed for migration
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true,
    },
  ],

  // Cache optimization
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}

module.exports = nextConfig
