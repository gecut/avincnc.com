import {
  siteConfig,
  type CategoryData,
  type FaqItem,
  type ProcessStep,
  type ProductData,
} from "@/config/site-config";

const BASE_URL = "https://avincnc.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${BASE_URL}/#organization`,
    name: siteConfig.siteName,
    legalName: siteConfig.legalName ?? siteConfig.siteName,
    url: BASE_URL,
    logo: `${BASE_URL}/icon-512.png`,
    image: `${BASE_URL}/icon-512.png`,
    description: siteConfig.pageDescription,
    slogan: siteConfig.slogan,
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: "پارک علم و فناوری خراسان رضوی، نبش رشد 5",
      addressLocality: "مشهد",
      addressRegion: "خراسان رضوی",
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.4385,
      longitude: 59.432,
    },
    telephone: siteConfig.contact.phones[0],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    sameAs: [
      `https://instagram.com/${siteConfig.contact.instagram}`,
      "https://kstp.ir",
    ],
    knowsAbout: siteConfig.knowsAbout ?? [
      "طراحی و ساخت دستگاه‌های CNC چوب",
      "دستگاه‌های برش لیزر فایبر فلزات",
      "مرکز ماشین‌کاری پنج محور چوب",
      "تنش‌زدایی سازه صنعتی با روش VSR",
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: siteConfig.siteName,
    description: siteConfig.pageDescription,
    inLanguage: "fa-IR",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    creator: {
      "@type": "Organization",
      name: "Gecut",
      url: "https://gecut.ir/",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

export function getProductSchema(
  product: ProductData,
  category?: CategoryData,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE_URL}/products/${product.slug}/#product`,
    name: product.name,
    description: product.directAnswer || product.shortDescription,
    image: product.images.map((img) =>
      img.src.startsWith("http") ? img.src : `${BASE_URL}${img.src}`,
    ),
    brand: {
      "@type": "Brand",
      name: "آوین CNC (AVIN CNC)",
    },
    manufacturer: {
      "@id": `${BASE_URL}/#organization`,
    },
    category: category?.name ?? "ماشین‌آلات صنعتی CNC",
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/products/${product.slug}/`,
      priceCurrency: "IRR",
      availability: "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    additionalProperty: (product.specs || []).flatMap((group) =>
      group.items.map((item) => ({
        "@type": "PropertyValue",
        name: `${group.group} - ${item.label}`,
        value: item.value,
      })),
    ),
  };
}

export function getCollectionPageSchema(
  category: CategoryData,
  products: ProductData[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.directAnswer || category.description,
    url: `${BASE_URL}/categories/${category.slug}/`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((prod, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: prod.name,
        url: `${BASE_URL}/products/${prod.slug}/`,
      })),
    },
  };
}

export function getHowToSchema(steps: ProcessStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "مراحل سفارش و ساخت ماشین‌آلات صنعتی آوین CNC",
    description:
      "راهنمای گام‌به‌گام از تماس اولیه و بررسی نیاز فنی تا ساخت و تحویل دستگاه‌های CNC و برش لیزر فایبر.",
    totalTime: "P60D",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}

export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getItemListSchema(
  name: string,
  description: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}
