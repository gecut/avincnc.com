"use client";

import { useEffect, useRef } from "react";

type LogoLoopProps = {
  items: string[];
  speed?: number;
  className?: string;
};

/** React Bits-inspired Logo Loop: seamless marquee with pause-on-hover. */
export function LogoLoop({ items, speed = 26, className = "" }: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.setProperty("--logo-loop-duration", `${Math.max(18, items.length * speed / 2)}s`);
  }, [items.length, speed]);

  const sequence = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-label="توانمندی‌های آوین" role="region">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
      <div ref={trackRef} className="logo-loop-track flex w-max items-center gap-3 py-3 hover:[animation-play-state:paused]">
        {sequence.map((item, index) => (
          <span key={`${item}-${index}`} className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-black tracking-[0.12em] text-ink-950 sm:px-7 sm:text-sm" dir="ltr">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
