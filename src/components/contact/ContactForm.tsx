"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { submitToFormspree } from "@/lib/formspree";
import { readContact, validateContact, type ContactField, type ContactState } from "@/lib/contact";
import { site } from "@/lib/site";
import { withNetworkGuard } from "@/components/forms/CallbackForm";

// Contact page form: posts the message straight to Formspree from the browser.
async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: a hidden field only bots fill in. Pretend it worked and send nothing.
  if (formData.get("_gotcha")) return { status: "success" };

  const data = readContact(formData);
  return submitToFormspree({
    _subject: `Message de contact – ${data.name.trim()}`,
    Formulaire: "Page contact",
    "Nom et prénom": data.name.trim(),
    email: data.email.trim(),
    Téléphone: data.phone.trim(),
    "Type de projet": data.subject.trim() || "non précisé",
    "Code postal": data.postalCode.trim(),
    Message: data.message.trim(),
    _gotcha: "",
  });
}

const submitContact = withNetworkGuard(sendContactMessage);

// "Type de projet" options — same as zozo, minus télésurveillance (not offered).
const projectTypes = [
  { value: "Vidéosurveillance", label: "Installation vidéosurveillance" },
  { value: "Alarme", label: "Installation alarme" },
  { value: "Interphone", label: "Installation interphone" },
  { value: "Câblage réseau", label: "Câblage réseau" },
  { value: "Réparation", label: "Réparation / Maintenance" },
  { value: "Conseil", label: "Conseil et étude" },
  { value: "Autre", label: "Autre projet" },
];

const label = "mb-[0.6rem] block text-[0.9rem] font-medium tracking-[0.5px] text-[#1a1a1a]";
const fieldBase =
  "w-full rounded-[10px] border bg-white px-[1.2rem] py-4 text-[1rem] text-[#1a1a1a] transition-[border-color,box-shadow] duration-300 ease-[ease] outline-none placeholder:text-[#999] max-md:px-[1rem] max-md:py-[0.85rem] max-md:text-[0.95rem]";
const fieldOk = "border-[#e0e0e0] focus:border-gold focus:shadow-[0_0_10px_rgba(200,153,47,0.1)]";
const fieldInvalid = "border-[#e02424] shadow-[0_0_0_3px_rgba(224,36,36,0.12)]";

// Custom select arrow (zozo's inline SVG chevron), applied via style so the data URI
// doesn't have to survive Tailwind's arbitrary-value class parsing.
const selectArrowStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 1rem center",
  backgroundSize: "16px",
};

// Progressive disclosure: phone / project type / postal code slide into view once the
// visitor has typed an email (zozo's behaviour, triggered by the email field's input event).
const conditional = (shown: boolean) =>
  `overflow-hidden transition-[max-height,opacity,margin-bottom] duration-[0.4s] ease-[cubic-bezier(0.23,1,0.32,1)] ${
    shown ? "max-h-[220px] opacity-100 mb-[1.2rem]" : "invisible max-h-0 opacity-0 mb-0"
  }`;

// Contact page form: name, email, message, then (revealed progressively) phone, project type, postal code.
export function ContactForm() {
  const [invalid, setInvalid] = useState<ContactField[]>([]);
  const [formError, setFormError] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [state, formAction, pending] = useActionState(submitContact, { status: "idle" } as ContactState);

  const isInvalid = (name: ContactField) => invalid.includes(name);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const check = validateContact(readContact(formData));
    setInvalid(check.invalid);
    setFormError(check.message);
    if (!check.message) startTransition(() => formAction(formData));
  };

  // Clear a field's invalid state as soon as the visitor corrects it.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as ContactField;
    if (invalid.includes(name)) setInvalid(invalid.filter((f) => f !== name));
  };

  // Progressive disclosure, like zozo: reveal phone / project type / postal code once an email is typed.
  const onEmailInput = (e: FormEvent<HTMLInputElement>) => {
    setRevealed(e.currentTarget.value.trim().length > 5);
  };

  const serverError = !pending && state.status === "error" ? state.message : "";
  const isError = Boolean(formError || serverError);
  const statusText = formError || (pending ? "Envoi en cours..." : serverError);

  if (state.status === "success") {
    return (
      <div className="py-6 text-center">
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
        <h3 className="mb-[0.6rem] text-[1.3rem] font-bold text-[#1a1a1a]">Merci, votre message est bien envoyé !</h3>
        <p className="text-[0.95rem] leading-[1.6] text-[#555]">Un expert {site.name} vous recontacte très vite.</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onInput={onInput}>
      {/* Honeypot: invisible to visitors, filled in by spam bots. */}
      <div aria-hidden="true" className="sr-only">
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mb-[1.2rem] flex gap-6 max-[969px]:mb-0 max-[969px]:flex-col">
        <div className="w-1/2 max-[969px]:mb-[1.2rem] max-[969px]:w-full">
          <label htmlFor="name" className={label}>
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Votre nom et prénom"
            autoComplete="name"
            aria-invalid={isInvalid("name") || undefined}
            className={`${fieldBase} ${isInvalid("name") ? fieldInvalid : fieldOk}`}
          />
        </div>
        <div className="w-1/2 max-[969px]:mb-[1.2rem] max-[969px]:w-full">
          <label htmlFor="email" className={label}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="votre@email.com"
            autoComplete="email"
            onInput={onEmailInput}
            aria-invalid={isInvalid("email") || undefined}
            className={`${fieldBase} ${isInvalid("email") ? fieldInvalid : fieldOk}`}
          />
        </div>
      </div>

      <div className="mb-[1.2rem]">
        <label htmlFor="message" className={label}>
          Décrivez votre projet *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Décrivez-nous votre projet : type de local, surface, besoins spécifiques, contraintes, budget approximatif..."
          aria-invalid={isInvalid("message") || undefined}
          className={`${fieldBase} min-h-[100px] resize-y ${isInvalid("message") ? fieldInvalid : fieldOk}`}
        />
      </div>

      <div className={`flex gap-6 max-[969px]:flex-col ${conditional(revealed)}`}>
        <div className="w-1/2 max-[969px]:mb-[1.2rem] max-[969px]:w-full">
          <label htmlFor="phone" className={label}>
            Téléphone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            aria-invalid={isInvalid("phone") || undefined}
            className={`${fieldBase} ${isInvalid("phone") ? fieldInvalid : fieldOk}`}
          />
        </div>
        <div className="w-1/2 max-[969px]:w-full">
          <label htmlFor="subject" className={label}>
            Type de projet
          </label>
          <select
            id="subject"
            name="subject"
            style={selectArrowStyle}
            className={`${fieldBase} ${fieldOk} cursor-pointer appearance-none pr-12`}
          >
            <option value="">Sélectionnez un type de projet</option>
            {projectTypes.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={conditional(revealed)}>
        <label htmlFor="postal-code" className={label}>
          Code postal *
        </label>
        <input
          type="text"
          id="postal-code"
          name="postal-code"
          placeholder="Ex: 34000 (Montpellier)"
          inputMode="numeric"
          pattern="[0-9]{5}"
          aria-invalid={isInvalid("postalCode") || undefined}
          className={`${fieldBase} ${isInvalid("postalCode") ? fieldInvalid : fieldOk}`}
        />
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gold p-4 text-[1.05rem] font-bold text-navy transition-[background-color,transform] duration-200 ease-[ease] hover:bg-gold-light hover:[transform:translateY(-1px)] disabled:cursor-not-allowed disabled:opacity-70 disabled:[transform:none]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22,2 15,22 11,13 2,9 22,2" />
          </svg>
          Envoyer le message
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`mt-6 text-center text-[0.95rem] font-medium empty:hidden ${isError ? "text-[#e02424]" : "text-[#555]"}`}
      >
        {statusText}
      </p>
    </form>
  );
}
