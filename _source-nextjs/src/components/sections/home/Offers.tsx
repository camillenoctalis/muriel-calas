import { ArrowLink } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { Pricing } from "@/components/sections/Pricing";

export function Offers() {
  return (
    <section className="on-dark section-y relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="offres-titre">
      {/* Halo bleu nuit, pour éviter l’aplat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[15%] -top-[30%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(closest-side,rgb(61_98_133/0.35),transparent)]" />
        <div className="absolute -bottom-[35%] -left-[10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(217_143_102/0.1),transparent)]" />
      </div>
      <div className="wrap">
        <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow dark>Accompagnements & tarifs</Eyebrow>
            <Lines
              id="offres-titre"
              className="display-lg mt-6"
              lines={["Avancer à votre rythme,", <>jusqu’à <em className="accent-italic text-sky">l’autonomie.</em></>]}
            />
          </div>
          <p className="max-w-md text-muted-dark lg:col-span-4 lg:col-start-9" data-reveal style={delay(200)}>
            Trois formules, à Narbonne, en Occitanie ou en visio. Séances d’une heure.
          </p>
        </div>

        <Pricing tone="dark" />

        <div className="mt-10" data-reveal>
          <ArrowLink href="/tarifs" className="text-paper">
            Comparer les formules en détail
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
