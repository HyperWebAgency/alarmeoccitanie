import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Fragment } from "react";
import { isLive, quoteHref, serviceLinks } from "@/lib/navigation";

// zozo's footer links to its own service pages by a fixed href; we resolve the matching
// route from the shared navigation data instead of duplicating the paths here.
function serviceHref(match: string) {
  return serviceLinks.find((s) => s.href.includes(match))!.href;
}

// Footer link lists. Only pages that exist are shown (see livePaths in src/lib/navigation.ts).
const navColumns = [
  [
    { href: "/", label: "Accueil" },
    { href: serviceHref("videosurveillance"), label: "Vidéosurveillance" },
    { href: serviceHref("interphone"), label: "Interphone" },
    { href: serviceHref("alarme"), label: "Alarme" },
  ],
  [
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ],
].map((column) => column.filter((l) => isLive(l.href)));

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/conditions-generales", label: "Conditions générales" },
  { href: "/plan-du-site", label: "Plan du site" },
].filter((l) => isLive(l.href));

const navLinkClass = "w-fit text-[0.9rem] text-[#333] no-underline transition-all duration-300 hover:pl-2 hover:text-gold-dark";
const legalLinkClass = "text-[0.85rem] text-[#666] no-underline transition-colors duration-300 hover:text-gold-dark";
const titleClass = "font-roboto mb-6 text-[1.1rem] font-bold text-[#333] max-[769px]:text-[1rem]";

// Site-wide footer, copied from zozo's "SEO Optimized Footer" (white theme) and rebranded.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e0e0e0] bg-white px-8 pt-16 pb-8 [line-height:normal] max-[769px]:px-6 max-[769px]:pt-12 max-[769px]:pb-6">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_1fr_1.2fr] gap-16 max-[769px]:grid-cols-1 max-[769px]:gap-12">
        {/* Left column: company info */}
        <div className="flex flex-col gap-6">
          <Image
            src="/images/logo/alarme-occitanie-logo.png"
            alt={`${site.name} vidéosurveillance Montpellier`}
            width={800}
            height={276}
            sizes="150px"
            className="h-[50px] w-auto self-start object-contain max-[769px]:h-[45px]"
          />
          <p className="m-0 text-[0.95rem] leading-[1.6] text-[#666] max-[769px]:text-[0.9rem]">
            Votre expert en vidéosurveillance et sécurité à Montpellier. Plus de 1000 installations réussies depuis
            20 ans.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={site.phone.href}
              className="flex items-center gap-3 text-[0.95rem] font-medium text-[#333] no-underline transition-colors duration-300 hover:text-gold-dark"
            >
              <svg className="size-5 shrink-0 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-[0.95rem] font-medium text-[#333] no-underline transition-colors duration-300 hover:text-gold-dark"
            >
              <svg className="size-5 shrink-0 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              {site.email}
            </a>
          </div>

          <Link
            href={quoteHref}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-[1.6rem] py-[0.8rem] text-[0.9rem] font-semibold text-navy shadow-[0_4px_14px_rgba(200,153,47,0.25)] transition-[background,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_6px_20px_rgba(200,153,47,0.35)]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] shrink-0">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Demander un devis gratuit
          </Link>
        </div>

        {/* Middle column: opening hours + navigation */}
        <div className="flex flex-col">
          <h3 className={titleClass}>Horaires d&apos;ouverture</h3>
          <div className="flex flex-col gap-4">
            {site.hours.display.map((h) => (
              <div key={h.days} className="flex flex-col gap-1">
                <span className="text-[0.9rem] font-semibold text-[#333]">{h.days}</span>
                <span className="text-[0.9rem] text-[#666]">{h.time}</span>
              </div>
            ))}
          </div>

          <h3 className={`${titleClass} mt-8`}>Navigation</h3>
          <div className="flex flex-wrap gap-12">
            {navColumns
              .filter((column) => column.length > 0)
              .map((column, i) => (
                <nav key={i} className="flex flex-col gap-3">
                  {column.map((l) => (
                    <Link key={l.href} href={l.href} className={navLinkClass}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
              ))}
          </div>
        </div>

        {/* Right column: map */}
        <div className="flex flex-col gap-4">
          <h3 className={titleClass}>Notre localisation</h3>
          <div className="overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <iframe
              src="https://www.google.com/maps?q=1+Place+Charles+de+Gaulle,+34170+Castelnau-le-Lez&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              title={`Localisation ${site.name} à Castelnau-le-Lez`}
              className="block h-[300px] w-full rounded-xl border-0 max-[769px]:h-[250px]"
            />
          </div>
          <p className="m-0 flex items-center gap-2 text-[0.9rem] text-[#666]">
            <svg className="size-5 shrink-0 text-gold-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Castelnau-le-Lez, Montpellier
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t border-[#e0e0e0] pt-8">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 max-[769px]:flex-col max-[769px]:gap-3 max-[769px]:text-center">
          <p className="m-0 text-[0.85rem] text-[#666]">
            &copy; {year} {site.name}. Tous droits réservés.
            <span aria-hidden="true" className="mx-2 text-[#d0d0d0] max-[769px]:hidden">
              &bull;
            </span>
            {/* Agency credit: opens in a new tab so the visitor's tab stays on the site. */}
            <span className="max-[769px]:mt-1 max-[769px]:block">
              Site web créé avec ❤️ par{" "}
              <a
                href="https://agencehyperweb.com/"
                target="_blank"
                rel="noopener"
                className="font-semibold text-[#666] transition-colors hover:text-gold-dark"
              >
                HyperWeb
              </a>
            </span>
          </p>
          <div className="flex items-center gap-4 max-[769px]:flex-col max-[769px]:gap-2">
            {legalLinks.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && <span className="text-[0.85rem] text-[#d0d0d0] max-[769px]:hidden">&bull;</span>}
                <Link href={l.href} className={legalLinkClass}>
                  {l.label}
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
