export type Audience = {
  id: "sportifs" | "etudiants" | "encadrants";
  label: string;
  who: string;
  question: string;
  pitch: string;
  benefit: string;
  focus: string[];
  image: { src: string; alt: string };
  /** Contenu détaillé de la page « Pour qui ? » */
  detail: {
    title: string;
    problem: string;
    situations: string[];
    goals: string[];
    help: string;
    secondaryImage?: { src: string; alt: string };
  };
};

export const audiences: Audience[] = [
  {
    id: "sportifs",
    label: "Sportifs",
    who: "Amateurs, confirmés, jeunes sportifs en compétition",
    question: "Vous perdez vos moyens dans les moments-clés ?",
    pitch:
      "Stress, pression, erreurs dans les moments décisifs… Nous travaillons votre concentration, votre confiance et votre lucidité pour que vous puissiez exprimer votre niveau, en compétition comme à l’entraînement.",
    benefit: "Retrouver de la lucidité quand l’enjeu monte.",
    focus: ["Stress de compétition", "Confiance", "Concentration", "Visualisation", "Rebondir après l’erreur"],
    image: {
      src: "/images/sportif-depart.jpg",
      alt: "Athlète en position de départ sur une piste d’athlétisme, la main posée sur la ligne",
    },
    detail: {
      title: "Sportifs amateurs et confirmés",
      problem:
        "À l’entraînement, tout fonctionne. Puis arrive le match, la course ou la finale : les jambes se crispent, les pensées s’emballent, une erreur en entraîne une autre. Le physique est prêt, mais la tête ne suit pas toujours.",
      situations: [
        "Un stress qui monte les jours ou les heures avant la compétition",
        "Des pertes de moyens dans les moments décisifs",
        "Une erreur ou un tir manqué qui fait « décrocher » du match",
        "Le poids du résultat, du classement ou du regard des autres",
        "Des difficultés à rester dans l’instant présent",
        "Un retour de blessure qui s’accompagne de doutes",
      ],
      goals: [
        "Comprendre vos réactions sous pression",
        "Construire une routine d’avant-compétition",
        "Utiliser la visualisation mentale",
        "Revenir rapidement dans l’action après une erreur",
        "Consolider une confiance qui ne dépend pas que du résultat",
      ],
      help:
        "Ancienne joueuse de volley-ball et kinésithérapeute au contact des sportifs depuis plus de 25 ans, je connais le terrain, ses exigences et ses moments de vérité. Ensemble, nous partons de vos situations réelles pour construire des outils que vous pourrez utiliser seul(e), le jour J.",
      secondaryImage: {
        src: "/images/athlete-avant-course.jpg",
        alt: "Pieds d’un sprinteur en pointes, juste avant de se placer dans les starting-blocks",
      },
    },
  },
  {
    id: "etudiants",
    label: "Étudiants",
    who: "Collégiens, lycéens et étudiants",
    question: "Le stress vous bloque le jour de l’examen ?",
    pitch:
      "Peur de rater, perte de moyens, stress avant ou pendant l’épreuve… Nous travaillons ensemble à apaiser le mental et à clarifier les pensées pour aborder le jour J avec plus de sérénité.",
    benefit: "Aborder examens et changements avec plus de sérénité.",
    focus: ["Stress des examens", "Peur de l’échec", "Concentration", "Organisation mentale", "Adaptation"],
    image: {
      src: "/images/etudiants-travail.jpg",
      alt: "Groupe d’étudiants travaillant ensemble autour d’une table, feutres à la main",
    },
    detail: {
      title: "Collégiens, lycéens et étudiants",
      problem:
        "Brevet, bac, partiels, concours, entrée en études supérieures : ces étapes arrivent souvent avec une pression forte. Même bien préparé, on peut perdre ses moyens au moment de l’épreuve, ou vivre difficilement un changement d’établissement.",
      situations: [
        "Le « trou noir » devant la copie ou à l’oral",
        "Une peur de l’échec qui empêche de réviser sereinement",
        "Un stress qui perturbe le sommeil ou la concentration",
        "Une rentrée dans une nouvelle école, une nouvelle ville, loin de sa famille",
        "Un manque de confiance dans ses capacités",
      ],
      goals: [
        "Apaiser le stress avant et pendant l’épreuve",
        "Retrouver concentration et clarté",
        "Préparer mentalement les examens et les oraux",
        "S’adapter plus sereinement à un nouvel environnement",
        "Reprendre confiance en ses capacités",
      ],
      help:
        "Nous travaillons à partir de votre situation concrète : votre calendrier, vos épreuves, ce qui se passe pour vous quand le stress monte. L’objectif est simple : vous permettre de montrer ce que vous savez réellement faire, le jour J.",
      secondaryImage: {
        src: "/images/etudiante-cours.jpg",
        alt: "Étudiante tenant ses cahiers et classeurs, sac sur le dos",
      },
    },
  },
  {
    id: "encadrants",
    label: "Entraîneurs & coachs",
    who: "Entraîneurs, coachs, éducateurs et arbitres",
    question: "Difficile de rester calme dans les situations tendues ?",
    pitch:
      "Gestion du groupe, prise de décision, pression du résultat… Je vous accompagne pour renforcer votre leadership, rester lucide dans l’action et installer un cadre serein et efficace avec vos équipes.",
    benefit: "Rester lucide et juste quand tout s’accélère.",
    focus: ["Leadership", "Prise de décision", "Gestion émotionnelle", "Communication", "Lucidité"],
    image: {
      src: "/images/entraineur-bord-terrain.jpg",
      alt: "Entraîneur au bord du terrain, casque sur les oreilles, donnant des consignes à son équipe",
    },
    detail: {
      title: "Entraîneurs, coachs, éducateurs et arbitres",
      problem:
        "Sur le bord du terrain ou au milieu de l’action, vous devez décider vite, rester juste et porter le groupe, souvent sous la pression du résultat, du public ou des parents. Votre état émotionnel se transmet à celles et ceux que vous encadrez.",
      situations: [
        "Des décisions à prendre dans l’urgence, sous le regard des autres",
        "Des émotions difficiles à contenir pendant un match",
        "La gestion d’un groupe, des tensions et des personnalités",
        "La pression du résultat qui déborde sur la communication",
        "Un arbitrage contesté qu’il faut savoir laisser derrière soi",
      ],
      goals: [
        "Gagner en lucidité dans la prise de décision",
        "Mieux réguler ses émotions en situation",
        "Affirmer un leadership clair et apaisé",
        "Améliorer sa communication avec le groupe",
        "Transmettre des outils de préparation mentale à ses joueurs",
      ],
      help:
        "Nous travaillons sur vos situations de terrain, pour que vous puissiez garder la maîtrise de vous-même et offrir à votre groupe un cadre plus serein. J’interviens aussi auprès de staffs et d’équipes, notamment sur la question du cycle menstruel dans le sport féminin.",
      secondaryImage: {
        src: "/images/arbitre-terrain.jpg",
        alt: "Arbitre assistant de dos, drapeau en main, face au terrain de football",
      },
    },
  },
];
