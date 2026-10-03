import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ProductsCatalog } from "@/components/products-catalog";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: "محصولات | AVIN CNC",
  description:
    "فهرست دسته‌بندی‌شده دستگاه‌های CNC چوب و دستگاه‌های برش لیزر فایبر آوین CNC.",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <main className="overflow-x-clip bg-white text-ink-950">
      <section className="relative isolate overflow-hidden bg-ink-950 pb-28 text-white sm:pb-32 lg:pb-24">
        <div aria-hidden="true" className="absolute -right-32 top-12 size-[28rem] rounded-full bg-brand-500/20 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 -left-24 size-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center justify-center gap-2 pt-24 text-xs text-white/50 sm:pt-28" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-white">خانه</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">محصولات</span>
          </nav>

          <div className="mx-auto mt-8 max-w-4xl text-center sm:mt-10">
            {/* <p className="text-xs font-black tracking-[0.12em] text-brand-300 sm:text-sm">کاتالوگ AVIN CNC</p> */}
           
            <h1 className="mt-4 text-balance text-3xl font-black leading-[1.35] sm:text-5xl lg:text-6xl">
              انتخاب محصول بر اساس دسته‌بندی

            </h1>
             <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
            محصولات در دو گروه CNC چوب و برش لیزر فایبر قرار گرفته‌اند. دسته موردنظر را انتخاب کنید و برای مشاهده کاربرد، شرایط سفارش و اطلاعات هر دستگاه وارد صفحه جزئیات شوید.
          </p>
            
            {/* <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-white/65 sm:text-base sm:leading-9">
              راهکارهای ماشین‌کاری چوب و برش لیزر فایبر برای کارگاه‌ها و مجموعه‌های تولیدی؛ با انتخاب ابعاد، توان و قطعات بر اساس نیاز واقعی خط تولید شما.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="#products-grid">مشاهده دستگاه‌ها</Button>
              <Button variant="dark" href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer">
                درخواست مشاوره فنی
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      <section aria-label="مزیت‌های خرید از آوین" className="relative z-10 -mt-14 px-4 sm:-mt-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1.5rem_4rem_rgba(7,11,18,.12)] md:grid-cols-3">
          {[
            { icon: "settings" as const, title: "پیکربندی متناسب", text: "ابعاد، توان و قطعات بر اساس کاربرد" },
            { icon: "shield" as const, title: "ضمانت و پشتیبانی", text: "یک سال ضمانت و پنج سال خدمات" },
            { icon: "clock" as const, title: "ساخت برنامه‌ریزی‌شده", text: "بازه عمومی آماده‌سازی 45 تا 60 روز" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 border-b border-slate-200 p-5 last:border-b-0 md:border-b-0 md:border-l md:last:border-l-0 lg:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="size-5" />
              </span>
              <div>
                <h2 className="text-sm font-black text-ink-950">{item.title}</h2>
                <p className="mt-1 text-xs leading-6 text-slate-500">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">p[a]
          <div className="grid items-end gap-4 border-b border-slate-200 pb-6 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] md:gap-10">
            <div>
              <p className="text-xs font-black text-brand-600">خانواده محصولات</p>
              <h2 className="mt-2 text-2xl font-black leading-snug text-ink-950 sm:text-3xl">دو مسیر تخصصی تولید</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 md:justify-self-end">
              خانواده دستگاه را بر اساس متریال و نوع عملیات انتخاب کنید؛ مشخصات نهایی پس از بررسی فنی تعیین می‌شود.
            </p>
          </div>

          <div className="mt-7 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {siteConfig.categories.map((category, index) => (
              <article key={category.slug} className="group min-w-0">
                <Link href={`/products?category=${category.slug}`} className="relative block aspect-[4/5] w-full min-w-0 overflow-hidden rounded-2xl bg-ink-950 text-white shadow-[0_1rem_2.5rem_rgba(7,11,18,.1)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_1.4rem_3.5rem_rgba(7,11,18,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[16/11]">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 767px) calc(100vw - 2rem), 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 h-[72%] bg-black/35 backdrop-blur-lg [mask-image:linear-gradient(to_bottom,transparent_0%,black_38%)]" />

                  <span className="absolute right-4 top-4 rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-bold text-white/80 backdrop-blur-md">
                    {category.eyebrow}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-4 min-[360px]:p-5 sm:p-6">
                    <h3 className="text-lg font-black text-white min-[360px]:text-xl sm:text-2xl">{category.name}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/70 sm:text-sm sm:leading-7">{category.description}</p>
                    <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-white/75 sm:text-xs sm:leading-6">
                      <Icon name="check" className="mt-1 size-3.5 shrink-0 text-cyan-300" />
                      {category.highlights[0]}
                    </p>
                    <span className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.04] px-3.5 py-3 text-xs font-black text-brand-300 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[.14] group-hover:text-cyan-100 group-hover:backdrop-blur-xl">
                      بررسی این دسته
                      <Icon name="arrow" className="size-4 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <Suspense
        fallback={
          <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="h-64 animate-pulse rounded-3xl bg-slate-100" />
            </div>
          </section>
        }
      >
        <ProductsCatalog categories={siteConfig.categories} products={siteConfig.products} />
      </Suspense>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-o lg:px-8">
        <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] bg-brand-600 px-6 py-10 text-center text-white shadow-2xl shadow-brand-700/20 sm:px-10 sm:py-14">
          <div aria-hidden="true" className="absolute -right-16 -top-20 size-64 rounded-full border-[3rem] border-white/5" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-bold text-brand-100">قدم بعدی</p>
            <h2 className="mt-3 text-2xl font-black leading-snug sm:text-4xl">برای انتخاب دستگاه مناسب، نیاز تولیدتان را با ما مطرح کنید</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">تیم فنی آوین نوع متریال، ابعاد کار و ظرفیت موردنیاز را بررسی می‌کند.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="secondary" href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer">مشاوره در واتساپ</Button>
              <Button variant="dark" href={`tel:${siteConfig.contact.phones[0]}`}>تماس مستقیم</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
