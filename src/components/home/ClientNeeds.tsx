import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { quoteHref } from "@/lib/navigation";

const items = [
  {
    icon: "/images/icons/videosurveillance.svg",
    title: "Des caméras pour tout voir clairement, jour et nuit",
    text: "Même avec nos caméras de base, vous voyez les visages, les plaques d'immatriculation et les objets, de jour comme de nuit.",
  },
  {
    icon: "/images/icons/particulier-professionnel.svg",
    title: "Pour les particuliers et les professionnels",
    text: "Une solution adaptée à chaque besoin, du domicile au local commercial ou industriel.",
  },
  {
    icon: "/images/icons/acces-a-distance-camera.svg",
    title: "Accessibles par téléphone ou sur place",
    text: "Consultez vos caméras en direct depuis votre smartphone, où que vous soyez, ou directement sur site. Sans abonnement.",
  },
  {
    icon: "/images/icons/installateur-local.svg",
    title: "Un installateur local, toujours disponible",
    text: "Une équipe proche de vous à Montpellier, réactive dès que vous en avez besoin.",
  },
];

// "Qui sommes-nous" — what clients were looking for, with a real on-site photo.
export function ClientNeeds() {
  return (
    <section id="qui-sommes-nous" className="bg-white px-8 py-20 [line-height:normal] max-[769px]:px-5 max-[769px]:py-12">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-16 max-[901px]:grid-cols-1 max-[901px]:gap-10">
        <div>
          <span className="mb-3 inline-block text-[0.75rem] font-bold tracking-[2px] text-gold-dark uppercase">
            Ils nous ont fait confiance
          </span>
          <h2 className="mb-5 font-poppins text-[2.2rem] leading-[1.2] font-bold tracking-[-0.5px] text-[#1a1a1a] max-[769px]:text-[1.6rem]">
            Ce que recherchaient nos clients pour leur caméra de surveillance et leur alarme à Montpellier
          </h2>

          <ul className="mb-8 flex flex-col gap-5">
            {items.map((item) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center text-gold">
                  {/* Line-art glyph masked to the brand colour */}
                  <span
                    aria-hidden="true"
                    style={{ maskImage: `url(${item.icon})`, WebkitMaskImage: `url(${item.icon})` }}
                    className="size-8 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                  />
                </span>
                <div>
                  <h3 className="mb-1 text-[1.1rem] leading-[1.35] font-bold text-[#1a1a1a]">{item.title}</h3>
                  <p className="text-[0.95rem] leading-[1.6] text-[#666]">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href={quoteHref}
            className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-[0.9rem] font-semibold text-navy shadow-[0_4px_16px_rgba(200,153,47,0.25)] transition-[background,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_6px_22px_rgba(200,153,47,0.35)]"
          >
            Demander un devis gratuit
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="flex items-center justify-center">
          {/* Relative wrapper sized like the photo itself, so the badge below anchors to its edges, not the column */}
          <div className="relative w-full max-w-[360px]">
            <Image
              src="/images/interventions/installateur-alarme-videosurveillance.webp"
              alt={`Technicien ${site.name} en intervention d'installation d'alarme et de vidéosurveillance à Montpellier`}
              width={1086}
              height={1448}
              sizes="360px"
              className="block h-auto w-full rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            />

            {/* Feature badge, modelled on zozo's Anduze "0 sous-traitance" card: hangs half off the
                right edge near the bottom, over the plain jacket sleeve (clear of the face/hands).
                On mobile it tucks fully inside the photo, like zozo does, so it isn't clipped. */}
            <div className="absolute bottom-[28px] right-0 z-[2] inline-flex items-center gap-[0.45rem] rounded-xl bg-white px-[0.7rem] py-[0.4rem] shadow-[0_6px_18px_rgba(0,0,0,0.2)] [transform:translateX(50%)] max-[769px]:right-3 max-[769px]:[transform:none]">
              <span aria-hidden="true" className="flex size-[26px] shrink-0 items-center justify-center text-gold-dark">
                <span className="size-[26px] bg-current [mask-image:url(/images/icons/experience.svg)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]" />
              </span>
              <span className="text-[0.8rem] leading-[1.2] font-bold text-[#1a1a1a]">20 ans d&apos;expérience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
