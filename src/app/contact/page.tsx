import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Shafa Holding at its headquarters in Business Bay, Dubai, UAE.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact | Shafa Holding" },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-[var(--shafa-green-950)] text-[var(--shafa-ivory)]">
      <section className="pb-[var(--section-space)] pt-36 md:pt-44">
        <Container>
          <FadeIn>
            <p className="eyebrow">Contact Shafa</p>
            <h1 className="display-title mt-8 text-[clamp(3.75rem,7vw,7.25rem)]">Start a conversation.</h1>
          </FadeIn>
          <div className="mt-16 grid gap-16 border-t border-white/15 pt-14 lg:grid-cols-12">
            <FadeIn className="lg:col-span-4">
              <p className="eyebrow">Dubai headquarters</p>
              <address className="mt-7 not-italic font-[family-name:var(--font-display)] text-3xl leading-[1.3] text-white/85">
                {site.address.map((line) => <span key={line} className="block">{line}</span>)}
              </address>
              <div className="mt-10 border-l border-[var(--shafa-gold)] pl-5 text-sm leading-7 text-white/45">
                <p>Email and phone details will be published when supplied and approved by the client.</p>
              </div>
            </FadeIn>
            <FadeIn className="lg:col-span-7 lg:col-start-6" delay={0.08}>
              <ContactForm />
              <p className="mt-8 text-xs leading-6 text-white/36">The production submission provider and recipient must be configured before launch. No inquiry is stored by this website in its current placeholder configuration.</p>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}
