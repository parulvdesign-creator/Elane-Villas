# Élané Villas — Next.js + Sanity

Luxury villas & hospitality website. **Next.js 16** (App Router, TypeScript) with content managed in **Sanity**.
The site looks identical to the earlier static version (`../elane-villas`) — now every piece of copy, every image and every villa can be edited in a CMS.

```
npm install
npm run dev          → http://localhost:3000        (site)
                       http://localhost:3000/studio (content editor — after connecting Sanity)
npm run build && npm start     production
```

Out of the box the site runs on **built-in sample content** (`data/seed.ts` = the approved copy), so nothing is blank before Sanity is connected.
Whatever you publish in Sanity overrides that copy field by field.

---

## Connect Sanity (about 5 minutes)

1. **Create a project** at <https://www.sanity.io/manage> → *Create project* (free plan is fine). Dataset name: `production`. Copy the **Project ID**.
2. **Add it to the site.** Copy `.env.example` to `.env.local` and set:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. **Allow the site to talk to Sanity.** In *Manage → API → CORS origins* add `http://localhost:3000` (and your live domain later) with **credentials allowed**.
4. **(Recommended) Fill the CMS with the current copy:**
   in *Manage → API → Tokens* create a token with **Editor** rights, put it in `.env.local` as `SANITY_API_WRITE_TOKEN=…`, then run
   ```
   npm run seed
   ```
   (`npm run seed:dry` shows what would be created without writing anything.)
5. `npm run dev` → open **/studio**, sign in, and edit. Changes appear on the site within ~60 seconds (instantly if you add the webhook below).

## What you can edit in the Studio

| Studio section | Controls |
|---|---|
| **Site settings** | Logo, menu, footer (headline, links, social, background image), closing call-to-action, contact emails |
| **Home page** | Every section of the home page: hero, intro, hospitality cards, experiences list, dining, design, destination banner, headings |
| **Other pages** | Hero text + image for Villas, Experiences, Hospitality, About, Gallery, Journal, Contact, FAQ |
| **Villas** | Add/remove villas. Name, type, guests, pool, taglines, images, highlights, spaces, inclusions, optional extras. A villa with *highlights* gets the full page; others get the compact page |
| **Experiences / Hospitality services / Brand values** | The cards on those pages |
| **Gallery** | Upload images, pick a category and tile shape |
| **Journal stories** | Real articles (rich text + images) at `/journal/your-slug` |
| **Testimonials, FAQ** | Quotes on the home page; FAQ page (also adds Google FAQ markup) |
| **Enquiries / Newsletter subscribers** | Submissions from the website forms (see below) |

**Images:** upload in the Studio and use the **hotspot** to choose what stays visible when the image is cropped on different screens.
Until an image is uploaded the slot shows a labelled placeholder. You can also drop a file into `public/photos/<slot-name>.jpg` (the placeholder shows the exact filename) — a Studio image always wins over a file.

## Forms

* **Enquiry form** (`/contact`) → `POST /api/enquiry`. Saved as an *Enquiry* in Sanity when `SANITY_API_WRITE_TOKEN` is set; also emailed if you set the Resend variables (`RESEND_API_KEY`, `ENQUIRY_FROM`, `ENQUIRY_TO`). With neither configured it just logs to the server console (fine for development).
* **Newsletter** (footer) → `POST /api/newsletter` → saved as a *Newsletter subscriber* (de-duplicated by email).
* The home hero's **"Find your villa"** panel pre-fills the contact form (villa, arrival, guests).

## Instant updates (optional)

*Manage → API → Webhooks → Create*: URL `https://YOUR-SITE/api/revalidate?secret=YOUR_SECRET`, method POST, trigger on create/update/delete.
Set `SANITY_REVALIDATE_SECRET=YOUR_SECRET` in the site's environment variables.

## Deploy

Works on Vercel (recommended), Netlify or any Node host. On Vercel: import the folder, add the same variables as `.env.local`, deploy, then add the live URL to Sanity **CORS origins** (and set `NEXT_PUBLIC_SITE_URL`).

## Project map

```
app/(site)/…          pages: / · /villas · /villas/[slug] · /experiences · /hospitality · /about
                      /gallery · /journal · /journal/[slug] · /contact · /faq
app/(studio)/studio   Sanity Studio embedded at /studio
app/api/…             enquiry · newsletter · revalidate
components/           Header, Footer, Hero, Ph (image slot), forms, gallery, …
lib/content.ts        loads from Sanity, falls back to the built-in copy
lib/sanity.ts         client + image URL helper (hotspot aware)
sanity/schemaTypes    the content model (what editors see)
sanity.config.ts      Studio setup (menu structure, singletons)
data/seed.ts          built-in sample content = approved copy
app/globals.css       all styling (design tokens at the top)
```

## Notes

* Sanity being down or misconfigured never breaks the site — it falls back to the built-in copy (a warning is logged).
* Social links in the footer and the Privacy/Terms links are placeholders (`#`) until you edit them in *Site settings*.
* Fonts (Cormorant Garamond, Inter) are self-hosted by `next/font` at build time.
* Email addresses are the placeholders from the copy deck — change them in *Site settings*.
