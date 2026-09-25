import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";

const verifiedLocations = [
  { number: "01", place: "Dubai", country: "United Arab Emirates", role: "Headquarters" },
  { number: "02", place: "Warwickshire", country: "United Kingdom", role: "Shafa Farms" },
  { number: "03", place: "Iringa", country: "Tanzania", role: "Shafa Agro" },
] as const;

export function GlobalPresence() {
  return (
    <section className="overflow-hidden bg-[var(--shafa-green-800)] py-[var(--section-space)] text-[var(--shafa-ivory)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <p className="eyebrow">Global presence</p>
            <h2 className="display-title mt-7 text-[clamp(3rem,5.5vw,5.5rem)]">
              Rooted in Dubai.
              <br />
              Operating internationally.
            </h2>
            <p className="mt-9 max-w-xl text-base leading-8 text-white/62">
              Shafa is headquartered in Dubai, UAE, with verified business operations extending to the United Kingdom and Tanzania.
            </p>
          </FadeIn>
          <div className="relative lg:col-span-6 lg:col-start-7">
            <div aria-hidden="true" className="absolute -right-40 top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-[var(--shafa-gold)]/12 sm:size-[42rem]">
              <span className="absolute inset-[16%] rounded-full border border-[var(--shafa-gold)]/12" />
              <span className="absolute inset-[34%] rounded-full border border-[var(--shafa-gold)]/12" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--shafa-gold)]/10" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-[var(--shafa-gold)]/10" />
            </div>
            <div className="relative border-t border-white/15">
              {verifiedLocations.map((location, index) => (
                <FadeIn key={location.country} delay={index * 0.06} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/15 py-8 sm:grid-cols-[4rem_1.2fr_1fr] sm:items-end">
                  <span className="text-xs tracking-[0.16em] text-[var(--shafa-gold-light)]">{location.number}</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl leading-none">{location.place}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/42">{location.country}</p>
                  </div>
                  <p className="col-start-2 mt-3 text-sm text-white/58 sm:col-start-3 sm:mt-0 sm:text-right">{location.role}</p>
                </FadeIn>
              ))}
            </div>
            <p className="relative mt-6 text-xs leading-5 text-white/38">
              Only locations confirmed in the supplied company content are shown.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
