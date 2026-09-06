import { LogoLoop } from "@/components/reactbits/logo-loop";
import { SectionHeader } from "@/components/section-header";

const loopItems = ["CNC WOOD", "FIBER LASER", "CAD / CAM", "PRECISION", "AFTER-SALES"];

export function LogoLoopSection() {
  return (
    <section data-reveal aria-label="فناوری‌ها و خدمات آوین" className="flex h-fit flex-col justify-center bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader align="center" eyebrow="توانمندی‌های آوین" title="ساخت دقیق، از ایده تا اجرا" description="راهکارهای ماشین‌کاری و برش صنعتی با تمرکز بر دقت، پشتیبانی و نتیجه قابل‌اندازه‌گیری." />
        <div data-motion-item={true}>
          <LogoLoop items={loopItems}  speed={26} className="mt-8" />
        </div>
      </div>
    </section>
  );
}
