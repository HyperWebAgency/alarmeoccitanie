// Shared client for every form on the site: posts straight to Formspree from the browser
// (no API key, no DNS setup — see site.formspree in src/lib/site.ts).

import { site } from "@/lib/site";

export type FormspreeState = { status: "success" } | { status: "error"; message: string };

// Formspree replies 200 with { ok: true } on success, and a non-ok status with an "errors"
// array otherwise. Either way we fall back to the same French message asking to call.
export async function submitToFormspree(payload: Record<string, string>): Promise<FormspreeState> {
  const res = await fetch(site.formspree, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.ok) return { status: "success" };
  return { status: "error", message: `Une erreur s'est produite. Appelez-nous au ${site.phone.display}.` };
}
