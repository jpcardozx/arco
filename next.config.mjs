/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  experimental: {
    scrollRestoration: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    typedRoutes: true,
    // Performance optimizations for UI/UX
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-popover',
    ],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  
  // Cache and ISR settings
  staticPageGenerationTimeout: 120,
  
  output: 'standalone',
  
  // Custom settings for ARCO
  env: {
    NEXT_PUBLIC_DEFAULT_LOCALE: 'pt',
    NEXT_PUBLIC_AVAILABLE_LOCALES: 'pt,en,es,fr',
  },
    // Webpack optimizations for UI performance
  webpack: (config, { isServer }) => {
    // Optimize bundle splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          ui: {
            name: 'ui-components',
            chunks: 'all',
            test: /[\\/]src[\\/]components[\\/]ui[\\/]/,
            priority: 20,
          },
          radix: {
            name: 'radix-ui',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            priority: 30,
          },
        },
      },
    }
    
    return config
  },
}

export default nextConfig;
