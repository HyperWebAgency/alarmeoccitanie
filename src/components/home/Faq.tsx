import Link from "next/link";
import { quoteHref } from "@/lib/navigation";
import { faqItems } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

// "Questions fréquentes" — ported from zozo's per-page faq-section (alarme/installation-alarme-montpellier.html:
// faq-section > faq-container > faq-left (sticky title/CTA) + faq-right (accordion, see FaqAccordion).
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-32 bg-white px-8 py-20 [line-height:normal] max-[769px]:px-4 max-[769px]:py-12">
      <JsonLd data={faqSchema(faqItems)} />

      <div className="mx-auto grid max-w-[1400px] grid-cols-[350px_1fr] items-start gap-16 max-[769px]:grid-cols-1 max-[769px]:gap-8 min-[1600px]:max-w-[1600px] min-[1600px]:grid-cols-[420px_1fr]">
        {/* Left: sticky title + CTA (desktop only — static on mobile, like zozo). */}
        <div className="sticky top-[150px] max-[769px]:static">
          <span className="mb-3 block text-[0.75rem] font-bold tracking-[2px] text-gold-dark uppercase">
            Questions fréquentes
          </span>
          <h2 className="font-poppins text-[2.5rem] leading-[1.2] font-bold text-[#1a1a1a] max-[769px]:text-[1.8rem] min-[1600px]:text-[2.75rem]">
            Une <span className="text-gold-dark">question</span> ?
          </h2>
          <p className="mt-4 mb-8 text-[1.1rem] leading-[1.5] text-[#666] max-[769px]:mb-6 max-[769px]:text-[1rem]">
            D&apos;autres clients se la sont peut-être déjà posée.
          </p>
          <Link
            href={quoteHref}
            className="font-semibold text-[#2d2d2d] underline transition-colors duration-300 hover:text-gold-dark"
          >
            Contactez-nous
          </Link>
        </div>

        {/* Right: accordion. */}
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
}
