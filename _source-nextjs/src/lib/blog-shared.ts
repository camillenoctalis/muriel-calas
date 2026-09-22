/** Éléments du blog utilisables côté client comme côté serveur (aucun accès disque ici). */

export const categories = [
  "Sport",
  "Préparation mentale",
  "Gestion du stress",
  "Confiance",
  "Concentration",
  "Émotions",
  "Étudiants",
  "Cycle menstruel",
  "Conseils",
] as const;

export type Category = (typeof categories)[number];

export type PostMeta = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  date: string;
  updated?: string;
  categories: string[];
  cover: string;
  coverAlt: string;
  readingTime: number;
  status: "publie" | "a-paraitre";
  cta?: { title: string; text: string; points?: string[] };
};

export type Post = PostMeta & { html: string; toc: { id: string; text: string }[] };

export const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));
