import { NextResponse } from "next/server";
import { sendEmail, writeClient } from "@/lib/write";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (v: unknown, n = 2000) => String(v ?? "").trim().slice(0, n);

export async function POST(req: Request) {
  let b: any;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const d = {
    firstName: clip(b.first, 100),
    lastName: clip(b.last, 100),
    email: clip(b.email, 200),
    phone: clip(b.phone, 60),
    arrival: clip(b.arrival, 20),
    departure: clip(b.departure, 20),
    guests: Number(b.guests) || 0,
    villa: clip(b.villa, 100),
    requests: clip(b.requests, 4000),
  };
  if (!d.firstName || !d.lastName || !EMAIL.test(d.email) || !d.arrival || !d.departure || d.guests < 1 || d.guests > 30 || d.departure <= d.arrival) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 422 });
  }

  let saved = false;
  let emailed = false;
  const wc = writeClient();
  if (wc) {
    try {
      await wc.create({ _type: "enquiry", ...d, status: "new", receivedAt: new Date().toISOString() });
      saved = true;
    } catch (e) {
      console.error("[enquiry] Sanity write failed", e);
    }
  }
  try {
    emailed = await sendEmail(
      `New enquiry — ${d.firstName} ${d.lastName} (${d.arrival} → ${d.departure})`,
      `Name: ${d.firstName} ${d.lastName}\nEmail: ${d.email}\nPhone: ${d.phone}\nVilla: ${d.villa || "no preference"}\nDates: ${d.arrival} → ${d.departure}\nGuests: ${d.guests}\n\nRequests:\n${d.requests}`,
      d.email,
    );
  } catch (e) {
    console.error("[enquiry] email failed", e);
  }

  if (!saved && !emailed) console.log("[enquiry] (no storage/email configured — logged only)", d);
  return NextResponse.json({ ok: true });
}
