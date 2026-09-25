import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: { absolute: "About Shafa Holding | Our Legacy" },
  description:
    "Discover Shafa Holding’s progression from its construction origins in 1982 to a diversified international group focused on essential industries.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Shafa Holding | Our Legacy",
    description:
      "Four decades of resilience, progress and purposeful growth across construction and sustainable agricultural businesses.",
  },
};

const milestones = [
  {
    year: "1982",
    title: "A foundation in construction",
    text: "Shafa is established as a construction company and develops specialist design-and-build, marine and infrastructure capability.",
  },
  {
    year: "2003",
    title: "Ready-mix operations begin",
    text: "Shafa begins operating as a high-quality concrete supplier, supporting high-capacity projects and developing on-site batching expertise.",
  },
  {
    year: "2015+",
    title: "Sustainable diversification",
    text: "The group expands into sustainable agricultural businesses, with a focus on resilience, food supply and long-term operating value.",
  },
  {
    year: "Today",
    title: "A diversified international group",
    text: "Shafa operates across construction, specialist services and agricultural businesses while retaining its long-term approach to decision-making.",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="bg-[var(--shafa-green-950)] pb-[var(--section-space)] pt-36 text-[var(--shafa-ivory)] md:pt-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <FadeIn className="lg:col-span-8">
              <p className="eyebrow">About Shafa</p>
              <h1 className="display-title mt-8 text-[clamp(3.5rem,6.5vw,6.5rem)]">
                Four decades of resilience,
                <br />
                <span className="text-[var(--shafa-gold-light)]">progress and purposeful growth.</span>
              </h1>
            </FadeIn>
            <FadeIn className="lg:col-span-3 lg:col-start-10" delay={0.08}>
              <p className="text-base leading-8 text-white/62">
                From construction heritage to a diversified group operating across essential industries.
              </p>
            </FadeIn>
          </div>
          <FadeIn className="mt-16" delay={0.12}>
            <div className="relative aspect-[16/7] min-h-[24rem] overflow-hidden bg-[var(--shafa-green-800)]">
              <Image
                src="/images/about/hero-heritage.webp"
                alt="Shafa Holding corporate heritage in Dubai"
                fill
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--shafa-sand)] py-[var(--section-space)]">
        <Container className="grid gap-14 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow text-[var(--shafa-gold-muted)]">Our story</p>
            <p className="display-title mt-7 text-[clamp(3.25rem,5.5vw,5.75rem)] text-[var(--shafa-green-900)]">Built from experience.</p>
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.5] text-[var(--shafa-green-800)]/82">
              Established as a construction company in 1982, Shafa developed the specialist capability and operational discipline that continue to shape the group today.
            </p>
            <GoldLine className="my-10 w-24" />
            <div className="grid gap-7 text-base leading-8 text-[var(--shafa-green-800)]/68 sm:grid-cols-2">
              <p>
                Its foundation in design-and-build, marine and infrastructure work created a practical culture focused on delivery, resilience and decisive action.
              </p>
              <p>
                Since 2015, the group has diversified into sustainable agricultural businesses while maintaining a long-term view of essential industries.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-[var(--shafa-ivory)] py-[var(--section-space)]">
        <Container>
          <FadeIn>
            <SectionHeading eyebrow="Our progression">A legacy still in motion.</SectionHeading>
          </FadeIn>
          <ol className="mt-16 border-t border-[var(--shafa-green-900)]/20">
            {milestones.map((milestone, index) => (
              <li key={milestone.year} className="grid gap-5 border-b border-[var(--shafa-green-900)]/20 py-10 md:grid-cols-12 md:items-start md:py-14">
                <FadeIn className="md:col-span-3" delay={index * 0.03}>
                  <p className="display-title text-[clamp(3rem,4.5vw,4.75rem)] text-[var(--shafa-gold-muted)]">{milestone.year}</p>
                </FadeIn>
                <FadeIn className="md:col-span-4" delay={index * 0.03 + 0.04}>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl leading-none">{milestone.title}</h3>
                </FadeIn>
                <FadeIn className="md:col-span-4 md:col-start-9" delay={index * 0.03 + 0.08}>
                  <p className="text-base leading-8 text-[var(--shafa-green-800)]/68">{milestone.text}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-[var(--shafa-green-800)] py-[var(--section-space)] text-[var(--shafa-ivory)]">
        <Container className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow">Our promise</p>
            <p className="display-title mt-7 text-[clamp(3rem,5vw,5rem)]">To make things happen.</p>
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.75vw,2.75rem)] leading-[1.3] text-white/86">
              We have a track record of getting things done. Our model is based on resilience, we make level-headed decisions. We always deliver what we promise.
            </p>
          </FadeIn>
        </Container>
      </section>

      <LeadershipSection />
    </main>
  );
}
