import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site-config";

export const dynamic = "force-static";

const baseUrl = "https://avincnc.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categoryRoutes = siteConfig.categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const productRoutes = siteConfig.products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/products/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...categoryRoutes,
    ...productRoutes,
  ];
}
