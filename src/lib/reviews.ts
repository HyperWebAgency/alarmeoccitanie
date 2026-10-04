// Reviews shown in the homepage carousel.
// Real client reviews (texts from Google).
// No client names; the photos are the avatars also used in the hero's Google badge.
export type Review = {
  photo: string;
  detail: string; // installation type
  text: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    photo: "/images/avatars/avatar1.webp",
    detail: "Vidéosurveillance à Montpellier",
    text: "Sérieux, compétence, ponctualité, courtoisie et un rapport qualité-prix imbattable. Merci pour le professionnalisme et la réponse technique apportée à la vidéoprotection de mon domicile. Je recommande vivement cette entreprise, qui a le souci de proposer la solution la plus adaptée au prix le plus juste. Du beau travail.",
    rating: 5,
  },
  {
    photo: "/images/avatars/avatar2.webp",
    detail: "Alarme à Montpellier",
    text: "Un service d'installation de haute qualité. Ce qui les distingue, c'est vraiment le souci du détail et la propreté du chantier après leur passage. On se sent en totale sécurité grâce à leur expertise technique. C'est une équipe sérieuse, ponctuelle et extrêmement réactive. Allez-y en toute confiance, le résultat est au top.",
    rating: 5,
  },
  {
    photo: "/images/avatars/avatar3.webp",
    detail: "Installation visiophone à Montpellier",
    text: "Nous avons fait installer un système complet de sonnette-interphone avec écran de visualisation et l'ouverture à distance d'un portail éloigné de la maison. Travail rapide, efficace et très professionnel par Alarme Occitanie : notre satisfaction est totale et nous recommandons chaleureusement cette entreprise.",
    rating: 5,
  },
];
