import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { Ph } from "@/components/Ph";
import { Title, r } from "@/components/ui";
import { getPage, getPosts, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("journal");
  return { title: "Stories From Somewhere Beautiful — The Journal", description: p.seoDescription };
}

export default async function JournalPage() {
  const [p, s, posts] = await Promise.all([getPage("journal"), getSettings(), getPosts()]);
  const [first, ...rest] = posts;
  const soon = (post: any) => !post.body?.length && !post.excerpt;
  return (
    <>
      <Hero slot="hero-journal" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} text={p.text} />
      <section className="section">
        <div className="wrap">
          {first ? (
            <article className="feature zoom">
              <Link href={`/journal/${first.slug}`} {...r(0, "img")}>
                <Ph slot="journal-1" image={first.image} alt={first.title} />
              </Link>
              <div {...r(0.15)}>
                <span className="kicker">{first.kicker || "Featured"}</span>
                <h2 className="h1">
                  <Link href={`/journal/${first.slug}`}>{first.title}</Link>
                </h2>
                {first.excerpt ? <p className="lead">{first.excerpt}</p> : null}
                {soon(first) ? <span className="soon">Story coming soon</span> : null}
              </div>
            </article>
          ) : null}
          <div className="posts posts--3">
            {rest.map((post: any, i: number) => (
              <article className="post zoom" key={post.slug} {...r((i % 3) * 0.1)}>
                <Link href={`/journal/${post.slug}`}>
                  <Ph slot={`journal-${i + 2}`} image={post.image} alt={post.title} />
                </Link>
                <span className="kicker">{post.kicker}</span>
                <h3 className="h3">
                  <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>
                {post.excerpt ? <p>{post.excerpt}</p> : null}
                {soon(post) ? <span className="soon">Story coming soon</span> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaSection s={s} />
    </>
  );
}
