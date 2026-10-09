import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";
export const hasSanity = Boolean(projectId);

export const client = hasSanity ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;

const builder = hasSanity ? createImageUrlBuilder({ projectId, dataset }) : null;

/** Build a Sanity image URL (returns undefined when Sanity isn't connected or the image is empty). */
export function imageUrl(source: any, width = 1600, height?: number): string | undefined {
  if (!builder || !source?.asset) return undefined;
  let b = builder.image(source).width(width).auto("format").fit("crop");
  if (height) b = b.height(height);
  return b.url();
}

/** CSS object-position from the hotspot set in Sanity Studio. */
export function hotspotPosition(source: any): string | undefined {
  const h = source?.hotspot;
  return h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : undefined;
}
