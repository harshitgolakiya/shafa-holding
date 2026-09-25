import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/data/values";

export function ValuesSection() {
  return (
    <section className="bg-[var(--shafa-ivory)] py-[var(--section-space)]">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Our core values">How We Work</SectionHeading>
        </FadeIn>
        <div className="mt-16 grid md:grid-cols-2">
          {values.map((value, index) => (
            <FadeIn
              key={value.number}
              delay={index * 0.05}
              className="border-t border-[var(--shafa-green-900)]/20 py-10 md:min-h-72 md:px-10 md:first:pl-0 md:[&:nth-child(even)]:border-l md:[&:nth-child(odd)]:pr-12"
            >
              <p className="text-xs font-bold tracking-[0.18em] text-[var(--shafa-gold-muted)]">{value.number}</p>
              <h3 className="mt-8 font-[family-name:var(--font-display)] text-[clamp(2.15rem,3vw,3.25rem)] leading-[1.02]">{value.title}</h3>
              <p className="mt-6 max-w-md text-base leading-8 text-[var(--shafa-green-800)]/68">{value.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
