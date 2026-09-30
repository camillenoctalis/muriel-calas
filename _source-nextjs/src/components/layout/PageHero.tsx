import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";

type Crumb = { name: string; path: string };

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Fil d’Ariane visible + données structurées BreadcrumbList */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Fil d’Ariane" className={cn("text-sm text-muted", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-ink">
              Accueil
            </Link>
          </li>
          {items.map((item, idx) => (
            <li key={item.path} className="flex items-center gap-2">
              <span aria-hidden="true" className="text-sand-deep">
                /
              </span>
              {idx === items.length - 1 ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-ink">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/**
 * En-tête des pages intérieures : fil d’Ariane, sur-titre, grand titre éditorial, introduction,
 * et visuel optionnel.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  children,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode[];
  intro?: ReactNode;
  image?: { src: string; alt: string; position?: string; caption?: string };
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section
      data-pointer
      className="relative isolate overflow-hidden pb-12 pt-[calc(var(--header-h)+1.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+2.5rem)]"
    >
      {/* Profondeur : halo doux et anneaux de focus, comme sur l’accueil mais plus discrets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[20%] -top-[35%] h-[56rem] w-[56rem] max-w-none rounded-full bg-[radial-gradient(closest-side,rgb(213_224_234/0.75),transparent)]" />
        <svg viewBox="0 0 400 400" className="drift absolute -right-40 -top-24 w-[42rem] max-w-none text-ink">
          <circle cx="200" cy="200" r="198" fill="none" stroke="currentColor" strokeOpacity="0.06" />
          <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeOpacity="0.07" strokeDasharray="2 7" />
        </svg>
      </div>
      <div className="wrap">
        <Breadcrumbs items={crumbs} className="hero-fade" />
        <div className={cn("mt-8 grid gap-10 md:mt-10", image || aside ? "lg:grid-cols-12 lg:gap-10" : "")}>
          <div className={cn(image || aside ? "lg:col-span-7" : "max-w-4xl")}>
            <p className="eyebrow hero-fade flex items-center gap-3 text-muted" style={i(0)}>
              <span className="focus-dot" aria-hidden="true" />
              {eyebrow}
            </p>
            <h1 className="display-xl mt-6 text-ink">
              {title.map((line, n) => (
                <span className="line" key={n}>
                  <span className="hero-rise inline-block" style={i(n)}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            {intro && (
              <div className="lead hero-fade mt-6 max-w-2xl text-muted" style={i(2)}>
                {intro}
              </div>
            )}
            {children && (
              <div className="hero-fade mt-8" style={i(3)}>
                {children}
              </div>
            )}
          </div>
          {image && (
            <figure
              className="lg:col-span-5"
              style={{ transform: "translate3d(calc(var(--px, 0) * -8px), calc(var(--py, 0) * -6px), 0)", transition: "transform 1.2s var(--ease-out)" }}
            >
              <div className="hero-media relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-[var(--shadow-lift)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover"
                  style={{ objectPosition: image.position ?? "50% 50%" }}
                />
              </div>
              {image.caption && (
                <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted">
                  <span className="h-px w-8 bg-clay" aria-hidden="true" />
                  {image.caption}
                </figcaption>
              )}
            </figure>
          )}
          {aside && !image && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
