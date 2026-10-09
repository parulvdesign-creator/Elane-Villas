import Link from "next/link";
import { Ph } from "./Ph";
import { Arrow, r } from "./ui";

export default function VillaCard({ v, i = 0, sub = false }: { v: any; i?: number; sub?: boolean }) {
  return (
    <Link className="vcard" href={`/villas/${v.slug}`} {...r(i * 0.12)}>
      <div className="vcard__media">
        <Ph slot={`home-${v.slug}`} image={v.homeImage || v.image} alt={v.name} />
        <span className="pill">{v.type}</span>
        <span className="go">
          <Arrow />
        </span>
      </div>
      <div className="vcard__body">
        <h3 className="h3">{v.name}</h3>
        {sub ? <p className="sub">{v.tagline}</p> : null}
        <p className="meta">
          {v.guests} Guests · {v.pool}
        </p>
      </div>
    </Link>
  );
}
