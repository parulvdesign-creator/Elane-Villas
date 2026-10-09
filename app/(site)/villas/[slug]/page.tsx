import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import VillaCard from "@/components/VillaCard";
import { Ph } from "@/components/Ph";
import { Btn, Icon, Title, r } from "@/components/ui";
import { getSettings, getVilla, getVillas } from "@/lib/content";
import { seed } from "@/data/seed";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const villas = await getVillas();
  return villas.map((v: any) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVilla(slug);
  if (!v) return {};
  return { title: `${v.name} — ${v.type}`, description: `${v.name}: ${v.tagline}. ${v.description}` };
}

function Spec({ v }: { v: any }) {
  const [pa, ...pb] = String(v.pool).split(" ");
  const [ta, ...tb] = String(v.type).split(" ");
  return (
    <div className="spec" {...r(0.3)}>
      <div>
        <b>{v.guests}</b>
        <span>Guests</span>
      </div>
      <div>
        <b>{pa}</b>
        <span>{pb.join(" ")}</span>
      </div>
      <div>
        <b>{ta}</b>
        <span>{tb.join(" ").replace(/^./, (c) => c.toUpperCase())}</span>
      </div>
    </div>
  );
}

export default async function VillaPage({ params }: Props) {
  const { slug } = await params;
  const [v, s, all] = await Promise.all([getVilla(slug), getSettings(), getVillas()]);
  if (!v) notFound();

  const full = Array.isArray(v.highlights) && v.highlights.length > 0;
  const ov = v.overview ?? { title: v.tagline, titleEm: "", paragraphs: [v.homeDescription, v.description] };
  const nameEm = String(v.name).split(" ").slice(-1)[0];
  const nameBase = String(v.name).split(" ").slice(0, -1).join(" ");
  const others = all.filter((x: any) => x.slug !== v.slug);
  const lean = seed.leanHospitality;

  return (
    <>
      <Hero
        slot={`hero-${v.slug}`}
        image={v.heroImage || v.image}
        title={<Title text={nameBase} em={nameEm} />}
        sub={v.heroSub || v.tagline}
        text={v.heroText || v.description}
        crumbs={
          <>
            <Link href="/villas">Villas</Link> &nbsp;/&nbsp; {v.name}
          </>
        }
        ctas={
          <Btn href={`/contact?villa=${v.slug}`} variant="gold">
            Check Availability
          </Btn>
        }
      />

      <section className="section">
        <div className="wrap split split--c">
          <div>
            <span className="eyebrow" {...r()}>
              Overview
            </span>
            <h2 className="h1" {...r(0.1)}>
              <Title text={ov.title} em={ov.titleEm} />
            </h2>
            <div className="lead" {...r(0.2)}>
              {ov.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Spec v={v} />
          </div>
          <div {...r(0, "img")}>
            <Ph slot={`${v.slug}-overview`} image={v.overviewImage || v.image} alt={`${v.name}`} />
          </div>
        </div>
      </section>

      {full ? (
        <>
          <section className="section bg-paper" aria-labelledby="hlh">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow" {...r()}>
                  At a glance
                </span>
                <h2 className="h2" id="hlh" {...r(0.1)}>
                  Villa <em>Highlights</em>
                </h2>
              </div>
              <ul className="hl">
                {v.highlights.map((h: any, i: number) => (
                  <li key={i} {...r(i * 0.05)}>
                    <Icon name={h.icon} />
                    <span>{h.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {v.spaces?.length ? (
            <section className="section" aria-labelledby="sph">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow" {...r()}>
                    Inside &amp; Out
                  </span>
                  <h2 className="h2" id="sph" {...r(0.1)}>
                    The <em>Spaces</em>
                  </h2>
                </div>
                {v.spaces.map((sp: any, i: number) => (
                  <div className="space" key={i}>
                    <div className="zoom" {...r(0, "img")}>
                      <Ph slot={`${v.slug}-space-${i + 1}`} image={sp.image} alt={sp.title} />
                    </div>
                    <div {...r(0.15)}>
                      <span className="eyebrow">0{i + 1}</span>
                      <h3 className="h2">{sp.title}</h3>
                      <p className="lead">{sp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {v.includes?.length || v.optional?.length ? (
            <section className="section bg-deep">
              <div className="wrap lists">
                <div {...r()}>
                  <span className="eyebrow">Included</span>
                  <h2 className="h2">
                    Your Stay <em>Includes</em>
                  </h2>
                  <ul className="tick">
                    {(v.includes ?? []).map((x: string) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div {...r(0.15)}>
                  <span className="eyebrow">On request</span>
                  <h2 className="h2">
                    Optional <em>Experiences</em>
                  </h2>
                  <ul className="tick">
                    {(v.optional ?? []).map((x: string) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <div className="act">
                    <Btn href={`/contact?villa=${v.slug}`} variant="gold">
                      Create Your Perfect Stay
                    </Btn>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <>
          <section className="section bg-deep" aria-labelledby="sv">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Hospitality</span>
                <h2 className="h2" id="sv">
                  <Title text={lean.title} em={lean.titleEm} />
                </h2>
                <p className="lead">{lean.text}</p>
              </div>
              <ul className="hl">
                {seed.leanServices.map((h: any, i: number) => (
                  <li key={i} {...r(i * 0.08)}>
                    <Icon name={h.icon} />
                    <span>{h.label}</span>
                  </li>
                ))}
              </ul>
              <div className="act" {...r()}>
                <Btn href={`/contact?villa=${v.slug}`} variant="gold">
                  Create Your Perfect Stay
                </Btn>
              </div>
            </div>
          </section>
          {others.length ? (
            <section className="section">
              <div className="wrap">
                <div className="sec-head">
                  <span className="eyebrow">Continue exploring</span>
                  <h2 className="h2">
                    More <em>Villas</em>
                  </h2>
                </div>
                <div className="villa-cards villa-cards--2">
                  {others.slice(0, 2).map((o: any, i: number) => (
                    <VillaCard key={o.slug} v={o} i={i} sub />
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </>
      )}

      <CtaSection s={s} />
    </>
  );
}
