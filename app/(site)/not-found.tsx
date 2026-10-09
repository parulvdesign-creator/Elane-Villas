import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ paddingTop: 120, textAlign: "center" }}>
        <span className="eyebrow" style={{ margin: "0 auto" }}>
          404
        </span>
        <h1 className="h1">
          This page has <em>wandered off.</em>
        </h1>
        <div className="act">
          <Link className="btn" href="/">
            Back to home
            <span className="ic">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
