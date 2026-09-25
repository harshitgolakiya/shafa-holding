import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { LinkArrow } from "@/components/ui/LinkArrow";

export function CTASection() {
  return (
    <section className="bg-[var(--shafa-green-900)] py-[var(--section-space)] text-[var(--shafa-ivory)]">
      <Container>
        <FadeIn>
          <p className="eyebrow">What comes next</p>
          <h2 className="display-title mt-8 max-w-5xl text-[clamp(3.25rem,6vw,6.25rem)]">
            Building resilience
            <br />
            for what comes next.
          </h2>
          <GoldLine className="my-10 w-[min(22rem,60vw)]" />
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-2xl text-base leading-8 text-white/62 md:col-span-7">
              Across industries, markets and generations, Shafa continues to pursue sustainable growth through decisive action and long-term thinking.
            </p>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <LinkArrow href="/businesses">Discover Our Businesses</LinkArrow>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
