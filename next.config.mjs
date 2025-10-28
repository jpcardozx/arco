/** @type {import('next').NextConfig} */
const nextConfig = {
  // Critical build performance optimizations
  reactStrictMode: true,
  
  // Server-side external packages (browser-only)
  serverExternalPackages: [
    'posthog-js',
    'three',
    '@react-three/fiber',
    '@react-three/drei',
  ],
  
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
    typedRoutes: true, // ✅ Webpack suporta
    
    // Build performance optimizations (CRITICAL para velocidade)
    optimizePackageImports: [
      'lucide-react',
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
    forceSwcTransforms: true, // ✅ Webpack suporta
    
    // Parallel compilation (CRITICAL)
    workerThreads: true,
    cpus: 4,
  },
  
  // Build optimizations (AGGRESSIVE - Pareto 80/20)
  typescript: {
    // Skip type checking during build (faz no CI/pre-commit)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip linting durante build (faz no CI/pre-commit)
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Desabilita source maps em produção (reduz tempo de build)
  productionBrowserSourceMaps: false,

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
};

import withBundleAnalyzer from '@next/bundle-analyzer';

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
