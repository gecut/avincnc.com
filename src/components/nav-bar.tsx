"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { changaOne } from "@/config/fonts";
import { Icon } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/navigation-menu";
import type { CategoryData, ContactInfo, NavigationItem } from "@/config/site-config";

type NavBarProps = {
  navigation: NavigationItem[];
  categories: CategoryData[];
  contact: ContactInfo;
};

export function Logo() {
  return (
    <Link href="/" aria-label="صفحه اصلی آوین CNC" className="group flex min-w-0 items-center" dir="ltr">
      <span className="relative block pb-2 leading-none rounded-full ">
        <span className={`${changaOne.className} block whitespace-nowrap text-[1.55rem] tracking-[0.02em] text-white sm:text-[1.8rem]`}>
          AVIN<span className="ml-1 text-brand-400">CNC</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-[61px] bg-white/15">
          <span className="block h-full w-2/5 rounded-[61px] bg-brand-400 transition-all duration-500 group-hover:w-full" />
        </span>
      </span>
    </Link>
  );
}

export function NavBar({ navigation, categories, contact }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement | null>(null);
  const lastScrollY = useRef(0);
  const isCollapsed = isScrolled && !isExpanded;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const timeoutId = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Node && mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 72;
      setIsScrolled(scrolled);

      if (!scrolled) {
        setIsExpanded(false);
      } else {
        const delta = currentScrollY - lastScrollY.current;
        if (delta > 3) setIsExpanded(false);
        else if (delta < -3) setIsExpanded(true);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  return (
    <header
      data-collapsed={isCollapsed ? "true" : "false"}
      className={`fixed inset-x-3 z-50 mx-auto rounded-full! text-white transition-[max-width,top,background-color,box-shadow,border-color] duration-[600ms] ease-[cubic-bezier(.4,0,.2,1)] sm:inset-x-5 ${
        isCollapsed
          ? "top-2 max-w-14 bg-slate-950/70 shadow-[0_1rem_3rem_rgba(0,0,0,.3)] backdrop-blur-2xl max-lg:duration-300"
          : isScrolled
            ? "top-2 max-w-7xl bg-slate-950/60 shadow-[0_1rem_3rem_rgba(0,0,0,.28)] backdrop-blur-2xl"
            : "top-3 max-w-7xl bg-slate-900/25 shadow-[0_1rem_2.5rem_rgba(0,0,0,.22)] backdrop-blur-xl sm:top-5"
      }`}
    >
      <button
        type="button"
        aria-label="باز کردن نوار ناوبری"
        aria-expanded={!isCollapsed}
        onClick={() => setIsExpanded(true)}
        className={`absolute inset-0 z-20 grid place-items-center rounded-full! text-white transition-[opacity,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${isCollapsed ? "pointer-events-auto scale-100 opacity-100 delay-200 max-lg:delay-0" : "pointer-events-none scale-75 opacity-0 delay-0"}`}
      >
        <Icon name="menu" className="size-6" />
      </button>

      <div dir="rtl" className={`grid grid-cols-[1fr_auto] items-center px-4 transition-[height,gap,opacity,transform] duration-[420ms] ease-[cubic-bezier(.4,0,.2,1)] sm:px-5 lg:grid-cols-[auto_1fr_auto] lg:px-6 ${isCollapsed ? "pointer-events-none h-14 scale-95 gap-0 opacity-0" : "h-16 scale-100 gap-3 opacity-100 delay-100 sm:h-[4.5rem] lg:gap-5"}`}>
        <div className="justify-self-start transition-transform duration-500">
          <Logo />
        </div>

        <NavigationMenu dir="rtl" delayDuration={0} skipDelayDuration={0} aria-label="ناوبری اصلی" className="hidden h-14 rounded-full! bg-slate-900/35 px-2 shadow-[0_1rem_3rem_rgba(0,0,0,.18)] backdrop-blur-xl transition-all duration-500 lg:flex lg:justify-self-center">
          <NavigationMenuList className="gap-1 justify-end">
            {navigation.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link href={item.href} className="nav-menu-pill block rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/[.05] hover:text-white focus-visible:text-white">
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div dir="rtl" className="hidden items-center justify-self-end gap-4 lg:flex">
          <a
            href={`tel:${contact.phones[0]}`}
            aria-label={`تماس با آوین: ${contact.phones[0]}`}
            title={contact.phones[0]}
            className="grid size-11 place-items-center rounded-full! border border-white/15 bg-white/[.06] text-white transition-all duration-300 hover:bg-white/10 hover:text-brand-400"
          >
            <Icon name="phone" className="size-5" />
          </a>

        </div>

        <details
          ref={mobileMenuRef}
          open={isMobileMenuOpen}
          onToggle={(event) => setIsMobileMenuOpen(event.currentTarget.open)}
          className="group relative justify-self-end lg:hidden"
        >
          <summary
            onClick={(event) => {
              event.preventDefault();
              setIsMobileMenuOpen((isOpen) => !isOpen);
            }}
            className="grid size-11 cursor-pointer list-none place-items-center rounded-xl border border-white/15 bg-white/5 text-white backdrop-blur-md marker:hidden transition-colors hover:bg-white/10"
          >
            <span className="sr-only">باز کردن منو</span>
            <Icon name="menu" className="size-6" />
          </summary>
          <nav className="fixed inset-x-3 top-[5.25rem] max-h-[calc(100svh-6.25rem)] w-auto max-w-none overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-ink-950/95 p-3 shadow-2xl backdrop-blur-xl sm:inset-x-5 sm:top-[6.5rem] sm:max-h-[calc(100svh-7.5rem)]">
            {navigation.map((item) => item.href === "/products" ? (
              <details key={item.href} className="group/categories">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-200 marker:hidden transition hover:bg-white/5 hover:text-white">
                  {item.label}
                  <svg aria-hidden="true" viewBox="0 0 12 8" className="size-3 fill-none stroke-current transition-transform duration-300 group-open/categories:rotate-180">
                    <path d="m1 1.5 5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="mr-3 border-r border-white/10 pr-2">
                  <Link href="/products" onClick={closeMobileMenu} className="block rounded-lg px-4 py-2.5 text-xs font-bold text-brand-300 transition hover:bg-white/5">همه محصولات</Link>
                  {categories.map((category) => (
                    <Link key={category.slug} href={`/products?category=${category.slug}`} onClick={closeMobileMenu} className="block rounded-lg px-4 py-2.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={item.href} href={item.href} onClick={closeMobileMenu} className="block rounded-xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white">
                {item.label}
              </Link>
            ))}
            <a href={`tel:${contact.phones[0]}`} aria-label={`تماس با آوین: ${contact.phones[0]}`} onClick={closeMobileMenu} className="mt-2 grid min-h-11 place-items-center rounded-xl bg-brand-500 px-4 py-3 text-white">
              <Icon name="phone" className="size-5" />
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
