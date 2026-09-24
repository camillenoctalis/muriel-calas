import { Hero } from "@/components/sections/home/Hero";
import { Issues } from "@/components/sections/home/Issues";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { Audiences } from "@/components/sections/home/Audiences";
import { Offers } from "@/components/sections/home/Offers";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({  title: "Préparatrice mentale en Occitanie et en visio | Muriel Calas",
  description:
    "Muriel Calas, préparatrice mentale en Occitanie — Toulouse, Montpellier, Castres, Font-Romeu, Narbonne — et en visio partout en France. Sportifs, étudiants et encadrants : stress, confiance, concentration, émotions.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Issues />
      <AboutTeaser />
      <Audiences />
      <Offers />
      <Testimonials />
      <FinalCta />
    </>
  );
}
