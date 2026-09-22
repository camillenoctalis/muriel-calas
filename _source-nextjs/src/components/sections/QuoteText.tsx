import type { Testimonial } from "@/content/testimonials";

/** Citation avec un passage mis en valeur (rendu tel quel si le passage est introuvable) */
export function QuoteText({ t, className = "accent-italic" }: { t: Testimonial; className?: string }) {
  const at = t.quote.indexOf(t.highlight);
  if (at === -1) return <>{t.quote}</>;
  return (
    <>
      {t.quote.slice(0, at)}
      <em className={className}>{t.highlight}</em>
      {t.quote.slice(at + t.highlight.length)}
    </>
  );
}
