import { defineArrayMember, defineField, defineType } from "sanity";

/* ───────── reusable field builders ───────── */
export const ICONS = ["car", "key", "chef", "concierge", "bed", "guests", "pool", "ocean", "clean", "dining", "sunset", "wifi", "lotus", "boat", "compass", "toast", "linen", "bottle", "cup"];

const link = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "label", title: "Label", type: "string" }),
      defineField({ name: "href", title: "Link", type: "string", description: "Page path like /villas or /contact, or a full https:// link." }),
    ],
  });

const image = (name = "image", title = "Image") =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    description: "Use the hotspot to choose what stays visible when the image is cropped.",
    fields: [defineField({ name: "alt", title: "Alt text", type: "string", description: "Short description for screen readers." })],
  });

const strings = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "array", of: [defineArrayMember({ type: "string" })], description });

const heading = (prefix = "") => [
  defineField({ name: `${prefix}title`, title: "Heading", type: "string" }),
  defineField({ name: `${prefix}titleEm`, title: "Heading — italic part", type: "string", description: "Shown in italics after the heading." }),
];

const order = defineField({ name: "order", title: "Order", type: "number", description: "Lower numbers appear first." });
const icon = defineField({ name: "icon", title: "Icon", type: "string", options: { list: ICONS } });

const section = (name: string, title: string, fields: any[]) =>
  defineField({ name, title, type: "object", options: { collapsible: true, collapsed: true }, fields });

/* ───────── singletons ───────── */
const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string" }),
    defineField({ name: "brand", title: "Logo text", type: "string" }),
    defineField({ name: "brandSuffix", title: "Logo small text", type: "string" }),
    defineField({ name: "reservationsEmail", title: "Reservations email", type: "string" }),
    defineField({ name: "conciergeEmail", title: "Concierge email", type: "string" }),
    defineField({
      name: "nav",
      title: "Main menu",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } })],
    }),
    link("navCta", "Menu button"),
    defineField({ name: "finderTitle", title: "Home 'find your villa' panel title", type: "string" }),
    section("footer", "Footer", [
      link("chip", "Pill above headline"),
      strings("headline", "Headline lines", "One line per item."),
      defineField({ name: "newsletterTitle", title: "Newsletter title", type: "string" }),
      defineField({ name: "newsletterText", title: "Newsletter text", type: "string" }),
      defineField({
        name: "columns",
        title: "Link columns",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "title", type: "string" }),
              defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } })] }),
            ],
            preview: { select: { title: "title" } },
          }),
        ],
      }),
      defineField({
        name: "social",
        title: "Social links",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [defineField({ name: "platform", type: "string", options: { list: ["instagram", "pinterest", "facebook", "youtube"] } }), defineField({ name: "url", type: "url" })],
            preview: { select: { title: "platform", subtitle: "url" } },
          }),
        ],
      }),
      defineField({ name: "copyright", title: "Copyright line", type: "string" }),
      defineField({ name: "legal", title: "Legal links", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", type: "string" }), defineField({ name: "href", type: "string" })], preview: { select: { title: "label", subtitle: "href" } } })] }),
      image("image", "Footer background image"),
    ]),
    section("cta", "Closing call-to-action (bottom of most pages)", [
      defineField({ name: "eyebrow", type: "string" }),
      ...heading(),
      defineField({ name: "lead", title: "Lead line", type: "string" }),
      defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
      link("primary", "Primary button"),
      link("secondary", "Secondary button"),
    ]),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

const eyebrowTitle = (extra: any[] = []) => [defineField({ name: "eyebrow", title: "Small label", type: "string" }), ...heading(), ...extra];

const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "Browser/search title", type: "string" }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3 }),
    section("hero", "Hero", [
      ...heading(),
      defineField({ name: "sub", title: "Sub-headline", type: "string" }),
      defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
      link("primary", "Primary button"),
      link("secondary", "Secondary button"),
      image("image", "Hero image"),
    ]),
    section("intro", "Introduction", [
      ...eyebrowTitle([strings("paragraphs", "Paragraphs"), link("cta", "Button"), image("image", "Image")]),
    ]),
    section("villas", "Villas section", [...eyebrowTitle([defineField({ name: "text", type: "text", rows: 3 }), link("cta", "Button")])]),
    section("hospitality", "Hospitality", [
      ...eyebrowTitle([
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "items", title: "Cards", type: "array", of: [defineArrayMember({ type: "object", fields: [icon, defineField({ name: "title", type: "string" })], preview: { select: { title: "title", subtitle: "icon" } } })] }),
      ]),
    ]),
    section("experiences", "Experiences list", [
      ...eyebrowTitle([
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "items", title: "Experiences", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), image()], preview: { select: { title: "title", media: "image" } } })] }),
        link("cta", "Button"),
      ]),
    ]),
    section("dining", "Dining", [...eyebrowTitle([defineField({ name: "lead", type: "text", rows: 2 }), defineField({ name: "text", type: "text", rows: 4 }), link("cta", "Button"), image()])]),
    section("design", "Design", [...eyebrowTitle([defineField({ name: "text", type: "text", rows: 4 }), image()])]),
    section("destination", "Destination banner", [...eyebrowTitle([defineField({ name: "lead", type: "text", rows: 2 }), defineField({ name: "text", type: "text", rows: 3 }), link("cta", "Button"), image()])]),
    section("testimonials", "Testimonials heading", [...eyebrowTitle()]),
    section("journal", "Journal heading", [...eyebrowTitle([defineField({ name: "text", type: "text", rows: 3 }), link("cta", "Button")])]),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

/* ───────── pages ───────── */
const pageContent = defineType({
  name: "pageContent",
  title: "Page content",
  type: "document",
  fields: [
    defineField({ name: "key", title: "Page", type: "string", validation: (r) => r.required(), options: { list: ["villas", "experiences", "hospitality", "about", "gallery", "journal", "contact", "faq"] } }),
    defineField({ name: "eyebrow", title: "Small label", type: "string" }),
    ...heading(),
    defineField({ name: "sub", title: "Sub-headline", type: "string" }),
    defineField({ name: "text", title: "Intro text", type: "text", rows: 3 }),
    image("heroImage", "Hero image"),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3 }),
    defineField({ name: "introEyebrow", title: "Second block — small label", type: "string", description: "Used by Hospitality, About and Contact." }),
    defineField({ name: "introLead", title: "Second block — lead line (About)", type: "string" }),
    ...heading("intro"),
    defineField({ name: "introTitleAfter", title: "Second block — text after italic (About)", type: "string" }),
    strings("introParagraphs", "Second block — paragraphs"),
    defineField({ name: "secondaryEyebrow", title: "Third block — small label", type: "string" }),
    ...heading("secondary"),
    image("image", "Supporting image"),
    image("image2", "Supporting image 2 (About)"),
  ],
  preview: { select: { title: "key", subtitle: "title" } },
});

/* ───────── collections ───────── */
const villa = defineType({
  name: "villa",
  title: "Villa",
  type: "document",
  groups: [{ name: "basics", title: "Basics", default: true }, { name: "images", title: "Images" }, { name: "details", title: "Full page details" }],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "basics", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", group: "basics", options: { source: "name", maxLength: 60 }, validation: (r) => r.required() }),
    order,
    defineField({ name: "type", title: "Type", type: "string", group: "basics", description: "e.g. Oceanfront residence" }),
    defineField({ name: "guests", title: "Guests", type: "number", group: "basics" }),
    defineField({ name: "pool", title: "Pool", type: "string", group: "basics", description: "e.g. Private Pool, Infinity Pool" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "basics" }),
    defineField({ name: "description", title: "Short description (villas list)", type: "text", rows: 3, group: "basics" }),
    defineField({ name: "homeDescription", title: "Home-page description", type: "text", rows: 3, group: "basics" }),
    defineField({ name: "heroSub", title: "Page hero — sub-headline", type: "string", group: "basics" }),
    defineField({ name: "heroText", title: "Page hero — text", type: "text", rows: 2, group: "basics" }),
    { ...image("image", "Main image (list + fallback)"), group: "images" },
    { ...image("homeImage", "Home-page card image"), group: "images" },
    { ...image("heroImage", "Page hero image"), group: "images" },
    { ...image("overviewImage", "Overview image"), group: "images" },
    {
      ...section("overview", "Overview", [...heading(), strings("paragraphs", "Paragraphs")]),
      group: "details",
    },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "object", fields: [icon, defineField({ name: "label", type: "string" })], preview: { select: { title: "label", subtitle: "icon" } } })],
    },
    {
      name: "spaces",
      title: "The spaces",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text", rows: 3 }), image()], preview: { select: { title: "title", media: "image" } } })],
    },
    { ...strings("includes", "Your stay includes"), group: "details" },
    { ...strings("optional", "Optional experiences"), group: "details" },
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "type", media: "image" } },
});

const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", description: "e.g. 01 — Private Dining" }),
    ...heading(),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "anchor", title: "Anchor id", type: "string", description: "Optional. e.g. dining → /experiences#dining" }),
    strings("paragraphs", "Paragraphs"),
    link("cta", "Button (optional)"),
    image(),
    order,
  ],
  preview: { select: { title: "title", subtitle: "label", media: "image" } },
});

const service = defineType({
  name: "service",
  title: "Hospitality service",
  type: "document",
  fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text", rows: 2 }), icon, order],
  preview: { select: { title: "title", subtitle: "description" } },
});

const value = defineType({
  name: "value",
  title: "Brand value",
  type: "document",
  fields: [defineField({ name: "title", type: "string" }), defineField({ name: "description", type: "text", rows: 2 }), order],
  preview: { select: { title: "title", subtitle: "description" } },
});

const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery image",
  type: "document",
  fields: [
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "category", type: "string", options: { list: ["Villas", "Interiors", "Pools", "Dining", "Experiences", "Destinations", "Moments"] } }),
    defineField({ name: "ratio", title: "Tile shape", type: "string", options: { list: ["4/3", "3/4", "4/5", "16/10", "1/1"] }, initialValue: "4/3" }),
    image(),
    order,
  ],
  preview: { select: { title: "caption", subtitle: "category", media: "image" } },
});

const journalPost = defineType({
  name: "journalPost",
  title: "Journal story",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (r) => r.required() }),
    defineField({ name: "kicker", title: "Category label", type: "string" }),
    defineField({ name: "publishedAt", title: "Published", type: "datetime" }),
    defineField({ name: "excerpt", title: "Short summary", type: "text", rows: 3 }),
    image(),
    defineField({
      name: "body",
      title: "Story",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "kicker", media: "image" } },
});

const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [defineField({ name: "quote", type: "text", rows: 3 }), defineField({ name: "author", type: "string", description: "Optional, e.g. Sophia M., London" }), order],
  preview: { select: { title: "quote", subtitle: "author" } },
});

const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [defineField({ name: "question", type: "string" }), defineField({ name: "answer", type: "text", rows: 3 }), order],
  preview: { select: { title: "question" } },
});

/* ───────── form submissions (created by the website) ───────── */
const enquiry = defineType({
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({ name: "status", type: "string", options: { list: ["new", "replied", "archived"] }, initialValue: "new" }),
    defineField({ name: "firstName", type: "string", readOnly: true }),
    defineField({ name: "lastName", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "villa", type: "string", readOnly: true }),
    defineField({ name: "arrival", type: "string", readOnly: true }),
    defineField({ name: "departure", type: "string", readOnly: true }),
    defineField({ name: "guests", type: "number", readOnly: true }),
    defineField({ name: "requests", type: "text", readOnly: true }),
    defineField({ name: "receivedAt", type: "datetime", readOnly: true }),
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "receivedAt", direction: "desc" }] }],
  preview: { select: { first: "firstName", last: "lastName", subtitle: "arrival", status: "status" }, prepare: ({ first, last, subtitle, status }) => ({ title: `${first ?? ""} ${last ?? ""}`.trim(), subtitle: `${status ?? ""} · ${subtitle ?? ""}` }) },
});

const subscriber = defineType({
  name: "subscriber",
  title: "Newsletter subscriber",
  type: "document",
  fields: [defineField({ name: "email", type: "string", readOnly: true }), defineField({ name: "subscribedAt", type: "datetime", readOnly: true })],
  preview: { select: { title: "email", subtitle: "subscribedAt" } },
});

export const schemaTypes = [siteSettings, homePage, pageContent, villa, experience, service, value, galleryItem, journalPost, testimonial, faq, enquiry, subscriber];
export const singletons = ["siteSettings", "homePage"];
