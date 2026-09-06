import Link from "next/link";
import { Icon } from "@/components/icons";
import { toEnglishPaddedNumber } from "@/lib/persian-numbers";
import { SectionHeader } from "@/components/section-header";
import type { FaqItem } from "@/config/site-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

type FaqSectionProps = {
  faqs: FaqItem[];
  whatsapp: string;
};

export function FaqSection({ faqs, whatsapp }: FaqSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section data-reveal id="faq" className="bg-white py-20 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="پرسش‌های متداول"
              title="پیش از انتخاب دستگاه"
              description="پاسخ کوتاه به سؤال‌هایی که معمولاً پیش از مشاوره فنی و ثبت سفارش مطرح می‌شوند."
            />
            <div className="mt-7 rounded-2xl border border-brand-100 bg-brand-50 p-5">
              <p className="text-sm font-black text-ink-950">پاسخ سؤال شما اینجا نیست؟</p>
              <p className="mt-2 text-xs leading-6 text-slate-600">نیاز تولیدتان را مستقیم با تیم آوین مطرح کنید.</p>
              <Link
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-700 transition hover:text-brand-900"
              >
                مشاوره در واتساپ
                <Icon name="arrow" className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="border-t border-slate-200 lg:col-span-8"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`} data-reveal-item>
              <AccordionTrigger>
                <span className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <span className="mt-0.5 font-number text-xs text-brand-500" dir="ltr">
                    {toEnglishPaddedNumber(index + 1)}
                  </span>
                  <span className="text-sm font-black leading-7 text-ink-950 sm:text-base">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pr-7 sm:pr-10">
                <p className="max-w-3xl text-sm leading-8 text-slate-600">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
