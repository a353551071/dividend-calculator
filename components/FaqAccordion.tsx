'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ 手风琴(AdSense 整改期视觉迁移):radix 键盘可达替代 <details>,
 * 视觉与旧 .faq 一致(下边线分隔 + 悬停主色),FAQPage schema 不变(页面层生成)。
 */
export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>
            <p>{f.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
