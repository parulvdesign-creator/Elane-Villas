import { NextResponse } from "next/server";
import { writeClient } from "@/lib/write";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    email = String((await req.json()).email ?? "").trim().toLowerCase().slice(0, 200);
  } catch {
    /* ignore */
  }
  if (!EMAIL.test(email)) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });

  const wc = writeClient();
  if (wc) {
    try {
      // one document per address: re-subscribing is a no-op
      await wc.createIfNotExists({ _id: `subscriber-${email.replace(/[^a-z0-9]/g, "-")}`, _type: "subscriber", email, subscribedAt: new Date().toISOString() });
    } catch (e) {
      console.error("[newsletter] Sanity write failed", e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  } else {
    console.log("[newsletter] (no storage configured — logged only)", email);
  }
  return NextResponse.json({ ok: true });
}
