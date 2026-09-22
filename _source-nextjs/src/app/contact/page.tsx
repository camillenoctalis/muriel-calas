import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { BookingPanel } from "@/components/contact/BookingPanel";
import { ContactForm } from "@/components/contact/ContactForm";
import { Clock, Phone, Pin, Video } from "@/components/ui/icons";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact et rendez-vous | Préparatrice mentale à Narbonne",
  description:
    "Contactez Muriel Calas, préparatrice mentale à Mirepeisset près de Narbonne : appel découverte sans engagement, téléphone 06 22 06 44 59, séances en présentiel ou en visio.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="pb-24 pt-[calc(var(--header-h)+2rem)] md:pb-32 md:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="wrap">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} className="hero-fade" />

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow hero-fade flex items-center gap-3 text-muted">
              <span className="focus-dot" aria-hidden="true" />
              Contact
            </p>
            <h1 className="display-xl mt-6 text-ink">
              <span className="line">
                <span className="hero-rise inline-block">Parlons de</span>
              </span>
              <span className="line">
                <span className="hero-rise inline-block" style={{ "--i": 1 } as React.CSSProperties}>
                  <em className="accent-italic text-navy">votre situation.</em>
                </span>
              </span>
            </h1>
          </div>
          <p className="lead hero-fade self-end text-muted lg:col-span-5">
            Par téléphone, en ligne ou via le formulaire : choisissez ce qui vous convient. Le premier échange est
            sans engagement.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <aside className="grid content-start gap-6 lg:col-span-5" aria-label="Coordonnées et réservation">
            <BookingPanel />

            <div className="rounded-[var(--radius-card)] border border-line p-7 md:p-9">
              <div className="flex items-center gap-4">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-sand">
                  <Image src="/images/muriel-calas-preparatrice-mentale.jpg" alt="" fill sizes="56px" className="object-cover object-[50%_25%]" />
                </span>
                <p className="leading-tight">
                  <span className="block font-serif text-xl text-ink">Muriel Calas</span>
                  <span className="text-sm text-muted">Je vous réponds personnellement.</span>
                </p>
              </div>
              <dl className="mt-8 grid gap-6">
                <div className="flex gap-4">
                  <Phone size={20} className="mt-1 shrink-0 text-clay" />
                  <div>
                    <dt className="eyebrow text-muted">Téléphone</dt>
                    <dd className="mt-1">
                      <a href={site.phone.href} className="font-serif text-2xl text-ink hover:text-navy">
                        {site.phone.display}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock size={20} className="mt-1 shrink-0 text-clay" />
                  <div>
                    <dt className="eyebrow text-muted">Horaires</dt>
                    <dd className="mt-1 text-ink">
                      {site.hours.days}
                      <br />
                      {site.hours.slots.join(" · ")}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Pin size={20} className="mt-1 shrink-0 text-clay" />
                  <div>
                    <dt className="eyebrow text-muted">Lieu</dt>
                    <dd className="mt-1 text-ink">
                      Mirepeisset ({site.location.postalCode}), dans le Narbonnais
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Video size={20} className="mt-1 shrink-0 text-clay" />
                  <div>
                    <dt className="eyebrow text-muted">Format</dt>
                    <dd className="mt-1 text-ink">Séances en présentiel ou en visio</dd>
                  </div>
                </div>
              </dl>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <div className="rounded-[var(--radius-card)] bg-cream p-6 sm:p-8 md:p-12">
              <h2 className="display-sm text-ink">Écrire un message</h2>
              <p className="mt-3 max-w-xl text-muted">
                Quelques mots sur votre situation suffisent : votre discipline ou vos études, vos échéances, ce que
                vous aimeriez travailler.
              </p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
