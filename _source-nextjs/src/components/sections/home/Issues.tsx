import Image from "next/image";
import { ArrowLink } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { issues } from "@/content/approach";

export function Issues() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-paper section-y" aria-labelledby="approche-titre">
      {/* Photo d’ambiance, très atténuée */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div data-parallax="0.08" className="absolute -inset-y-24 inset-x-0">
          <Image
            src="/images/terrain-brume.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.16] grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Eyebrow dark>Mon approche</Eyebrow>
          <Lines
            id="approche-titre"
            className="display-lg mt-7"
            lines={["La force ne vient pas", "uniquement du corps."]}
          />
          <p className="display-sm mt-5 text-sky" data-reveal style={delay(250)}>
            <em className="accent-italic">Elle se construit aussi dans la tête.</em>
          </p>
          <div className="mt-9" data-reveal style={delay(450)}>
            <ArrowLink href="/accompagnement" className="text-paper">
              Découvrir l’accompagnement
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6 text-muted-dark" data-reveal>
            Vous vous reconnaissez peut-être ici
          </p>
          <ol className="border-b border-line-dark">
            {issues.map((issue, i) => (
              <li
                key={issue.title}
                data-reveal
                style={delay(i * 80)}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line-dark py-5 md:grid-cols-[3.5rem_1fr] md:py-6"
              >
                <span className="numeral pt-2 text-sm text-clay-light">{String(i + 1).padStart(2, "0")}</span>
                <div className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-2">
                  <p className="font-serif text-[clamp(1.3rem,1.1rem+0.8vw,1.75rem)] leading-[1.15] tracking-[-0.01em]">
                    {issue.title}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
