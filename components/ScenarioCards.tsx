import Link from 'next/link';
import { simulateDrip, type DripInput } from '@/lib/dividend';
import { formatMoney } from '@/lib/format';

export interface Scenario {
  name: string;
  /** One-line setup, e.g. "$1,000 lump sum, nothing added". */
  setup: string;
  input: DripInput;
  /** Per-page unique editorial note (takeaway / trade-off / cross-link context). */
  note?: string;
}

interface ScenarioCardsProps {
  title: string;
  intro: string;
  scenarios: Scenario[];
  /** What the distributions are called in the numbers, e.g. "QQQI" / "dividend". */
  subject: string;
}

/**
 * SSG 预计算的三场景推演卡(AdSense 整改 A3):
 * 数字 build 时由 simulateDrip 算好、直接进 HTML(可抓可验);
 * 每页场景参数与注释不同 → 打散计算器簇的同构模板感。
 */
export default function ScenarioCards({ title, intro, scenarios, subject }: ScenarioCardsProps) {
  return (
    <section className="scenario-block">
      <h2>{title}</h2>
      <p>{intro}</p>
      <div className="scenario-grid">
        {scenarios.map((s) => {
          const r = simulateDrip(s.input).summary;
          return (
            <article key={s.name} className="scenario-card">
              <h3>{s.name}</h3>
              <p className="sc-setup">{s.setup}</p>
              <dl className="sc-nums">
                <div>
                  <dt>Final portfolio value</dt>
                  <dd>{formatMoney(r.finalValue)}</dd>
                </div>
                <div>
                  <dt>Total {subject} distributions</dt>
                  <dd>{formatMoney(r.totalDividends)}</dd>
                </div>
                <div>
                  <dt>Annual income at end</dt>
                  <dd>
                    {formatMoney(r.finalAnnualDividendIncome)}
                    <span className="sc-sub">
                      {' '}
                      ({formatMoney(r.finalAnnualDividendIncome / 12)}/mo)
                    </span>
                  </dd>
                </div>
              </dl>
              {s.note && <p className="sc-note">{s.note}</p>}
            </article>
          );
        })}
      </div>
      <p className="sc-footnote">
        Every number above is precomputed at build time with this page&apos;s assumptions using our
        open-source math engine — see the <Link href="/methodology">methodology page</Link> for the
        exact formulas and how to verify them yourself.
      </p>
    </section>
  );
}
