import Image from "next/image";
import { ArrowLink } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { issues } from "@/content/approach";

export function Issues() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-paper section-y" aria-labelledby="approche-titre">
      {/* Photo d’ambiance très atténuée + halo terre battue */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div data-parallax="0.08" className="absolute -inset-y-24 inset-x-0">
          <Image src="/images/terrain-brume.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.14] grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="absolute -left-[12%] top-[8%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(217_143_102/0.13),transparent)]" />
      </div>

      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Eyebrow dark>Mon approche</Eyebrow>
          <Lines id="approche-titre" className="display-lg mt-7" lines={["La force ne vient pas", "uniquement du corps."]} />
          <p className="display-sm mt-5 text-sky" data-reveal style={delay(250)}>
            <em className="accent-italic">Elle se construit aussi dans la tête.</em>
          </p>
          <div className="mt-9" data-reveal style={delay(400)}>
            <ArrowLink href="/accompagnement" className="text-paper">
              Découvrir l’accompagnement
            </ArrowLink>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-6 text-muted-dark" data-reveal>
            Vous vous reconnaissez peut-être ici
          </p>
          {/* Rail de progression : se remplit au fil du scroll */}
          <div data-progress className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 hidden w-px bg-line-dark md:block">
              <span className="block h-full w-full origin-top scale-y-[var(--progress,0)] bg-clay-light" />
            </span>
            <ol className="border-b border-line-dark md:pl-8" data-stagger="90">
              {issues.map((issue, n) => (
                <li
                  key={issue.title}
                  data-reveal
                  className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-line-dark py-5 md:grid-cols-[3.5rem_1fr] md:py-6"
                >
                  {/* Trait qui balaie la ligne au survol */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-clay-light transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100"
                  />
                  <span className="numeral pt-2 text-sm text-clay-light transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-[clamp(1.3rem,1.1rem+0.8vw,1.75rem)] leading-[1.15] tracking-[-0.01em] text-paper/85 transition-[color,transform] duration-700 ease-[var(--ease-out)] group-hover:translate-x-2 group-hover:text-paper">
                    {issue.title}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
