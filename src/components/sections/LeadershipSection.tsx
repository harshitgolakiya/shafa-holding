import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContentMap } from "@/cms/defaults";

type LeadershipPortraitProps = {
  image: string;
  name: string;
  sizes: string;
};

function LeadershipPortrait({ image, name, sizes }: LeadershipPortraitProps) {
  return (
    <div className="relative aspect-4/5 overflow-hidden bg-(--shafa-green-800)">
      <Image src={image} alt={`Portrait of ${name}`} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export function LeadershipSection({ content }: { content: ContentMap["about"]["leadership"] }) {
  const { chairman, team } = content;

  return (
    <section className="bg-(--shafa-ivory) py-(--section-space)">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow={content.eyebrow}>{content.title}</SectionHeading>
        </FadeIn>

        <article className="mt-16 grid gap-10 border-b border-(--shafa-green-900)/18 pb-20 lg:grid-cols-12 lg:items-center lg:pb-24">
          <FadeIn className="lg:col-span-5">
            <LeadershipPortrait image={chairman.image} name={chairman.name} sizes="(max-width: 1023px) 100vw, 40vw" />
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="eyebrow">{chairman.title}</p>
            <h3 className="mt-7 max-w-2xl font-(family-name:--font-display) text-[clamp(2.5rem,3.75vw,4rem)] leading-none">
              {chairman.name}
            </h3>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-(--shafa-gold-muted)">{chairman.company}</p>
            <GoldLine className="my-8 w-20" />
            <p className="max-w-xl text-base leading-8 text-(--shafa-green-800)/72">{chairman.bio}</p>
          </FadeIn>
        </article>

        <div className="pt-20 lg:pt-24">
          <FadeIn>
            <p className="eyebrow text-(--shafa-gold-muted)">{content.teamEyebrow}</p>
            <h3 className="mt-6 max-w-3xl font-(family-name:--font-display) text-[clamp(2.5rem,4vw,4.25rem)] leading-none">
              {content.teamTitle}
            </h3>
          </FadeIn>
          <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((leader, index) => (
              <FadeIn key={index} delay={(index % 3) * 0.04}>
                <article>
                  <LeadershipPortrait image={leader.image} name={leader.name} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 30vw" />
                  <h4 className="mt-6 font-(family-name:--font-display) text-[clamp(1.65rem,2.1vw,2.15rem)] leading-[1.08]">
                    {leader.name}
                  </h4>
                  <p className="mt-4 text-sm font-semibold uppercase leading-6 tracking-widest text-(--shafa-gold-muted)">{leader.title}</p>
                  <p className="mt-1 text-sm leading-6 text-(--shafa-green-800)/62">{leader.company}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
