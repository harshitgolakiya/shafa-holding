type GoldLineProps = {
  className?: string;
};

export function GoldLine({ className = "" }: GoldLineProps) {
  return <span aria-hidden="true" className={`block h-px bg-[var(--shafa-gold)] ${className}`} />;
}
