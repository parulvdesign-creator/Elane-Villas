import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { Ph } from "@/components/Ph";
import { PillLink, Title, r } from "@/components/ui";
import { getPage, getSettings, getVillas } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("villas");
  return { title: "Our Villas", description: p.seoDescription };
}

export default async function VillasPage() {
  const [p, s, villas] = await Promise.all([getPage("villas"), getSettings(), getVillas()]);
  return (
    <>
      <Hero slot="hero-villas" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} sub={p.sub} text={p.text} />
      <section className="section">
        <div className="wrap">
          {villas.map((v: any, i: number) => (
            <article className="vrow" key={v.slug}>
              <Link className="vrow__media zoom" href={`/villas/${v.slug}`} aria-label={v.name} {...r(0, "img")}>
                <Ph slot={`list-${v.slug}`} image={v.image} alt={v.name} />
              </Link>
              <div {...r(0.15)}>
                <span className="vrow__no">0{i + 1}</span>
                <h2 className="h1">{v.name}</h2>
                <p className="sub">{v.tagline}</p>
                <div className="chips">
                  <span className="chip">{v.type}</span>
                  <span className="chip">{v.guests} Guests</span>
                  <span className="chip">{v.pool}</span>
                </div>
                <p className="d lead">{v.description}</p>
                <PillLink href={`/villas/${v.slug}`}>View Villa</PillLink>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaSection s={s} />
    </>
  );
}
