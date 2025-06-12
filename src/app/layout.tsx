import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stop Burning Money on Digital Disasters | ARCO - Self-Funding Digital Transformation",
  description: "Stop wasting $2.4M annually on failed digital projects. ARCO delivers self-funding transformations with guaranteed ROI. 94% of projects pay for themselves within 47 days. Emergency intervention available.",
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
    title: "Stop Burning Money on Digital Disasters | ARCO",
    description: "Self-funding digital transformations with guaranteed ROI. 94% success rate, 47-day payback.",
    url: "https://arco.digital",
    siteName: "ARCO Digital Performance Engineering",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Burning Money on Digital Disasters | ARCO",
    description: "Self-funding digital transformations with guaranteed ROI. 94% success rate.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/logo-v2.png" type="image/png" />
      </head>
      <body className={`${ebGaramond.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
