import { site, zones } from "./site";

export const businessId = `${site.url}/#business`;
export const websiteId = `${site.url}/#website`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Electrician"],
    "@id": businessId,
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo/alarme-occitanie-logo.png`,
    description:
      "Installation d'alarmes, de vidéosurveillance, d'interphones, de contrôle d'accès et travaux d'électricité à Montpellier, dans l'Hérault et le Gard.",
    telephone: site.phone.e164,
    email: site.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      ...h,
    })),
    areaServed: zones.map((name) => ({ "@type": "City", name })),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    inLanguage: "fr-FR",
    publisher: { "@id": businessId },
  };
}
