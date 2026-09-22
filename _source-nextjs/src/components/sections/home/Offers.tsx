import { ArrowLink } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { Pricing } from "@/components/sections/Pricing";

export function Offers() {
  return (
    <section className="on-dark section-y relative overflow-hidden bg-ink text-paper" aria-labelledby="offres-titre">
      <div className="wrap">
        <div className="mb-10 grid gap-8 lg:mb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow dark>Accompagnements & tarifs</Eyebrow>
            <Lines
              id="offres-titre"
              className="display-lg mt-6"
              lines={["Avancer à votre rythme,", <>jusqu’à <em className="accent-italic text-sky">l’autonomie.</em></>]}
            />
          </div>
          <p className="max-w-md text-muted-dark lg:col-span-4 lg:col-start-9" data-reveal style={delay(200)}>
            Trois formules, à Mirepeisset ou en visio. Séances de 45 min à 1 h.
          </p>
        </div>

        <Pricing tone="dark" />        <div className="mt-10" data-reveal>
          <ArrowLink href="/tarifs" className="text-paper">
            Comparer les formules en détail
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
