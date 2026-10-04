import type { Metadata } from "next";
import { site } from "./site";

// Full metadata for a page. Page-level openGraph replaces the layout's one
// entirely, so every page goes through here to keep siteName/locale.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
