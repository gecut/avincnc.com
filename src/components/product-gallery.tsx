"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductData } from "@/config/site-config";
import { toEnglishDigits } from "@/lib/persian-numbers";

type ProductGalleryProps = {
  product: ProductData;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const singleImageViews = [
    { id: "full", label: "نمای کامل", scale: 1, position: "center" },
    { id: "center", label: "نمای نزدیک", scale: 1.18, position: "center" },
    { id: "right", label: "جزئیات سمت راست", scale: 1.32, position: "75% center" },
    { id: "left", label: "جزئیات سمت چپ", scale: 1.32, position: "25% center" },
  ];
  const galleryItems = product.images.length === 1
    ? singleImageViews.map((view) => ({ ...product.images[0], ...view }))
    : product.images.map((image, index) => ({
        ...image,
        id: `image-${index}`,
        label: `تصویر ${toEnglishDigits(index + 1)}`,
        scale: 1,
        position: "center",
      }));
  const activeImage = galleryItems[activeIndex] ?? galleryItems[0];

  return (
    <div className="min-w-0">
      <figure className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1.5rem_4rem_rgba(7,11,18,.1)] sm:rounded-[2rem]">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 sm:aspect-[16/11] lg:aspect-[4/3]">
          <Image
            key={activeImage.id}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 1023px) calc(100vw - 2rem), 52vw"
            className="object-cover transition-transform duration-500"
            style={{
              objectPosition: activeImage.position,
              transform: `scale(${activeImage.scale})`,
            }}
          />
        </div>
      </figure>

      <div
        className="mt-3 flex snap-x gap-3 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`گالری تصاویر ${product.name}`}
      >
        {galleryItems.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`${image.label} از ${product.name}`}
            aria-pressed={activeIndex === index}
            className={`relative aspect-[4/3] w-24 shrink-0 snap-start overflow-hidden rounded-xl border-2 bg-slate-100 transition sm:w-28 ${
              activeIndex === index
                ? "border-brand-500 shadow-md shadow-brand-500/15"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="112px"
              className="object-cover"
              style={{
                objectPosition: image.position,
                transform: `scale(${image.scale})`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
