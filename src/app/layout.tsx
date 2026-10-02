import type { Metadata, Viewport } from "next";
import { PageShell } from "@/components/page-shell";
import { blackOpsOne, peyda } from "@/config/fonts";
import { siteConfig } from "@/config/site-config";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/schema";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://avincnc.com"),
  title: siteConfig.siteTitle,
  description: siteConfig.pageDescription,
  applicationName: siteConfig.siteName,
  creator: "Gecut",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [{ url: "/llms.txt", title: "LLM Context" }],
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AVIN CNC",
  },
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.pageDescription,
    url: "https://avincnc.com",
    siteName: siteConfig.siteName,
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: siteConfig.siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.siteTitle,
    description: siteConfig.pageDescription,
    images: ["/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05080e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" className={cn("h-full", "antialiased", peyda.variable, blackOpsOne.variable, "font-sans")}>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <PageShell site={siteConfig}>{children}</PageShell>
      </body>
    </html>
  );
}
