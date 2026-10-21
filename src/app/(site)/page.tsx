import Image from "next/image";
import { getContent } from "@/cms/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { BusinessSplit } from "@/components/sections/BusinessSplit";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedBusinessStories } from "@/components/sections/FeaturedBusinessStories";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { PurposeSection } from "@/components/sections/PurposeSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { Lines } from "@/components/ui/Lines";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function Home() {
  const [home, settings] = await Promise.all([getContent("home"), getContent("settings")]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: settings.name,
        legalName: settings.legalName,
        url: siteUrl,
        foundingDate: settings.established,
        telephone: settings.phone,
        email: settings.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address.join(", "),
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: settings.name,
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
      <section className="relative min-h-svh overflow-hidden bg-(--shafa-green-950) text-(--shafa-ivory)">
        <div className="absolute inset-0 opacity-55">
          <Image
            src={home.hero.image}
            alt={home.hero.imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover object-[58%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-(--shafa-green-950) via-(--shafa-green-950)/80 to-transparent" />
        <Container className="relative flex min-h-svh items-end pb-[clamp(4rem,9vw,8rem)] pt-32">
          <div className="max-w-5xl">
            <FadeIn>
              <p className="eyebrow">{home.hero.eyebrow}</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="display-title mt-7 text-[clamp(3.5rem,8vw,7.25rem)]">
                <Lines text={home.hero.title} />
              </h1>
            </FadeIn>
            <GoldLine className="my-8 w-[min(18rem,55vw)]" />
            <FadeIn delay={0.16}>
              <p className="max-w-xl text-base leading-8 text-white/72 md:text-lg">{home.hero.text}</p>
              <LinkArrow href="#legacy" className="mt-8">
                {home.hero.linkLabel}
              </LinkArrow>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="legacy" className="bg-(--shafa-ivory) py-(--section-space)">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-4">
            <p className="display-title text-[clamp(5.5rem,12vw,10rem)] text-(--shafa-gold-muted)">{home.legacy.year}</p>
          </FadeIn>
          <FadeIn className="lg:col-span-7 lg:col-start-6" delay={0.08}>
            <SectionHeading eyebrow={home.legacy.eyebrow}>
              <Lines text={home.legacy.title} />
            </SectionHeading>
            <GoldLine className="my-10 w-24" />
            <p className="max-w-2xl text-lg leading-9 text-(--shafa-green-800)/80">{home.legacy.text}</p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-(--shafa-green-900) py-(--section-space) text-(--shafa-ivory)">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow">{home.endure.eyebrow}</p>
            <Image
              src="/logo-mark.svg"
              alt=""
              width={78}
              height={27}
              className="mt-12 hidden h-auto w-full lg:block"
              unoptimized
              draggable={false}
            />
          </FadeIn>
          <div className="lg:col-span-7 lg:col-start-6">
            <FadeIn>
              <h2 className="display-title text-[clamp(3rem,5.5vw,5.5rem)]">
                {home.endure.title}
                <br />
                <span className="text-(--shafa-gold-light)">{home.endure.titleAccent}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 text-base leading-8 text-white/65 sm:grid-cols-2">
                {home.endure.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="bg-(--shafa-ivory) py-(--section-space)">
        <Container className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-7">
            <SectionHeading eyebrow={home.businesses.eyebrow}>
              <Lines text={home.businesses.title} />
            </SectionHeading>
          </FadeIn>
          <FadeIn className="md:col-span-4 md:col-start-9" delay={0.08}>
            <p className="text-base leading-8 text-(--shafa-green-800)/70">{home.businesses.text}</p>
          </FadeIn>
        </Container>
        <BusinessSplit investment={home.businesses.investment} construction={home.businesses.construction} />
      </section>

      <PurposeSection content={home.purpose} />
      <ValuesSection content={home.values} />
      <GlobalPresence content={home.presence} />
      <FeaturedBusinessStories content={home.stories} />
      <CTASection content={home.cta} />
    </main>
  );
}
