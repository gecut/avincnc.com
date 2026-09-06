import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import type { SiteConfig } from "@/config/site-config";

type ContactSectionProps = {
  contact: SiteConfig["contact"];
};

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <div
      data-reveal
      id="contact"
      className="relative z-20 overflow-hidden rounded-b-[50pxحدحپ قعد ثر] bg-white top-10 px-4 py-16 text-white shadow-[0_20px_45px_-18px_rgba(255,255,255,0.4)] sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        {/* Brand Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-8 inset-y-2 bg-brand-500/45 blur-3xl"
        />

        {/* Main Card */}
        <div className="relative grid gap-8 rounded-[2rem] border border-white/15 bg-ink-950/90 px-5 py-9 backdrop-blur-2xl sm:px-9 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12">
          {/* Content */}
          <div className="lg:col-span-7">
            <p className="text-xs font-black text-brand-100">
              مشاوره انتخاب دستگاه
            </p>

            <h2 className="mt-3 text-2xl font-black leading-[1.45] sm:text-3xl lg:text-4xl">
              برای انتخاب دستگاه مناسب، با تیم فنی آوین صحبت کنید.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-white/70">
              نوع متریال، ابعاد کار و ظرفیت تولیدتان را مطرح کنید تا
              پیکربندی مناسب بررسی شود.
            </p>
          </div>

          {/* Actions */}
          <div
            data-reveal-item
            className="grid gap-3 sm:grid-cols-2 lg:col-span-5"
          >
            <Button
              variant="secondary"
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              گفتگو در واتساپ
              <Icon name="arrow" className="size-4" />
            </Button>

            <Button
              variant="dark"
              href={`tel:${contact.phones[0]}`}
              className="w-full"
            >
              <Icon name="phone" className="size-4" />
              تماس مستقیم
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}