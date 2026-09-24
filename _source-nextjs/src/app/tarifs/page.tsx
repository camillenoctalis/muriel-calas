import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Pricing } from "@/components/sections/Pricing";
import { workshops } from "@/content/offers";
import { ArrowLink, BookingButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tarifs préparation mentale à Narbonne | Muriel Calas",
  description:
    "Séance découverte 80 €, suivi 5 séances 375 €, suivi 10 séances 720 € : les tarifs de préparation mentale de Muriel Calas, en présentiel à Mirepeisset (Narbonnais) ou en visio.",
  path: "/tarifs",
});

export default function TarifsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Tarifs", path: "/tarifs" }]}
        eyebrow="Tarifs"
        title={["Des formules claires,", <em key="e" className="accent-italic text-navy">à votre rythme.</em>]}
        intro={
          <p>
            Séances de 45 min à 1 h, à Mirepeisset ou en visio. Débloquer, comprendre, puis gagner en autonomie :
            choisissez la formule qui correspond à votre objectif.
          </p>
        }
      />

      <section className="section-y border-t border-line bg-cream" aria-label="Formules">
        <div className="wrap">
          <Pricing tone="light" />

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between" data-reveal>
            <p className="max-w-2xl text-muted">
              Vous hésitez ? Le premier échange sert à ça : nous choisissons ensemble la formule adaptée. Les
              modalités pratiques (règlement, calendrier) sont précisées à ce moment-là.
            </p>
            <BookingButton className="self-start md:self-auto" />
          </div>
        </div>
      </section>      <section className="section-y" aria-labelledby="ateliers-titre">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>{workshops.audience}</Eyebrow>
            <h2 id="ateliers-titre" className="display-md mt-5 text-ink" data-reveal>
              {workshops.title}
            </h2>
            <p className="numeral mt-4 text-xl text-clay" data-reveal>
              {workshops.price}
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="grid gap-3" data-reveal>
              {workshops.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8" data-reveal>
              <ArrowLink href="/contact">Demander un devis</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
