"use client";

import { Wrench, X } from "lucide-react";
import { BAR_CLOSED_KEY } from "./maintenance-bar-script";

// Temporary notice above the navbar (rename + site under construction). Its height is the CSS variable
// --bar-h (globals.css): <body>, the navbar and the desktop logos are offset by it ("maintenance bar").
// Closing it sets data-bar-closed on <html>, which hides it and sets --bar-h to 0 — remembered for next visits.
// To remove it for good: delete <MaintenanceBar /> and the inline script from layout.tsx, and set --bar-h to 0.
export function MaintenanceBar() {
  const close = () => {
    document.documentElement.setAttribute("data-bar-closed", "");
    try {
      localStorage.setItem(BAR_CLOSED_KEY, "1");
    } catch {}
  };

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[1100] flex h-(--bar-h) items-center justify-center gap-2 bg-gold pr-11 pl-4 text-center text-[0.8rem] leading-none font-semibold text-navy max-md:gap-1.5 max-md:pl-3 max-md:text-[0.7rem] [:root[data-bar-closed]_&]:hidden"
    >
      <Wrench aria-hidden="true" strokeWidth={2.25} className="size-3.5 shrink-0" />
      <p className="max-md:leading-[1.35]">
        ZOZO Sécurité est devenue Alarme Occitanie
        <span aria-hidden="true" className="mx-2 max-md:hidden">
          •
        </span>
        <br className="md:hidden" />
        Site en cours de construction
      </p>
      <button
        type="button"
        onClick={close}
        aria-label="Fermer le bandeau"
        className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-navy/10"
      >
        <X aria-hidden="true" strokeWidth={2.5} className="size-4" />
      </button>
    </div>
  );
}
