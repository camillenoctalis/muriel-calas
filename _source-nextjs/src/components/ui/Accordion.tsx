"use client";

import { useId, useState } from "react";
import { Plus } from "./icons";
import { cn } from "@/lib/cn";

export type AccordionItem = { question: string; answer: string[] };

/**
 * Accordéon accessible : boutons avec aria-expanded / aria-controls,
 * ouverture animée en hauteur (grid-template-rows 0fr → 1fr), un seul panneau ouvert à la fois.
 */
export function Accordion({ items, defaultOpen = 0, dark = false }: { items: AccordionItem[]; defaultOpen?: number | null; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div data-accordion className={cn("border-b", dark ? "border-line-dark" : "border-line")}>
      {items.map((item, i) => {
        const expanded = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.question} className={cn("border-t", dark ? "border-line-dark" : "border-line")}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={cn(
                    "font-serif text-[clamp(1.2rem,1.05rem+0.6vw,1.5rem)] leading-snug transition-colors",
                    dark ? "text-paper" : "text-ink",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out)]",
                    expanded
                      ? "rotate-45 border-clay bg-clay text-paper"
                      : dark
                        ? "border-paper/25 group-hover:border-paper/60"
                        : "border-ink/20 group-hover:border-ink/60",
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)]",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
              inert={!expanded}
            >
              <div className="overflow-hidden">
                <div className={cn("grid max-w-2xl gap-3 pb-7 pr-12", dark ? "text-muted-dark" : "text-muted")}>
                  {item.answer.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
