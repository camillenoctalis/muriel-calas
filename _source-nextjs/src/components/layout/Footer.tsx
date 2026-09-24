import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { Clock, Phone, Pin, Video } from "@/components/ui/icons";
import { coverage, footerNav, site } from "@/content/site";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-5 text-muted-dark">{title}</p>
      {children}
    </div>
  );
}

const linkClass =
  "inline-flex min-h-10 items-center text-[0.98rem] text-paper/85 transition-colors hover:text-paper";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" data-hide-cta className="on-dark relative overflow-hidden bg-ink text-paper">
      {/* Accroche */}
      <div className="wrap grid gap-10 pb-16 pt-20 md:grid-cols-12 md:items-end md:pt-28">
        <p className="display-md md:col-span-7">
          Apprendre à maîtriser <span className="accent-italic text-sky">ce qui dépend</span> de vous.
        </p>
        <p className="max-w-sm text-muted-dark md:col-span-4 md:col-start-9 md:justify-self-end md:text-right">
          Préparation mentale pour sportifs, étudiants et encadrants. En Occitanie et en visio, partout en
          France.
        </p>
      </div>

      <div className="wrap">
        <div className="hairline" />
      </div>

      {/* Colonnes */}
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3 text-paper" aria-label="Muriel Calas — accueil">
            <LogoMark className="h-11 w-11" />
            <span className="grid gap-1.5">
              <Wordmark className="h-[1.35rem]" />
              <span className="eyebrow text-muted-dark">Préparatrice mentale</span>
            </span>
          </Link>
          <ul className="mt-8 grid gap-3 text-[0.98rem] text-paper/85">
            <li className="flex gap-3">
              <Pin size={18} className="mt-1 shrink-0 text-clay-light" />
              <span>
                {coverage.base} · Déplacements en {coverage.region}
              </span>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="mt-1 shrink-0 text-clay-light" />
              <span>
                {site.hours.days}
                <br />
                {site.hours.slots.join(" · ")}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-1 shrink-0 text-clay-light" />
              <a href={site.phone.href} className="hover:text-paper">
                {site.phone.display}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <Column title="Navigation">
            <ul className="grid">
              {footerNav.navigation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-2">
          <Column title="Pratique">
            <ul className="grid">
              {footerNav.pratique.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        <div className="lg:col-span-3">
          <Column title="Zone d’intervention">
            <p className="text-[0.98rem] leading-relaxed text-paper/85">
              {coverage.region} : {coverage.cities.join(", ")}.
            </p>
            <p className="mt-3 flex items-center gap-2 text-[0.98rem] text-paper/85">
              <Video size={16} className="shrink-0 text-clay-light" />
              {coverage.remote}
            </p>
          </Column>
        </div>
      </div>

      {/* Signature graphique */}
      <div className="wrap pointer-events-none select-none" aria-hidden="true">
        <Wordmark className="w-full text-paper/[0.06]" />
      </div>

      {/* Bas de page */}
      <div className="wrap">
        <div className="flex flex-col gap-4 border-t border-line-dark py-7 text-sm text-muted-dark md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Muriel Calas — Préparatrice mentale en Occitanie et en visio
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#contenu" className="inline-flex min-h-10 items-center hover:text-paper">
                Haut de page ↑
              </a>
            </li>
          </ul>
        </div>
        <p className="pb-7 text-sm text-muted-dark">
          Créé sous le soleil de Narbonne par{" "}
          <a
            href="https://noctalis.digital"
            target="_blank"
            rel="noopener"
            className="text-paper underline decoration-clay-light/60 underline-offset-4 hover:decoration-clay-light"
          >
            Noctalis<span className="sr-only"> (nouvel onglet)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
