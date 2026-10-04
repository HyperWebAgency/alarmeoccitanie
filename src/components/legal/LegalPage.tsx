import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

// "alarmeoccitanie.fr" — the site name as written in the legal texts.
export const siteDomain = new URL(site.url).host.replace(/^www\./, "");

// One-line postal address, e.g. "1 Place Charles de Gaulle, 34170 Castelnau-le-Lez".
export const postalAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

// Inline link inside the legal text (gold-dark: gold text on white fails contrast).
export const legalLink = "text-gold-dark hover:text-navy";

// Text styles of the old site's `.legal-content` (css/mentions-legales.css), applied to the page's children.
const content = [
  "[&_p]:mb-[1.1rem] [&_p]:text-[0.97rem] [&_p]:text-[#555]",
  "[&_h2]:mt-10 [&_h2]:mb-[0.9rem] [&_h2]:border-l-4 [&_h2]:border-gold [&_h2]:pl-[0.85rem] [&_h2]:text-[1.2rem] [&_h2]:leading-[1.3] [&_h2]:font-bold [&_h2]:text-[#1a1a1a] min-[769px]:[&_h2]:text-[1.35rem]",
  "[&_h2:first-of-type]:mt-0",
  "[&_strong]:text-[#1a1a1a]",
  "[&_ul]:mb-[1.1rem] [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:text-[0.97rem] [&_ul]:text-[#555]",
  "[&_li]:mb-[0.55rem] [&_li]:pl-[0.2rem] [&_li::marker]:text-gold",
  "[&_em]:text-[0.9rem] [&_em]:text-[#888] [&_em]:italic",
].join(" ");

// Shared page structure of the old site's legal pages: white title band + 820px text column + back button.
export function LegalPage({
  eyebrow,
  title,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  breadcrumb: string;
  children: ReactNode;
}) {
  return (
    <div className="leading-[1.65] text-[#333]">
      {/* The navbar's desktop logo is white (made for the dark hero) and would vanish on this white band.
          A dark copy is laid exactly over it; purely visual, clicks still go to the navbar. */}
      <Image
        src="/images/logo/alarme-occitanie-logo.png"
        alt=""
        aria-hidden="true"
        width={800}
        height={276}
        loading="eager"
        sizes="190px"
        className="pointer-events-none absolute top-5 left-12 z-[1070] hidden h-[62px] w-auto lg:block"
      />

      <section className="border-b border-[#eee] px-[1.2rem] pt-[5.5rem] pb-6 text-center min-[769px]:px-8 min-[769px]:pt-28 min-[769px]:pb-8">
        <span className="mb-[0.6rem] inline-block text-[0.75rem] font-semibold tracking-[3px] text-gold-dark uppercase">
          {eyebrow}
        </span>
        <h1 className="text-[1.8rem] leading-[1.15] font-bold text-[#1a1a1a] min-[769px]:text-[2.4rem]">{title}</h1>
        <p className="mt-3 text-[0.9rem] text-[#999]">
          <Link href="/" className="text-[#666] hover:text-gold-dark">
            Accueil
          </Link>{" "}
          &nbsp;›&nbsp; {breadcrumb}
        </p>
      </section>

      <main
        className={`mx-auto max-w-[820px] px-[1.3rem] pt-10 pb-16 min-[769px]:px-8 min-[769px]:pt-16 min-[769px]:pb-20 ${content}`}
      >
        {children}

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-[50px] bg-gold px-[1.8rem] py-[0.85rem] text-[0.95rem] font-bold text-navy transition-all duration-[250ms] ease-[ease] hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_6px_20px_rgba(200,153,47,0.35)]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </main>
    </div>
  );
}
