/** @type {import('next').NextConfig} */
const nextConfig = {
  // Critical build performance optimizations
  reactStrictMode: true,
  
  // Next.js 15 Turbopack configuration
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
    typedRoutes: true,
    // Simpler experimental features
    // Aggressive package optimization
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tabs',
      'recharts',
      'react-icons',
      '@nextui-org/react',
      'clsx',
      'tailwind-merge'
    ],
    // Optimization features for performance and build speed
    optimizeCss: true,
    esmExternals: true,
    forceSwcTransforms: true,
  },
  
  // Build optimizations
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ignore ESLint warnings during production builds
    // This allows the build to complete while still showing warnings in dev
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Aggressive modular imports for tree shaking
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
      skipDefaultConversion: true,
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
  
  // Simplified webpack config to avoid chunk loading errors
  webpack: (config, { isServer, dev }) => {
    // Watch optimizations for faster rebuilds
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
      aggregateTimeout: 200,
      poll: false,
    };

    // Development optimizations
    if (dev) {
      config.optimization.removeAvailableModules = false;
      config.optimization.removeEmptyChunks = false;
      config.optimization.splitChunks = false;
    }

    // Exclude MercadoPago files from build in production
    if (!dev && isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'mercadopago': 'commonjs mercadopago',
      });
    }
    
    return config;
  },
};

import withBundleAnalyzer from '@next/bundle-analyzer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
