import Image from "next/image";

import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stories = [
  {
    number: "01",
    image: "/images/home/featured-shafa-farms.webp",
    label: "Shafa Farms food production",
    category: "Investment — United Kingdom",
    title: "An integrated approach to halal food production.",
    description:
      "Shafa Farms operates an upgraded halal poultry processing facility in Warwickshire, bringing processing, portioning and added-value packing together at one location.",
    href: "/businesses/investment#shafa-farms",
  },
  {
    number: "02",
    image: "/images/home/featured-construction.webp",
    label: "Shafa construction operations",
    category: "Construction — UAE",
    title: "Capability built through more than four decades.",
    description:
      "From its construction origins in 1982, Shafa developed design-and-build, infrastructure, concrete and specialist production capabilities.",
    href: "/businesses/construction#shafa-construction",
  },
] as const;

export function FeaturedBusinessStories() {
  return (
    <section className="bg-[var(--shafa-sand)] py-[var(--section-space)]">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Across the group">Built through action</SectionHeading>
        </FadeIn>
        <div className="mt-16 space-y-24 lg:space-y-32">
          {stories.map((story, index) => (
            <article key={story.number} className="grid gap-9 lg:grid-cols-12 lg:items-center">
              <FadeIn className={`lg:col-span-7 ${index % 2 === 1 ? "lg:col-start-6" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--shafa-green-950)]">
                  <Image
                    src={story.image}
                    alt={story.label}
                    fill
                    sizes="(max-width: 1023px) 100vw, 58vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn className={`lg:col-span-4 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`} delay={0.08}>
                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-[0.16em] text-[var(--shafa-gold-muted)]">{story.number}</span>
                  <span aria-hidden="true" className="h-px w-12 bg-[var(--shafa-gold-muted)]" />
                </div>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-[var(--shafa-green-700)]/55">{story.category}</p>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.35rem,3.25vw,3.65rem)] leading-[1]">{story.title}</h3>
                <p className="mt-7 text-base leading-8 text-[var(--shafa-green-800)]/68">{story.description}</p>
                <LinkArrow href={story.href} className="mt-8">Read the story</LinkArrow>
              </FadeIn>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
