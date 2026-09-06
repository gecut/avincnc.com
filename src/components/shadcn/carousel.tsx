"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { cn } from "@/lib/utils";

export type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type Orientation = "horizontal" | "vertical";

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: Orientation;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("Carousel components must be used inside <Carousel />");
  return context;
}

export function Carousel({
  orientation = "horizontal",
  opts,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { orientation?: Orientation; opts?: CarouselOptions }) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const updateControls = React.useCallback((carouselApi: NonNullable<CarouselApi>) => {
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    api.on("select", updateControls);
    api.on("reInit", updateControls);
    const frame = window.requestAnimationFrame(() => updateControls(api));
    return () => {
      window.cancelAnimationFrame(frame);
      api.off("select", updateControls);
      api.off("reInit", updateControls);
    };
  }, [api, updateControls]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        orientation,
        scrollPrev: () => api?.scrollPrev(),
        scrollNext: () => api?.scrollNext(),
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({
  className,
  viewportClassName,
  ...props
}: React.ComponentProps<"div"> & { viewportClassName?: string }) {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className={cn("overflow-hidden", viewportClassName)}>
      <div
        className={cn(
          "flex touch-pan-y",
          orientation === "vertical" && " h-full flex-col touch-pan-x",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "vertical" ? "pt-3" : "pl-3",
        className,
      )}
      {...props}
    />
  );
}

function CarouselButton({ direction, className }: { direction: "previous" | "next"; className?: string }) {
  const { orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const previous = direction === "previous";
  const disabled = previous ? !canScrollPrev : !canScrollNext;
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={previous ? scrollPrev : scrollNext}
      aria-label={previous ? "اسلاید قبلی" : "اسلاید بعدی"}
      className={cn(
        "grid size-10 place-items-center rounded-xl border border-slate-200 bg-transparent text-lg text-ink-950 transition hover:border-brand-500 hover:bg-transparent hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-30",
        orientation === "vertical" ? "rotate-90" : "",
        className,
      )}
    >
    </button>
  );
}

export function CarouselPrevious({ className }: { className?: string }) {
  return <CarouselButton direction="previous" className={className} />;
}

export function CarouselNext({ className }: { className?: string }) {
  return <CarouselButton direction="next" className={className} />;
}
