import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "secondary" | "dark";

const buttonVariants: Record<Variant, string> = {
  default:
    "border border-white/15 bg-gradient-to-l from-brand-600 via-brand-500 to-brand-400 text-white shadow-[0_0.75rem_2rem_-0.75rem_rgba(0,83,159,0.85)] hover:-translate-y-0.5 hover:shadow-[0_1rem_2.5rem_-0.75rem_rgba(47,131,204,0.95)]",
  secondary:
    "border border-slate-300/80 bg-white text-ink-950 shadow-lg shadow-slate-950/10 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700 hover:shadow-xl",
  dark:
    "border border-white/20 bg-white/10 text-white shadow-lg shadow-black/20 backdrop-blur-md hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 hover:shadow-xl",
};

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };

export const Button = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "relative isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]",
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
