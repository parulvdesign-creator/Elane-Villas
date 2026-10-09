import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { Icon, Title, r } from "@/components/ui";
import { getPage, getServices, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("hospitality");
  return { title: "Hospitality, Perfected", description: p.seoDescription };
}

export default async function HospitalityPage() {
  const [p, s, services] = await Promise.all([getPage("hospitality"), getSettings(), getServices()]);
  return (
    <>
      <Hero slot="hero-hospitality" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} sub={p.sub} text={p.text} />
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow" {...r()}>
              {p.introEyebrow}
            </span>
            <h2 className="big-quote" {...r(0.1)}>
              <Title text={p.introTitle} em={p.introTitleEm} />
            </h2>
          </div>
          <div className="prose lead" {...r(0.2)}>
            {(p.introParagraphs ?? []).map((t: string, i: number) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-paper" aria-labelledby="svh">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow" {...r()}>
              {p.secondaryEyebrow}
            </span>
            <h2 className="h2" id="svh" {...r(0.1)}>
              <Title text={p.secondaryTitle} em={p.secondaryTitleEm} />
            </h2>
          </div>
          <ul className="services">
            {services.map((x: any, i: number) => (
              <li className="service" key={i} {...r((i % 3) * 0.1)}>
                <Icon name={x.icon} />
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
