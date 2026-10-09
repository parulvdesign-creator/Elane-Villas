"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setMsg("Thank you — welcome to the journal.");
      setEmail("");
    } catch {
      setMsg("Sorry, something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="news" noValidate onSubmit={submit}>
      <label className="sr" htmlFor="nl">
        Email address
      </label>
      <input id="nl" type="email" placeholder="Your email address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" disabled={busy}>
        Subscribe
      </button>
      <span className="news__msg" role="status" aria-live="polite">
        {msg}
      </span>
    </form>
  );
}
