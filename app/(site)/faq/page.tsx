import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import { Title, r } from "@/components/ui";
import { getFaqs, getPage, getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const p = await getPage("faq");
  return { title: "Frequently Asked Questions", description: p.seoDescription };
}

export default async function FaqPage() {
  const [p, s, faqs] = await Promise.all([getPage("faq"), getSettings(), getFaqs()]);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f: any) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <>
      <Hero slot="hero-faq" image={p.heroImage} eyebrow={p.eyebrow} title={<Title text={p.title} em={p.titleEm} />} />
      <section className="section">
        <div className="wrap">
          <div className="faq">
            {faqs.map((f: any, i: number) => (
              <details key={i} {...r(i * 0.04)}>
                <summary>
                  {f.question}
                  <i aria-hidden="true" />
                </summary>
                <div className="ans">{f.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaSection s={s} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
