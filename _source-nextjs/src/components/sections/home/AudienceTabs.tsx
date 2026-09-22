"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { audiences } from "@/content/audiences";
import { cn } from "@/lib/cn";

/**
 * Trois univers (sportifs, étudiants, encadrants).
 * Onglets accessibles (flèches, Début/Fin) ; au survol sur desktop, l’univers change aussi.
 * Les panneaux sont empilés dans la même cellule de grille : pas de saut de mise en page.
 */
export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = audiences.length - 1;
    const next: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in next) {
      e.preventDefault();
      setActive(next[e.key]);
      tabs.current[next[e.key]]?.focus();
    }
  };

  return (
    <div data-tabs className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div
        role="tablist"
        aria-label="Publics accompagnés"
        aria-orientation="vertical"
        className="-mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] pb-1 [scrollbar-width:none] lg:col-span-5 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
      >
        {audiences.map((a, i) => {
          const selected = i === active;
          return (
            <button
              key={a.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${a.id}`}
              aria-selected={selected}
              aria-controls={`panel-${a.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative shrink-0 snap-start text-left transition-colors duration-500",
                // mobile : pastilles
                "rounded-full border px-5 py-3 text-[0.95rem] font-semibold",
                selected ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink",
                // desktop : grandes lignes éditoriales
                "lg:rounded-none lg:border-0 lg:border-t lg:border-line lg:bg-transparent lg:px-0 lg:py-8 lg:font-normal lg:last:border-b",
                selected ? "lg:text-ink" : "lg:text-ink/40 lg:hover:text-ink/70",
              )}
            >
              <span className="hidden lg:flex lg:items-baseline lg:gap-5">
                <span className={cn("numeral text-sm transition-colors", selected ? "text-clay" : "text-muted")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="grid gap-2">
                  <span className="display-sm">{a.label}</span>
                  <span className={cn("text-[0.95rem] transition-colors", selected ? "text-muted" : "text-muted/70")}>
                    {a.who}
                  </span>
                </span>
              </span>
              <span className="lg:hidden">{a.label}</span>
              {/* trait de focus qui se déploie sous l’onglet actif */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -top-px left-0 hidden h-px bg-clay transition-[width] duration-700 ease-[var(--ease-out)] lg:block",
                  selected ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="grid lg:col-span-7">
        {audiences.map((a, i) => {
          const selected = i === active;
          return (
            <div
              key={a.id}
              role="tabpanel"
              id={`panel-${a.id}`}
              aria-labelledby={`tab-${a.id}`}
              aria-hidden={!selected}
              inert={!selected}
              className={cn(
                "[grid-area:1/1] transition-[opacity,visibility] duration-700 ease-[var(--ease-out)]",
                selected ? "visible opacity-100" : "invisible opacity-0",
              )}
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] bg-sand">
                <Image
                  src={a.image.src}
                  alt={a.image.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className={cn(
                    "object-cover transition-transform duration-[1.6s] ease-[var(--ease-out)]",
                    selected ? "scale-100" : "scale-[1.06]",
                  )}
                />
                <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3.5 py-1.5 text-sm font-medium text-ink backdrop-blur">
                  {a.who}
                </span>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-10">
                <div>
                  <h3 className="display-sm text-ink">{a.question}</h3>
                  <p className="mt-4 max-w-xl text-muted">{a.pitch}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Ce que l’on travaille">
                    {a.focus.map((f) => (
                      <li key={f} className="chip text-ink/80">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/public#${a.id}`}
                  className="group/cta inline-flex shrink-0 items-center gap-3 self-start font-semibold text-ink md:self-end"
                >
                  <span>
                    Voir l’accompagnement<span className="sr-only"> des {a.label.toLowerCase()}</span>
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-paper transition-colors duration-300 group-hover/cta:bg-ink">
                    <ArrowRight size={18} className="transition-transform duration-500 group-hover/cta:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
