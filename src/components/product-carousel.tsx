"use client";

import { ProductCard } from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";
import type { ProductData } from "@/config/site-config";

type ProductCarouselProps = {
  products: ProductData[];
  ariaLabel?: string;
};

export function ProductCarousel({
  products,
  ariaLabel = "محصولات آوین CNC",
}: ProductCarouselProps) {
  const carouselKey = products
    .map((product) => `${product.categorySlug}/${product.slug}`)
    .join("|");

  return (
    <Carousel
      key={carouselKey}
      opts={{
        align: "start",
        direction: "rtl",
        containScroll: "trimSnaps",
        slidesToScroll: 1,
        loop: products.length > 1,
      }}
      className="mx-auto w-full max-w-6xl pb-4 sm:pb-6"
      aria-label={ariaLabel}
    >
      <div className="mb-5 mr-auto flex w-fit gap-3">
        <CarouselPrevious />
        <CarouselNext />
      </div>

      <CarouselContent
        viewportClassName="overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-hidden"
        className="snap-x snap-mandatory sm:-ml-5 sm:pb"
      >
        {products.map((product) => (
          <CarouselItem
            key={`${product.categorySlug}/${product.slug}`}
            className="basis-[82%] snap-start pl-4 sm:basis-1/2 sm: lg:basis-1/3"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

    </Carousel>
  );
}
