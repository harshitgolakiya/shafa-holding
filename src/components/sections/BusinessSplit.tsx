"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ActivePanel = "investment" | "construction" | null;

const panels = [
  {
    id: "investment" as const,
    number: "01",
    title: "Investment",
    href: "/businesses/investment",
    image: "/images/home/business-investment.webp",
    imageAlt: "Agricultural fields, livestock, irrigation and food-production infrastructure",
    themes: ["Agriculture", "Food Production", "Food Security", "Sustainable Supply"],
  },
  {
    id: "construction" as const,
    number: "02",
    title: "Construction",
    href: "/businesses/construction",
    image: "/images/home/business-construction.webp",
    imageAlt: "Marine construction, concrete works and heavy engineering equipment",
    themes: ["Design & Build", "Infrastructure", "Ready Mix", "Specialist Works"],
  },
];

export function BusinessSplit() {
  const [active, setActive] = useState<ActivePanel>(null);

  return (
    <div
      className="flex flex-col gap-px bg-[var(--shafa-gold-muted)]/40 lg:min-h-[46rem] lg:flex-row"
      onMouseLeave={() => setActive(null)}
    >
      {panels.map((panel) => (
        <article
          key={panel.id}
          className="group relative isolate min-h-[36rem] overflow-hidden bg-[var(--shafa-green-900)] text-white transition-[flex-grow] duration-700 ease-[var(--ease-out)] lg:min-h-0"
          style={{ flexGrow: active === null ? 1 : active === panel.id ? 1.38 : 0.72, flexBasis: 0 }}
          onMouseEnter={() => setActive(panel.id)}
          onFocusCapture={() => setActive(panel.id)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
          }}
        >
          <div className="absolute inset-0 opacity-65 transition-transform duration-1000 ease-[var(--ease-out)] group-hover:scale-[1.025] group-focus-within:scale-[1.025]">
            <Image
              src={panel.image}
              alt={panel.imageAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--shafa-green-950)] via-[var(--shafa-green-950)]/55 to-[var(--shafa-green-950)]/15" />
          <div className="relative flex h-full min-h-[36rem] flex-col justify-between p-[clamp(1.75rem,4vw,4.5rem)] lg:min-h-0">
            <div className="flex items-center gap-4">
              <span className="eyebrow">{panel.number}</span>
              <span aria-hidden="true" className="h-px w-12 bg-[var(--shafa-gold)] transition-[width] duration-500 group-hover:w-20 group-focus-within:w-20" />
            </div>
            <div>
              <ul className="mb-7 flex max-w-lg flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-white/55" aria-label={`${panel.title} capabilities`}>
                {panel.themes.map((theme) => <li key={theme}>{theme}</li>)}
              </ul>
              <Link
                href={panel.href}
                className="flex min-h-16 items-end justify-between gap-6 border-t border-white/25 pt-6 focus-visible:outline-offset-8"
                aria-label={`Explore ${panel.title}`}
              >
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,4.5vw,4.75rem)] leading-[0.9] tracking-[-0.03em]">{panel.title}</h3>
                <ArrowRight aria-hidden="true" className="mb-1 size-7 shrink-0 text-[var(--shafa-gold-light)] transition-transform duration-300 group-hover:translate-x-1.5 group-focus-within:translate-x-1.5" strokeWidth={1.25} />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
