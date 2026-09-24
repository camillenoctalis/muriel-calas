export type Offer = {
  id: string;
  name: string;
  sessions: number;
  price: number;
  /** Intention formulée par la personne accompagnée */
  intention: string;
  /** Logique de progression, en un mot */
  step: string;
  stepDetail: string;
  summary: string;
  objectives: string[];
  followUp: boolean;
};

export const offers: Offer[] = [
  {
    id: "decouverte",
    name: "Séance découverte",
    sessions: 1,
    price: 80,
    intention: "Je cible une urgence et je commence à progresser",
    step: "Débloquer",
    stepDetail: "Une situation précise, un premier outil",
    summary: "Pour débloquer une situation précise.",
    objectives: [
      "Clarifier une difficulté",
      "Prendre du recul",
      "Repartir avec un outil ciblé, applicable immédiatement en autonomie",
    ],
    followUp: false,
  },
  {
    id: "suivi-5",
    name: "Suivi 5 séances",
    sessions: 5,
    price: 375,
    intention: "J’apprends à me connaître et à me perfectionner",
    step: "Comprendre & intégrer",
    stepDetail: "Identifier ce qui bloque, installer de nouveaux réflexes",
    summary: "Pour prendre conscience du changement à opérer et commencer à intégrer les bonnes attitudes.",
    objectives: [
      "Identifier les réactions contre-productives",
      "Mettre en place les leviers du changement",      "Un rendez-vous de suivi entre chaque séance, pour bien prendre en main les outils",
      "Progresser durablement",
    ],
    followUp: true,
  },
  {
    id: "suivi-10",
    name: "Suivi 10 séances",
    sessions: 10,
    price: 720,
    intention: "Je deviens performant(e)",
    step: "Approfondir & gagner en autonomie",
    stepDetail: "Construire une progression, devenir autonome",
    summary:
      "Pour percevoir plus finement les difficultés rencontrées et maîtriser vos outils de progression.",
    objectives: [
      "Identifier la problématique à traiter",
      "Définir les objectifs",
      "Construire une progression chronologique adaptée à vos problématiques",
      "Un rendez-vous de suivi entre chaque séance pour débriefer",
      "Apprendre à détecter et à résoudre en autonomie les difficultés qui apparaissent",
    ],
    followUp: true,
  },
];

/** Interventions collectives : tarif établi au cas par cas, sur devis. */
export const workshops = {
  title: "Ateliers & formations",
  audience: "Clubs, équipes, staffs et encadrants",
  items: [
    "Ateliers de préparation mentale pour sportives et sportifs",
    "Formation des entraîneurs et encadrants au cycle menstruel dans le sport féminin",
    "Interventions sur mesure, en club ou en centre de formation",
  ],
  price: "Sur devis",
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

/** Prix ramené à la séance (calcul factuel, pas une promotion) */
export const pricePerSession = (offer: Offer) => formatPrice(Math.round(offer.price / offer.sessions));
