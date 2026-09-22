import { ButtonLink } from "@/components/ui/Button";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { CycleGraphic } from "@/components/sections/CycleGraphic";

const themes = [
  "Observer ses sensations",
  "Mieux se connaître",
  "Adapter sa préparation",
  "Gérer les sensations physiques",
  "Préserver sa concentration",
  "Apprivoiser ses émotions",
];

export function Cycle() {
  return (
    <section className="section-y bg-cream" aria-labelledby="cycle-titre">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="order-2 lg:order-1 lg:col-span-5" data-reveal="fade">
          <CycleGraphic className="mx-auto w-full max-w-[26rem] text-ink" />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Eyebrow>Public féminin</Eyebrow>
          <Lines
            id="cycle-titre"
            className="display-md mt-6"
            lines={["Mieux comprendre son cycle", <>pour <em className="accent-italic text-navy">adapter sa préparation.</em></>]}
          />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-clay/40 px-4 py-2 text-sm font-semibold text-clay" data-reveal style={delay(150)}>
            Spécialiste en optimisation du cycle menstruel
          </p>
          <p className="mt-7 max-w-xl text-muted" data-reveal style={delay(220)}>
            Le cycle peut influencer l’énergie, les sensations, la concentration ou les émotions, et chaque sportive
            le vit différemment. Apprendre à l’observer permet d’ajuster sa préparation plutôt que de la subir, pour
            aller chercher son « 100 % du jour ».
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2" data-reveal style={delay(300)}>
            {themes.map((t) => (
              <li key={t} className="flex items-center gap-3 text-ink">
                <span className="h-px w-4 bg-clay" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl text-sm text-muted" data-reveal style={delay(350)}>
            Une approche pédagogique, relevant de la préparation mentale : elle ne remplace pas un avis médical.
          </p>
          <div className="mt-9" data-reveal style={delay(400)}>
            <ButtonLink href="/cycle-menstruel">Découvrir cet accompagnement</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
