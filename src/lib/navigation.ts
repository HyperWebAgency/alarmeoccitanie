import { ClipboardList, Fingerprint, type LucideIcon } from "lucide-react";

// Every "devis" button (Obtenir mon devis, Demander un devis gratuit…) leads to the contact page.
export const quoteHref = "/contact";

// Pages (and homepage sections) that exist. Links to anything else are hidden everywhere (menu, mobile menu,
// footer) until the page is created: add its path here and its links reappear automatically.
export const livePaths = new Set([
  "/",
  "/#devis",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
  "/conditions-generales",
]);

export const isLive = (href: string) => livePaths.has(href);

// An icon is either a Lucide component or the path of one of our own SVGs (public/images/icons).
export type NavIcon = LucideIcon | string;

// Services menu. URLs are the planned pages — adjust as each page is created.
export const serviceLinks: { href: string; label: string; description: string; icon: NavIcon }[] = [
  {
    href: "/installation-videosurveillance-montpellier",
    label: "Vidéosurveillance",
    description: "Caméras HD et 4K, vision de nuit et accès à distance sur smartphone pour surveiller vos biens.",
    icon: "/images/icons/videosurveillance.svg",
  },
  {
    href: "/installation-alarme-montpellier",
    label: "Alarme intrusion",
    description: "Alarmes sans fil, détecteurs et sirène : vous êtes alerté dès la moindre intrusion, sans abonnement obligatoire.",
    icon: "/images/icons/alarme-intrusion.svg",
  },
  {
    href: "/installation-interphone-visiophone-montpellier",
    label: "Interphone & visiophone",
    description: "Voyez et parlez à vos visiteurs, et ouvrez votre portail à distance depuis votre téléphone.",
    icon: "/images/icons/interphone-visiophone.svg",
  },
  {
    href: "/controle-acces-montpellier",
    label: "Contrôle d'accès",
    description: "Badges, claviers à code et lecteurs biométriques pour gérer qui entre dans vos locaux, et quand.",
    icon: Fingerprint,
  },
  {
    href: "/electricien-montpellier",
    label: "Électricité",
    description: "Travaux électriques, câblage réseau et mise aux normes réalisés par nos techniciens.",
    icon: "/images/icons/electricite.svg",
  },
  {
    href: "/maintenance-depannage-securite-montpellier",
    label: "Maintenance & dépannage",
    description: "Entretien régulier et intervention rapide pour que vos équipements fonctionnent toujours.",
    icon: "/images/icons/maintenance-depannage.svg",
  },
];

export const offerLinks: { href: string; label: string; icon: NavIcon }[] = [
  { href: "/particuliers", label: "Particuliers", icon: "/images/icons/particulier.svg" },
  { href: "/professionnels", label: "Professionnels", icon: "/images/icons/professionnel.svg" },
  { href: quoteHref, label: "Devis personnalisé", icon: ClipboardList },
];

export const mainLinks = [
  { href: "/#expertise", label: "Expertise" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/contact", label: "Contact" },
] as const;
