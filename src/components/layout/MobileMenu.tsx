"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { getOpenStatus } from "@/lib/hours";
import { isLive, mainLinks, serviceLinks } from "@/lib/navigation";

// Hamburger + half-screen slide-down drawer (mobile/tablet only).
export function MobileMenu() {
  // Only pages that exist are linked (see livePaths in src/lib/navigation.ts).
  const liveServices = serviceLinks.filter((l) => isLive(l.href));
  const liveMain = mainLinks.filter((l) => isLive(l.href));
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Status is time-dependent, so it is computed on the client when the drawer opens.
  const openMenu = () => {
    setStatus(getOpenStatus());
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!drawerRef.current?.contains(t) && !buttonRef.current?.contains(t)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const bar = "block h-[2.5px] w-6 rounded-sm bg-[#1a1a1a] transition-all duration-300";
  const item = `block border-b border-[#f0f0f0] py-3 font-urbanist text-base text-[#1a1a1a] transition-all duration-300 ${
    open ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"
  }`;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => (open ? close() : openMenu())}
        className="absolute top-1/2 right-6 z-20 flex -translate-y-1/2 cursor-pointer flex-col justify-center gap-[5px] p-1.5 [-webkit-tap-highlight-color:transparent] lg:hidden"
      >
        <span className={`${bar} ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
        <span className={`${bar} ${open ? "scale-x-0 opacity-0" : ""}`} />
        <span className={`${bar} ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
      </button>

      <div
        ref={drawerRef}
        id="menu-mobile"
        className={`fixed inset-x-0 top-0 z-0 flex max-h-[90dvh] flex-col overflow-y-auto rounded-b-2xl bg-white px-8 pt-20 pb-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)] transition-[transform,visibility] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          open ? "visible translate-y-0" : "invisible -translate-y-full"
        }`}
      >
        {liveServices.length > 0 && (
          <div>
            <button
              type="button"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
              className={`${item} flex w-full cursor-pointer items-center justify-between text-left`}
            >
              Services
              <span aria-hidden="true" className={`text-[0.6rem] text-[#999] transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden rounded-lg bg-[#f8f8f8] transition-all duration-300 ${
                servicesOpen ? "my-2 max-h-[420px] py-2" : "max-h-0"
              }`}
            >
              {liveServices.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={close}
                  tabIndex={servicesOpen ? undefined : -1}
                  className="block px-6 py-3 font-urbanist text-base text-[#555] transition-colors hover:text-gold-dark"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {liveMain.map((l) => (
          <Link key={l.href} href={l.href} onClick={close} className={item}>
            {l.label}
          </Link>
        ))}

        <a
          href={site.phone.href}
          aria-label={`Appeler au ${site.phone.display}`}
          className={`mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 font-urbanist font-semibold text-navy transition-all duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {site.phone.display}
        </a>

        <span aria-live="polite" className="mt-2 self-center">
          {status && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                status.open ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#fce8e8] text-[#c62828]"
              }`}
            >
              <span className={`size-[7px] shrink-0 rounded-full ${status.open ? "bg-[#4caf50]" : "bg-[#e53935]"}`} />
              {status.label}
            </span>
          )}
        </span>
      </div>
    </>
  );
}
