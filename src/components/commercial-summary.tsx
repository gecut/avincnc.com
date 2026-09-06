import { siteConfig, type ProductData } from "@/config/site-config";

type CommercialSummaryProps = {
  product?: ProductData;
  preparationTime?: string;
};

export function CommercialSummary({ product, preparationTime }: CommercialSummaryProps = {}) {
  const { commercial } = siteConfig;
  const time = preparationTime || product?.preparationTime || commercial.preparationTime || "۴۵ تا ۶۰ روز کاری";

  const items = [
    {
      title: "مبنای قیمت",
      description: `قیمت بر اساس ${commercial.priceFactors.join("، ")} تعیین می‌شود.`,
    },
    {
      title: "زمان آماده‌سازی",
      description: `${time}؛ زمان دقیق هر سفارش باید تأیید شود.`,
    },
    {
      title: "ضمانت و پشتیبانی",
      description: "یک سال ضمانت و ده سال خدمات پس از فروش و پشتیبانی.",
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {items.map((item) => (
        <div key={item.title} className="min-w-0 pb-5">
          <h3 className="text-base font-black text-ink-950">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
