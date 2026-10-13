import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ClientNeeds } from "@/components/home/ClientNeeds";
// import { Equipment } from "@/components/home/Equipment";
import { Brands } from "@/components/home/Brands";
import { Reviews } from "@/components/home/Reviews";
import { Realisations } from "@/components/home/Realisations";
import { QuoteFunnel } from "@/components/home/QuoteFunnel";
import { Faq } from "@/components/home/Faq";

export const metadata = pageMetadata({
  title: "Alarme & Vidéosurveillance à Montpellier | Alarme Occitanie",
  description:
    "Installateur d'alarme et de vidéosurveillance à Montpellier et dans l'Hérault. Sans abonnement. Devis gratuit : 04 11 93 95 06",
  path: "/",
});

// Homepage sections are added here one by one, from the client's screenshots.
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ClientNeeds />
      {/* "Nos équipements de sécurité" — hidden for now; uncomment to show it (and its import above). */}
      {/* <Equipment /> */}
      <Brands />
      <Reviews />
      <Realisations />
      <QuoteFunnel />
      <Faq />
    </main>
  );
}
