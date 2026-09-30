'use client';

import { useState, useId } from 'react';
import { TAX_TREATIES, DEFAULT_NRA_RATE, type TaxTreaty } from '@/data/taxTreaties';
import { simulateNraDrip, calculateNraSnapshot, type NraTaxInput } from '@/lib/nraTax';
import { formatMoney, formatPercent, formatNumber } from '@/lib/format';
import KpiRow, { type KpiItem } from './KpiRow';
import ResultsChart from './ResultsChart';

interface ForeignInvestorDripCalcProps {
  defaultTicker?: string;
  defaultPrice?: number;
  defaultYield?: number;
  defaultDivGrowth?: number;
  defaultPriceGrowth?: number;
  defaultMonthly?: number;
  defaultYears?: number;
  prefillNote?: string;
}

export default function ForeignInvestorDripCalc({
  defaultTicker = 'SCHD',
  defaultPrice = 80,
  defaultYield = 3.5,
  defaultDivGrowth = 10,
  defaultPriceGrowth = 7,
  defaultMonthly = 100,
  defaultYears = 15,
  prefillNote,
}: ForeignInvestorDripCalcProps) {
  const [initial, setInitial] = useState(10000);
  const [selectedCountryCode, setSelectedCountryCode] = useState('CN'); // Default to China (10% treaty)
  const [price, setPrice] = useState(defaultPrice);
  const [yieldPct, setYieldPct] = useState(defaultYield);
  const [divGrowth, setDivGrowth] = useState(defaultDivGrowth);
  const [priceGrowth, setPriceGrowth] = useState(defaultPriceGrowth);
  const [monthly, setMonthly] = useState(defaultMonthly);
  const [years, setYears] = useState(defaultYears);

  const countrySelectId = useId();
  const initialInputId = useId();
  const priceInputId = useId();
  const yieldInputId = useId();
  const divGrowthInputId = useId();
  const priceGrowthInputId = useId();
  const monthlyInputId = useId();
  const yearsInputId = useId();

  // Find active treaty
  const activeTreaty: TaxTreaty =
    TAX_TREATIES.find((t) => t.code === selectedCountryCode) || {
      code: 'OTHER',
      country: 'Other / Non-Treaty',
      ratePct: DEFAULT_NRA_RATE,
      notes: 'Statutory 30% default rate under IRC § 1441.',
    };

  const withholdingRate = activeTreaty.ratePct;

  const nraInput: NraTaxInput = {
    initialInvestment: Number(initial) || 0,
    price: Number(price) > 0 ? Number(price) : 1,
    dividendYieldPct: Number(yieldPct) || 0,
    dividendGrowthPct: Number(divGrowth) || 0,
    priceGrowthPct: Number(priceGrowth) || 0,
    monthlyContribution: Number(monthly) || 0,
    years: Number(years) > 0 ? Math.min(50, Math.floor(Number(years))) : 1,
    withholdingRatePct: withholdingRate,
  };

  const snapshot = calculateNraSnapshot(nraInput.price, nraInput.dividendYieldPct, withholdingRate);
  const sim = simulateNraDrip(nraInput, true);

  const initialShares = nraInput.initialInvestment / nraInput.price;
  const year1GrossDiv = initialShares * nraInput.price * (nraInput.dividendYieldPct / 100);
  const year1Tax = year1GrossDiv * (withholdingRate / 100);
  const year1NetDiv = year1GrossDiv - year1Tax;

  const kpis: KpiItem[] = [
    {
      label: 'Net annual dividend (Yr 1)',
      value: formatMoney(year1NetDiv),
      sub: 'Cash in your pocket after withholding',
      tone: 'green',
    },
    {
      label: 'IRS withholding tax',
      value: `${withholdingRate}%`,
      sub: activeTreaty.treatyArticle || 'Statutory IRC § 1441 rate',
    },
    {
      label: 'Effective net yield',
      value: formatPercent(snapshot.netYieldPct),
      sub: `Pre-tax yield was ${formatPercent(snapshot.grossYieldPct)}`,
    },
    {
      label: `Portfolio value (${nraInput.years} yrs)`,
      value: formatMoney(sim.summary.finalValue),
      sub: `DRIP net dividends reinvested`,
      tone: 'green',
    },
  ];

  const labels = sim.yearly.map((r) => r.year);
  const annualContribution = nraInput.monthlyContribution * 12;
  const investedSeries = sim.yearly.map(
    (r) => nraInput.initialInvestment + annualContribution * r.year
  );

  return (
    <div className="calc">
      {prefillNote && <p className="calc-prefill-note">{prefillNote}</p>}

      <div className="calc-fields">
        {/* Country / Tax Treaty Selection */}
        <label htmlFor={countrySelectId} className="calc-field" style={{ gridColumn: '1 / -1' }}>
          <span className="calc-label">
            Your Tax Residence (W-8BEN Treaty Country)
          </span>
          <span className="calc-input">
            <select
              id={countrySelectId}
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="calc-select"
              style={{ fontWeight: 600, color: 'var(--color-primary, #2563eb)' }}
            >
              <optgroup label="Popular Tax Treaty Countries (10% - 15%)">
                {TAX_TREATIES.filter((t) => t.ratePct < 30).map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.country} ({t.ratePct}% Withholding)
                  </option>
                ))}
              </optgroup>
              <optgroup label="Non-Treaty & Standard Jurisdictions (30%)">
                {TAX_TREATIES.filter((t) => t.ratePct >= 30).map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.country} ({t.ratePct}% Withholding)
                  </option>
                ))}
              </optgroup>
            </select>
          </span>
          {activeTreaty.notes && <small className="calc-help">{activeTreaty.notes}</small>}
        </label>

        {/* Initial Investment */}
        <label htmlFor={initialInputId} className="calc-field">
          <span className="calc-label">Initial investment</span>
          <span className="calc-input">
            <span className="calc-affix">$</span>
            <input
              id={initialInputId}
              type="number"
              inputMode="decimal"
              step={100}
              value={initial}
              onChange={(e) => setInitial(Number(e.target.value))}
            />
          </span>
          <small className="calc-help">Buy amount in year one</small>
        </label>

        {/* Share Price */}
        <label htmlFor={priceInputId} className="calc-field">
          <span className="calc-label">{defaultTicker} share price</span>
          <span className="calc-input">
            <span className="calc-affix">$</span>
            <input
              id={priceInputId}
              type="number"
              inputMode="decimal"
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </span>
        </label>

        {/* Dividend Yield */}
        <label htmlFor={yieldInputId} className="calc-field">
          <span className="calc-label">Pre-tax dividend yield</span>
          <span className="calc-input">
            <input
              id={yieldInputId}
              type="number"
              inputMode="decimal"
              step={0.1}
              value={yieldPct}
              onChange={(e) => setYieldPct(Number(e.target.value))}
            />
            <span className="calc-affix">%</span>
          </span>
          <small className="calc-help">Gross annual distribution yield</small>
        </label>

        {/* Yield Growth */}
        <label htmlFor={divGrowthInputId} className="calc-field">
          <span className="calc-label">Dividend growth rate</span>
          <span className="calc-input">
            <input
              id={divGrowthInputId}
              type="number"
              inputMode="decimal"
              step={0.5}
              value={divGrowth}
              onChange={(e) => setDivGrowth(Number(e.target.value))}
            />
            <span className="calc-affix">%</span>
          </span>
          <small className="calc-help">Historical dividend increase</small>
        </label>

        {/* Price Appreciation */}
        <label htmlFor={priceGrowthInputId} className="calc-field">
          <span className="calc-label">Share price growth</span>
          <span className="calc-input">
            <input
              id={priceGrowthInputId}
              type="number"
              inputMode="decimal"
              step={0.5}
              value={priceGrowth}
              onChange={(e) => setPriceGrowth(Number(e.target.value))}
            />
            <span className="calc-affix">%</span>
          </span>
        </label>

        {/* Monthly Contribution */}
        <label htmlFor={monthlyInputId} className="calc-field">
          <span className="calc-label">Monthly contribution</span>
          <span className="calc-input">
            <span className="calc-affix">$</span>
            <input
              id={monthlyInputId}
              type="number"
              inputMode="decimal"
              step={50}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
            />
          </span>
          <small className="calc-help">Recurring buy amount</small>
        </label>

        {/* Horizon */}
        <label htmlFor={yearsInputId} className="calc-field">
          <span className="calc-label">Years</span>
          <span className="calc-input">
            <input
              id={yearsInputId}
              type="number"
              inputMode="numeric"
              step={1}
              min={1}
              max={50}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
            <span className="calc-affix">yrs</span>
          </span>
        </label>
      </div>

      {/* KPI Highlight Row */}
      <KpiRow items={kpis} />

      {/* Summary Rows */}
      <div className="calc-result">
        <div className="calc-row">
          <span>Gross Annual Dividend (Year 1)</span>
          <strong>{formatMoney(year1GrossDiv)}</strong>
        </div>
        <div className="calc-row">
          <span>IRS Withholding Tax ({withholdingRate}%)</span>
          <strong style={{ color: '#ef4444' }}>-{formatMoney(year1Tax)}</strong>
        </div>
        <div className="calc-row highlight">
          <span>Net Dividend Received (In Pocket)</span>
          <strong>{formatMoney(year1NetDiv)}</strong>
        </div>
        <div className="calc-row">
          <span>Total Withholding Tax Paid Over {nraInput.years} Yrs</span>
          <strong>{formatMoney(sim.summary.totalTaxWithheld)}</strong>
        </div>
        <div className="calc-row">
          <span>Compounding Tax Drag (Loss vs 0% Tax)</span>
          <strong style={{ color: '#d97706' }}>
            {formatMoney(sim.summary.taxDragDollars)} ({formatPercent(sim.summary.taxDragPct)})
          </strong>
        </div>
        <div className="calc-row">
          <span>Final Year Annual Net Income</span>
          <strong>{formatMoney(sim.summary.finalAnnualNetIncome)} / yr</strong>
        </div>
      </div>

      {/* Visual Chart: Net DRIP vs Gross Benchmark */}
      <div style={{ marginTop: '2rem' }}>
        <h3 className="results-title">Compounding Growth: Net NRA DRIP vs 0% Tax Benchmark</h3>
        <ResultsChart
          labels={labels}
          series={[
            {
              label: `NRA Net DRIP (${withholdingRate}% Tax)`,
              color: '#2563eb',
              values: sim.yearly.map((r) => r.endBalance),
            },
            {
              label: 'Gross DRIP (0% Tax Benchmark)',
              color: '#10b981',
              values: sim.yearly.map((r) => {
                // Approximate parallel benchmark trajectory
                const ratio = sim.summary.finalValue > 0
                  ? sim.summary.noTaxBenchmarkValue / sim.summary.finalValue
                  : 1;
                return r.endBalance * (1 + (ratio - 1) * (r.year / nraInput.years));
              }),
            },
            {
              label: 'Total Capital Invested',
              color: '#94a3b8',
              values: investedSeries,
            },
          ]}
        />
      </div>

      {/* Year by Year Detailed Breakdown */}
      <div style={{ marginTop: '2.5rem' }}>
        <h3 className="results-title">Year-by-Year Net Cash Flow & DRIP Breakdown</h3>
        <div className="results-table-wrap" role="region" aria-label="NRA Breakdown">
          <table className="results-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Start Balance</th>
                <th>Share Price</th>
                <th>Gross Div</th>
                <th>Tax Withheld ({withholdingRate}%)</th>
                <th>Net Div (DRIP)</th>
                <th>End Shares</th>
                <th>End Balance</th>
              </tr>
            </thead>
            <tbody>
              {sim.yearly.map((r) => (
                <tr key={r.year}>
                  <td>{r.year}</td>
                  <td>{formatMoney(r.startBalance)}</td>
                  <td>{formatMoney(r.sharePrice)}</td>
                  <td>{formatMoney(r.grossDividend)}</td>
                  <td style={{ color: '#ef4444' }}>-{formatMoney(r.taxWithheld)}</td>
                  <td style={{ fontWeight: 600 }}>{formatMoney(r.netDividend)}</td>
                  <td>{formatNumber(r.endShares, 2)}</td>
                  <td style={{ fontWeight: 600 }}>{formatMoney(r.endBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
