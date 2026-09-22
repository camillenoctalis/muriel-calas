"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo, LogoMark, Wordmark } from "@/components/ui/Logo";
import { BookingButton } from "@/components/ui/Button";
import { Close, Menu, Phone } from "@/components/ui/icons";
import { mainNav, site } from "@/content/site";
import { cn } from "@/lib/cn";

const secondaryNav = [
  { label: "Cycle menstruel", href: "/cycle-menstruel" },
  { label: "Publications & presse", href: "/publications-presse" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // États au scroll : fond après quelques pixels, masquage en descente, retour en remontée
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 16);
        if (Math.abs(y - last) > 6) {
          setHidden(y > last && y > 420);
          last = y;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Menu mobile : verrouillage du scroll, piège à focus, touche Échap
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    requestAnimationFrame(() => focusables()[1]?.focus());

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Aller au contenu
      </a>

      <header
        data-header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-out)]",
          scrolled ? "bg-paper/88 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 text-ink" aria-label="Muriel Calas — accueil">
            <Logo markClassName="h-8 w-8 xs:h-9 xs:w-9" wordClassName="h-[1.15rem] xs:h-[1.3rem]" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden nav:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex h-11 items-center px-3.5 text-[0.95rem] font-medium transition-colors",
                        active ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-clay transition-all duration-500",
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 px-3 text-[0.95rem] font-medium text-muted transition-colors hover:text-ink min-[90rem]:inline-flex"
            >
              <Phone size={16} />
              {site.phone.display}
            </a>
            <BookingButton size="sm" className="hidden sm:inline-flex">
              Prendre rendez-vous
            </BookingButton>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 pl-4 pr-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:border-ink/40 nav:hidden"
            >
              Menu
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        ref={panelRef}
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        onClick={(e) => {
          // Fermeture dès qu’un lien est suivi
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="on-dark fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-paper nav:hidden"
        style={{ animation: open ? "menu-in 0.7s var(--ease-out) both" : undefined }}
      >
        <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 text-paper">
            <LogoMark className="h-8 w-8" />
            <Wordmark className="h-[1.15rem]" />
            <span className="sr-only">Accueil</span>
          </Link>
          <button
            type="button"
            onClick={close}
            data-menu-close
            className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/25 pl-4 pr-3.5 text-[0.95rem] font-medium"
          >
            Fermer
            <Close size={20} />
          </button>
        </div>

        <nav aria-label="Navigation mobile" className="wrap flex flex-1 flex-col justify-between gap-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
          <ul className="grid gap-1">
            <li className="menu-item" style={{ "--i": 0 } as CSSProperties}>
              <Link href="/" className="flex items-baseline gap-4 py-2 font-serif text-[2rem] leading-tight" aria-current={pathname === "/" ? "page" : undefined}>
                <span className="numeral w-7 text-sm text-muted-dark">00</span>
                Accueil
              </Link>
            </li>
            {mainNav.map((item, i) => (
              <li key={item.href} className="menu-item" style={{ "--i": i + 1 } as CSSProperties}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-4 py-2 font-serif text-[2rem] leading-tight transition-colors",
                    isActive(item.href) ? "text-clay-light" : "hover:text-sky",
                  )}
                >
                  <span className="numeral w-7 text-sm text-muted-dark">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu-item grid gap-8" style={{ "--i": 8 } as CSSProperties}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-muted-dark">
              {secondaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid gap-4 border-t border-line-dark pt-6">
              <BookingButton variant="light" className="w-full sm:w-auto" />
              <a href={site.phone.href} className="inline-flex min-h-11 items-center gap-3 text-lg">
                <Phone size={18} />
                {site.phone.display}
              </a>
              <p className="text-sm text-muted-dark">
                {site.hours.days}, {site.hours.slots.join(" et ")}
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
