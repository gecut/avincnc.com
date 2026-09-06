"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/section-header";
import type { SiteConfig } from "@/config/site-config";

type MachineInterfaceSectionProps = {
  interfaceShowcase: SiteConfig["interfaceShowcase"];
};

export function MachineInterfaceSection({
  interfaceShowcase,
}: MachineInterfaceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const machiningMaskRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      const mobile = window.innerWidth < 640;
      if (progressCircleRef.current)
        progressCircleRef.current.style.strokeDashoffset = "0";
      if (progressLabelRef.current)
        progressLabelRef.current.textContent = "100%";
      if (laserRef.current) {
        laserRef.current.style.left = "70%";
        laserRef.current.style.top = "57.6%";
        laserRef.current.style.opacity = "1";
      }
      if (headRef.current) {
        headRef.current.style.transform = mobile
          ? "translate3d(22%, -23.4%, 0) scale(.84)"
          : "translate3d(22%, -32.4%, 0)";
      }
      if (machiningMaskRef.current)
        machiningMaskRef.current.setAttribute("width", "350");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const rawProgress = Math.min(1, Math.max(0, -rect.top / distance));
      const progress = rawProgress * rawProgress * (3 - 2 * rawProgress);
      const mobile = window.innerWidth < 640;

      if (progressCircleRef.current) {
        progressCircleRef.current.style.strokeDashoffset = String(
          100 - progress * 100,
        );
      }
      if (progressLabelRef.current) {
        progressLabelRef.current.textContent = `${Math.round(progress * 100).toLocaleString("en-US")}%`;
      }
      const x = 35 + progress * 35;
      const y = 65.78 - progress * 8.18;

      if (laserRef.current) {
        laserRef.current.style.left = `${x}%`;
        laserRef.current.style.top = `${y}%`;
        laserRef.current.style.opacity = String(0.6 + progress * 0.4);
      }
      if (headRef.current) {
        headRef.current.style.transform = mobile
          ? `translate3d(${x - 48}%, ${y - 81}%, 0) scale(.84)`
          : `translate3d(${x - 48}%, ${y - 90}%, 0)`;
      }
      if (machiningMaskRef.current) {
        machiningMaskRef.current.setAttribute("width", String(350 * progress));
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reveal
      className="relative z-0 h-[190svh] min-h-svh overflow-clip bg-ink-950 text-white sm:h-[190svh] lg:h-[180svh]"
    >
      <div className="sticky top-0 z-0 flex min-h-svh flex-col justify-center overflow-hidden py-4 sm:py-8 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="mx-auto w-full max-w-2xl lg:col-span-5 lg:mx-0">
              <SectionHeader
                inverse
                mobileCenter
                eyebrow={interfaceShowcase.eyebrow}
                title={interfaceShowcase.title}
                description={interfaceShowcase.description}
              />
              <div
                className="mx-auto mt-4 flex max-w-sm items-center gap-3 rounded-2xl bg-white/[.035] p-2.5 sm:mt-7 sm:gap-5 sm:p-4 lg:mx-0"
                dir="ltr"
              >
                <div className="relative grid size-14 shrink-0 place-items-center sm:size-20">
                  <svg
                    viewBox="0 0 40 40"
                    className="size-full -rotate-90"
                    aria-hidden="true"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      pathLength="100"
                      fill="none"
                      stroke="rgba(255,255,255,.08)"
                      strokeWidth="2.5"
                    />

                    <circle
                      ref={progressCircleRef}
                      cx="20"
                      cy="20"
                      r="16"
                      pathLength="100"
                      fill="none"
                      stroke="url(#progress-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      className="will-change-[stroke-dashoffset]"
                    />

                    <defs>
                      <linearGradient id="progress-gradient" x1="0" x2="1">
                        <stop offset="0" stopColor="#2f83cc" />
                        <stop offset="1" stopColor="#67e8f9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <span
                    ref={progressLabelRef}
                    className="absolute font-number text-xs text-white"
                  >
                    0%
                  </span>
                </div>

                <div className="flex min-h-14 flex-1 flex-col justify-between sm:min-h-20">
                  <p
                    className="text-right text-sm font-bold text-white"
                    dir="rtl"
                  >
                    دقت ماشینکاری
                  </p>

                  <p
                    className="text-right text-xs leading-6 text-white/40"
                    dir="rtl"
                  >
                    از 0.1 میلی متر تا 0.05 میلی متر بر حسب نیاز شما{" "}
                  </p>
                </div>
              </div>
            </div>

            <figure className="mx-auto mt-14 w-full max-w-2xl sm:mt-40 lg:col-span-7 lg:mt-0">
              <div className="relative isolate aspect-[16/9] rounded-[1.5rem] sm:rounded-[2rem]">
                <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-black">
                  <Image
                    src={interfaceShowcase.image}
                    alt={interfaceShowcase.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 42rem"
                    className="object-cover"
                  />
                  <svg
                    viewBox="0 0 1000 562.5"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-20 size-full"
                  >
                    <defs>
                      <mask
                        id="machining-groove-mask"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="1000"
                        height="562.5"
                      >
                        <rect width="1000" height="562.5" fill="black" />
                        <rect
                          ref={machiningMaskRef}
                          x="350"
                          y="320"
                          width="0"
                          height="110"
                          fill="white"
                          className="will-change-[width]"
                        />
                      </mask>
                    </defs>
                    <image
                      href={interfaceShowcase.completedImage}
                      width="1000"
                      height="562.5"
                      preserveAspectRatio="none"
                      mask="url(#machining-groove-mask)"
                    />
                  </svg>
                  <div
                    aria-hidden="true"
                    className="machine-interface-edge-fade pointer-events-none absolute -inset-px z-40 rounded-[inherit]"
                  />
                </div>
                <div
                  ref={headRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[60] overflow-visible will-change-transform [filter:drop-shadow(0_1rem_1.5rem_rgba(0,0,0,.42))]"
                  style={{ transform: "translate3d(-13%, -15%, 0) scale(.84)" }}
                >
                  <Image
                    src={interfaceShowcase.headImage}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 92vw, 42rem"
                    className="object-cover"
                  />
                </div>
                <div
                  ref={laserRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-[70] -translate-x-1/2 -translate-y-1/2 will-change-[left,top,opacity]"
                  style={{ left: "35%", top: "65.78%", opacity: 0.6 }}
                >
                  <span className="absolute bottom-1 left-1/2 h-9 w-px -translate-x-1/2 bg-gradient-to-t from-cyan-100 via-cyan-300/80 to-transparent shadow-[0_0_10px_rgba(103,232,249,.95)] sm:h-14 lg:h-20" />
                  <span className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-cyan-300/20 blur-md sm:size-7" />
                  <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 animate-[ping_1.2s_ease-out_infinite] rounded-full border border-cyan-100/50 sm:size-4" />
                  <span className="block size-2 rounded-full border border-white/90 bg-cyan-100 shadow-[0_0_8px_2px_rgba(103,232,249,.95),0_0_22px_6px_rgba(47,131,204,.75)] sm:size-2.5" />
                </div>
              </div>
              <figcaption className="mt-2 text-[11px] text-white/40 sm:mt-3 sm:text-xs">
                {interfaceShowcase.imageLabel}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
