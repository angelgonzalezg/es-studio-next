import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google";

import '@/app/globals.css';
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'


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
  title: "ES Studio",
  description: "ES interior design",
  keywords: "interior, design, studio",
  icons: {
    icon: "/es_logo.png",
  },
  other: {
    'format-detection': 'telephone=no, date=no, email=no, address=no'
  },
  openGraph: {
    title: "ES Studio",
    description: "ES interior design",
    url: "https://www.es-studio.vercel.app",
    siteName: "ES Studio",
    images: [
      {
        url: "/es_logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "es-MX",
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
        {children}
        <Footer />
      </body>
    </html>
  );
}
