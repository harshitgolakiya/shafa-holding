import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { businessNavigation, primaryNavigation } from "@/data/navigation";

type MobileMenuProps = {
  open: boolean;
  onNavigate: () => void;
};

export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  return (
    <div
      id="mobile-navigation"
      className={`absolute left-0 top-full w-full overflow-hidden bg-[var(--shafa-green-950)] text-white transition-[max-height,opacity] duration-500 ease-[var(--ease-out)] lg:hidden ${open ? "max-h-[calc(100svh-5rem)] border-t border-white/10 opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <nav aria-label="Mobile navigation" className="max-h-[calc(100svh-5rem)] overflow-y-auto px-[var(--page-gutter)] py-8">
        <ul>
          {primaryNavigation.map((item) =>
            item.href === "/businesses" ? (
              <li key={item.href} className="border-b border-white/12">
                <details className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between font-[family-name:var(--font-display)] text-2xl [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDown aria-hidden="true" className="size-5 text-[var(--shafa-gold-light)] transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-6">
                    <MobileBusinessGroup title="Investment" href="/businesses/investment" businesses={businessNavigation.investment} onNavigate={onNavigate} />
                    <MobileBusinessGroup title="Construction" href="/businesses/construction" businesses={businessNavigation.construction} onNavigate={onNavigate} />
                  </div>
                </details>
              </li>
            ) : (
              <li key={item.href} className="border-b border-white/12">
                <Link href={item.href} onClick={onNavigate} className="flex min-h-16 items-center font-[family-name:var(--font-display)] text-2xl">
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
        <p className="mt-10 max-w-xs text-sm leading-6 text-white/50">
          Building a Legacy of Resilience and Progress since 1982.
        </p>
      </nav>
    </div>
  );
}

type MobileBusinessGroupProps = {
  title: string;
  href: string;
  businesses: typeof businessNavigation.investment | typeof businessNavigation.construction;
  onNavigate: () => void;
};

function MobileBusinessGroup({ title, href, businesses, onNavigate }: MobileBusinessGroupProps) {
  return (
    <div className="mt-5">
      <Link href={href} onClick={onNavigate} className="eyebrow inline-block py-2">{title}</Link>
      <ul className="mt-1">
        {businesses.map((business) => (
          <li key={business.id}>
            <Link href={`${href}#${business.id}`} onClick={onNavigate} className="block py-2 text-sm leading-6 text-white/65">
              {business.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
