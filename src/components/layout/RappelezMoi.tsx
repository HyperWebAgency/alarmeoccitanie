"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { readCallback, type CallbackState } from "@/lib/callback";
import { submitToFormspree } from "@/lib/formspree";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { site } from "@/lib/site";
import { CallbackFormFields, phonePath, useCallbackForm, withNetworkGuard } from "@/components/forms/CallbackForm";
import { OpenStatusBadge } from "@/components/forms/OpenStatusBadge";

// "Rappelez-moi" form: posts the callback request straight to Formspree from the browser.
async function requestCallback(_prev: CallbackState, formData: FormData): Promise<CallbackState> {
  // Honeypot: a hidden field only bots fill in. Pretend it worked and send nothing.
  if (formData.get("_gotcha")) return { status: "success" };

  const { nom, tel, besoin } = readCallback(formData);
  return submitToFormspree({
    _subject: "Demande de rappel – site Alarme Occitanie",
    Formulaire: "Rappelez-moi",
    "Nom et prénom": nom.trim(),
    Téléphone: tel.trim(),
    Besoin: besoin.trim(),
    _gotcha: "",
  });
}

const submitCallback = withNetworkGuard(requestCallback);

// Fixed "RAPPELEZ-MOI" tab on the right edge + callback form popup (every page).
export function RappelezMoi() {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const form = useCallbackForm(submitCallback);
  const { state } = form;
  const tabRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Opening hours status is time-dependent, so it is computed when the popup opens.
  const openModal = () => {
    flushSync(() => {
      setOpenStatus(getOpenStatus());
      setOpen(true);
    });
    modalRef.current?.focus();
  };

  const closeModal = () => {
    setOpen(false);
    tabRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        tabRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={tabRef}
        type="button"
        aria-label="Être rappelé par un expert"
        aria-haspopup="dialog"
        onClick={openModal}
        className="fixed top-1/2 right-0 z-[1200] flex -translate-y-1/2 cursor-pointer items-center gap-2 rounded-[10px_0_0_10px] bg-gold [padding:1.1rem_0.55rem] text-[0.8rem] font-bold tracking-[1.5px] text-navy uppercase [line-height:normal] shadow-[-2px_2px_12px_rgba(0,0,0,0.2)] transition-[background-color,padding] duration-250 ease-[ease] [writing-mode:vertical-rl] [text-orientation:mixed] [-webkit-tap-highlight-color:transparent] hover:bg-gold-light hover:[padding-right:0.8rem] max-md:gap-1.5 max-md:rounded-[8px_0_0_8px] max-md:[padding:0.55rem_0.375rem] max-md:text-[0.625rem] max-md:tracking-[0.6px] max-md:hover:[padding-right:0.6rem]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 rotate-90 max-md:size-3"
        >
          <path d={phonePath} />
        </svg>
        Rappelez-moi
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rappel-title"
        onClick={(e) => e.target === e.currentTarget && closeModal()}
        className={`fixed inset-0 z-[1300] flex items-center justify-center bg-black/55 p-6 [line-height:normal] max-md:p-3 ${
          open
            ? "visible opacity-100 [transition:opacity_0.25s_ease]"
            : "invisible opacity-0 [transition:opacity_0.25s_ease,visibility_0.25s_ease]"
        }`}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`relative max-h-[calc(100vh-3rem)] w-full max-w-[420px] overflow-y-auto rounded-[20px] bg-white px-8 pt-10 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] outline-none transition-transform duration-250 ease-[ease] max-md:max-h-[calc(100dvh-1.5rem)] max-md:rounded-2xl max-md:px-[1.2rem] max-md:pt-[1.4rem] max-md:pb-[1.2rem] ${
            open ? "[transform:translateY(0)_scale(1)]" : "[transform:translateY(20px)_scale(0.97)]"
          }`}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={closeModal}
            className="absolute top-4 right-4 size-8 cursor-pointer rounded-full text-[1.5rem] leading-none text-[#999] transition-colors duration-200 ease-[ease] hover:bg-[#f0f0f0] hover:text-[#333] max-md:top-[0.6rem] max-md:right-[0.6rem]"
          >
            &times;
          </button>

          {state.status === "success" ? (
            <div className="py-4 text-center">
              <svg
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mx-auto mb-4 block"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <h3 id="rappel-title" className="mb-[0.6rem] text-[1.3rem] font-bold text-[#1a1a1a]">
                Merci, c&apos;est noté !
              </h3>
              <p className="text-[0.92rem] leading-[1.5] text-[#666]">
                Un expert {site.name} vous rappellera dans les <strong>15 minutes</strong>.
              </p>
            </div>
          ) : (
            <div>
              <Image
                src="/images/logo/alarme-occitanie-logo.png"
                alt={site.name}
                width={800}
                height={276}
                sizes="140px"
                className="mx-auto mb-[1.2rem] block h-12 w-auto max-md:mb-[0.7rem] max-md:h-[34px]"
              />
              <h2
                id="rappel-title"
                className="mb-2 text-center text-[1.5rem] font-bold text-gold-dark max-md:mb-[0.3rem] max-md:text-[1.2rem]"
              >
                Un expert vous rappelle
              </h2>
              <p className="mb-[1.8rem] text-center text-[0.9rem] leading-[1.5] text-[#666] max-md:mb-[0.8rem] max-md:text-[0.82rem]">
                Saisissez vos coordonnées pour être recontacté dans les{" "}
                <strong className="text-[#1a1a1a]">15 minutes</strong>.
              </p>

              <OpenStatusBadge status={openStatus} className="mb-[1.6rem] max-md:mb-[0.9rem]" />

              <CallbackFormFields form={form} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
