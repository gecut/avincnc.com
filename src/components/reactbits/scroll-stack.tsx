import type { CSSProperties, ReactNode } from "react";

export function ScrollStack({ children }: { children: ReactNode }) {
  return <div className="scroll-stack relative isolate mx-auto mt-10 max-w-2xl space-y-[10vh] pb-[18vh] sm:mt-14 sm:space-y-[8vh]">{children}</div>;
}

export function ScrollStackItem({ children, index }: { children: ReactNode; index: number }) {
  return (
    <article
      className="scroll-stack-item sticky mx-auto flex min-h-[28vh] w-full max-w-xl flex-col justify-center rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_16px_40px_rgba(7,11,18,.08)] transition-[transform,box-shadow] duration-500 sm:min-h-[32vh] sm:p-6"
      style={{ "--stack-index": index, zIndex: 20 + index } as CSSProperties}
    >
      {children}
    </article>
  );
}
