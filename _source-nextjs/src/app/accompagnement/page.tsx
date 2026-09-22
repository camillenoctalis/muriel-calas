import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Process } from "@/components/sections/home/Process";
import { Faq } from "@/components/sections/home/Faq";
import { ArrowLink, BookingButton } from "@/components/ui/Button";
import { Calendar, Check, Clock, Lock, Video } from "@/components/ui/icons";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { tools } from "@/content/approach";
import { faq } from "@/content/faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { offers, formatPrice } from "@/content/offers";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accompagnement en préparation mentale à Narbonne | Muriel Calas",
  description:
    "Comment se déroule un accompagnement en préparation mentale avec Muriel Calas : premier appel, objectifs, outils concrets, séances de 45 min à 1 h, suivi, présentiel à Mirepeisset ou visio.",
  path: "/accompagnement",
});

const practical = [
  { icon: Clock, title: "Durée", text: "Une séance dure environ 45 minutes à 1 heure." },
  { icon: Video, title: "Présentiel ou visio", text: "À Mirepeisset, dans le Narbonnais, ou à distance selon votre localisation et vos préférences." },
  { icon: Check, title: "Suivi", text: "Un rendez-vous de suivi peut être proposé entre les séances pour accompagner votre progression." },
  { icon: Lock, title: "Confidentialité", text: "Les échanges se déroulent dans un cadre bienveillant, respectueux et confidentiel." },
  { icon: Calendar, title: "Prise de rendez-vous", text: "Réservation en ligne, selon vos disponibilités, ou par téléphone." },
];

export default function AccompagnementPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <PageHero
        crumbs={[{ name: "Accompagnement", path: "/accompagnement" }]}
        eyebrow="Mon accompagnement"
        title={["Un entraînement", <em key="e" className="accent-italic text-navy">pour la tête.</em>]}
        intro={
          <p>            La préparation mentale développe la gestion du stress, la concentration, la confiance et la gestion
            des émotions, comme on entraîne le physique ou la technique. Elle ne soigne pas : elle entraîne.
          </p>
        }
        image={{
          src: "/images/carnet-seance.jpg",
          alt: "Mains prenant des notes dans un carnet pendant une séance",
          position: "50% 50%",
        }}
      >
        <div className="flex flex-col items-start gap-5 xs:flex-row xs:items-center xs:gap-7">
          <BookingButton />
          <ArrowLink href="/tarifs">Voir les tarifs</ArrowLink>
        </div>
      </PageHero>

      <div className="border-t border-line">
        <Process showPractical={false} />
      </div>

      {/* Outils */}
      <section className="on-dark section-y bg-ink text-paper" aria-labelledby="outils-titre">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow dark>Boîte à outils</Eyebrow>
            <Lines id="outils-titre" className="display-md mt-6" lines={["Des outils concrets,", <em key="e" className="accent-italic text-sky">choisis avec vous.</em>]} />
            <p className="mt-6 max-w-sm text-muted-dark" data-reveal style={delay(200)}>
              Il n’existe pas de recette unique. Les outils sont sélectionnés selon votre fonctionnement, testés en
              séance, puis ajustés.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {tools.map((t, i) => (
              <li key={t.title} data-reveal style={delay(i * 70)}>
                <span data-reveal="rule" style={delay(i * 70 + 80)} className="block h-px bg-paper/25" aria-hidden="true" />
                <h3 className="title-sm mt-5">{t.title}</h3>
                <p className="mt-2 text-muted-dark">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="section-y bg-cream" aria-labelledby="pratique-titre">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Informations pratiques</Eyebrow>
            <h2 id="pratique-titre" className="display-md mt-6 text-ink" data-reveal>
              Simple et accessible.
            </h2>
            <div className="mt-8 grid gap-4" data-reveal style={delay(150)}>
              {offers.map((o) => (
                <Link key={o.id} href={`/tarifs#${o.id}`} className="group flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <span className="text-ink group-hover:text-navy">{o.name}</span>
                  <span className="numeral text-lg text-ink">{formatPrice(o.price)}</span>
                </Link>
              ))}
              <ArrowLink href="/tarifs" className="mt-2 self-start">
                Comparer les formules
              </ArrowLink>
            </div>
          </div>
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {practical.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="flex gap-4" data-reveal style={delay(i * 70)}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-clay/30 text-clay">
                  <Icon size={19} />
                </span>
                <div>
                  <dt className="font-semibold text-ink">{title}</dt>
                  <dd className="mt-1 text-muted">{text}</dd>
                </div>
              </div>
            ))}
          </dl>
          <p className="text-sm text-muted lg:col-span-12">
            La préparation mentale ne remplace pas un suivi médical ou psychologique. En cas de souffrance
            importante, un professionnel de santé (médecin, psychologue) sera l’interlocuteur adapté.
          </p>
        </div>
      </section>

      <Faq />
      <FinalCta />
    </>
  );
}
