import Image from "next/image";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { PartnerLogos } from "@/components/contact/PartnerLogos";

export const metadata = pageMetadata({
  title: `Contact | ${site.name} — Vidéosurveillance et alarme`,
  description:
    "Contactez Alarme Occitanie pour votre projet de vidéosurveillance ou d'alarme à Montpellier. Devis gratuit. 04 11 93 95 06",
  path: "/contact",
});

// Copied from zozo's contact.html: the "UserGems-inspired" split layout (headline + benefits
// on the left, the contact form on the right). No FAQ, map or location/hours section is
// actually present on that page — those contact.css rules are unused leftovers — and the
// map already lives in the site-wide Footer, so nothing more is added below this section.
export default function ContactPage() {
  return (
    <div className="[line-height:normal]">
      {/* The navbar's desktop logo is white (made for the dark hero) and would vanish on this white
          background. A dark copy is laid exactly over it, like the legal pages do; purely visual. */}
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

      <section className="flex min-h-screen w-full items-stretch bg-white pt-[100px] max-[969px]:min-h-0 max-[768px]:pt-14 max-[601px]:pt-[90px]">
        <div className="flex w-full max-[969px]:flex-col">
          {/* Left column — value proposition */}
          <div className="flex w-1/2 items-center bg-white pt-16 pr-16 pb-20 pl-16 max-[1201px]:px-12 max-[1201px]:py-16 max-[969px]:w-full max-[969px]:px-8 max-[969px]:py-16 max-[601px]:px-6 max-[601px]:py-12">
            <ContactHero />
          </div>

          {/* Right column — contact form */}
          <div className="flex w-1/2 items-center justify-center bg-white pt-24 pr-12 pb-12 pl-12 max-[969px]:w-full max-[969px]:px-8 max-[969px]:pt-12 max-[969px]:pb-20 max-[601px]:px-6 max-[601px]:pt-8 max-[601px]:pb-16">
            <div className="w-full max-w-[650px]">
              <div className="relative rounded-[20px] border border-[#e0e0e0] bg-[#f8f9fa] p-12 shadow-[0_2px_10px_rgba(0,0,0,0.05)] max-[601px]:p-8">
                <ContactForm />
              </div>

              <PartnerLogos variant="mobile" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
