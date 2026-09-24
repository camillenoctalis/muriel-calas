import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { ArrowLink } from "@/components/ui/Button";
import { delay } from "@/components/ui/Typography";
import { testimonials } from "@/content/testimonials";
import { QuoteText } from "@/components/sections/QuoteText";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Avis et témoignages préparation mentale | Muriel Calas",
  description:
    "Témoignages de sportifs et d’étudiants accompagnés en préparation mentale par Muriel Calas, à Mirepeisset près de Narbonne : visualisation, confiance, gestion du stress.",
  path: "/temoignages",
});

export default function TemoignagesPage() {  const [ilan, matteo, vincent, solene] = testimonials;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Témoignages", path: "/temoignages" }]}
        eyebrow="Témoignages"
        title={["Ils m’ont", <em key="e" className="accent-italic text-navy">fait confiance.</em>]}
        intro={
          <p>
            Quelques retours d’expérience de sportifs et d’étudiants accompagnés en préparation mentale. Leurs mots,
            simplement.
          </p>
        }
      />

      <section className="border-t border-line pb-16 pt-12 md:pb-24 md:pt-16" aria-label="Témoignages">
        <div className="wrap grid gap-6 lg:grid-cols-12">
          {/* Ilan — grand format */}
          <figure className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper md:grid-cols-2 lg:col-span-8" data-reveal>
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[26rem]">
              <Image src={ilan.image.src} alt={ilan.image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 92vw" className="object-cover object-[55%_40%]" />
            </div>
            <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
              <span className="chip self-start text-ink/80">{ilan.discipline}</span>
              <blockquote className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-[1.25] text-ink">
                <span aria-hidden="true" className="block font-serif text-6xl leading-none text-clay">
                  “
                </span>
                <QuoteText t={ilan} />
              </blockquote>
              <figcaption>
                <span className="block font-semibold text-ink">{ilan.name}</span>
                <span className="text-muted">{ilan.context}</span>
              </figcaption>
            </div>
          </figure>

          {/* Matteo — carte sombre */}
          <figure className="on-dark flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-ink text-paper lg:col-span-4" data-reveal style={delay(120)}>
            <div className="relative aspect-[16/9]">
              <Image src={matteo.image.src} alt={matteo.image.alt} fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-cover opacity-80" />
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-paper/80 backdrop-blur">
                Photo d’illustration
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-8 p-7 md:p-9">
              <span className="chip self-start border-line-dark text-paper/80">{matteo.discipline}</span>
              <blockquote className="font-serif text-[1.35rem] leading-[1.35]">
                « <QuoteText t={matteo} /> »
              </blockquote>
              <figcaption>
                <span className="block font-semibold">{matteo.name}</span>
                <span className="text-muted-dark">{matteo.context}</span>
              </figcaption>
            </div>
          </figure>          {/* Vincent — bandeau */}
          <figure className="grid gap-8 overflow-hidden rounded-[var(--radius-card)] bg-cream p-7 md:grid-cols-12 md:items-center md:p-12 lg:col-span-12" data-reveal>
            <div className="md:col-span-8">
              <span className="chip text-ink/80">{vincent.discipline}</span>
              <blockquote className="mt-8 font-serif text-[clamp(1.4rem,1.15rem+1vw,2rem)] leading-[1.3] text-ink">
                « <QuoteText t={vincent} /> »
              </blockquote>
              <figcaption className="mt-8">
                <span className="block font-semibold text-ink">{vincent.name}</span>
                <span className="text-muted">{vincent.context}</span>
              </figcaption>
            </div>
            <div className="md:col-span-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] md:aspect-[4/5]">
                <Image src={vincent.image.src} alt={vincent.image.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
              </div>
              <p className="mt-2 text-xs text-muted">Photo d’illustration</p>
            </div>
          </figure>

          {/* Solène — carte simple */}
          <figure className="flex flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-line p-7 md:p-10 lg:col-span-6" data-reveal>
            <span className="chip self-start text-ink/80">{solene.discipline}</span>
            <blockquote className="font-serif text-[1.35rem] leading-[1.35] text-ink">
              « <QuoteText t={solene} /> »
            </blockquote>
            <figcaption>
              <span className="block font-semibold text-ink">{solene.name}</span>
              <span className="text-muted">{solene.context}</span>
            </figcaption>
          </figure>
{/* Invitation */}          <div className={cn("grid gap-6 rounded-[var(--radius-card)] border border-dashed border-ink/25 p-7 md:items-center md:p-10 lg:col-span-6")} data-reveal>
            <div>
              <p className="eyebrow text-muted">Votre retour compte</p>
              <p className="display-sm mt-3 text-ink">Vous avez été accompagné(e) ? Partagez votre expérience.</p>              <p className="mt-3 max-w-2xl text-muted">Publié uniquement avec votre accord.</p>
</div>            <div>
              <ArrowLink href="/contact">Envoyer mon témoignage</ArrowLink>
            </div>
          </div>
        </div>

      </section>

      <FinalCta />
    </>
  );
}
