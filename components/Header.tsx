"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui";

type NavItem = { label: string; href: string };

export default function Header({ brand, brandSuffix, nav, cta }: { brand: string; brandSuffix: string; nav: NavItem[]; cta: NavItem }) {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden((h) => (y > 520 && y > last.current + 4 && !document.body.classList.contains("menu-open") ? true : y < last.current - 4 ? false : h));
      last.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className={`hdr${solid ? " is-solid" : ""}${hidden ? " is-hidden" : ""}`}>
      <div className="wrap hdr__in">
        <Link className="logo" href="/" aria-label={`${brand} ${brandSuffix} — home`}>
          <b>{brand}</b>
          <small>{brandSuffix}</small>
        </Link>
        <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
          <i />
          <i />
        </button>
        <nav className="nav" id="nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <Link className="btn" href={cta.href}>
            {cta.label}
            <span className="ic">
              <Arrow />
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
