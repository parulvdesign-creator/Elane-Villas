import { Btn, r } from "./ui";

export default function CtaSection({ s }: { s: any }) {
  const c = s.cta;
  return (
    <section className="section cta bg-deep" aria-labelledby="gcta">
      <div className="wrap">
        <span className="eyebrow" {...r()}>
          {c.eyebrow}
        </span>
        <h2 className="display" id="gcta" {...r(0.1)}>
          {c.title}
          <br />
          <em>{c.titleEm}</em>
        </h2>
        <p className="lead" {...r(0.2)}>
          {c.lead}
        </p>
        <p {...r(0.25)}>{c.text}</p>
        <div className="row" {...r(0.3)}>
          <Btn href={c.primary.href} variant="gold">
            {c.primary.label}
          </Btn>
          <Btn href={c.secondary.href} variant="light">
            {c.secondary.label}
          </Btn>
        </div>
      </div>
    </section>
  );
}
