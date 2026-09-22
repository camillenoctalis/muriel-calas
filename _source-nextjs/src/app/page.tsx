import { Hero } from "@/components/sections/home/Hero";
import { Issues } from "@/components/sections/home/Issues";
import { AboutTeaser } from "@/components/sections/home/AboutTeaser";
import { Audiences } from "@/components/sections/home/Audiences";
import { Offers } from "@/components/sections/home/Offers";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { FinalCta } from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Préparatrice mentale à Narbonne et Mirepeisset | Muriel Calas",
  description:
    "Muriel Calas, préparatrice mentale à Mirepeisset près de Narbonne : sportifs, étudiants et encadrants. Stress, confiance, concentration, émotions. En présentiel ou en visio.",
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
