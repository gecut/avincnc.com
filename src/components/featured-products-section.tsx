import { ResponsiveProductsList } from "@/components/responsive-products-list";
import { SectionHeader } from "@/components/section-header";
import type { ProductData } from "@/config/site-config";

type FeaturedProductsSectionProps = {
  products: ProductData[];
};

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section data-reveal className="flex flex-col justify-center items-center overflow-x-clip bg-white py-16 sm:py-20 lg:min-h-screen lg:py-24 xl:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="محصولات آوین"
          title="انتخاب دستگاه برای نیازهای صنعتی"
          description="محصولات را بررسی کنید و برای انتخاب ابعاد، توان و پیکربندی مناسب با تیم فنی آوین در تماس باشید."
        />
        <div className="mt-8 mx-auto w-full flex items-center justify-center sm:mt-10 lg:mt-12">
          <ResponsiveProductsList
            products={products}
            ariaLabel="محصولات منتخب آوین"
            compactMobile
          />
        </div>
      </div>
    </section>
  );
}
