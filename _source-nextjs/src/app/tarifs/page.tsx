import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Pricing } from "@/components/sections/Pricing";
import { quoteRequests } from "@/content/offers";
import { BookingButton, ButtonLink } from "@/components/ui/Button";
import { Phone } from "@/components/ui/icons";
import { quoteHref, quoteIsExternal, site } from "@/content/site";
import { delay, Eyebrow } from "@/components/ui/Typography";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({  title: "Tarifs préparation mentale | Occitanie & visio | Muriel Calas",
  description:    "Séance découverte 80 €, suivi 5 séances 375 €, suivi 10 séances 720 € : les tarifs de préparation mentale de Muriel Calas, en Occitanie ou en visio. Ateliers et formations sur devis.",
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
          <p>            Séances d’une heure, en Occitanie ou en visio partout en France. Débloquer, comprendre, puis gagner
            en autonomie : choisissez la formule qui correspond à votre objectif.
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

      <section className="section-y" aria-labelledby="devis-titre">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Sur devis</Eyebrow>
              <h2 id="devis-titre" className="display-md mt-5 text-ink" data-reveal>
                Chaque situation est différente.
              </h2>
            </div>
            <p className="text-muted lg:col-span-4 lg:col-start-9" data-reveal>
              Certaines demandes ne rentrent pas dans les formules ci-dessus. Écrivez-moi : je vous réponds avec
              une proposition et un tarif adaptés.
            </p>
          </div>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
            {quoteRequests.map((q, i) => (
              <li key={q.title} className="bg-paper p-7 md:p-9" data-reveal style={delay(i * 90)}>
                <p className="eyebrow text-muted">{q.audience}</p>
                <h3 className="display-sm mt-3 text-ink">{q.title}</h3>
                <p className="numeral mt-3 text-lg text-clay">Sur devis</p>
                <ul className="mt-6 grid gap-3">
                  {q.items.map((item) => (
                    <li key={item} className="flex gap-3 text-muted">
                      <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-clay" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4" data-reveal>            <ButtonLink href={quoteHref} external={quoteIsExternal}>
              Demander un devis
            </ButtonLink>
            <a href={site.phone.href} className="link-line text-ink">
              <Phone size={16} />
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
