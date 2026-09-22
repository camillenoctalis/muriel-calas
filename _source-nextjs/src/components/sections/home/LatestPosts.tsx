import { ArrowLink } from "@/components/ui/Button";
import { Eyebrow, Lines, delay } from "@/components/ui/Typography";
import { PostCard, UpcomingItem } from "@/components/blog/PostCard";
import { getPublishedPosts, getUpcomingPosts } from "@/lib/blog";

/** « Les derniers conseils » : 3 articles maximum, complétés par les prochains sujets si besoin */
export function LatestPosts() {
  const published = getPublishedPosts().slice(0, 3);
  const [featured, ...others] = published;
  const upcoming = getUpcomingPosts().slice(0, Math.max(0, 3 - published.length));

  if (!featured) return null;

  return (
    <section className="section-y" aria-labelledby="conseils-titre">
      <div className="wrap">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Conseils</Eyebrow>
            <Lines id="conseils-titre" className="display-lg mt-6" lines={["Les derniers conseils"]} />
          </div>
          <div data-reveal>
            <ArrowLink href="/blog">Tous les conseils</ArrowLink>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-reveal>
            <PostCard post={featured} featured />
          </div>
          <div className="lg:col-span-4 lg:col-start-9" data-reveal style={delay(150)}>
            {others.map((p) => (
              <div key={p.slug} className="mb-10">
                <PostCard post={p} />
              </div>
            ))}
            {upcoming.length > 0 && (
              <div>
                <p className="eyebrow mb-4 text-muted">Prochainement</p>
                {upcoming.map((p) => (
                  <UpcomingItem key={p.slug} post={p} />
                ))}
                <p className="border-t border-line pt-5 text-sm text-muted">De nouveaux articles arrivent régulièrement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
