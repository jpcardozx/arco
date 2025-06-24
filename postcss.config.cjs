/**
 * ARCO ENTERPRISE - PostCSS Configuration v2.0
 * Configuração otimizada para Tailwind CSS v3 com Next.js 15
 * Garante processamento adequado de todas as classes executivas
 */

module.exports = {
  plugins: {
    // Tailwind CSS processing
    tailwindcss: {
      config: './tailwind.config.js',
    },
    
    // Autoprefixer para compatibilidade cross-browser
    autoprefixer: {
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
    
    // CSS optimization para produção
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: false,
          },
        ],
      },
    }),
  },
};