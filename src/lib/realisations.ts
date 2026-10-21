// Client projects ("Nos dernières réalisations" on the homepage + one page per project).
// To publish a new project: add an entry here with its photos in public/images/realisations/.
// Projects with a `page` get their own page at /realisations/<slug> (and their homepage card links to it).

import type { FaqItem } from "./faq";

export type Photo = { src: string; alt: string; width: number; height: number };

export type Brand = { name: string; logo?: { src: string; width: number; height: number } };

export type Realisation = {
  slug: string;
  // Kept for later but not shown anywhere (homepage card, page, sitemap).
  hidden?: boolean;
  title: string;
  tags: string[];
  year: string;
  city: string;
  location: string;
  // Cover photo: the homepage card image and the first photo of the page.
  image: Photo;
  // Which part of the cover the homepage card shows (CSS object-position), when the centre isn't right.
  coverPosition?: string;
  page?: {
    metaTitle: string;
    metaDescription: string;
    client: string;
    intro: string;
    besoin: string;
    intervention: string[];
    brands: Brand[];
    // Extra photos shown under the cover in "Photos du chantier".
    photos: Photo[];
    // Questions about this project (accordion + FAQPage JSON-LD on its page). Facts from this project only.
    faq?: FaqItem[];
  };
};

const brands = {
  hikvision: { name: "Hikvision", logo: { src: "/images/brands/hikvision.webp", width: 320, height: 63 } },
  dahua: { name: "Dahua", logo: { src: "/images/brands/dahua.webp", width: 262, height: 80 } },
  ajax: { name: "Ajax", logo: { src: "/images/brands/ajax.webp", width: 320, height: 71 } },
} satisfies Record<string, Brand>;

const allRealisations: Realisation[] = [
  {
    slug: "installation-cameras-hikvision-alarme-ajax-prades-le-lez",
    title: "2 caméras Hikvision et alarme Ajax pour une maison à Prades-le-Lez",
    tags: ["Vidéosurveillance", "Alarme"],
    year: "2026",
    city: "Prades-le-Lez",
    location: "Prades-le-Lez (34 - Hérault)",
    image: {
      src: "/images/realisations/installation-cameras-hikvision-alarme-ajax-prades-le-lez/installation-camera-surveillance-hikvision-alarme-somfy-prades-le-lez.webp",
      alt: "Caméra de surveillance Hikvision noire installée sous l'avant-toit d'une maison à Prades-le-Lez (34 - Hérault), avec remplacement de l'alarme Somfy par une alarme Ajax",
      width: 960,
      height: 1280,
    },
    page: {
      metaTitle: "Installation vidéosurveillance et alarme à Prades-le-Lez | Alarme Occitanie",
      metaDescription:
        "Réalisation à Prades-le-Lez (34) : remplacement d'une alarme Somfy par un système Ajax et pose de 2 caméras de surveillance Hikvision noires chez un particulier.",
      client: "Particulier",
      intro:
        "Installation de vidéosurveillance Hikvision et remplacement d'une ancienne alarme Somfy hors service par un système Ajax, chez un particulier à Prades-le-Lez. Tous les points d'entrée de la maison sont désormais sécurisés, et l'extérieur est protégé par 2 caméras Hikvision noires, choisies par le client, et des détecteurs extérieurs.",
      besoin:
        "Le client souhaitait moderniser son système de sécurité en remplaçant son ancienne alarme Somfy et en installant un système de vidéosurveillance pour assurer la protection des espaces extérieurs de son habitation. Pour une intégration esthétique et discrète, il avait également exprimé une préférence pour des caméras de couleur noire.",
      intervention: [
        "Remplacement de l'ancienne alarme Somfy par un système d'alarme Ajax.",
        "Pose de 2 caméras de surveillance Hikvision en extérieur, de couleur noire, demandée par le client.",
        "Mise en service et prise en main de l'installation avec le client.",
      ],
      faq: [
        {
          question: "Peut-on remplacer une ancienne alarme qui ne fonctionne plus ?",
          answer:
            "Oui. À Prades-le-Lez, l'ancienne alarme Somfy du client était hors service : nous l'avons remplacée par un système d'alarme Ajax, qui sécurise désormais tous les points d'entrée de la maison.",
        },
        {
          question: "Peut-on choisir la couleur des caméras de surveillance ?",
          answer:
            "Oui, selon les modèles. Ici, le client souhaitait des caméras noires pour une intégration plus esthétique et discrète : nous avons posé 2 caméras de surveillance Hikvision de couleur noire.",
        },
        {
          question: "Comment l'extérieur de la maison est-il protégé ?",
          answer:
            "Par les 2 caméras de surveillance Hikvision, ainsi que par des détecteurs extérieurs et une sirène extérieure reliés à la nouvelle alarme Ajax.",
        },
      ],
      brands: [brands.hikvision, brands.ajax],
      photos: [
        {
          src: "/images/realisations/installation-cameras-hikvision-alarme-ajax-prades-le-lez/camera-hikvision-noire-mur-pierre-prades-le-lez.webp",
          alt: "Caméra de surveillance Hikvision noire fixée sur un mur en parement pierre, à l'extérieur d'une maison à Prades-le-Lez",
          width: 1200,
          height: 1600,
        },
        {
          src: "/images/realisations/installation-cameras-hikvision-alarme-ajax-prades-le-lez/detecteur-exterieur-ajax-maison-prades-le-lez.webp",
          alt: "Détecteur de mouvement extérieur Ajax blanc posé dans l'angle d'une terrasse couverte, sous le plafond en bois, à Prades-le-Lez",
          width: 1200,
          height: 1600,
        },
        {
          src: "/images/realisations/installation-cameras-hikvision-alarme-ajax-prades-le-lez/sirene-exterieure-ajax-prades-le-lez.webp",
          alt: "Sirène extérieure Ajax installée sur la façade d'une maison à Prades-le-Lez, reliée à la nouvelle alarme Ajax",
          width: 1200,
          height: 1600,
        },
      ],
    },
  },
  {
    slug: "installation-videosurveillance-residence-montpellier",
    title: "4 caméras dont 2 à double objectif pour une résidence à Montpellier",
    tags: ["Vidéosurveillance"],
    year: "2026",
    city: "Montpellier",
    location: "Montpellier (34 - Hérault)",
    image: {
      src: "/images/realisations/installation-videosurveillance-residence-montpellier/camera-double-objectif-dahua-parking-residence-montpellier.webp",
      alt: "Caméra de surveillance Dahua à double objectif fixée au plafond du parking souterrain d'une résidence à Montpellier",
      width: 1087,
      height: 1447,
    },
    coverPosition: "center 35%",
    page: {
      metaTitle: "Installation vidéosurveillance résidence à Montpellier | Alarme Occitanie",
      metaDescription:
        "Réalisation à Montpellier : 4 caméras de surveillance, dont 2 caméras Dahua à double objectif, pour couvrir toute une résidence avec moins de matériel et un budget maîtrisé.",
      client: "Copropriété",
      intro:
        "Installation de vidéosurveillance pour une résidence à Montpellier : 4 caméras de surveillance, dont 2 caméras Dahua à double objectif, couvrent toutes les surfaces à surveiller, là où 6 caméras classiques auraient été nécessaires.",
      besoin:
        "La copropriété souhaitait sécuriser les parties communes de la résidence, dont le parking souterrain, en couvrant toutes les zones nécessaires tout en respectant son budget.",
      intervention: [
        "Étude de la couverture : 6 caméras classiques étaient prévues au départ pour surveiller toutes les zones.",
        "Choix de 2 caméras Dahua à double objectif, qui filment chacune deux directions à la fois : 4 caméras suffisent au lieu de 6.",
        "Moins de matériel et moins de main-d'œuvre, pour un coût réduit qui respecte le budget du client.",
        "Pose des 4 caméras et du coffret technique, puis mise en service : toutes les surfaces prévues sont couvertes.",
      ],
      faq: [
        {
          question: "Qu'est-ce qu'une caméra à double objectif ?",
          answer:
            "C'est une caméra équipée de deux objectifs qui filment chacun une direction différente. Une seule caméra couvre ainsi deux zones, là où il en faudrait sinon deux.",
        },
        {
          question: "Comment réduire le coût d'une installation de vidéosurveillance en copropriété ?",
          answer:
            "En adaptant le matériel au lieu. Dans cette résidence de Montpellier, 6 caméras classiques étaient prévues ; grâce à 2 caméras à double objectif, 4 caméras ont suffi, avec moins de matériel et moins de main-d'œuvre, pour respecter le budget de la copropriété.",
        },
        {
          question: "Toutes les zones sont-elles bien couvertes avec seulement 4 caméras ?",
          answer:
            "Oui. Les 2 caméras à double objectif filment chacune deux directions : les 4 caméras couvrent toutes les surfaces que la copropriété souhaitait surveiller, dont le parking souterrain.",
        },
      ],
      brands: [brands.dahua],
      photos: [
        {
          src: "/images/realisations/installation-videosurveillance-residence-montpellier/camera-dome-parking-souterrain-residence-montpellier.webp",
          alt: "Caméra dôme de vidéosurveillance fixée sur un mur en béton du parking souterrain d'une résidence à Montpellier",
          width: 1200,
          height: 1600,
        },
        {
          src: "/images/realisations/installation-videosurveillance-residence-montpellier/coffret-technique-videosurveillance-residence-montpellier.webp",
          alt: "Coffret technique de l'installation de vidéosurveillance, fixé au mur dans les parties communes d'une résidence à Montpellier",
          width: 1086,
          height: 1448,
        },
      ],
    },
  },
  {
    slug: "installation-camera-alarme-maison-mauguio",
    hidden: true,
    title: "Installation caméra de surveillance et alarme Ajax pour particulier à Mauguio",
    tags: ["Vidéosurveillance", "Alarme"],
    year: "2026",
    city: "Mauguio",
    location: "Mauguio (34 - Hérault)",
    image: {
      src: "/images/realisations/installation-camera-dahua-alarme-ajax-maison-mauguio.webp",
      alt: "Installation caméra de surveillance Dahua et alarme Ajax pour une maison de particulier à Mauguio (Hérault)",
      width: 960,
      height: 1280,
    },
  },
  {
    slug: "installation-8-cameras-surveillance-villa-anduze",
    title: "8 caméras de surveillance à détection humaine pour une villa à Anduze",
    tags: ["Vidéosurveillance"],
    year: "2026",
    city: "Anduze",
    location: "Anduze (30 - Gard)",
    image: {
      src: "/images/realisations/installation-8-cameras-surveillance-villa-anduze/installation-8-cameras-surveillance-villa-anduze.webp",
      alt: "Caméra de surveillance Dahua avec détection humaine, flash et sirène, installée sur une villa à Anduze (Gard)",
      width: 960,
      height: 1280,
    },
    page: {
      metaTitle: "8 caméras Dahua avec détection humaine à Anduze | Alarme Occitanie",
      metaDescription:
        "Réalisation à Anduze (30) : 8 caméras de surveillance Dahua avec détection humaine, flash et sirène intégrés, couplées à l'alarme Ajax déjà en place dans une villa.",
      client: "Particulier",
      intro:
        "Installation de vidéosurveillance à Anduze : 8 caméras de surveillance Dahua avec détection humaine intelligente, flash lumineux et sirène intégrés, couplées au système d'alarme Ajax déjà en place dans cette villa. Toute présence humaine aux abords de la propriété est détectée et l'intrus est dissuadé immédiatement.",
      besoin:
        "Le propriétaire de cette villa, déjà équipé d'une alarme Ajax, souhaitait compléter sa protection avec un système de vidéosurveillance capable de repérer une présence humaine et de dissuader les intrus avant qu'ils n'atteignent la maison.",
      intervention: [
        "Pose de 8 caméras de surveillance Dahua autour de la villa.",
        "Détection humaine intelligente : les caméras distinguent une personne d'un animal ou d'un mouvement de végétation, pour limiter les fausses alertes.",
        "Flash lumineux et sirène intégrés aux caméras, déclenchés en cas d'intrusion pour faire fuir l'intrus.",
        "Couplage des caméras avec le système d'alarme Ajax déjà installé chez le client.",
        "Mise en service et prise en main de l'installation avec le client.",
      ],
      faq: [
        {
          question: "Qu'est-ce que la détection humaine sur une caméra de surveillance ?",
          answer:
            "C'est une fonction intelligente qui permet à la caméra de distinguer une personne d'un animal ou d'un mouvement de végétation. Les alertes ne se déclenchent que pour une présence humaine, ce qui limite les fausses alertes.",
        },
        {
          question: "Peut-on relier des caméras de surveillance à une alarme déjà installée ?",
          answer:
            "Oui. Dans cette villa à Anduze, le propriétaire avait déjà une alarme Ajax : nous y avons couplé les 8 caméras de surveillance Dahua, sans remplacer son système d'alarme.",
        },
        {
          question: "À quoi servent le flash et la sirène intégrés aux caméras ?",
          answer:
            "Lorsqu'une présence humaine est détectée, la caméra déclenche son flash lumineux et sa sirène : l'intrus sait qu'il est repéré et il est dissuadé avant d'atteindre la maison.",
        },
      ],
      brands: [brands.dahua, brands.ajax],
      photos: [
        {
          src: "/images/realisations/installation-8-cameras-surveillance-villa-anduze/camera-dahua-flash-sirene-detection-humaine-villa-anduze.webp",
          alt: "Caméra tourelle Dahua avec projecteurs pour le flash dissuasif, installée près d'une lanterne sur la façade d'une villa à Anduze",
          width: 1200,
          height: 1600,
        },
        {
          src: "/images/realisations/installation-8-cameras-surveillance-villa-anduze/camera-dome-dahua-sous-plafond-villa-anduze.webp",
          alt: "Caméra dôme Dahua fixée sous un plafond, au-dessus d'un mur en pierre, dans une villa à Anduze (Gard)",
          width: 1086,
          height: 1448,
        },
        {
          src: "/images/realisations/installation-8-cameras-surveillance-villa-anduze/camera-dome-dahua-interieur-villa-anduze.webp",
          alt: "Caméra dôme Dahua installée au plafond, dans l'angle d'une pièce d'une villa à Anduze",
          width: 1200,
          height: 1600,
        },
      ],
    },
  },
];

export const realisations = allRealisations.filter((r) => !r.hidden);

export const realisationHref = (slug: string) => `/realisations/${slug}`;

// Projects that have their own page.
export const publishedRealisations = realisations.filter((r) => r.page);
