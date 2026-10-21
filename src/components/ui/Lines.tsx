import { Fragment } from "react";

/** Renders CMS text, turning each line break into a <br />. */
export function Lines({ text }: { text: string }) {
  const lines = text.split(/\r?\n/);
  return lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

/** Splits CMS text on blank lines into paragraphs. */
export function paragraphs(text: string) {
  return text.split(/\r?\n\s*\r?\n/).map((part) => part.trim()).filter(Boolean);
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
