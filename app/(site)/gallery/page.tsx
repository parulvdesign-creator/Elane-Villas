import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import GalleryClient from "@/components/GalleryClient";
import { Ph } from "@/components/Ph";
import { Title } from "@/components/ui";
import { getGallery, getPage, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("gallery");
  return { title: "A Glimpse Into Élané — Gallery", description: p.seoDescription };
}

export default async function GalleryPage() {
  const [p, s, g] = await Promise.all([getPage("gallery"), getSettings(), getGallery()]);
  return (
    <>
      <Hero slot="hero-gallery" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} sub={p.sub} text={p.text} />
      <section className="section">
        <div className="wrap">
          <GalleryClient
            categories={g.categories}
            items={g.items.map((it: any, i: number) => ({
              category: it.category,
              caption: it.caption,
              ratio: it.ratio || "4/3",
              media: <Ph slot={`gallery-${i + 1}`} image={it.image} alt={it.caption} />,
            }))}
          />
        </div>
      </section>
      <CtaSection s={s} />
    </>
  );
}
