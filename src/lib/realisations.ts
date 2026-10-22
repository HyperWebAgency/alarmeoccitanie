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
    slug: "installation-cameras-dahua-alarme-ajax-villa-montbazin",
    title: "Caméras Dahua 4 MP et alarme Ajax pour une villa à Montbazin",
    tags: ["Vidéosurveillance", "Alarme"],
    year: "2026",
    city: "Montbazin",
    location: "Montbazin (34 - Hérault)",
    image: {
      src: "/images/realisations/installation-cameras-dahua-alarme-ajax-villa-montbazin/camera-dahua-4mp-mur-pierre-villa-montbazin.webp",
      alt: "Caméra de surveillance Dahua 4 MP fixée sur un mur en pierre d'une villa à Montbazin (Hérault)",
      width: 960,
      height: 1280,
    },
    page: {
      metaTitle: "Installation vidéosurveillance et alarme à Montbazin | Alarme Occitanie",
      metaDescription:
        "Réalisation à Montbazin (34) : caméras Dahua 2 MP remplacées par des modèles 4 MP avec IVS, et alarme Risco remplacée par Ajax dans une villa de 400 m².",
      client: "Particulier",
      intro:
        "Modernisation du système de sécurité d'une villa de 400 m² à Montbazin : les anciennes caméras Dahua de 1ère génération en 2 MP ont laissé place à des caméras Dahua de 3ème génération en 4 MP, avec les fonctions intelligentes IVS, et l'ancienne alarme Risco a été remplacée par un système Ajax.",
      besoin:
        "Le client était déjà équipé d'un système de vidéosurveillance et d'une alarme, mais ces équipements étaient vieillissants. Il souhaitait les remplacer par des solutions plus récentes : une image plus précise pour ses caméras et une alarme plus moderne et simple à utiliser au quotidien.",
      intervention: [
        "Remplacement des anciennes caméras Dahua de 1ère génération en 2 MP par des caméras Dahua de 3ème génération en 4 MP.",
        "Intégration des fonctions intelligentes IVS : franchissement de ligne et détection d'intrusion, pour une surveillance plus précise et efficace.",
        "Remplacement de l'ancienne alarme Risco par un système d'alarme Ajax, plus moderne et simple à utiliser au quotidien.",
        "Mise en service et prise en main de l'installation avec le client.",
      ],
      faq: [
        {
          question: "Peut-on moderniser un système de vidéosurveillance déjà installé ?",
          answer:
            "Oui. Dans cette villa de 400 m² à Montbazin, nous avons remplacé les anciennes caméras Dahua de 1ère génération en 2 MP par des caméras Dahua de 3ème génération en 4 MP, pour une image plus détaillée.",
        },
        {
          question: "Quelle est la différence entre une caméra 2 MP et une caméra 4 MP ?",
          answer:
            "Le nombre de mégapixels (MP) indique la définition de l'image. Une caméra 2 MP filme en 1920 × 1080 pixels (Full HD), une caméra 4 MP en 2560 × 1440 pixels, soit près de deux fois plus de détails. Sur un enregistrement, on peut donc zoomer davantage sans que l'image devienne floue, et mieux distinguer un visage ou une silhouette à distance. C'est ce gain de précision que nous avons apporté à cette villa de Montbazin en passant de caméras 2 MP à des caméras 4 MP.",
        },
        {
          question: "Que sont les fonctions IVS d'une caméra Dahua ?",
          answer:
            "IVS désigne les fonctions d'analyse vidéo intelligente des caméras Dahua. Ici, nous avons intégré le franchissement de ligne, qui alerte lorsqu'une personne franchit une ligne virtuelle, et la détection d'intrusion, qui alerte lorsqu'une personne entre dans une zone définie.",
        },
        {
          question: "Peut-on remplacer une alarme Risco par une alarme Ajax ?",
          answer:
            "Oui. À Montbazin, nous avons remplacé l'ancien système d'alarme Risco du client par une solution Ajax, plus moderne et simple à utiliser au quotidien.",
        },
      ],
      brands: [brands.dahua, brands.ajax],
      photos: [
        {
          src: "/images/realisations/installation-cameras-dahua-alarme-ajax-villa-montbazin/sirene-exterieure-ajax-mur-pierre-villa-montbazin.webp",
          alt: "Sirène extérieure Ajax blanche fixée sur un mur en pierre d'une villa à Montbazin",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-cameras-dahua-alarme-ajax-villa-montbazin/detecteur-exterieur-ajax-villa-montbazin.webp",
          alt: "Détecteur de mouvement extérieur Ajax posé dans l'angle d'un mur crépi d'une villa à Montbazin",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-cameras-dahua-alarme-ajax-villa-montbazin/clavier-tactile-ajax-villa-montbazin.webp",
          alt: "Clavier tactile de l'alarme Ajax qui remplace l'ancienne alarme Risco d'une villa à Montbazin",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-cameras-dahua-alarme-ajax-villa-montbazin/detecteur-ouverture-ajax-fenetre-villa-montbazin.webp",
          alt: "Détecteur d'ouverture Ajax blanc posé sur le cadre d'une fenêtre d'une villa à Montbazin",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-cameras-dahua-alarme-ajax-villa-montbazin/sirene-ajax-noire-poutre-villa-montbazin.webp",
          alt: "Sirène Ajax noire fixée sur une poutre en bois, dans une villa à Montbazin",
          width: 960,
          height: 1280,
        },
      ],
    },
  },
  {
    slug: "installation-alarme-videosurveillance-maison-corconne",
    title: "Alarme Ajax et caméras Dahua pour une maison à Corconne",
    tags: ["Vidéosurveillance", "Alarme"],
    year: "2026",
    city: "Corconne",
    location: "Corconne (30 - Gard)",
    image: {
      src: "/images/realisations/installation-alarme-videosurveillance-maison-corconne/technicien-installation-alarme-camera-corconne.webp",
      alt: "Technicien Alarme Occitanie en pleine installation sous la gouttière d'une maison à Corconne (Gard)",
      width: 960,
      height: 1280,
    },
    page: {
      metaTitle: "Installation alarme et vidéosurveillance à Corconne | Alarme Occitanie",
      metaDescription:
        "Réalisation à Corconne (30) : alarme Ajax et caméras Dahua posées dès l'achat d'une maison, après une intrusion, pour protéger l'intérieur et l'extérieur.",
      client: "Particulier",
      intro:
        "Installation d'une alarme Ajax et de caméras de surveillance Dahua dans une maison à Corconne, sécurisée dès son achat. L'alarme et les caméras couvrent l'ensemble de la maison, à l'intérieur comme à l'extérieur.",
      besoin:
        "Pendant l'achat de leur maison, les nouveaux propriétaires ont subi une intrusion. Ils souhaitaient donc la sécuriser dès l'achat finalisé, avec une protection complète de l'intérieur et de l'extérieur.",
      intervention: [
        "Installation réalisée dès l'achat de la maison.",
        "Pose de caméras de surveillance Dahua sur les façades de la maison.",
        "Installation d'une alarme Ajax : détecteurs de mouvement, détecteurs d'ouverture sur les portes et fenêtres, clavier et sirène extérieure.",
        "Couverture complète de la maison, à l'intérieur comme à l'extérieur.",
        "Mise en service et prise en main de l'installation avec les propriétaires.",
      ],
      faq: [
        {
          question: "Peut-on faire installer une alarme dès l'achat d'une maison ?",
          answer:
            "Oui. À Corconne, les propriétaires avaient subi une intrusion pendant l'achat de leur maison : nous avons installé leur alarme Ajax et leurs caméras de surveillance Dahua dès l'achat, pour qu'elle soit protégée sans attendre.",
        },
        {
          question: "Une alarme et des caméras peuvent-elles protéger l'intérieur et l'extérieur d'une maison ?",
          answer:
            "Oui. Dans cette maison, les caméras Dahua surveillent les extérieurs, et l'alarme Ajax protège les accès et les pièces avec des détecteurs d'ouverture et de mouvement, un clavier et une sirène extérieure.",
        },
        {
          question: "À quoi sert un détecteur d'ouverture ?",
          answer:
            "Posé sur une porte ou une fenêtre, il déclenche l'alarme dès qu'elle est ouverte pendant que le système est activé. À Corconne, nous en avons notamment installé sur les portes-fenêtres de la maison.",
        },
      ],
      brands: [brands.dahua, brands.ajax],
      photos: [
        {
          src: "/images/realisations/installation-alarme-videosurveillance-maison-corconne/camera-dahua-sous-gouttiere-maison-corconne.webp",
          alt: "Caméra de surveillance Dahua fixée sous la gouttière d'une maison à Corconne (Gard)",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-alarme-videosurveillance-maison-corconne/sirene-exterieure-ajax-maison-corconne.webp",
          alt: "Sirène extérieure Ajax blanche fixée sur la façade d'une maison à Corconne, sous le toit",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-alarme-videosurveillance-maison-corconne/camera-dahua-facade-crepie-maison-corconne.webp",
          alt: "Caméra de surveillance Dahua blanche fixée sur la façade crépie d'une maison à Corconne",
          width: 960,
          height: 1280,
        },
        {
          src: "/images/realisations/installation-alarme-videosurveillance-maison-corconne/detecteur-mouvement-alarme-maison-corconne.webp",
          alt: "Détecteur de mouvement de l'alarme fixé dans l'angle d'un mur d'une maison à Corconne",
          width: 960,
          height: 1280,
        },
      ],
    },
  },
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
