import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedRealisations, realisationHref } from "@/lib/realisations";

// Add every new indexable page here (services, villes…).
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/contact", priority: 0.8 },
  { path: "/mentions-legales", priority: 0.3 },
  { path: "/politique-confidentialite", priority: 0.3 },
  { path: "/conditions-generales", priority: 0.3 },
  ...publishedRealisations.map((r) => ({ path: realisationHref(r.slug), priority: 0.6 })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
