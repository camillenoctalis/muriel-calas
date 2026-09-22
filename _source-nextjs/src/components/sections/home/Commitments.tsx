import { delay, Eyebrow } from "@/components/ui/Typography";
import { commitments } from "@/content/approach";
import { cn } from "@/lib/cn";

export function Commitments({ className }: { className?: string }) {
  return (
    <section className={cn("bg-sand/60 py-20 md:py-28", className)} aria-labelledby="engagements-titre">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-3">
          <Eyebrow>Engagements</Eyebrow>
          <h2 id="engagements-titre" className="display-sm mt-5 text-ink" data-reveal>
            Un cadre de confiance, à chaque séance.
          </h2>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:col-start-5 lg:grid-cols-4 lg:gap-8">
          {commitments.map((c, i) => (
            <li key={c.title} data-reveal style={delay(i * 90)}>
              <span data-reveal="rule" style={delay(i * 90 + 100)} className="block h-px w-full bg-ink/25" aria-hidden="true" />
              <h3 className="title-sm mt-5 text-ink">{c.title}</h3>
              <p className="mt-2 text-[0.97rem] text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
