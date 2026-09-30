import { BookingButton, ButtonLink } from "@/components/ui/Button";
import { delay } from "@/components/ui/Typography";
import { formatPrice, offers, pricePerSession, quoteOffer } from "@/content/offers";
import { quoteHref, quoteIsExternal } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Grille tarifaire. Hiérarchie : nom › intention › tarif › contenu › action.
 * La progression (débloquer → intégrer → autonomie) est matérialisée par une jauge à trois segments.
 */
export function Pricing({
  tone = "dark",
  showSteps = true,
  withQuote = false,
}: {
  tone?: "dark" | "light";
  showSteps?: boolean;
  /** Ajoute une quatrième carte « Sur devis » (ateliers, formations, demandes particulières). */
  withQuote?: boolean;
}) {
  const dark = tone === "dark";
  const steps = withQuote ? [...offers, quoteOffer] : offers;
  return (
    <div className="relative">
      {/* Trajectoire de progression (desktop) */}
      <div
        aria-hidden="true"
        className={cn("mb-10 hidden gap-6", withQuote ? "grid-cols-4" : "grid-cols-3", showSteps && "lg:grid")}
      >
        {steps.map((o, i) => (
          <div key={o.id} className="flex items-center gap-3">
            <span className={cn("numeral text-sm", dark ? "text-clay-light" : "text-clay")}>{String(i + 1).padStart(2, "0")}</span>
            <span className={cn("eyebrow", dark ? "text-paper" : "text-ink")}>{o.step}</span>
            <span className={cn("h-px flex-1", dark ? "bg-line-dark" : "bg-line")} />
          </div>
        ))}
      </div>

      <ul className={cn("grid gap-5 lg:gap-6", withQuote ? "md:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-3")}>
        {offers.map((o, i) => (
          <li key={o.id} id={o.id} data-reveal="card" style={delay(i * 110)} className="flex scroll-mt-32">
            <div
              data-spotlight
              className={cn(
                "card-lift spotlight group relative flex w-full flex-col rounded-[var(--radius-card)] border p-7 md:p-9",
                dark
                  ? "border-line-dark bg-night/70 hover:border-paper/30"
                  : "border-line bg-paper hover:border-ink/25",
              )}
            >
            {/* Jauge de progression : se remplit à l’apparition de la carte */}
            <div className="gauge flex gap-1.5" aria-hidden="true">
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

            <div
              className={cn(
                "mt-8 border-t pt-7",
                withQuote ? "flex flex-col gap-1.5" : "flex items-end gap-3",
                dark ? "border-line-dark" : "border-line",
              )}
            >
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
            </div>
          </li>
        ))}
        {withQuote && (
          <li id={quoteOffer.id} data-reveal="card" style={delay(offers.length * 110)} className="flex scroll-mt-32">
            <div
              data-spotlight
              className={cn(
                "card-lift spotlight group relative flex w-full flex-col rounded-[var(--radius-card)] border border-dashed p-7 md:p-9",
                dark ? "border-paper/30 bg-night/40 hover:border-paper/50" : "border-ink/25 bg-cream/60 hover:border-ink/45",
              )}
            >
            <div className="flex gap-1.5" aria-hidden="true">
              <span className={cn("h-1 flex-1 rounded-full", dark ? "bg-paper/25" : "bg-ink/15")} />
            </div>
            <p className={cn("eyebrow mt-5 lg:hidden", dark ? "text-muted-dark" : "text-muted")}>{quoteOffer.step}</p>

            <h3 className={cn("title-sm mt-5 text-[1.6rem] lg:mt-7", dark ? "text-paper" : "text-ink")}>{quoteOffer.name}</h3>
            <p className={cn("mt-3 font-serif text-lg italic leading-snug lg:min-h-[3.2em]", dark ? "text-sky" : "text-navy")}>
              « {quoteOffer.intention} »
            </p>

            <div className={cn("mt-8 border-t pt-7", dark ? "border-line-dark" : "border-line")}>
              <p className={cn("font-serif text-[2.4rem] leading-none", dark ? "text-paper" : "text-ink")}>
                {quoteOffer.price}
              </p>
              <p className={cn("mt-2 text-sm leading-snug", dark ? "text-muted-dark" : "text-muted")}>
                {quoteOffer.sessions}
              </p>
            </div>

            <p className={cn("mt-6 text-[0.97rem]", dark ? "text-paper/85" : "text-ink/85")}>{quoteOffer.summary}</p>
            <ul className="mt-5 grid gap-3">
              {quoteOffer.objectives.map((obj) => (
                <li key={obj} className={cn("flex gap-3 text-[0.97rem] leading-snug", dark ? "text-muted-dark" : "text-muted")}>
                  <span aria-hidden="true" className={cn("mt-[0.6rem] h-px w-3 shrink-0", dark ? "bg-clay-light" : "bg-clay")} />
                  {obj}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-9">
              <ButtonLink
                href={quoteHref}
                external={quoteIsExternal}
                variant={dark ? "outline-light" : "outline"}
                size="sm"
              >
                Demander un devis
              </ButtonLink>
            </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
