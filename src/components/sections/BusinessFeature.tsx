import { Check } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { LinkArrow } from "@/components/ui/LinkArrow";

type BusinessFeatureProps = {
  id: string;
  number: string;
  name: string;
  region?: string;
  introduction: string;
  capabilities: readonly string[];
  note: string;
  website: string;
  imageSrc: string;
  imageLabel: string;
  reverse?: boolean;
  tone?: "ivory" | "sand";
};

export function BusinessFeature({
  id,
  number,
  name,
  region,
  introduction,
  capabilities,
  note,
  website,
  imageSrc,
  imageLabel,
  reverse = false,
  tone = "ivory",
}: BusinessFeatureProps) {
  return (
    <article id={id} className={`${tone === "sand" ? "bg-[var(--shafa-sand)]" : "bg-[var(--shafa-ivory)]"} scroll-mt-24 py-[var(--section-space)]`}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <FadeIn className={`lg:col-span-7 ${reverse ? "lg:col-start-6" : ""}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--shafa-green-800)]">
            <Image src={imageSrc} alt={imageLabel} fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover" />
          </div>
        </FadeIn>
        <FadeIn className={`lg:col-span-4 ${reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`} delay={0.08}>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.18em] text-[var(--shafa-gold-muted)]">{number}</span>
            <span aria-hidden="true" className="h-px w-12 bg-[var(--shafa-gold-muted)]" />
            {region ? <span className="text-xs uppercase tracking-[0.15em] text-[var(--shafa-green-700)]/55">{region}</span> : null}
          </div>
          <h2 className="mt-7 font-[family-name:var(--font-display)] text-[clamp(2.65rem,3.75vw,4.25rem)] leading-[0.96]">{name}</h2>
          <p className="mt-8 text-base leading-8 text-[var(--shafa-green-800)]/72">{introduction}</p>
          <ul className="mt-8 grid gap-3 border-t border-[var(--shafa-green-900)]/16 pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2" aria-label={`${name} capabilities`}>
            {capabilities.map((capability) => (
              <li key={capability} className="flex gap-3 text-sm leading-6 text-[var(--shafa-green-800)]/68">
                <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[var(--shafa-gold-muted)]" strokeWidth={1.5} />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-l border-[var(--shafa-gold)] pl-5">
            <p className="text-sm leading-7 text-[var(--shafa-green-800)]/62">{note}</p>
          </div>
          <LinkArrow href={website} external className="mt-9">Visit website</LinkArrow>
        </FadeIn>
      </Container>
    </article>
  );
}
