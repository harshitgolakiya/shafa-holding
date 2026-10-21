import { getBusinesses, getContent } from "@/cms/content";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Footer } from "./Footer";
import { Header } from "./Header";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [businesses, settings] = await Promise.all([getBusinesses(), getContent("settings")]);

  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header businesses={businesses} mobileMenuText={settings.mobileMenuText} />
      {children}
      <Footer businesses={businesses} settings={settings} />
    </>
  );
}
