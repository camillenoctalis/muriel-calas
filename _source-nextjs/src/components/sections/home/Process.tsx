import type { CSSProperties } from "react";
import { BookingButton } from "@/components/ui/Button";
import { Calendar, Clock, Video } from "@/components/ui/icons";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { processSteps } from "@/content/approach";
import { site } from "@/content/site";

/**
 * Parcours en 4 temps. Une ligne (la « trajectoire ») se dessine au scroll ;
 * chaque point de focus s’allume quand la ligne l’atteint (variable --progress).
 */
export function Process({ showPractical = true }: { showPractical?: boolean }) {
  const count = processSteps.length;
  return (
    <section className="section-y" aria-labelledby="parcours-titre">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Comment ça marche ?</Eyebrow>
            <Lines
              id="parcours-titre"
              className="display-lg mt-6"
              lines={["Un cadre simple,", <>du premier appel <em className="accent-italic text-navy">à l’autonomie.</em></>]}
            />
          </div>
          <p className="max-w-md text-muted lg:col-span-4 lg:col-start-9" data-reveal style={delay(200)}>
            Pas de méthode toute faite : un chemin clair, en quatre temps, que nous adaptons ensemble à votre
            situation.
          </p>
        </div>

        <div data-progress className="relative mt-16 lg:mt-24">
          {/* Trajectoire — horizontale sur desktop, verticale sur mobile */}
          <div aria-hidden="true" className="absolute left-[0.3125rem] top-2 bottom-2 w-px bg-line lg:inset-x-0 lg:top-[0.3125rem] lg:bottom-auto lg:h-px lg:w-auto">
            <div className="h-full w-full origin-top scale-y-[var(--progress,0)] bg-clay lg:origin-left lg:scale-x-[var(--progress,0)] lg:scale-y-100" />
          </div>

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-10">
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="relative pl-10 lg:pl-0 lg:pt-12"
                style={{ "--at": (i / (count - 1)) * 0.9 } as CSSProperties}
                data-reveal
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[0.625rem] w-[0.625rem] rounded-full border border-clay bg-paper lg:top-0"
                >
                  <span
                    className="absolute inset-[-1px] rounded-full bg-clay"
                    style={{ opacity: "clamp(0, calc((var(--progress, 0) - var(--at)) * 12), 1)" }}
                  />
                </span>
                <span className="numeral text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-sm mt-2 text-ink">{step.title}</h3>
                <p className="mt-3 max-w-xs text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {showPractical && (
          <div
            className="mt-20 flex flex-col gap-8 rounded-[var(--radius-card)] border border-line p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between"
            data-reveal
          >
            <ul className="grid gap-4 text-[0.98rem] sm:grid-cols-3 sm:gap-8">
              <li className="flex items-center gap-3">
                <Clock size={20} className="shrink-0 text-clay" />
                Séances de {site.session.duration}
              </li>
              <li className="flex items-center gap-3">
                <Video size={20} className="shrink-0 text-clay" />
                À Mirepeisset ou en visio
              </li>
              <li className="flex items-center gap-3">
                <Calendar size={20} className="shrink-0 text-clay" />
                Suivi possible entre les séances
              </li>
            </ul>
            <BookingButton className="self-start lg:self-auto" />
          </div>
        )}
      </div>
    </section>
  );
}
