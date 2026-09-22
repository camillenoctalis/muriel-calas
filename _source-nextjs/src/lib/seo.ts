import type { Metadata } from "next";
import { site, towns } from "@/content/site";
import { offers } from "@/content/offers";
import type { FaqItem } from "@/content/faq";

export const DEFAULT_OG_IMAGE = "/og/muriel-calas-preparatrice-mentale.jpg";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string; width?: number; height?: number };
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  noIndex?: boolean;
};

/** Métadonnées complètes d’une page : title, description, canonical, Open Graph, Twitter */
export function pageMetadata({ title, description, path, image, type = "website", publishedTime, noIndex }: PageSeo): Metadata {
  const img = image ?? {
    url: DEFAULT_OG_IMAGE,
    alt: "Muriel Calas, préparatrice mentale dans le Narbonnais",
    width: 1200,
    height: 630,
  };
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      siteName: "Muriel Calas — Préparatrice mentale",
      url: path,
      title,
      description,
      images: [img],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img.url],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

const abs = (path: string) => new URL(path, site.url).toString();

export const ids = {
  business: `${site.url}/#cabinet`,
  person: `${site.url}/#muriel-calas`,
  website: `${site.url}/#site`,
};

/** Activité locale : ProfessionalService (aucune adresse postale inventée : commune uniquement) */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ids.business,
    name: "Muriel Calas — Préparatrice mentale",
    description: site.description,
    url: site.url,
    telephone: site.phone.international,
    image: abs("/images/muriel-calas-preparatrice-mentale.jpg"),
    logo: abs("/brand/icon-512.png"),
    priceRange: "80 € – 720 €",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.locality,
      postalCode: site.location.postalCode,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.geo.latitude,
      longitude: site.location.geo.longitude,
    },
    areaServed: [
      ...towns.map((t) => ({ "@type": "City", name: t.name.replace("’", "'") })),
      { "@type": "AdministrativeArea", name: "Narbonnais" },
    ],
    openingHoursSpecification: site.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: h.opens,
      closes: h.closes,
    })),
    founder: { "@id": ids.person },
    employee: { "@id": ids.person },
    knowsAbout: [
      "Préparation mentale",
      "Gestion du stress",
      "Confiance en soi",
      "Concentration",
      "Visualisation mentale",
      "Préparation aux examens",
      "Cycle menstruel et sport féminin",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Accompagnements en préparation mentale",
      itemListElement: offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        description: o.intention,
        price: o.price,
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: `Préparation mentale — ${o.name}`,
          serviceType: "Préparation mentale",
          areaServed: "Narbonnais et à distance",
        },
      })),
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ids.person,
    name: "Muriel Calas",
    jobTitle: "Préparatrice mentale",
    description:
      "Ancienne joueuse de volley-ball, masseur-kinésithérapeute depuis plus de 25 ans et préparatrice mentale formée par Christian Ramos. Accompagne sportifs, étudiants et encadrants dans le Narbonnais et à distance.",
    image: abs("/images/muriel-calas-preparatrice-mentale.jpg"),
    url: abs("/a-propos"),
    telephone: site.phone.international,
    worksFor: { "@id": ids.business },
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.locality,
        postalCode: site.location.postalCode,
        addressCountry: site.location.country,
      },
    },
    hasOccupation: [
      { "@type": "Occupation", name: "Préparatrice mentale" },
      { "@type": "Occupation", name: "Masseur-kinésithérapeute" },
    ],
    knowsAbout: ["Préparation mentale", "Kinésithérapie", "Volley-ball", "Cycle menstruel et performance sportive"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    name: "Muriel Calas — Préparatrice mentale",
    url: site.url,
    inLanguage: "fr-FR",
    publisher: { "@id": ids.business },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer.join(" ") },
    })),
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  cover: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: abs(post.cover),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "fr-FR",
    articleSection: post.category,
    mainEntityOfPage: abs(`/blog/${post.slug}`),
    author: { "@id": ids.person, "@type": "Person", name: "Muriel Calas", url: abs("/a-propos") },
    publisher: { "@id": ids.business },
  };
}
