import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBusinesses, getContent } from "@/cms/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContent("businessesPage");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: "/businesses" },
    openGraph: { url: "/businesses", title: page.seoTitle },
  };
}

export default async function BusinessesPage() {
  const [page, businesses] = await Promise.all([getContent("businessesPage"), getBusinesses()]);
  const categories = [
    { number: "01", title: "Investment", href: "/businesses/investment", ...page.investment, businesses: businesses.investment, showRegion: true },
    { number: "02", title: "Construction", href: "/businesses/construction", ...page.construction, businesses: businesses.construction, showRegion: false },
  ];

  return (
    <main id="main-content">
      <section className="bg-(--shafa-green-950) pb-20 pt-36 text-(--shafa-ivory) md:pb-28 md:pt-44">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-8">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="display-title mt-8 text-[clamp(3.75rem,7.5vw,7.5rem)]">{page.title}</h1>
          </FadeIn>
          <FadeIn className="lg:col-span-3 lg:col-start-10" delay={0.08}>
            <p className="text-base leading-8 text-white/62">{page.text}</p>
          </FadeIn>
        </Container>
      </section>
      {categories.map((category, index) => (
        <section key={category.title} className={`${index % 2 ? "bg-(--shafa-sand)" : "bg-(--shafa-ivory)"} py-(--section-space)`}>
          <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <FadeIn className={`lg:col-span-7 ${index % 2 ? "lg:col-start-6" : ""}`}>
              <div className="relative aspect-4/3 overflow-hidden bg-(--shafa-green-800)">
                <Image src={category.image} alt={category.label} fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover" />
              </div>
            </FadeIn>
            <FadeIn className={`lg:col-span-4 ${index % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`} delay={0.08}>
              <p className="eyebrow text-(--shafa-gold-muted)">{category.number} — {category.title}</p>
              <h2 className="display-title mt-7 text-[clamp(3rem,5vw,5rem)]">{category.title}</h2>
              <p className="mt-7 text-base leading-8 text-(--shafa-green-800)/68">{category.description}</p>
              <ul className="mt-7 border-t border-(--shafa-green-900)/18 pt-5 text-sm leading-8 text-(--shafa-green-800)/60">
                {category.businesses.map((business) => (
                  <li key={business.id}>{category.showRegion && business.region ? `${business.name} — ${business.region}` : business.name}</li>
                ))}
              </ul>
              <Link href={category.href} className="group mt-8 inline-flex min-h-11 items-center gap-4 border-b border-(--shafa-gold) py-2 text-xs font-bold uppercase tracking-[0.15em]">
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
