"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { readCallback, validateCallback, type CallbackField, type CallbackState } from "@/lib/callback";
import { site } from "@/lib/site";

// Contact form shared by the "Rappelez-moi" popup and the quote funnel: same fields, button and look.

type FormAction = (prev: CallbackState, formData: FormData) => Promise<CallbackState>;

// A failed request (offline…) becomes an error message instead of crashing the form.
export function withNetworkGuard(action: FormAction): FormAction {
  return async (prev, formData) => {
    try {
      return await action(prev, formData);
    } catch {
      return { status: "error", message: "Erreur de connexion. Vérifiez votre réseau." };
    }
  };
}

// "06123456" -> "06 12 34 56", capped at 10 digits.
function formatPhone(e: FormEvent<HTMLInputElement>) {
  const digits = e.currentTarget.value.replace(/\D/g, "").slice(0, 10);
  e.currentTarget.value = digits.replace(/(\d{2})(?=\d)/g, "$1 ");
}

export const phonePath =
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z";

const fieldBase =
  "w-full rounded-xl border-[1.5px] bg-white px-[1.1rem] py-[0.95rem] text-[0.95rem] text-[#1a1a1a] transition-[border-color,box-shadow] duration-200 ease-[ease] outline-none placeholder:text-[#aaa]";
const fieldOk = "border-[#e2e2e2] focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,153,47,0.12)]";
const fieldInvalid = "border-[#e02424] shadow-[0_0_0_3px_rgba(224,36,36,0.12)]";
const inputMobile = "max-md:px-[0.9rem] max-md:py-3 max-md:text-[0.9rem]";

// Form state: client-side validation first, then the Formspree submit function.
export function useCallbackForm(action: FormAction, { besoinRequired = true }: { besoinRequired?: boolean } = {}) {
  const [invalid, setInvalid] = useState<CallbackField[]>([]);
  const [formError, setFormError] = useState("");
  const [state, formAction, pending] = useActionState(action, { status: "idle" });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const check = validateCallback(readCallback(formData), { besoinRequired });
    setInvalid(check.invalid);
    setFormError(check.message);
    if (!check.message) startTransition(() => formAction(formData));
  };

  // Clear a field's invalid state as soon as the visitor corrects it.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as CallbackField;
    if (invalid.includes(name)) setInvalid(invalid.filter((f) => f !== name));
  };

  const serverError = !pending && state.status === "error" ? state.message : "";
  return {
    state,
    pending,
    invalid,
    isError: Boolean(formError || serverError),
    statusText: formError || (pending ? "Envoi en cours..." : serverError),
    onSubmit,
    onInput,
  };
}

type Props = {
  form: ReturnType<typeof useCallbackForm>;
  hidden?: Record<string, string>;
  besoinRequired?: boolean;
};

export function CallbackFormFields({ form, hidden = {}, besoinRequired = true }: Props) {
  const { invalid, pending, isError, statusText, onSubmit, onInput } = form;
  const isInvalid = (name: CallbackField) => invalid.includes(name);

  return (
    <>
      <form noValidate onSubmit={onSubmit} onInput={onInput} className="flex flex-col gap-4 max-md:gap-[0.6rem]">
        {Object.entries(hidden).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
        {/* Honeypot: invisible to visitors, filled in by spam bots. */}
        <div aria-hidden="true" className="sr-only">
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </div>

        <input
          type="text"
          name="nom_complet"
          placeholder="Vos nom et prénom"
          autoComplete="name"
          required
          aria-invalid={isInvalid("nom_complet") || undefined}
          className={`${fieldBase} ${inputMobile} ${isInvalid("nom_complet") ? fieldInvalid : fieldOk}`}
        />

        <div
          className={`flex items-stretch overflow-hidden rounded-xl border-[1.5px] bg-white transition-[border-color,box-shadow] duration-200 ease-[ease] ${
            isInvalid("telephone")
              ? fieldInvalid
              : "border-[#e2e2e2] focus-within:border-gold focus-within:shadow-[0_0_0_3px_rgba(200,153,47,0.12)]"
          }`}
        >
          <span aria-hidden="true" className="flex items-center border-r-[1.5px] border-[#e2e2e2] bg-[#f7f7f7] px-[0.9rem] text-[1.2rem]">
            🇫🇷
          </span>
          <input
            type="tel"
            name="telephone"
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={isInvalid("telephone") || undefined}
            onChange={formatPhone}
            className={`w-full flex-1 px-[1.1rem] py-[0.95rem] text-[0.95rem] text-[#1a1a1a] outline-none placeholder:text-[#aaa] ${inputMobile}`}
          />
        </div>

        {/* Wrapper kept as on zozo: the inline textarea leaves the same small gap below it (not on mobile,
            where the textarea is block and compact like the inputs, so the popup fits 360×640 screens). */}
        <div>
          <textarea
            name="besoin"
            placeholder="Décrivez votre besoin (type de bien, nombre de caméras, alarme...)"
            rows={3}
            required={besoinRequired}
            aria-invalid={isInvalid("besoin") || undefined}
            className={`${fieldBase} min-h-20 resize-y leading-[1.45] max-md:block ${inputMobile} ${isInvalid("besoin") ? fieldInvalid : fieldOk}`}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 w-full cursor-pointer rounded-xl bg-gold p-4 text-[1rem] font-bold text-navy [transition:background-color_0.25s_ease,transform_0.15s_ease] hover:bg-gold-light hover:[transform:translateY(-1px)] disabled:cursor-not-allowed disabled:opacity-70 disabled:[transform:none] max-md:mt-[0.2rem] max-md:p-[0.8rem] max-md:text-[0.95rem]"
        >
          Valider
        </button>

        <p
          role="status"
          aria-live="polite"
          className={`mt-[0.2rem] text-center text-[0.85rem] empty:hidden ${isError ? "text-[#e02424]" : "text-[#888]"}`}
        >
          {statusText}
        </p>
      </form>

      <div className="mt-5 mb-4 flex items-center text-center text-[0.8rem] text-[#bbb] before:h-px before:flex-1 before:bg-[#ececec] after:h-px after:flex-1 after:bg-[#ececec] max-md:mt-[0.8rem] max-md:mb-[0.7rem]">
        <span className="px-[0.8rem]">ou</span>
      </div>

      <a
        href={site.phone.href}
        className="flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#e2e2e2] bg-white px-4 py-[0.85rem] text-[0.95rem] text-[#1a1a1a] transition-[border-color,background-color] duration-200 ease-[ease] hover:border-gold hover:bg-gold/4 max-md:px-[0.9rem] max-md:py-[0.7rem] max-md:text-[0.88rem]"
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
          className="shrink-0 text-gold-dark"
        >
          <path d={phonePath} />
        </svg>
        <span>
          Nous contacter au <strong className="font-bold text-gold-dark">{site.phone.display}</strong>
        </span>
      </a>

      <p className="mt-[1.2rem] text-center text-xs leading-[1.4] text-[#999] max-md:mt-[0.8rem] max-md:text-[0.7rem]">
        Vos données sont protégées et conformes au RGPD.
      </p>
    </>
  );
}
