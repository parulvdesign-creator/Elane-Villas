import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CtaSection from "@/components/CtaSection";
import VillaCard from "@/components/VillaCard";
import ExperienceList from "@/components/ExperienceList";
import { Ph } from "@/components/Ph";
import { Btn, Icon, PillLink, Title, r } from "@/components/ui";
import { getHome, getPosts, getSettings, getTestimonials, getVillas } from "@/lib/content";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const h = await getHome();
  return { title: { absolute: h.seoTitle }, description: h.seoDescription };
}

export default async function HomePage() {
  const [h, s, villas, posts, quotes] = await Promise.all([getHome(), getSettings(), getVillas(), getPosts(4), getTestimonials()]);

  const finder = (
    <form className="finder" action="/contact" method="get">
      <span className="finder__t">{s.finderTitle}</span>
      <label className="f">
        <small>Preferred villa</small>
        <select name="villa" defaultValue="">
          <option value="">Help me choose</option>
          {villas.map((v: any) => (
            <option key={v.slug} value={v.slug}>
              {v.name}
            </option>
          ))}
        </select>
      </label>
      <div className="two">
        <label className="f">
          <small>Arrival</small>
          <input type="date" name="arrival" />
        </label>
        <label className="f">
          <small>Guests</small>
          <input type="number" name="guests" min={1} max={30} placeholder="2" />
        </label>
      </div>
      <button className="btn" type="submit">
        Check Availability
        <span className="ic">
          <svg className="arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 10L10 2M3.5 2H10v6.5" />
          </svg>
        </span>
      </button>
    </form>
  );

  return (
    <>
      <Hero
        home
        slot="hero-home"
        image={h.hero.image}
        title={
          <>
            {h.hero.title}
            <br />
            <em>{h.hero.titleEm}</em>
          </>
        }
        sub={h.hero.sub}
        text={h.hero.text}
        ctas={
          <>
            <Btn href={h.hero.primary.href} variant="light">
              {h.hero.primary.label}
            </Btn>
            <Btn href={h.hero.secondary.href} variant="gold">
              {h.hero.secondary.label}
            </Btn>
          </>
        }
        extra={finder}
      />

      {/* Introduction */}
      <section className="section" id="story">
        <div className="wrap intro">
          <div>
            <span className="eyebrow" {...r()}>
              {h.intro.eyebrow}
            </span>
            <h2 className="h1" {...r(0.1)}>
              <Title text={h.intro.title} em={h.intro.titleEm} />
            </h2>
            <div className="intro__text lead" {...r(0.2)}>
              {h.intro.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="act" {...r(0.3)}>
              <PillLink href={h.intro.cta.href}>{h.intro.cta.label}</PillLink>
            </div>
          </div>
          <div className="arch-wrap" {...r(0.15, "fade")}>
            <Ph slot="home-intro" image={h.intro.image} alt="A light-filled villa living room" className="arch" />
          </div>
        </div>
      </section>

      {/* Villas */}
      <section className="section bg-paper" aria-labelledby="fv">
        <div className="wrap">
          <div className="sec-row">
            <div className="sec-head">
              <span className="eyebrow" {...r()}>
                {h.villas.eyebrow}
              </span>
              <h2 className="h2" id="fv" {...r(0.1)}>
                <Title text={h.villas.title} em={h.villas.titleEm} />
              </h2>
              <p className="lead" {...r(0.2)}>
                {h.villas.text}
              </p>
            </div>
            <div {...r(0.2)}>
              <PillLink href={h.villas.cta.href}>{h.villas.cta.label}</PillLink>
            </div>
          </div>
          <div className="villa-cards">
            {villas.map((v: any, i: number) => (
              <VillaCard key={v.slug} v={v} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Hospitality */}
      <section className="section bg-deep" aria-labelledby="hp">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow" {...r()}>
              {h.hospitality.eyebrow}
            </span>
            <h2 className="h2" id="hp" {...r(0.1)}>
              <Title text={h.hospitality.title} em={h.hospitality.titleEm} />
            </h2>
            <p className="lead" {...r(0.2)}>
              {h.hospitality.lead}
            </p>
            <p className="muted" {...r(0.25)}>
              {h.hospitality.text}
            </p>
          </div>
          <ul className="pillars">
            {h.hospitality.items.map((it: any, i: number) => (
              <li key={i} className="pillar" {...r(i * 0.1)}>
                <span className="pillar__n">0{i + 1}</span>
                <Icon name={it.icon} />
                <h3 className="h3">{it.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experiences */}
      <section className="section" aria-labelledby="xph">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow" {...r()}>
              {h.experiences.eyebrow}
            </span>
            <h2 className="h2" id="xph" {...r(0.1)}>
              <Title text={h.experiences.title} em={h.experiences.titleEm} />
            </h2>
            <p className="lead" {...r(0.2)}>
              {h.experiences.text}
            </p>
          </div>
          <ExperienceList
            items={h.experiences.items.map((it: any, i: number) => ({
              title: it.title,
              media: <Ph slot={`home-xp-${i + 1}`} image={it.image} alt={it.title} />,
            }))}
          />
          <div className="act" {...r()}>
            <PillLink href={h.experiences.cta.href}>{h.experiences.cta.label}</PillLink>
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="section bg-ink" id="dining" aria-labelledby="dh">
        <div className="wrap split split--c">
          <div>
            <span className="eyebrow" {...r()}>
              {h.dining.eyebrow}
            </span>
            <h2 className="h1" id="dh" {...r(0.1)}>
              <Title text={h.dining.title} em={h.dining.titleEm} />
            </h2>
            <div className="lead" {...r(0.2)}>
              <p>{h.dining.lead}</p>
              <p>{h.dining.text}</p>
            </div>
            <div className="act" {...r(0.3)}>
              <PillLink href={h.dining.cta.href}>{h.dining.cta.label}</PillLink>
            </div>
          </div>
          <div {...r(0, "img")}>
            <Ph slot="home-dining" image={h.dining.image} alt="A candlelit table beneath the stars" />
          </div>
        </div>
      </section>

      {/* Design */}
      <section className="section" aria-labelledby="dsh">
        <div className="wrap split split--c">
          <div className="split__img" {...r(0, "img")}>
            <Ph slot="home-design" image={h.design.image} alt="A villa rooted in its landscape" />
          </div>
          <div>
            <span className="eyebrow" {...r()}>
              {h.design.eyebrow}
            </span>
            <h2 className="h1" id="dsh" {...r(0.1)}>
              <Title text={h.design.title} em={h.design.titleEm} />
            </h2>
            <p className="lead" {...r(0.2)}>
              {h.design.text}
            </p>
          </div>
        </div>
      </section>

      {/* Destination */}
      <section className="band" id="destination">
        <Ph slot="home-destination" image={h.destination.image} alt="A secluded turquoise cove" />
        <div className="wrap band__in">
          <span className="eyebrow" {...r()}>
            {h.destination.eyebrow}
          </span>
          <h2 className="h1" {...r(0.1)}>
            <Title text={h.destination.title} em={h.destination.titleEm} />
          </h2>
          <p className="lead" {...r(0.2)}>
            {h.destination.lead}
          </p>
          <p {...r(0.25)}>{h.destination.text}</p>
          <div className="act" {...r(0.3)}>
            <PillLink href={h.destination.cta.href}>{h.destination.cta.label}</PillLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-sand" aria-labelledby="th">
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <span className="eyebrow" {...r()}>
              {h.testimonials.eyebrow}
            </span>
            <h2 className="h2" id="th" {...r(0.1)}>
              <Title text={h.testimonials.title} em={h.testimonials.titleEm} />
            </h2>
          </div>
          <ul className="qgrid">
            {quotes.map((q: any, i: number) => (
              <li key={i} className="qcard" {...r(i * 0.12)}>
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>
                  <p>{q.quote}</p>
                  {q.author ? <footer className="quote-by">— {q.author}</footer> : null}
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journal */}
      <section className="section" aria-labelledby="jh">
        <div className="wrap">
          <div className="sec-row">
            <div className="sec-head">
              <span className="eyebrow" {...r()}>
                {h.journal.eyebrow}
              </span>
              <h2 className="h2" id="jh" {...r(0.1)}>
                <Title text={h.journal.title} em={h.journal.titleEm} />
              </h2>
              <p className="lead" {...r(0.2)}>
                {h.journal.text}
              </p>
            </div>
            <div {...r(0.2)}>
              <PillLink href={h.journal.cta.href}>{h.journal.cta.label}</PillLink>
            </div>
          </div>
          <div className="posts posts--4">
            {posts.map((p: any, i: number) => (
              <Link key={p.slug} className="post zoom" href={`/journal/${p.slug}`} {...r(i * 0.1)}>
                <Ph slot={`home-journal-${i + 1}`} image={p.image} alt={p.title} />
                <h3 className="h3">{p.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection s={s} />
    </>
  );
}
