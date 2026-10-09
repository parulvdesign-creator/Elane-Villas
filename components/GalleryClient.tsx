"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type Item = { category: string; caption: string; ratio: string; media: ReactNode };

export default function GalleryClient({ items, categories }: { items: Item[]; categories: string[] }) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null); // index within `visible`
  const visible = items.map((it, i) => ({ ...it, i })).filter((it) => filter === "all" || it.category === filter);

  // honour #Category in the URL
  useEffect(() => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h && categories.includes(h)) setFilter(h);
  }, [categories]);

  // lightbox keyboard + scroll lock
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + visible.length) % visible.length));
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % visible.length));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, visible.length]);

  const cur = open === null ? null : visible[open];

  return (
    <>
      <div className="filters" role="group" aria-label="Filter gallery">
        {["all", ...categories].map((c) => (
          <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>
      <div className="masonry">
        {visible.map((it, idx) => (
          <button key={it.i} className="shot" aria-label={`Open image: ${it.caption}`} onClick={() => setOpen(idx)} style={{ ["--r" as any]: it.ratio } as CSSProperties}>
            {it.media}
            <span className="cap">
              {it.category} — {it.caption}
            </span>
          </button>
        ))}
      </div>
      <div className={`lb${cur ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        <button className="x" aria-label="Close" onClick={() => setOpen(null)}>
          ×
        </button>
        <button className="p" aria-label="Previous" onClick={() => setOpen((o) => (o === null ? o : (o - 1 + visible.length) % visible.length))}>
          ‹
        </button>
        <button className="n" aria-label="Next" onClick={() => setOpen((o) => (o === null ? o : (o + 1) % visible.length))}>
          ›
        </button>
        <figure>
          <div className="slot">{cur?.media}</div>
          <figcaption>{cur?.caption}</figcaption>
        </figure>
      </div>
    </>
  );
}
