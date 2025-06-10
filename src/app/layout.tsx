import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARCO | Digital Performance Engineering - Self-Funding Transformation",
  description: "Convert operational waste into competitive advantage. Auto-financeable digital transformation projects with guaranteed ROI. 4-8 week delivery, 60%+ margins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
