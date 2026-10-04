// Contact page form: validation used by the form before posting to Formspree.

export type ContactField = "name" | "email" | "message" | "phone" | "postalCode";

export type ContactState = { status: "idle" } | { status: "success" } | { status: "error"; message: string };

export function readContact(formData: FormData) {
  const get = (name: string) => String(formData.get(name) ?? "");
  return {
    name: get("name"),
    email: get("email"),
    message: get("message"),
    phone: get("phone"),
    postalCode: get("postal-code"),
    subject: get("subject"),
  };
}

// ["a", "b", "c"] -> "a, b et c"
function joinFr(items: string[]) {
  return items.length === 1 ? items[0] : `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Invalid fields + the message listing what is missing ("" when everything is valid).
export function validateContact({ name, email, message, phone, postalCode }: ReturnType<typeof readContact>) {
  const invalid: ContactField[] = [];
  const missing: string[] = [];

  if (!name.trim()) {
    invalid.push("name");
    missing.push("vos nom et prénom");
  }

  if (!emailRe.test(email.trim())) {
    invalid.push("email");
    missing.push(email.trim() ? "une adresse email valide" : "votre email");
  }

  if (!message.trim()) {
    invalid.push("message");
    missing.push("votre message");
  }

  // Phone: required + at least 8 digits.
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 8) {
    invalid.push("phone");
    missing.push(digits.length === 0 ? "votre téléphone" : "un numéro de téléphone valide");
  }

  if (!/^\d{5}$/.test(postalCode.trim())) {
    invalid.push("postalCode");
    missing.push("un code postal valide");
  }

  return { invalid, message: missing.length ? `Merci de renseigner ${joinFr(missing)}.` : "" };
}
