"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { ui } from "../ui";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, {});

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block">
        <span className={ui.label}>Email</span>
        <input name="email" type="email" autoComplete="username" required defaultValue={state.email} key={state.email} className={`${ui.input} mt-1.5`} />
      </label>
      <label className="block">
        <span className={ui.label}>Password</span>
        <input name="password" type="password" autoComplete="current-password" required className={`${ui.input} mt-1.5`} />
      </label>
      {state.message ? <p role="alert" className="text-sm text-red-700">{state.message}</p> : null}
      <button type="submit" disabled={pending} className={`${ui.button} w-full`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
