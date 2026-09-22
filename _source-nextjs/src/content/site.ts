/**
 * Informations centrales du site.
 * Toute donnée affichée à plusieurs endroits (téléphone, horaires, zone, réservation…)
 * se modifie ici, une seule fois.
 */

export const site = {
  name: "Muriel Calas",
  role: "Préparatrice mentale",
  url: "https://www.muriel-calas.fr",
  locale: "fr_FR",
  tagline: "Apprendre à maîtriser ce qui dépend de vous",
  description:
    "Muriel Calas, préparatrice mentale à Mirepeisset, près de Narbonne : accompagnement des sportifs, étudiants et encadrants pour mieux gérer le stress, la pression, les émotions et la confiance. En présentiel ou à distance.",

  phone: {
    display: "06 22 06 44 59",
    href: "tel:+33622064459",
    international: "+33622064459",
  },

  hours: {
    days: "Du lundi au vendredi",
    slots: ["9 h – 12 h", "14 h – 18 h"],
    /** Format schema.org */
    schema: [
      { opens: "09:00", closes: "12:00" },
      { opens: "14:00", closes: "18:00" },
    ],
  },

  /** Localisation connue : commune uniquement (aucune adresse postale n'a été fournie). */
  location: {
    locality: "Mirepeisset",
    postalCode: "11120",
    region: "Occitanie",
    department: "Aude",
    country: "FR",
    geo: { latitude: 43.2846, longitude: 2.8966 },
  },

  /**
   * Lien Calendly de Muriel.
   * À renseigner dans la variable d'environnement NEXT_PUBLIC_CALENDLY_URL
   * (ex. https://calendly.com/muriel-calas/appel-decouverte).
   * Tant qu'il est vide, les boutons « Prendre rendez-vous » mènent à /contact#rendez-vous.
   */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",

  session: {
    duration: "45 min à 1 h",
    formats: "En présentiel ou en visio",
  },

  training: "Formée à la préparation mentale par Christian Ramos",

  press: {
    outlet: "La Dépêche du Midi",
    title:
      "« Les filles n’osent pas en parler de peur d’être écartées » : comment gérer les cycles menstruels dans le sport féminin",
    date: "2026-06-10",
    author: "Brian Mendibure",
    url: "https://www.ladepeche.fr/2026/06/10/les-filles-nosent-pas-en-parler-de-peur-detre-ecartees-comment-gerer-les-cycles-menstruels-dans-le-sport-feminin-13410927.php",
  },
} as const;

/** Lien vers la prise de rendez-vous : Calendly si configuré, sinon la section dédiée de la page contact. */
export const bookingHref = site.calendlyUrl || "/contact#rendez-vous";
export const bookingIsExternal = Boolean(site.calendlyUrl);

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "À propos", href: "/a-propos" },
  { label: "Accompagnement", href: "/accompagnement" },
  { label: "Pour qui ?", href: "/public" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Témoignages", href: "/temoignages" },
  { label: "Conseils", href: "/blog" },
];

export const footerNav = {
  navigation: [
    { label: "À propos", href: "/a-propos" },
    { label: "Accompagnement", href: "/accompagnement" },
    { label: "Pour qui ?", href: "/public" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Témoignages", href: "/temoignages" },
  ],
  pratique: [
    { label: "Prendre rendez-vous", href: "/contact#rendez-vous" },
    { label: "Contact", href: "/contact" },
    { label: "Cycle menstruel", href: "/cycle-menstruel" },
    { label: "Conseils", href: "/blog" },
    { label: "Publications & presse", href: "/publications-presse" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],
} satisfies Record<string, NavItem[]>;

/**
 * Communes du Narbonnais d'où viennent des personnes accompagnées.
 * Coordonnées : centres communaux (geo.api.gouv.fr). Utilisées pour la carte stylisée
 * et pour areaServed dans les données structurées.
 */
export const towns = [
  { name: "Mirepeisset", lat: 43.2846, lon: 2.8966, home: true },
  { name: "Narbonne", lat: 43.1493, lon: 3.0337, major: true },
  { name: "Sallèles-d’Aude", lat: 43.2712, lon: 2.9342 },
  { name: "Saint-Marcel-sur-Aude", lat: 43.252, lon: 2.929 },
  { name: "Ginestas", lat: 43.2779, lon: 2.883 },
  { name: "Ouveillan", lat: 43.2926, lon: 2.9687 },
  { name: "Cuxac-d’Aude", lat: 43.2571, lon: 3.0093 },
  { name: "Argeliers", lat: 43.309, lon: 2.9137 },
  { name: "Bize-Minervois", lat: 43.3364, lon: 2.8719 },
  { name: "Saint-Nazaire-d’Aude", lat: 43.2505, lon: 2.8898 },
  { name: "Moussan", lat: 43.2303, lon: 2.9583 },
  { name: "Marcorignan", lat: 43.2233, lon: 2.9141 },
  { name: "Ventenac-en-Minervois", lat: 43.2512, lon: 2.8544 },
] as const;
