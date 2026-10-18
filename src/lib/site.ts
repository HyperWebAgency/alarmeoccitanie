// Single source of truth for business facts (NAP, hours, rating…).
// Must match the Google Business Profile exactly — change it here only.

export const site = {
  name: "Alarme Occitanie",
  // Canonical address: Vercel serves the site on www (alarmeoccitanie.fr redirects to it).
  url: "https://www.alarmeoccitanie.fr",
  locale: "fr_FR",
  tagline: "Installateur alarme et vidéosurveillance à Montpellier",

  phone: {
    display: "04 11 93 95 06",
    href: "tel:+33411939506",
    e164: "+33411939506",
  },
  email: "alarmeoccitanie@gmail.com",
  // Formspree endpoint used by every form on the site (see src/lib/formspree.ts).
  formspree: "https://formspree.io/f/xoejarog",
  // Google Analytics 4 measurement ID (loaded in src/components/seo/GoogleAnalytics.tsx).
  gaId: "G-NK4ZNQQEY9",

  address: {
    street: "1 Place Charles de Gaulle",
    postalCode: "34170",
    city: "Castelnau-le-Lez",
    region: "Occitanie",
    department: "Hérault",
    country: "FR",
  },
  // GMB pin — to confirm against the Google Business Profile.
  geo: { latitude: 43.6284, longitude: 3.8972 },

  hours: {
    display: [
      { days: "Lundi – Samedi", time: "8h00 – 18h30" },
      { days: "Dimanche", time: "8h00 – 17h00" },
    ],
    schema: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:30",
      },
      { dayOfWeek: ["Sunday"], opens: "08:00", closes: "17:00" },
    ],
  },

  // Shown visually only — never in JSON-LD (self-served ratings are ignored by Google).
  rating: { value: "5.0", count: "130" },
  // PagesJaunes listing (rating/count read from the listing on 2026-10-04).
  pagesJaunes: { url: "https://www.pagesjaunes.fr/pros/64014443", value: "5.0", count: "15" },

  legal: {
    siret: "917 897 555 00020",
    ape: "43.21A",
    // Decennial insurance (MAAF certificate of 9 April 2026). Update each year with the new certificate.
    insurance: {
      insurer: "MAAF Assurances SA",
      address: "Chaban, 79180 Chauray",
      contract: "184110047 T 001",
      period: "du 01/01/2026 au 31/12/2026",
      activities: "métier de l'électricité, installation d'alarmes",
      area: "France et Principauté de Monaco",
    },
  },

  // Google Business Profile, and the Google Maps itinerary to the address (links given by the client).
  google: {
    profile: "https://share.google/Db176xwTklg7ZGM43",
    // "Partager → Intégrer une carte" code of the listing: the map shows the Alarme Occitanie card (name, reviews).
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23103.175358830988!2d3.8788193767395005!3d43.62950434389959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x49ed7653702ef0fb%3A0xbca1b54e04fc474a!2sAlarme%20Occitanie!5e0!3m2!1sfr!2sfr!4v1791883745318!5m2!1sfr!2sfr",
    directions:
      "https://www.google.com/maps?sca_esv=26e82cfa4d2fadbc&biw=1920&bih=993&sxsrf=APpeQntoxB3hVCzYs9w1TSVA6QTAhlmO-w:1791731560034&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiDnpvem8gc2VjdXJpdMOpMgYQABgWGB4yBhAAGBYYHjICECYyAhAmMgUQABjvBTIFEAAY7wUyBRAAGO8FMggQABiABBiiBEjqCVC0BVi0BXABeAGQAQCYAaABoAGgAaoBAzAuMbgBA8gBAPgBAZgCAqACpwHCAhAQLhjHARivARiwAxiOBRgnwgIHECMYsAMYJ8ICChAAGEcY1gQYsAOYAwDiAwUSATEgQIgGAZAGB5IHAzEuMaAHmASyBwMwLjG4B6MBwgcDMC4yyAcEgAgB&um=1&ie=UTF-8&fb=1&gl=fr&sa=X&geocode=KfvwLnBTdu1JMUpH_AROtaG8&daddr=1+Pl.+Charles+de+Gaulle,+34170+Castelnau-le-Lez",
  },

  // Profiles to add as soon as they exist under the new name (GMB, PagesJaunes, réseaux…).
  sameAs: ["https://share.google/Db176xwTklg7ZGM43", "https://www.pagesjaunes.fr/pros/64014443"] as string[],
} as const;

export const services = [
  { value: "alarme", label: "Alarme anti-intrusion" },
  { value: "videosurveillance", label: "Vidéosurveillance" },
  { value: "interphone-visiophone", label: "Interphone / Visiophone" },
  { value: "controle-acces", label: "Contrôle d'accès" },
  { value: "electricite", label: "Électricité" },
  { value: "autre", label: "Autre demande" },
] as const;

export type ServiceValue = (typeof services)[number]["value"];

export const zones = [
  "Montpellier",
  "Castelnau-le-Lez",
  "Lattes",
  "Mauguio",
  "Saint-Jean-de-Védas",
  "Grabels",
  "Frontignan",
  "Sète",
  "Lunel",
  "Clermont-l'Hérault",
  "Béziers",
  "Nîmes",
] as const;

