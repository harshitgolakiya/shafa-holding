import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { Lines } from "@/components/ui/Lines";
import { LinkArrow } from "@/components/ui/LinkArrow";
import type { ContentMap } from "@/cms/defaults";

export function CTASection({ content }: { content: ContentMap["home"]["cta"] }) {
  return (
    <section className="bg-(--forest-soft) py-(--section-space) text-(--shafa-ivory)">
      <Container>
        <FadeIn>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="display-title mt-8 max-w-5xl text-[clamp(3.25rem,6vw,6.25rem)]">
            <Lines text={content.title} />
          </h2>
          <GoldLine className="my-10 w-[min(22rem,60vw)]" />
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-2xl text-base leading-8 text-white/62 md:col-span-7">{content.text}</p>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <LinkArrow href="/businesses">{content.linkLabel}</LinkArrow>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
