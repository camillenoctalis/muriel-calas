"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Calendar, Phone } from "@/components/ui/icons";
import { site } from "@/content/site";

/**
 * Réservation en ligne.
 * Si NEXT_PUBLIC_CALENDLY_URL est défini, l’agenda Calendly s’affiche dans la page… uniquement au clic
 * (aucun script tiers ni cookie avant l’action de la personne, pas de popup au chargement).
 */
export function BookingPanel() {
  const [open, setOpen] = useState(false);
  const url = site.calendlyUrl;

  return (
    <div id="rendez-vous" className="on-dark scroll-mt-28 rounded-[var(--radius-card)] bg-ink p-7 text-paper md:p-9">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-paper/10 text-clay-light">
        <Calendar size={22} />
      </span>
      <h2 className="display-sm mt-6">Réserver un appel découverte</h2>
      <p className="mt-3 text-muted-dark">
        Un premier échange, sans engagement, pour faire le point sur votre situation et voir comment avancer
        ensemble.
      </p>

      {url ? (
        <>
          {!open ? (
            <div className="mt-8 flex flex-col items-start gap-4">
              <button type="button" onClick={() => setOpen(true)} className="btn btn-light">
                <span>Voir les disponibilités</span>
                <span className="btn-icon">
                  <ArrowRight size={15} />
                </span>
              </button>
              <a href={url} target="_blank" rel="noopener noreferrer" className="link-line text-sm text-paper/85">
                Ouvrir l’agenda dans un nouvel onglet
                <ArrowUpRight size={14} />
              </a>
            </div>
          ) : (
            <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] bg-paper">
              <iframe
                title="Agenda de réservation de Muriel Calas"
                src={`${url}${url.includes("?") ? "&" : "?"}hide_gdpr_banner=1&primary_color=1b3a5b`}
                className="h-[42rem] w-full"
                loading="lazy"
              />
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 grid gap-4">
          <a href={site.phone.href} className="btn btn-light self-start">
            <span>Appeler le {site.phone.display}</span>
            <span className="btn-icon">
              <Phone size={15} />
            </span>
          </a>
          <p className="text-sm text-muted-dark">
            {site.hours.days}, {site.hours.slots.join(" et ")}. Vous pouvez aussi laisser un message via le
            formulaire : je vous rappelle pour convenir d’un créneau.
          </p>
        </div>
      )}
    </div>
  );
}
