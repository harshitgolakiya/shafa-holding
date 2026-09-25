"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="grid min-h-[75svh] place-items-center bg-[var(--shafa-green-950)] px-[var(--page-gutter)] py-36 text-center text-[var(--shafa-ivory)]">
      <div className="max-w-3xl">
        <p className="eyebrow">Unexpected error</p>
        <h1 className="display-title mt-8 text-[clamp(2.8rem,5vw,5rem)]">Something interrupted the journey.</h1>
        <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-white/58">Please try loading this section again.</p>
        <button type="button" onClick={reset} className="mt-9 min-h-11 border-b border-[var(--shafa-gold)] py-2 text-xs font-bold uppercase tracking-[0.15em]">Try again</button>
      </div>
    </main>
  );
}
