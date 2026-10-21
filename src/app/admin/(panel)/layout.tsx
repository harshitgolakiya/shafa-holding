import { requireUser } from "@/cms/auth";
import { countByStatus } from "@/cms/submissions";
import { logoutAction } from "../actions";
import { Sidebar } from "./Sidebar";

export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser();
  const counts = await countByStatus();

  return (
    <div className="lg:flex">
      <Sidebar userName={user.name} newInquiries={counts.new} logout={logoutAction} />
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
    </div>
  );
}
