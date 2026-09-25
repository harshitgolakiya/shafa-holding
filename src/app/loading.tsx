export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center bg-[var(--shafa-green-950)] text-[var(--shafa-ivory)]" role="status" aria-live="polite">
      <div className="text-center">
        <p className="font-[family-name:var(--font-display)] text-4xl">Shafa Holding</p>
        <span aria-hidden="true" className="mx-auto mt-6 block h-px w-28 origin-left animate-pulse bg-[var(--shafa-gold)]" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
