import type { Metadata } from "next";
import { BusinessFeature } from "@/components/sections/BusinessFeature";
import { CategoryHero } from "@/components/sections/CategoryHero";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Construction",
  description: "Explore Shafa Holding’s construction, infrastructure, ready-mix concrete and specialist carpentry businesses.",
  alternates: { canonical: "/businesses/construction" },
  openGraph: { url: "/businesses/construction", title: "Construction | Shafa Holding" },
};

export default function ConstructionPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return (
    <main id="main-content">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Our Businesses", item: `${siteUrl}/businesses` },
          { "@type": "ListItem", position: 3, name: "Construction", item: `${siteUrl}/businesses/construction` },
        ],
      }} />
      <CategoryHero
        number="02"
        eyebrow="Our Businesses"
        title="Construction"
        description="Construction, infrastructure, materials and specialist production capability grounded in Shafa’s operating heritage since 1982."
        imageSrc="/images/home/featured-construction.webp"
        imageLabel="Construction and infrastructure operations"
      />
      <BusinessFeature
        id="shafa-construction"
        number="01"
        name="Shafa Al Nahdah Building Contracting LLC"
        region="Dubai, UAE"
        introduction="Established in 1982, Shafa developed from a small subcontractor with fewer than 20 employees into a major international construction operator headquartered in Dubai."
        capabilities={["Design and build", "Marine construction", "Infrastructure", "International operations", "Operational expertise", "Large-scale delivery"]}
        note="The supplied company content describes a workforce of more than one thousand employees and operations across seven countries and three continents."
        website="https://shafaconstruction.com"
        imageSrc="/images/home/business-construction.webp"
        imageLabel="Shafa construction and infrastructure operations"
      />
      <BusinessFeature
        id="shafa-ready-mix"
        number="02"
        name="Shafa Ready Mix"
        region="Dubai, UAE"
        introduction="Operating since 2003, Shafa Ready Mix supplies high-quality concrete for high-capacity projects and has established on-site batching plants in multiple international locations."
        capabilities={["Concrete supply", "On-site batching plants", "High-capacity projects", "In-house laboratories", "Quality control", "International experience"]}
        note="Operations include dust and noise controls, water recycling, and responsible reuse or disposal of concrete waste. The main commercial plant is stated as Dubai Maritime City."
        website="https://shafaconstruction.com/services/ready-mix-concrete/"
        imageSrc="/images/construction/shafa-ready-mix.webp"
        imageLabel="Shafa Ready Mix concrete production"
        reverse
        tone="sand"
      />
      <BusinessFeature
        id="plane-wood"
        number="03"
        name="Plane Wood Carpentry by Shafa"
        region="Specialist Works"
        introduction="Carpentry and wood works developed as an in-house Shafa capability, building specialist knowledge through the group’s own projects and established client relationships."
        capabilities={["Bespoke carpentry", "Specialized wood works", "In-house knowledge", "Direct end-user service", "Custom production", "Commercial workshop"]}
        note="Growing demand for bespoke and specialist work led the workshop to evolve into a separate commercial entity serving end users directly."
        website="https://planewoodshafa.com"
        imageSrc="/images/construction/plane-wood.webp"
        imageLabel="Plane Wood specialist carpentry workshop"
      />
    </main>
  );
}
