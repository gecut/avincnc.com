import { Icon } from "@/components/icons";
import { SectionHeader } from "@/components/section-header";
import { changaOne } from "@/config/fonts";
import type { SiteConfig } from "@/config/site-config";

type AboutSectionProps = {
  about: SiteConfig["about"];
  capabilities: SiteConfig["capabilities"];
};

export function AboutSection({ about, capabilities }: AboutSectionProps) {

  return (
    <section data-reveal id="about" className="flex min-h-screen flex-col justify-center bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8">
<div className="w-full min-w-0 lg:col-span-5">
  <SectionHeader
    mobileCenter
    eyebrow={about.eyebrow}
    title={about.title}
    description={about.description}
  />

  <div className="mt-8 flex w-full min-w-0 flex-col items-center justify-around gap-4 overflow-hidden rounded-2xl bg-brand-500/10 px-6 py-5 sm:px-8 sm:py-6 md:flex-row md:gap-6 lg:px-8 lg:py-6">

    <div className="flex min-w-0 items-center justify-center gap-2.5">
      <span
        className={`${changaOne.className} shrink-0 text-4xl leading-none text-brand-500 sm:text-5xl lg:text-6xl`}
        dir="ltr"
      >
        +4
      </span>

      <p className="shrink-0 whitespace-nowrap text-xs font-black text-ink-950 sm:text-sm">
        سال فعالیت شرکت
      </p>
    </div>

    <div className="hidden h-10 w-px shrink-0 bg-brand-500/20 md:block" />

    <div className="flex min-w-0 items-center justify-center gap-2.5">
      <span
        className={`${changaOne.className} shrink-0 text-4xl leading-none text-brand-500 sm:text-5xl lg:text-6xl`}
        dir="ltr"
      >
        +50
      </span>

      <p className="shrink-0 whitespace-nowrap text-xs font-black text-ink-950 sm:text-sm">
        مشتری ارزشمند
      </p>
    </div>

  </div>
</div>

        <div className="w-full lg:col-span-7">
          <div className="border-y border-slate-200">
            {capabilities.map((capability) => (
              <article key={capability.title} className="flex flex-col items-center justify-center gap-4 border-b border-slate-200 py-6 text-center last:border-b-0 md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6 md:text-right">
                  <span className="grid size-11 place-items-center rounded-full bg-brand-50 text-brand-600">
                    <Icon name={capability.status === "active-category" ? "factory" : "settings"} className="size-5" />
                  </span>
                <div>
                  <h3 className="text-lg font-black text-ink-950">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{capability.description}</p>
                </div>
                {/* <span className="w-fit rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-bold text-slate-500">
                  {capability.status === "active-category" ? "دسته فعال" : "توانمندی شرکت"}
                </span> */}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
