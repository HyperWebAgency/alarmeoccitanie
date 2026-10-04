"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

// width/height = the box each logo is displayed in on zozo (max 120×50, ratio kept).
const clients = [
  { src: "/images/clients/sephora.svg", name: "Sephora", width: 120, height: 16 },
  { src: "/images/clients/lidl.webp", name: "Lidl", width: 51, height: 50 },
  { src: "/images/clients/aldi.webp", name: "Aldi", width: 48, height: 50 },
  { src: "/images/clients/bvlgari.svg", name: "Bvlgari", width: 120, height: 13 },
  { src: "/images/clients/aramis-auto.webp", name: "Aramis Auto", width: 78, height: 50 },
  { src: "/images/clients/but.webp", name: "BUT", width: 50, height: 50 },
  { src: "/images/clients/le-kiosque-a-pizza.svg", name: "Le Kiosque à Pizza", width: 101, height: 50 },
  { src: "/images/clients/foussier.webp", name: "Foussier", width: 50, height: 50 },
  { src: "/images/clients/ciblex.webp", name: "Ciblex", width: 120, height: 25 },
];

// The track holds 3 copies of the logos and slides by one copy per loop (seamless up to ~3300px wide).
const copies = [0, 1, 2];

const highlight = "rounded-[4px] bg-gold/25 px-2 py-[0.2rem] font-semibold text-navy";

export function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Desktop hover eases the scroll down to 25% speed, then back to 100% on leave.
  const easeSpeedTo = (target: number) => {
    if (!window.matchMedia("(min-width: 769px)").matches) return;
    const anim = trackRef.current?.getAnimations()[0];
    if (!anim) return;
    cancelAnimationFrame(rafRef.current);
    const step = () => {
      const rate = anim.playbackRate + (target - anim.playbackRate) * 0.08;
      anim.playbackRate = Math.abs(target - rate) < 0.005 ? target : rate;
      if (anim.playbackRate !== target) rafRef.current = requestAnimationFrame(step);
    };
    step();
  };

  return (
    <section
      id="confiance"
      className="overflow-hidden bg-[#f8f9fa] px-8 py-6 text-center [line-height:normal] max-md:px-4 max-md:py-8"
    >
      <p className="mb-4 text-[1.25rem] text-[#333] max-md:text-[1rem]">
        <span className="text-[1.4rem] font-bold max-md:text-[1.2rem]">+1000</span>{" "}
        <span className={highlight}>particuliers</span> et <span className={highlight}>professionnels</span> nous font
        confiance
      </p>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => easeSpeedTo(0.25)}
        onMouseLeave={() => easeSpeedTo(1)}
      >
        <div
          ref={trackRef}
          className="flex w-max animate-trust-marquee max-[769px]:[animation-duration:23s] max-md:[animation-duration:19s] motion-reduce:animate-none"
        >
          {copies.map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy > 0 || undefined}
              className="flex shrink-0 gap-16 pr-16 max-md:gap-8 max-md:pr-8"
            >
              {clients.map((c) => (
                <li key={c.src} className="flex h-[60px] min-w-[120px] shrink-0 items-center justify-center">
                  <Image
                    src={c.src}
                    alt={copy === 0 ? `Logo ${c.name}, client ${site.name}` : ""}
                    width={c.width}
                    height={c.height}
                    style={{ width: c.width, height: c.height }}
                    className="object-contain opacity-85 transition-all duration-300 ease-[ease] hover:scale-105 hover:opacity-100"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
