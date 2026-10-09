import Link from "next/link";
import { Ph } from "./Ph";
import Newsletter from "./Newsletter";
import { SmartLink } from "./ui";

const SOCIAL: Record<string, { label: string; svg: React.ReactNode }> = {
  instagram: {
    label: "Instagram",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r=".9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  pinterest: {
    label: "Pinterest",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.64 19.3c-.08-.82-.16-2.08.03-2.98l1.1-4.7s-.28-.56-.28-1.4c0-1.3.76-2.28 1.7-2.28.8 0 1.2.6 1.2 1.33 0 .8-.52 2-.78 3.1-.22.93.47 1.7 1.38 1.7 1.66 0 2.94-1.75 2.94-4.28 0-2.24-1.6-3.8-3.9-3.8-2.65 0-4.2 2-4.2 4.04 0 .8.3 1.66.7 2.13.08.1.1.18.07.3l-.26 1.04c-.04.17-.14.2-.32.12-1.2-.56-1.95-2.3-1.95-3.7 0-3 2.18-5.78 6.3-5.78 3.3 0 5.88 2.35 5.88 5.5 0 3.28-2.07 5.92-4.94 5.92-.96 0-1.87-.5-2.18-1.1l-.6 2.28c-.2.84-.8 1.9-1.2 2.55A10 10 0 1 0 12 2z" />
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5H16l.5-3h-3V8.8c0-.9.3-1.5 1.6-1.5h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.3H8v3h2.3V21z" />
      </svg>
    ),
  },
  youtube: {
    label: "YouTube",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5 3z" />
      </svg>
    ),
  },
};

export default function Footer({ s }: { s: any }) {
  const f = s.footer;
  return (
    <footer className="ftr">
      <div className="ftr__bg">
        <Ph slot="footer-bg" image={f.image} alt="Footer background image" />
      </div>
      <div className="wrap ftr__in">
        <div className="ftr__hero">
          <div>
            <SmartLink className="ftr__chip" href={f.chip.href}>
              <i />
              {f.chip.label}
            </SmartLink>
            <h2 className="ftr__h">
              {f.headline.map((line: string, i: number) => (
                <span key={i}>
                  {line}
                  {i < f.headline.length - 1 ? <br /> : null}
                </span>
              ))}
            </h2>
          </div>
          <div className="ftr__sub">
            <b>{f.newsletterTitle}</b>
            <p>{f.newsletterText}</p>
            <Newsletter />
          </div>
        </div>
        <div className="ftr__cols">
          <div>
            <Link className="logo" href="/">
              <b>{s.brand}</b>
              <small>{s.brandSuffix}</small>
            </Link>
          </div>
          {f.columns.map((c: any) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l: any) => (
                  <li key={l.label}>
                    <SmartLink href={l.href}>{l.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4>Follow</h4>
            <div className="social">
              {f.social.map((x: any) => {
                const p = SOCIAL[x.platform];
                return p ? (
                  <a key={x.platform} href={x.url || "#"} aria-label={p.label} target={x.url && x.url !== "#" ? "_blank" : undefined} rel="noopener noreferrer">
                    {p.svg}
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>
        <div className="ftr__bot">
          <span>{f.copyright}</span>
          <nav aria-label="Legal">
            {f.legal.map((l: any) => (
              <SmartLink key={l.label} href={l.href}>
                {l.label}
              </SmartLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="ftr__mark" aria-hidden="true">
        {s.brand}
      </div>
    </footer>
  );
}
