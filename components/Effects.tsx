"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Scroll-reveal for any element carrying data-r (re-runs on every route change). */
export default function Effects() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-r]:not(.is-in)"));
    els.forEach((el) => el.style.setProperty("--d", (el.dataset.d || "0") + "s"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
