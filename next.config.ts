import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let the dev server's JS load when the site is opened via 127.0.0.1
  // or the local network IP (e.g. testing on a phone). Without this, buttons do nothing there.
  // Home networks are usually 192.168.x.x, some others 10.x.x.x.
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*", "10.*.*.*"],

  // Security headers on every response. None of them changes what crawlers see.
  // - Anti-clickjacking: no other website may show our pages inside an iframe.
  //   frame-ancestors is the modern rule; X-Frame-Options covers older browsers.
  //   Only affects framing — Google Ads/Analytics and our own Google Maps embed are unaffected.
  // - nosniff: browsers trust the declared file type instead of guessing it.
  // - Referrer-Policy: other sites only see "alarmeoccitanie.fr" as the referrer, never the full page URL
  //   (also never sent from HTTPS to HTTP). Analytics still gets the full URL of our own pages.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
