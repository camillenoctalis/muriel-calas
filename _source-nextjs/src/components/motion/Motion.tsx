"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Orchestrateur d’animations, volontairement minimal (aucune librairie) :
 *  - [data-reveal]   → ajoute .is-in à l’entrée dans le viewport (voir globals.css)
 *  - [data-parallax] → translation verticale très légère liée au scroll (desktop uniquement)
 *  - [data-progress] → expose --progress (0 → 1) selon la traversée de l’élément dans le viewport
 *  - [data-draw]     → trait SVG (pathLength="1") qui se dessine selon le --progress de son [data-progress]
 * Tout est désactivé si l’utilisateur préfère réduire les animations.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      roots.forEach((el) => el.style.setProperty("--progress", "1"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const draws = roots.map((root) => ({
      root,
      paths: Array.from(root.querySelectorAll<SVGGeometryElement>("[data-draw]")),
    }));
    draws.forEach(({ paths }) =>
      paths.forEach((p) => {
        p.style.strokeDasharray = "1";
        p.style.strokeDashoffset = "1";
      }),
    );

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const desktop = window.innerWidth >= 768;

      for (const el of parallax) {
        if (!desktop) {
          el.style.transform = "";
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.06");
        const offset = rect.top + rect.height / 2 - vh / 2;
        const shift = Math.max(-48, Math.min(48, -offset * speed));
        el.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      }

      for (const { root, paths } of draws) {
        const rect = root.getBoundingClientRect();
        const start = vh * 0.85;
        const distance = Math.max(rect.height, vh * 0.25) + vh * 0.2;
        const progress = Math.min(1, Math.max(0, (start - rect.top) / distance));
        root.style.setProperty("--progress", progress.toFixed(3));
        for (const p of paths) p.style.strokeDashoffset = String(1 - progress);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
