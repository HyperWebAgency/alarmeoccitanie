import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { quoteHref } from "@/lib/navigation";
import { GoogleIcon } from "@/components/ui/GoogleIcon";

const sellingPoints = [
  "Sans engagement et sans abonnement",
  "Garantie sur tout le matériel installé",
  "Entreprise locale, SAV disponible 7/7",
  "Alerte à distance sur smartphone",
  "Devis et déplacement gratuits",
];

const avatars = [
  { src: "/images/avatars/avatar1.webp", alt: "Client satisfait" },
  { src: "/images/avatars/avatar2.webp", alt: "Cliente satisfaite" },
  { src: "/images/avatars/avatar3.webp", alt: "Client satisfait" },
  { src: "/images/avatars/avatar4.webp", alt: "Cliente satisfaite" },
];

// Fade-in + slide-up on load (disabled for reduced motion).
// The keyframes animate `transform`, so the start offset must be a transform too (not Tailwind's `translate`).
const fadeUp =
  "[transform:translateY(30px)] opacity-0 animate-hero-fade-in-up motion-reduce:[transform:none] motion-reduce:animate-none motion-reduce:opacity-100";

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true" className="size-4 max-[769px]:size-2.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative isolate flex min-h-[90vh] w-full items-center [line-height:normal] overflow-hidden px-[7%] max-[901px]:min-h-[50vh] max-md:px-[5%] max-md:pt-10"
    >
      {/* Faint gold glow in the center */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,153,47,0.1)_0%,transparent_50%)]"
      />

      <Image
        src="/images/hero/installation-videosurveillance-alarme-montpellier.webp"
        alt="Installation vidéosurveillance Montpellier"
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover"
      />

      {/* Dark gradient (darker on the text side) + extra dark layer behind the text, fading out at 55%.
          On zozo this second layer comes from a Chrome backdrop-filter quirk; here it is explicit so every browser matches. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.65)_50%,rgba(0,0,0,0.35)_100%)]"
      >
        <div className="absolute inset-y-0 left-0 w-[55%] bg-black/65 [mask-image:linear-gradient(to_right,black_70%,transparent_100%)]" />
      </div>

      <div className="relative mt-24 max-w-[900px] text-white max-md:mt-0 max-md:min-h-[200px]">
        <h1
          className={`mb-[0.8rem] font-poppins text-[2.2rem] leading-[1.1] font-bold tracking-[-1px] min-[769px]:text-[clamp(2.3rem,4.1vw,3.2rem)] min-[769px]:leading-[1.12] max-md:mt-12 max-md:text-[1.4rem] ${fadeUp}`}
        >
          Installation Vidéosurveillance
          <br className="max-md:hidden" /> et Alarme à Montpellier
        </h1>

        <p
          className={`mb-6 font-urbanist text-[1.2rem] font-light max-md:mb-3 max-md:text-[0.85rem] ${fadeUp} [animation-delay:0.05s]`}
        >
          Votre installateur de vidéosurveillance et d&apos;alarme à Montpellier et dans l&apos;Hérault.
          <br className="max-md:hidden" /> Pose de caméras de surveillance et de systèmes d&apos;alarme pour sécuriser
          <br className="max-md:hidden" /> votre maison, appartement ou commerce.
        </p>

        <ul className={`mb-8 flex flex-col gap-2 max-md:mb-4 max-md:gap-1.5 ${fadeUp} [animation-delay:0.4s]`}>
          {sellingPoints.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-[0.9rem] font-medium tracking-[0.3px] max-md:text-[0.8rem]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 text-[#4CAF50]"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {point}
            </li>
          ))}
        </ul>

        {/* Google review badge + handwritten note pointing at it */}
        <div className="relative w-fit">
          <div className="mb-6 flex w-fit items-center gap-[1.2rem] rounded-[60px] bg-white/10 px-6 py-3 backdrop-blur-[10px] max-[769px]:gap-2 max-[769px]:px-3 max-[769px]:py-1.5">
            <GoogleIcon className="size-6 shrink-0 max-[769px]:size-[18px]" />

            <div className="flex">
              {avatars.map((a, i) => (
                <div
                  key={a.src}
                  style={{ zIndex: avatars.length - i }}
                  className="relative size-[38px] overflow-hidden rounded-full border-2 border-white/80 not-first:-ml-3 max-[769px]:size-6"
                >
                  <Image src={a.src} alt={a.alt} width={38} height={38} className="size-full object-cover" />
                </div>
              ))}
            </div>

            <div className="flex flex-col">
              <span className="text-[1.1rem] leading-[1.2] font-bold max-[769px]:text-[0.75rem]">
                + de {site.rating.count}
              </span>
              <span className="text-[0.8rem] text-white/65 max-[769px]:text-[0.6rem]">Avis Google</span>
            </div>

            <div aria-hidden="true" className="h-[35px] w-px bg-white/25 max-[769px]:h-7" />

            <div className="flex flex-col items-center">
              <span className="text-[1.1rem] leading-[1.2] font-bold max-[769px]:text-[0.75rem]">
                {site.rating.value}/5
              </span>
              <div className="flex gap-px" aria-label={`Note de ${site.rating.value} sur 5`} role="img">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Handwritten note (desktop only, appears after 8s) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-[calc(100%+0.5rem)] flex w-[290px] [transform:translateY(-45%)] items-center gap-1.5 opacity-0 animate-review-note max-[901px]:hidden motion-reduce:animate-none motion-reduce:opacity-100"
          >
            <svg viewBox="0 0 512 512" className="h-auto w-[74px] shrink-0 -translate-y-1.5 text-gold">
              <g transform="translate(0,512) scale(0.1,-0.1)" fill="currentColor" stroke="none">
                <path d="M4391 3663 c-20 -44 -132 -211 -190 -283 -77 -97 -243 -261 -356 -354 -588 -483 -1532 -880 -2300 -970 -66 -7 -121 -13 -123 -11 -1 1 21 18 50 36 70 45 212 163 271 227 54 59 57 76 31 207 l-15 80 -127 -126 c-175 -173 -356 -290 -601 -389 l-84 -34 -100 13 c-110 14 -117 11 -117 -40 0 -15 -7 -32 -15 -39 -10 -8 -15 -31 -15 -71 0 -56 1 -59 28 -65 458 -110 776 -246 1001 -429 l79 -64 7 105 c7 104 7 105 -21 145 -35 51 -114 122 -172 156 l-45 27 137 27 c416 84 843 248 1329 510 672 363 1103 744 1336 1181 47 87 51 99 45 141 -8 54 -16 58 -33 20z" />
              </g>
            </svg>
            <span className="-translate-y-2 -rotate-3 font-caveat text-[1.6rem] leading-[1.02] font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
              Eh oui, que du 5 étoiles…&nbsp;on assure, tout simplement&nbsp;!
            </span>
          </div>
        </div>

        <div className="flex min-h-[60px] flex-col gap-3 max-md:mt-2 max-md:items-start">
          <Link
            href={quoteHref}
            className="group inline-flex w-fit items-center gap-4 rounded-full border-2 border-gold bg-gold px-14 py-5 text-[1.1rem] font-bold tracking-[1px] text-navy shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-colors duration-300 max-md:px-[1.4rem] max-md:py-2.5 max-md:text-[0.75rem] max-md:tracking-[0.5px] pointer-fine:hover:bg-white"
          >
            Demander un devis gratuit
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-6 max-md:size-4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Bouncing scroll-down arrow (points to the next section) */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center animate-hero-bounce max-[769px]:hidden motion-reduce:animate-none">
        <a
          href="#confiance"
          aria-label="Voir la suite"
          className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-all duration-300 hover:translate-y-[3px] hover:bg-white/25"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
