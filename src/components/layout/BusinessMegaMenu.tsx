import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { businessNavigation } from "@/data/navigation";

export function BusinessMegaMenu() {
  return (
    <div className="grid grid-cols-2 gap-14 border-t border-white/15 px-10 py-10">
      <BusinessColumn
        index="01"
        title="Investment"
        href="/businesses/investment"
        businesses={businessNavigation.investment}
      />
      <BusinessColumn
        index="02"
        title="Construction"
        href="/businesses/construction"
        businesses={businessNavigation.construction}
      />
    </div>
  );
}

type BusinessColumnProps = {
  index: string;
  title: string;
  href: string;
  businesses: typeof businessNavigation.investment | typeof businessNavigation.construction;
};

function BusinessColumn({ index, title, href, businesses }: BusinessColumnProps) {
  return (
    <div>
      <Link href={href} className="group flex items-baseline justify-between gap-4 border-b border-[var(--shafa-gold)]/45 pb-4">
        <span className="eyebrow">{index} — {title}</span>
        <ArrowUpRight aria-hidden="true" className="size-4 text-[var(--shafa-gold-light)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Link>
      <ul className="mt-5 space-y-1">
        {businesses.map((business) => (
          <li key={business.id}>
            <Link
              href={`${href}#${business.id}`}
              className="block py-2 font-[family-name:var(--font-display)] text-2xl leading-tight text-white/80 transition-colors hover:text-white focus-visible:text-white"
            >
              {business.name}
              {business.region ? <span className="ml-2 font-[family-name:var(--font-sans)] text-[0.65rem] uppercase tracking-[0.15em] text-white/40">{business.region}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
