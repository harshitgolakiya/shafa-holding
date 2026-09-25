import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/45">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true" className="text-[var(--shafa-gold)]">/</span> : null}
            {item.href ? <Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link> : <span aria-current="page" className="text-white/72">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
