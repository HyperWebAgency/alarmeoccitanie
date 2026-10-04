import type { Metadata, Viewport } from "next";
import { Caveat, Inter, Poppins, Roboto, Urbanist } from "next/font/google";
import { site } from "@/lib/site";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { MaintenanceBar } from "@/components/layout/MaintenanceBar";
import { RappelezMoi } from "@/components/layout/RappelezMoi";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const urbanist = Urbanist({
  variable: "--font-urbanist-family",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});
const poppins = Poppins({ variable: "--font-poppins-family", subsets: ["latin"], weight: "700", display: "swap" });
const caveat = Caveat({ variable: "--font-caveat-family", subsets: ["latin"], weight: "700", display: "swap" });
// Footer titles only ("Horaires d'ouverture", "Navigation", "Notre localisation") — weight 700 only.
const roboto = Roboto({ variable: "--font-roboto-family", subsets: ["latin"], weight: "700", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
  applicationName: site.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e2238",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${urbanist.variable} ${poppins.variable} ${caveat.variable} ${roboto.variable} antialiased`}
    >
      {/* pt-8: room for the maintenance bar */}
      <body className="relative pt-8 font-sans">
        <JsonLd data={businessSchema()} />
        <JsonLd data={websiteSchema()} />
        <MaintenanceBar />
        <Navbar />
        <RappelezMoi />
        {children}
        <Footer />
      </body>
    </html>
  );
}
