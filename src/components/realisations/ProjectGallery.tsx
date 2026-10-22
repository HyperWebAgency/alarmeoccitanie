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

// Bare chevrons on each side of the photos (no circle): big and dark so they're obvious, gold on hover.
const arrowButton =
  "flex h-20 w-14 shrink-0 cursor-pointer items-center justify-center text-navy transition-colors duration-200 disabled:cursor-default disabled:opacity-20 pointer-fine:enabled:hover:text-gold-dark max-[768px]:h-16 max-[768px]:w-8";

// `hidden` (everything fits): the arrow keeps its space so the photos don't shift once it's measured.
function ArrowButton({ direction, onClick, disabled, hidden }: { direction: 1 | -1; onClick: () => void; disabled: boolean; hidden: boolean }) {
  return (
    <button
      type="button"
      aria-label={direction === -1 ? "Photo précédente" : "Photo suivante"}
      onClick={onClick}
      disabled={disabled}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`${arrowButton} ${hidden ? "invisible" : ""}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-14 max-[768px]:size-9">
        <path d={direction === -1 ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

// Project photos (3 to 6 per project) in a carousel: 3 photos visible on desktop, one large photo with the
// next one peeking on mobile. The arrows on each side (or a swipe) move one photo at a time; they only show
// when there are more photos than fit. Photos are never cropped (all are 3:4 and keep their own shape).
// The photos area is as wide as 3 photos at the --gallery-max-h height (globals.css raises it on big screens).
// Clicking a photo opens it full screen; arrows / keyboard / Escape to browse and close.
export function ProjectGallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [edges, setEdges] = useState({ prev: false, next: false });
  const trackRef = useRef<HTMLUListElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  // Which arrows are usable, from the track's scroll position (both false = everything fits).
  const updateEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const prev = track.scrollLeft > 2;
    const next = track.scrollLeft + track.clientWidth < track.scrollWidth - 2;
    setEdges((e) => (e.prev === prev && e.next === next ? e : { prev, next }));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateEdges();
    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateEdges]);

  // One photo per click: a photo's width plus the gap between photos.
  const scrollByPhoto = (direction: 1 | -1) => {
    const track = trackRef.current;
    const photo = track?.firstElementChild as HTMLElement | null;
    if (!track || !photo) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (photo.offsetWidth + gap), behavior: "smooth" });
  };

  // Focus goes back to the photo that was opened (focusing it also scrolls it into view).
  const close = useCallback(() => {
    if (open !== null) triggers.current[open]?.focus();
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
      <div
        className="mx-auto flex items-center justify-center gap-2 max-[768px]:gap-1"
        style={{ maxWidth: "calc(3 * 0.75 * var(--gallery-max-h, 400px) + 2rem + 2 * 4rem)" }}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Photos du chantier"
      >
        <ArrowButton direction={-1} onClick={() => scrollByPhoto(-1)} disabled={!edges.prev} hidden={!edges.prev && !edges.next} />

        <div className="@container min-w-0 flex-1">
          {/* w-max + max-w-full: centred when every photo fits, scrollable when they don't. */}
          <ul
            ref={trackRef}
            onScroll={updateEdges}
            className="mx-auto flex w-max max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-4 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] max-[768px]:gap-3 [&::-webkit-scrollbar]:hidden"
          >
            {photos.map((photo, i) => (
              <li
                key={photo.src}
                className="w-[calc((100cqw-2rem)/3)] shrink-0 snap-start max-[768px]:w-[78cqw]"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <button
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Agrandir la photo ${i + 1} sur ${photos.length}`}
                  className="group relative block size-full cursor-zoom-in overflow-hidden rounded-[18px] bg-[#f0f0f0] shadow-[0_8px_30px_rgba(0,0,0,0.08)] max-[768px]:rounded-[14px]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    preload={i === 0}
                    sizes="(max-width: 768px) 78vw, 420px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ArrowButton direction={1} onClick={() => scrollByPhoto(1)} disabled={!edges.next} hidden={!edges.prev && !edges.next} />
      </div>

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
