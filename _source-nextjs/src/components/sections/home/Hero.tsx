import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowLink, BookingButton } from "@/components/ui/Button";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-[calc(var(--header-h)+2rem)] md:pb-20 md:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="wrap relative grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        {/* Texte */}
        <div className="relative z-10 lg:col-span-8">
          {/* Mobile : un visage dès le premier écran */}
          <div className="hero-fade mb-7 flex items-center gap-3 lg:hidden" style={i(0)}>
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-sand">
              <Image
                src="/images/muriel-calas-preparatrice-mentale.jpg"
                alt=""
                fill
                sizes="44px"
                className="object-cover object-[50%_22%]"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg text-ink">Muriel Calas</span>
              <span className="text-sm text-muted">Préparatrice mentale</span>
            </span>
          </div>
          <p className="eyebrow hero-fade flex flex-wrap items-center gap-x-3 gap-y-1 text-muted" style={i(0)}>
            <span className="focus-dot" aria-hidden="true" />
            <span className="hidden lg:inline">Préparatrice mentale</span>
            <span aria-hidden="true" className="hidden text-sand-deep lg:inline">
              /
            </span>
            Mirepeisset · Narbonne · À distance
          </p>

          <h1 className="display-xl mt-7 max-w-[13ch] text-ink lg:max-w-none">
            <span className="line">
              <span className="hero-rise inline-block" style={i(0)}>
                Apprendre à maîtriser
              </span>
            </span>
            <span className="line">
              <span className="hero-rise inline-block" style={i(1)}>
                <em className="accent-italic text-navy">ce qui dépend</em>
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
              Préparation mentale pour sportifs, étudiants et encadrants, à Mirepeisset ou en visio. Pour mieux
              gérer le stress et rester lucide dans les moments-clés.
            </p>
            <div className="hero-fade flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-7" style={i(2)}>
              <BookingButton />
              <ArrowLink href="/accompagnement">Découvrir l’accompagnement</ArrowLink>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative lg:col-span-4 lg:pt-4">
          <figure className="relative mx-auto max-w-[26rem] lg:mx-0 lg:ml-auto">
            <div className="hero-media relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-sand">
              <div data-parallax="0.05" className="absolute -inset-y-6 inset-x-0">
                <Image
                  src="/images/muriel-calas-preparatrice-mentale.jpg"
                  alt="Portrait de Muriel Calas, préparatrice mentale, souriante, en chemise rayée bleue"
                  fill
                  preload
                  quality={85}
                  sizes="(min-width: 1024px) 26rem, (min-width: 480px) 26rem, 92vw"
                  className="object-cover object-[46%_30%]"
                />
              </div>
            </div>
            <figcaption
              className="hero-fade absolute -bottom-6 left-4 right-10 rounded-[var(--radius-card)] bg-paper/95 px-5 py-4 shadow-[0_18px_50px_-24px_rgb(13_27_42/0.45)] backdrop-blur sm:-left-8 sm:right-auto lg:-left-14"
              style={i(3)}
            >
              <span className="block font-serif text-xl leading-tight text-ink">Muriel Calas</span>
              <span className="mt-1 block text-sm text-muted">
                Préparatrice mentale · Kinésithérapeute depuis plus de 25 ans
              </span>
            </figcaption>

            {/* Point de focus qui respire */}
            <span aria-hidden="true" className="absolute -right-3 top-10 hidden h-16 w-16 sm:block">
              <span className="breathe absolute inset-0 rounded-full border border-clay/50" />
              <span className="breathe-delayed absolute inset-0 rounded-full border border-clay/40" />
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
            </span>
          </figure>
        </div>
      </div>

    </section>
  );
}
