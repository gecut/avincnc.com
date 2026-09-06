import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug, type ProductData } from "@/config/site-config";

type ProductCardProps = {
  product: ProductData;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const category = getCategoryBySlug(product.categorySlug);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group mx-auto relative block aspect-4/5 w-full min-w-0 overflow-hidden rounded-3xl bg-ink-950 text-white transition duration-500 hover:-translate-y-1 hover:shadow-[0_1.5rem_4rem_rgba(7,11,18,.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 sm:aspect-3/4 sm:rounded-4xl xl:aspect-4/5"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(50vw - 2rem), 33vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.045]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-black/40 backdrop-blur-lg mask-[linear-gradient(to_bottom,transparent_0%,black_38%)]" />

      <p className="absolute right-4 top-4 rounded-xl border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-bold text-white/80 backdrop-blur-md sm:right-5 sm:top-5">
        {category?.name ?? image.label}
      </p>

      <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-4 min-[360px]:p-5 sm:p-6 xl:p-7">
        <h3 className="text-lg font-black leading-7 text-white min-[360px]:text-xl min-[360px]:leading-8 sm:text-2xl sm:leading-9">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/80 min-[360px]:text-sm min-[360px]:leading-7">{product.shortDescription}</p>
        <span className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/[.035] px-3.5 py-3 text-xs font-bold text-brand-300 backdrop-blur-[2px] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[.14] group-hover:text-cyan-100 group-hover:shadow-[0_10px_30px_rgba(0,0,0,.18)] group-hover:backdrop-blur-xl sm:mt-5 sm:px-4">
          مشاهده جزئیات
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-lg bg-white/5 transition-all group-hover:-translate-x-1 group-hover:bg-white/10">←</span>
        </span>
      </div>
    </Link>
  );
}
