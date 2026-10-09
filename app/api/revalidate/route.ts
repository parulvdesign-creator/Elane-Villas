import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Optional Sanity webhook (Manage → API → Webhooks) for instant updates after Publish:
 *   URL: https://your-site.com/api/revalidate?secret=YOUR_SECRET   · Method: POST
 * Without it, pages refresh automatically within ~60 seconds.
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const given = new URL(req.url).searchParams.get("secret");
  if (!secret || given !== secret) return NextResponse.json({ ok: false }, { status: 401 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: Date.now() });
}
