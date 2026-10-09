"use client";

import { useRef, useState } from "react";
import { Arrow } from "./ui";

type Villa = { slug: string; name: string };
type Defaults = { villa?: string; arrival?: string; guests?: string };

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function EnquiryForm({ villas, defaults, email }: { villas: Villa[]; defaults: Defaults; email: string }) {
  const today = todayStr();
  const validArrival = defaults.arrival && /^\d{4}-\d{2}-\d{2}$/.test(defaults.arrival) && defaults.arrival >= today ? defaults.arrival : "";
  const g = Number(defaults.guests);
  const [v, setV] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    arrival: validArrival,
    departure: "",
    guests: g >= 1 ? String(Math.min(30, g)) : "",
    villa: villas.some((x) => x.slug === defaults.villa) ? defaults.villa! : "",
    requests: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const rules: Record<string, (val: string) => string> = {
    first: (x) => (x.trim() ? "" : "Please enter your first name."),
    last: (x) => (x.trim() ? "" : "Please enter your last name."),
    email: (x) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x) ? "" : "Please enter a valid email address."),
    arrival: (x) => (x ? "" : "Please choose an arrival date."),
    departure: (x) => (!x ? "Please choose a departure date." : v.arrival && x <= v.arrival ? "Departure must be after arrival." : ""),
    guests: (x) => (+x >= 1 && +x <= 30 ? "" : "Please enter the number of guests."),
  };

  const set = (k: string, val: string) => {
    setV((p) => {
      const n = { ...p, [k]: val };
      if (k === "arrival" && n.departure && n.departure <= val) n.departure = "";
      return n;
    });
  };
  const check = (k: string, val = (v as any)[k]) => {
    const m = rules[k]?.(val) ?? "";
    setErrors((e) => ({ ...e, [k]: m }));
    return !m;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ok = Object.keys(rules).map((k) => check(k)).every(Boolean);
    if (!ok) {
      ref.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      if (!res.ok) throw new Error();
      setDone(true);
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  if (done)
    return (
      <div className="thanks is-on" role="status" aria-live="polite">
        <span className="eyebrow">Enquiry received</span>
        <h2 className="h2">
          Thank you, <em>{v.first.trim()}</em>.
        </h2>
        <p className="lead" style={{ marginInline: "auto" }}>
          Our reservations team will be in touch shortly to begin shaping your stay.
        </p>
      </div>
    );

  const field = ({ k, label, type = "text", full = false, children, ...rest }: any) => (
    <div className={`field${full ? " field--full" : ""}${errors[k] ? " is-bad" : ""}`}>
      <label htmlFor={k}>{label}</label>
      {children ?? (
        <input
          id={k}
          name={k}
          type={type}
          value={(v as any)[k]}
          onChange={(e) => set(k, e.target.value)}
          onBlur={() => rules[k] && check(k)}
          aria-invalid={!!errors[k]}
          {...rest}
        />
      )}
      <span className="err" role="alert">
        {errors[k]}
      </span>
    </div>
  );

  return (
    <form ref={ref} id="enquiry" className="form" noValidate onSubmit={submit}>
      {field({ k: "first", label: "First Name", autoComplete: "given-name" })}
      {field({ k: "last", label: "Last Name", autoComplete: "family-name" })}
      {field({ k: "email", label: "Email Address", type: "email", autoComplete: "email" })}
      {field({ k: "phone", label: "Phone Number", type: "tel", autoComplete: "tel" })}
      {field({ k: "arrival", label: "Arrival Date", type: "date", min: today })}
      {field({ k: "departure", label: "Departure Date", type: "date", min: v.arrival || today })}
      {field({ k: "guests", label: "Number of Guests", type: "number", min: 1, max: 30, inputMode: "numeric" })}
      <div className="field">
        <label htmlFor="villa">Preferred Villa</label>
        <select id="villa" name="villa" value={v.villa} onChange={(e) => set("villa", e.target.value)}>
          <option value="">I’d love your guidance</option>
          {villas.map((x) => (
            <option key={x.slug} value={x.slug}>
              {x.name}
            </option>
          ))}
        </select>
        <span className="err" />
      </div>
      <div className="field field--full">
        <label htmlFor="requests">Special Requests</label>
        <textarea id="requests" name="requests" rows={4} placeholder="Celebrations, dietary preferences, arrival details…" value={v.requests} onChange={(e) => set("requests", e.target.value)} />
      </div>
      <div className="form__foot">
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Sending…" : "Send Enquiry"}
          <span className="ic">
            <Arrow />
          </span>
        </button>
        <small>
          {failed ? (
            <>
              Sorry — we couldn’t send your enquiry. Please email <a href={`mailto:${email}`}>{email}</a>.
            </>
          ) : (
            <>We’ll reply personally — usually within one working day.</>
          )}
        </small>
      </div>
    </form>
  );
}
