import Script from "next/script";
import { site } from "@/lib/site";

// Google tag (gtag.js), loaded after the page is interactive so it doesn't slow the first render.
// Production builds only: visits from `next dev` stay out of the stats.
// Page changes inside the site are tracked by GA4's enhanced measurement (browser history events).
export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
      </Script>
    </>
  );
}
