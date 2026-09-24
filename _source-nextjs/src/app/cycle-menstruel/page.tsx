import { PageHero } from "@/components/layout/PageHero";
import { CycleGraphic } from "@/components/sections/CycleGraphic";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowLink, BookingButton } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cycle menstruel et préparation mentale | Muriel Calas",
  description:
    "Spécialiste en optimisation du cycle menstruel : Muriel Calas aide les sportives à observer leur cycle pour adapter préparation, récupération, concentration et gestion émotionnelle. Narbonne et à distance.",
  path: "/cycle-menstruel",
});


export default function CyclePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Cycle menstruel", path: "/cycle-menstruel" }]}
        eyebrow="Public féminin"
        title={["Cycle menstruel", <em key="e" className="accent-italic text-navy">& préparation mentale.</em>]}
        intro={
          <p>            J’aide les sportives à connaître leur fonctionnement pour adapter leur préparation, plutôt que de
            subir leur cycle. J’interviens aussi en atelier auprès des équipes et des encadrants.
          </p>
        }
        aside={
          <div className="hero-fade rounded-[var(--radius-card)] bg-cream p-6 md:p-10" style={{ "--i": 2 } as React.CSSProperties}>
            <CycleGraphic className="mx-auto w-full max-w-[24rem] text-ink" />
          </div>
        }
      >
        <div className="flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-7">
          <BookingButton />
          <ArrowLink href="#encadrants">Clubs & encadrants</ArrowLink>
        </div>
      </PageHero>

      {/* Pourquoi en parler */}
      <section className="section-y border-t border-line" aria-labelledby="pourquoi-titre">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Pourquoi en parler ?</Eyebrow>
            <Lines id="pourquoi-titre" className="display-md mt-6" lines={["Un sujet encore", <em key="e" className="accent-italic text-navy">trop souvent tabou.</em>]} />
          </div>
          <div className="grid gap-5 text-muted lg:col-span-6 lg:col-start-7" data-reveal style={delay(150)}>
            <p>              Les fluctuations hormonales peuvent provoquer des gênes physiques ou des inconforts émotionnels, très
              variables d’une sportive à l’autre.
            </p>            <p>            Beaucoup de jeunes femmes n’osent pas en parler, de peur d’être écartées. J’ai moi-même connu ces
              difficultés, à une époque où l’on n’en parlait jamais.
            </p>
</div>
        </div>
        <div className="wrap mt-12">
          <blockquote className="rounded-[var(--radius-card)] bg-ink px-7 py-10 text-paper md:px-14 md:py-16" data-reveal>
            <p className="display-sm max-w-4xl">
              « J’ai eu envie de faire évoluer les mentalités, pour que les filles ne subissent plus leur cycle, mais
              puissent au contraire <em className="accent-italic text-sky">l’utiliser comme un atout</em>, quand
              c’est possible. »
            </p>            <footer className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-dark">
              <span>Muriel Calas, dans La Dépêche du Midi (juin 2026)</span>
              <a href={site.press.url} target="_blank" rel="noopener noreferrer" className="link-line text-paper">
                Lire l’article
                <span className="sr-only"> sur ladepeche.fr (nouvel onglet)</span>
              </a>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Démarche */}
      <section className="section-y bg-cream" aria-labelledby="demarche-titre">
        <div className="wrap">
          <Eyebrow>La démarche</Eyebrow>
          <Lines id="demarche-titre" className="display-md mt-6" lines={["Observer,", <em key="e" className="accent-italic text-navy">puis adapter.</em>]} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                n: "01",
                t: "Apprendre à observer son cycle",
                d: "Repérer ce qui se passe et à quel moment : énergie, sensations, humeur, concentration. Apprendre aussi à le signaler, sans honte ni peur, à son entourage sportif.",
              },
              {
                n: "02",
                t: "Adapter sa préparation",
                d: "S’appuyer sur ses points forts selon les phases, et compenser ce qui manque avec des outils adaptés : récupération, échauffement, activation, retour au calme, concentration.",
              },
            ].map((s, i) => (
              <div key={s.n} className="rounded-[var(--radius-card)] bg-paper p-7 md:p-10" data-reveal style={delay(i * 100)}>
                <span className="numeral text-sm text-clay">{s.n}</span>
                <h3 className="display-sm mt-3 text-ink">{s.t}</h3>
                <p className="mt-4 text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Encadrants */}
      <section id="encadrants" className="on-dark section-y scroll-mt-16 bg-ink text-paper" aria-labelledby="encadrants-titre">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow dark>Clubs, staffs & encadrants</Eyebrow>
            <Lines id="encadrants-titre" className="display-md mt-6" lines={["Former ceux qui", <em key="e" className="accent-italic text-sky">accompagnent les sportives.</em>]} />
            <p className="mt-6 text-muted-dark" data-reveal style={delay(150)}>
              J’interviens auprès de sélections féminines et d’encadrants, notamment au sein de la Ligue Occitanie
              de rugby. Un thème encore absent de la plupart des formations d’éducateurs.
            </p>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {[
              ["Comprendre", "Une partie pédagogique sur la physiologie, pour savoir ce qui se passe réellement."],
              ["En parler", "Comment aborder le sujet et montrer que l’on sait écouter, sans être intrusif."],
              ["Outiller", "Des outils d’éducation mentale simples, applicables avec les joueuses."],
              ["Adapter", "Ajuster ponctuellement l’entraînement : plus de récupération, exercices différents selon les périodes."],
            ].map(([t, d], i) => (
              <li key={t} data-reveal style={delay(i * 80)}>
                <span data-reveal="rule" className="block h-px bg-paper/25" aria-hidden="true" />
                <h3 className="title-sm mt-5">{t}</h3>
                <p className="mt-2 text-muted-dark">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cadre */}
      <section className="py-12 md:py-16" aria-labelledby="cadre-titre">
        <div className="wrap">
          <div className="grid gap-6 rounded-[var(--radius-card)] border border-line p-7 md:grid-cols-12 md:p-10" data-reveal>
            <h2 id="cadre-titre" className="title-sm text-ink md:col-span-4">
              Un accompagnement, pas un traitement
            </h2>
            <p className="text-muted md:col-span-8">
              Cet accompagnement relève de la préparation mentale et de l’observation individuelle. Il ne remplace
              pas un avis médical : en cas de douleurs importantes, de troubles du cycle ou de toute question de
              santé, consultez votre médecin, votre gynécologue ou votre sage-femme.
            </p>
          </div>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Et si votre cycle devenait <em className="accent-italic text-sky">une information</em> plutôt qu’un frein ?
          </>
        }
        text="Un premier échange, sans engagement, pour faire le point sur votre situation et vos objectifs."
      />
    </>
  );
}
