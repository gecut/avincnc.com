import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";

export const dynamic = "force-static";

const baseUrl = "https://avincnc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = siteConfig.products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/products/`, changeFrequency: "monthly", priority: 0.9 },
    ...productRoutes,
  ];
}
