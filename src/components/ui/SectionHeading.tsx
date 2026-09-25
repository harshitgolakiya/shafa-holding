import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ eyebrow, children, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow ? <p className="eyebrow mb-6">{eyebrow}</p> : null}
      <h2 className="display-title text-[clamp(2.6rem,5vw,4.75rem)]">{children}</h2>
    </div>
  );
}
