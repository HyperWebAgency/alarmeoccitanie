// Single source of truth for business facts (NAP, hours, rating…).
// Must match the Google Business Profile exactly — change it here only.

export const site = {
  name: "Alarme Occitanie",
  url: "https://alarmeoccitanie.fr",
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

  // Profiles to add as soon as they exist under the new name (GMB, PagesJaunes, réseaux…).
  sameAs: [
    "https://www.google.com/search?kgmid=/g/11wwz07gnr", // Google Business Profile (from https://share.google/agoC2sAPGnwAFctnr)
    "https://www.pagesjaunes.fr/pros/64014443",
  ] as string[],
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

