import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Our Businesses",
  description: "Explore Shafa Holding’s portfolio across investment, agriculture, food production, construction, concrete and specialist works.",
  alternates: { canonical: "/businesses" },
  openGraph: { url: "/businesses", title: "Our Businesses | Shafa Holding" },
};

const categories = [
  {
    number: "01",
    title: "Investment",
    href: "/businesses/investment",
    image: "/images/home/business-investment.webp",
    label: "Agriculture and food systems",
    description: "Long-term agricultural and food-production businesses focused on resilient supply and operational efficiency.",
    businesses: ["Shafa Farms — United Kingdom", "Shafa Agro — Tanzania"],
  },
  {
    number: "02",
    title: "Construction",
    href: "/businesses/construction",
    image: "/images/home/business-construction.webp",
    label: "Construction and infrastructure",
    description: "Construction, infrastructure, ready-mix concrete and specialist carpentry capabilities developed from Shafa’s operating heritage.",
    businesses: ["Shafa Al Nahdah Building Contracting LLC", "Shafa Ready Mix", "Plane Wood Carpentry by Shafa"],
  },
] as const;

export default function BusinessesPage() {
  return (
    <main id="main-content">
      <section className="bg-[var(--shafa-green-950)] pb-20 pt-36 text-[var(--shafa-ivory)] md:pb-28 md:pt-44">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-8">
            <p className="eyebrow">Shafa Holding</p>
            <h1 className="display-title mt-8 text-[clamp(3.75rem,7.5vw,7.5rem)]">Our Businesses</h1>
          </FadeIn>
          <FadeIn className="lg:col-span-3 lg:col-start-10" delay={0.08}>
            <p className="text-base leading-8 text-white/62">A diversified portfolio built around essential industries, operational expertise and long-term resilience.</p>
          </FadeIn>
        </Container>
      </section>
      {categories.map((category, index) => (
        <section key={category.title} className={`${index % 2 ? "bg-[var(--shafa-sand)]" : "bg-[var(--shafa-ivory)]"} py-[var(--section-space)]`}>
          <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <FadeIn className={`lg:col-span-7 ${index % 2 ? "lg:col-start-6" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--shafa-green-800)]">
                <Image src={category.image} alt={category.label} fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn className={`lg:col-span-4 ${index % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`} delay={0.08}>
              <p className="eyebrow text-[var(--shafa-gold-muted)]">{category.number} — {category.title}</p>
              <h2 className="display-title mt-7 text-[clamp(3rem,5vw,5rem)]">{category.title}</h2>
              <p className="mt-7 text-base leading-8 text-[var(--shafa-green-800)]/68">{category.description}</p>
              <ul className="mt-7 border-t border-[var(--shafa-green-900)]/18 pt-5 text-sm leading-8 text-[var(--shafa-green-800)]/60">
                {category.businesses.map((business) => <li key={business}>{business}</li>)}
              </ul>
              <Link href={category.href} className="group mt-8 inline-flex min-h-11 items-center gap-4 border-b border-[var(--shafa-gold)] py-2 text-xs font-bold uppercase tracking-[0.15em]">
                Explore {category.title}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </Container>
        </section>
      ))}
    </main>
  );
}
