"use client";

import { useState, type ReactNode } from "react";

export default function ExperienceList({ items }: { items: { title: string; media: ReactNode }[] }) {
  const [on, setOn] = useState(0);
  return (
    <div className="xp">
      <ul className="xp__list" data-r="" data-d="0.1">
        {items.map((it, i) => (
          <li key={i}>
            <button
              className={`xp__item${on === i ? " is-on" : ""}`}
              aria-expanded={on === i}
              onMouseEnter={() => setOn(i)}
              onFocus={() => setOn(i)}
              onClick={() => setOn(i)}
            >
              <span className="n">0{i + 1}</span>
              <span className="t">{it.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="xp__media" aria-hidden="true">
        {items.map((it, i) => (
          <div key={i} className={`xp__slide${on === i ? " is-on" : ""}`}>
            {it.media}
          </div>
        ))}
      </div>
    </div>
  );
}
