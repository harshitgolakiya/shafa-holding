import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ContentMap } from "@/cms/defaults";

export function ValuesSection({ content }: { content: ContentMap["home"]["values"] }) {
  return (
    <section className="bg-(--shafa-ivory) py-(--section-space)">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow={content.eyebrow}>{content.title}</SectionHeading>
        </FadeIn>
        <div className="mt-12 grid lg:grid-cols-2">
          {content.items.map((value, index) => (
            <FadeIn
              key={index}
              delay={index * 0.05}
              className="min-w-0 border-t border-(--shafa-green-900)/20 py-9 sm:py-10 lg:min-h-64 lg:px-10 lg:even:border-l lg:odd:pl-0 lg:odd:pr-12"
            >
              <p className="text-xs font-bold tracking-[0.18em] text-(--shafa-gold-muted)">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-7 font-(family-name:--font-display) text-[clamp(2rem,3vw,3rem)] leading-[1.02]">{value.title}</h3>
              <p className="mt-5 max-w-lg text-base leading-7 text-(--shafa-green-800)/68">{value.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
