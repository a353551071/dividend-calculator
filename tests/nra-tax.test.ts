import { describe, it, expect } from 'vitest';
import { calculateNraSnapshot, simulateNraDrip } from '../lib/nraTax';
import { TAX_TREATIES, getTreatyByCode } from '../data/taxTreaties';

describe('NRA Tax Treaty Data', () => {
  it('correctly matches China 10% treaty rate', () => {
    const china = getTreatyByCode('CN');
    expect(china.ratePct).toBe(10);
    expect(china.country).toBe('China');
  });

  it('correctly matches UK and Japan 15% treaty rates', () => {
    const uk = getTreatyByCode('GB');
    expect(uk.ratePct).toBe(15);
    const jp = getTreatyByCode('JP');
    expect(jp.ratePct).toBe(15);
  });

  it('falls back to 30% statutory rate for non-treaty regions', () => {
    const hk = getTreatyByCode('HK');
    expect(hk.ratePct).toBe(30);
    const sg = getTreatyByCode('SG');
    expect(sg.ratePct).toBe(30);
    const unknown = getTreatyByCode('XYZ');
    expect(unknown.ratePct).toBe(30);
  });
});

describe('calculateNraSnapshot', () => {
  it('calculates net yield and per-share breakdown accurately', () => {
    // SCHD: $80 share price, 3.5% yield -> $2.80 gross annual dividend
    const res = calculateNraSnapshot(80, 3.5, 10); // China 10%
    expect(res.grossAnnualPerShare).toBeCloseTo(2.80, 2);
    expect(res.taxWithheldPerShare).toBeCloseTo(0.28, 2);
    expect(res.netAnnualPerShare).toBeCloseTo(2.52, 2);
    expect(res.netYieldPct).toBeCloseTo(3.15, 2); // 3.5% * 0.9 = 3.15%
  });

  it('calculates 30% non-treaty drag correctly', () => {
    const res = calculateNraSnapshot(100, 4.0, 30); // 30% statutory
    expect(res.grossAnnualPerShare).toBe(4.0);
    expect(res.taxWithheldPerShare).toBeCloseTo(1.2, 2);
    expect(res.netAnnualPerShare).toBeCloseTo(2.8, 2);
    expect(res.netYieldPct).toBeCloseTo(2.8, 2);
  });

  it('handles invalid inputs gracefully', () => {
    const invalid = calculateNraSnapshot(-50, 3.5, 10);
    expect(Number.isNaN(invalid.grossYieldPct)).toBe(true);
  });
});

describe('simulateNraDrip', () => {
  it('correctly projects net dividend reinvestment and tax drag', () => {
    const input = {
      initialInvestment: 10000,
      price: 80,
      dividendYieldPct: 3.5,
      dividendGrowthPct: 5,
      priceGrowthPct: 5,
      monthlyContribution: 0,
      years: 5,
      withholdingRatePct: 10, // China 10%
    };

    const sim = simulateNraDrip(input, true);
    expect(sim.yearly.length).toBe(5);
    expect(sim.summary.totalGrossDividends).toBeGreaterThan(0);
    expect(sim.summary.totalTaxWithheld).toBeCloseTo(sim.summary.totalGrossDividends * 0.1, 1);
    expect(sim.summary.totalNetDividends).toBeCloseTo(
      sim.summary.totalGrossDividends - sim.summary.totalTaxWithheld,
      1
    );
    // Tax drag should be strictly positive compared to 0% tax benchmark
    expect(sim.summary.taxDragDollars).toBeGreaterThan(0);
    expect(sim.summary.noTaxBenchmarkValue).toBeGreaterThan(sim.summary.finalValue);
  });

  it('reflects higher drag for 30% withholding than 10% withholding', () => {
    const base = {
      initialInvestment: 10000,
      price: 80,
      dividendYieldPct: 4.0,
      dividendGrowthPct: 5,
      priceGrowthPct: 5,
      monthlyContribution: 100,
      years: 10,
    };

    const sim10 = simulateNraDrip({ ...base, withholdingRatePct: 10 }, true);
    const sim30 = simulateNraDrip({ ...base, withholdingRatePct: 30 }, true);

    expect(sim10.summary.finalValue).toBeGreaterThan(sim30.summary.finalValue);
    expect(sim30.summary.taxDragDollars).toBeGreaterThan(sim10.summary.taxDragDollars);
  });
});
