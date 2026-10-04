// "Rappelez-moi" callback request: validation shared by the widget and the quote funnel.

export type CallbackField = "nom_complet" | "telephone" | "besoin";

export type CallbackState = { status: "idle" } | { status: "success" } | { status: "error"; message: string };

export function readCallback(formData: FormData) {
  const get = (name: CallbackField) => String(formData.get(name) ?? "");
  return { nom: get("nom_complet"), tel: get("telephone"), besoin: get("besoin") };
}

// ["a", "b", "c"] -> "a, b et c"
function joinFr(items: string[]) {
  return items.length === 1 ? items[0] : `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

// Invalid fields + the message listing what is missing ("" when everything is valid).
// The quote funnel already knows the project, so "besoin" is optional there.
export function validateCallback(
  { nom, tel, besoin }: ReturnType<typeof readCallback>,
  { besoinRequired = true }: { besoinRequired?: boolean } = {},
) {
  const invalid: CallbackField[] = [];
  const missing: string[] = [];

  if (!nom.trim()) {
    invalid.push("nom_complet");
    missing.push("vos nom et prénom");
  }

  // Phone: required + at least 8 digits.
  const digits = tel.replace(/\D/g, "");
  if (digits.length < 8) {
    invalid.push("telephone");
    missing.push(digits.length === 0 ? "votre téléphone" : "un numéro de téléphone valide");
  }

  if (besoinRequired && !besoin.trim()) {
    invalid.push("besoin");
    missing.push("votre besoin");
  }

  return { invalid, message: missing.length ? `Merci de renseigner ${joinFr(missing)}.` : "" };
}
