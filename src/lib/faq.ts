import { site, zones } from "./site";
import { quoteHref } from "./navigation";

// Optional CTA shown under an answer once it's open (e.g. the devis question). Never part of the
// JSON-LD — faqSchema() only reads question/answer, so the button never reaches the FAQPage markup.
export type FaqItem = { question: string; answer: string; cta?: { label: string; href: string } };

// Homepage FAQ — general questions covering alarme, vidéosurveillance and the company (not a single
// service page). Kept here as the single source so the visible accordion (src/components/home/Faq.tsx)
// and the FAQPage JSON-LD (faqSchema() in src/lib/schema.ts) can never say two different things.
//
// Every fact below comes from this site (src/lib/site.ts, src/lib/navigation.ts, Brands.tsx,
// TrustBar.tsx, ClientNeeds.tsx) or from zozo's own FAQ answers (same company, so its claims about
// delays/guarantees are the owner's own) — see the final report for the source of each one. No
// invented numbers. Télésurveillance is never mentioned (we don't offer it), and "sans fil" is
// avoided everywhere even though it describes the real hardware.
export const faqItems: FaqItem[] = [
  {
    question: "Dans quelles villes intervenez-vous autour de Montpellier ?",
    answer:
      `Nous intervenons à ${zones[0]} et dans toute sa métropole, ainsi que dans l'Hérault et le Gard : ${zones.slice(1).join(", ")}. Si votre commune n'apparaît pas dans cette liste, contactez-nous : il est probable que nous la couvrions aussi.`,
  },
  {
    question: "Faut-il un abonnement pour l'alarme ou la vidéosurveillance ?",
    answer:
      "Non, aucun abonnement n'est obligatoire, que ce soit pour une alarme anti-intrusion ou pour un système de vidéosurveillance. Vous recevez vos alertes et consultez vos caméras directement depuis votre smartphone, sans mensualité imposée.",
  },
  {
    question: "Comment obtenir un devis gratuit ?",
    answer:
      `Le devis est gratuit et sans engagement, que vous soyez un particulier ou une entreprise. Contactez-nous au ${site.phone.display} ou via notre page de contact : nous revenons vers vous rapidement pour évaluer votre projet et vous proposer une solution adaptée.`,
    // CTA shown under this answer only — same destination and label as the site's other devis buttons.
    cta: { label: "Obtenir mon devis", href: quoteHref },
  },
  {
    question: "Quelles marques de matériel installez-vous ?",
    answer:
      "Nous installons du matériel des grandes marques du secteur : Hikvision et Dahua pour la vidéosurveillance, Ajax pour l'alarme anti-intrusion, ainsi que Bosch, Honeywell, Axis Communications et Vanderbilt selon les besoins du projet. Ces marques sont choisies pour leur fiabilité et leurs performances.",
  },
  {
    question: "Combien de temps dure une installation ?",
    answer:
      "Tout dépend de votre projet. Pour un particulier, une installation prend en général d'une demi-journée à une journée, et jusqu'à 3 jours pour les projets plus importants. Pour un professionnel, la durée dépend vraiment du projet demandé, du matériel à installer et de sa quantité.",
  },
  {
    question: "Votre installation est-elle garantie ?",
    answer:
      "Oui. Selon la marque et le type d'installation, votre matériel d'alarme ou de vidéosurveillance est garanti de 2 à 5 ans, sans mensualité ni engagement. Nous assurons aussi le suivi de votre installation après la mise en service.",
  },
  {
    question: "Assurez-vous la maintenance et le dépannage après l'installation ?",
    answer:
      "Oui, même si les dépannages sont rares : nous soignons chaque installation pour qu'elle fonctionne sans souci pendant de longues années. Si une intervention est nécessaire, nous venons dans la semaine, voire le jour même en cas d'urgence. Nous assurons aussi l'entretien régulier de vos équipements d'alarme et de vidéosurveillance.",
  },
  {
    question: "Puis-je consulter mes caméras à distance depuis mon smartphone ?",
    answer:
      "Oui : nos systèmes de vidéosurveillance s'accompagnent d'une application mobile qui vous permet de consulter vos caméras en direct depuis votre smartphone, où que vous soyez, ou directement sur site. Vous recevez aussi vos notifications d'alarme sur votre téléphone, sans abonnement.",
  },
];
