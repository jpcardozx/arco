/** @type {import('next').NextConfig} */
const nextConfig = {
  // Critical build performance optimizations
  reactStrictMode: true,

  // Typed Routes (movido de experimental para root)
  typedRoutes: true,

  // Logging para debug de build errors
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Server-side external packages (browser-only)
  serverExternalPackages: [
    'posthog-js',
    'three',
    '@react-three/fiber',
    '@react-three/drei',
    'pino',
    'pino-pretty',
  ],

  // Next.js 16 Images configuration
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  experimental: {
    scrollRestoration: true,

    // Build performance optimizations
    // Note: lucide-react removido - Turbopack otimiza automaticamente
    optimizePackageImports: [
      'phosphor-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      'recharts',
      'react-icons',
    ],

    // Speed optimizations
    optimizeCss: true,

    // Parallel compilation - disabled temporariamente (Worker errors)
    // workerThreads: process.env.NODE_ENV !== 'production',
    // cpus: process.env.NODE_ENV !== 'production' ? 4 : undefined,
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Desabilita source maps em produção (reduz tempo de build)
  productionBrowserSourceMaps: false,

  // Turbopack config (Next.js 16+) - empty to use default
  turbopack: {},

  // Webpack configuration - Fix DataCloneError
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Fix para serialização (GitHub Issue #69096)
      config.output.publicPath = "";
    }
    return config;
  },

  // Modular imports for tree shaking
  // Note: Turbopack já otimiza lucide-react automaticamente no Next.js 16
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
    'phosphor-react': {
      transform: 'phosphor-react/dist/icons/{{member}}',
    },
    '@nextui-org/react': {
      transform: '@nextui-org/react/dist/{{member}}',
    },
  },

  // Critical performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

import withBundleAnalyzer from '@next/bundle-analyzer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
