import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { blackOpsOne, peyda } from "@/config/fonts";
import { siteConfig } from "@/config/site-config";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.pageDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" className={cn("h-full", "antialiased", peyda.variable, blackOpsOne.variable, "font-sans")}>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950">
        <PageShell site={siteConfig}>{children}</PageShell>
      </body>
    </html>
  );
}
