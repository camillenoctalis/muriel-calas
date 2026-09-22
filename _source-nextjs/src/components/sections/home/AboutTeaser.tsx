import Image from "next/image";
import { ArrowLink } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";


export function AboutTeaser() {
  return (
    <section className="section-y relative overflow-hidden" aria-labelledby="muriel-titre">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="relative lg:col-span-5">
          <figure>
            <div data-reveal="media" className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4] rounded-[var(--radius-card)] bg-sand">
              <div data-parallax="0.06" className="absolute -inset-y-10 inset-x-0">
                <Image
                  src="/images/volley-equipe.jpg"
                  alt="Deux joueuses de volley-ball se tenant la main sur le parquet avant un point"
                  fill
                  sizes="(min-width: 1024px) 34vw, 92vw"
                  className="object-cover object-[55%_50%]"
                />
              </div>
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span className="h-px w-8 bg-clay" aria-hidden="true" />
              Le terrain d’abord : le volley-ball, puis le bord des terrains.
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>Qui suis-je ?</Eyebrow>
          <Lines
            id="muriel-titre"
            className="display-md mt-6"
            lines={[
              "Vingt-cinq ans à accompagner le corps.",
              <>
                Aujourd’hui, aussi <em className="accent-italic text-navy">ce qui se joue</em> dans la tête.
              </>,
            ]}
          />
          <div className="mt-8 grid gap-5 text-muted" data-reveal style={delay(200)}>
            <p>              Ancienne joueuse de volley-ball et masseur-kinésithérapeute depuis plus de 25 ans, formée à la
              préparation mentale par Christian Ramos : j’aide chacun à mieux connaître ses capacités, et à s’en
              servir quand cela compte.
            </p></div>


          <div className="mt-10 flex flex-wrap items-center justify-between gap-6" data-reveal style={delay(300)}>
            <div className="flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full bg-sand">
                <Image
                  src="/images/muriel-calas-preparatrice-mentale.jpg"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover object-[50%_25%]"
                />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-lg text-ink">Muriel Calas</span>
                <span className="text-sm text-muted">Préparatrice mentale à Mirepeisset</span>
              </span>
            </div>
            <ArrowLink href="/a-propos">Découvrir mon parcours</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
