import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Pricing } from "@/components/sections/Pricing";
import { BookingButton } from "@/components/ui/Button";
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
      </section>

      <FinalCta />
    </>
  );
}
