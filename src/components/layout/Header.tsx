"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavigation } from "@/data/navigation";
import { BusinessMegaMenu } from "./BusinessMegaMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isTransparent = pathname === "/" && !scrolled && !mobileOpen;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,height,border-color] duration-500 ${isTransparent ? "h-24 border-transparent bg-transparent" : "h-20 border-b border-white/10 bg-[var(--shafa-green-950)]/98"}`}
    >
      <div className="mx-auto flex h-full w-full max-w-[var(--content-width)] items-center justify-between px-[var(--page-gutter)]">
        <Logo light />

        <nav aria-label="Primary navigation" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-9">
            {primaryNavigation.map((item) =>
              item.href === "/businesses" ? (
                <li key={item.href} className="group flex h-full items-center">
                  <details className="contents">
                    <summary className="relative flex h-full cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/78 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <ChevronDown aria-hidden="true" className="size-3.5 transition-transform group-has-[details[open]]:rotate-180" />
                      <span aria-hidden="true" className="absolute inset-x-0 bottom-5 h-px origin-left scale-x-0 bg-[var(--shafa-gold)] transition-transform duration-300 group-has-[details[open]]:scale-x-100" />
                    </summary>
                    <div className="absolute left-1/2 top-full w-[min(58rem,calc(100vw-4rem))] -translate-x-1/2 bg-[var(--shafa-green-900)] shadow-[0_30px_80px_rgba(0,0,0,.3)]">
                      <BusinessMegaMenu />
                    </div>
                  </details>
                </li>
              ) : (
                <li key={item.href} className="h-full">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="group relative flex h-full items-center text-xs font-semibold uppercase tracking-[0.15em] text-white/78 transition-colors hover:text-white"
                  >
                    {item.label}
                    <span aria-hidden="true" className={`absolute inset-x-0 bottom-5 h-px origin-left bg-[var(--shafa-gold)] transition-transform duration-300 ${pathname === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center lg:hidden"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <MobileMenu open={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
}
