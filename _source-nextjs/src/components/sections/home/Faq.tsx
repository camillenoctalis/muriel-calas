import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Phone } from "@/components/ui/icons";
import { Eyebrow, Lines, delay } from "@/components/ui/Typography";
import { faq, type FaqItem } from "@/content/faq";
import { site } from "@/content/site";

export function Faq({ items = faq, title = "Vos questions, simplement." }: { items?: FaqItem[]; title?: string }) {
  return (
    <section className="section-y" aria-labelledby="faq-titre">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <Eyebrow>Questions fréquentes</Eyebrow>
          <Lines id="faq-titre" className="display-md mt-6" lines={[title]} />
          <div className="mt-8 grid gap-4 text-muted" data-reveal style={delay(200)}>
            <p>Une autre question ? Le plus simple est d’en parler de vive voix.</p>
            <a href={site.phone.href} className="link-line self-start text-ink">
              <Phone size={16} />
              {site.phone.display}
            </a>
            <p className="text-sm">
              {site.hours.days}, {site.hours.slots.join(" et ")}. Ou via la{" "}
              <Link href="/contact" className="text-link text-ink">
                page contact
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6" data-reveal style={delay(150)}>
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
