import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { countUsers, getCurrentUser } from "@/cms/auth";
import { isDatabaseConfigured } from "@/cms/db";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  let notice: string | null = null;
  let signedIn = false;

  if (!isDatabaseConfigured()) {
    notice = "The database isn’t configured yet. Set DATABASE_URL (or MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE) on the server.";
  } else {
    try {
      signedIn = Boolean(await getCurrentUser());
      if ((await countUsers()) === 0 && !process.env.CMS_ADMIN_EMAIL) {
        notice = "No CMS users exist yet. Set CMS_ADMIN_EMAIL and CMS_ADMIN_PASSWORD on the server, then sign in with them to create the first administrator.";
      }
    } catch (error) {
      console.error("[cms] Database check failed", error);
      notice = "Could not connect to the database. Check the connection settings on the server.";
    }
  }

  if (signedIn) redirect("/admin");

  return (
    <main className="grid min-h-svh place-items-center bg-[#1c2417] px-4 py-16">
      <div className="w-full max-w-sm">
        <Image src="/final-logo.svg" alt="Shafa Holding" width={138} height={30} className="mx-auto h-auto w-40" unoptimized loading="eager" />
        <div className="mt-10 rounded-lg bg-white p-7 shadow-xl">
          <h1 className="font-(family-name:--font-display) text-3xl leading-none">Content manager</h1>
          <p className="mt-2 text-sm text-[#5a6056]">Sign in to edit the website and read contact inquiries.</p>
          {notice ? <p className="mt-5 rounded-md bg-amber-50 p-3 text-xs leading-5 text-amber-900">{notice}</p> : null}
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
