"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingButton } from "@/components/ui/Button";
import { Phone } from "@/components/ui/icons";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Barre d’action collante sur mobile : apparaît après le premier écran,
 * disparaît quand un appel à l’action final ou le pied de page est visible.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = document.querySelectorAll("[data-hide-cta]");
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [pathname]);

  if (pathname.startsWith("/contact")) return null;

  const show = pastHero && !blocked;

  return (
    <div
      data-mobile-cta
      aria-hidden={!show}
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out)] sm:hidden",
        show ? "translate-y-0" : "translate-y-[140%]",
      )}
    >
      <div className="flex items-center gap-2 rounded-full bg-ink/95 p-1.5 shadow-[0_12px_40px_-12px_rgb(13_27_42/0.55)] backdrop-blur">
        <BookingButton variant="light" size="sm" className="flex-1">
          Réserver un appel découverte
        </BookingButton>
        <a
          href={site.phone.href}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/25 text-paper"
          aria-label={`Appeler Muriel Calas au ${site.phone.display}`}
        >
          <Phone size={18} />
        </a>
      </div>
    </div>
  );
}
