"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { quoteHref } from "@/lib/navigation";

type Spec = { label: string; value: string };

type EquipmentItem = {
  title: string;
  image: { src: string; width: number; height: number; small?: boolean };
  alt: string;
  description: string;
  detail: string;
  specs: Spec[];
};

// Ported from zozo's Anduze "équipements de vidéosurveillance" carousel, plus two alarm
// components (sirène, générateur de brouillard) taken from the Montpellier alarm page —
// rewritten without the Ajax/UR Fog brand names or "sans fil", with a matching detail dialog.
const items: EquipmentItem[] = [
  {
    title: "Caméra de vidéosurveillance",
    image: { src: "/images/equipements/camera-videosurveillance-exterieure.webp", width: 298, height: 258 },
    alt: "Caméra de vidéosurveillance extérieure",
    description: "Une caméra pensée pour durer, et pour voir clairement de jour comme de nuit.",
    detail:
      "Nos caméras sont fabriquées pour durer dans le temps, avec un boîtier solide qui résiste aux chocs, installées aussi bien à l'intérieur qu'à l'extérieur. Elles voient parfaitement même en pleine nuit, pour identifier facilement une intrusion, un accident, ou lever le doute en cas d'alerte.",
    specs: [
      { label: "Garantie", value: "2 ans" },
      { label: "Boîtier", value: "Anti-vandale, résistant aux chocs" },
      { label: "Installation", value: "Intérieur et extérieur" },
      { label: "Vision nocturne", value: "Oui, même en obscurité totale" },
    ],
  },
  {
    title: "Enregistreur vidéosurveillance",
    image: { src: "/images/equipements/enregistreur-videosurveillance.webp", width: 1089, height: 400 },
    alt: "Enregistreur vidéosurveillance NVR",
    description: "Le boîtier central qui connecte, alimente et enregistre toutes vos caméras.",
    detail:
      "Toutes vos caméras se connectent à ce boîtier central, qui assure également leur alimentation électrique. Équipé d'un disque dur, il enregistre et conserve les images sur la durée de votre choix, permettant de consulter l'historique en cas de besoin. La consultation à distance depuis votre smartphone vous permet de surveiller vos installations où que vous soyez.",
    specs: [
      { label: "Garantie", value: "2 ans" },
      { label: "Alimentation des caméras", value: "Incluse, via le boîtier" },
      { label: "Consultation à distance", value: "Depuis votre smartphone, où que vous soyez" },
      { label: "Durée d'enregistrement", value: "Réglable selon vos besoins" },
    ],
  },
  {
    title: "Disques durs",
    image: { src: "/images/equipements/disque-dur-videosurveillance.webp", width: 270, height: 401, small: true },
    alt: "Disque dur de surveillance",
    description: "Le disque dur qui conserve vos enregistrements, sans manipulation de votre part.",
    detail:
      "Installés directement dans votre enregistreur, ces disques durs sont conçus pour un fonctionnement continu 24h/24 et offrent une grande capacité de stockage pour conserver plusieurs semaines d'enregistrement. Une fois pleins, ils écrasent automatiquement les images les plus anciennes : aucune manipulation nécessaire de votre part.",
    specs: [
      { label: "Garantie", value: "2 ans" },
      { label: "Fonctionnement", value: "Continu 24h/24, conçu pour la vidéosurveillance" },
      { label: "Capacité pleine", value: "Écrasement automatique des images les plus anciennes" },
      { label: "Emplacement", value: "Installé dans votre enregistreur" },
    ],
  },
  {
    title: "Alarme connectée",
    image: { src: "/images/equipements/kit-alarme-connectee.webp", width: 278, height: 183 },
    alt: "Kit alarme connectée",
    description: "Ajoutez une alarme à vos caméras, pilotable avec elles depuis une seule application.",
    detail:
      "Notre kit alarme se couple à votre vidéosurveillance et se pilote depuis la même application que vos caméras. Il comprend sa propre centrale, des contacts de porte et fenêtre, et un détecteur de mouvement installé à l'intérieur de votre maison pour repérer toute présence suspecte dès votre absence.",
    specs: [
      { label: "Garantie", value: "5 ans" },
      { label: "Pilotage", value: "Une seule application, avec vos caméras" },
      { label: "Alertes", value: "Reçues directement sur votre téléphone" },
      { label: "Abonnement", value: "Aucun abonnement nécessaire" },
    ],
  },
  {
    title: "Sirène extérieure",
    image: { src: "/images/equipements/sirene-exterieure-alarme.webp", width: 320, height: 240 },
    alt: "Sirène extérieure pour alarme",
    description: "Une sirène puissante qui dissuade l'intrus et alerte tout le voisinage.",
    detail:
      "Cette sirène extérieure puissante de 113 dB, équipée d'un flash LED intégré, dissuade instantanément les intrus et alerte le voisinage dès la moindre tentative d'intrusion. Résistante aux intempéries, elle reste fiable toute l'année, avec une autonomie sur batterie pouvant atteindre 5 ans.",
    specs: [
      { label: "Puissance sonore", value: "113 dB" },
      { label: "Signal lumineux", value: "Flash LED intégré" },
      { label: "Résistance", value: "Toutes intempéries" },
      { label: "Autonomie", value: "Jusqu'à 5 ans sur batterie" },
    ],
  },
  {
    title: "Générateur de brouillard",
    image: { src: "/images/equipements/generateur-brouillard-alarme.webp", width: 693, height: 938 },
    alt: "Générateur de brouillard pour alarme",
    description: "Un brouillard dense qui rend toute visibilité impossible pour l'intrus en quelques secondes.",
    detail:
      "Ce générateur remplit la pièce d'un brouillard dense en quelques secondes, rendant toute visibilité impossible pour l'intrus. Une protection ultime et dissuasive, aussi bien pour les commerces que pour les habitations.",
    specs: [
      { label: "Déclenchement", value: "En quelques secondes" },
      { label: "Effet", value: "Brouillard dense, visibilité nulle" },
      { label: "Usage", value: "Commerces et habitations" },
      { label: "Niveau de protection", value: "Dissuasion ultime contre l'intrusion" },
    ],
  },
];

// "Nos équipements de sécurité" — horizontal carousel of equipment cards, each opening a detail
// dialog with a short spec list. Ported from zozo's Anduze equipment section (native horizontal
// scroll + two arrow buttons, no dots) plus two alarm cards from the Montpellier alarm page.
export function Equipment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-equipment-card]");
    const amount = (card?.offsetWidth ?? 600) + 24; // card width + gap-6 (1.5rem)
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  const openDetail = (index: number, trigger: HTMLElement) => {
    lastFocused.current = trigger;
    // Focus the dialog right after this render commits, so it lands on the new content.
    flushSync(() => {
      setDisplayIndex(index);
      setOpen(true);
    });
    modalRef.current?.focus();
  };

  const closeDetail = () => {
    setOpen(false);
    lastFocused.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDetail();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = items[displayIndex];

  return (
    <section id="equipements" className="bg-white px-8 py-20 [line-height:normal] max-[769px]:px-5 max-[769px]:py-12">
      <h2 className="mb-12 text-center font-poppins text-[2.2rem] font-bold tracking-[-0.5px] text-[#1a1a1a] max-[769px]:mb-8 max-[769px]:text-[1.6rem]">
        Nos équipements de sécurité
      </h2>

      <div className="relative mx-auto max-w-[1200px]">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth px-8 py-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] max-[769px]:px-4 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <div
              key={item.title}
              data-equipment-card
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              onClick={(e) => openDetail(i, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openDetail(i, e.currentTarget);
                }
              }}
              className="group grid shrink-0 basis-[600px] grid-cols-2 grid-rows-[auto_1fr] items-start gap-x-8 gap-y-4 rounded-2xl bg-[#f8f9fa] px-8 py-7 outline-none transition-[transform,box-shadow] duration-200 ease-[ease] focus-visible:-translate-y-[3px] focus-visible:shadow-[0_8px_24px_rgba(0,0,0,0.08)] focus-visible:ring-2 focus-visible:ring-gold-dark focus-visible:ring-offset-2 pointer-fine:hover:-translate-y-[3px] pointer-fine:hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] max-[769px]:basis-[85vw] max-[769px]:grid-cols-1 max-[769px]:gap-6 max-[769px]:p-6"
            >
              <h3 className="col-span-2 font-poppins text-[1.5rem] leading-[1.3] font-bold text-[#1a1a1a] max-[769px]:col-span-1 max-[769px]:text-center max-[769px]:text-[1.25rem]">
                {item.title}
              </h3>

              <div className="flex items-center justify-center p-4">
                <Image
                  src={item.image.src}
                  alt={item.alt}
                  width={item.image.width}
                  height={item.image.height}
                  className={`mx-auto w-auto max-w-full rounded-lg object-contain max-[769px]:h-[200px] ${
                    item.image.small ? "h-[200px]" : "h-[230px]"
                  }`}
                />
              </div>

              <div className="self-center border-l-2 border-[#e0e0e0] pl-8 max-[769px]:border-l-0 max-[769px]:border-t-2 max-[769px]:pt-6 max-[769px]:pl-0 max-[769px]:text-left">
                <p className="text-[0.95rem] leading-[1.7] text-[#555] max-[769px]:text-[1rem]">{item.description}</p>
                <span className="mt-3 inline-flex items-center gap-[0.35rem] text-[0.85rem] font-bold text-gold-dark">
                  Voir les détails
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
                    className="transition-transform duration-200 ease-[ease] pointer-fine:group-hover:translate-x-[3px]"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            aria-label="Équipement précédent"
            onClick={() => scrollByCard(-1)}
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-colors duration-300 pointer-fine:hover:border-gold pointer-fine:hover:bg-gold pointer-fine:hover:text-navy max-[769px]:size-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Équipement suivant"
            onClick={() => scrollByCard(1)}
            className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-colors duration-300 pointer-fine:hover:border-gold pointer-fine:hover:bg-gold pointer-fine:hover:text-navy max-[769px]:size-10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Equipment detail dialog — same overlay/panel pattern as RappelezMoi's callback popup. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="equipment-modal-title"
        onClick={(e) => e.target === e.currentTarget && closeDetail()}
        className={`fixed inset-0 z-[1300] flex items-center justify-center bg-black/55 p-6 [line-height:normal] max-md:p-3 ${
          open
            ? "visible opacity-100 [transition:opacity_0.25s_ease]"
            : "invisible opacity-0 [transition:opacity_0.25s_ease,visibility_0.25s_ease]"
        }`}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`relative max-h-[calc(100vh-3rem)] w-full max-w-[520px] overflow-y-auto rounded-[20px] bg-white px-8 pt-10 pb-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] outline-none transition-transform duration-250 ease-[ease] max-md:px-6 max-md:pt-[2.2rem] max-md:pb-6 ${
            open ? "[transform:translateY(0)_scale(1)]" : "[transform:translateY(20px)_scale(0.97)]"
          }`}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={closeDetail}
            className="absolute top-4 right-4 size-8 cursor-pointer rounded-full text-[1.5rem] leading-none text-[#999] transition-colors duration-200 ease-[ease] hover:bg-[#f0f0f0] hover:text-[#333]"
          >
            &times;
          </button>

          <div className="flex items-center justify-center px-2 pb-5">
            <Image
              src={active.image.src}
              alt={active.alt}
              width={active.image.width}
              height={active.image.height}
              className="h-[220px] w-auto max-w-full rounded-lg object-contain"
            />
          </div>

          <h3 id="equipment-modal-title" className="mb-[0.9rem] font-poppins text-[1.4rem] font-bold text-[#1a1a1a]">
            {active.title}
          </h3>
          <p className="mb-5 text-[0.95rem] leading-[1.7] text-[#555]">{active.detail}</p>

          <ul className="mb-6 flex flex-col gap-[0.6rem]">
            {active.specs.map((spec) => (
              <li
                key={spec.label}
                className="flex items-baseline justify-between gap-4 border-b border-[#eee] pb-[0.6rem]"
              >
                <span className="shrink-0 text-[0.85rem] text-[#888]">{spec.label}</span>
                <span className="text-right text-[0.9rem] font-semibold text-[#1a1a1a]">{spec.value}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-[#f8f9fa] px-[1.1rem] py-4 text-[0.85rem] leading-[1.6] text-[#666]">
            Le choix et le nombre d&apos;équipements dépendent de votre projet.{" "}
            <Link href={quoteHref} className="font-bold text-gold-dark hover:underline">
              Demandez un devis gratuit
            </Link>{" "}
            pour un tarif personnalisé.
          </div>
        </div>
      </div>
    </section>
  );
}
