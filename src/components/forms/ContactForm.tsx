"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setStatus("pending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.message ?? "Your inquiry could not be sent. Please try again later.");
        return;
      }

      setStatus("success");
      setMessage(result.message ?? "Thank you. Your inquiry has been received.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("The contact service is currently unavailable. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-7 gap-y-8 sm:grid-cols-2" noValidate>
      <FormField label="Name" name="name" autoComplete="name" maxLength={120} required />
      <FormField label="Company" name="company" autoComplete="organization" maxLength={160} />
      <FormField label="Email" name="email" type="email" autoComplete="email" maxLength={254} required />
      <FormField label="Phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
      <label className="block sm:col-span-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Inquiry Type</span>
        <select name="inquiryType" required defaultValue="" className="mt-3 min-h-12 w-full border-0 border-b border-white/22 bg-transparent py-3 text-white outline-none transition-colors focus:border-[var(--shafa-gold-light)]">
          <option value="" disabled className="text-black">Select an inquiry type</option>
          <option value="general" className="text-black">General inquiry</option>
          <option value="investment" className="text-black">Investment</option>
          <option value="construction" className="text-black">Construction</option>
          <option value="partnership" className="text-black">Partnership</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">Message</span>
        <textarea name="message" required minLength={20} maxLength={4000} rows={5} className="mt-3 w-full resize-y border-0 border-b border-white/22 bg-transparent py-3 text-white outline-none transition-colors focus:border-[var(--shafa-gold-light)]" />
      </label>
      <label className="absolute -left-[10000px]" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "pending"} className="group inline-flex min-h-12 items-center gap-4 border-b border-[var(--shafa-gold)] py-3 text-xs font-bold uppercase tracking-[0.15em] text-white disabled:cursor-wait disabled:opacity-60">
          {status === "pending" ? "Sending" : "Send inquiry"}
          {status === "pending" ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />}
        </button>
        <p aria-live="polite" className={`mt-5 min-h-6 text-sm ${status === "success" ? "text-[var(--shafa-gold-light)]" : "text-white/62"}`}>{message}</p>
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  maxLength?: number;
  required?: boolean;
};

function FormField({ label, name, type = "text", autoComplete, maxLength, required = false }: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">{label}</span>
      <input name={name} type={type} autoComplete={autoComplete} maxLength={maxLength} required={required} className="mt-3 min-h-12 w-full border-0 border-b border-white/22 bg-transparent py-3 text-white outline-none transition-colors focus:border-[var(--shafa-gold-light)]" />
    </label>
  );
}
