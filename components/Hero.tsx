import type { ReactNode } from "react";
import { Ph } from "./Ph";

export default function Hero({
  slot,
  image,
  title,
  eyebrow,
  sub,
  text,
  ctas,
  crumbs,
  home = false,
  extra,
}: {
  slot: string;
  image?: any;
  title: ReactNode;
  eyebrow?: string;
  sub?: string;
  text?: string;
  ctas?: ReactNode;
  crumbs?: ReactNode;
  home?: boolean;
  extra?: ReactNode;
}) {
  return (
    <section className={home ? "hero hero--home" : "hero hero--page"}>
      <Ph slot={slot} image={image} alt="" priority />
      <div className="wrap hero__in">
        <div className="hero__txt">
          {crumbs ? <div className="crumbs">{crumbs}</div> : null}
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className={home ? "display" : "h1"}>{title}</h1>
          {sub ? <p className="hero__sub">{sub}</p> : null}
          {text ? <p className="hero__p">{text}</p> : null}
          {ctas ? <div className="hero__cta">{ctas}</div> : null}
        </div>
        {extra}
      </div>
    </section>
  );
}
