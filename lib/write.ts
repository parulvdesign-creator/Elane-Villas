import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./sanity";

/** Server-only client with write access (needs SANITY_API_WRITE_TOKEN). */
export function writeClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token });
}

export async function sendEmail(subject: string, text: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  const from = process.env.ENQUIRY_FROM;
  if (!key || !to || !from) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text, reply_to: replyTo }),
  });
  return res.ok;
}
