export type FaqItem = { question: string; answer: string[] };

export const faq: FaqItem[] = [
  {
    question: "Comment se déroule une séance ?",
    answer: [      "Nous partons de votre situation pour comprendre ce qui se joue et mettre en place des outils concrets, adaptés à votre fonctionnement.",      "Une séance dure 1 heure. Vous repartez avec un travail à expérimenter, et nous faisons le point lors d’un rendez-vous de suivi, par téléphone ou en visio, avant la séance suivante.",
    ],
  },
  {
    question: "Cet accompagnement est-il fait pour moi ?",
    answer: [      "Sportif amateur ou confirmé, sportif blessé, collégien, lycéen, étudiant, entraîneur, éducateur ou arbitre : il n’est pas nécessaire d’être en difficulté ni d’avoir un haut niveau pour commencer.",
    ],
  },
  {
    question: "En combien de temps puis-je voir des résultats ?",
    answer: [      "Parfois dès la première séance, lorsqu’un outil ciblé répond à une situation précise. Un accompagnement sur plusieurs séances permet ensuite d’ancrer les changements. Chaque parcours est différent : aucun résultat ne peut être garanti à l’avance.",
    ],
  },
  {
    question: "Les séances se font-elles en présentiel ou à distance ?",
    answer: [      "Les deux. Les séances en présentiel ont lieu à Mirepeisset, dans le Narbonnais, avec des déplacements possibles en Occitanie ; à distance, elles se déroulent en visio.",
    ],
  },];
