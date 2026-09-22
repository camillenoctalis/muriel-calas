import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/PageHero";
import { UpcomingItem } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink, BookingButton } from "@/components/ui/Button";
import { Phone } from "@/components/ui/icons";
import { formatDate, getPost, getPublishedPosts, getUpcomingPosts } from "@/lib/blog";
import { articleJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.metaTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    image: { url: post.cover, alt: post.coverAlt, width: 1600, height: 1067 },
  });
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const upcoming = getUpcomingPosts().slice(0, 3);
  const others = getPublishedPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          date: post.date,
          updated: post.updated,
          cover: post.cover,
          category: post.categories[0] ?? "Conseils",
        })}
      />

      <article>
        <header className="pb-12 pt-[calc(var(--header-h)+2rem)] md:pb-16 md:pt-[calc(var(--header-h)+3.5rem)]">
          <div className="wrap">
            <Breadcrumbs
              items={[
                { name: "Conseils", path: "/blog" },
                { name: post.title, path: `/blog/${post.slug}` },
              ]}
              className="hero-fade [&_li:last-child_span[aria-current]]:line-clamp-1"
            />
            <div className="mt-10 max-w-4xl md:mt-14">
              <ul className="hero-fade flex flex-wrap gap-2" aria-label="Catégories">
                {post.categories.map((c) => (
                  <li key={c} className="chip text-clay">
                    {c}
                  </li>
                ))}
              </ul>
              <h1 className="display-lg hero-rise mt-6 text-ink">{post.title}</h1>
              <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-muted" style={{ "--i": 2 } as React.CSSProperties}>
                <span className="inline-flex items-center gap-3">
                  <span className="relative h-9 w-9 overflow-hidden rounded-full bg-sand">
                    <Image src="/images/muriel-calas-preparatrice-mentale.jpg" alt="" fill sizes="36px" className="object-cover object-[50%_25%]" />
                  </span>
                  <span>
                    Par <Link href="/a-propos" className="font-semibold text-ink hover:text-navy">Muriel Calas</Link>
                  </span>
                </span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min de lecture</span>
              </div>
            </div>
          </div>
        </header>

        <div className="wrap">
          <div className="hero-media relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-sand md:aspect-[21/9]">
            <Image src={post.cover} alt={post.coverAlt} fill preload sizes="(min-width: 1280px) 80rem, 100vw" className="object-cover" />
          </div>
        </div>

        <div className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
          {post.toc.length > 2 && (
            <nav aria-label="Sommaire" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-muted">Sommaire</p>
                <ol className="mt-5 grid gap-1 border-l border-line">
                  {post.toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.95rem] leading-snug text-muted transition-colors hover:border-clay hover:text-ink">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}

          <div className="lg:col-span-7 lg:col-start-5">
            <div className="prose-muriel prose-lead" dangerouslySetInnerHTML={{ __html: post.html }} />

            {/* Appel à l’action de fin d’article */}
            <aside className="on-dark mt-16 rounded-[var(--radius-card)] bg-ink p-7 text-paper md:p-10" aria-labelledby="article-cta">
              <p className="eyebrow text-clay-light">Préparation mentale · Narbonnais & à distance</p>
              <h2 id="article-cta" className="display-sm mt-4">
                {post.cta?.title ?? "Vous souhaitez aller plus loin ?"}
              </h2>
              <p className="mt-4 text-muted-dark">
                {post.cta?.text ?? "J’accompagne les sportifs, étudiants et encadrants dans le Narbonnais et à distance."}
              </p>
              {post.cta?.points && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {post.cta.points.map((pt) => (
                    <li key={pt} className="chip border-line-dark text-paper/85">
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
                <BookingButton variant="light" />
                <a href={site.phone.href} className="link-line text-paper">
                  <Phone size={16} />
                  {site.phone.display}
                </a>
              </div>
            </aside>

            {/* Auteure */}
            <div className="mt-10 flex flex-col gap-5 rounded-[var(--radius-card)] border border-line p-6 sm:flex-row sm:items-center md:p-8">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-sand">
                <Image src="/images/muriel-calas-preparatrice-mentale.jpg" alt="Portrait de Muriel Calas" fill sizes="64px" className="object-cover object-[50%_25%]" />
              </span>
              <div>
                <p className="font-serif text-xl text-ink">Muriel Calas</p>
                <p className="mt-1 text-[0.97rem] text-muted">
                  Préparatrice mentale à Mirepeisset, près de Narbonne. Ancienne volleyeuse et masseur-kinésithérapeute
                  depuis plus de 25 ans, formée à la préparation mentale par Christian Ramos.
                </p>
                <ArrowLink href="/a-propos" className="mt-3 text-sm text-ink">
                  Découvrir mon parcours
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </article>

      {(others.length > 0 || upcoming.length > 0) && (
        <section className="border-t border-line bg-cream py-20 md:py-28" aria-labelledby="suite-titre">
          <div className="wrap grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-muted">À suivre</p>
              <h2 id="suite-titre" className="display-sm mt-4 text-ink">
                Les prochains conseils
              </h2>
              <ArrowLink href="/blog" className="mt-6 text-ink">
                Tous les conseils
              </ArrowLink>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {others.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block border-t border-line py-5 font-serif text-xl text-ink hover:text-navy">
                  {p.title}
                </Link>
              ))}
              {upcoming.map((p) => (
                <UpcomingItem key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
