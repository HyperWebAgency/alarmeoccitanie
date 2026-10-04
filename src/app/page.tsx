import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { ClientNeeds } from "@/components/home/ClientNeeds";
import { Brands } from "@/components/home/Brands";
import { Reviews } from "@/components/home/Reviews";
import { QuoteFunnel } from "@/components/home/QuoteFunnel";

// Draft SEO metadata — to adjust with the client.
export const metadata = pageMetadata({
  title: "Alarme & Vidéosurveillance Montpellier | Alarme Occitanie",
  description:
    "Installateur d'alarme, vidéosurveillance, visiophone et contrôle d'accès à Montpellier et dans l'Hérault. Sans abonnement. Devis gratuit : 04 11 93 95 06",
  path: "/",
});

// Homepage sections are added here one by one, from the client's screenshots.
export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ClientNeeds />
      <Brands />
      <Reviews />
      <QuoteFunnel />
    </main>
  );
}
