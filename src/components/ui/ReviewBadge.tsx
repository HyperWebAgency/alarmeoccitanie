import Image from "next/image";
import { site } from "@/lib/site";
import { GoogleIcon } from "@/components/ui/GoogleIcon";

const avatars = [
  { src: "/images/avatars/avatar1.webp", alt: "Client satisfait" },
  { src: "/images/avatars/avatar2.webp", alt: "Cliente satisfaite" },
  { src: "/images/avatars/avatar3.webp", alt: "Client satisfait" },
  { src: "/images/avatars/avatar4.webp", alt: "Cliente satisfaite" },
];

function Star() {
  return (
    <svg viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true" className="size-3">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// Google review badge for white backgrounds — a smaller/slicker variant of the homepage hero's badge.
export function ReviewBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex w-fit items-center gap-[0.7rem] rounded-[60px] border border-[#ececec] bg-[#f5f5f5] px-4 py-[0.45rem] ${className}`}>
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
  );
}
