import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow, Lines } from "@/components/ui/Typography";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { site } from "@/content/site";

export function Testimonials() {
  return (
    <section className="section-y relative isolate overflow-hidden" aria-labelledby="temoignages-titre">
      {/* Guillemet monumental en filigrane */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-10 -z-10 select-none font-serif text-[22rem] leading-none text-ink/[0.035] md:text-[32rem]"
      >
        ”
      </span>
      <div className="wrap">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Témoignages</Eyebrow>
            <Lines id="temoignages-titre" className="display-lg mt-6" lines={["Ils m’ont fait confiance."]} />
          </div>
          <div data-reveal>
            <ArrowLink href="/temoignages">Tous les témoignages</ArrowLink>
          </div>
        </div>

        <div data-reveal>
          <TestimonialSlider />
        </div>

        <PressBand />
      </div>
    </section>
  );
}

/** Mention presse : volontairement discrète */
export function PressBand() {
  return (
    <aside className="mt-12 md:mt-16" aria-label="Ils parlent de mon travail" data-reveal>
      <div
        data-spotlight
        className="card-lift spotlight grid gap-6 rounded-[var(--radius-card)] border border-line bg-cream p-6 md:grid-cols-12 md:items-center md:gap-10 md:p-8"
      >
        <div className="md:col-span-3">
          <p className="eyebrow text-muted">Ils parlent de mon travail</p>
          <p className="mt-2 font-serif text-2xl text-ink">La Dépêche du Midi</p>
          <p className="text-sm text-muted">Juin 2026</p>
        </div>
        <p className="font-serif text-lg leading-snug text-ink md:col-span-6">{site.press.title}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 md:col-span-3 md:justify-end">
          <ArrowLink href="/publications-presse" className="text-ink">
            Lire l’article
          </ArrowLink>
        </div>
      </div>
    </aside>
  );
}
