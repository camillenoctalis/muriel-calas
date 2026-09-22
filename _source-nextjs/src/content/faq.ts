export type FaqItem = { question: string; answer: string[] };

export const faq: FaqItem[] = [
  {
    question: "Comment se déroule une séance ?",
    answer: [
      "Chaque séance est un temps d’échange et de travail personnalisé. Nous partons de votre situation pour identifier vos besoins, comprendre ce qui se joue et mettre en place des outils concrets, adaptés à votre fonctionnement.",
      "Une séance dure environ 45 minutes à 1 heure. Vous repartez avec un travail à expérimenter d’ici la séance suivante.",
    ],
  },
  {
    question: "Cet accompagnement est-il fait pour moi ?",
    answer: [
      "La préparation mentale s’adresse à toute personne qui souhaite mieux gérer son stress, ses émotions ou ses performances : sportif amateur ou confirmé, collégien, lycéen, étudiant, entraîneur, éducateur ou arbitre.",
      "Il n’est pas nécessaire d’être en difficulté ni d’avoir un haut niveau pour commencer.",
    ],
  },
  {
    question: "En combien de temps puis-je voir des résultats ?",
    answer: [
      "Les premiers effets peuvent se faire sentir rapidement, parfois dès la première séance, lorsqu’un outil ciblé répond à une situation précise.",
      "Un accompagnement sur plusieurs séances permet ensuite d’ancrer durablement les changements. Chaque parcours est différent : aucun résultat ne peut être garanti à l’avance.",
    ],
  },
  {
    question: "Les séances se font-elles en présentiel ou à distance ?",
    answer: [
      "Les deux sont possibles, selon votre localisation et vos préférences. Les séances en présentiel ont lieu à Mirepeisset, dans le Narbonnais ; les séances à distance se déroulent en visio.",
    ],
  },
  {
    question: "Faut-il avoir un objectif précis pour commencer ?",
    answer: [
      "Pas nécessairement. Une première séance permet justement de clarifier votre situation et de définir ensemble un objectif adapté.",
    ],
  },
];
