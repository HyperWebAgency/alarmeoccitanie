import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = pageMetadata({
  title: `Conditions Générales | ${site.name}`,
  description: `Conditions de fonctionnement, responsabilités et limites des systèmes de vidéosurveillance et d'alarme installés par ${site.name}.`,
  path: "/conditions-generales",
});

// Badge shown at the top of the document (old site's `.legal-version-badge`).
const versionBadge =
  "mb-8 inline-block rounded-md border border-gold/30 bg-gold/10 px-[0.9rem] py-[0.4rem] text-[0.85rem] font-semibold text-gold-dark";

// Articles flagged IMPORTANT in the source text (old site's `h2.legal-h2-important`).
const importantH2 = "rounded-r-md bg-gold/10 py-3 pr-[0.85rem]";

// Copied from the old site's conditions-generales-securite.html — only the company identity differs,
// and Article 13 is adjusted because the company does not offer télésurveillance (see below).
export default function ConditionsGenerales() {
  return (
    <LegalPage
      eyebrow="Conditions générales"
      title="Conditions de fonctionnement, responsabilités et limites des systèmes de sécurité"
      breadcrumb="Conditions générales"
    >
      <p className={versionBadge}>Version 1.1 — En vigueur depuis le 14/08/2026</p>

      <p>
        Ce document définit les conditions de fonctionnement, les responsabilités et les limites applicables aux
        systèmes de vidéosurveillance, de vidéoprotection et d&apos;alarme installés par {site.name}. Il complète le
        devis, la facture et/ou le contrat d&apos;installation acceptés par le client.
      </p>

      <h2 id="article-1">Article 1 — Objet du document</h2>
      <p>
        Le présent document a pour objet de définir les limites de fonctionnement des systèmes de
        vidéosurveillance, de vidéoprotection et d&apos;alarme installés par {site.name}, les responsabilités
        respectives de {site.name} et du client, les circonstances échappant au contrôle de {site.name}, ainsi que
        les conditions applicables après la mise en service et la réception de l&apos;installation.
      </p>
      <p>
        Il précise notamment la répartition des responsabilités entre {site.name}, le client, les tiers intervenant
        sur l&apos;installation, et les circonstances extérieures liées aux fabricants, aux fournisseurs
        d&apos;accès à Internet, à l&apos;infrastructure électrique du site ou aux conditions environnementales.
      </p>
      <p>
        Ce document complète le devis, la facture et/ou le contrat d&apos;installation acceptés par le client. En
        cas de contradiction, les dispositions du présent document prévalent pour les questions de responsabilité,
        de fonctionnement et de limites techniques des systèmes installés, sauf disposition contraire expressément
        convenue par écrit entre les parties.
      </p>

      <h2 id="article-2">Article 2 — Absence de garantie contre les intrusions et sinistres</h2>
      <p>
        Les caméras de vidéosurveillance, systèmes d&apos;alarme, sirènes, détecteurs et équipements de sécurité
        associés installés par {site.name} sont des dispositifs de détection, d&apos;enregistrement, d&apos;alerte
        et de dissuasion.
      </p>
      <p>
        Ils ne constituent en aucun cas une garantie qu&apos;une intrusion, un cambriolage, un vol, un acte de
        vandalisme, une agression, un incendie ou tout autre incident ne puisse survenir.
      </p>
      <p>
        {site.name} ne saurait voir sa responsabilité engagée du seul fait qu&apos;un incident soit survenu, dès
        lors que l&apos;équipement installé fonctionnait conformément à sa destination et aux caractéristiques
        convenues avec le client.
      </p>
      <p>
        Le présent article ne fait pas obstacle à la responsabilité de {site.name} lorsqu&apos;il est établi que le
        dommage ou le sinistre résulte directement d&apos;un défaut d&apos;installation ou d&apos;un manquement
        contractuel imputable à {site.name}.
      </p>

      <h2 id="article-3">Article 3 — Limites du champ de vision des caméras</h2>
      <p>
        La performance d&apos;une caméra de vidéosurveillance dépend d&apos;un ensemble de facteurs techniques et
        environnementaux, notamment :
      </p>
      <ul>
        <li>le champ de vision et l&apos;angle de la caméra</li>
        <li>l&apos;objectif utilisé</li>
        <li>la distance entre la caméra et la scène observée</li>
        <li>la résolution du capteur</li>
        <li>les conditions de luminosité, de jour comme de nuit</li>
        <li>le mode infrarouge ou lumière blanche</li>
        <li>la vitesse de déplacement des sujets filmés</li>
        <li>les obstacles (végétation, véhicules, mobilier, etc.)</li>
        <li>les conditions météorologiques</li>
        <li>le taux de compression de l&apos;image</li>
        <li>le positionnement final de la caméra</li>
      </ul>
      <p>
        L&apos;installation d&apos;une caméra ne garantit pas l&apos;identification faciale, la lecture d&apos;une
        plaque d&apos;immatriculation ou l&apos;identification de chaque événement survenant à l&apos;intérieur ou
        aux abords de la propriété, sauf lorsqu&apos;une exigence technique spécifique en ce sens a été
        expressément convenue par écrit entre les parties, par exemple dans le cadre d&apos;une caméra dédiée à la
        lecture de plaques.
      </p>

      <h2 id="article-4">Article 4 — Validation de l&apos;emplacement et de l&apos;orientation des caméras</h2>
      <p>
        Lors de la réception de l&apos;installation, le client est invité à valider avec le technicien {site.name}{" "}
        l&apos;emplacement, l&apos;orientation et le champ de vision de chaque caméra installée.
      </p>
      <p>
        Une fois cette validation effectuée, une réclamation ultérieure portant uniquement sur la préférence du
        client pour un angle de vue différent, sans qu&apos;un défaut d&apos;installation ne soit démontré, ne
        constitue pas un vice ou un défaut imputable à {site.name}.
      </p>
      <p>
        Cette validation ne fait toutefois pas obstacle à la prise en compte d&apos;un défaut d&apos;installation
        réellement constaté, tel qu&apos;un défaut de fixation, un dysfonctionnement matériel ou une non-conformité
        avec ce qui avait été contractuellement convenu.
      </p>
      <p>
        Le client reconnaît avoir visualisé et validé le champ de vision des caméras au jour de la réception de
        l&apos;installation.
      </p>

      <h2 id="article-5" className={importantH2}>
        Article 5 — IMPORTANT — Modification ou déplacement des caméras après installation
      </h2>
      <p>Le présent article revêt une importance particulière et doit être lu attentivement par le client.</p>
      <p>
        À compter de la réception et de la mise en service de l&apos;installation, si le client, un employé, un
        occupant, un sous-traitant, un électricien, un technicien informatique, un autre installateur de systèmes de
        sécurité, une société de maintenance ou tout autre tiers :
      </p>
      <ul>
        <li>déplace une caméra</li>
        <li>la fait pivoter</li>
        <li>modifie son angle</li>
        <li>la repositionne</li>
        <li>remplace son objectif</li>
        <li>remplace la caméra</li>
        <li>modifie les zones de masquage ou de confidentialité</li>
        <li>modifie le zoom numérique ou les préréglages PTZ</li>
        <li>modifie sa configuration ou ses paramètres d&apos;enregistrement</li>
      </ul>
      <p>
        {site.name} ne pourra être tenue responsable des conséquences résultant directement de cette modification,
        dès lors que celle-ci n&apos;a pas été réalisée par {site.name} ni sur ses instructions.
      </p>
      <p>
        Le présent article ne saurait toutefois avoir pour effet d&apos;exonérer {site.name} de sa responsabilité
        pour un défaut sans lien avec cette modification et résultant de son intervention initiale.
      </p>

      <h2 id="article-6" className={importantH2}>
        Article 6 — IMPORTANT — Zones sensibles, privées ou interdites
      </h2>
      <p>
        {site.name} n&apos;installe et n&apos;oriente sciemment aucune caméra de vidéosurveillance dans des
        conditions qui porteraient une atteinte illicite ou disproportionnée à la vie privée des personnes.
      </p>
      <p>En particulier, {site.name} n&apos;installe pas de caméra destinée à filmer l&apos;intérieur de lieux tels que :</p>
      <ul>
        <li>les toilettes / WC</li>
        <li>les douches</li>
        <li>les vestiaires</li>
        <li>les cabines d&apos;essayage</li>
        <li>les salles de bains</li>
        <li>
          tout autre lieu présentant une attente particulièrement élevée de respect de la vie privée, dans lequel la
          surveillance serait interdite ou illicite
        </li>
      </ul>
      <p>
        Dans le cadre d&apos;une installation en milieu professionnel, {site.name} tient compte, dans la mesure de
        ses moyens et des informations transmises par le client, des règles applicables à la surveillance des
        salariés, notamment telles que rappelées par la Commission Nationale de l&apos;Informatique et des Libertés
        (CNIL).
      </p>
      <p>
        Au moment de l&apos;installation et de la réception, l&apos;orientation de chaque caméra est établie
        contradictoirement avec le client et peut être constatée et validée par celui-ci.
      </p>
      <p>
        Si, POSTÉRIEUREMENT à l&apos;installation, une caméra est déplacée, pivotée, réorientée, reconfigurée ou
        remplacée par le client ou par un tiers de telle sorte qu&apos;elle filme des toilettes, douches,
        vestiaires, cabines d&apos;essayage, un espace privé ou tout autre lieu contraire à la réglementation
        applicable, cette modification ultérieure est réalisée en dehors de toute intervention de {site.name} et
        relève de la seule responsabilité de son auteur.
      </p>
      <p>
        {site.name} ne saurait être tenue responsable de l&apos;usage illicite résultant d&apos;une telle
        modification postérieure, sauf lorsqu&apos;il est établi que {site.name} a elle-même réalisé ou sciemment
        ordonné cette réorientation illicite.
      </p>
      <p>
        Le client s&apos;engage à corriger immédiatement toute orientation non conforme dont il aurait connaissance
        et peut solliciter l&apos;assistance de {site.name} à cette fin.
      </p>
      <p>
        Le client reconnaît qu&apos;au jour de la réception de l&apos;installation, aucune caméra installée par{" "}
        {site.name} n&apos;est volontairement orientée vers des sanitaires, douches, vestiaires, cabines
        d&apos;essayage ou autre zone interdite ou manifestement incompatible avec le respect de la vie privée.
      </p>

      <h2 id="article-7">Article 7 — Responsabilité du client concernant l&apos;utilisation légale des caméras</h2>
      <p>
        {site.name} peut apporter un conseil technique concernant le positionnement des caméras au moment de
        l&apos;installation. Le client, en sa qualité de responsable de traitement au sens de la réglementation
        applicable à la protection des données personnelles, demeure toutefois responsable de l&apos;utilisation
        licite et continue de son système de vidéosurveillance après la mise en service.
      </p>
      <p>Il appartient ainsi au client, selon sa situation, de veiller notamment :</p>
      <ul>
        <li>à l&apos;affichage des panneaux et mentions d&apos;information requis</li>
        <li>à l&apos;information des salariés concernés, le cas échéant</li>
        <li>à la réalisation des consultations ou formalités requises par la réglementation applicable</li>
        <li>à la définition des personnes autorisées à accéder aux images</li>
        <li>à la détermination et au respect des durées de conservation</li>
        <li>au traitement des demandes d&apos;exercice de droits des personnes filmées</li>
        <li>au maintien de la conformité du système aux règles applicables en matière de protection de la vie privée</li>
        <li>à ne pas étendre la surveillance au-delà de ce qui est légalement autorisé</li>
      </ul>
      <p>
        Le présent article ne saurait être interprété comme exonérant {site.name} de sa responsabilité pour un
        positionnement de caméra qu&apos;elle aurait sciemment installé en violation manifeste de la réglementation
        applicable.
      </p>

      <h2 id="article-8">Article 8 — Durée d&apos;enregistrement</h2>
      <p>
        La durée d&apos;enregistrement communiquée au client, le cas échéant, constitue une estimation, sauf
        garantie contractuelle expresse et chiffrée figurant au devis ou au contrat.
      </p>
      <p>Cette durée peut varier en fonction :</p>
      <ul>
        <li>du nombre de caméras raccordées</li>
        <li>du débit (bitrate) configuré</li>
        <li>de la résolution d&apos;enregistrement</li>
        <li>du codec vidéo utilisé</li>
        <li>du nombre d&apos;images par seconde (FPS)</li>
        <li>du mode d&apos;enregistrement continu ou sur détection de mouvement</li>
        <li>de la complexité de la scène filmée</li>
        <li>de la capacité du disque dur installé</li>
        <li>des modifications de paramétrage effectuées postérieurement à l&apos;installation</li>
      </ul>

      <h2 id="article-9">Article 9 — Disque dur et perte d&apos;enregistrements</h2>
      <p>
        Les disques durs et supports de stockage électroniques constituent des composants susceptibles de tomber en
        panne, y compris de façon prématurée ou sans signe avant-coureur.
      </p>
      <p>
        Il appartient au client de vérifier périodiquement le bon fonctionnement de son enregistreur, notamment :
        l&apos;état de l&apos;enregistrement, l&apos;état du disque dur, la date et l&apos;heure du système, ainsi
        que la disponibilité des enregistrements.
      </p>
      <p>
        Sauf souscription expresse d&apos;une prestation de supervision ou de maintenance, {site.name} n&apos;assure
        pas de surveillance continue à distance de l&apos;enregistreur du client.
      </p>
      <p>
        Le client doit exporter sans délai tout enregistrement qu&apos;il souhaite conserver, le fonctionnement
        standard d&apos;un enregistreur NVR ou DVR reposant sur un principe d&apos;écrasement cyclique des données
        au fil du temps.
      </p>
      <p>
        {site.name} ne saurait être tenue responsable de la perte d&apos;enregistrements résultant de causes
        extérieures à son intervention, telles qu&apos;une panne matérielle non décelable lors de l&apos;installation
        ou une absence d&apos;exportation par le client. Cette limitation ne s&apos;applique pas en cas de défaut
        d&apos;installation ou de paramétrage erroné dûment imputable à {site.name} et directement à l&apos;origine
        de la perte constatée.
      </p>

      <h2 id="article-10">Article 10 — Internet et réseau</h2>
      <p>
        L&apos;accès à distance aux caméras et la réception des notifications peuvent dépendre de plusieurs éléments
        extérieurs à l&apos;installation réalisée par {site.name}, notamment :
      </p>
      <ul>
        <li>la connexion Internet du site</li>
        <li>le fournisseur d&apos;accès à Internet du client</li>
        <li>le routeur ou pare-feu utilisé</li>
        <li>le réseau Wi-Fi ou filaire</li>
        <li>la connexion mobile de l&apos;utilisateur</li>
        <li>la résolution DNS</li>
        <li>le téléphone du client</li>
        <li>le système d&apos;exploitation utilisé</li>
        <li>les serveurs du fabricant du matériel</li>
      </ul>
      <p>{site.name} n&apos;est pas le fournisseur d&apos;accès à Internet du client.</p>
      <p>
        Une perte d&apos;accès à distance résultant d&apos;une panne du fournisseur d&apos;accès, du remplacement
        d&apos;un routeur, d&apos;un changement de mot de passe, d&apos;une modification du réseau ou de toute cause
        extérieure similaire ne constitue pas un défaut d&apos;installation imputable à {site.name}.
      </p>

      <h2 id="article-11">Article 11 — Services tiers et applications des fabricants</h2>
      <p>
        Certains équipements installés reposent sur des services tiers ou des applications éditées par leurs
        fabricants respectifs, tels que, selon le matériel installé : DMSS, Hik-Connect, Ajax, EZVIZ, ou tout autre
        service cloud ou de type pair-à-pair (P2P) propre au fabricant, ainsi que les services de notifications push
        associés.
      </p>
      <p>
        La disponibilité, la compatibilité, l&apos;interface et les fonctionnalités de ces services peuvent être
        modifiées, restreintes ou interrompues à tout moment par leurs éditeurs respectifs, indépendamment de la
        volonté de {site.name}.
      </p>
      <p>{site.name} ne peut garantir le fonctionnement perpétuel de ces services cloud ou applications tiers.</p>

      <h2 id="article-12">Article 12 — Notifications sur smartphone</h2>
      <p>
        Les notifications push envoyées sur smartphone dépendent de plusieurs systèmes techniques extérieurs à
        l&apos;installation (application du fabricant, système d&apos;exploitation du téléphone, réseau mobile ou
        Wi-Fi, serveurs du fabricant).
      </p>
      <p>Ces notifications ne doivent pas être considérées comme un moyen de communication d&apos;urgence infaillible.</p>
      <p>Certains réglages du téléphone peuvent empêcher ou retarder leur réception, notamment :</p>
      <ul>
        <li>l&apos;optimisation de la batterie</li>
        <li>le mode silencieux</li>
        <li>le mode « Ne pas déranger »</li>
        <li>les autorisations de notification accordées à l&apos;application</li>
        <li>l&apos;absence de données mobiles ou de connexion Internet</li>
      </ul>

      <h2 id="article-13">Article 13 — Absence de télésurveillance</h2>
      <p>{site.name} n&apos;assure pas :</p>
      <ul>
        <li>la surveillance continue du site</li>
        <li>le visionnage permanent des caméras</li>
        <li>la réception systématique des alarmes</li>
        <li>l&apos;envoi d&apos;agents de sécurité sur place</li>
        <li>la mise en relation automatique avec les services de police ou de gendarmerie</li>
        <li>une garantie d&apos;intervention à la suite du déclenchement d&apos;une alarme</li>
      </ul>
      <p>
        Toute prestation de télésurveillance éventuellement souscrite par le client auprès d&apos;un prestataire
        tiers est régie par les conditions contractuelles propres à ce prestataire, indépendantes du présent
        document.
      </p>

      <h2 id="article-14">Article 14 — Fausses alertes</h2>
      <p>
        Une alarme ou une détection peut être déclenchée sans qu&apos;un événement réel ne soit à l&apos;origine du
        signal, notamment en raison :
      </p>
      <ul>
        <li>du passage d&apos;animaux</li>
        <li>d&apos;insectes à proximité du détecteur</li>
        <li>du mouvement de végétation</li>
        <li>des conditions météorologiques</li>
        <li>de reflets lumineux</li>
        <li>du déplacement d&apos;objets</li>
        <li>de l&apos;ouverture d&apos;une porte ou d&apos;une fenêtre</li>
        <li>d&apos;une erreur d&apos;utilisation</li>
        <li>d&apos;une modification des réglages</li>
        <li>d&apos;un changement dans l&apos;environnement surveillé</li>
      </ul>
      <p>
        La responsabilité de {site.name} demeure engagée lorsqu&apos;il est démontré que des alertes intempestives
        répétées résultent directement d&apos;un défaut d&apos;installation ou de paramétrage imputable à{" "}
        {site.name}.
      </p>

      <h2 id="article-15">Article 15 — Modification du système par le client ou un tiers</h2>
      <p>
        Toute intervention réalisée par le client ou par un tiers non mandaté par {site.name} sur l&apos;un des
        éléments suivants s&apos;effectue sous la responsabilité de son auteur :
      </p>
      <ul>
        <li>l&apos;enregistreur (NVR/DVR)</li>
        <li>une caméra</li>
        <li>la centrale d&apos;alarme</li>
        <li>un détecteur</li>
        <li>le routeur</li>
        <li>le commutateur (switch)</li>
        <li>le câblage</li>
        <li>l&apos;alimentation PoE</li>
        <li>les adresses IP</li>
        <li>les mots de passe</li>
        <li>les comptes utilisateurs</li>
        <li>le firmware</li>
        <li>la configuration d&apos;enregistrement</li>
        <li>les fonctions d&apos;analyse d&apos;image (IVS) ou de détection</li>
        <li>les scénarios d&apos;alarme</li>
      </ul>
      <p>
        Les conséquences directement causées par une telle modification réalisée par le client ou un tiers sont
        exclues du champ de responsabilité de {site.name}.
      </p>

      <h2 id="article-16">Article 16 — Installations et câblages préexistants</h2>
      <p>
        Lorsque {site.name} raccorde de nouveaux équipements à une installation préexistante appartenant au client,
        telle qu&apos;un câblage Ethernet, une installation électrique, des caméras, un enregistreur, des
        commutateurs, des équipements réseau, des gaines ou des alimentations déjà en place, {site.name} ne garantit
        pas automatiquement l&apos;état, la durée de vie ou l&apos;absence de vice caché de ces installations
        préexistantes, sauf lorsque celles-ci ont fait l&apos;objet d&apos;une inspection expresse et ont été
        intégrées au périmètre contractuel de la prestation.
      </p>

      <h2 id="article-17">Article 17 — Matériel fourni par le client</h2>
      <p>
        Lorsque le client fournit lui-même tout ou partie du matériel à installer, {site.name} peut être tenue
        responsable de la qualité de son propre travail d&apos;installation, mais ne peut garantir :
      </p>
      <ul>
        <li>la qualité intrinsèque du produit fourni</li>
        <li>l&apos;absence de défaut de fabrication caché</li>
        <li>le maintien du support technique par le fabricant</li>
        <li>
          la compatibilité totale du matériel lorsque celle-ci n&apos;a pas pu être raisonnablement vérifiée avant
          l&apos;installation
        </li>
        <li>la durée de vie du produit</li>
      </ul>

      <h2 id="article-18">Article 18 — Coupures électriques, surtensions et foudre</h2>
      <p>
        Les équipements installés peuvent être affectés par des coupures de courant, des surtensions, la foudre, une
        alimentation électrique instable ou un défaut de l&apos;installation électrique du bâtiment.
      </p>
      <p>
        {site.name} ne saurait être tenue responsable d&apos;un dommage causé par un événement électrique extérieur
        à son intervention, sauf lorsque ce dommage est directement imputable à un défaut de l&apos;installation
        électrique réalisée par {site.name} elle-même.
      </p>
      <p>
        Il est recommandé au client d&apos;équiper son installation d&apos;un onduleur (UPS) et de dispositifs de
        protection contre les surtensions, notamment dans les zones exposées aux orages ou aux variations de
        tension.
      </p>

      <h2 id="article-19">Article 19 — Eau, humidité et infiltration</h2>
      <p>
        Une distinction est opérée entre un défaut d&apos;installation imputable à {site.name} (par exemple une
        mauvaise étanchéité d&apos;un boîtier extérieur posé par ses soins) et un événement extérieur survenant
        postérieurement à l&apos;installation.
      </p>
      <p>
        Une inondation d&apos;origine externe, une infiltration provenant de la toiture ou du bâtiment, un nettoyage
        haute pression ou un dommage causé par un tiers ne sont pas automatiquement imputables à {site.name}.
      </p>

      <h2 id="article-20">Article 20 — Vandalisme et dommages physiques</h2>
      <p>{site.name} ne saurait être tenue responsable des dommages causés, après l&apos;installation, par :</p>
      <ul>
        <li>un acte de vandalisme délibéré</li>
        <li>un choc ou un impact</li>
        <li>un incendie</li>
        <li>des travaux de construction ou de rénovation</li>
        <li>un animal</li>
        <li>une tentative de vol ou de dégradation de l&apos;équipement</li>
        <li>toute intervention d&apos;un tiers non mandaté par {site.name}</li>
      </ul>
      <p>
        sauf lorsque ce dommage est légalement imputable à {site.name}, notamment en cas de défaut de fixation ou
        d&apos;installation dont elle serait à l&apos;origine.
      </p>

      <h2 id="article-21">Article 21 — Maintenance</h2>
      <p>Les systèmes de sécurité nécessitent une vérification périodique afin de garantir leur bon fonctionnement dans la durée.</p>
      <p>
        Il est recommandé au client de vérifier régulièrement : les caméras, la qualité d&apos;image, le bon
        déroulement de l&apos;enregistrement, l&apos;état du disque dur, la date et l&apos;heure du système, les
        détecteurs d&apos;alarme, les batteries, les sirènes, ainsi que la communication réseau des équipements.
      </p>
      <p>
        Sauf souscription d&apos;un contrat de maintenance distinct, l&apos;installation initiale réalisée par{" "}
        {site.name} ne constitue ni une surveillance perpétuelle, ni une maintenance à vie du système.
      </p>

      <h2 id="article-22">Article 22 — Batteries</h2>
      <p>
        La durée de vie des batteries équipant certains dispositifs (détecteurs, sirènes, télécommandes, etc.) est
        donnée à titre indicatif et varie selon l&apos;usage, la force du signal, la température ambiante, la
        fréquence de sollicitation du dispositif et sa configuration.
      </p>
      <p>
        Le remplacement des piles ou batteries consommables n&apos;est pas automatiquement inclus, de façon
        indéfinie, dans la prestation d&apos;installation initiale.
      </p>

      <h2 id="article-23">Article 23 — Identifiants, mots de passe et comptes</h2>
      <p>
        Lors de la remise de l&apos;installation, le client devient responsable de la conservation et de la
        confidentialité des identifiants et mots de passe qui lui sont communiqués.
      </p>
      <p>
        Le partage de ces identifiants avec des tiers, le choix ultérieur d&apos;un mot de passe faible, la
        compromission d&apos;une adresse électronique associée au compte ou le partage non autorisé de l&apos;accès
        au compte relèvent de la responsabilité du client.
      </p>
      <p>
        {site.name} s&apos;engage à appliquer des pratiques de sécurité raisonnables lors de la configuration
        initiale des équipements et des comptes associés.
      </p>

      <h2 id="article-24">Article 24 — Cybersécurité</h2>
      <p>Aucun système de sécurité connecté ne peut être présenté comme totalement à l&apos;abri d&apos;une cyberattaque.</p>
      <p>
        {site.name} applique, lors de l&apos;installation, une configuration de sécurité raisonnable au regard de
        l&apos;état de l&apos;art (modification des mots de passe par défaut, mise à jour du firmware disponible au
        moment de l&apos;installation, etc.).
      </p>
      <p>
        {site.name} ne peut toutefois garantir l&apos;absence de vulnérabilité future découverte par le fabricant,
        ni se prémunir contre un mot de passe compromis par le client, un appareil du client infecté par un logiciel
        malveillant, une intrusion sur le réseau du client imputable à un tiers, l&apos;utilisation d&apos;un
        équipement devenu obsolète et non supporté par son fabricant, ou une attaque survenant en dehors de son
        champ d&apos;intervention.
      </p>
      <p>Le présent article ne saurait être invoqué pour couvrir une configuration négligente réalisée par {site.name} elle-même.</p>

      <h2 id="article-25">Article 25 — Mises à jour firmware et logiciels</h2>
      <p>L&apos;installation réalisée par {site.name} ne crée pas d&apos;obligation perpétuelle de mise à jour des équipements installés.</p>
      <p>
        Les mises à jour ultérieures de firmware ou de logiciel pourront être proposées dans le cadre d&apos;un
        contrat de maintenance ou d&apos;une intervention distincte, sauf accord contraire expressément convenu
        entre les parties.
      </p>

      <h2 id="article-26">Article 26 — Changements de l&apos;environnement</h2>
      <p>
        Les performances d&apos;un système de vidéosurveillance ou d&apos;alarme peuvent évoluer en raison de
        modifications survenant dans l&apos;environnement surveillé, notamment : la pousse de végétation,
        l&apos;installation de nouveaux meubles, la pose d&apos;enseignes ou de panneaux, l&apos;édification de
        murs, l&apos;installation d&apos;échafaudages, le stationnement de véhicules, la modification de
        l&apos;éclairage, des travaux de construction ou des conditions météorologiques.
      </p>
      <p>De telles évolutions postérieures à l&apos;installation ne constituent pas, en elles-mêmes, un défaut d&apos;installation imputable à {site.name}.</p>

      <h2 id="article-27">Article 27 — Détection de plaques d&apos;immatriculation et identification de personnes</h2>
      <p>
        Une distinction doit être opérée entre une caméra de vidéosurveillance générale et une caméra dédiée à la
        lecture de plaques d&apos;immatriculation (LAPI/ANPR) ou à l&apos;identification de personnes.
      </p>
      <p>
        Sauf mention expresse figurant au devis, l&apos;installation d&apos;une caméra ne garantit pas la
        lisibilité systématique des plaques d&apos;immatriculation ni l&apos;identification des visages en toute
        condition (distance, vitesse, luminosité, angle, météo).
      </p>

      <h2 id="article-28">Article 28 — Signalement des anomalies</h2>
      <p>
        Le client s&apos;engage à signaler à {site.name}, dans les meilleurs délais, toute anomalie qu&apos;il
        constate, notamment : une caméra hors ligne, une absence d&apos;image, une erreur affectant le disque dur,
        un dysfonctionnement de l&apos;alarme, une panne de détecteur, une perte de communication ou un
        enregistrement anormal.
      </p>
      <p>
        Sous réserve des dispositions légales applicables, {site.name} ne saurait être raisonnablement tenue
        responsable des conséquences prolongées d&apos;une anomalie connue du client et que celui-ci se serait
        abstenu de signaler.
      </p>

      <h2 id="article-29">Article 29 — Sauvegarde des vidéos importantes</h2>
      <p>Les enregistrements réalisés par un enregistreur NVR ou DVR standard sont automatiquement écrasés au fil du temps, selon un fonctionnement cyclique.</p>
      <p>En cas d&apos;incident, il appartient au client d&apos;exporter et de sauvegarder sans délai les séquences vidéo qu&apos;il souhaite conserver.</p>
      <p>Sauf souscription expresse à une solution dédiée de sauvegarde ou d&apos;archivage, {site.name} ne garantit pas la conservation permanente des enregistrements.</p>

      <h2 id="article-30">Article 30 — Valeur probatoire des images</h2>
      <p>
        {site.name} peut apporter son assistance technique pour l&apos;extraction ou l&apos;export
        d&apos;enregistrements. Elle ne peut toutefois garantir que les forces de l&apos;ordre, les juridictions,
        les compagnies d&apos;assurance ou toute autre autorité considéreront une séquence donnée comme un élément
        de preuve suffisant.
      </p>

      <h2 id="article-31">Article 31 — Assurance</h2>
      <p>{site.name} ne décide pas de la prise en charge d&apos;un sinistre par l&apos;assureur du client.</p>
      <p>
        {site.name} peut, sur demande, fournir les factures, les descriptifs d&apos;installation ou les attestations
        relatives aux travaux effectivement réalisés, sans pouvoir garantir le remboursement du client par son
        assureur.
      </p>

      <h2 id="article-32">Article 32 — Déclaration auprès de la CNIL</h2>
      <p>
        La réalisation des éventuelles formalités déclaratives ou informatives requises auprès de la Commission
        Nationale de l&apos;Informatique et des Libertés (CNIL), ou de toute autre autorité compétente,
        préalablement à l&apos;installation d&apos;un système de vidéosurveillance ou de vidéoprotection, relève de
        la responsabilité du client, en sa qualité de responsable de traitement.
      </p>
      <p>
        {site.name} ne réalise pas ces démarches administratives pour le compte du client et présume, sauf
        indication contraire communiquée par celui-ci, que les formalités requises ont été accomplies préalablement
        à l&apos;installation.
      </p>
      <p>
        Si le client n&apos;a pas encore effectué ces démarches, {site.name} peut, à titre d&apos;assistance,
        l&apos;aider à compléter les documents nécessaires. Cette assistance ne constitue ni un transfert de la
        qualité de responsable de traitement, ni une garantie de conformité du dossier déposé auprès de la CNIL ou
        de toute autre autorité compétente.
      </p>
    </LegalPage>
  );
}
