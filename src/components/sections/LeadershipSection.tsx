import { FadeIn } from "@/components/motion/FadeIn";
import { Container } from "@/components/ui/Container";
import { GoldLine } from "@/components/ui/GoldLine";
import { SectionHeading } from "@/components/ui/SectionHeading";

const chairman = {
  assetId: "LEADERSHIP-01",
  name: "Mr Abdoshamakh Nasser Al Shebani",
  title: "Founder / Chairman",
  company: "Shafa Holding Ltd.",
  bio: "Under his leadership, Shafa has grown from its construction beginnings in 1982 into a diversified international group built on integrity, precision and a long-term commitment to responsible growth.",
} as const;

const leadershipTeam = [
  {
    assetId: "LEADERSHIP-02",
    name: "Mr Mohammed Abdoshamak Nasser",
    title: "Managing Director",
    company: "Shafa Holding",
  },
  {
    assetId: "LEADERSHIP-03",
    name: "Mr Momen Abdoshamak Nasser",
    title: "Managing Director",
    company: "Shafa Agro — Tanzania",
  },
  {
    assetId: "LEADERSHIP-04",
    name: "Mr Munthir Abdoshamak Nasser",
    title: "Associate Director",
    company: "Business & Commercial Strategy",
  },
  {
    assetId: "LEADERSHIP-05",
    name: "Mr Aref Mohammed Derhem",
    title: "General Manager",
    company: "Operations",
  },
  {
    assetId: "LEADERSHIP-06",
    name: "Mr Saji Devasia",
    title: "Chief Financial Officer",
    company: "Shafa Holding",
  },
  {
    assetId: "LEADERSHIP-07",
    name: "Mr Jeff Seol",
    title: "Director — Engineering & Tendering",
    company: "Shafa Holding",
  },
  {
    assetId: "LEADERSHIP-08",
    name: "Mr Park Hee Moon",
    title: "Director — Project Planning & Management",
    company: "Shafa Holding",
  },
  {
    assetId: "LEADERSHIP-09",
    name: "Mr Vijay Sadashiv Shinde",
    title: "Director — Corporate Procurement & Readymix Operations",
    company: "Shafa Holding",
  },
  {
    assetId: "LEADERSHIP-10",
    name: "Mr Prakash Vasudevan",
    title: "Director — Human Capital Management",
    company: "Shafa Holding",
  },
] as const;

type LeadershipPortraitProps = {
  assetId: string;
  name: string;
};

function LeadershipPortrait({ assetId, name }: LeadershipPortraitProps) {
  return (
    <div
      className="relative isolate aspect-[4/5] overflow-hidden bg-[var(--shafa-green-800)] text-[var(--shafa-ivory)]"
      role="img"
      aria-label={`Official portrait of ${name} pending.`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35 [background-image:linear-gradient(145deg,transparent_0%,transparent_58%,rgba(169,138,61,.65)_58.1%,rgba(169,138,61,.65)_58.4%,transparent_58.5%),radial-gradient(circle_at_50%_38%,rgba(255,255,255,.12),transparent_28%)]"
      />
      <div className="absolute inset-x-6 bottom-6 border-t border-white/20 pt-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--shafa-gold-light)]">{assetId}</p>
        <p className="mt-2 text-xs text-white/55">Official portrait pending</p>
      </div>
    </div>
  );
}

export function LeadershipSection() {
  return (
    <section className="bg-[var(--shafa-ivory)] py-[var(--section-space)]">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Leadership">Guided by experience.</SectionHeading>
        </FadeIn>

        <article className="mt-16 grid gap-10 border-b border-[var(--shafa-green-900)]/18 pb-20 lg:grid-cols-12 lg:items-center lg:pb-24">
          <FadeIn className="lg:col-span-5">
            <LeadershipPortrait assetId={chairman.assetId} name={chairman.name} />
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="eyebrow">{chairman.title}</p>
            <h3 className="mt-7 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,3.75vw,4rem)] leading-[1]">
              {chairman.name}
            </h3>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--shafa-gold-muted)]">{chairman.company}</p>
            <GoldLine className="my-8 w-20" />
            <p className="max-w-xl text-base leading-8 text-[var(--shafa-green-800)]/72">{chairman.bio}</p>
          </FadeIn>
        </article>

        <div className="pt-20 lg:pt-24">
          <FadeIn>
            <p className="eyebrow text-[var(--shafa-gold-muted)]">Executive leadership</p>
            <h3 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,4vw,4.25rem)] leading-none">
              The team behind the group.
            </h3>
          </FadeIn>
          <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipTeam.map((leader, index) => (
              <FadeIn key={leader.name} delay={(index % 3) * 0.04}>
                <article>
                  <LeadershipPortrait assetId={leader.assetId} name={leader.name} />
                  <h4 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(1.65rem,2.1vw,2.15rem)] leading-[1.08]">
                    {leader.name}
                  </h4>
                  <p className="mt-4 text-sm font-semibold uppercase leading-6 tracking-[0.1em] text-[var(--shafa-gold-muted)]">{leader.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--shafa-green-800)]/62">{leader.company}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
