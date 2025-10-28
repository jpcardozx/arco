import '@/lib/polyfills';
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/providers/toast-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ThemeProvider, ThemeScript } from '@/components/providers/theme-provider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { PrivacyConsentBanner } from '@/components/analytics/PrivacyConsentBanner';
import { MetaPixel, MetaPixelScript } from '@/components/meta-pixel';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
import { LocalBusinessSchema } from '@/components/seo/local-business-schema';
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
    url: 'https://consultingarco.com',
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
        <LocalBusinessSchema />
        <MetaPixelScript />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        
        <ThemeProvider>
          <AnalyticsProvider autoInit={true}>
            <ErrorBoundary>
              <QueryProvider>
                <MetaPixel />
                <Header />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer variant="default" showPreFooter={true} />
                <ToastProvider />

                {/* Analytics & Consent Components */}
                <PrivacyConsentBanner />
                <CookieConsentBanner />
              </QueryProvider>
            </ErrorBoundary>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
