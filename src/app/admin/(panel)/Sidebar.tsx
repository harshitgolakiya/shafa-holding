"use client";

import { ExternalLink, FileText, Image as ImageIcon, Inbox, LayoutDashboard, LogOut, Menu, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Pages & content", icon: FileText },
  { href: "/admin/inbox", label: "Contact inbox", icon: Inbox },
  { href: "/admin/media", label: "Media library", icon: ImageIcon },
  { href: "/admin/users", label: "Users", icon: Users },
];

type SidebarProps = {
  userName: string;
  newInquiries: number;
  logout: () => Promise<void>;
};

export function Sidebar({ userName, newInquiries, logout }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="bg-[#1c2417] text-white lg:sticky lg:top-0 lg:flex lg:h-svh lg:w-64 lg:shrink-0 lg:flex-col">
      <div className="flex h-16 items-center justify-between px-5 lg:h-20">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/final-logo.svg" alt="Shafa Holding" width={138} height={30} className="h-auto w-28" unoptimized loading="eager" />
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[#c8b778]">CMS</span>
        </Link>
        <button type="button" className="grid size-10 place-items-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className={`${open ? "block" : "hidden"} border-t border-white/10 lg:flex lg:flex-1 lg:flex-col lg:border-0`}>
        <nav aria-label="CMS" className="flex-1 space-y-1 p-3">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${active ? "bg-white/10 font-semibold text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon aria-hidden="true" className="size-4" />
                <span className="flex-1">{label}</span>
                {href === "/admin/inbox" && newInquiries > 0 ? (
                  <span className="rounded-full bg-[#c8b778] px-2 py-0.5 text-xs font-bold text-[#1c2417]">{newInquiries}</span>
                ) : null}
              </Link>
            );
          })}
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/5 hover:text-white">
            <ExternalLink aria-hidden="true" className="size-4" />
            View website
          </a>
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-xs text-white/50">Signed in as</p>
          <p className="truncate text-sm font-semibold">{userName}</p>
          <form action={logout} className="mt-3">
            <button type="submit" className="flex items-center gap-2 text-sm text-white/65 transition hover:text-white">
              <LogOut aria-hidden="true" className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
