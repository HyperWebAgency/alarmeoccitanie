import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DarkLogoOverlay } from "@/components/layout/DarkLogoOverlay";
import { CalendarIcon, PinIcon } from "@/components/home/Realisations";
import { ProjectGallery } from "@/components/realisations/ProjectGallery";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { quoteHref } from "@/lib/navigation";
import { publishedRealisations, realisationHref } from "@/lib/realisations";
import { site } from "@/lib/site";

// One page per client project (template). Content lives in src/lib/realisations.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedRealisations.map((r) => ({ slug: r.slug }));
}

const getProject = (slug: string) => publishedRealisations.find((r) => r.slug === slug);

export async function generateMetadata({ params }: PageProps<"/realisations/[slug]">) {
  const project = getProject((await params).slug);
  if (!project?.page) return {};
  return pageMetadata({
    title: project.page.metaTitle,
    description: project.page.metaDescription,
    path: realisationHref(project.slug),
  });
}

const label = "text-[0.75rem] font-semibold tracking-[1.5px] text-[#888] uppercase";
const h2 = "mb-4 border-l-4 border-gold pl-[0.85rem] text-[1.25rem] leading-[1.3] font-bold text-[#1a1a1a]";

export default async function RealisationPage({ params }: PageProps<"/realisations/[slug]">) {
  const project = getProject((await params).slug);
  if (!project?.page) notFound();
  const { page } = project;
  const photos = [project.image, ...page.photos];

  return (
    <main className="leading-[1.65] text-[#333]">
      <DarkLogoOverlay />

      <section className="border-b border-[#eee] px-[1.2rem] pt-[5.5rem] pb-6 text-center min-[769px]:px-8 min-[769px]:pt-28 min-[769px]:pb-8">
        <span className="mb-[0.6rem] inline-block text-[0.75rem] font-semibold tracking-[3px] text-gold-dark uppercase">
          Réalisation
        </span>
        <h1 className="mx-auto max-w-[900px] font-poppins text-[1.6rem] leading-[1.2] font-bold text-[#1a1a1a] min-[769px]:text-[2.2rem] min-[1600px]:max-w-[1050px]">
          {project.title}
        </h1>
        <Breadcrumb
          items={[
            { label: "Accueil", href: "/" },
            { label: "Réalisations", href: "/#realisations" },
            { label: project.city },
          ]}
          className="mt-3 [&_ol]:justify-center"
        />
      </section>

      <div className="mx-auto max-w-[1100px] px-[1.3rem] pt-8 pb-16 min-[769px]:px-8 min-[769px]:pt-10 min-[1600px]:max-w-[1250px] min-[2200px]:max-w-[1350px]">
        {/* The photos are the heart of the page. */}
        <ProjectGallery photos={photos} />

        {/* Past 1600px the extra room goes to the aside (facts + brand logos, not body text):
            the text column's fraction shrinks so its line length stays roughly the same. */}
        <div className="mt-10 grid gap-10 min-[900px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] min-[900px]:gap-14 min-[1600px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[1600px]:gap-16">
          <div>
            <p className="text-[1.05rem] text-[#555]">{page.intro}</p>

            <h2 className={`${h2} mt-10`}>Le besoin du client</h2>
            <p className="text-[0.97rem] text-[#555]">{page.besoin}</p>

            <h2 className={`${h2} mt-10`}>Notre intervention</h2>
            <ul className="ml-6 list-disc text-[0.97rem] text-[#555] [&_li::marker]:text-gold">
              {page.intervention.map((step) => (
                <li key={step} className="mb-[0.55rem] pl-[0.2rem]">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-[18px] bg-[#f8f9fa] p-6 min-[1600px]:p-8">
            {/* Project facts. */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-[0.95rem] max-[480px]:grid-cols-1">
              <div>
                <dt className={label}>Client</dt>
                <dd className="mt-1 font-semibold text-[#1a1a1a]">{page.client}</dd>
              </div>
              <div>
                <dt className={label}>Année</dt>
                <dd className="mt-1 flex items-center gap-2 font-semibold text-[#1a1a1a]">
                  <CalendarIcon />
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className={label}>Lieu</dt>
                <dd className="mt-1 flex items-center gap-2 font-semibold text-gold-dark">
                  <PinIcon />
                  {project.location}
                </dd>
              </div>
              <div>
                <dt className={label}>Prestations</dt>
                <dd className="mt-1 font-semibold text-[#1a1a1a]">{project.tags.join(", ")}</dd>
              </div>
            </dl>

            <p className={`${label} mt-7 border-t border-[#e5e7eb] pt-6`}>Marques installées</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {page.brands.map((brand) => (
                <li
                  key={brand.name}
                  className="flex h-14 min-w-[120px] items-center justify-center rounded-xl border-[1.5px] border-[#e2e2e2] bg-white px-5 min-[1600px]:h-16 min-[1600px]:min-w-[135px]"
                >
                  {brand.logo ? (
                    <Image
                      src={brand.logo.src}
                      alt={brand.name}
                      width={brand.logo.width}
                      height={brand.logo.height}
                      className="h-6 w-auto max-w-[110px] object-contain"
                    />
                  ) : (
                    <span className="font-poppins text-[1.05rem] font-bold tracking-[0.5px] text-[#1a1a1a]">{brand.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Questions about this project. */}
        {page.faq && page.faq.length > 0 && (
          <section className="mt-14 max-w-[820px]">
            <JsonLd data={faqSchema(page.faq)} />
            <h2 className={h2}>Questions sur ce projet</h2>
            <FaqAccordion items={page.faq} />
          </section>
        )}

        {/* Call to action. */}
        <section className="mt-14 rounded-[18px] bg-navy px-6 py-10 text-center text-white min-[769px]:px-12">
          <h2 className="font-poppins text-[1.5rem] leading-[1.25] font-bold min-[769px]:text-[1.8rem]">
            Vous avez un projet similaire ?
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-white/80">
            Alarme, vidéosurveillance, interphone : nous étudions votre besoin et vous envoyons un devis gratuit.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={quoteHref}
              className="rounded-full bg-gold px-7 py-3 font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_4px_15px_rgba(200,153,47,0.4)]"
            >
              Obtenir mon devis
            </Link>
            <a
              href={site.phone.href}
              className="rounded-full border-2 border-white/30 px-7 py-[0.65rem] font-semibold transition-colors hover:border-gold hover:text-gold"
            >
              {site.phone.display}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
