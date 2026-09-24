import { PageHero } from "@/components/layout/PageHero";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { categories, getPublishedPosts, getUpcomingPosts } from "@/lib/blog";
import { ids, pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = pageMetadata({
  title: "Conseils en préparation mentale | Blog de Muriel Calas",
  description:
    "Stress en compétition, confiance, concentration, examens, cycle menstruel : les conseils de Muriel Calas, préparatrice mentale en Occitanie, pour mieux comprendre ce qui se joue dans la tête.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPublishedPosts();
  const upcoming = getUpcomingPosts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Conseils en préparation mentale — Muriel Calas",
          url: `${site.url}/blog`,
          inLanguage: "fr-FR",
          publisher: { "@id": ids.business },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${site.url}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Conseils", path: "/blog" }]}
        eyebrow="Conseils"
        title={["Conseils en", <em key="e" className="accent-italic text-navy">préparation mentale.</em>]}
        intro={
          <p>
            Stress, confiance, concentration, études, sport féminin : des repères simples et concrets pour mieux
            comprendre ce qui se joue dans la tête, et commencer à agir.
          </p>
        }
      />
      <section className="border-t border-line pb-24 pt-12 md:pb-32 md:pt-16" aria-label="Articles">
        <div className="wrap">
          <BlogIndex posts={posts} upcoming={upcoming} categories={[...categories]} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
