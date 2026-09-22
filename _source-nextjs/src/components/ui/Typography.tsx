import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Petite étiquette de section, précédée du point de focus */
export function Eyebrow({
  children,
  className,
  dark = false,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("eyebrow flex items-center gap-3", dark ? "text-muted-dark" : "text-muted", className)}>
      <span className="focus-dot" aria-hidden="true" />
      <span>{children}</span>
    </Tag>
  );
}

/**
 * Titre révélé ligne par ligne.
 * Chaque entrée de `lines` est une ligne visuelle (sur grand écran) ; sur mobile, les lignes
 * peuvent se replier naturellement.
 */
export function Lines({
  lines,
  as: Tag = "h2",
  className,
  delay = 0,
  id,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal="lines" style={{ "--delay": `${delay}ms` } as CSSProperties}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={{ "--i": i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Délai d’apparition échelonné, à passer en style sur un élément [data-reveal] */
export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
