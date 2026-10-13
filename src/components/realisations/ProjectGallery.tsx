"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/realisations";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

const control =
  "absolute flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 max-[640px]:size-10";

// Photos are never cropped: each keeps its own shape. They are laid out in rows where every photo has the
// same height (width ∝ its aspect ratio), and a row never gets taller than MAX_H.
// Desktop: one row up to 4 photos, then rows of 3 (5 → 3 + 2, 6 → 3 + 3). Mobile: pairs.
// Desktop reads the --gallery-max-h custom property (globals.css raises it on big screens only,
// same pattern as --bar-h) so a row can grow past 400px there without touching mobile.
const MAX_H = { desktop: "var(--gallery-max-h, 400px)", mobile: "320px" };

function chunk<T>(items: T[], sizes: number[]) {
  let start = 0;
  return sizes.map((size) => items.slice(start, (start += size)));
}

const desktopRows = (count: number) => (count <= 4 ? [count] : [3, count - 3]);
const mobileRows = (count: number) => Array.from({ length: Math.ceil(count / 2) }, (_, i) => Math.min(2, count - i * 2));

// Project photos (3 to 6 per project).
// Clicking a photo opens it full screen; arrows / keyboard / Escape to browse and close.
export function ProjectGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  // Focus goes back to the photo that was opened (in whichever layout is visible).
  const close = useCallback(() => {
    const trigger = ["desktop", "mobile"].map((l) => triggers.current.get(`${l}-${open}`)).find((el) => el?.offsetParent);
    trigger?.focus();
    setOpen(null);
  }, [open]);
  const step = useCallback(
    (delta: number) => setOpen((current) => (current === null ? null : (current + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      {/* Two copies of the rows (desktop / mobile grouping); the hidden one is display:none, so its
          photos are neither loaded nor read by screen readers. */}
      {(["desktop", "mobile"] as const).map((layout) => (
        <div
          key={layout}
          className={`flex flex-col gap-4 max-[768px]:gap-3 ${layout === "desktop" ? "max-[768px]:hidden" : "min-[769px]:hidden"}`}
        >
          {chunk(
            photos.map((photo, i) => ({ photo, i })),
            layout === "desktop" ? desktopRows(photos.length) : mobileRows(photos.length),
          ).map((row) => {
            const ratios = row.map(({ photo }) => photo.width / photo.height);
            const total = ratios.reduce((sum, r) => sum + r, 0);
            return (
              <div
                key={row[0].i}
                className="mx-auto flex w-full gap-4 max-[768px]:gap-3"
                style={{ maxWidth: `calc(${total} * ${MAX_H[layout]} + ${row.length - 1}rem)` }}
              >
                {row.map(({ photo, i }, j) => (
                  <button
                    key={photo.src}
                    ref={(el) => {
                      if (el) triggers.current.set(`${layout}-${i}`, el);
                      else triggers.current.delete(`${layout}-${i}`);
                    }}
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`Agrandir la photo ${i + 1} sur ${photos.length}`}
                    style={{ aspectRatio: `${photo.width} / ${photo.height}`, flex: `${ratios[j]} 1 0%` }}
                    className="group relative min-w-0 cursor-zoom-in overflow-hidden rounded-[18px] bg-[#f0f0f0] shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-[768px]:rounded-[14px]"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={layout === "desktop" ? "420px" : "50vw"}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photos du projet"
          onClick={(e) => e.target === e.currentTarget && close()}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-4 min-[641px]:p-16"
        >
          <Image
            key={photos[open].src}
            src={photos[open].src}
            alt={photos[open].alt}
            width={photos[open].width}
            height={photos[open].height}
            sizes="100vw"
            className="max-h-full w-auto max-w-full rounded-[10px] object-contain"
          />

          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[0.9rem] font-semibold text-white/80 tabular-nums">
            {open + 1} / {photos.length}
          </span>
          <button type="button" onClick={close} aria-label="Fermer" autoFocus className={`${control} top-4 right-4`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {photos.length > 1 && (
            <>
              <button type="button" onClick={() => step(-1)} aria-label="Photo précédente" className={`${control} left-4 top-1/2 -translate-y-1/2`}>
                <Arrow direction="left" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Photo suivante" className={`${control} right-4 top-1/2 -translate-y-1/2`}>
                <Arrow direction="right" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
