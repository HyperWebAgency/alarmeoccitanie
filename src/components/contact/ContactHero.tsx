import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { PartnerLogos } from "./PartnerLogos";
import { Breadcrumb } from "@/components/seo/Breadcrumb";

const benefits = [
  "Protection 24/7 de vos biens et locaux",
  "Installation professionnelle certifiée",
  "Accès distant depuis votre smartphone",
  "Intervention rapide dans l'Hérault",
  "Maintenance et support inclus",
];

// Left column of the contact split layout: Google review badge, headline, benefits, trust logos.
export function ContactHero() {
  return (
    <div className="max-w-[600px] min-[1600px]:max-w-[720px] min-[2200px]:max-w-[820px]">
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Contact" }]} className="mb-6" />

      <ReviewBadge className="mb-8" />

      <h1 className="mb-8 text-[3.5rem] leading-[1.1] font-extrabold tracking-[-1px] text-[#1a1a1a] max-[1201px]:text-[3rem] max-[601px]:text-[2.5rem] min-[1600px]:text-[4rem] min-[2200px]:text-[4.5rem]">
        Prêt à <span className="text-gold-dark">Sécuriser</span> Votre Propriété?
      </h1>

      <p className="mb-12 text-[1.25rem] leading-[1.6] text-[#555] max-[969px]:hidden max-[601px]:text-[1.1rem] min-[1600px]:text-[1.4rem]">
        Votre sécurité mérite une attention professionnelle. Découvrons ensemble vos besoins pour vous proposer la
        solution parfaite.
      </p>

      <ul className="mb-16 flex flex-col gap-[1.2rem]">
        {benefits.map((text, i) => (
          <li
            key={text}
            style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            className="flex items-center gap-4 text-[1.1rem] text-[#1a1a1a] opacity-0 [transform:translateX(-20px)] animate-slide-in-left max-[601px]:text-[1rem] min-[1600px]:text-[1.2rem] motion-reduce:animate-none motion-reduce:[transform:none] motion-reduce:opacity-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
              className="shrink-0 text-[#4CAF50]"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {text}
          </li>
        ))}
      </ul>

      <PartnerLogos variant="desktop" />
    </div>
  );
}
