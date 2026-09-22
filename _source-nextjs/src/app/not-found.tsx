import { ArrowLink, ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center pb-24 pt-[calc(var(--header-h)+3rem)]">
      <div className="wrap-narrow text-center">
        <span aria-hidden="true" className="relative mx-auto mb-10 block h-14 w-14">
          <span className="breathe absolute inset-0 rounded-full border border-clay/60" />
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay" />
        </span>
        <p className="eyebrow text-muted">Erreur 404</p>
        <h1 className="display-lg mt-5 text-ink">
          Cette page n’existe pas <em className="accent-italic text-navy">(ou plus).</em>
        </h1>
        <p className="lead mx-auto mt-6 max-w-lg text-muted">
          Respirez : tout ce qui compte est à portée de clic.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
          <ArrowLink href="/contact">Me contacter</ArrowLink>
        </div>
      </div>
    </section>
  );
}
