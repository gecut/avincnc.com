"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResponsiveProductsList } from "@/components/responsive-products-list";
import type { CategoryData, ProductData } from "@/config/site-config";

type ProductsCatalogProps = {
  categories: CategoryData[];
  products: ProductData[];
};

export function ProductsCatalog({ categories, products }: ProductsCatalogProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");

  const activeCategory = categories.some((category) => category.slug === categoryQuery)
    ? categoryQuery!
    : "all";

  function updateCategoryQuery(value: string) {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("sort");

    if (value === "all") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", value);
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const visibleProducts = useMemo(() => {
    const filtered = activeCategory === "all"
      ? products
      : products.filter((product) => product.categorySlug === activeCategory);

    return filtered;
  }, [activeCategory, products]);

  const productCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((counts, product) => {
      counts[product.categorySlug] = (counts[product.categorySlug] ?? 0) + 1;
      return counts;
    }, {});
  }, [products]);

  return (
    <section id="products-grid" className="scroll-mt-20 bg-slate-50 py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-2 mt-4 flex w-[calc(100%+2rem)] touch-pan-x snap-x snap-mandatory flex-nowrap justify-start gap-2.5 overflow-x-auto scroll-smooth px-4 pb-2 [overscroll-behavior-inline:contain] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:w-full sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
          aria-label="فیلتر دسته‌بندی محصولات"
        >
          <button
            type="button"
            onClick={() => updateCategoryQuery("all")}
            aria-pressed={activeCategory === "all"}
            className={`min-h-9 sm:min-h-10 shrink-0 snap-start whitespace-nowrap rounded-xl border px-4 sm:px-5 text-xs sm:text-sm font-bold transition ${
              activeCategory === "all"
                ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            <span>همه محصولات</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => updateCategoryQuery(category.slug)}
              aria-pressed={activeCategory === category.slug}
              className={`min-h-9 sm:min-h-10 shrink-0 snap-start whitespace-nowrap rounded-xl border px-4 sm:px-5 text-xs sm:text-sm font-bold transition ${
                activeCategory === category.slug
                  ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/20"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 w-full h-full flex flex-col items-center justify-center">
          <ResponsiveProductsList
            products={visibleProducts}
            ariaLabel="محصولات دسته‌بندی انتخاب‌شده"
          />
        </div>
      </div>
    </section>
  );
}
