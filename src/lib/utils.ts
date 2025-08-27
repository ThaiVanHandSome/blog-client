import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert a string to a URL-safe slug (lowercase, hyphenated)
export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Create a slug of the form: `${slugifiedTitle}-${id}`
export function buildBlogSlug(title: string, id: string): string {
  const base = slugify(title || "blog");
  return `${base}-${id}`;
}

// Extract the id (suffix after the last hyphen) from a slug
export function extractIdFromSlug(slug: string): string | null {
  if (!slug) return null;
  const lastDash = slug.lastIndexOf("-");
  if (lastDash === -1 || lastDash === slug.length - 1) return null;
  return slug.slice(lastDash + 1);
}
