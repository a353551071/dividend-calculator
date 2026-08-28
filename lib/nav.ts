export interface NavItem {
  href: string;
  label: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Site-wide config + navigation (single source of truth). */
export const SITE_NAME = 'Dividend Calculator';
export const SITE_URL = 'https://www.dividendpayoutcalculator.com';
export const SITE_DESC =
  'Free online dividend calculator: dividend yield, dividend growth, DRIP reinvestment, monthly dividend income and payout ratio. Calculate your dividend income in seconds.';

/** 通用计算器(概念导向):yield / growth / DRIP / monthly / payout。 */
export const GENERAL_CALCULATORS: NavItem[] = [
  { href: '/calculators/dividend-yield-calculator', label: 'Dividend Yield' },
  { href: '/calculators/dividend-growth-calculator', label: 'Dividend Growth' },
  { href: '/calculators/drip-calculator', label: 'DRIP Reinvestment' },
  { href: '/calculators/monthly-dividend-calculator', label: 'Monthly Income' },
  { href: '/calculators/dividend-payout-ratio-calculator', label: 'Payout Ratio' },
];

/** ETF 计算器(标的导向,真数预填):SCHD / QQQI。 */
export const ETF_CALCULATORS: NavItem[] = [
  { href: '/calculators/schd-dividend-calculator', label: 'SCHD Calculator' },
  { href: '/calculators/qqqi-dividend-calculator', label: 'QQQI Calculator' },
];

/** Header「Calculators ▾」下拉 + 移动端菜单共用的分组(全量 7 计算器,不换出不遗漏)。 */
export const CALCULATOR_GROUPS: NavGroup[] = [
  { title: 'General calculators', items: GENERAL_CALCULATORS },
  { title: 'ETF calculators · live data', items: ETF_CALCULATORS },
];

/** 站点页(footer 分栏 + header 平铺共用)。 */
export const SITE_LINKS: NavItem[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

/** Header 平铺项(下拉之外):少而精,给 980px+ 容器留足呼吸。 */
export const HEADER_FLAT_LINKS: NavItem[] = SITE_LINKS.filter((l) =>
  ['/blog', '/methodology', '/about'].includes(l.href),
);
