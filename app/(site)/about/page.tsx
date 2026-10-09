import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { Ph } from "@/components/Ph";
import { Title, r } from "@/components/ui";
import { getPage, getSettings, getValues } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("about");
  return { title: "The Élané Story", description: p.seoDescription };
}

export default async function AboutPage() {
  const [p, s, values] = await Promise.all([getPage("about"), getSettings(), getValues()]);
  return (
    <>
      <Hero slot="hero-about" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} sub={p.sub} />
      <section className="section">
        <div className="wrap split split--c">
          <div>
            <span className="eyebrow" {...r()}>
              {p.introEyebrow}
            </span>
            <p className="lead" {...r(0.1)}>
              {p.introLead}
            </p>
            <h2 className="h1" {...r(0.15)}>
              <Title text={p.introTitle} em={p.introTitleEm} after={p.introTitleAfter} />
            </h2>
            <div className="lead" {...r(0.2)}>
              {(p.introParagraphs ?? []).map((t: string, i: number) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>
          <div className="pair" {...r(0.1, "fade")}>
            <Ph slot="about-1" image={p.image} alt="The Reserve above the sea" />
            <Ph slot="about-2" image={p.image2} alt="A calm interior" />
          </div>
        </div>
      </section>
      <section className="section bg-deep" aria-labelledby="vh">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow" {...r()}>
              {p.secondaryEyebrow}
            </span>
            <h2 className="h2" id="vh" {...r(0.1)}>
              <Title text={p.secondaryTitle} em={p.secondaryTitleEm} />
            </h2>
          </div>
          <ul className="values">
            {values.map((x: any, i: number) => (
              <li className="value" key={i} {...r(i * 0.1)}>
                <span className="n">0{i + 1}</span>
                <h3 className="h3">{x.title}</h3>
                <p>{x.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection s={s} />
    </>
  );
}
