type MediaPlaceholderProps = {
  assetId: string;
  label: string;
  className?: string;
};

export function MediaPlaceholder({ assetId, label, className = "" }: MediaPlaceholderProps) {
  return (
    <div
      className={`relative isolate grid min-h-80 place-items-center overflow-hidden bg-[var(--shafa-green-800)] text-[var(--shafa-ivory)] ${className}`}
      role="img"
      aria-label={`${label}. Final client-approved media pending.`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35 [background-image:linear-gradient(125deg,transparent_0%,transparent_46%,rgba(169,138,61,.7)_46.1%,rgba(169,138,61,.7)_46.35%,transparent_46.45%),repeating-linear-gradient(0deg,transparent_0,transparent_46px,rgba(255,255,255,.08)_47px)]"
      />
      <div className="relative max-w-xs px-8 text-center">
        <p className="eyebrow">Asset {assetId}</p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-none">{label}</p>
        <p className="mt-5 text-xs leading-5 text-white/60">Client image pending — see ASSET_REQUESTS.md</p>
      </div>
    </div>
  );
}
