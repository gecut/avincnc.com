import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SpeedometerMiddle, Target } from "@solar-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { CommercialSummary } from "@/components/commercial-summary";
import { DirectAnswerBlock } from "@/components/direct-answer-block";
import { Icon } from "@/components/icons";
import { ProductCarousel } from "@/components/product-carousel";
import { ProductGallery } from "@/components/product-gallery";
import { ProductSpecsTable } from "@/components/product-specs-table";
import { ProductVideoFrame } from "@/components/product-video-frame";
import { Section } from "@/components/section";
import {
  getCategoryBySlug,
  getProductBySlug,
  siteConfig,
} from "@/config/site-config";
import {
  getBreadcrumbSchema,
  getProductSchema,
} from "@/lib/schema";

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

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    return {
      title: "محصول یافت نشد | AVIN CNC",
    };
  }

  const category = getCategoryBySlug(product.categorySlug);
  const title = category
    ? `${product.name} | ${category.name} | AVIN CNC`
    : `${product.name} | تولید و سفارش AVIN CNC`;
  const description = product.directAnswer || product.shortDescription;
  const primaryImage = product.images[0]?.src || "/icon-512.png";
  const fullImageUrl = primaryImage.startsWith("http")
    ? primaryImage
    : `https://avincnc.com${primaryImage}`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}/` },
    openGraph: {
      title,
      description,
      url: `https://avincnc.com/products/${product.slug}/`,
      siteName: siteConfig.siteName,
      locale: "fa_IR",
      type: "website",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
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

  const keyFacts = [
    { label: "دسته", value: category?.name ?? "ماشین‌آلات CNC" },
    { label: "متریال", value: product.materials.join("، ") },
    { label: "ضمانت", value: "یک سال رسمی" },
    { label: "خدمات", value: "پنج سال خدمات پس از فروش" },
    {
      label: "آماده‌سازی",
      value: product.preparationTime || "۴۵ تا ۶۰ روز کاری",
    },
  ];

  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "محصولات", url: "/products/" },
    {
      name: category?.name ?? "دسته‌بندی",
      url: `/categories/${product.categorySlug}/`,
    },
    { name: product.name, url: `/products/${product.slug}/` },
  ];

  const productSchema = getProductSchema(product, category);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <main dir="rtl" className="overflow-x-clip bg-slate-50 text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Top Banner Navigation */}
      <div className="flex h-[20svh] w-full max-w-full flex-col justify-end rounded-b-2xl rounded-t-none bg-[#07090f] py-4">
        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <nav
            className="mx-auto flex min-w-0 flex-wrap items-center gap-2 text-xs leading-6 text-white sm:px-8"
            aria-label="مسیر صفحه"
          >
            <Link href="/" className="transition hover:text-brand-600">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="transition hover:text-brand-600">
              محصولات
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/categories/${product.categorySlug}`}
              className="transition hover:text-brand-600"
            >
              {category?.name ?? "دسته‌بندی"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="min-w-0 truncate text-white/40">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Overview Section */}
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
                  <li
                    key={benefit}
                    className="flex min-w-0 items-start gap-2.5 text-sm leading-7 text-slate-700"
                  >
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <p className="text-xs font-bold leading-6 text-slate-500">
                  برای استعلام قیمت و انتخاب پیکربندی، مشخصات خط تولیدتان را با
                  تیم فنی مطرح کنید.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button
                    href={
                      product.catalogPdf ||
                      "/catalogs/avin-2x6-fiber-laser-catalog.pdf"
                    }
                    download={
                      product.catalogPdf
                        ? product.catalogPdf.split("/").pop()
                        : "avin-catalog.pdf"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full cursor-pointer"
                  >
                    <svg
                      className="size-4 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    دانلود کاتالوگ
                  </Button>
                  <Button
                    className="w-full"
                    variant="secondary"
                    href={`tel:${siteConfig.contact.phones[0]}`}
                  >
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
                <dt className="text-xs font-bold text-slate-400">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-black leading-6 text-ink-950">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Direct Answer AEO Block */}
      {product.directAnswer && (
        <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
          <DirectAnswerBlock
            question={`دستگاه ${product.name} چیست و چه قابلیتی دارد؟`}
            answer={product.directAnswer}
          />
        </div>
      )}

      {/* Purpose & Overview */}
      <Section compact id="product-purpose" title="کاربرد اصلی و عملکرد دستگاه">
        <div className="max-w-5xl space-y-5 text-sm leading-8 text-slate-700 sm:text-base sm:leading-9">
          <p>{product.overview}</p>
          <p>{product.purpose}</p>
        </div>
      </Section>

      {/* Technical Specifications Table (GEO Focus) */}
      {product.specs && product.specs.length > 0 && (
        <Section
          compact
          id="product-specs"
          title="مشخصات فنی و استانداردهای مهندسی"
          description="جدول پارامترهای فنی، ابعاد و قطعات دستگاه متناسب با استانداردهای ساخت."
        >
          <ProductSpecsTable specs={product.specs} productName={product.name} />
        </Section>
      )}

      {/* Video Demonstration */}
      <Section compact id="product-video" title="نمونه دستگاه تولید شده">
        <div className="mx-auto w-full max-w-3xl">
          <ProductVideoFrame product={product} />
        </div>
      </Section>

      {/* Reported Claims */}
      {product.reportedClaims.length > 0 && (
        <Section
          compact
          id="product-reported-claims"
          title="ضخامت برش ورق آهن"
          description="ضخامت قابل برش به کیفیت ورق، نوع گاز، تنظیمات دستگاه و سطح کیفیت مورد انتظار وابسته است."
        >
          <div className="flex flex-wrap gap-8">
            {product.reportedClaims.map((claim) => (
              <article
                key={claim}
                className="flex min-w-0 basis-full items-start gap-3 sm:flex-1"
              >
                <SpeedometerMiddle
                  size={26}
                  weight="BoldDuotone"
                  className="mt-1 shrink-0 text-amber-600"
                />
                <p className="text-sm font-bold leading-8 text-amber-950">
                  {claim}
                </p>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Ordering & Commercial Terms */}
      <Section
        compact
        id="product-commercial"
        title="شرایط سفارش و تحویل"
        description="قیمت بر اساس ابعاد دستگاه، فناوری، برند قطعات و پیکربندی نهایی محاسبه می‌شود. امکان بررسی لیزینگ و اقساط بلندمدت نیز وجود دارد."
      >
        <CommercialSummary product={product} />
      </Section>

      {/* Processable Materials */}
      <Section compact id="product-materials" title="متریال قابل پردازش">
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

      {/* Related Machines */}
      {relatedProducts.length > 0 && (
        <Section
          compact
          id="related-products"
          className="bg-white"
          title="مدل‌های دیگر"
          description="گزینه‌های دیگر CNC چوب و برش لیزر فایبر آوین."
        >
          <ProductCarousel
            products={relatedProducts}
            ariaLabel="محصولات مشابه"
          />
        </Section>
      )}
    </main>
  );
}