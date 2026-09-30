import Image from "next/image";
import type { CSSProperties } from "react";
import { CatchAndThink } from "@/components/sections/Credentials";
import { ArrowLink, BookingButton } from "@/components/ui/Button";
import { site } from "@/content/site";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Accueil. Mise en scène : halos de lumière très doux, anneaux de « focus » autour du portrait,
 * trait dessiné sous les mots-clés, parallaxe au pointeur (souris uniquement, via [data-pointer]).
 * Tout le texte est visible sans JavaScript ; les animations d’entrée sont en CSS pur (LCP préservé).
 */
export function Hero() {
  const mentalPlus = site.trainings.find((t) => t.name === "Mental Plus");
  const catchThink = site.trainings.find((t) => t.name === "Catch & Think");

  return (
    <section
      data-pointer
      className="relative isolate overflow-hidden pb-10 pt-[calc(var(--header-h)+1.75rem)] md:pb-14 md:pt-[calc(var(--header-h)+3.5rem)]"
    >
      {/* Profondeur : deux halos de lumière, jamais plus */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[18%] -top-[28%] h-[62rem] w-[62rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgb(213_224_234/0.85),rgb(213_224_234/0)_100%)]" />
        <div className="absolute -bottom-[45%] -left-[22%] h-[52rem] w-[52rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgb(233_225_211/0.9),rgb(233_225_211/0)_100%)]" />
      </div>

      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        {/* Texte */}
        <div className="relative z-10 lg:col-span-7">
          {/* Mobile : un visage dès le premier écran */}
          <div className="hero-fade mb-7 flex items-center gap-3 lg:hidden" style={i(0)}>
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-sand ring-2 ring-paper">
              <Image src="/images/muriel-calas-seance.jpg" alt="" fill sizes="44px" className="object-cover object-[50%_18%]" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg text-ink">Muriel Calas</span>
              <span className="text-sm text-muted">Préparatrice mentale</span>
            </span>
          </div>

          <p className="eyebrow hero-fade flex flex-wrap items-center gap-x-3 gap-y-1 text-muted" style={i(0)}>
            <span className="focus-dot" aria-hidden="true" />
            <span className="hidden lg:inline">Préparatrice mentale</span>
            <span aria-hidden="true" className="hidden h-px w-6 bg-sand-deep lg:inline-block" />
            Occitanie · Visio partout en France
          </p>

          <h1 className="display-hero mt-7 text-ink">
            <span className="line">
              <span className="hero-rise inline-block" style={i(0)}>
                Apprendre à maîtriser
              </span>
            </span>
            <span className="line pb-[0.22em] -mb-[0.22em]">
              <span className="hero-rise relative inline-block" style={i(1)}>
                <em className="accent-italic text-navy">ce qui dépend</em>
                {/* Trait terre battue, tracé à la main, qui se dessine sous les mots */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 320 18"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.12em] left-[2%] h-[0.22em] w-[96%] overflow-visible text-clay"
                >
                  <path
                    className="hero-draw"
                    pathLength={1}
                    d="M3 12.5C58 5.5 118 3.2 176 5.6c48 2 96 5.4 141 3.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </span>
            <span className="line">
              <span className="hero-rise inline-block" style={i(2)}>
                de vous.
              </span>
            </span>
          </h1>

          <div className="mt-8 grid max-w-xl gap-8 lg:mt-10">
            <p className="lead hero-fade text-muted" style={i(1)}>
              Pour sportifs, étudiants et encadrants. À Narbonne, en Occitanie ou en visio.
            </p>
            <div className="hero-fade flex flex-col items-start gap-5 xs:flex-row xs:flex-wrap xs:items-center xs:gap-x-7" style={i(2)}>
              <BookingButton magnetic className="xs:whitespace-nowrap" />
              <ArrowLink href="/accompagnement" className="xs:whitespace-nowrap">
                Découvrir l’accompagnement
              </ArrowLink>
            </div>
            <p className="hero-fade flex items-center gap-3 text-sm text-muted" style={i(3)}>
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-clay/50 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
              </span>
              {site.discoveryCall.label.replace(" · ", " de ")}, sans engagement
            </p>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative lg:col-span-5">
          <figure
            className="relative mx-auto max-w-[27rem] lg:ml-auto lg:mr-0"
            style={{ transform: "translate3d(calc(var(--px, 0) * -9px), calc(var(--py, 0) * -7px), 0)", transition: "transform 1.2s var(--ease-out)" }}
          >
            {/* Anneaux de focus : le motif du site, en très grand et très léger */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="drift pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 text-ink"
            >
              <circle cx="200" cy="200" r="198" fill="none" stroke="currentColor" strokeOpacity="0.07" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.09" strokeDasharray="2 7" />
              <circle cx="200" cy="200" r="102" fill="none" stroke="currentColor" strokeOpacity="0.06" />
              <circle cx="349" cy="175" r="3.5" className="fill-clay" />
            </svg>

            <div className="hero-media relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-[var(--shadow-lift)]">
              <div data-parallax="0.05" className="absolute -inset-y-6 inset-x-0">
                <Image
                  src="/images/muriel-calas-accueil.jpg"
                  alt="Muriel Calas, préparatrice mentale, souriante, assise à son bureau, carnet à la main"
                  fill
                  preload
                  quality={85}
                  sizes="(min-width: 1024px) 27rem, (min-width: 480px) 27rem, 92vw"
                  className="object-cover object-[50%_22%]"
                />
              </div>
              {/* Voile très léger en bas pour asseoir la légende */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/25 to-transparent" />
            </div>

            <figcaption
              className="hero-fade absolute -bottom-6 left-4 right-10 rounded-[var(--radius-card)] border border-paper/60 bg-paper/85 px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-md sm:-left-8 sm:right-auto xl:-left-14"
              style={{
                ...i(3),
                translate: "calc(var(--px, 0) * 6px) calc(var(--py, 0) * 5px)",
                transition: "translate 1.2s var(--ease-out)",
              }}
            >
              <span className="block font-serif text-xl leading-tight text-ink">Muriel Calas</span>
              <span className="mt-1 block text-sm text-muted">Préparatrice mentale · Kinésithérapeute depuis plus de 25 ans</span>
            </figcaption>

            {/* Point de focus qui respire */}
            <span aria-hidden="true" className="absolute -right-3 top-10 hidden h-16 w-16 sm:block">
              <span className="breathe absolute inset-0 rounded-full border border-clay/50" />
              <span className="breathe-delayed absolute inset-0 rounded-full border border-clay/40" />
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay shadow-[0_0_0_4px_rgb(250_247_242)]" />
            </span>
          </figure>
        </div>
      </div>

      {/* Formations & références : preuve discrète, en bas du premier écran */}
      <div className="wrap mt-16 md:mt-20">
        <div className="hero-fade flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:gap-10" style={i(5)}>
          <p className="eyebrow shrink-0 text-muted">Formée et reconnue</p>
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-5">
            {mentalPlus && (
              <li>
                <a href={mentalPlus.url} target="_blank" rel="noopener" className="inline-flex" aria-label="Mental Plus : annuaire des préparateurs mentaux (nouvel onglet)">
                  <Image src="/brand/mental-plus.png" alt="" width={640} height={167} className="logo-mono h-7 w-auto" />
                </a>
              </li>
            )}
            {catchThink && (
              <li>
                <a href={catchThink.url} target="_blank" rel="noopener" className="inline-flex text-ink/45 transition-colors duration-500 hover:text-ink" aria-label="Catch & Think (nouvel onglet)">
                  <CatchAndThink className="h-8 w-auto" />
                </a>
              </li>
            )}
            <li>
              <Image src="/brand/ligue-occitanie-rugby.png" alt="Ligue Occitanie de Rugby" width={520} height={391} className="logo-mono h-12 w-auto" />
            </li>
          </ul>
          {/* Indication de défilement (desktop) */}
          <span aria-hidden="true" className="ml-auto hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted lg:inline-flex">
            Défiler
            <span className="relative h-10 w-px overflow-hidden bg-ink/10">
              <span className="scroll-cue absolute inset-0 bg-clay" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
