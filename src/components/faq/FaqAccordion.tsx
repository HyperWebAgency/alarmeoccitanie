"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { FaqItem } from "@/lib/faq";

// Chevron icon, rotated 180° while its item is open — same feather "chevron-down" path as zozo.
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-6 shrink-0 text-[#666] transition-transform duration-400 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
        open ? "[transform:rotate(180deg)]" : ""
      }`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Accordion shared by the homepage FAQ and the project pages. Behaviour matches zozo's alarm.js: one item
// open at a time (opening one closes the others), none open by default. The answer stays in the DOM at all
// times — only its max-height is animated — so the server HTML always has the full text for Google.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idBase = useId();

  return (
    <div className="flex flex-col gap-4">
    {items.map((item, i) => {
      const open = openIndex === i;
      const questionId = `${idBase}-q-${i}`;
      const answerId = `${idBase}-a-${i}`;
      return (
        <div key={item.question} className="border-b border-[#e0e0e0]">
          <button
            type="button"
            id={questionId}
            aria-expanded={open}
            aria-controls={answerId}
            onClick={() => setOpenIndex(open ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-6 text-left text-[1.1rem] font-semibold text-[#333] transition-colors duration-300 hover:text-gold-dark max-[769px]:py-5 max-[769px]:text-[1rem]"
          >
            <span className="flex-1">{item.question}</span>
            <ChevronIcon open={open} />
          </button>
          <div
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            className={`overflow-hidden transition-[max-height,padding-bottom] duration-500 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${
              open ? "max-h-[800px] pb-6" : "max-h-0 pb-0"
            }`}
          >
            {/* Capped so the line length stays readable even where the grid column widens (min-[1600px]:). */}
            <p className="text-[1rem] leading-[1.7] text-[#666] max-[769px]:text-[0.95rem] min-[1600px]:max-w-[720px]">{item.answer}</p>
            {item.cta && (
              <Link
                href={item.cta.href}
                // Collapsed items keep this in the DOM (for the max-height animation) but out of
                // the tab order, so keyboard users can't tab into a button they can't see.
                tabIndex={open ? undefined : -1}
                className="mt-4 inline-flex items-center rounded-full bg-gold px-6 py-[0.7rem] text-[0.9rem] font-semibold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_4px_15px_rgba(200,153,47,0.4)]"
              >
                {item.cta.label}
              </Link>
            )}
          </div>
        </div>
      );
    })}    </div>
  );
}
