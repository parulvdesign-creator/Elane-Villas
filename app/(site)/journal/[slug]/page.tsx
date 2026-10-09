import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { PillLink } from "@/components/ui";
import { getPost, getPosts, getSettings } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPost(slug);
  return p ? { title: p.title, description: p.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, s] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();
  const date = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;
  return (
    <>
      <Hero
        slot={`hero-post-${post.slug}`}
        image={post.image}
        eyebrow={post.kicker}
        title={post.title}
        sub={date ?? undefined}
        crumbs={
          <>
            <Link href="/journal">Journal</Link> &nbsp;/&nbsp; {post.title}
          </>
        }
      />
      <section className="section">
        <div className="wrap prose">
          {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
          {post.body?.length ? (
            <div className="article" style={{ marginTop: 32 }}>
              <PortableText value={post.body} />
            </div>
          ) : (
            <p className="muted" style={{ marginTop: 24 }}>
              This story is coming soon.
            </p>
          )}
          <div className="act">
            <PillLink href="/journal">Back to the journal</PillLink>
          </div>
        </div>
      </section>
      <CtaSection s={s} />
    </>
  );
}
