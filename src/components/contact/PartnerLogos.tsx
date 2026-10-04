import Image from "next/image";

// Same reference clients and calibrated box sizes as TrustBar (homepage "marques" strip):
// icon-style logos are ~square, Sephora/Bvlgari are wordmarks kept at a fixed small width
// instead of scaled to the row height (that would blow them up — see TrustBar.tsx).
const clients = [
  { src: "/images/clients/lidl.webp", name: "Lidl", width: 51, height: 50 },
  { src: "/images/clients/aldi.webp", name: "Aldi", width: 48, height: 50 },
  { src: "/images/clients/but.webp", name: "BUT", width: 50, height: 50 },
  { src: "/images/clients/sephora.svg", name: "Sephora", width: 120, height: 16 },
  { src: "/images/clients/bvlgari.svg", name: "Bvlgari", width: 120, height: 13 },
];

// "Partenaires de confiance" strip: shown once under the benefits list on desktop/tablet,
// and again (smaller) under the form on mobile — same two-copy toggle zozo uses for reordering.
export function PartnerLogos({ variant }: { variant: "desktop" | "mobile" }) {
  const isMobile = variant === "mobile";
  const scale = isMobile ? 0.6 : 0.78;

  return (
    <div
      className={
        isMobile
          ? "mt-8 block border-t border-[#e0e0e0] pt-8 text-center min-[969px]:hidden max-[601px]:mt-6 max-[601px]:pt-6"
          : "mt-10 hidden border-t border-[#e0e0e0] pt-8 min-[969px]:block"
      }
    >
      <h3
        className={
          isMobile
            ? "mb-4 text-[0.9rem] font-semibold tracking-[1px] text-[#888] max-[601px]:mb-[0.8rem] max-[601px]:text-[0.8rem]"
            : "mb-6 text-[0.85rem] font-semibold tracking-[2px] text-[#888]"
        }
      >
        PARTENAIRES DE CONFIANCE
      </h3>
      <div
        className={
          isMobile
            ? "flex flex-wrap items-center justify-center gap-4 max-[601px]:gap-[0.8rem]"
            : "flex flex-wrap items-center gap-8"
        }
      >
        {clients.map((c) => (
          <Image
            key={c.src}
            src={c.src}
            alt={c.name}
            width={c.width}
            height={c.height}
            loading="lazy"
            style={{ width: Math.round(c.width * scale), height: Math.round(c.height * scale) }}
            className="object-contain opacity-90 transition-[opacity,transform] duration-300 ease-[ease] hover:scale-105 hover:opacity-100"
          />
        ))}
      </div>
    </div>
  );
}
