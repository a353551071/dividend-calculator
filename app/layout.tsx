import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_NAME, SITE_DESC, SITE_URL } from '@/lib/nav';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/schema';
import './globals.css';

/**
 * 金融排版系统(fintech 事实标准,woff2 入仓自托管 —— 零构建时网络、零 CWV 代价):
 * - Inter:正文/UI/数据(fintech 标准,tabular figures 优秀)
 * - Source Serif 4:h1/h2/品牌(编辑金融质感 —— Investopedia/Morningstar 衬线血统)
 */
const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
});
const serif = localFont({
  src: './fonts/source-serif-4-latin.woff2',
  weight: '400 700',
  variable: '--font-serif',
  display: 'swap',
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} 2026 — Free Dividend Calculator & Income Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  keywords: [
    'dividend calculator', 'dividend yield calculator', 'dividend growth calculator',
    'DRIP calculator', 'monthly dividend income calculator', 'dividend payout ratio',
  ],
  robots: { index: true, follow: true },
  verification: gscVerification ? { google: gscVerification } : undefined,
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} 2026 — Free Dividend Calculator`,
    description: SITE_DESC,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <head>
        {adsense && <link rel="preconnect" href="https://pagead2.googlesyndication.com" />}
        {gaId && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        {adsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
            crossOrigin="anonymous"
          />
        )}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" +
                  gaId +
                  "');",
              }}
            />
          </>
        )}
        {clarityId && (
          <script
            dangerouslySetInnerHTML={{
              __html:
                '(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","' +
                clarityId +
                '");',
            }}
          />
        )}
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: webSiteJsonLd() }}
        />
      </body>
    </html>
  );
}
