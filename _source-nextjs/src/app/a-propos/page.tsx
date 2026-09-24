import type { CSSProperties } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Credentials } from "@/components/sections/Credentials";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowLink, BookingButton } from "@/components/ui/Button";
import { Eyebrow, Lines } from "@/components/ui/Typography";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({  title: "Muriel Calas, préparatrice mentale en Occitanie | À propos",
  description:    "Ancienne volleyeuse, masseur-kinésithérapeute depuis plus de 25 ans et préparatrice mentale formée par Christian Ramos : le parcours et l’approche de Muriel Calas, en Occitanie et en visio.",
  path: "/a-propos",
  type: "profile",
  image: {
    url: "/images/muriel-calas-preparatrice-mentale.jpg",
    alt: "Portrait de Muriel Calas, préparatrice mentale",
    width: 600,
    height: 600,
  },
});

const chapters = [
  {
    label: "Le terrain",
    title: "Une sportive, d’abord",
    text: "Plusieurs sports, puis le volley-ball. J’en garde une conviction : le jour du match, la tête compte autant que les jambes.",
  },
  {
    label: "Le corps",
    title: "Plus de 25 ans de kinésithérapie",
    text: "Masseur-kinésithérapeute, j’ai aidé mes patients à découvrir qu’ils étaient capables de faire, et de bien faire, au fil de rééducations longues et exigeantes.",
  },
  {
    label: "Le déclic",
    title: "Vers la préparation mentale",    text: "Pour accompagner vraiment une personne, il faut aussi prendre en compte ce qui se passe dans sa tête. Je me suis formée auprès de Christian Ramos, formateur Mental Plus, puis à la méthode Catch & Think.",
  },
  {
    label: "Aujourd’hui",
    title: "Une approche globale",    text: "J’accompagne sportifs, étudiants et encadrants, en individuel comme en atelier. Spécialisée dans le cycle menstruel chez les sportives, je forme aussi les équipes et leurs entraîneurs, notamment à la Ligue Occitanie de rugby.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "À propos", path: "/a-propos" }]}
        eyebrow="Qui suis-je ?"
        title={["Accompagner", <em key="e" className="accent-italic text-navy">au-delà du corps.</em>]}
        intro={
          <p>            Ancienne sportive, masseur-kinésithérapeute depuis plus de 25 ans et préparatrice mentale, j’accompagne
            en Occitanie — Toulouse, Montpellier, Castres, Font-Romeu, Narbonne — et en visio partout en France,
            celles et ceux qui veulent mieux comprendre leurs capacités et s’en servir quand cela compte.
          </p>
        }
        image={{
          src: "/images/muriel-calas-preparatrice-mentale.jpg",
          alt: "Portrait de Muriel Calas, souriante, en chemise rayée bleue",
          position: "46% 30%",
          caption: "Muriel Calas, préparatrice mentale à Mirepeisset",
        }}
      >
        <div className="flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-7">
          <BookingButton />
          <ArrowLink href="/accompagnement">Mon accompagnement</ArrowLink>
        </div>
      </PageHero>

      {/* Parcours */}
      <section className="section-y border-t border-line" aria-labelledby="parcours-titre">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <Eyebrow>Mon parcours</Eyebrow>
            <Lines id="parcours-titre" className="display-md mt-6" lines={["Du terrain", "au bord du terrain."]} />
          </div>

          <ol data-progress className="relative lg:col-span-7 lg:col-start-6">
            <div aria-hidden="true" className="absolute bottom-0 left-[0.3125rem] top-2 w-px bg-line">
              <div className="h-full w-full origin-top scale-y-[var(--progress,0)] bg-clay" />
            </div>
            {chapters.map((c, i) => (
              <li
                key={c.label}
                className="relative pb-10 pl-10 last:pb-0 md:pl-14"
                style={{ "--at": i / chapters.length } as CSSProperties}
              >
                <span aria-hidden="true" className="absolute left-0 top-1.5 h-[0.625rem] w-[0.625rem] rounded-full border border-clay bg-paper">
                  <span
                    className="absolute inset-[-1px] rounded-full bg-clay"
                    style={{ opacity: "clamp(0, calc((var(--progress, 0) - var(--at)) * 10), 1)" }}
                  />
                </span>
                <div data-reveal>
                  <p className="eyebrow flex items-center gap-3 text-clay">
                    <span className="numeral text-sm">{String(i + 1).padStart(2, "0")}</span>
                    {c.label}
                  </p>
                  <h3 className="display-sm mt-3 text-ink">{c.title}</h3>
                  <p className="mt-3 max-w-2xl text-muted">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>      {/* Formations */}
      <section className="pb-14 md:pb-20" aria-labelledby="formations-titre">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Formations</Eyebrow>
            <h2 id="formations-titre" className="display-sm mt-5 text-ink">
              Formée et référencée.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Credentials />
          </div>
        </div>
      </section>

      {/* Philosophie */}
      <section className="on-dark section-y bg-ink text-paper" aria-labelledby="philosophie-titre">
        <div className="wrap">
          <Eyebrow dark>Ma philosophie</Eyebrow>
          <blockquote className="mt-8 max-w-5xl" data-reveal>
            <p id="philosophie-titre" className="display-lg">
              « J’aime aider les gens à grandir, à être plus forts, plus confiants et{" "}
              <em className="accent-italic text-sky">plus conscients de leurs capacités.</em> »
            </p>
            <footer className="mt-8 flex items-center gap-4 text-muted-dark">
              <span className="h-px w-10 bg-clay-light" aria-hidden="true" />
              Muriel Calas
            </footer>
          </blockquote>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
