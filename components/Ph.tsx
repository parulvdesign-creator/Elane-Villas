import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import { hotspotPosition, imageUrl } from "@/lib/sanity";

const ICON = (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="6" width="24" height="20" rx="3" />
    <circle cx="12" cy="13" r="2.2" />
    <path d="M4 22l7-6 5 4 4-3 8 6" />
  </svg>
);

function localPhoto(slot: string): string | undefined {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "photos", `${slot}.jpg`)) ? `/photos/${slot}.jpg` : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Image slot. Priority: image chosen in Sanity → /public/photos/<slot>.jpg → labelled placeholder.
 * `slot` is the placeholder/photo filename (e.g. "hero-home").
 */
export function Ph({
  slot,
  image,
  alt,
  className = "",
  priority = false,
  style,
  width = 1600,
}: {
  slot: string;
  image?: any;
  alt?: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
  width?: number;
}) {
  const label = alt || image?.alt || slot.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const src = imageUrl(image, width) ?? localPhoto(slot);
  const pos = hotspotPosition(image);
  return (
    <div className={`ph ${className}`.trim()} style={style} role="img" aria-label={label}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="ph__img" src={src} alt="" loading={priority ? "eager" : "lazy"} decoding="async" style={pos ? { objectPosition: pos } : undefined} />
      ) : (
        <span className="ph__in">
          {ICON}
          <b>{label}</b>
          <small>{slot}.jpg</small>
        </span>
      )}
    </div>
  );
}
