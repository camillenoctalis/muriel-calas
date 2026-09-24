import Image from "next/image";
import { BookingButton } from "@/components/ui/Button";
import { Phone } from "@/components/ui/icons";
import { site } from "@/content/site";

export function FinalCta({
  title = (
    <>
      Et si vous faisiez la différence <em className="accent-italic text-sky">dans les moments-clés ?</em>
    </>
  ),  text = "En Occitanie ou en visio, partout en France. Un premier échange, sans engagement, pour faire le point.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section data-hide-cta className="on-dark relative isolate overflow-hidden bg-night py-20 text-paper md:py-28" aria-labelledby="cta-final-titre">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div data-parallax="0.1" className="absolute -inset-y-28 inset-x-0">
          <Image src="/images/piste-nuit.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(16_35_58/0.55),rgb(13_27_42/0.96)_70%)]" />
      </div>

      <div className="wrap-narrow text-center">
        <span aria-hidden="true" className="relative mx-auto mb-8 block h-12 w-12">
          <span className="breathe absolute inset-0 rounded-full border border-clay-light/60" />
          <span className="breathe-delayed absolute inset-0 rounded-full border border-clay-light/40" />
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay-light" />
        </span>
        <h2 id="cta-final-titre" className="display-md" data-reveal>
          {title}
        </h2>
        <p className="lead mx-auto mt-5 max-w-xl text-muted-dark" data-reveal>
          {text}
        </p>
        <div className="mt-9 flex flex-col items-center gap-6" data-reveal>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-7">
            <BookingButton variant="light" />
            <a href={site.phone.href} className="link-line text-paper">
              <Phone size={16} />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
