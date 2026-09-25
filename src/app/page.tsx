import { FadeIn } from "@/components/motion/FadeIn";
import Image from "next/image";
import { BusinessSplit } from "@/components/sections/BusinessSplit";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedBusinessStories } from "@/components/sections/FeaturedBusinessStories";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { PurposeSection } from "@/components/sections/PurposeSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Shafa Holding",
        url: siteUrl,
        foundingDate: "1982",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Al Manara Tower – ETA Star, 23rd Floor, No. 2302–2304, Business Bay",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Shafa Holding",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="relative min-h-svh overflow-hidden bg-[var(--shafa-green-950)] text-[var(--shafa-ivory)]">
        <div className="absolute inset-0 opacity-55">
          <Image
            src="/images/home/hero-holding.webp"
            alt="Marine infrastructure and industrial operations on a UAE coastline"
            fill
            preload
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--shafa-green-950)] via-[var(--shafa-green-950)]/80 to-transparent" />
        <Container className="relative flex min-h-svh items-end pb-[clamp(4rem,9vw,8rem)] pt-32">
          <div className="max-w-5xl">
            <FadeIn>
              <p className="eyebrow">Shafa Holding — Est. 1982</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="display-title mt-7 text-[clamp(3.5rem,8vw,7.25rem)]">
                We Make
                <br />
                Things Happen.
              </h1>
            </FadeIn>
            <GoldLine className="my-8 w-[min(18rem,55vw)]" />
            <FadeIn delay={0.16}>
              <p className="max-w-xl text-base leading-8 text-white/72 md:text-lg">
                Built on more than four decades of experience, Shafa Holding operates across essential industries with a focus on resilience, sustainable growth and long-term value.
              </p>
              <LinkArrow href="#legacy" className="mt-8">
                Discover Shafa
              </LinkArrow>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="legacy" className="bg-[var(--shafa-ivory)] py-[var(--section-space)]">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-4">
            <p className="display-title text-[clamp(5.5rem,12vw,10rem)] text-[var(--shafa-gold-muted)]">1982</p>
          </FadeIn>
          <FadeIn className="lg:col-span-7 lg:col-start-6" delay={0.08}>
            <SectionHeading eyebrow="Our legacy">
              Building a Legacy of Resilience and Progress
            </SectionHeading>
            <GoldLine className="my-10 w-24" />
            <p className="max-w-2xl text-lg leading-9 text-[var(--shafa-green-800)]/80">
              Established as a construction company in 1982, Shafa has evolved into a diversified group with operations spanning construction, specialist services and sustainable agricultural businesses.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--shafa-green-900)] py-[var(--section-space)] text-[var(--shafa-ivory)]">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow">Shafa Holding</p>
            <div aria-hidden="true" className="mt-10 hidden lg:block">
              <span className="block h-px w-28 bg-[var(--shafa-gold)]" />
              <span className="mt-3 block h-px w-20 bg-[var(--shafa-gold)]/65" />
              <span className="mt-3 block h-px w-12 bg-[var(--shafa-gold)]/35" />
            </div>
          </FadeIn>
          <div className="lg:col-span-7 lg:col-start-6">
            <FadeIn>
              <h2 className="display-title text-[clamp(3rem,5.5vw,5.5rem)]">
                Built to endure.
                <br />
                <span className="text-[var(--shafa-gold-light)]">Designed to progress.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 text-base leading-8 text-white/65 sm:grid-cols-2">
                <p>
                  Shafa began with construction—developing the operational knowledge, specialist capability and decisive leadership required to deliver in demanding environments.
                </p>
                <p>
                  That foundation now supports a diversified group focused on essential industries, sustainable agriculture and resilient growth measured across generations.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-[var(--shafa-ivory)] py-[var(--section-space)]">
        <Container className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-7">
            <SectionHeading eyebrow="Our businesses">
              Rise of New
              <br />
              Possibilities
            </SectionHeading>
          </FadeIn>
          <FadeIn className="md:col-span-4 md:col-start-9" delay={0.08}>
            <p className="text-base leading-8 text-[var(--shafa-green-800)]/70">
              A diversified portfolio built around operational expertise, essential industries and long-term resilience.
            </p>
          </FadeIn>
        </Container>
        <BusinessSplit />
      </section>

      <PurposeSection />
      <ValuesSection />
      <GlobalPresence />
      <FeaturedBusinessStories />
      <CTASection />
    </main>
  );
}
