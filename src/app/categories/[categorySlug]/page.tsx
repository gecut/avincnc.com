import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { DirectAnswerBlock } from "@/components/direct-answer-block";
import {
  getCategoryBySlug,
  getProductsByCategory,
  siteConfig,
} from "@/config/site-config";
import {
  getBreadcrumbSchema,
  getCollectionPageSchema,
} from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return siteConfig.categories.map((category) => ({
    categorySlug: category.slug,
  }));
}

type CategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: "دسته‌بندی یافت نشد | AVIN CNC",
    };
  }

  const title = `${category.name} | تولید و سفارش ماشین‌آلات AVIN CNC`;
  const description = category.directAnswer || category.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/categories/${category.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://avincnc.com/categories/${category.slug}/`,
      siteName: siteConfig.siteName,
      locale: "fa_IR",
      type: "website",
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [category.image],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);

  const breadcrumbs = [
    { name: "خانه", url: "/" },
    { name: "محصولات", url: "/products/" },
    { name: category.name, url: `/categories/${category.slug}/` },
  ];

  const collectionSchema = getCollectionPageSchema(category, categoryProducts);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <main dir="rtl" className="overflow-x-clip bg-white text-ink-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Header */}
      <section className="relative isolate overflow-hidden bg-ink-950 pb-20 pt-24 text-white sm:pb-28 sm:pt-28">
        <div
          aria-hidden="true"
          className="absolute -right-32 top-12 size-[28rem] rounded-full bg-brand-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-24 size-[30rem] rounded-full bg-cyan-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center justify-center gap-2 text-xs text-white/60"
            aria-label="مسیر صفحه"
          >
            <Link href="/" className="transition hover:text-white">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="transition hover:text-white">
              محصولات
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/90">{category.name}</span>
          </nav>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-3.5 py-1.5 text-xs font-black text-brand-300">
              <Icon name="factory" className="size-3.5" />
              خانواده ماشین‌آلات صنعتی
            </span>
            <h1 className="mt-4 text-balance text-3xl font-black leading-[1.3] text-white sm:text-5xl">
              {category.name}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Products */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Direct Answer AEO Block */}
        {category.directAnswer && (
          <div className="mb-12">
            <DirectAnswerBlock
              question={`دستگاه‌های ${category.name} آوین CNC چیستند و چه کاربردی دارند؟`}
              answer={category.directAnswer}
            />
          </div>
        )}

        {/* Highlights & Selection Criteria */}
        <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-sm font-black text-ink-950">ویژگی‌های محوری این دسته</h3>
            <ul className="mt-4 space-y-2.5 text-xs leading-6 text-slate-600 sm:text-sm">
              {category.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-sm font-black text-ink-950">معیارهای انتخاب دستگاه</h3>
            <ul className="mt-4 space-y-2.5 text-xs leading-6 text-slate-600 sm:text-sm">
              {category.selectionCriteria.map((criterion) => (
                <li key={criterion} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500 shrink-0" />
                  <span>{criterion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-black text-ink-950">متریال‌های قابل پردازش</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.materials.map((material) => (
                <span
                  key={material}
                  className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-700 border border-slate-200"
                >
                  {material}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              طراحی شاسی و توان قطعات بر اساس جنس و ضخامت متریال موردنظر شما سفارشی‌سازی می‌شود.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8 flex items-end justify-between border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-xl font-black text-ink-950 sm:text-2xl">
              مدل‌های دستگاه {category.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              جهت مشاهده جزئیات فنی و دانلود کاتالوگ هر دستگاه را انتخاب کنید.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {categoryProducts.length} دستگاه قابل سفارش
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Commercial & Contact CTA */}
        <div className="mt-16 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-slate-50 p-8 text-center sm:p-12">
          <h2 className="text-xl font-black text-ink-950 sm:text-2xl">
            نیاز به مشاوره فنی یا ساخت ابعاد سفارشی دارید؟
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-7 text-slate-600 sm:text-sm sm:leading-8">
            تیم مهندسی آوین ماشین پاژ بر اساس ابعاد سالن، نوع متریال و ظرفیت تولید کارگاه شما، دقیق‌ترین پیکربندی و برآورد مالی را ارائه می‌دهد.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              مشاوره در واتساپ
            </Button>
            <Button
              variant="secondary"
              href={`tel:${siteConfig.contact.phones[0]}`}
            >
              تماس با واحد فروش
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
