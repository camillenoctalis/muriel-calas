import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowLink } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";
import { delay, Eyebrow } from "@/components/ui/Typography";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Publications presse | Muriel Calas, préparatrice mentale",
  description:
    "Muriel Calas dans La Dépêche du Midi : comment mieux gérer les cycles menstruels dans le sport féminin. Une intervention auprès des éducateurs de la Ligue Occitanie de rugby.",
  path: "/publications-presse",
});

const quotes = ["C’est vraiment un travail en deux temps : il faut d’abord apprendre à observer son cycle, à accepter de le signaler sans honte ni peur.",
  "Bien utilisé, le cycle peut vraiment devenir un outil de performance.",
];

export default function PressePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Publications & presse", path: "/publications-presse" }]}
        eyebrow="Presse"
        title={["Ils parlent", <em key="e" className="accent-italic text-navy">de mon travail.</em>]}
        intro={<p>Articles, interventions et prises de parole autour de la préparation mentale et du sport féminin.</p>}
      />

      <section className="border-t border-line pb-16 pt-12 md:pb-24 md:pt-16" aria-labelledby="article-titre">
        <div className="wrap">
          <article className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <header className="lg:col-span-5">
              <div className="rounded-[var(--radius-card)] bg-ink p-7 text-paper md:p-10" data-reveal>
                <p className="eyebrow text-clay-light">{site.press.outlet}</p>
                <p className="mt-2 text-sm text-muted-dark">
                  <time dateTime={site.press.date}>10 juin 2026</time> · Article de {site.press.author}
                </p>
                <h2 id="article-titre" className="display-sm mt-8">
                  {site.press.title}
                </h2>
                <a
                  href={site.press.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line mt-10 text-paper"
                >
                  Lire l’article sur ladepeche.fr
                  <ArrowUpRight size={16} />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
                <p className="mt-3 text-xs text-muted-dark">Article réservé aux abonnés de La Dépêche.</p>
              </div>
            </header>

            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>En résumé</Eyebrow>
              <p className="lead mt-6 text-ink" data-reveal>
                Invitée par Philippe Carayon, conseiller technique des clubs de la Ligue Occitanie de rugby, Muriel
                Calas est intervenue au stade Pierre-Fabre de Castres auprès d’éducateurs d’équipes féminines, pour
                aborder un sujet encore tabou dans le sport : la gestion des cycles menstruels.
              </p><h3 className="eyebrow mt-10 text-muted">Extraits</h3>
              <ul className="mt-6 grid gap-8">
                {quotes.map((q, i) => (
                  <li key={q} data-reveal style={delay(i * 80)}>
                    <blockquote className="border-l border-clay pl-6 font-serif text-xl leading-snug text-ink md:text-2xl">
                      « {q} »
                    </blockquote>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
                <ArrowLink href="/cycle-menstruel">L’accompagnement cycle menstruel</ArrowLink>
                <ArrowLink href="/contact">Proposer une intervention</ArrowLink>
              </div>
            </div>
          </article>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
