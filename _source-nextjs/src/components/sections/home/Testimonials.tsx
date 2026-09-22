import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow, Lines } from "@/components/ui/Typography";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";
import { site } from "@/content/site";

export function Testimonials() {
  return (
    <section className="section-y overflow-hidden" aria-labelledby="temoignages-titre">
      <div className="wrap">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
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
    <aside
      className="mt-12 grid gap-6 rounded-[var(--radius-card)] bg-cream p-6 md:mt-16 md:grid-cols-12 md:items-center md:gap-10 md:p-8"
      aria-label="Ils parlent de mon travail"
      data-reveal
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
    </aside>
  );
}
