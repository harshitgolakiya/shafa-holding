import type { Metadata } from "next";
import { getContent } from "@/cms/content";
import { Container } from "@/components/ui/Container";
import { paragraphs } from "@/components/ui/Lines";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Shafa Holding website.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default async function PrivacyPage() {
  const page = await getContent("privacy");

  return (
    <main id="main-content" className="bg-(--shafa-ivory) pb-(--section-space) pt-36 md:pt-44">
      <Container className="max-w-4xl">
        <p className="eyebrow text-(--shafa-gold-muted)">Legal</p>
        <h1 className="display-title mt-8 text-[clamp(3.5rem,6vw,6rem)]">{page.title}</h1>
        <div className="mt-12 space-y-8 text-base leading-8 text-(--shafa-green-800)/68">
          {page.sections.map((section, index) => (
            <section key={index}>
              <h2 className="font-(family-name:--font-display) text-3xl text-(--shafa-green-950)">{section.heading}</h2>
              {paragraphs(section.body).map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="mt-4">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
