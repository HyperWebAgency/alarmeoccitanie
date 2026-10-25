import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { DarkLogoOverlay } from "@/components/layout/DarkLogoOverlay";
import { InterphoneHero } from "@/components/interphone/InterphoneHero";

export const metadata = {
  ...pageMetadata({
    title: `Installation interphone et visiophone à Montpellier | ${site.name}`,
    description:
      "Installation d'interphone et de visiophone à Montpellier et dans l'Hérault, pour maisons et locaux professionnels. Sans abonnement, devis gratuit.",
    path: "/installation-interphone-visiophone-montpellier",
  }),
  // Page under construction (hero only): kept out of Google until it's complete — remove this then.
  robots: { index: false, follow: true },
};

// Built section by section: hero only for now. Not in livePaths/sitemap until the page is complete.
export default function InterphoneVisiophonePage() {
  return (
    <>
      <DarkLogoOverlay />
      <InterphoneHero />
    </>
  );
}
