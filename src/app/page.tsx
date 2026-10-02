import { AboutSection } from "@/components/about-section";
import { CategoriesSection } from "@/components/categories-section";
import { CommercialSection } from "@/components/commercial-section";
import { ContactSection } from "@/components/contact-section";
import { FeaturedProductsSection } from "@/components/featured-products-section";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { MachineInterfaceSection } from "@/components/machine-interface-section";
import { VideoShowcaseSection } from "@/components/video-showcase-section";
import { ProcessSection } from "@/components/process-section";
import { siteConfig } from "@/config/site-config";
import { getHowToSchema } from "@/lib/schema";

export default function Home() {
  const howToSchema = getHowToSchema(siteConfig.processSteps);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Hero hero={siteConfig.hero} />
      <AboutSection
        about={siteConfig.about}
        capabilities={siteConfig.capabilities}
      />
      <VideoShowcaseSection videoShowcase={siteConfig.videoShowcase} />
      <CategoriesSection categories={siteConfig.categories} />
      <MachineInterfaceSection interfaceShowcase={siteConfig.interfaceShowcase} />
      <FeaturedProductsSection products={siteConfig.products.slice(0, 3)} />
      <CommercialSection commercial={siteConfig.commercial} />
      <ProcessSection steps={siteConfig.processSteps} />
      <FaqSection faqs={siteConfig.faqs} whatsapp={siteConfig.contact.whatsapp} />
      <ContactSection contact={siteConfig.contact} />
    </main>
  );
}
