import Image from "next/image";
import { site } from "@/lib/site";
import { GoogleIcon } from "@/components/ui/GoogleIcon";
import { PartnerLogos } from "./PartnerLogos";

const avatars = [
  { src: "/images/avatars/avatar1.webp", alt: "Client satisfait" },
  { src: "/images/avatars/avatar2.webp", alt: "Cliente satisfaite" },
  { src: "/images/avatars/avatar3.webp", alt: "Client satisfait" },
  { src: "/images/avatars/avatar4.webp", alt: "Cliente satisfaite" },
];

const benefits = [
  "Protection 24/7 de vos biens et locaux",
  "Installation professionnelle certifiée",
  "Accès distant depuis votre smartphone",
  "Intervention rapide dans l'Hérault",
  "Maintenance et support inclus",
];

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true" className="size-3">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// Left column of the contact split layout: Google review badge, headline, benefits, trust logos.
export function ContactHero() {
  return (
    <div className="max-w-[600px]">
      {/* Google review badge — a smaller/slicker variant of the homepage hero's badge, for the white background. */}
      <div className="mb-8 inline-flex w-fit items-center gap-[0.7rem] rounded-[60px] border border-[#ececec] bg-[#f5f5f5] px-4 py-[0.45rem]">
        <GoogleIcon className="size-[18px] shrink-0" />
        <div className="flex">
          {avatars.map((a, i) => (
            <div
              key={a.src}
              style={{ zIndex: avatars.length - i }}
              className="relative size-7 overflow-hidden rounded-full border-[1.5px] border-white/80 not-first:-ml-[10px]"
            >
              <Image src={a.src} alt={a.alt} width={28} height={28} className="size-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          <span className="text-[0.85rem] leading-[1.2] font-bold text-[#1a1a1a]">+ de {site.rating.count}</span>
          <span className="text-[0.68rem] text-[#777]">Avis Google</span>
        </div>
        <div aria-hidden="true" className="h-[26px] w-px bg-[#ddd]" />
        <div className="flex flex-col items-center">
          <span className="text-[0.85rem] leading-[1.2] font-bold text-[#1a1a1a]">{site.rating.value}/5</span>
          <div className="flex gap-px" aria-label={`Note de ${site.rating.value} sur 5`} role="img">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} />
            ))}
          </div>
        </div>
      </div>

      <h1 className="mb-8 text-[3.5rem] leading-[1.1] font-extrabold tracking-[-1px] text-[#1a1a1a] max-[1201px]:text-[3rem] max-[601px]:text-[2.5rem]">
        Prêt à <span className="text-gold-dark">Sécuriser</span> Votre Propriété?
      </h1>

      <p className="mb-12 text-[1.25rem] leading-[1.6] text-[#555] max-[969px]:hidden max-[601px]:text-[1.1rem]">
        Votre sécurité mérite une attention professionnelle. Découvrons ensemble vos besoins pour vous proposer la
        solution parfaite.
      </p>

      <ul className="mb-16 flex flex-col gap-[1.2rem]">
        {benefits.map((text, i) => (
          <li
            key={text}
            style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            className="flex items-center gap-4 text-[1.1rem] text-[#1a1a1a] opacity-0 [transform:translateX(-20px)] animate-slide-in-left max-[601px]:text-[1rem] motion-reduce:animate-none motion-reduce:[transform:none] motion-reduce:opacity-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              aria-hidden="true"
              className="shrink-0 text-gold-dark"
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
