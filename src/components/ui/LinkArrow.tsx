import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type LinkArrowProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

export function LinkArrow({ href, children, external = false, className = "" }: LinkArrowProps) {
  const externalProps = external ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-3 border-b border-[var(--shafa-gold)] py-2 text-sm font-semibold uppercase tracking-[0.14em] ${className}`}
      {...externalProps}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        strokeWidth={1.5}
      />
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </Link>
  );
}
