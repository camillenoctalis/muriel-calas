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
    "Muriel Calas, préparatrice mentale en Occitanie — Toulouse, Montpellier, Castres, Font-Romeu, Narbonne — et en visio partout en France : sportifs, étudiants et encadrants, pour mieux gérer le stress, la pression, les émotions et la confiance.",  /**
   * Adresse e-mail publique. Aucune n'a été fournie : tant qu'elle est vide, les demandes de devis
   * passent par le formulaire de contact. La renseigner ici bascule automatiquement les liens en mailto.
   */
  email: "" as string,

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
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",  session: {
    duration: "1 h",
    formats: "En présentiel ou en visio",
    followUp: "Un rendez-vous de suivi par téléphone ou en visio entre chaque séance, pour débriefer",
  },

  training: "Formée à la préparation mentale par Christian Ramos, formateur Mental Plus",

  /** Organismes de formation — logos et liens vérifiés (annuaire : Muriel y est référencée). */
  trainings: [
    {
      name: "Mental Plus",
      role: "Formation de préparateur mental, avec Christian Ramos",
      linkLabel: "Voir l’annuaire des préparateurs mentaux",
      url: "https://www.appli-mental-plus.com/coach/list",
      logo: "/brand/mental-plus.png",
    },
    {
      name: "Catch & Think",
      role: "Formation aux mécanismes de l’attention et de la concentration",
      linkLabel: "Découvrir la formation",
      url: "https://www.mental-plus.com/fr/catch-and-think",
      logo: "svg",
    },
  ],

  press: {
    outlet: "La Dépêche du Midi",
    title:
      "« Les filles n’osent pas en parler de peur d’être écartées » : comment gérer les cycles menstruels dans le sport féminin",
    date: "2026-06-10",
    author: "Brian Mendibure",
    url: "https://www.ladepeche.fr/2026/06/10/les-filles-nosent-pas-en-parler-de-peur-detre-ecartees-comment-gerer-les-cycles-menstruels-dans-le-sport-feminin-13410927.php",
  },
} as const;

/** Lien « Demander un devis » : e-mail si une adresse est connue, sinon le formulaire de contact. */
export const quoteHref = site.email
  ? `mailto:${site.email}?subject=${encodeURIComponent("Demande de devis")}`
  : "/contact#devis";
export const quoteIsExternal = Boolean(site.email);

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
 * Zone d'intervention : base en Occitanie, déplacements dans la région,
 * et accompagnement à distance partout en France.
 */
export const coverage = {
  region: "Occitanie",
  base: "Mirepeisset (Aude)",
  cities: ["Toulouse", "Montpellier", "Castres", "Font-Romeu", "Narbonne", "Perpignan", "Béziers", "Carcassonne", "Nîmes"],
  remote: "Visio partout en France",
} as const;
