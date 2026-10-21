import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import type { ContentMap } from "@/cms/defaults";

export function GlobalPresence({ content }: { content: ContentMap["home"]["presence"] }) {
  return (
    <section className="overflow-hidden bg-(--shafa-green-800) py-(--section-space) text-(--shafa-ivory)">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display-title mt-7 text-[clamp(3rem,5.5vw,5.5rem)]">
              <Lines text={content.title} />
            </h2>
            <p className="mt-9 max-w-xl text-base leading-8 text-white/62">{content.text}</p>
          </FadeIn>
          <div className="relative lg:col-span-6 lg:col-start-7">
            <div aria-hidden="true" className="absolute -right-40 top-1/2 size-136 -translate-y-1/2 rounded-full border border-(--shafa-gold)/12 sm:size-168">
              <span className="absolute inset-[16%] rounded-full border border-(--shafa-gold)/12" />
              <span className="absolute inset-[34%] rounded-full border border-(--shafa-gold)/12" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-(--shafa-gold)/10" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-(--shafa-gold)/10" />
            </div>
            <div className="relative border-t border-white/15">
              {content.locations.map((location, index) => (
                <FadeIn key={index} delay={index * 0.06} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/15 py-8 sm:grid-cols-[4rem_1.2fr_1fr] sm:items-end">
                  <span className="text-xs tracking-[0.16em] text-(--shafa-gold-light)">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-(family-name:--font-display) text-3xl leading-none">{location.place}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/42">{location.country}</p>
                  </div>
                  <p className="col-start-2 mt-3 text-sm text-white/58 sm:col-start-3 sm:mt-0 sm:text-right">{location.role}</p>
                </FadeIn>
              ))}
            </div>
            {content.note ? <p className="relative mt-6 text-xs leading-5 text-white/38">{content.note}</p> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
