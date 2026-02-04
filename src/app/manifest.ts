import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARCO - Premium Web & Traffic Services',
    short_name: 'ARCO',
    description:
      'Sophisticated web infrastructure and traffic optimization services for discerning businesses. Strategic technical consulting with quantified ROI.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#0f172a',
    background_color: '#0f172a',
    icons: [
      {
        src: '/icons/logo-v2-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/logo-v2-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/logo-v2-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/logo-v2-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    // Note: logo-v2-512.png does not exist yet — browser will fall back to 192px.
    // Generate it separately via resize of public/logo-v2.png.
  }
}
