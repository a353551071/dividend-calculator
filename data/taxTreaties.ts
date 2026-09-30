/**
 * Global Tax Treaties for US Dividend Withholding (W-8BEN / NRA).
 * Source: IRS Publication 515 & Publication 901 (U.S. Tax Treaties).
 *
 * Default statutory withholding rate for Non-Resident Aliens (NRA) is 30% under IRC § 1441.
 * Bilateral tax treaties reduce this rate for eligible residents who submit Form W-8BEN.
 */

export interface TaxTreaty {
  code: string;
  country: string;
  ratePct: number;
  treatyArticle?: string;
  notes?: string;
}

export const DEFAULT_NRA_RATE = 30;

export const TAX_TREATIES: TaxTreaty[] = [
  // --- Common / High-Volume Treaty Corridors ---
  {
    code: 'CN',
    country: 'China',
    ratePct: 10,
    treatyArticle: 'US-China Tax Treaty Art. 9',
    notes: 'One of the most favorable 10% portfolio dividend rates under W-8BEN.',
  },
  {
    code: 'JP',
    country: 'Japan',
    ratePct: 15,
    treatyArticle: 'US-Japan Tax Treaty Art. 10',
    notes: 'Standard 15% rate with W-8BEN. Local Japanese income tax may apply.',
  },
  {
    code: 'GB',
    country: 'United Kingdom',
    ratePct: 15,
    treatyArticle: 'US-UK Tax Treaty Art. 10',
    notes: '15% for portfolio dividends (0% is for certain pension funds only).',
  },
  {
    code: 'CA',
    country: 'Canada',
    ratePct: 15,
    treatyArticle: 'US-Canada Tax Treaty Art. X',
    notes: '15% in taxable accounts. 0% in RRSP/RRIF retirement accounts.',
  },
  {
    code: 'AU',
    country: 'Australia',
    ratePct: 15,
    treatyArticle: 'US-Australia Tax Treaty Art. 10',
    notes: 'Standard 15% withholding rate.',
  },
  {
    code: 'DE',
    country: 'Germany',
    ratePct: 15,
    treatyArticle: 'US-Germany Tax Treaty Art. 10',
    notes: '15% rate. Can be credited against German Abgeltungsteuer.',
  },
  {
    code: 'FR',
    country: 'France',
    ratePct: 15,
    treatyArticle: 'US-France Tax Treaty Art. 10',
    notes: '15% rate with French W-8BEN submission.',
  },
  {
    code: 'NL',
    country: 'Netherlands',
    ratePct: 15,
    treatyArticle: 'US-Netherlands Treaty Art. 10',
    notes: '15% withholding rate.',
  },
  {
    code: 'CH',
    country: 'Switzerland',
    ratePct: 15,
    treatyArticle: 'US-Switzerland Treaty Art. 10',
    notes: '15% withholding rate with valid W-8BEN.',
  },
  {
    code: 'IE',
    country: 'Ireland',
    ratePct: 15,
    treatyArticle: 'US-Ireland Treaty Art. 10',
    notes: '15% for direct US holdings. (Ireland UCITS ETFs have 15% internal drag).',
  },
  {
    code: 'KR',
    country: 'South Korea',
    ratePct: 15,
    treatyArticle: 'US-Korea Treaty Art. 12',
    notes: '15% rate (local surtax may be assessed domestically).',
  },
  {
    code: 'MX',
    country: 'Mexico',
    ratePct: 10,
    treatyArticle: 'US-Mexico Treaty Art. 10',
    notes: '10% portfolio dividend rate.',
  },
  {
    code: 'IN',
    country: 'India',
    ratePct: 25,
    treatyArticle: 'US-India Treaty Art. 10',
    notes: '25% rate under bilateral treaty.',
  },
  {
    code: 'ES',
    country: 'Spain',
    ratePct: 15,
    treatyArticle: 'US-Spain Treaty Art. 10',
    notes: '15% withholding rate.',
  },
  {
    code: 'IT',
    country: 'Italy',
    ratePct: 15,
    treatyArticle: 'US-Italy Treaty Art. 10',
    notes: '15% withholding rate.',
  },
  {
    code: 'SE',
    country: 'Sweden',
    ratePct: 15,
    treatyArticle: 'US-Sweden Treaty Art. 10',
    notes: '15% withholding rate.',
  },
  {
    code: 'NO',
    country: 'Norway',
    ratePct: 15,
    treatyArticle: 'US-Norway Treaty Art. 10',
    notes: '15% withholding rate.',
  },
  {
    code: 'NZ',
    country: 'New Zealand',
    ratePct: 15,
    treatyArticle: 'US-New Zealand Treaty Art. 10',
    notes: '15% withholding rate.',
  },
  {
    code: 'PH',
    country: 'Philippines',
    ratePct: 25,
    treatyArticle: 'US-Philippines Treaty Art. 11',
    notes: '25% withholding rate under treaty.',
  },
  {
    code: 'IL',
    country: 'Israel',
    ratePct: 25,
    treatyArticle: 'US-Israel Treaty Art. 12',
    notes: '25% rate for general portfolio dividends.',
  },
  {
    code: 'ZA',
    country: 'South Africa',
    ratePct: 15,
    treatyArticle: 'US-South Africa Treaty Art. 10',
    notes: '15% withholding rate.',
  },

  // --- Prominent Non-Treaty / Standard 30% Corridors ---
  {
    code: 'HK',
    country: 'Hong Kong',
    ratePct: 30,
    notes: 'No bilateral US tax treaty for dividends. Statutory 30% applies.',
  },
  {
    code: 'SG',
    country: 'Singapore',
    ratePct: 30,
    notes: 'No US tax treaty for dividends. Statutory 30% applies.',
  },
  {
    code: 'TW',
    country: 'Taiwan',
    ratePct: 30,
    notes: 'No bilateral tax treaty currently active. Statutory 30% applies.',
  },
  {
    code: 'BR',
    country: 'Brazil',
    ratePct: 30,
    notes: 'No bilateral US tax treaty. Standard 30% withholding.',
  },
  {
    code: 'AE',
    country: 'United Arab Emirates (UAE)',
    ratePct: 30,
    notes: 'No US dividend tax treaty for individual portfolio investors.',
  },
  {
    code: 'OTHER',
    country: 'Other / Non-Treaty Countries',
    ratePct: 30,
    notes: 'Standard statutory rate under IRC § 1441 for Non-Resident Aliens.',
  },
];

/** Quick lookup by ISO code */
export function getTreatyByCode(code: string): TaxTreaty {
  const match = TAX_TREATIES.find((t) => t.code.toUpperCase() === code.toUpperCase());
  if (match) return match;
  return {
    code: 'OTHER',
    country: 'Non-Treaty / Default',
    ratePct: DEFAULT_NRA_RATE,
    notes: 'Statutory 30% default rate under IRC § 1441.',
  };
}
