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
        <div className="mt-12 grid lg:grid-cols-2">
          {values.map((value, index) => (
            <FadeIn
              key={value.number}
              delay={index * 0.05}
              className="min-w-0 border-t border-[var(--shafa-green-900)]/20 py-9 sm:py-10 lg:min-h-64 lg:px-10 lg:[&:nth-child(even)]:border-l lg:[&:nth-child(odd)]:pl-0 lg:[&:nth-child(odd)]:pr-12"
            >
              <p className="text-xs font-bold tracking-[0.18em] text-[var(--shafa-gold-muted)]">{value.number}</p>
              <h3 className="mt-7 font-[family-name:var(--font-display)] text-[clamp(2rem,3vw,3rem)] leading-[1.02]">{value.title}</h3>
              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--shafa-green-800)]/68">{value.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
