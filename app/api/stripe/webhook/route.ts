import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function money(cents: number, currency: string = 'usd'): string {
  const cur = (currency || 'usd').toUpperCase();
  const value = (cents || 0) / 100;
  const symbol = cur === 'USD' ? '$' : cur === 'CNY' ? '¥' : '';
  return symbol ? `${symbol}${value.toFixed(2)} ${cur}` : `${value.toFixed(2)} ${cur}`;
}

async function sendFeishuNotification(text: string) {
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;
  const secret = process.env.FEISHU_SECRET;

  if (!webhookUrl) {
    console.log('[stripe-webhook] FEISHU_WEBHOOK_URL not set; skipping notify. Text:\n', text);
    return;
  }

  const ts = Math.floor(Date.now() / 1000).toString();
  let sign = '';

  if (secret) {
    const stringToSign = `${ts}\n${secret}`;
    const hmac = crypto.createHmac('sha256', stringToSign);
    sign = hmac.update('').digest('base64');
  }

  const payload: Record<string, any> = {
    msg_type: 'text',
    content: { text },
  };

  if (sign) {
    payload.timestamp = ts;
    payload.sign = sign;
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[stripe-webhook] Feishu push failed: ${res.status} ${errText}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    let event: any;

    try {
      event = JSON.parse(rawBody);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data?.object || {};
      const amountTotal = session.amount_total || 0;
      const currency = session.currency || 'usd';
      const customerEmail =
        session.customer_email ||
        session.customer_details?.email ||
        'Unknown email';
      const sessionId = session.id || 'N/A';

      const lines = [
        '🎉 📈 【一站 · 股息计算器出单提醒】',
        '💳 商品: 2026 Dividend Snowball & Portfolio Tracker ($9.90 一次性买断)',
        `💵 实收金额: ${money(amountTotal, currency)}`,
        `👤 客户邮箱: ${customerEmail}`,
        '⚡ 交付状态: 已自动重定向至 Google Drive /copy 授权页',
        `🧾 Stripe单号: ${sessionId}`,
        `⏰ 时间: ${new Date().toISOString()}`,
      ];

      await sendFeishuNotification(lines.join('\n'));
      return NextResponse.json({ received: true, status: 'notified' });
    }

    return NextResponse.json({ received: true, ignored: event.type });
  } catch (err: any) {
    console.error('[stripe-webhook] Error processing webhook:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: 'stripe-webhook' });
}
