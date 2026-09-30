import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { bookingHref, bookingIsExternal } from "@/content/site";
import { ArrowRight, ArrowUpRight } from "./icons";

type Variant = "primary" | "light" | "outline" | "outline-light";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: boolean;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  /** Légère attraction du bouton vers le curseur (appels à l’action principaux uniquement) */
  magnetic?: boolean;
};

const isExternalHref = (href: string) => /^(https?:)?\/\//.test(href);

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  className,
  external,
  ariaLabel,
  magnetic = false,
}: ButtonLinkProps) {
  const ext = external ?? isExternalHref(href);
  const classes = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
  const Icon = ext ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        // Deux flèches : l’une sort, l’autre entre (voir .btn-icon dans globals.css)
        <span className="btn-icon" data-ext={ext ? "" : undefined}>
          <Icon size={15} />
          <Icon size={15} />
        </span>
      )}
      {ext && <span className="sr-only"> (nouvel onglet)</span>}
    </>
  );
  const extra = magnetic ? { "data-magnetic": "" } : {};

  if (ext || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...extra}
        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel} {...extra}>
      {content}
    </Link>
  );
}

/** Bouton de réservation : Calendly si configuré, sinon la section rendez-vous de la page contact */
export function BookingButton({
  children = "Réserver un appel découverte",
  ...props
}: Omit<ButtonLinkProps, "href" | "external" | "children"> & { children?: ReactNode }) {
  return (
    <ButtonLink href={bookingHref} external={bookingIsExternal} {...props}>
      {children}
    </ButtonLink>
  );
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ext = isExternalHref(href);
  const content = (
    <>
      {children}
      {ext ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}
      {ext && <span className="sr-only"> (nouvel onglet)</span>}
    </>
  );
  if (ext) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn("link-line", className)}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cn("link-line", className)}>
      {content}
    </Link>
  );
}
