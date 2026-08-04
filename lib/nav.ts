export interface NavItem {
  href: string;
  label: string;
}

/** 全站导航 + 页脚内链(单一来源)。 */
export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Dividend Calculator' },
  { href: '/calculators/dividend-yield-calculator', label: 'Yield Calculator' },
  { href: '/calculators/dividend-growth-calculator', label: 'Growth Calculator' },
  { href: '/calculators/drip-calculator', label: 'DRIP Calculator' },
  { href: '/calculators/monthly-dividend-calculator', label: 'Monthly Income Calculator' },
  { href: '/calculators/dividend-payout-ratio-calculator', label: 'Payout Ratio Calculator' },
];

export const SITE_NAME = 'Dividend Calculator';
export const SITE_DESC =
  'Free online dividend calculator: dividend yield, dividend growth, DRIP reinvestment, monthly dividend income and payout ratio. Calculate your dividend income in seconds.';
