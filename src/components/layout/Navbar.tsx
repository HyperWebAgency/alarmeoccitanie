import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { mainLinks, offerLinks, quoteHref, serviceLinks, type NavIcon } from "@/lib/navigation";
import { MobileMenu } from "./MobileMenu";

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Menu icon in brand navy: either a Lucide component or one of our own SVGs (masked to the colour).
function MenuIcon({ icon: Icon }: { icon: NavIcon }) {
  if (typeof Icon === "string") {
    return (
      <span
        aria-hidden="true"
        style={{ maskImage: `url(${Icon})`, WebkitMaskImage: `url(${Icon})` }}
        className="size-9 shrink-0 bg-navy [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
      />
    );
  }
  return <Icon aria-hidden="true" strokeWidth={1.75} className="size-9 shrink-0 text-navy" />;
}

const navLink = "flex items-center gap-1 whitespace-nowrap text-[0.9rem] font-medium text-navy transition-colors hover:text-gold-dark";

export function Navbar() {
  return (
    <>
      {/* Desktop logo: absolute, not fixed, so it scrolls away with the top of the page. */}
      <Link href="/" className="absolute top-5 left-12 z-[1060] hidden lg:flex">
        <Image
          src="/images/logo/alarme-occitanie-logo-blanc.png"
          alt={`${site.name} - Alarme et vidéosurveillance Montpellier`}
          width={800}
          height={276}
          loading="eager"
          sizes="190px"
          className="h-[62px] w-auto"
        />
      </Link>

      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 top-0 z-[1050] flex items-center justify-between bg-white/95 px-6 py-2.5 lg:justify-end lg:bg-transparent lg:px-12 lg:py-5"
      >
        {/* Mobile logo (dark, on the white top bar). */}
        <Link href="/" className="relative z-10 flex lg:hidden">
          <Image
            src="/images/logo/alarme-occitanie-logo.png"
            alt={`${site.name} - Alarme et vidéosurveillance Montpellier`}
            width={800}
            height={276}
            loading="eager"
            sizes="110px"
            className="h-9 w-auto"
          />
        </Link>

        <div className="relative z-10 flex items-center lg:gap-6 lg:rounded-full lg:bg-white/95 lg:px-8 lg:py-2.5 lg:shadow-[0_2px_15px_rgba(0,0,0,0.08)] lg:backdrop-blur-[10px] xl:gap-8">
          {/* Services mega menu — opens on hover and on keyboard focus. The trigger spans the pill's full
              height and the panel hangs from the pill (not the button), so the hover never breaks. */}
          <div className="group hidden lg:-my-2.5 lg:flex lg:items-center lg:self-stretch">
            <button
              type="button"
              aria-haspopup="true"
              className={`${navLink} cursor-pointer group-focus-within:text-gold-dark group-hover:text-gold-dark`}
            >
              Services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="absolute top-full right-0 hidden w-[min(1180px,calc(100vw-6rem))] pt-4 group-focus-within:block group-hover:block">
              <div className="max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-[28px] bg-white px-10 pt-9 pb-10 shadow-[0_20px_60px_rgba(14,34,56,0.15)]">
                <p className="flex items-center gap-3 text-[1.45rem] font-semibold tracking-[0.5px] text-navy uppercase">
                  <Image src="/images/logo/alarme-occitanie-anneau.svg" alt="" width={22} height={22} className="size-[22px]" />
                  Services
                </p>
                <ul className="mt-7 grid grid-cols-3 gap-x-8 gap-y-8 xl:grid-cols-4">
                  {serviceLinks.map(({ href, label, description, icon }) => (
                    <li key={href}>
                      <Link href={href} className="group/item flex gap-3.5">
                        <MenuIcon icon={icon} />
                        <span>
                          <span className="block text-[1rem] font-semibold text-navy transition-colors group-hover/item:text-gold-dark">
                            {label}
                          </span>
                          <span className="mt-1.5 block text-[0.85rem] leading-[1.55] text-[#5b6472]">{description}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className="mt-11 flex items-center gap-3 text-[1.45rem] font-semibold tracking-[0.5px] text-navy uppercase">
                  <Image src="/images/logo/alarme-occitanie-anneau.svg" alt="" width={22} height={22} className="size-[22px]" />
                  Nos offres
                </p>
                <ul className="mt-6 grid grid-cols-3 gap-x-8 xl:grid-cols-4">
                  {offerLinks.map(({ href, label, icon }) => (
                    <li key={label}>
                      <Link href={href} className="group/item flex items-center gap-3.5">
                        <MenuIcon icon={icon} />
                        <span className="text-[1rem] font-semibold text-navy transition-colors group-hover/item:text-gold-dark">
                          {label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href} className={`${navLink} hidden lg:flex`}>
              {l.label}
            </Link>
          ))}

          <div aria-hidden="true" className="hidden h-5 w-px bg-navy/15 lg:block" />

          <a href={site.phone.href} className="group hidden items-center gap-1.5 whitespace-nowrap text-navy lg:flex">
            <PhoneIcon className="size-[18px] text-gold" />
            <span className="sr-only xl:not-sr-only xl:flex xl:flex-col xl:leading-[1.15]">
              <span className="text-[0.85rem] font-semibold transition-colors group-hover:text-gold-dark">
                {site.phone.display}
              </span>
              <span className="text-[0.66rem] font-medium tracking-[0.2px] opacity-85">Service &amp; appel gratuit</span>
            </span>
          </a>

          <Link
            href={quoteHref}
            className="mr-10 rounded-full bg-gold px-4 py-2 text-[0.8rem] font-semibold whitespace-nowrap text-navy transition-all duration-300 max-[381px]:px-3 max-[381px]:py-1.5 max-[381px]:text-[0.65rem] lg:mr-0 lg:px-7 lg:py-3 lg:text-[0.9rem] lg:hover:-translate-y-0.5 lg:hover:bg-gold-light lg:hover:shadow-[0_4px_15px_rgba(200,153,47,0.4)]"
          >
            Obtenir mon devis
          </Link>
        </div>

        <MobileMenu />
      </nav>
    </>
  );
}
