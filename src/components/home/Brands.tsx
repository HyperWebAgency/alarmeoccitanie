import Image from "next/image";

type Logo = { src: string; alt: string; width: number; height: number };

// Left column, scrolling up. Sizes = actual file dimensions after downscale (2x displayed size).
const columnUp: Logo[] = [
  { src: "/images/brands/hikvision.webp", alt: "Hikvision vidéosurveillance Montpellier", width: 320, height: 63 },
  { src: "/images/brands/dahua.webp", alt: "Dahua caméra surveillance Montpellier", width: 262, height: 80 },
  { src: "/images/brands/ajax.webp", alt: "Ajax alarme Montpellier", width: 320, height: 71 },
  { src: "/images/brands/bosch.webp", alt: "Bosch système sécurité Montpellier", width: 320, height: 71 },
  { src: "/images/brands/honeywell.webp", alt: "Honeywell alarme intrusion Montpellier", width: 320, height: 66 },
  { src: "/images/brands/axis-communications.webp", alt: "Axis Communications sécurité Montpellier", width: 222, height: 80 },
  { src: "/images/brands/vanderbilt.webp", alt: "Vanderbilt alarme Montpellier", width: 317, height: 80 },
];

// Right column, scrolling down.
const columnDown: Logo[] = [
  { src: "/images/brands/visonic.webp", alt: "Visonic alarme sans fil Montpellier", width: 320, height: 64 },
  { src: "/images/brands/optex.webp", alt: "Optex détection extérieure Montpellier", width: 192, height: 80 },
  { src: "/images/brands/2n.webp", alt: "2N interphonie Montpellier", width: 169, height: 80 },
  { src: "/images/brands/neutronic.webp", alt: "Neutronic détection incendie Montpellier", width: 301, height: 80 },
  { src: "/images/brands/izyx.webp", alt: "Izyx contrôle accès Montpellier", width: 221, height: 80 },
  { src: "/images/brands/intratone.webp", alt: "Intratone interphonie Montpellier", width: 320, height: 56 },
  { src: "/images/brands/eden-innovations.webp", alt: "Eden Innovations sécurité Montpellier", width: 169, height: 80 },
];

// 3 copies per column so the loop can scroll exactly one copy (33.33%) and repeat seamlessly.
const sets = [0, 1, 2];

function LogoColumn({ logos, direction }: { logos: Logo[]; direction: "up" | "down" }) {
  const scrollClass = direction === "up" ? "animate-brands-scroll-up" : "animate-brands-scroll-down";

  return (
    <div className="h-[500px] shrink-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-[1001px]:h-[350px] max-[1001px]:flex-[1_1_calc(50%-0.5rem)]">
      <div
        className={`flex flex-col gap-6 ${scrollClass} hover:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {sets.map((set) =>
          logos.map((logo) => (
            <div
              key={`${set}-${logo.src}`}
              className="flex min-h-[70px] min-w-[220px] items-center justify-center rounded-xl bg-white px-10 py-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] max-[1001px]:min-h-[55px] max-[1001px]:min-w-[150px] max-[1001px]:px-6 max-[1001px]:py-4"
            >
              <Image
                src={logo.src}
                alt={set === 0 ? logo.alt : ""}
                aria-hidden={set > 0 || undefined}
                width={logo.width}
                height={logo.height}
                className="h-10 w-auto max-w-40 object-contain max-[1001px]:h-[30px] max-[1001px]:max-w-[120px]"
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

// "Les marques qu'on maîtrise" — scrolling logo columns either side of the copy, copied
// from zozo's video-surveillance page (the brand to exclude per the brief isn't present
// in this block to begin with — see final report).
export function Brands() {
  return (
    <section className="bg-white px-16 py-20 [line-height:normal] max-[1001px]:px-6 max-[1001px]:py-12">
      <div className="mx-auto flex max-w-[1200px] items-center gap-16 max-[1001px]:flex-wrap max-[1001px]:justify-center max-[1001px]:gap-x-4 max-[1001px]:gap-y-8 max-[1001px]:text-center">
        <LogoColumn logos={columnUp} direction="up" />

        <div className="min-w-[280px] flex-1 text-center max-[1001px]:order-[-1] max-[1001px]:min-w-0 max-[1001px]:flex-[1_1_100%]">
          <span className="mb-3 block text-[0.75rem] font-bold tracking-[2px] text-gold-dark uppercase">
            NOS PARTENAIRES
          </span>
          <h2 className="mb-6 font-poppins text-[2.2rem] leading-[1.2] font-bold tracking-[-0.5px] text-[#1a1a1a] max-[1001px]:text-[1.5rem]">
            Les marques qu&apos;on <span className="font-bold text-gold-dark">maîtrise</span>
          </h2>
          <p className="text-[0.95rem] leading-[1.7] text-[#666]">
            Nous travaillons exclusivement avec les leaders du secteur de la sécurité. De la vidéosurveillance
            Hikvision et Dahua aux systèmes d&apos;alarme Ajax, chaque marque est sélectionnée pour sa fiabilité et
            ses performances.
          </p>
        </div>

        <LogoColumn logos={columnDown} direction="down" />
      </div>
    </section>
  );
}
