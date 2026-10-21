import type { Metadata } from "next";
import { getContent } from "@/cms/content";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { phoneHref } from "@/components/ui/Lines";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContent("contact");
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: "/contact" },
    openGraph: { url: "/contact", title: `${page.seoTitle} | Shafa Holding` },
  };
}

export default async function ContactPage() {
  const [page, site] = await Promise.all([getContent("contact"), getContent("settings")]);
  return (
    <main id="main-content" className="bg-(--shafa-green-950) text-(--shafa-ivory)">
      <section className="pb-(--section-space) pt-36 md:pt-44">
        <Container>
          <FadeIn>
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="display-title mt-8 text-[clamp(3.75rem,7vw,7.25rem)]">{page.title}</h1>
          </FadeIn>
          <div className="mt-16 grid gap-16 border-t border-white/15 pt-14 lg:grid-cols-12">
            <FadeIn className="lg:col-span-4">
              <p className="eyebrow">{page.officeLabel}</p>
              <div className="mt-8 space-y-8">
                <ContactDetail label="Address">
                  <address className="not-italic">
                    <span className="block">{site.legalName}</span>
                    {site.address.map((line) => <span key={line} className="block">{line}</span>)}
                  </address>
                </ContactDetail>
                <ContactDetail label="Phone">
                  <a className="transition-colors hover:text-white" href={phoneHref(site.phone)}>{site.phone}</a>
                </ContactDetail>
                <ContactDetail label="Email">
                  <a className="transition-colors hover:text-white" href={`mailto:${site.email}`}>{site.email}</a>
                </ContactDetail>
                <ContactDetail label="Working hours">
                  <p>{site.workingHours}</p>
                </ContactDetail>
              </div>
            </FadeIn>
            <FadeIn className="lg:col-span-7 lg:col-start-6" delay={0.08}>
              <ContactForm inquiryTypes={page.inquiryTypes} />
              {page.formNote ? <p className="mt-8 text-xs leading-6 text-white/36">{page.formNote}</p> : null}
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ContactDetail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-(--shafa-gold) pl-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--shafa-gold)">{label}</p>
      <div className="mt-2 text-base leading-7 text-white/75">{children}</div>
    </div>
  );
}
