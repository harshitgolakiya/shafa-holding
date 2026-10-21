import Image from "next/image";

import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContentMap } from "@/cms/defaults";

export function FeaturedBusinessStories({ content }: { content: ContentMap["home"]["stories"] }) {
  return (
    <section className="bg-(--shafa-sand) py-(--section-space)">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow={content.eyebrow}>{content.title}</SectionHeading>
        </FadeIn>
        <div className="mt-16 space-y-24 lg:space-y-32">
          {content.items.map((story, index) => (
            <article key={index} className="grid gap-9 lg:grid-cols-12 lg:items-center">
              <FadeIn className={`lg:col-span-7 ${index % 2 === 1 ? "lg:col-start-6" : ""}`}>
                <div className="relative aspect-16/10 overflow-hidden bg-(--shafa-green-950)">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn className={`lg:col-span-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`} delay={0.08}>
                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-[0.16em] text-(--shafa-gold-muted)">{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true" className="h-px w-12 bg-(--shafa-gold-muted)" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-(--shafa-green-700)/55">{story.category}</p>
                <h3 className="mt-5 font-(family-name:--font-display) text-[clamp(2.35rem,3.25vw,3.65rem)] leading-none">{story.title}</h3>
                <p className="mt-7 text-base leading-8 text-(--shafa-green-800)/68">{story.description}</p>
                <LinkArrow href={story.href} className="mt-8">Read the story</LinkArrow>
              </FadeIn>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
