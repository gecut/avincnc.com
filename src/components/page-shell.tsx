import { Footer } from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import type { SiteConfig } from "@/config/site-config";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  site: Pick<
    SiteConfig,
    | "siteName"
    | "slogan"
    | "tagline"
    | "navigation"
    | "categories"
    | "contact"
  >;
};

export function PageShell({ children, site }: PageShellProps) {
  return (
    <div className="relative isolate min-h-screen bg-ink-950 text-zinc-950">
      <NavBar
        navigation={site.navigation}
        categories={site.categories}
        contact={site.contact}
      />
      <div className="relative z-10 flex-1 bg-zinc-50 shadow-[0_2rem_5rem_rgba(0,0,0,.35)]">{children}</div>
      <div className="sticky bottom-0 z-0">
        <Footer
          siteName={site.siteName}
          slogan={site.slogan}
          tagline={site.tagline}
          navigation={site.navigation}
          contact={site.contact}
        />
      </div>
    </div>
  );
}
