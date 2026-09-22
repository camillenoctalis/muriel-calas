import { BookingButton } from "@/components/ui/Button";
import { delay } from "@/components/ui/Typography";
import { formatPrice, offers, pricePerSession } from "@/content/offers";
import { cn } from "@/lib/cn";

/**
 * Grille tarifaire. Hiérarchie : nom › intention › tarif › contenu › action.
 * La progression (débloquer → intégrer → autonomie) est matérialisée par une jauge à trois segments.
 */
export function Pricing({ tone = "dark", showSteps = true }: { tone?: "dark" | "light"; showSteps?: boolean }) {
  const dark = tone === "dark";
  return (
    <div className="relative">
      {/* Trajectoire de progression (desktop) */}
      <div aria-hidden="true" className={cn("mb-10 hidden grid-cols-3 gap-6", showSteps && "lg:grid")}>
        {offers.map((o, i) => (
          <div key={o.id} className="flex items-center gap-3">
            <span className={cn("numeral text-sm", dark ? "text-clay-light" : "text-clay")}>{String(i + 1).padStart(2, "0")}</span>
            <span className={cn("eyebrow", dark ? "text-paper" : "text-ink")}>{o.step}</span>
            <span className={cn("h-px flex-1", dark ? "bg-line-dark" : "bg-line")} />
          </div>
        ))}
      </div>

      <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {offers.map((o, i) => (
          <li
            key={o.id}
            id={o.id}
            data-reveal
            style={delay(i * 110)}
            className={cn(
              "group relative flex scroll-mt-32 flex-col rounded-[var(--radius-card)] border p-7 transition-colors duration-500 md:p-9",
              dark
                ? "border-line-dark bg-night/70 hover:border-paper/30"
                : "border-line bg-paper hover:border-ink/30",
            )}
          >
            {/* Jauge de progression */}
            <div className="flex gap-1.5" aria-hidden="true">
              {offers.map((_, j) => (
                <span
                  key={j}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-700",
                    j <= i ? (dark ? "bg-clay-light" : "bg-clay") : dark ? "bg-paper/12" : "bg-ink/10",
                  )}
                />
              ))}
            </div>
            <p className={cn("eyebrow mt-5 lg:hidden", dark ? "text-muted-dark" : "text-muted")}>{o.step}</p>

            <h3 className={cn("title-sm mt-5 text-[1.6rem] lg:mt-7", dark ? "text-paper" : "text-ink")}>{o.name}</h3>
            <p className={cn("mt-3 font-serif text-lg italic leading-snug lg:min-h-[3.2em]", dark ? "text-sky" : "text-navy")}>
              « {o.intention} »
            </p>

            <div className={cn("mt-8 flex items-end gap-3 border-t pt-7", dark ? "border-line-dark" : "border-line")}>
              <span className={cn("numeral text-[3.25rem] leading-none tracking-tight", dark ? "text-paper" : "text-ink")}>
                {formatPrice(o.price)}
              </span>
              <span className={cn("pb-1.5 text-sm leading-tight", dark ? "text-muted-dark" : "text-muted")}>
                {o.sessions === 1 ? "1 séance" : `${o.sessions} séances`}
                {o.sessions > 1 && (
                  <>
                    <br />
                    soit {pricePerSession(o)} la séance
                  </>
                )}
              </span>
            </div>

            <p className={cn("mt-6 text-[0.97rem]", dark ? "text-paper/85" : "text-ink/85")}>{o.summary}</p>
            <ul className="mt-5 grid gap-3">
              {o.objectives.map((obj) => (
                <li key={obj} className={cn("flex gap-3 text-[0.97rem] leading-snug", dark ? "text-muted-dark" : "text-muted")}>
                  <span aria-hidden="true" className={cn("mt-[0.6rem] h-px w-3 shrink-0", dark ? "bg-clay-light" : "bg-clay")} />
                  {obj}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-9">
              <BookingButton variant={dark ? "outline-light" : "outline"} size="sm">
                Réserver
                <span className="sr-only"> — {o.name}</span>
              </BookingButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
