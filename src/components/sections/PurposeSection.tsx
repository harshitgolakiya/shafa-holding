"use client";

import { useState, type KeyboardEvent } from "react";
import { Container } from "@/components/ui/Container";
import { purposeStatements } from "@/data/site";

const statements = [
  { id: "mission", number: "01", label: "Mission", text: purposeStatements.mission },
  { id: "vision", number: "02", label: "Vision", text: purposeStatements.vision },
  { id: "purpose", number: "03", label: "Purpose", text: purposeStatements.purpose },
] as const;

type StatementId = (typeof statements)[number]["id"];

export function PurposeSection() {
  const [active, setActive] = useState<StatementId>("mission");
  const activeStatement = statements.find((statement) => statement.id === active) ?? statements[0];

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    let nextIndex = index;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % statements.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + statements.length) % statements.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = statements.length - 1;

    const next = statements[nextIndex];
    setActive(next.id);
    document.getElementById(`purpose-tab-${next.id}`)?.focus();
  }

  return (
    <section className="bg-[var(--shafa-green-950)] py-[var(--section-space)] text-[var(--shafa-ivory)]">
      <Container>
        <p className="eyebrow">Why we move forward</p>
        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" role="tablist" aria-label="Mission, vision and purpose" aria-orientation="vertical">
            {statements.map((statement, index) => {
              const selected = statement.id === active;
              return (
                <button
                  key={statement.id}
                  id={`purpose-tab-${statement.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`purpose-panel-${statement.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(statement.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={`flex min-h-20 w-full items-center gap-6 border-t border-white/15 text-left transition-colors last:border-b ${selected ? "text-white" : "text-white/42 hover:text-white/75"}`}
                >
                  <span className="text-xs tracking-[0.16em] text-[var(--shafa-gold-light)]">{statement.number}</span>
                  <span className="font-[family-name:var(--font-display)] text-2xl">{statement.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex min-h-[16rem] items-center lg:col-span-7 lg:col-start-6">
            {statements.map((statement) => (
              <div
                key={statement.id}
                id={`purpose-panel-${statement.id}`}
                role="tabpanel"
                aria-labelledby={`purpose-tab-${statement.id}`}
                hidden={statement.id !== activeStatement.id}
              >
                <p className="display-title max-w-4xl text-[clamp(2.8rem,5vw,5.25rem)] text-balance">
                  {statement.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
