import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage, siteDomain } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({
  title: `Politique de Confidentialité | ${site.name}`,
  description: `Découvrez comment ${site.name} collecte, utilise et protège vos données personnelles. Informations conformes au RGPD.`,
  path: "/politique-confidentialite",
});

// Copied from the old site's politique-confidentialite.html — only the company identity and the host differ.
export default function PolitiqueConfidentialite() {
  return (
    <LegalPage eyebrow="Confidentialité" title="Politique de Confidentialité" breadcrumb="Politique de confidentialité">
      <p>Date de dernière mise à jour : 4 octobre 2026</p>

      <p>
        La présente Politique de Confidentialité décrit la manière dont {site.name} (SIRET {site.legal.siret}) collecte,
        utilise et protège les informations personnelles que vous nous fournissez lorsque vous utilisez notre site web{" "}
        {siteDomain}.
      </p>

      <h2>1. Collecte de l&apos;information</h2>
      <p>
        Nous collectons des informations lorsque vous utilisez notre formulaire de contact ou naviguez sur notre site.
        Les informations collectées incluent :
      </p>
      <ul>
        <li>Votre nom</li>
        <li>Votre adresse e-mail</li>
        <li>Le sujet de votre message (facultatif)</li>
        <li>Le contenu de votre message</li>
      </ul>

      <h2>2. Utilisation des informations</h2>
      <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
      <ul>
        <li>
          Répondre à vos demandes de renseignements, devis ou prise de contact (Base légale : votre consentement via le
          formulaire).
        </li>
        <li>Vous contacter par e-mail ou téléphone si nécessaire pour donner suite à votre demande.</li>
      </ul>

      <h2>3. Confidentialité</h2>
      <p>
        Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne
        seront pas vendues, échangées, transférées, ou données à une autre société sans votre consentement, en dehors de
        ce qui est nécessaire pour répondre à une demande ou pour des obligations légales.
      </p>

      <h2>4. Divulgation à des tiers</h2>
      <p>
        Nous ne vendons, n&apos;échangeons et ne transférons pas vos informations personnelles identifiables à des tiers
        sans votre consentement explicite, sauf :
      </p>
      <ul>
        <li>
          Aux tiers de confiance qui nous aident à exploiter notre site Web ou à mener nos affaires (comme notre
          hébergeur Vercel), tant que ces parties conviennent de garder ces informations confidentielles et respectent
          le RGPD.
        </li>
        <li>
          Lorsque nous pensons qu&apos;il est nécessaire de partager des informations afin d&apos;enquêter, de prévenir ou
          de prendre des mesures concernant des activités illégales, des fraudes présumées, des situations impliquant des
          menaces potentielles à la sécurité physique de toute personne, des violations de nos conditions
          d&apos;utilisation, ou quand la loi nous y contraint.
        </li>
      </ul>

      <h2>5. Protection des informations</h2>
      <p>
        Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations
        personnelles. Nous utilisons le cryptage HTTPS pour protéger les informations sensibles transmises en ligne.
        L&apos;accès aux informations personnelles identifiables est limité au personnel qui a besoin d&apos;effectuer un
        travail spécifique (par exemple, répondre à une demande client).
      </p>

      <h2>6. Durée de conservation des données</h2>
      <p>
        Nous conservons les données personnelles collectées via le formulaire de contact pour la durée nécessaire au
        traitement de votre demande et à la gestion de la relation commerciale qui pourrait en découler, sans excéder une
        durée de 3 ans après le dernier contact de votre part, sauf obligation légale contraire (par exemple, données de
        facturation).
      </p>

      <h2>7. Cookies</h2>
      <p>
        Notre site n&apos;utilise pas de cookies : aucun cookie de mesure d&apos;audience, publicitaire ou de traçage
        n&apos;est déposé sur votre appareil lors de votre visite.
      </p>

      <h2>8. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
      <ul>
        <li>Droit d&apos;accès</li>
        <li>Droit de rectification</li>
        <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité des données</li>
        <li>Droit d&apos;opposition</li>
        <li>Droit de retirer votre consentement à tout moment (pour les traitements basés sur le consentement).</li>
      </ul>
      <p>Pour exercer ces droits, veuillez nous contacter à l&apos;adresse suivante : {site.email}.</p>
      <p>
        Vous avez également le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de
        l&apos;Informatique et des Libertés) si vous estimez que le traitement de vos données n&apos;est pas conforme à la
        réglementation.
      </p>

      <h2>9. Consentement</h2>
      <p>
        En utilisant notre site, vous acceptez notre politique de confidentialité.
      </p>

      <h2>10. Modifications de la politique de confidentialité</h2>
      <p>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications
        prendront effet immédiatement après leur publication sur le site Web. Nous vous encourageons à consulter
        régulièrement cette page pour prendre connaissance des éventuelles modifications.
      </p>
    </LegalPage>
  );
}
