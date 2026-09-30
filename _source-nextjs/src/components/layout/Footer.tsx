import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/ui/Logo";
import { Clock, Phone, Pin, Video } from "@/components/ui/icons";
import { coverage, footerNav, site } from "@/content/site";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3 text-muted-dark">{title}</p>
      {children}
    </div>
  );
}

const linkClass = "link-grow inline-flex min-h-8 items-center text-[0.95rem] text-paper/80 hover:text-paper";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" data-hide-cta className="on-dark relative overflow-hidden bg-ink text-paper">
      {/* Colonnes */}
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-12 lg:grid-cols-12 lg:gap-8">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3 text-paper" aria-label="Muriel Calas — accueil">
            <LogoMark className="h-10 w-10" />
            <span className="grid gap-1.5">
              <Wordmark className="h-[1.35rem]" />
              <span className="eyebrow text-muted-dark">Préparatrice mentale</span>
            </span>
          </Link>
          <ul className="mt-6 grid gap-2.5 text-[0.95rem] text-paper/85">
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
              <a href={site.phone.href} className="link-grow hover:text-paper">
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

        <div className="col-span-2 lg:col-span-3">
          <Column title="Zone d’intervention">
            <p className="text-[0.95rem] leading-relaxed text-paper/85">
              {coverage.region} : {coverage.cities.join(", ")}.
            </p>
            <p className="mt-2 flex items-center gap-2 text-[0.95rem] text-paper/85">
              <Video size={16} className="shrink-0 text-clay-light" />
              {coverage.remote}
            </p>
          </Column>
        </div>
      </div>

      {/* Bas de page */}
      <div className="wrap">
        <div className="flex flex-col gap-3 border-t border-line-dark py-5 text-sm text-muted-dark md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p>
            © {year} Muriel Calas · Créé sous le soleil de Narbonne par{" "}
            <a
              href="https://noctalis.digital"
              target="_blank"
              rel="noopener"
              className="text-paper underline decoration-clay-light/60 underline-offset-4 hover:decoration-clay-light"
            >
              Noctalis<span className="sr-only"> (nouvel onglet)</span>
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-grow inline-flex min-h-8 items-center hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#contenu" className="group inline-flex min-h-8 items-center gap-1.5 hover:text-paper">
                Haut de page
                <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-0.5">
                  ↑
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
