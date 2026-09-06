"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { SectionHeader } from "@/components/section-header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/shadcn/carousel";
import type { CategoryData } from "@/config/site-config";

type CategoriesSectionProps = {
  categories: CategoryData[];
};

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section
      data-reveal
      id="products"
      className="bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="دسته‌بندی محصولات"
          title="دسته بندی محصولات"
          description=""
        />

        {/* Mobile / Tablet Compact Carousel */}
        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            loop: categories.length > 1,
          }}
          aria-label="دسته‌بندی محصولات آوین"
          className="mt-8 lg:hidden"
        >
          <CarouselContent className="items-stretch gap-3 px-2 pb-4">
            {categories.map((category, index) => (
              <CarouselItem
                key={category.slug}
                className="flex basis-[85%] sm:basis-[65%] md:basis-[50%]"
              >
                <Link
                  href={`/products?category=${category.slug}`}
                  aria-label={`مشاهده ${category.name}`}
                  className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-900/20 transition-all duration-300 active:scale-[0.99]"
                >
                  <figure className="relative w-full shrink-0 overflow-hidden bg-ink-950">
                    <div className="relative aspect-16/9 w-full">
                      <Image
                        src={category.image}
                        alt={category.imageAlt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 639px) 85vw, (max-width: 1023px) 60vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                      {category.eyebrow && (
                        <div className="absolute top-2.5 right-2.5 rounded-full bg-brand-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                          {category.eyebrow}
                        </div>
                      )}

                      {category.badge && (
                        <figcaption
                          className="absolute bottom-2.5 right-2.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-white backdrop-blur-md"
                          dir="ltr"
                        >
                          {category.badge}
                        </figcaption>
                      )}
                    </div>
                  </figure>

                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <h3 className="text-base font-black leading-snug text-ink-950 transition-colors group-hover:text-brand-600 sm:text-lg">
                        {category.name}
                      </h3>

                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-600">
                        {category.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {category.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center gap-1 rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
                          >
                            <span className="flex size-3.5 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                              <Icon name="check" className="size-2" />
                            </span>
                            <span>{highlight}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-brand-600">
                      <span className="group-hover:text-brand-700">
                        مشاهده مدل‌ها و مشخصات
                      </span>
                      <span className="flex size-6 items-center justify-center rounded-md bg-brand-50 text-brand-600 transition-transform group-hover:-translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
                        <Icon name="arrow" className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Desktop */}
        <div className="mt-20 hidden space-y-24 lg:block">
          {categories.map((category, index) => {
            const imageOrder = index % 2 === 0 ? "lg:order-1" : "lg:order-2";

            const contentOrder = index % 2 === 0 ? "lg:order-2" : "lg:order-1";

            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                data-reveal-item
                aria-label={`مشاهده ${category.name}`}
                className="group grid min-w-0 items-center gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 lg:grid-cols-2 lg:gap-14"
              >
                <figure
                  className={`relative min-w-0 overflow-hidden rounded-2xl bg-ink-950 ${imageOrder}`}
                >
                  <div className="relative aspect-16/10">
                    <Image
                      src={category.image}
                      alt={category.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent" />

                    {category.badge && (
                      <figcaption
                        className="absolute bottom-5 right-5 text-xs font-bold tracking-[0.16em] text-white/75"
                        dir="ltr"
                      >
                        {category.badge}
                      </figcaption>
                    )}
                  </div>
                </figure>

                <div className={`min-w-0 ${contentOrder}`}>
                  <p className="text-xs font-black text-brand-600">
                    {category.eyebrow}
                  </p>

                  <h3 className="mt-4 text-3xl font-black leading-tight text-ink-950 sm:text-4xl">
                    {category.name}
                  </h3>

                  <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
                    {category.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {category.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm leading-7 text-slate-700"
                      >
                        <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                          <Icon name="check" className="size-3.5" />
                        </span>

                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-ink-950 px-6 text-sm font-bold text-white transition hover:bg-brand-700 hover:shadow-lg">
                    مشاهده محصولات این دسته
                    <Icon name="arrow" className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* All Products */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 px-6 text-sm font-bold text-brand-700 transition hover:border-brand-300 hover:bg-brand-100"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      </div>
    </section>
  );
}
