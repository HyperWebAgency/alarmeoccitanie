// Quote funnel ("Votre demande de devis en moins d'une minute"): questions and answer helpers,
// shared by the funnel component and its Formspree payload.

export type Profil = "Particulier" | "Professionnel";
export type QuestionId = "profil" | "bien" | "motivation" | "systeme" | "delai";

export type QuestionStep = {
  id: QuestionId;
  question: (profil?: string) => string;
  options: (profil?: string) => string[];
};

export const questionSteps: QuestionStep[] = [
  {
    id: "profil",
    question: () => "Quel est votre profil ?",
    options: () => ["Particulier", "Professionnel"],
  },
  {
    id: "bien",
    question: () => "Que souhaitez-vous protéger ?",
    options: (p) =>
      p === "Professionnel"
        ? ["Commerce", "Bureaux", "Entrepôt / local d'activité", "Autre"]
        : ["Maison", "Appartement", "Résidence secondaire", "Autre"],
  },
  {
    id: "motivation",
    question: (p) =>
      p === "Professionnel"
        ? "Qu'est-ce qui vous amène à renforcer la sécurité de vos locaux ?"
        : "Qu'est-ce qui vous amène à renforcer la sécurité de votre propriété ?",
    options: () => [
      "Un emménagement récent",
      "Un incident ou une tentative d'intrusion",
      "Un besoin de tranquillité au quotidien",
      "Je souhaite être conseillé(e)",
    ],
  },
  {
    id: "systeme",
    question: () => "Quel système souhaitez-vous installer ?",
    options: () => [
      "Alarme",
      "Vidéosurveillance",
      "Alarme et vidéosurveillance",
      "Interphone / visiophone",
      "Contrôle d'accès",
      "Autre / je ne sais pas encore",
    ],
  },
  {
    id: "delai",
    question: () => "Quand souhaitez-vous mettre en place votre projet ?",
    options: () => ["Dès que possible", "Dans les 3 mois", "Dans les 6 mois", "Projet en réflexion"],
  },
];

// Question steps + the final contact step.
export const totalSteps = questionSteps.length + 1;

export const questionLabels: Record<QuestionId, string> = {
  profil: "Profil",
  bien: "Bien à protéger",
  motivation: "Motivation",
  systeme: "Système souhaité",
  delai: "Délai",
};

// Answers posted as hidden fields alongside the "Rappelez-moi" contact fields (see lib/callback.ts).
export function readAnswers(formData: FormData) {
  return Object.fromEntries(questionSteps.map((s) => [s.id, String(formData.get(s.id) ?? "").trim()])) as Record<QuestionId, string>;
}
