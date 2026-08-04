'use client';

import { useState } from 'react';

export interface CalcField {
  key: string;
  label: string;
  defaultValue: number;
  step?: number;
  /** 输入框前缀/后缀:美元 $、百分比 %、单位 */
  prefix?: string;
  suffix?: string;
  help?: string;
}

export interface CalcRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface CalculatorProps {
  fields: CalcField[];
  compute: (values: Record<string, number>) => CalcRow[];
  footnote?: string;
}

/** 通用计算器外壳:字段表单 + 结果卡片。纯 client,负责交互。 */
export default function Calculator({ fields, compute, footnote }: CalculatorProps) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(fields.map((f) => [f.key, f.defaultValue]))
  );
  const rows = compute(values);

  return (
    <div className="calc">
      <div className="calc-fields">
        {fields.map((f) => (
          <label key={f.key} className="calc-field">
            <span className="calc-label">{f.label}</span>
            <span className="calc-input">
              {f.prefix && <span className="calc-affix">{f.prefix}</span>}
              <input
                type="number"
                inputMode="decimal"
                step={f.step ?? 0.01}
                value={values[f.key]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: Number(e.target.value) }))
                }
              />
              {f.suffix && <span className="calc-affix">{f.suffix}</span>}
            </span>
            {f.help && <small className="calc-help">{f.help}</small>}
          </label>
        ))}
      </div>
      <div className="calc-result">
        {rows.map((r) => (
          <div key={r.label} className={r.highlight ? 'calc-row highlight' : 'calc-row'}>
            <span>{r.label}</span>
            <strong>{r.value}</strong>
          </div>
        ))}
      </div>
      {footnote && <p className="calc-footnote">{footnote}</p>}
    </div>
  );
}
