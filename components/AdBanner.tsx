'use client';

import { useEffect, useState } from 'react';

const PRODUCTION_HOSTS = new Set([
  'dividendpayoutcalculator.com',
  'www.dividendpayoutcalculator.com',
]);

/**
 * AdSense 广告位占位：
 * 1) 仅在配置了 NEXT_PUBLIC_ADSENSE_CLIENT 且 slot 为真实数字单元 ID 时渲染，避免未过审阶段出现无效 slot 请求和空白虚线占位框；
 * 2) 仅在正式生产域名渲染，本地开发 / preview 环境绝不触发广告加载或无效展示。
 */
export default function AdBanner({ slot }: { slot: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const [allowedHost, setAllowedHost] = useState(false);

  const validSlot = /^\d+$/.test(slot);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      validSlot &&
      PRODUCTION_HOSTS.has(window.location.hostname)
    ) {
      setAllowedHost(true);
    }
  }, [validSlot]);

  useEffect(() => {
    if (!allowedHost || !client || !validSlot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // ignore duplicate push in React strict/navigation cycles
    }
  }, [allowedHost, client, validSlot]);

  if (!client || !validSlot || !allowedHost) return null;

  return (
    <div className="ad-slot">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 90 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
