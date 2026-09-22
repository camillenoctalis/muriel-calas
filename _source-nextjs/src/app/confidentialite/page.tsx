import { LegalPage, ToComplete } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité | Muriel Calas",
  description: "Comment sont traitées les données personnelles transmises sur le site de Muriel Calas, préparatrice mentale.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité" path="/confidentialite" updated="septembre 2026">
      <p>
        La confidentialité est au cœur de mon accompagnement, en séance comme sur ce site. Cette page explique
        simplement quelles données sont collectées, pourquoi, et quels sont vos droits.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        Muriel Calas, préparatrice mentale, Mirepeisset (Aude). Contact : <ToComplete>adresse e-mail dédiée aux
        questions de données personnelles</ToComplete>.
      </p>

      <h2>Données collectées</h2>
      <p>Via le formulaire de contact, uniquement les informations que vous choisissez de transmettre :</p>
      <ul>
        <li>prénom, nom et adresse e-mail ;</li>
        <li>numéro de téléphone (facultatif) ;</li>
        <li>votre profil (sportif, parent, étudiant…), le sujet et le contenu de votre message.</li>
      </ul>

      <h2>Finalité et base légale</h2>
      <p>
        Ces données servent exclusivement à répondre à votre demande et, le cas échéant, à organiser un premier
        échange. Le traitement repose sur votre consentement, exprimé en cochant la case prévue à cet effet.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les messages sont conservés le temps nécessaire au traitement de votre demande, puis au maximum{" "}
        <ToComplete>durée, par exemple 3 ans</ToComplete> après le dernier contact.
      </p>

      <h2>Destinataires</h2>
      <p>
        Vos données sont destinées à Muriel Calas uniquement. Elles ne sont ni vendues, ni cédées, ni utilisées à des
        fins commerciales. Le service d’envoi d’e-mails utilisé pour acheminer le formulaire agit en tant que
        sous-traitant.
      </p>

      <h2>Prise de rendez-vous en ligne</h2>
      <p>
        La réservation en ligne s’appuie sur le service Calendly. L’agenda n’est chargé qu’à votre demande, lorsque
        vous cliquez sur « Voir les disponibilités ». Les données saisies lors d’une réservation sont alors traitées
        selon la politique de confidentialité de Calendly.
      </p>

      <h2>Cookies et mesure d’audience</h2>
      <p>
        Ce site n’utilise pas de cookies publicitaires. <ToComplete>préciser l’outil de mesure d’audience s’il en est
        installé un, et le recueil du consentement associé</ToComplete>
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et
        d’opposition au traitement de vos données. Pour les exercer, contactez-moi par téléphone ou via le formulaire
        de contact. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>
    </LegalPage>
  );
}
