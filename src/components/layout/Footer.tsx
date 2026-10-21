import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { BusinessNavigation } from "@/cms/content";
import type { ContentMap } from "@/cms/defaults";
import { phoneHref } from "@/components/ui/Lines";
import { primaryNavigation } from "@/data/navigation";
import { Logo } from "./Logo";

type FooterProps = {
  businesses: BusinessNavigation;
  settings: ContentMap["settings"];
};

export function Footer({ businesses, settings }: FooterProps) {
  return (
    <footer className="bg-(--shafa-green-950) text-white">
      <Container className="py-16 md:py-24">
        <div className="grid gap-14 border-b border-white/12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-8 max-w-sm text-sm leading-7 text-white/68">{settings.footerText}</p>
          </div>
          <FooterColumn title="Explore" className="md:col-span-2">
            {primaryNavigation.map((item) => <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>)}
          </FooterColumn>
          <FooterColumn title="Businesses" className="md:col-span-3">
            {[...businesses.investment, ...businesses.construction].map((business) => (
              <FooterLink key={business.id} href={`/businesses/${business.category}#${business.id}`}>{business.name}</FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Dubai Office" className="md:col-span-2">
            <address className="not-italic text-sm leading-7 text-white/55">
              <span className="block">{settings.legalName}</span>
              {settings.address.map((line) => <span key={line} className="block">{line}</span>)}
            </address>
            <a href={phoneHref(settings.phone)} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">{settings.phone}</a>
            <a href={`mailto:${settings.email}`} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">{settings.email}</a>
          </FooterColumn>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-xs tracking-[0.08em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-5">{title}</p>
      <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="text-sm leading-6 text-white/55 transition-colors hover:text-white">{children}</Link>;
}
