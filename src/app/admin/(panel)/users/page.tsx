import type { Metadata } from "next";
import { requireUser } from "@/cms/auth";
import { query, type RowDataPacket } from "@/cms/db";
import { deleteUserAction } from "../../actions";
import { formatDate, ui } from "../../ui";
import { ConfirmButton } from "../../ConfirmButton";
import { ChangePasswordForm, CreateUserForm } from "./UserForms";

export const metadata: Metadata = { title: "Users" };

export default async function UsersPage() {
  const currentUser = await requireUser();
  const users = await query<RowDataPacket & { id: number; name: string; email: string; created_at: Date; last_login_at: Date | null }>(
    "SELECT id, name, email, created_at, last_login_at FROM cms_users ORDER BY name",
  );

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className={ui.pageTitle}>Users</h1>
      <p className="mt-2 text-sm text-[#5a6056]">Everyone listed here can sign in, edit the website and read contact inquiries.</p>

      <ul className={`${ui.card} mt-8 divide-y divide-[#efeee6]`}>
        {users.map((user) => (
          <li key={user.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">
                {user.name} {user.id === currentUser.id ? <span className="text-xs font-normal text-[#5a6056]">(you)</span> : null}
              </p>
              <p className="truncate text-sm text-[#5a6056]">{user.email}</p>
            </div>
            <p className="text-xs text-[#5a6056]">Last sign-in: {formatDate(user.last_login_at)}</p>
            {user.id !== currentUser.id ? (
              <ConfirmButton action={deleteUserAction.bind(null, user.id)} message={`Remove ${user.name}’s access to the CMS?`} className="text-sm font-semibold text-red-700 hover:underline">
                Remove
              </ConfirmButton>
            ) : null}
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className={`${ui.card} p-5`}>
          <h2 className="font-semibold">Add a user</h2>
          <CreateUserForm />
        </section>
        <section className={`${ui.card} p-5`}>
          <h2 className="font-semibold">Change your password</h2>
          <ChangePasswordForm />
        </section>
      </div>
    </div>
  );
}
