/**
 * Copies the built-in sample content (data/seed.ts) into your Sanity dataset so the Studio
 * starts pre-filled. Safe to re-run: documents use fixed IDs and are replaced.
 *
 *   npm run seed       (needs .env.local with project ID + SANITY_API_WRITE_TOKEN)
 *   npm run seed:dry   (prints what would be created, writes nothing)
 *
 * Images are not copied — add them in the Studio (or drop JPGs in /public/photos).
 */
import { createClient } from "@sanity/client";
import { seed } from "../data/seed";

const dry = process.argv.includes("--dry");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!dry && (!projectId || !token)) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local — see README.md.");
  process.exit(1);
}

const key = () => Math.random().toString(36).slice(2, 12);
/** Sanity arrays of objects need a _key on each item. */
function withKeys(v: any): any {
  if (Array.isArray(v)) return v.map((x) => (x && typeof x === "object" && !Array.isArray(x) ? { _key: key(), ...withKeys(x) } : withKeys(x)));
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, withKeys(x)]));
  return v;
}
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const docs: any[] = [];
docs.push({ _id: "siteSettings", _type: "siteSettings", ...seed.settings });
docs.push({ _id: "homePage", _type: "homePage", ...seed.home });
for (const [k, v] of Object.entries<any>(seed.pages)) docs.push({ _id: `page-${k}`, _type: "pageContent", key: k, ...v });
seed.villas.forEach((v: any, i: number) => docs.push({ _id: `villa-${v.slug}`, _type: "villa", order: i + 1, ...v, slug: { _type: "slug", current: v.slug } }));
seed.experiences.forEach((x: any, i: number) => docs.push({ _id: `experience-${x.slug}`, _type: "experience", order: i + 1, ...x, slug: { _type: "slug", current: x.slug } }));
seed.services.forEach((x: any, i: number) => docs.push({ _id: `service-${i + 1}`, _type: "service", order: i + 1, ...x }));
seed.values.forEach((x: any, i: number) => docs.push({ _id: `value-${i + 1}`, _type: "value", order: i + 1, ...x }));
seed.gallery.forEach((x: any, i: number) => docs.push({ _id: `gallery-${i + 1}`, _type: "galleryItem", order: i + 1, ...x }));
seed.posts.forEach((x: any, i: number) =>
  docs.push({ _id: `post-${x.slug || slugify(x.title)}`, _type: "journalPost", ...x, slug: { _type: "slug", current: x.slug }, publishedAt: new Date(Date.now() - i * 86400000 * 7).toISOString() }),
);
seed.testimonials.forEach((x: any, i: number) => docs.push({ _id: `testimonial-${i + 1}`, _type: "testimonial", order: i + 1, ...x }));
seed.faqs.forEach((x: any, i: number) => docs.push({ _id: `faq-${i + 1}`, _type: "faq", order: i + 1, ...x }));

const prepared = docs.map(withKeys);
const counts = prepared.reduce<Record<string, number>>((a, d) => ((a[d._type] = (a[d._type] || 0) + 1), a), {});
console.log(dry ? "DRY RUN — would create/replace:" : `Writing to ${projectId}/${dataset}:`, counts, `(total ${prepared.length})`);

if (!dry) {
  const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });
  let tx = client.transaction();
  prepared.forEach((d) => (tx = tx.createOrReplace(d)));
  tx.commit().then(
    () => console.log("Done. Open /studio to see the content."),
    (e) => {
      console.error("Seed failed:", e.message);
      process.exit(1);
    },
  );
}
