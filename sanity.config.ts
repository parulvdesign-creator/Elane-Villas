"use client";

/**
 * Sanity Studio configuration — mounted inside the website at /studio.
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID (see README.md).
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletons } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "elane",
  title: "Élané Villas",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site settings").id("siteSettings").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem().title("Home page").id("homePage").child(S.document().schemaType("homePage").documentId("homePage")),
            S.documentTypeListItem("pageContent").title("Other pages"),
            S.divider(),
            S.documentTypeListItem("villa").title("Villas"),
            S.documentTypeListItem("experience").title("Experiences"),
            S.documentTypeListItem("service").title("Hospitality services"),
            S.documentTypeListItem("value").title("Brand values"),
            S.documentTypeListItem("galleryItem").title("Gallery"),
            S.documentTypeListItem("journalPost").title("Journal stories"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("faq").title("FAQ"),
            S.divider(),
            S.documentTypeListItem("enquiry").title("Enquiries"),
            S.documentTypeListItem("subscriber").title("Newsletter subscribers"),
          ]),
    }),
    visionTool({ defaultApiVersion: "2025-01-01" }),
  ],
  document: {
    actions: (prev, { schemaType }) => (singletons.includes(schemaType) ? prev.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action)) : prev),
  },
});
