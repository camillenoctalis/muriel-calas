import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "monthly" },
    { path: "/a-propos", priority: 0.8, freq: "yearly" },
    { path: "/accompagnement", priority: 0.9, freq: "monthly" },
    { path: "/public", priority: 0.9, freq: "monthly" },
    { path: "/tarifs", priority: 0.9, freq: "monthly" },
    { path: "/temoignages", priority: 0.7, freq: "monthly" },
    { path: "/cycle-menstruel", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/publications-presse", priority: 0.5, freq: "yearly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/mentions-legales", priority: 0.2, freq: "yearly" },
    { path: "/confidentialite", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path === "/" ? "" : p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...getPublishedPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

export const dynamic = "force-static";
