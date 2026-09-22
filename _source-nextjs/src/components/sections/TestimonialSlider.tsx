"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { testimonials } from "@/content/testimonials";
import { QuoteText } from "./QuoteText";
import { cn } from "@/lib/cn";

/**
 * Carrousel de témoignages : défilement natif (scroll-snap) — fluide au doigt et au trackpad —,
 * flèches, clavier, indicateur de position annoncé aux lecteurs d’écran. Pas de défilement automatique.
 */
export function TestimonialSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.6) setIndex(slides.indexOf(e.target as HTMLElement));
        }
      },
      { root: el, threshold: [0.6] },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (to: number) => {
      const el = track.current;
      if (!el) return;
      const target = (to + count) % count;
      const slide = el.children[target] as HTMLElement | undefined;
      if (!slide) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const left = el.scrollLeft + slide.getBoundingClientRect().left - el.getBoundingClientRect().left;
      el.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    },
    [count],
  );

  return (
    <div
      data-slider
      role="region"
      aria-roledescription="carrousel"
      aria-label="Témoignages de personnes accompagnées"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        ref={track}
        data-slider-track
        className="-mx-[var(--gutter)] flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Faites défiler les témoignages"
      >
        {testimonials.map((t, i) => (
          <article
            key={t.id}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${count} : ${t.name}`}
            className="w-full shrink-0 snap-start px-[var(--gutter)]"
          >
            <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
              <figure className="md:col-span-5">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[var(--radius-card)] bg-sand",
                    "aspect-[16/11] md:aspect-[4/5]",
                  )}
                >
                  <Image
                    src={t.image.src}
                    alt={t.image.alt}
                    fill
                    sizes="(min-width: 768px) 40vw, 92vw"
                    className={cn(
                      "object-cover transition-transform duration-[1.4s] ease-[var(--ease-out)]",
                      i === index ? "scale-100" : "scale-105",
                      t.id === "ilan" && "object-[55%_40%]",
                    )}
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink backdrop-blur">
                    {t.discipline}
                  </span>
                </div>
                {!t.image.isPortrait && (
                  <figcaption className="mt-2 text-xs text-muted">Photo d’illustration</figcaption>
                )}
              </figure>

              <blockquote className="md:col-span-7 md:pl-4">
                <span aria-hidden="true" className="block h-12 font-serif text-[6rem] leading-[0.9] text-clay">
                  “
                </span>
                <p className="font-serif text-[clamp(1.4rem,1.05rem+1.5vw,2.35rem)] leading-[1.28] tracking-[-0.012em] text-ink">
                  <QuoteText t={t} className="accent-italic text-navy" />
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-ink/30" aria-hidden="true" />
                  <span>
                    <cite className="block not-italic font-semibold text-ink">{t.name}</cite>
                    <span className="text-[0.95rem] text-muted">{t.context}</span>
                  </span>
                </footer>
              </blockquote>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4" aria-hidden="true">
          <span data-slider-current className="numeral text-sm text-ink">{String(index + 1).padStart(2, "0")}</span>
          <span className="relative h-px w-24 bg-ink/15 sm:w-40">
            <span
              data-slider-bar
              className="absolute inset-y-0 left-0 bg-clay transition-[width] duration-700 ease-[var(--ease-out)]"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          </span>
          <span className="numeral text-sm text-muted">{String(count).padStart(2, "0")}</span>
        </div>
        <p data-slider-live className="sr-only" aria-live="polite">
          Témoignage {index + 1} sur {count}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            data-slider-prev
            className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            aria-label="Témoignage précédent"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            data-slider-next
            className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            aria-label="Témoignage suivant"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
