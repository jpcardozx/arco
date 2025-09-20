import type { Metadata } from 'next';
import '../styles/globals.css';

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
