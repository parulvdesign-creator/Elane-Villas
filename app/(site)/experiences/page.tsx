import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { Ph } from "@/components/Ph";
import { PillLink, Title, r } from "@/components/ui";
import { getExperiences, getPage, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("experiences");
  return { title: "Experiences Beyond the Villa", description: p.seoDescription };
}

const CLS = ["t1", "t2", "t3", "t4", "t5"];

export default async function ExperiencesPage() {
  const [p, s, items] = await Promise.all([getPage("experiences"), getSettings(), getExperiences()]);
  return (
    <>
      <Hero slot="hero-experiences" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} sub={p.sub} text={p.text} />
      <section className="section">
        <div className="wrap">
          <div className="mosaic">
            {items.map((x: any, i: number) => (
              <article key={x.slug ?? i} id={x.anchor || undefined} className={`tile ${CLS[i % CLS.length]} zoom`} {...r(0.1 * (i % 3))}>
                <Ph slot={`xp-${x.slug ?? i + 1}`} image={x.image} alt={x.title} />
                <div className="tile__in">
                  <span className="eyebrow">{x.label}</span>
                  <h2>
                    <Title text={x.title} em={x.titleEm} />
                  </h2>
                  {(x.paragraphs ?? []).map((t: string, k: number) => (
                    <p key={k}>{t}</p>
                  ))}
                  {x.cta?.href ? <PillLink href={x.cta.href}>{x.cta.label}</PillLink> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaSection s={s} />
    </>
  );
}
