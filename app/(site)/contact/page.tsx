import type { Metadata } from "next";
import Hero from "@/components/Hero";
import EnquiryForm from "@/components/EnquiryForm";
import { Ph } from "@/components/Ph";
import { Title, r } from "@/components/ui";
import { getPage, getSettings, getVillas } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("contact");
  return { title: "Let’s Begin Your Journey — Enquire", description: p.seoDescription };
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ContactPage({ searchParams }: Props) {
  const sp = await searchParams;
  const one = (x: string | string[] | undefined) => (Array.isArray(x) ? x[0] : x);
  const [p, s, villas] = await Promise.all([getPage("contact"), getSettings(), getVillas()]);
  return (
    <>
      <Hero slot="hero-contact" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} sub={p.sub} />
      <section className="section">
        <div className="wrap contact">
          <div>
            <EnquiryForm
              villas={villas.map((v: any) => ({ slug: v.slug, name: v.name }))}
              defaults={{ villa: one(sp.villa), arrival: one(sp.arrival), guests: one(sp.guests) }}
              email={s.reservationsEmail}
            />
          </div>
          <aside className="aside" {...r(0.1)}>
            <Ph slot="contact-aside" image={p.image} alt="A calm villa interior" />
            <span className="eyebrow">{p.introEyebrow}</span>
            <h3 className="h2">
              <Title text={p.introTitle} em={p.introTitleEm} />
            </h3>
            <p className="lead">{(p.introParagraphs ?? [])[0]}</p>
            <dl>
              <dt>Reservations</dt>
              <dd>
                <a href={`mailto:${s.reservationsEmail}`}>{s.reservationsEmail}</a>
              </dd>
              <dt>Concierge</dt>
              <dd>
                <a href={`mailto:${s.conciergeEmail}`}>{s.conciergeEmail}</a>
              </dd>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
