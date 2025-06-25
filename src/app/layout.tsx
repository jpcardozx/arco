import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/critical.css";
import { WebVitalsTracker, DevPerformanceMonitor } from '@/components/analytics/WebVitalsTracker';
import { WebVitalsMonitor } from '@/components/analytics/WebVitalsMonitor';
import { fontConfig, criticalCSS, inter } from '@/lib/fonts';

// Critical CSS inlined for zero render-blocking
const criticalStyles = criticalCSS;

export const metadata: Metadata = {
  title: "ARCO | Self-Funding Digital Transformation",
  description: "Stop wasting on failed digital projects. ARCO delivers self-funding transformations with guaranteed ROI. 94% of projects pay for themselves within 47 days. Emergency intervention available.",
  keywords: "digital transformation, self-funding projects, ROI guarantee, digital waste elimination, performance optimization, enterprise software",
  authors: [{ name: "ARCO Digital Performance Engineering" }],
  creator: "ARCO",
  publisher: "ARCO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ARCO | Self-Funding Digital Transformation',
    description: 'Stop wasting on failed digital projects. ARCO delivers self-funding transformations with guaranteed ROI. 94% of projects pay for themselves within 47 days. Emergency intervention available.',
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCO | Self-Funding Digital Transformation",
    description: "Stop wasting on failed digital projects. ARCO delivers self-funding transformations with guaranteed ROI. 94% of projects pay for themselves within 47 days. Emergency intervention available.",
    creator: "@ARCODigital",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { SimpleTranslationProvider } from '@/components/providers/SimpleTranslationProvider';
import { ServiceWorkerRegistration } from '@/components/performance/ServiceWorkerRegistration';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontConfig.classes.variable}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/api/analytics" as="fetch" crossOrigin="anonymous" />
        <link rel="modulepreload" href="/_next/static/chunks/framer-motion.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/logo-v2.png" type="image/png" sizes="192x192" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased bg-slate-900 text-white`}>
        <AuthProvider>
          <SimpleTranslationProvider>
            {children}
          </SimpleTranslationProvider>
        </AuthProvider>

        {/* Performance Suite - PATCH 1 Implementation */}
        <ServiceWorkerRegistration />
        <WebVitalsTracker />
        <WebVitalsMonitor />
        {process.env.NODE_ENV === 'development' && <DevPerformanceMonitor />}
      </body>
    </html>
  );
}
