"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import { quoteHref } from "@/lib/navigation";
import { reviews } from "@/lib/reviews";
import { GoogleIcon } from "@/components/ui/GoogleIcon";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="46" height="16" viewBox="0 0 46 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="M45 8H1M8 1 1 8l7 7" /> : <path d="M1 8h44M38 1l7 7-7 7" />}
    </svg>
  );
}

function Stars({ rating, className = "size-[22px] max-md:size-4" }: { rating: number; className?: string }) {
  return (
    <span className="flex gap-1 text-gold" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={className}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

// Platform rating pill (Google, PagesJaunes…). Not a link: visitors stay on the site.
function RatingBadge({ logo, value, label }: { logo: ReactNode; value: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-2.5 shadow-[0_4px_14px_rgba(14,34,56,0.06)]">
      {logo}
      <span>
        <span className="flex items-center gap-1.5">
          <span className="text-[1.05rem] font-bold text-[#1a1a1a]">{value}</span>
          <Stars rating={5} className="size-[14px]" />
        </span>
        <span className="mt-0.5 block text-[0.8rem] text-[#666]">{label}</span>
      </span>
    </div>
  );
}

// Customer reviews: intro on the left, carousel on the right. The active dot's fill animation drives
// the autoplay (on animationend), so hovering pauses it and reduced motion disables it.
export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = reviews.length;
  const go = (i: number) => setIndex(((i % count) + count) % count);

  return (
    <section id="avis" aria-labelledby="avis-title" className="bg-white px-8 py-20 [line-height:normal] max-[769px]:px-4 max-[769px]:py-12">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,4fr)_minmax(0,6fr)] items-center gap-16 text-[#1a1a1a] max-[1001px]:grid-cols-1 max-[1001px]:gap-10">
        <div className="self-start">
          <h2 id="avis-title" className="font-poppins text-[2.5rem] leading-[1.15] font-bold tracking-[-0.5px] text-[#1a1a1a] max-md:text-[1.75rem]">
            Nos clients adorent ce que nous faisons
          </h2>
          <p className="mt-5 max-w-[440px] text-[1rem] leading-[1.7] text-[#666] max-md:text-[0.95rem]">
            Particuliers et professionnels de Montpellier et de l&apos;Hérault nous confient leur alarme et leur
            vidéosurveillance. Découvrez leurs avis et rejoignez nos clients satisfaits.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <RatingBadge
              logo={<GoogleIcon className="size-7 shrink-0" />}
              value={site.rating.value}
              label={`+${site.rating.count} avis Google`}
            />
            <RatingBadge
              logo={<Image src="/images/avis/pagesjaunes.svg" alt="PagesJaunes" width={28} height={28} className="size-7 shrink-0 rounded-[4px]" />}
              value={site.pagesJaunes.value}
              label={`${site.pagesJaunes.count} avis PagesJaunes`}
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={quoteHref}
              className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-[0.9rem] font-semibold text-navy shadow-[0_4px_16px_rgba(200,153,47,0.25)] transition-[background,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_6px_22px_rgba(200,153,47,0.35)]"
            >
              Demander un devis gratuit
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy/20 px-8 py-[0.775rem] font-semibold text-navy transition-[background,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-navy hover:bg-navy/5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[18px]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Nous appeler
            </a>
          </div>
        </div>

        <div
          aria-roledescription="carousel"
          aria-label="Avis clients"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
            touchX.current = null;
          }}
        >
          <div className="mb-7 flex justify-end gap-6 max-md:mb-5">
            <button type="button" aria-label="Avis précédent" onClick={() => go(index - 1)} className="cursor-pointer text-navy/60 transition-colors hover:text-gold-dark">
              <Arrow direction="left" />
            </button>
            <button type="button" aria-label="Avis suivant" onClick={() => go(index + 1)} className="cursor-pointer text-navy/60 transition-colors hover:text-gold-dark">
              <Arrow direction="right" />
            </button>
          </div>

          {/* All slides share one grid cell, so the card keeps the tallest height and nothing jumps. */}
          <div className="grid" aria-live={paused ? "polite" : "off"}>
            {reviews.map((r, i) => (
              <figure
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`Avis ${i + 1} sur ${count}`}
                aria-hidden={i !== index}
                inert={i !== index}
                className={`flex flex-col rounded-[20px] bg-[#f6f7f9] px-12 py-12 ring-1 ring-black/[0.04] transition-opacity duration-500 [grid-area:1/1] max-md:p-6 ${
                  i === index ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span aria-hidden="true" className="block h-[3.6rem] font-serif text-[7rem] leading-[0.9] font-bold text-gold max-md:h-10 max-md:text-[4.5rem]">
                    &ldquo;
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[0.8rem] font-medium text-[#1a1a1a] shadow-[0_2px_8px_rgba(14,34,56,0.06)] ring-1 ring-black/[0.06] max-md:px-3 max-md:text-[0.72rem]">
                    <GoogleIcon className="size-4 shrink-0" />
                    Visible sur notre Google
                  </span>
                </div>
                <blockquote className="mt-7 flex-1 text-[1.4rem] leading-[1.6] whitespace-pre-line text-[#1a1a1a] max-md:text-[1.05rem]">{r.text}</blockquote>
                <figcaption className="mt-12 flex items-center justify-between gap-4 max-md:mt-7 max-md:flex-col max-md:items-start max-md:gap-3">
                  <span className="flex items-center gap-3">
                    <Image
                      src={r.photo}
                      alt={`Client ${site.name}`}
                      width={48}
                      height={48}
                      className="size-12 shrink-0 rounded-full object-cover ring-2 ring-white max-md:size-10"
                    />
                    <span className="font-semibold">{r.detail}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Stars rating={r.rating} />
                    <span className="text-[1.05rem] font-medium" aria-label={`Note : ${r.rating} sur 5`}>
                      {r.rating.toFixed(1)}
                    </span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-1">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Afficher l'avis ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className="group flex h-6 cursor-pointer items-center px-1"
              >
                {i === index ? (
                  <span className="relative block h-1.5 w-28 overflow-hidden rounded-full bg-navy/15">
                    <span
                      onAnimationEnd={() => go(index + 1)}
                      className={`absolute inset-0 origin-left rounded-full bg-gold animate-review-progress motion-reduce:animate-none motion-reduce:[transform:scaleX(1)] ${
                        paused ? "[animation-play-state:paused]" : ""
                      }`}
                    />
                  </span>
                ) : (
                  <span className="block size-1.5 rounded-full bg-navy/25 transition-colors group-hover:bg-navy/50" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
