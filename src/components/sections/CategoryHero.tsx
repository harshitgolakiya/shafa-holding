import Image from "next/image";

import { FadeIn } from "@/components/motion/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

type CategoryHeroProps = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageLabel: string;
};

export function CategoryHero({ number, eyebrow, title, description, imageSrc, imageLabel }: CategoryHeroProps) {
  return (
    <section className="bg-[var(--shafa-green-950)] pb-[var(--section-space)] pt-36 text-[var(--shafa-ivory)] md:pt-44">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Our Businesses", href: "/businesses" }, { label: title }]} />
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-8">
            <div className="flex items-center gap-5">
              <span className="eyebrow">{number}</span>
              <span aria-hidden="true" className="h-px w-16 bg-[var(--shafa-gold)]" />
              <span className="eyebrow">{eyebrow}</span>
            </div>
            <h1 className="display-title mt-8 text-[clamp(3.75rem,7vw,7.25rem)]">{title}</h1>
          </FadeIn>
          <FadeIn className="lg:col-span-3 lg:col-start-10" delay={0.08}>
            <p className="text-base leading-8 text-white/62">{description}</p>
          </FadeIn>
        </div>
        <FadeIn className="mt-16" delay={0.12}>
          <div className="relative aspect-[16/7] min-h-[24rem] overflow-hidden bg-[var(--shafa-green-800)]">
            <Image src={imageSrc} alt={imageLabel} fill sizes="(max-width: 1440px) 100vw, 1440px" className="object-cover" />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
