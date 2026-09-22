import { BookingButton } from "@/components/ui/Button";
import { Calendar, Check, Clock, Lock, Phone, Video } from "@/components/ui/icons";
import { delay, Eyebrow, Lines } from "@/components/ui/Typography";
import { NarbonnaisMap } from "@/components/sections/NarbonnaisMap";
import { site } from "@/content/site";

const practical = [
  { icon: Clock, title: "Durée", text: "Séances d’environ 45 min à 1 h" },
  { icon: Video, title: "Format", text: "En présentiel à Mirepeisset ou en visio" },
  { icon: Calendar, title: "Rendez-vous", text: "Prise de rendez-vous simple, en ligne ou par téléphone" },
  { icon: Check, title: "Suivi", text: "Un suivi possible entre les séances" },
  { icon: Lock, title: "Cadre", text: "Des échanges bienveillants et confidentiels" },
];

export function Local() {
  return (
    <section id="narbonnais" className="section-y bg-cream" aria-labelledby="local-titre">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Eyebrow>Informations pratiques</Eyebrow>
          <Lines
            id="local-titre"
            className="display-md mt-6"
            lines={["Préparation mentale", <>dans le <em className="accent-italic text-navy">Narbonnais.</em></>]}
          />
          <p className="mt-7 max-w-xl text-muted" data-reveal style={delay(150)}>
            J’exerce depuis Mirepeisset et j’accompagne des sportifs, des étudiants, des entraîneurs et des
            particuliers venus notamment de Narbonne, Sallèles-d’Aude, Saint-Marcel-sur-Aude, Ginestas, Ouveillan ou
            Cuxac-d’Aude. Vous habitez plus loin ? Les séances peuvent aussi se dérouler à distance, en visio.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2" data-reveal style={delay(220)}>
            {practical.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon size={20} className="mt-0.5 shrink-0 text-clay" />
                <div>
                  <dt className="font-semibold text-ink">{title}</dt>
                  <dd className="mt-0.5 text-[0.97rem] text-muted">{text}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-6 rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:grid-cols-2 md:p-7" data-reveal style={delay(280)}>
            <div>
              <p className="eyebrow text-muted">Téléphone</p>
              <a href={site.phone.href} className="mt-2 inline-flex items-center gap-2 font-serif text-2xl text-ink hover:text-navy">
                <Phone size={18} />
                {site.phone.display}
              </a>
            </div>
            <div>
              <p className="eyebrow text-muted">Horaires</p>
              <p className="mt-2 text-ink">
                {site.hours.days}
                <br />
                {site.hours.slots.join(" · ")}
              </p>
            </div>
          </div>
          <div className="mt-8" data-reveal>
            <BookingButton />
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <figure className="rounded-[var(--radius-card)] border border-line bg-paper p-4 md:p-6" data-reveal="fade">
            <NarbonnaisMap className="h-auto w-full text-ink" />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="focus-dot" aria-hidden="true" />
                Séances à Mirepeisset (11120)
              </span>
              <span>Carte indicative</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
