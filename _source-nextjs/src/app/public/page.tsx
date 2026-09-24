import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowLink, BookingButton, ButtonLink } from "@/components/ui/Button";
import { delay, Eyebrow } from "@/components/ui/Typography";
import { audiences } from "@/content/audiences";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({  title: "Préparation mentale sportifs, étudiants, coachs | Occitanie",
  description:    "Préparation mentale en Occitanie et en visio pour sportifs amateurs et confirmés, sportifs blessés, collégiens, lycéens, étudiants, entraîneurs, éducateurs et arbitres : stress, confiance, concentration.",
  path: "/public",
});

export default function PublicPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Pour qui ?", path: "/public" }]}
        eyebrow="Pour qui ?"
        title={["Sportifs, étudiants,", <em key="e" className="accent-italic text-navy">encadrants.</em>]}
        intro={
          <p>            Pas besoin d’être un athlète de haut niveau : il suffit de vouloir garder ses moyens dans les moments
            qui comptent.
          </p>
        }
      >
        <nav aria-label="Aller à un public">
          <ul className="flex flex-wrap gap-2">
            {[...audiences.map((a) => ({ id: a.id, label: a.label })), { id: "feminin", label: "Public féminin" }, { id: "parents", label: "Parents" }].map((a) => (
              <li key={a.id}>
                <a href={`#${a.id}`} className="chip min-h-11 px-4 text-[0.95rem] text-ink transition-colors hover:border-ink">
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {audiences.map((a, idx) => {
        const flip = idx % 2 === 1;
        return (
          <section
            key={a.id}
            id={a.id}
            className={cn("section-y scroll-mt-16", idx % 2 === 0 ? "border-t border-line" : "bg-cream")}
            aria-labelledby={`${a.id}-titre`}
          >
            <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
                <div data-reveal="media" className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand">
                  <Image src={a.image.src} alt={a.image.alt} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
                </div>
              </div>

              <div className={cn("lg:col-span-6", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                <Eyebrow>{a.who}</Eyebrow>
                <h2 id={`${a.id}-titre`} className="display-md mt-5 text-ink" data-reveal>
                  <em className="accent-italic">{a.question}</em>
                </h2>
                <p className="mt-5 text-muted" data-reveal style={delay(100)}>
                  {a.detail.problem}
                </p>
                <ul className="mt-6 grid gap-2.5" data-reveal style={delay(150)}>
                  {a.detail.goals.slice(0, 4).map((g) => (
                    <li key={g} className="flex gap-3 text-ink">
                      <span aria-hidden="true" className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" data-reveal>
                  <BookingButton size="sm" />
                  <Link href="/tarifs" className="link-line text-ink">
                    Voir les tarifs
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Public féminin */}
      <section id="feminin" className="section-y scroll-mt-16 border-t border-line" aria-labelledby="feminin-titre">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Eyebrow>Public féminin</Eyebrow>
            <h2 id="feminin-titre" className="display-md mt-6 text-ink" data-reveal>
              Sportives : et si votre cycle devenait <em className="accent-italic text-navy">une information</em>{" "}
              plutôt qu’un frein ?
            </h2>
            <p className="mt-6 max-w-xl text-muted" data-reveal style={delay(150)}>
              Spécialiste en optimisation du cycle menstruel, j’aide les sportives à observer leur fonctionnement pour
              adapter leur préparation, leur récupération et leur gestion émotionnelle. J’interviens aussi auprès
              des équipes et des encadrants.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end" data-reveal>
            <ButtonLink href="/cycle-menstruel">Découvrir cet accompagnement</ButtonLink>
          </div>
        </div>
      </section>

      {/* Parents */}
      <section id="parents" className="scroll-mt-16 pb-24 md:pb-32" aria-labelledby="parents-titre">
        <div className="wrap">
          <div className="grid gap-8 rounded-[var(--radius-card)] bg-sand/70 p-7 md:grid-cols-12 md:items-center md:p-12" data-reveal>
            <div className="md:col-span-8">
              <p className="eyebrow text-muted">Vous êtes parent ?</p>
              <h2 id="parents-titre" className="display-sm mt-4 text-ink">
                Votre enfant est sportif ou prépare un examen ?
              </h2>
              <p className="mt-4 max-w-2xl text-muted">
                Collégiens et lycéens font partie des personnes que j’accompagne. Contactez-moi pour en parler : un
                premier échange permet de voir, ensemble, si l’accompagnement est adapté.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <ArrowLink href="/contact">Prendre contact</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
