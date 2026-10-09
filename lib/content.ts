import { client } from "./sanity";
import { seed } from "@/data/seed";

/* ───────── fetch helper ───────── */
async function q<T = any>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (e) {
    console.warn("[sanity] fetch failed — using built-in sample content.", e);
    return null;
  }
}

/** Deep merge: values from Sanity win; empty/missing fields fall back to the built-in copy. */
function merge(base: any, over: any): any {
  if (over === undefined || over === null || over === "") return base;
  if (Array.isArray(over)) return over.length ? over : base;
  if (typeof over === "object" && typeof base === "object" && base && !Array.isArray(base)) {
    const out: any = { ...base };
    for (const k of Object.keys(over)) {
      if (k.startsWith("_")) {
        out[k] = over[k];
        continue;
      }
      out[k] = merge(base[k], over[k]);
    }
    return out;
  }
  return over;
}

const IMG = `{asset, hotspot, crop, alt}`;
const LINK = `{label, href}`;

/* ───────── singletons ───────── */
export async function getSettings() {
  const d = await q(`*[_type=="siteSettings"][0]{..., footer{..., image${IMG}}}`);
  return merge(seed.settings, d);
}

export async function getHome() {
  const d = await q(`*[_type=="homePage"][0]{
    ...,
    hero{..., image${IMG}},
    intro{..., image${IMG}},
    experiences{..., items[]{..., image${IMG}}},
    dining{..., image${IMG}},
    design{..., image${IMG}},
    destination{..., image${IMG}}
  }`);
  return merge(seed.home, d);
}

export async function getPage(key: string) {
  const d = await q(`*[_type=="pageContent" && key==$key][0]{..., heroImage${IMG}, image${IMG}}`, { key });
  return merge(seed.pages[key], d);
}

/* ───────── collections ───────── */
const VILLA = `{
  ..., "slug": slug.current, image${IMG}, heroImage${IMG}, overviewImage${IMG}, homeImage${IMG},
  spaces[]{..., image${IMG}}
}`;

export async function getVillas(): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="villa"]|order(order asc, name asc)${VILLA}`);
  return d && d.length ? d : seed.villas;
}

export async function getVilla(slug: string) {
  const d = await q(`*[_type=="villa" && slug.current==$slug][0]${VILLA}`, { slug });
  if (d) return d;
  return seed.villas.find((v: any) => v.slug === slug) ?? null;
}

export async function getExperiences(): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="experience"]|order(order asc){..., "slug": slug.current, image${IMG}, cta${LINK}}`);
  return d && d.length ? d : seed.experiences;
}

export async function getServices(): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="service"]|order(order asc)`);
  return d && d.length ? d : seed.services;
}

export async function getValues(): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="value"]|order(order asc)`);
  return d && d.length ? d : seed.values;
}

export async function getGallery(): Promise<{ items: any[]; categories: string[] }> {
  const d = await q<any[]>(`*[_type=="galleryItem"]|order(order asc){..., image${IMG}}`);
  const items = d && d.length ? d : seed.gallery;
  const categories = Array.from(new Set<string>([...seed.galleryCategories, ...items.map((i: any) => i.category)])).filter((c) =>
    items.some((i: any) => i.category === c),
  );
  return { items, categories };
}

export async function getPosts(limit?: number): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="journalPost"]|order(publishedAt desc, _createdAt desc){..., "slug": slug.current, image${IMG}}`);
  const list = d && d.length ? d : seed.posts;
  return limit ? list.slice(0, limit) : list;
}

export async function getPost(slug: string) {
  const d = await q(`*[_type=="journalPost" && slug.current==$slug][0]{..., "slug": slug.current, image${IMG}}`, { slug });
  if (d) return d;
  return seed.posts.find((p: any) => p.slug === slug) ?? null;
}

export async function getTestimonials(): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="testimonial"]|order(order asc)`);
  return d && d.length ? d : seed.testimonials;
}

export async function getFaqs(): Promise<any[]> {
  const d = await q<any[]>(`*[_type=="faq"]|order(order asc)`);
  return d && d.length ? d : seed.faqs;
}
