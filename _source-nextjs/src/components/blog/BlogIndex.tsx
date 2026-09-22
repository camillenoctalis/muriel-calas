"use client";

import { useMemo, useState } from "react";
import { PostCard, UpcomingItem } from "./PostCard";
import type { PostMeta } from "@/lib/blog-shared";
import { cn } from "@/lib/cn";

/** Liste des articles, filtrable par catégorie (sans rechargement) */
export function BlogIndex({ posts, upcoming, categories }: { posts: PostMeta[]; upcoming: PostMeta[]; categories: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  const used = useMemo(
    () => categories.filter((c) => [...posts, ...upcoming].some((p) => p.categories.includes(c))),
    [categories, posts, upcoming],
  );
  const match = (p: PostMeta) => !active || p.categories.includes(active);
  const visible = posts.filter(match).length;
  const [featured, ...rest] = posts;

  return (
    <div data-blog>
      <div role="group" aria-label="Filtrer par catégorie" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]">
        {[null, ...used].map((c) => {
          const selected = active === c;
          return (
            <button
              key={c ?? "tout"}
              type="button"
              data-filter={c ?? ""}
              aria-pressed={selected}
              onClick={() => setActive(c)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-[0.95rem] transition-colors",
                selected ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink hover:border-ink/50",
              )}
            >
              {c ?? "Tous les conseils"}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {featured && (
            <div data-cats={featured.categories.join("|")} hidden={!match(featured)}>
              <PostCard post={featured} featured headingLevel={2} />
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-16 grid gap-12 sm:grid-cols-2">
              {rest.map((p) => (
                <div key={p.slug} data-cats={p.categories.join("|")} hidden={!match(p)}>
                  <PostCard post={p} headingLevel={2} />
                </div>
              ))}
            </div>
          )}
          <p data-blog-empty hidden={visible > 0} className="rounded-[var(--radius-card)] border border-dashed border-ink/20 p-10 text-muted">
            Aucun article publié dans cette catégorie pour le moment : les premiers arrivent bientôt.
          </p>
        </div>

        {upcoming.length > 0 && (
          <aside className="lg:col-span-4" aria-labelledby="a-paraitre">
            <h2 id="a-paraitre" className="eyebrow mb-4 text-muted">
              Prochainement
            </h2>
            {upcoming.map((p) => (
              <div key={p.slug} data-cats={p.categories.join("|")} hidden={!match(p)}>
                <UpcomingItem post={p} />
              </div>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}
