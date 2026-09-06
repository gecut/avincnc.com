"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeader } from "@/components/section-header";
import { blackOpsOne } from "@/config/fonts";
import type { ProcessStep } from "@/config/site-config";
import { toEnglishDigits } from "@/lib/persian-numbers";

type ProcessSectionProps = {
  steps: ProcessStep[];
};

const VIEWBOX_HEIGHT = 1500;

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  const timelineRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const syncProgress = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        const bounds = timeline.getBoundingClientRect();
        const activationY = window.innerHeight * 0.68;
        setProgress(clamp((activationY - bounds.top) / bounds.height));
      });
    };

    syncProgress();
    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, [steps.length]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="مسیر همکاری"
          title="از یک نیاز تا ثبت سفارش دستگاه"
          description="فرآیند همکاری آوین از تماس اولیه آغاز می‌شود و پس از بررسی نیاز، مشاوره فنی و مالی به ثبت سفارش می‌رسد."
        />

        <ol
          ref={timelineRef}
          className="relative mx-auto mt-14 max-w-6xl sm:mt-20"
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 1000 ${VIEWBOX_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <path
              d={`M 500 0 V ${VIEWBOX_HEIGHT}`}
              fill="none"
              stroke="rgb(203 213 225)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={`M 500 0 V ${VIEWBOX_HEIGHT}`}
              fill="none"
              pathLength="1"
              stroke="rgb(0 83 159)"
              strokeDasharray="1"
              strokeDashoffset={1 - progress}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />

          </svg>

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const rowStart = index / steps.length;
            const branchStart = rowStart + 0.3 / steps.length;
            const branchEnd = rowStart + 0.7 / steps.length;
            const branchProgress = clamp(
              (progress - branchStart) / (branchEnd - branchStart),
            );
            const startDiagonalProgress = clamp(branchProgress / 0.15);
            const horizontalProgress = clamp((branchProgress - 0.15) / 0.7);
            const endDiagonalProgress = clamp((branchProgress - 0.85) / 0.15);
            const activationPoint = branchEnd;
            const isActive = progress >= activationPoint;

            return (
              <li
                key={step.number}
                dir="ltr"
                className={`relative flex min-h-56 items-center sm:min-h-64 lg:min-h-72 ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 z-[1] h-14 w-2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 sm:h-16 lg:h-[72px]"
                />
                <div
                  aria-hidden="true"
                  className={`absolute top-1/2 z-[2] h-10 -translate-y-1/2 sm:h-12 lg:h-14 ${
                    isLeft
                      ? "left-[calc(44%+8px)] right-1/2 sm:left-[calc(39%+8px)] lg:left-[calc(36%+8px)]"
                      : "right-[calc(44%+8px)] left-1/2 sm:right-[calc(39%+8px)] lg:right-[calc(36%+8px)]"
                  }`}
                >
                  {["top-0", "bottom-0"].map((position) => (
                    <span key={position} className="contents">
                      <span
                        className={`absolute left-3 right-3 h-[2px] bg-slate-300 ${position}`}
                      />
                      <span
                        className={`absolute h-[3px] bg-brand-500 ${position} ${
                          isLeft
                            ? "left-3 right-3 origin-right"
                            : "left-3 right-3 origin-left"
                        }`}
                        style={{ transform: `scaleX(${horizontalProgress})` }}
                      />
                    </span>
                  ))}

                  {["top", "bottom"].map((edge) => {
                    const rotation = isLeft
                      ? edge === "top" ? -30 : 30
                      : edge === "top" ? 30 : -30;
                    const position = isLeft
                      ? edge === "top"
                        ? "left-[calc(100%-14px)] top-0"
                        : "left-[calc(100%-14px)] bottom-0"
                      : edge === "top"
                        ? "left-0 top-[-8px]"
                        : "left-0 bottom-[-8px]";

                    return (
                      <span key={edge} className="contents">
                        <span
                          className={`absolute h-[2px] w-[16px] origin-left bg-slate-300 ${position}`}
                          style={{ transform: `rotate(${rotation}deg)` }}
                        />
                        <span
                          className={`absolute h-[3px] w-[16px] origin-left bg-brand-500 ${position}`}
                          style={{
                            transform: `rotate(${rotation}deg) scaleX(${startDiagonalProgress})`,
                          }}
                        />
                      </span>
                    );
                  })}

                  {["top", "bottom"].map((edge) => {
                    const rotation = isLeft
                      ? edge === "top" ? 150 : -150
                      : edge === "top" ? 30 : -30;
                    const position = isLeft
                      ? edge === "top"
                        ? "left-3.5 top-0"
                        : "left-3.5 bottom-0"
                      : edge === "top"
                        ? "left-[calc(100%-14px)] top-0"
                        : "left-[calc(100%-14px)] bottom-0";

                    return (
                      <span key={`end-${edge}`} className="contents">
                        <span
                          className={`absolute h-[2px] w-[16px] origin-left bg-slate-300 ${position}`}
                          style={{ transform: `rotate(${rotation}deg)` }}
                        />
                        <span
                          className={`absolute h-[3px] w-[16px] origin-left bg-brand-500 ${position}`}
                          style={{
                            transform: `rotate(${rotation}deg) scaleX(${endDiagonalProgress})`,
                          }}
                        />
                      </span>
                    );
                  })}
                </div>

                <article
                  dir="rtl"
                  className={`relative z-10 w-[44%] rounded-lg border border-black/15 bg-white/90 p-3 text-right backdrop-blur-xl transition-[transform,opacity,box-shadow,background-color] duration-700 ease-[cubic-bezier(.16,1,.3,1)] sm:w-[39%] sm:p-5 lg:w-[36%] lg:p-6 ${
                    isActive
                      ? "translate-y-0 scale-100 opacity-100 shadow-[0_24px_60px_-36px_rgba(15,23,42,.38)]"
                      : "translate-y-3 scale-[.97] opacity-25 shadow-none"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[9px] font-black tracking-[0.08em] text-brand-600 sm:text-[10px]">
                        مرحله {toEnglishDigits(step.number)}
                      </p>
                      <h3 className="mt-1 text-sm font-black text-ink-950 sm:text-lg lg:text-xl">
                        {step.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`${blackOpsOne.className} grid size-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-[10px] text-brand-600 transition-colors duration-500 sm:size-11 sm:text-sm`}
                    >
                      {toEnglishDigits(step.number)}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-4 text-[10px] leading-5 text-slate-600 sm:text-xs sm:leading-6 lg:line-clamp-none lg:text-sm lg:leading-7">
                    {step.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
