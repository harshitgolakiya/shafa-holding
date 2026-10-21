import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { LinkArrow } from "@/components/ui/LinkArrow";

export default function NotFound() {
  return (
    <SiteShell>
      <main id="main-content" className="grid min-h-[75svh] place-items-center bg-(--shafa-green-950) py-36 text-(--shafa-ivory)">
        <Container className="text-center">
          <p className="display-title text-[clamp(6rem,18vw,14rem)] leading-[0.65] text-(--shafa-gold-muted)">404</p>
          <h1 className="display-title mt-14 text-[clamp(2.6rem,5vw,4.5rem)]">The page you&apos;re looking for has moved.</h1>
          <LinkArrow href="/" className="mt-10">Return Home</LinkArrow>
        </Container>
      </main>
    </SiteShell>
  );
}
