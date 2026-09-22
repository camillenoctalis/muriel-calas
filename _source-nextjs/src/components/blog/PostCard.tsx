import Image from "next/image";
import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog-shared";
import { cn } from "@/lib/cn";

/** Carte d’article publié */
export function PostCard({ post, featured = false, headingLevel = 3 }: { post: PostMeta; featured?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="group relative">
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-card)] bg-sand",
          featured ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 30vw, 92vw"}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        <span className="font-semibold text-clay">{post.categories[0]}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min de lecture</span>
      </div>
      <Heading className={cn("mt-3 text-ink", featured ? "display-sm" : "title-sm")}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out)] group-hover:bg-[length:100%_1px]">
            {post.title}
          </span>
        </Link>
      </Heading>
      {featured && <p className="mt-4 max-w-2xl text-muted">{post.excerpt}</p>}
    </article>
  );
}

/** Sujet annoncé, sans lien */
export function UpcomingItem({ post }: { post: PostMeta }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-4 border-t border-line py-5">
      <div>
        <p className="text-sm text-muted">
          <span className="font-semibold text-clay">{post.categories[0]}</span>
        </p>
        <p className="mt-1.5 font-serif text-lg leading-snug text-ink/80">{post.title}</p>
      </div>
      <span className="mt-0.5 shrink-0 rounded-full border border-line px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
        À paraître
      </span>
    </div>
  );
}
