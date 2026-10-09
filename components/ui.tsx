import Link from "next/link";
import type { ReactNode } from "react";

/* ───────── icons ───────── */
const ICONS: Record<string, string> = {
  bed: "M4 25V9M4 20h24v5M28 20v-4a4 4 0 0 0-4-4H13v8 M6 14.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0",
  guests: "M8 11a4 4 0 1 0 8 0 4 4 0 0 0-8 0 M4 26c0-5 3.5-8 8-8s8 3 8 8 M20 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0 M22 18c4 0 7 2.5 7 7",
  pool: "M3 24c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 4 2 M3 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2 M11 16V7a3 3 0 0 1 6 0 M20 16V7a3 3 0 0 1 6 0 M11 11h9",
  ocean: "M11 13a5 5 0 1 0 10 0 5 5 0 0 0-10 0 M3 23c3 0 3-2 6.5-2S13 23 16 23s3-2 6.5-2S26 23 29 23 M16 4v2 M6 8l1.5 1.5 M26 8l-1.5 1.5",
  chef: "M9 17a5 5 0 1 1 2.5-9.3 5 5 0 0 1 9 0A5 5 0 1 1 23 17v9H9z M9 22h14",
  clean: "M14 4l2.2 7.8L24 14l-7.8 2.2L14 24l-2.2-7.8L4 14l7.8-2.2z M25 21v7 M21.5 24.5h7",
  concierge: "M5 22h22 M8 22a8 8 0 0 1 16 0 M16 10V7 M13 7h6 M4 26h24",
  dining: "M6 14h20 M10 14v12 M22 14v12 M16 14V6 M9 9h14c0-3-3-5-7-5S9 6 9 9z",
  sunset: "M4 22h24 M9 22a7 7 0 0 1 14 0 M16 8v3 M6 12l2 2 M26 12l-2 2 M10 27h12",
  wifi: "M4 13a17 17 0 0 1 24 0 M8 18a11 11 0 0 1 16 0 M12 23a5 5 0 0 1 8 0 M15.2 27a.8.8 0 1 0 1.6 0 .8.8 0 0 0-1.6 0",
  car: "M4 20v-4l3-6h18l3 6v4z M6 20v5h4v-5 M22 20v5h4v-5 M7 16h18",
  lotus: "M16 5c3 3 4 8 0 14-4-6-3-11 0-14z M5 11c5 0 9 3 11 8-5 1-10-1-11-8z M27 11c-5 0-9 3-11 8 5 1 10-1 11-8z M5 26h22",
  boat: "M16 4v17 M16 5l9 14H16 M14 9l-6 10h6 M4 23h24l-3 4H7z",
  compass: "M5 16a11 11 0 1 0 22 0 11 11 0 0 0-22 0 M21 11l-2.5 7L11.5 21 14 14z",
  toast: "M9 4h14l-1 9a6 6 0 0 1-12 0z M16 19v7 M10 27h12",
  key: "M5 16a5 5 0 1 0 10 0 5 5 0 0 0-10 0 M15 16h14 M25 16v4 M29 16v3",
  linen: "M4 12c4-3 8 3 12 0s8 3 12 0v11c-4 3-8-3-12 0s-8-3-12 0z",
  bottle: "M12 4h8v5h-8z M10 9h12v19H10z M10 16h12",
  cup: "M6 14h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z M22 16h2a3 3 0 0 1 0 6h-2 M11 5c-1 2 1 3 0 5 M16 5c-1 2 1 3 0 5",
};
export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, className = "ico" }: { name: string; className?: string }) {
  const d = ICONS[name] ?? ICONS.compass;
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10L10 2M3.5 2H10v6.5" />
    </svg>
  );
}

/* ───────── helpers ───────── */
/** Scroll-reveal attributes (handled by <Effects/>). */
export function r(d = 0, kind = ""): Record<string, string> {
  return { "data-r": kind, "data-d": String(d) };
}

/** "Plain text" + italic part, e.g. title="Stay Somewhere" em="Extraordinary." */
export function Title({ text, em, after }: { text?: string; em?: string; after?: string }) {
  return (
    <>
      {text}
      {em ? (
        <>
          {text ? " " : ""}
          <em>{em}</em>
        </>
      ) : null}
      {after}
    </>
  );
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:|#)/.test(href);
}

export function SmartLink({ href, className, children, ...rest }: { href: string; className?: string; children: ReactNode; [k: string]: any }) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** Pill button with circular arrow. variant: "" (dark) | "gold" (white) | "light" (glass) */
export function Btn({ href, children, variant = "" }: { href: string; children: ReactNode; variant?: "" | "gold" | "light" }) {
  return (
    <SmartLink href={href} className={`btn${variant ? ` btn--${variant}` : ""}`}>
      {children}
      <span className="ic">
        <Arrow />
      </span>
    </SmartLink>
  );
}

/** Outlined text-link pill with circular arrow. */
export function PillLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SmartLink href={href} className="link">
      {children}
      <span className="ic">
        <Arrow />
      </span>
    </SmartLink>
  );
}

export function Eyebrow({ children, ...rest }: { children: ReactNode; [k: string]: any }) {
  return (
    <span className="eyebrow" {...rest}>
      {children}
    </span>
  );
}
