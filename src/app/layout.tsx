import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { AppLayout } from "../../components/layout/AppLayout";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arco Institute | Digital Presence",
  description: "Where your legacy finds its voice.",
  icons: {
    icon: "/images/arco-v2.png",
    shortcut: "./favicon/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ebGaramond.variable} antialiased`}
      >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
