import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_DESC } from '@/lib/nav';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://dividendpayoutcalculator.com'),
  title: {
    default: `${SITE_NAME} — Free Dividend Calculator & Income Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    'dividend calculator', 'dividend yield calculator', 'dividend growth calculator',
    'DRIP calculator', 'monthly dividend income calculator', 'dividend payout ratio',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="en">
      <head>
        {adsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
