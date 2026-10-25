import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { quoteHref } from "@/lib/navigation";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ReviewBadge } from "@/components/ui/ReviewBadge";

const benefits = [
  "Voyez et parlez à vos visiteurs avant de leur ouvrir",
  "Ouverture du portail à distance depuis votre smartphone",
  "Sans engagement et sans abonnement",
  "Garantie de 2 à 5 ans selon le matériel",
  "Devis et déplacement gratuits",
];

// Interphone & visiophone page hero: white background (no photo behind it), copy on the left,
// the visiophone kit (transparent PNG-style webp) on the right. Stacks on tablet/mobile.
export function InterphoneHero() {
  return (
    <section className="bg-white px-16 pt-[140px] pb-20 [line-height:normal] max-[1201px]:px-12 max-[969px]:px-8 max-[969px]:pt-[110px] max-[969px]:pb-16 max-[601px]:px-6 max-[601px]:pt-[100px]">
      <div className="mx-auto grid max-w-[1250px] items-center gap-12 min-[970px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[1600px]:max-w-[1400px]">
        <div>
          <Breadcrumb
            items={[{ label: "Accueil", href: "/" }, { label: "Interphone & visiophone" }]}
            className="mb-6"
          />
          <ReviewBadge className="mb-8" />

          <h1 className="mb-6 font-poppins text-[3.2rem] leading-[1.1] font-bold tracking-[-1px] text-[#1a1a1a] max-[1201px]:text-[2.8rem] max-[601px]:text-[2.1rem] min-[1600px]:text-[3.6rem]">
            Installation d&apos;<span className="text-gold-dark">interphone et visiophone</span> à Montpellier
          </h1>

          <p className="mb-8 max-w-[560px] text-[1.15rem] leading-[1.6] text-[#555] max-[601px]:text-[1.02rem]">
            {site.name} installe votre interphone ou votre visiophone à Montpellier et dans l&apos;Hérault, pour votre
            maison comme pour vos locaux professionnels.
          </p>

          <ul className="mb-10 flex flex-col gap-3.5">
            {benefits.map((text) => (
              <li key={text} className="flex items-center gap-3 text-[1.05rem] text-[#1a1a1a] max-[601px]:text-[0.98rem]">
                <svg
                  width="22"
                  height="22"
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

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={quoteHref}
              className="inline-flex items-center gap-3 rounded-full border-2 border-gold bg-gold px-9 py-4 text-[1.05rem] font-bold text-navy shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-colors duration-300 max-[601px]:px-7 max-[601px]:py-3.5 max-[601px]:text-[0.95rem] pointer-fine:hover:bg-white"
            >
              Demander un devis gratuit
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy px-7 py-4 text-[1.05rem] font-bold text-navy transition-colors duration-300 max-[601px]:px-6 max-[601px]:py-3.5 max-[601px]:text-[0.95rem] pointer-fine:hover:bg-navy pointer-fine:hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {site.phone.display}
            </a>
          </div>
        </div>

        <div className="flex justify-center min-[970px]:justify-end">
          <Image
            src="/images/interphone-visiophone/kit-visiophone-ecran-platine-de-rue-badges.webp"
            alt="Kit visiophone : écran intérieur, platine de rue avec caméra et badges d'accès"
            width={544}
            height={458}
            preload
            sizes="(max-width: 969px) 90vw, 544px"
            className="h-auto w-full max-w-[544px]"
          />
        </div>
      </div>
    </section>
  );
}
