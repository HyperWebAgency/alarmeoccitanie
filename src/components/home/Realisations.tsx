import Image from "next/image";
import Link from "next/link";
import { realisationHref, realisations } from "@/lib/realisations";

// Our own SVG icons (public/images/icons), masked so they take the colour of the surrounding text.
function MaskIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
      className="size-5 shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
    />
  );
}

export const CalendarIcon = () => <MaskIcon src="/images/icons/calendar.svg" />;
export const PinIcon = () => <MaskIcon src="/images/icons/localisation.svg" />;

// "Nos dernières réalisations" — real client projects, ported from zozo's `projets-clients` grid.
// Projects are listed in src/lib/realisations.ts; a card gets a « Voir le projet » button when it has a page.
export function Realisations() {
  return (
    <section id="realisations" className="scroll-mt-32 bg-white px-8 py-20 [line-height:normal] max-[640px]:px-[1.2rem] max-[640px]:py-14">
      <div className="mx-auto mb-12 max-w-[640px] text-center">
        <span className="mb-3 block text-[0.85rem] font-bold tracking-[4px] text-gold-dark uppercase">Travaux</span>
        <h2 className="font-poppins text-[2.5rem] leading-[1.15] font-bold text-[#1a1a1a] max-[640px]:text-[1.9rem]">
          Nos dernières <span className="text-gold-dark">réalisations</span>
        </h2>
        <p className="mt-4 text-[1.05rem] leading-[1.6] text-[#666]">
          Découvrez les projets de sécurité que nous réalisons pour nos clients, particuliers et professionnels.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-8 max-[968px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-6 min-[1600px]:max-w-[1500px] min-[1600px]:gap-10 min-[2200px]:max-w-[1680px]">
        {realisations.map((project) => (
          <article
            key={project.slug}
            className="flex flex-col overflow-hidden rounded-[18px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-gradient-to-br from-[#f0f0f0] to-[#e4e4e4]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 400px"
                style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6 pb-[1.8rem]">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-[0.45rem] rounded-lg border-[1.5px] border-[#e2e2e2] bg-white px-[0.85rem] py-[0.38rem] text-[0.68rem] font-semibold tracking-[0.5px] text-[#1a1a1a] uppercase"
                  >
                    <span className="size-1.5 shrink-0 rounded-full bg-gold" />
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-[1.25rem] leading-[1.3] font-bold text-[#1a1a1a] min-[1600px]:text-[1.4rem]">{project.title}</h3>

              <div className="mt-auto flex flex-col gap-[0.6rem]">
                <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-[#666]">
                  <CalendarIcon />
                  {project.year}
                </span>
                <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-gold-dark">
                  <PinIcon />
                  {project.location}
                </span>
              </div>

              {project.page && (
                <Link
                  href={realisationHref(project.slug)}
                  aria-label={`Voir le projet : ${project.title}`}
                  className="mt-2 inline-flex items-center gap-2 self-start rounded-full bg-gold px-6 py-[0.7rem] text-[0.9rem] font-semibold text-navy transition-colors duration-300 hover:bg-gold-light"
                >
                  Voir le projet
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
