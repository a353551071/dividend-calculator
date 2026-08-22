/**
 * AdSense 广告位占位。
 *
 * 环境变量 NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxx 时注入真实广告单元;
 * 未配置时渲染空(不影响构建与本地开发)。AdSense 审核通过后再填 client id。
 */
export default function AdBanner({ slot }: { slot: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return null;
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
      <script
        dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }}
      />
    </div>
  );
}
