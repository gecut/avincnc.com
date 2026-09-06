import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/nav-bar";
import type { ContactInfo, NavigationItem } from "@/config/site-config";
import { toEnglishDigits } from "@/lib/persian-numbers";

type FooterProps = {
  siteName: string;
  slogan: string;
  tagline: string;
  navigation: NavigationItem[];
  contact: ContactInfo;
};

export function Footer({
  siteName,
  slogan,
  tagline,
  navigation,
  contact,
}: FooterProps) {
  return (
    <footer className="site-footer relative z-10 w-full bg-ink-950 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pt-12 pb-8 sm:px-6 sm:pt-14 sm:pb-8 lg:min-h-[56dvh] lg:px-8 lg:py-20">

        {/* Main */}
        <div className="flex flex-col gap-8 lg:flex-1 lg:justify-between lg:gap-10">

          {/* Content */}
          <div className="grid grid-cols-1 gap-8 text-center sm:gap-9 lg:grid-cols-12 lg:gap-8 lg:text-start">

            {/* Brand */}
            <div className="w-full lg:col-span-4">
              <div className="flex justify-center lg:justify-start">
                <Logo />
              </div>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-400 lg:mx-0">
                {tagline}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {siteName} — {slogan}
              </p>
            </div>

            {/* Navigation */}
            <div className="w-full lg:col-span-2">
              <p className="text-sm font-bold text-white">
                دسترسی سریع
              </p>

              <ul className="mt-4 space-y-2.5">
                {navigation.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 transition-colors hover:text-brand-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="w-full lg:col-span-4">
              <p className="text-sm font-bold text-white">
                اطلاعات تماس
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-400">

                <li className="flex flex-col items-center gap-1.5 lg:flex-row lg:items-start lg:gap-3">
                  <Icon
                    name="phone"
                    className="size-4 shrink-0 text-brand-500 lg:mt-1"
                  />

                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 lg:justify-start">
                    {contact.phones.map((phone, idx) => (
                      <span key={phone} className="inline-flex items-center gap-2">
                        <a
                          href={`tel:${phone}`}
                          dir="ltr"
                          className="font-number transition-colors hover:text-white"
                        >
                          {toEnglishDigits(phone)}
                        </a>
                        {idx < contact.phones.length - 1 && (
                          <span className="hidden text-slate-600 sm:inline">|</span>
                        )}
                      </span>
                    ))}
                  </div>
                </li>

                <li className="flex flex-col items-center gap-1.5 lg:flex-row lg:items-start lg:gap-3">
                  <Icon
                    name="location"
                    className="size-4 shrink-0 text-brand-500 lg:mt-1"
                  />

                  <span className="max-w-md">
                    {contact.address}
                  </span>
                </li>

                <li className="flex flex-col items-center gap-1.5 lg:flex-row lg:items-start lg:gap-3">
                  <Icon
                    name="clock"
                    className="size-4 shrink-0 text-brand-500 lg:mt-1"
                  />

                  <span>{contact.workingHours}</span>
                </li>

                <li className="flex flex-col items-center gap-1.5 lg:flex-row lg:items-start lg:gap-3">
                  <Icon
                    name="instagram"
                    className="size-4 shrink-0 text-brand-500 lg:mt-1"
                  />

                  <a
                    href={`https://instagram.com/${contact.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="hover:text-white"
                  >
                    @{contact.instagram}
                  </a>
                </li>

              </ul>
            </div>

            {/* Gecut Logo Card */}
            <div className="flex w-full flex-col items-center justify-center lg:col-span-2 lg:items-end lg:justify-start">
              <div className="flex h-26 w-full max-w-[280px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-sm backdrop-blur-xs transition-all hover:border-brand-500/30 hover:bg-white/[0.08] lg:h-28 lg:w-full lg:max-w-[240px]">
                <div className="relative aspect-[3.2/1] h-auto w-full max-w-[210px]">
                  <Image
                    src="/images/gecut-logo.png"
                    alt="لوگو جیکات GECUT"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] text-slate-500 sm:flex-row sm:text-start">

            <p>
              ©{" "}
              <span className="font-number">
                {toEnglishDigits(new Date().getFullYear())}
              </span>{" "}
              آوین ماشین پاژ؛ تمامی حقوق محفوظ است.
            </p>

            <p dir="ltr">
              Precision built. Industry ready.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}