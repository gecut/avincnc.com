type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  inverse?: boolean;
  mobileCenter?: boolean;
};

export function SectionHeader({ eyebrow, title, description, align = "start", inverse = false, mobileCenter = false }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : `max-w-2xl text-right ${mobileCenter ? "text-center lg:text-right" : "text-right"}`}>
      <p className={`flex items-center gap-3 rounded-none! text-xs font-bold text-brand-500 sm:text-sm ${centered ? "justify-center" : mobileCenter ? "justify-center lg:justify-start" : "justify-start"}`}>
        {!centered && <span className="h-px w-8 bg-brand-500" />}
        <span className={centered ? "mx-auto" : ""}>{eyebrow}</span>
      </p>
      <h2 className={`mt-4 text-2xl font-black leading-snug tracking-tight sm:text-3xl lg:text-3xl ${inverse ? "text-white" : "text-ink-950"}`}>{title}</h2>
      {description && <p className={`mt-4 text-sm leading-7 sm:text-base sm:leading-8 ${inverse ? "text-slate-400" : "text-slate-600"}`}>{description}</p>}
    </div>
  );
}
