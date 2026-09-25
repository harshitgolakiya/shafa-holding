import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Shafa Holding website.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="bg-[var(--shafa-ivory)] pb-[var(--section-space)] pt-36 md:pt-44">
      <Container className="max-w-4xl">
        <p className="eyebrow text-[var(--shafa-gold-muted)]">Legal</p>
        <h1 className="display-title mt-8 text-[clamp(3.5rem,6vw,6rem)]">Privacy</h1>
        <div className="mt-12 border-l border-[var(--shafa-gold)] bg-[var(--shafa-sand)] p-7 text-sm leading-7 text-[var(--shafa-green-800)]/72">
          <strong className="block text-[var(--shafa-green-900)]">Client legal content required</strong>
          <p className="mt-2">[CLIENT TO PROVIDE AND APPROVE THE FINAL PRIVACY POLICY BEFORE PUBLIC LAUNCH.]</p>
        </div>
        <div className="mt-12 space-y-8 text-base leading-8 text-[var(--shafa-green-800)]/68">
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--shafa-green-950)]">Current development behavior</h2>
            <p className="mt-4">The placeholder contact endpoint validates submitted fields but is not connected to an email, database or third-party provider. Valid submissions return a configuration notice and are not retained by the website.</p>
          </section>
          <section>
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--shafa-green-950)]">Before launch</h2>
            <p className="mt-4">The final policy must describe the approved hosting, analytics, cookie, contact-form, retention and data-subject request practices actually used in production. Those details must not be assumed.</p>
          </section>
        </div>
      </Container>
    </main>
  );
}
