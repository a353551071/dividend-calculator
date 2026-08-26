export interface NavItem {
  href: string;
  label: string;
}

/** Site-wide config + navigation (single source of truth). */
export const SITE_NAME = 'Dividend Calculator';
export const SITE_URL = 'https://www.dividendpayoutcalculator.com';
export const SITE_DESC =
  'Free online dividend calculator: dividend yield, dividend growth, DRIP reinvestment, monthly dividend income and payout ratio. Calculate your dividend income in seconds.';

/** Header 主导航(980px 容器空间有限,只放首页 + 6 个通用计算器)。 */
export const HEADER_NAV: NavItem[] = [
  { href: '/', label: 'Dividend Calculator' },
  { href: '/calculators/dividend-yield-calculator', label: 'Yield Calculator' },
  { href: '/calculators/dividend-growth-calculator', label: 'Growth Calculator' },
  { href: '/calculators/drip-calculator', label: 'DRIP Calculator' },
  { href: '/calculators/monthly-dividend-calculator', label: 'Monthly Income Calculator' },
  { href: '/calculators/dividend-payout-ratio-calculator', label: 'Payout Ratio Calculator' },
];

/** Footer 全量内链(空间不受限,含 ETF 计算器——header 放不下的 SCHD/QQQI 放这,保住内链支撑)。 */
export const FOOTER_NAV: NavItem[] = [
  ...HEADER_NAV,
  { href: '/calculators/schd-dividend-calculator', label: 'SCHD Calculator' },
  { href: '/calculators/qqqi-dividend-calculator', label: 'QQQI Calculator' },
];
