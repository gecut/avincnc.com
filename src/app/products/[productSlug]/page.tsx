import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toEnglishPaddedNumber } from "@/lib/persian-numbers";
import {
  ShieldCheck,
  SpeedometerMiddle,
  Target,
} from "@solar-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { CommercialSummary } from "@/components/commercial-summary";
import { Icon } from "@/components/icons";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductGallery } from "@/components/product-gallery";
import { ProductVideoFrame } from "@/components/product-video-frame";
import { Section } from "@/components/section";
import {
  getCategoryBySlug,
  getProductBySlug,
  siteConfig,
} from "@/config/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.products.map((product) => ({
    productSlug: product.slug,
  }));
}

type ProductPageProps = {
  params: Promise<{
    productSlug: string;
  }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    return {
      title: "محصول یافت نشد | AVIN CNC",
    };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}/` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = siteConfig.products
    .filter((candidate) => candidate.slug !== product.slug)
    .sort((first, second) => {
      const firstMatch = first.categorySlug === product.categorySlug ? 0 : 1;
      const secondMatch = second.categorySlug === product.categorySlug ? 0 : 1;
      return firstMatch - secondMatch;
    });
  const benefitIcons = [SpeedometerMiddle, Target, ShieldCheck];
  const keyFacts = [
    { label: "دسته", value: category?.name ?? "ماشین‌آلات CNC" },
    { label: "متریال", value: product.materials.join("، ") },
    { label: "ضمانت", value: "یک سال" },
    { label: "خدمات", value: "ده سال خدمات پس از فروش" },
    { label: "آماده‌سازی", value: product.preparationTime || "۴۵ تا ۶۰ روز کاری" },
  ];

  return (
    <main dir="rtl" className="overflow-x-clip bg-slate-50 text-zinc-950">
      <div className="flex h-[20svh] w-full max-w-full flex-col justify-end rounded-b-2xl rounded-t-none bg-[#07090f] py-4">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="mx-auto flex min-w-0 flex-wrap items-center gap-2 text-xs leading-6 text-white sm:px-8" aria-label="مسیر صفحه">
            <Link href="/" className="transition hover:text-brand-600">خانه</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="transition hover:text-brand-600">محصولات</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/products?category=${product.categorySlug}`} className="transition hover:text-brand-600">
              {category?.name ?? "دسته‌بندی"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="min-w-0 truncate text-white/40">{product.name}</span>
          </nav>
        </div>
      </div>
      <section className="mx-auto max-w-6xl border-b border-slate-200 bg-white pb-10 pt-0 sm:pb-14 lg:pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12 xl:gap-16">
            <div className="min-w-0 lg:pt-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-black text-brand-700">
                <Icon name="factory" className="size-4" />
                {category?.name ?? "ماشین‌آلات CNC"}
              </span>
              <h1 className="mt-5 text-3xl font-black leading-[1.35] tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base sm:leading-9">
                {product.shortDescription}
              </p>

              <ul className="mt-6 flex flex-col gap-3 border-y border-slate-200 py-5 sm:gap-4">
                {product.benefits.slice(0, 3).map((benefit) => (
                  <li key={benefit} className="flex min-w-0 items-start gap-2.5 text-sm leading-7 text-slate-700">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-xs font-bold leading-6 text-slate-500">برای استعلام قیمت و انتخاب پیکربندی، مشخصات خط تولیدتان را با تیم فنی مطرح کنید.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button
                    href={product.catalogPdf || "/catalogs/avin-2x6-fiber-laser-catalog.pdf"}
                    download={product.catalogPdf ? product.catalogPdf.split("/").pop() : "avin-catalog.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full cursor-pointer"
                  >
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    دانلود کاتالوگ
                  </Button>
                  <Button className="w-full" variant="secondary" href={`tel:${siteConfig.contact.phones[0]}`}>
                    تماس مستقیم
                  </Button>
                </div>
              </div>
            </div>

            <ProductGallery product={product} />
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 min-[420px]:grid-cols-2 md:grid-cols-3 lg:mt-10 lg:grid-cols-5">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="min-w-0 bg-white p-4 lg:p-5">
                <dt className="text-xs font-bold text-slate-400">{fact.label}</dt>
                <dd className="mt-2 text-sm font-black leading-6 text-ink-950">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section
        compact
        id="product-purpose"
        title="کاربرد اصلی"
      >
        <div className="max-w-5xl space-y-5 text-sm leading-8 text-slate-700 sm:text-base sm:leading-9">
          <p>{product.overview}</p>
          <p>{product.purpose}</p>
        </div>
      </Section>

      <Section compact id="product-video" title="نمونه دستگاه تولید شده">
        <div className="mx-auto w-full max-w-3xl">
          <ProductVideoFrame product={product} />
        </div>
      </Section>

      {/* <Section
        compact
        id="product-benefits"
        title="ویژگی‌های مهم"
        description="نکاتی که در انتخاب این مدل بیشترین اهمیت را دارند."
      >
        <div className="flex flex-wrap gap-8">
          {product.benefits.map((benefit, index) => {
            const BenefitIcon = benefitIcons[index % benefitIcons.length];

            return (
              <div key={benefit} className="group flex min-w-0 basis-full items-start gap-4 sm:basis-[calc(50%_-_1rem)] lg:basis-[calc(33.333%_-_1.35rem)]">
                <BenefitIcon
                  size={34}
                  weight="BoldDuotone"
                  className="mt-0.5 shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-brand-600"
                />
                <p className="text-sm leading-8 text-zinc-700 transition-colors duration-300 group-hover:text-ink-950">
                  {benefit}
                </p>
              </div>
            );
          })}
        </div>
      </Section> */}

      {/* <Section
        compact
        id="product-audience"
        title="مناسب برای"
        description="کسب‌وکارهایی که کاربرد و ظرفیت این دستگاه با فرآیند تولیدشان هماهنگ است."
      >
        <div className="flex flex-wrap gap-8">
          {product.targetUsers.map((user, index) => (
            <div key={user} className="min-w-0 basis-full sm:basis-[calc(50%_-_1rem)] lg:flex-1">
              <span className="font-number text-4xl leading-none text-brand-100">{toEnglishPaddedNumber(index + 1)}</span>
              <p className="mt-3 text-sm font-bold leading-8 text-zinc-700">{user}</p>
            </div>
          ))}
        </div>
      </Section> */}

      {product.reportedClaims.length > 0 && (
        <Section
          compact
          id="product-reported-claims"
          title="ضخامت برش ورق آهن"
          description="ضخامت قابل برش به کیفیت ورق، نوع گاز، تنظیمات دستگاه و سطح کیفیت مورد انتظار وابسته است."
        >
          <div className="flex flex-wrap gap-8">
            {product.reportedClaims.map((claim) => (
              <article key={claim} className="flex min-w-0 basis-full items-start gap-3 sm:flex-1">
                <SpeedometerMiddle size={26} weight="BoldDuotone" className="mt-1 shrink-0 text-amber-600" />
                <p className="text-sm font-bold leading-8 text-amber-950">{claim}</p>
              </article>
            ))}
          </div>
        </Section>
      )}



      <Section
        compact
        id="product-commercial"
        title="شرایط سفارش"
        description="قیمت بر اساس ابعاد دستگاه، فناوری، برند قطعات و پیکربندی نهایی محاسبه می‌شود. امکان بررسی لیزینگ و اقساط بلندمدت نیز وجود دارد."
      >
        <CommercialSummary product={product} />
      </Section>
      <Section
        compact
        id="product-materials"
        title="متریال قابل پردازش"
      >
        <div className="flex flex-wrap gap-3">
          {product.materials.map((material) => (
            <span
              key={material}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-100 px-5 text-sm font-bold text-zinc-800 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <Target size={20} weight="BoldDuotone" className="shrink-0" />
              {material}
            </span>
          ))}
        </div>

      </Section>
      {relatedProducts.length > 0 && (
        <Section
          compact
          id="related-products"
          className="bg-white"
          title="مدل‌های دیگر"
          description="گزینه‌های دیگر CNC چوب و برش لیزر فایبر آوین."
        >
          <ProductCarousel products={relatedProducts} ariaLabel="محصولات مشابه" />
        </Section>
      )}
    </main>
  );
}