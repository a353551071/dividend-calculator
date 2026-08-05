/**
 * JSON-LD structured-data helpers (Schema.org).
 *
 * Centralizes every structured-data blob so pages stay DRY and the payloads
 * stay consistent. Each helper returns a JSON string ready for a
 * `<script type="application/ld+json">` tag.
 */
import { SITE_NAME, SITE_URL } from './nav';

interface Crumb {
  name: string;
  path: string;
}

interface ArticleInput {
  title: string;
  description: string;
  path: string;
  date: string;
}

/** Organization schema — emitted once site-wide in RootLayout. */
export function organizationJsonLd(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Free dividend calculators: yield, growth, DRIP reinvestment, monthly income and payout ratio.',
  });
}

/** WebApplication schema — one per calculator / tool page. */
export function webAppJsonLd(name: string, path: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: `${SITE_URL}${path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any (web browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  });
}

/** BreadcrumbList schema — Home > ... > Current page. */
export function breadcrumbJsonLd(items: Crumb[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  });
}

/** FAQPage schema — Q&A pairs to win PAA boxes and AI Overview. */
export function faqJsonLd(items: { q: string; a: string }[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  });
}

/** Article schema — for blog posts. */
export function articleJsonLd(input: ArticleInput): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.date,
    url: `${SITE_URL}${input.path}`,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_URL },
  });
}
