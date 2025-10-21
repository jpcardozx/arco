import type { Metadata } from 'next';
import { ToastProvider } from '@/components/providers/toast-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider, ThemeScript } from '@/components/providers/theme-provider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { UnifiedNavigation } from '@/design-system/navigation';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://consultingarco.com'),
  title: 'ARCO | Web & Tráfego',
  description: 'web infrastructure and traffic optimization services for discerning businesses. Strategic technical consulting with quantified ROI and measurable performance improvements.',
  keywords: [
    'web services', 
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
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* Meta Pixel Script - Static injection in head for early initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1677581716961792');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1677581716961792&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <ErrorBoundary>
            <QueryProvider>
              <UnifiedNavigation variant="corporate" theme="auto" showParticles={true} />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer variant="default" showPreFooter={true} />
              <ToastProvider />
            </QueryProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
