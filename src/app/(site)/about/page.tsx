import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/cms/content";
import { FadeIn } from "@/components/motion/FadeIn";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getContent("about");
  return {
    title: { absolute: about.seoTitle },
    description: about.seoDescription,
    alternates: { canonical: "/about" },
    openGraph: { url: "/about", title: about.seoTitle, description: about.seoDescription },
  };
}

export default async function AboutPage() {
  const about = await getContent("about");
  return (
    <main id="main-content">
      <section className="bg-(--shafa-green-950) pb-(--section-space) pt-36 text-(--shafa-ivory) md:pt-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <FadeIn className="lg:col-span-8">
              <p className="eyebrow">{about.hero.eyebrow}</p>
              <h1 className="display-title mt-8 text-[clamp(3.5rem,6.5vw,6.5rem)]">
                {about.hero.title}
                <br />
                <span className="text-(--shafa-gold-light)">{about.hero.titleAccent}</span>
              </h1>
            </FadeIn>
            <FadeIn className="lg:col-span-3 lg:col-start-10" delay={0.08}>
              <p className="text-base leading-8 text-white/62">{about.hero.text}</p>
            </FadeIn>
          </div>
          <FadeIn className="mt-16" delay={0.12}>
            <div className="relative aspect-16/7 min-h-96 overflow-hidden bg-(--shafa-green-800)">
              <Image
                src={about.hero.image}
                alt={about.hero.imageAlt}
                fill
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-(--shafa-sand) py-(--section-space)">
        <Container className="grid gap-14 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow text-(--shafa-gold-muted)">{about.story.eyebrow}</p>
            <p className="display-title mt-7 text-[clamp(3.25rem,5.5vw,5.75rem)] text-(--shafa-green-900)">{about.story.title}</p>
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-normal text-(--shafa-green-800)/82">{about.story.lead}</p>
            <GoldLine className="my-10 w-24" />
            <div className="grid gap-7 text-base leading-8 text-(--shafa-green-800)/68 sm:grid-cols-2">
              {about.story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-(--shafa-ivory) py-(--section-space)">
        <Container>
          <FadeIn>
            <SectionHeading eyebrow={about.milestones.eyebrow}>{about.milestones.title}</SectionHeading>
          </FadeIn>
          <ol className="mt-16 border-t border-(--shafa-green-900)/20">
            {about.milestones.items.map((milestone, index) => (
              <li key={index} className="grid gap-5 border-b border-(--shafa-green-900)/20 py-10 md:grid-cols-12 md:items-start md:py-14">
                <FadeIn className="md:col-span-3" delay={index * 0.03}>
                  <p className="display-title text-[clamp(3rem,4.5vw,4.75rem)] text-(--shafa-gold-muted)">{milestone.year}</p>
                </FadeIn>
                <FadeIn className="md:col-span-4" delay={index * 0.03 + 0.04}>
                  <h3 className="font-(family-name:--font-display) text-3xl leading-none">{milestone.title}</h3>
                </FadeIn>
                <FadeIn className="md:col-span-4 md:col-start-9" delay={index * 0.03 + 0.08}>
                  <p className="text-base leading-8 text-(--shafa-green-800)/68">{milestone.text}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-(--shafa-green-800) py-(--section-space) text-(--shafa-ivory)">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow">{about.promise.eyebrow}</p>
            <p className="display-title mt-7 text-[clamp(3rem,5vw,5rem)]">{about.promise.title}</p>
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="font-(family-name:--font-display) text-[clamp(1.75rem,2.75vw,2.75rem)] leading-[1.3] text-white/86">
              {about.promise.text}
            </p>
          </FadeIn>
        </Container>
      </section>

      <LeadershipSection content={about.leadership} />
    </main>
  );
}
