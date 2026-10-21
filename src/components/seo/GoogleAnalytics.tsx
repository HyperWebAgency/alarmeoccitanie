import { site } from "@/lib/site";

// Google tag (gtag.js) for Google Analytics and Google Ads, written straight into <head> as Google asks, so its tag checker finds it in the HTML.
// `async`: it downloads in the background and doesn't slow the first render.
// Production builds only: visits from `next dev` stay out of the stats.
// gtag.js is loaded once; each product only needs its own `config` line.
// Page changes inside the site are tracked by GA4's enhanced measurement (browser history events).
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');
gtag('config', '${site.googleAdsId}');`,
        }}
      />
    </>
  );
}
