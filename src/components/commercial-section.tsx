import { Icon } from "@/components/icons";
import { SectionHeader } from "@/components/section-header";
import type { SiteConfig } from "@/config/site-config";

type CommercialSectionProps = {
  commercial: SiteConfig["commercial"];
};

export function CommercialSection({ commercial }: CommercialSectionProps) {

  return (
    <section data-reveal className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink-950 py-20 text-white sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute -right-32 top-16 size-96 rounded-full bg-brand-600/15 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-24 size-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.075),rgba(255,255,255,.025))] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-9 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeader inverse eyebrow="شرایط سفارش" title={commercial.title} description={commercial.description} />
              <div className="mt-8 rounded-2xl border border-brand-400/25 bg-brand-500/10 p-5">
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/20">
                    <Icon name="clock" className="size-5" />
                  </span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-bold leading-7 text-white">
                      برای دستگاه‌های CNC چوب: <span className="text-brand-300">از ۴۰ تا ۵۰ روز کاری</span>
                    </p>
                    <p className="text-sm font-bold leading-7 text-white">
                      برای دستگاه‌های لیزر فایبر: <span className="text-brand-300">از ۷۰ تا ۹۰ روز کاری</span>
                    </p>
                    <p className="pt-1 text-xs leading-6 text-slate-400">زمان دقیق برای هر دستگاه پس از تأیید پیکربندی اعلام می‌شود.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pr-4">
              <div className="flex flex-col items-start gap-2 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between min-[420px]:gap-4">
                <p className="text-base font-black text-white">عوامل مؤثر بر قیمت نهایی</p>
                <span className="text-xs font-bold text-brand-300">پیکربندی اختصاصی</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {commercial.priceFactors.map((factor, index) => (
                  <div key={factor} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.045] p-4 text-sm font-bold text-slate-200 transition hover:border-brand-400/35 hover:bg-white/[.07] sm:p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.06] text-xs font-black text-brand-300 transition group-hover:bg-brand-500 group-hover:text-white">
                      <span className="font-number">{(index + 1).toLocaleString("en-US")}</span>
                    </span>
                    {factor}
                    <Icon name="check" className="mr-auto size-4 shrink-0 text-brand-400" />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.07] p-4 text-xs leading-6 text-cyan-50/75 sm:p-5">
                <Icon name="info" className="mt-0.5 size-5 shrink-0 text-cyan-300" />
                <p>{commercial.financing}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
