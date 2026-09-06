import { ProductCard } from "@/components/product-card";
import type { ProductData } from "@/config/site-config";

type ResponsiveProductsListProps = {
  products: ProductData[];
  ariaLabel: string;
  compactMobile?: boolean;
};

export function ResponsiveProductsList({
  products,
  ariaLabel,
  compactMobile = false,
}: ResponsiveProductsListProps) {
  return (
    <div
      aria-label={ariaLabel}
      className="-mx-4 flex flex-col items-center justify-center w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3 xl:gap-8"
    >
      {products.map((product) => (
        <div
          key={`${product.categorySlug}/${product.slug}`}
          className={`shrink-0 snap-start first:scroll-mr-4 md:w-auto md:max-w-none md:shrink ${
            compactMobile
              ? "w-full! sm:w-[46%] sm:max-w-[18rem]"
              : "w-[84%] max-w-[22rem]"
          }`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
