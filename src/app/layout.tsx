import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://arco.com'),
  title: 'ARCO | Premium Web & Traffic Services - Enterprise Digital Excellence',
  description: 'Sophisticated web infrastructure and traffic optimization services for discerning businesses. Strategic technical consulting with quantified ROI and measurable performance improvements.',
  keywords: [
    'premium web services', 
    'traffic optimization', 
    'enterprise consulting', 
    'performance engineering',
    'conversion optimization',
    'technical strategy',
    'infrastructure consulting',
    'digital excellence'
  ],
  authors: [{ name: 'ARCO', url: 'https://arco.com' }],
  creator: 'ARCO',
  publisher: 'ARCO',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'ARCO | Premium Web & Traffic Services',
    description: 'Sophisticated web infrastructure and traffic optimization for enterprise excellence. Strategic consulting with quantified results.',
    siteName: 'ARCO',
    url: 'https://arco.com',
    images: [
      {
        url: '/logo-v2.png',
        width: 1200,
        height: 630,
        alt: 'ARCO - Premium Web & Traffic Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARCO | Premium Web & Traffic Services',
    description: 'Sophisticated web infrastructure and traffic optimization for enterprise excellence.',
    creator: '@arco',
    images: ['/logo-v2.png'],
  },
  icons: {
    icon: [
      { url: '/logo-v2.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/icons/logo-v2-192.png', sizes: '192x192', type: 'image/png' }
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
