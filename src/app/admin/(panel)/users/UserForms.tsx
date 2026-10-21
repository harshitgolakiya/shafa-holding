"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePasswordAction, createUserAction, type FormState } from "../../actions";
import { ui } from "../../ui";

function useResetOnSuccess(state: FormState) {
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok) form.current?.reset();
  }, [state]);
  return form;
}

function Message({ state }: { state: FormState }) {
  if (!state.message) return null;
  return <p role="status" className={`text-sm ${state.ok ? "text-green-700" : "text-red-700"}`}>{state.message}</p>;
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className={ui.label}>{label}</span>
      <input {...props} className={`${ui.input} mt-1.5`} />
    </label>
  );
}

export function CreateUserForm() {
  const [state, action, pending] = useActionState(createUserAction, {});
  const form = useResetOnSuccess(state);

  return (
    <form ref={form} action={action} className="mt-4 space-y-4">
      <Input label="Name" name="name" required maxLength={120} />
      <Input label="Email" name="email" type="email" required maxLength={254} />
      <Input label="Temporary password" name="password" type="password" autoComplete="new-password" required minLength={10} />
      <p className={ui.help}>Share the password with them securely; they can change it after signing in.</p>
      <Message state={state} />
      <button type="submit" disabled={pending} className={ui.button}>{pending ? "Adding…" : "Add user"}</button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, {});
  const form = useResetOnSuccess(state);

  return (
    <form ref={form} action={action} className="mt-4 space-y-4">
      <Input label="Current password" name="current" type="password" autoComplete="current-password" required />
      <Input label="New password" name="password" type="password" autoComplete="new-password" required minLength={10} />
      <Input label="Confirm new password" name="confirm" type="password" autoComplete="new-password" required minLength={10} />
      <Message state={state} />
      <button type="submit" disabled={pending} className={ui.button}>{pending ? "Saving…" : "Update password"}</button>
    </form>
  );
}
