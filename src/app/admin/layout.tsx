import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "CMS", template: "%s | Shafa CMS" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="cms min-h-svh bg-[#f6f5f0] text-[#1c2417]">{children}</div>;
}
