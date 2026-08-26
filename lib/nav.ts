export interface NavItem {
  href: string;
  label: string;
}

/** Site-wide config + navigation (single source of truth). */
export const SITE_NAME = 'Dividend Calculator';
export const SITE_URL = 'https://www.dividendpayoutcalculator.com';
export const SITE_DESC =
  'Free online dividend calculator: dividend yield, dividend growth, DRIP reinvestment, monthly dividend income and payout ratio. Calculate your dividend income in seconds.';

/** Primary navigation + footer internal links. */
export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Dividend Calculator' },
  { href: '/calculators/dividend-yield-calculator', label: 'Yield Calculator' },
  { href: '/calculators/dividend-growth-calculator', label: 'Growth Calculator' },
  { href: '/calculators/drip-calculator', label: 'DRIP Calculator' },
  { href: '/calculators/monthly-dividend-calculator', label: 'Monthly Income Calculator' },
  { href: '/calculators/dividend-payout-ratio-calculator', label: 'Payout Ratio Calculator' },
  { href: '/calculators/schd-dividend-calculator', label: 'SCHD Calculator' },
  { href: '/calculators/qqqi-dividend-calculator', label: 'QQQI Calculator' },
];
