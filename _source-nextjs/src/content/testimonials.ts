/**
 * Témoignages réels issus du site actuel.
 * Seules l’orthographe et la ponctuation ont été corrigées : le sens n’est pas modifié.
 */
export type Testimonial = {
  id: string;
  name: string;
  context: string;
  category: "Sport" | "Études";
  discipline: string;
  quote: string;
  /** Passage mis en valeur dans la citation (doit exister tel quel dans `quote`) */
  highlight: string;
  image: { src: string; alt: string; isPortrait: boolean };
};

export const testimonials: Testimonial[] = [
  {
    id: "ilan",
    name: "Ilan",
    context: "Vice-champion de France U20 de décathlon",
    category: "Sport",
    discipline: "Athlétisme",
    quote:
      "Très content du travail effectué. Je fais de l’athlétisme : beaucoup de travail réalisé sur la visualisation mentale avant les compétitions.",
    highlight: "beaucoup de travail réalisé sur la visualisation mentale",
    image: {
      src: "/images/ilan-decathlon.jpg",
      alt: "Ilan, décathlonien, en pleine course sur une piste d’athlétisme",
      isPortrait: true,
    },
  },
  {
    id: "matteo",
    name: "Matteo",
    context: "Joueur de handball au centre de formation du Fenix Toulouse",
    category: "Sport",
    discipline: "Handball",
    quote:
      "L’accompagnement en préparation mentale avec Muriel m’a énormément aidé à surmonter les moments de doute, notamment à mieux gérer l’échec après les tirs manqués, et à retrouver confiance en moi.",
    highlight: "retrouver confiance en moi",
    image: {
      src: "/images/handball-terrain.jpg",
      alt: "Ballon de handball posé devant une cage, dans un gymnase",
      isPortrait: false,
    },
  },
  {
    id: "solene",
    name: "Solène",
    context: "Étudiante manipulatrice radio",
    category: "Études",
    discipline: "Études supérieures",
    quote:
      "Concernant ma situation, c’était surtout par rapport au stress de la rentrée : découvrir une nouvelle école, de nouvelles personnes, une nouvelle ville, de nouveaux cours, et la distance avec mes parents. Ça me faisait peur et me stressait beaucoup.",
    highlight: "stress de la rentrée",
    image: {
      src: "/images/etudiante-cours.jpg",
      alt: "Étudiante tenant ses cahiers et classeurs, sac sur le dos",
      isPortrait: false,
    },
  },
];
