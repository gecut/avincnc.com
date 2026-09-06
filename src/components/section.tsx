import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title?: string;
  description?: string;
  className?: string;
  containerClassName?: string;
  compact?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  title,
  description,
  className = "",
  containerClassName = "max-w-7xl",
  compact = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${compact ? "border-t border-slate-200 py-10 sm:py-12" : "py-16 sm:py-20"} ${className}`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {(title || description) && (
          <div className={`${compact ? "mb-7" : "mb-10"} max-w-3xl`}>
            {title && (
              <h2 className="text-2xl font-black leading-snug tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
