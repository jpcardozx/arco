import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'ARCO - Enterprise Infrastructure Intelligence',
  description: 'Transform operational waste into self-funding digital projects. Quantified analysis, technical authority, proven ROI.',
  keywords: ['infrastructure optimization', 'enterprise consulting', 'technical analysis', 'cost reduction'],
  authors: [{ name: 'ARCO' }],
  openGraph: {
    title: 'ARCO - Enterprise Infrastructure Intelligence',
    description: 'Transform operational waste into self-funding digital projects',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
