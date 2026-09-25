import type { Metadata } from "next";
import { BusinessFeature } from "@/components/sections/BusinessFeature";
import { CategoryHero } from "@/components/sections/CategoryHero";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Investment",
  description: "Explore Shafa Holding’s agricultural and food-production businesses: Shafa Farms in the United Kingdom and Shafa Agro in Tanzania.",
  alternates: { canonical: "/businesses/investment" },
  openGraph: { url: "/businesses/investment", title: "Investment | Shafa Holding" },
};

export default function InvestmentPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return (
    <main id="main-content">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Our Businesses", item: `${siteUrl}/businesses` },
          { "@type": "ListItem", position: 3, name: "Investment", item: `${siteUrl}/businesses/investment` },
        ],
      }} />
      <CategoryHero
        number="01"
        eyebrow="Our Businesses"
        title="Investment"
        description="Agriculture and food-production businesses developed around sustainable supply, operational efficiency and long-term resilience."
        imageSrc="/images/investment/Investment-page-hero.webp"
        imageLabel="Investment in agriculture and food systems"
      />
      <BusinessFeature
        id="shafa-farms"
        number="01"
        name="Shafa Farms"
        region="United Kingdom"
        introduction="Shafa Holding acquired an established 100% halal poultry facility in Warwickshire and upgraded it with new processing lines and integrated production capability."
        capabilities={["High-quality halal poultry", "Upgraded processing lines", "Integrated portioning", "Added-value packing", "HMC-certified products", "Non-stun, non-gas processing"]}
        note="Bringing processing and packing together at one facility reduces unnecessary transport and supports operational efficiency and carbon-footprint reduction."
        website="https://shafafarm.co.uk"
        imageSrc="/images/home/featured-shafa-farms.webp"
        imageLabel="Shafa Farms poultry production"
      />
      <BusinessFeature
        id="shafa-agro"
        number="02"
        name="Shafa Agro"
        region="Tanzania"
        introduction="Established in the northern highlands of Iringa, Shafa Agro represents the group’s commitment to sustainable agriculture and self-sufficient food supply in Africa."
        capabilities={["Sustainable agriculture", "Water security", "Feed security", "Poultry", "Dairy and livestock", "Animal feed"]}
        note="The business aims to support an efficient supply chain for Tanzanian farmers and contribute to regional food security and socioeconomic growth."
        website="https://shafaagro.com"
        imageSrc="/images/home/business-investment.webp"
        imageLabel="Shafa Agro farming operations in Tanzania"
        reverse
        tone="sand"
      />
    </main>
  );
}
