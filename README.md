# Dividend Payout Calculator (dividendpayoutcalculator.com)

第一个站 —— 头词「dividend calculator」的 SEO 工具站,靠 Adsense 变现。

**选词依据**:人眼验证 KD 后从 10 词中锁定。KD 7(真 Easy)、无巨头占有、DR14 小站排前三、
金融意图可变现、纯前端零成本。详见 `../进度日志.md` 与 `../score_report.xlsx`。

## 技术栈

- Next.js 14 App Router + TypeScript,**SSR/SSG**(全站 13 页静态预渲染,SEO 友好)
- 纯函数计算(`lib/dividend.ts`)+ vitest TDD(16 测)
- 纯 CSS(视觉借鉴 ai-shipany 模版:蓝色主色 + 大圆角 + 柔和阴影)
- 无 DB、无登录、无 Stripe —— 纯工具站 + Adsense,保持最轻

## 本地运行

```bash
npm install
npm run dev        # 开发
npm run test       # vitest 单测
npm run build      # 生产构建
npm start          # 起服务
```

## 页面

| 路径 | 内容 |
|---|---|
| `/` | 头词 dividend calculator(收益率+增长+月收入一体)+ FAQ schema |
| `/calculators/dividend-yield-calculator` | 股息率 |
| `/calculators/dividend-growth-calculator` | 股息增长 + 72法则 |
| `/calculators/drip-calculator` | DRIP 再投资复利 |
| `/calculators/monthly-dividend-calculator` | 月股息收入 |
| `/calculators/dividend-payout-ratio-calculator` | 支付率可持续性 |
| `/privacy-policy` `/terms` | Adsense 过审三件套 |

## 上线前待办

- [ ] 买域名 `dividendcalculator.io` + 解析到 Vercel/Cloudflare
- [ ] 部署(Vercel 一键,或模版里的 open-next + Cloudflare Workers)
- [ ] 填 `NEXT_PUBLIC_ADSENSE_CLIENT`(Adsense 账号拿到后)+ 换真实 ad slot
- [ ] 提交 GSC、提交 sitemap
- [ ] 首页/子页做长尾:monthly dividend / dividend yield / ex-dividend date 词

## 数据维护

- 计算逻辑在 `lib/dividend.ts`(纯函数,改公式跑 `npm test`)
- 页面文案/内链在 `lib/nav.ts`(导航单一来源)
