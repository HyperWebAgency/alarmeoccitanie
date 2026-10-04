"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  CalendarRange,
  Check,
  CircleEllipsis,
  Lightbulb,
  PackageOpen,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { readCallback, type CallbackState } from "@/lib/callback";
import { submitToFormspree } from "@/lib/formspree";
import { questionLabels, questionSteps, readAnswers, totalSteps, type QuestionId } from "@/lib/quote";
import { site } from "@/lib/site";
import { getOpenStatus, type OpenStatus } from "@/lib/hours";
import { CallbackFormFields, useCallbackForm, withNetworkGuard } from "@/components/forms/CallbackForm";
import { OpenStatusBadge } from "@/components/forms/OpenStatusBadge";

// Quote funnel: posts the answers + the contact details (same fields as "Rappelez-moi") straight to Formspree.
async function requestQuote(_prev: CallbackState, formData: FormData): Promise<CallbackState> {
  // Honeypot: a hidden field only bots fill in. Pretend it worked and send nothing.
  if (formData.get("_gotcha")) return { status: "success" };

  const answers = readAnswers(formData);
  const { nom, tel, besoin } = readCallback(formData);
  return submitToFormspree({
    _subject: `Demande de devis – ${answers.systeme} – ${nom.trim()}`,
    Formulaire: "Devis en ligne",
    ...Object.fromEntries(questionSteps.map((s) => [questionLabels[s.id], answers[s.id]])),
    "Nom et prénom": nom.trim(),
    Téléphone: tel.trim(),
    Besoin: besoin.trim() || "non précisé",
    _gotcha: "",
  });
}

const submitQuote = withNetworkGuard(requestQuote);

// Card icon: our own SVG(s) (masked to navy) or a Lucide component. Two paths = two icons side by side.
type CardIconSource = LucideIcon | string | string[];

const cardIcons: Record<string, CardIconSource> = {
  Particulier: "/images/icons/particulier.svg",
  Professionnel: "/images/icons/professionnel.svg",
  Maison: "/images/icons/maison.svg",
  Appartement: "/images/icons/appartement.svg",
  "Résidence secondaire": "/images/icons/residence-secondaire.svg",
  Commerce: "/images/icons/commerce.svg",
  Bureaux: "/images/icons/bureaux.svg",
  "Entrepôt / local d'activité": "/images/icons/entrepot.svg",
  "Un emménagement récent": PackageOpen,
  "Un incident ou une tentative d'intrusion": "/images/icons/intrusion.svg",
  "Un besoin de tranquillité au quotidien": "/images/icons/tranquillite.svg",
  "Je souhaite être conseillé(e)": "/images/icons/conseil.svg",
  Alarme: "/images/icons/alarme-intrusion.svg",
  Vidéosurveillance: "/images/icons/videosurveillance.svg",
  "Alarme et vidéosurveillance": ["/images/icons/alarme-intrusion.svg", "/images/icons/videosurveillance.svg"],
  "Interphone / visiophone": "/images/icons/interphone-visiophone.svg",
  "Contrôle d'accès": "/images/icons/controle-acces.svg",
  "Dès que possible": Zap,
  "Dans les 3 mois": CalendarClock,
  "Dans les 6 mois": CalendarRange,
  "Projet en réflexion": Lightbulb,
};

// Every card icon is a separate file. Load them all ahead (and wait for a step's icons before showing
// its cards) so a step's icons appear together instead of popping in one by one.
const iconPaths = (icon?: CardIconSource): string[] =>
  typeof icon === "string" ? [icon] : Array.isArray(icon) ? icon : [];
const allIconPaths = [...new Set(Object.values(cardIcons).flatMap(iconPaths))];
const iconLoads = new Map<string, Promise<void>>();

function loadIcon(src: string) {
  let done = iconLoads.get(src);
  if (!done) {
    done = new Promise<void>((resolve) => {
      const img = new window.Image();
      // CSS masks are fetched in CORS mode: match it so the mask reuses this download.
      img.crossOrigin = "anonymous";
      img.onload = img.onerror = () => resolve();
      img.src = src;
    });
    iconLoads.set(src, done);
  }
  return done;
}

function MaskIcon({ src, className }: { src: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})` }}
      className={`bg-navy [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] ${className}`}
    />
  );
}

function CardIcon({ icon }: { icon: CardIconSource }) {
  if (Array.isArray(icon)) {
    return (
      <span className="flex items-center gap-2">
        {icon.map((src) => (
          <MaskIcon key={src} src={src} className="size-11 max-md:size-8" />
        ))}
      </span>
    );
  }
  if (typeof icon === "string") return <MaskIcon src={icon} className="size-14 max-md:size-10" />;
  const Icon = icon;
  return <Icon aria-hidden="true" strokeWidth={1.5} className="size-14 text-navy max-md:size-10" />;
}

// Multi-step quote request: one question per step, then the contact details, sent by email.
export function QuoteFunnel() {
  const [step, setStep] = useState(0);
  const [readyIcons, setReadyIcons] = useState("");
  const [openStatus, setOpenStatus] = useState<OpenStatus | null>(null);
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, string>>>({});
  const form = useCallbackForm(submitQuote, { besoinRequired: false });
  const done = form.state.status === "success";
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const isContact = step === questionSteps.length;
  const current = questionSteps[step];
  const options = current?.options(answers.profil) ?? [];
  const stepIconsKey = options.flatMap((o) => iconPaths(cardIcons[o])).join("|");
  const iconsReady = !stepIconsKey || readyIcons === stepIconsKey;

  // After each step: move focus to the new question, and bring the card back into view if needed.
  useEffect(() => {
    if (!moved.current) return;
    titleRef.current?.focus({ preventScroll: true });
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 90) window.scrollBy({ top: top - 110, behavior: "smooth" });
  }, [step, done]);

  // Fetch all card icons once the page is idle: the funnel is far down the page, so they're ready in time.
  useEffect(() => {
    const run = () => allIconPaths.forEach(loadIcon);
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run);
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(run, 1500);
    return () => clearTimeout(id);
  }, []);

  // Show a step's cards only once all of its icons are loaded (usually already the case).
  useEffect(() => {
    if (!stepIconsKey) return;
    let alive = true;
    Promise.all(stepIconsKey.split("|").map(loadIcon)).then(() => alive && setReadyIcons(stepIconsKey));
    return () => {
      alive = false;
    };
  }, [stepIconsKey]);

  const goTo = (s: number) => {
    moved.current = true;
    setStep(s);
  };

  const choose = (id: QuestionId, value: string) => {
    // A new profile changes the next questions' options: start the rest over.
    setAnswers((a) => (id === "profil" && a.profil !== value ? { profil: value } : { ...a, [id]: value }));
    // Entering the contact step: open/closed status computed now (time-dependent, client only).
    if (step + 1 === questionSteps.length) setOpenStatus(getOpenStatus());
    goTo(step + 1);
  };

  // Same 240px cards everywhere: the container width just fits 2, 3 (6 options) or 4 per row.
  const cardWidth = done || isContact || options.length <= 2 ? "max-w-[620px]" : options.length === 6 ? "max-w-[860px]" : "max-w-[1120px]";

  const backButton = (
    <div className="mt-10 flex justify-center max-md:mt-7">
      <button
        type="button"
        onClick={() => goTo(step - 1)}
        className="cursor-pointer rounded-xl bg-navy px-14 py-3.5 text-[1.05rem] text-white transition-colors hover:bg-navy/90"
      >
        Retour
      </button>
    </div>
  );

  return (
    <section id="devis" aria-labelledby="devis-title" className="scroll-mt-24 bg-white px-8 py-20 [line-height:normal] max-[769px]:px-4 max-[769px]:py-12">
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="devis-title"
          className="text-center font-poppins text-[3.2rem] leading-[1.15] font-bold tracking-[-0.5px] text-[#1a1a1a] max-md:text-[1.9rem]"
        >
          Votre demande de devis
          <br className="max-md:hidden" /> en moins d&apos;une minute
        </h2>

        <div className="relative mx-auto mt-12 flex max-w-[620px] items-center gap-4 max-md:mt-8">
          <span className="shrink-0 text-[0.95rem] font-medium text-gold-dark">Étape {step + 1}</span>
          <div
            role="progressbar"
            aria-label="Progression de la demande"
            aria-valuemin={1}
            aria-valuemax={totalSteps}
            aria-valuenow={step + 1}
            className="h-2 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold transition-[width] duration-500"
              style={{ width: `${done ? 100 : ((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
          {/* Curved arrow (public/images/icons/curve-arrow.svg) turned to point down at the card */}
          <span
            aria-hidden="true"
            style={{ maskImage: "url(/images/icons/curve-arrow.svg)", WebkitMaskImage: "url(/images/icons/curve-arrow.svg)" }}
            className="absolute -top-32 -right-44 hidden size-36 bg-navy/70 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [transform:rotate(90deg)_scaleX(-1)] lg:block"
          />
        </div>

        <div
          ref={cardRef}
          className={`mx-auto mt-8 rounded-[28px] bg-[#f6f7f9] px-12 py-12 ring-1 ring-black/[0.04] max-md:rounded-[22px] max-md:px-5 max-md:py-8 ${cardWidth}`}
        >
          <div key={done ? "done" : step} className="animate-funnel-step motion-reduce:animate-none">
            {done ? (
              <div className="text-center" role="status">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold/15 text-gold-dark">
                  <Check aria-hidden="true" strokeWidth={2.5} className="size-8" />
                </span>
                <h3 ref={titleRef} tabIndex={-1} className="mt-5 text-[1.6rem] font-semibold text-[#1a1a1a] outline-none max-md:text-[1.25rem]">
                  Merci, votre demande est bien envoyée !
                </h3>
                <p className="mt-3 text-[1rem] leading-[1.6] text-[#666]">
                  Vous allez être rappelé(e) le plus tôt possible.
                </p>
                <a
                  href={site.phone.href}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-navy/20 px-7 py-[0.7rem] font-semibold text-navy transition-colors hover:border-navy"
                >
                  Urgent ? {site.phone.display}
                </a>
              </div>
            ) : isContact ? (
              <div>
                <h3 ref={titleRef} tabIndex={-1} className="text-center text-[1.6rem] font-medium text-[#1a1a1a] outline-none max-md:text-[1.2rem]">
                  Où pouvons-nous vous recontacter ?
                </h3>
                <p className="mt-2 text-center text-[0.95rem] text-[#666]">Un expert vous rappelle avec votre devis gratuit.</p>
                <OpenStatusBadge status={openStatus} className="mt-5 max-md:mt-4" />
                <div className="mx-auto mt-7 max-w-[420px] max-md:mt-5">
                  <CallbackFormFields
                    form={form}
                    besoinRequired={false}
                    hidden={Object.fromEntries(questionSteps.map((q) => [q.id, answers[q.id] ?? ""]))}
                  />
                </div>
                {backButton}
              </div>
            ) : (
              <>
                <h3 ref={titleRef} tabIndex={-1} className="text-center text-[1.6rem] font-medium text-[#1a1a1a] outline-none max-md:text-[1.2rem]">
                  {current.question(answers.profil)}
                </h3>

                <div
                  className={`mt-10 grid justify-center gap-5 transition-opacity duration-300 [grid-template-columns:repeat(auto-fit,240px)] max-md:mt-6 max-md:grid-cols-2 max-md:gap-3 ${
                    iconsReady ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {options.map((o) => {
                    const selected = answers[current.id] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => choose(current.id, o)}
                        className={`flex min-h-[190px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[24px] border-2 bg-white px-5 py-8 text-center ring-1 ring-black/[0.05] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(14,34,56,0.08)] max-md:min-h-[150px] max-md:gap-3 max-md:px-3 max-md:py-6 ${
                          selected ? "border-navy" : "border-transparent hover:border-navy/30"
                        }`}
                      >
                        <CardIcon icon={cardIcons[o] ?? CircleEllipsis} />
                        <span className="text-[1.05rem] leading-[1.3] font-semibold text-navy max-md:text-[0.92rem]">{o}</span>
                      </button>
                    );
                  })}
                </div>

                {step > 0 && backButton}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
