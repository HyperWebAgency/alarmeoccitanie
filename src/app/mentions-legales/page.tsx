import Link from "next/link";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, legalLink, postalAddress, siteDomain } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({
  title: `Mentions Légales | ${site.name}`,
  description: `Consultez les mentions légales d'${site.name}, incluant les informations sur l'éditeur du site, l'hébergement et la direction de la publication.`,
  path: "/mentions-legales",
});

// Copied from the old site's mentions-legales.html — only the company identity and the host differ.
export default function MentionsLegales() {
  return (
    <LegalPage eyebrow="Informations légales" title="Mentions Légales" breadcrumb="Mentions légales">
      <p>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie
        numérique, il est précisé aux utilisateurs du site {siteDomain} l&apos;identité des différents intervenants dans
        le cadre de sa réalisation et de son suivi.
      </p>

      <h2>Édition du site</h2>
      <p>Le présent site, accessible à l&apos;URL {siteDomain}, est édité par :</p>
      <p>
        <strong>{site.name}</strong>, entreprise individuelle,
        <br />
        dont le siège social est situé au {postalAddress}, France,
        <br />
        SIRET : {site.legal.siret} — Code APE : {site.legal.ape}.
      </p>
      <p>Adresse email : {site.email}</p>

      <h2>Assurance professionnelle</h2>
      <p>
        Assurance de responsabilité civile décennale souscrite auprès de {site.legal.insurance.insurer},{" "}
        {site.legal.insurance.address} (contrat n° {site.legal.insurance.contract}, valable{" "}
        {site.legal.insurance.period}).
      </p>
      <p>Activités couvertes : {site.legal.insurance.activities}.</p>
      <p>Couverture géographique : {site.legal.insurance.area}.</p>

      <h2>Directeur de la publication</h2>
      <p>
        Le Directeur de la publication du site est <strong>{site.name}</strong>.
      </p>

      <h2>Hébergement</h2>
      <p>Le site est hébergé par la société Vercel Inc.,</p>
      <p>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
      <p>(Contact : via leur site web https://vercel.com)</p>

      <h2>Nous contacter</h2>
      <p>Par email : {site.email}</p>
      <p>Par courrier : {postalAddress}, France</p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données à caractère personnel est régi par notre Politique de Confidentialité, disponible{" "}
        <Link href="/politique-confidentialite" className={legalLink}>
          ici
        </Link>
        , conformément au Règlement Général sur la Protection des Données (RGPD) 2016/679 du 27 avril 2016.
      </p>
    </LegalPage>
  );
}
