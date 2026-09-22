import type { ReactNode } from "react";
import { Breadcrumbs } from "./PageHero";

/** Mise en page sobre des pages juridiques */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-[calc(var(--header-h)+2rem)] md:pb-32 md:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="wrap-narrow">
        <Breadcrumbs items={[{ name: title, path }]} />
        <h1 className="display-lg mt-10 text-ink">{title}</h1>
        <p className="mt-4 text-sm text-muted">Dernière mise à jour : {updated}</p>
        <div className="prose-muriel mt-12">{children}</div>
      </div>
    </section>
  );
}

/** Donnée à compléter avant mise en ligne (visible, pour ne rien inventer) */
export function ToComplete({ children }: { children: ReactNode }) {
  return <mark className="rounded bg-clay/10 px-1.5 py-0.5 text-clay">[À compléter : {children}]</mark>;
}
