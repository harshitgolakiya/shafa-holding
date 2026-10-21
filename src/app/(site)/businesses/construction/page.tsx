import type { Metadata } from "next";
import { getContent } from "@/cms/content";
import { BusinessFeature } from "@/components/sections/BusinessFeature";
import { CategoryHero } from "@/components/sections/CategoryHero";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContent("construction");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: "/businesses/construction" },
    openGraph: { url: "/businesses/construction", title: `${page.seoTitle} | Shafa Holding` },
  };
}

export default async function ConstructionPage() {
  const page = await getContent("construction");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return (
    <main id="main-content">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Our Businesses", item: `${siteUrl}/businesses` },
          { "@type": "ListItem", position: 3, name: page.title, item: `${siteUrl}/businesses/construction` },
        ],
      }} />
      <CategoryHero
        number="02"
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.text}
        imageSrc={page.image}
        imageLabel={page.imageAlt}
      />
      {page.businesses.map((business, index) => (
        <BusinessFeature
          key={business.id || index}
          id={business.id}
          number={String(index + 1).padStart(2, "0")}
          name={business.name}
          region={business.region || undefined}
          introduction={business.introduction}
          capabilities={business.capabilities}
          note={business.note}
          website={business.website}
          imageSrc={business.image}
          imageLabel={business.imageAlt}
          reverse={index % 2 === 1}
          tone={index % 2 === 1 ? "sand" : "ivory"}
        />
      ))}
    </main>
  );
}
