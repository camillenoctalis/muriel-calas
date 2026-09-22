import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { slugify, type Post, type PostMeta } from "./blog-shared";

/**
 * Blog « Conseils » — un fichier Markdown par article dans /content/blog.
 * Publier un article = ajouter un fichier .md (aucune modification de code).
 * Voir /content/blog/README.md pour le mode d’emploi.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export { categories, formatDate, slugify } from "./blog-shared";
export type { Category, Post, PostMeta } from "./blog-shared";

function readFile(file: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    slug,
    title: String(data.title),
    metaTitle: String(data.metaTitle ?? data.title),
    description: String(data.description ?? data.excerpt ?? ""),
    excerpt: String(data.excerpt ?? data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    categories: Array.isArray(data.categories) ? data.categories.map(String) : [],
    cover: String(data.cover ?? "/images/piste-couloirs.jpg"),
    coverAlt: String(data.coverAlt ?? ""),
    readingTime: Math.max(1, Math.ceil(words / 180)),
    status: data.status === "publie" ? "publie" : "a-paraitre",
    cta: data.cta,
  };
  return { meta, content };
}

function allFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md");
}

const byDateDesc = (a: PostMeta, b: PostMeta) => (a.date < b.date ? 1 : -1);

/** Articles publiés, du plus récent au plus ancien */
export function getPublishedPosts(): PostMeta[] {
  return allFiles()
    .map((f) => readFile(f).meta)
    .filter((p) => p.status === "publie")
    .sort(byDateDesc);
}

/** Sujets annoncés (statut « a-paraitre ») : affichés sans lien, pas de page générée */
export function getUpcomingPosts(): PostMeta[] {
  return allFiles()
    .map((f) => readFile(f).meta)
    .filter((p) => p.status === "a-paraitre")
    .sort((a, b) => (a.date > b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!allFiles().includes(file)) return null;
  const { meta, content } = readFile(file);
  if (meta.status !== "publie") return null;

  const toc: Post["toc"] = [];
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth }: Tokens.Heading) {
        const text = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, "");
        const id = slugify(plain);
        if (depth === 2) toc.push({ id, text: plain });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(content, { async: false }) as string;
  return { ...meta, html, toc };
}
