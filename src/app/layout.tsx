import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google";

import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Main from '@/components/layout/Main';


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: 'swap'
})

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap'
})

export const metadata: Metadata = {
  // Used to resolve relative URLs in Open Graph/Twitter images and links
  // Prefer setting NEXT_PUBLIC_SITE_URL in your env (e.g. https://es-studio.vercel.app)
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://es-studio.vercel.app'),
  title: "ES Studio",
  description: "ES interior design",
  keywords: "interior, design, studio",
  icons: {
    icon: "/images/es_logo.png",
  },
  other: {
    'format-detection': 'telephone=no, date=no, email=no, address=no'
  },
  openGraph: {
    title: "ES Studio",
    description: "ES interior design",
    // With metadataBase set, you can keep this relative if you prefer
    url: "/",
    siteName: "ES Studio",
    images: [
      {
        url: "/images/es_logo.png",
        width: 800,
        height: 600,
      },
    ],
    // Open Graph expects underscore in locale (e.g., en_US, es_MX)
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${raleway.variable}`}>
      <body>
        <Navbar />
        <Main>
          {children}
        </Main>
        <Footer />
      </body>
    </html>
  );
}
