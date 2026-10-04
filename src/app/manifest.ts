import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.tagline,
    lang: "fr",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0e2238",
    icons: [
      { src: "/images/logo/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/logo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
