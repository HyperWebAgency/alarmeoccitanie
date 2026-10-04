import type { OpenStatus } from "@/lib/hours";

// "Actuellement ouvert / fermé" pill shown above the contact forms (Rappelez-moi popup, quote funnel).
// The status is time-dependent: callers compute it on the client (when the form is shown), never during SSR.
export function OpenStatusBadge({ status, className = "" }: { status: OpenStatus | null; className?: string }) {
  return (
    <div
      aria-live="polite"
      className={`mx-auto flex w-fit items-center gap-[0.45rem] rounded-[50px] px-[0.9rem] py-[0.35rem] text-[0.82rem] font-semibold empty:hidden max-md:px-[0.8rem] max-md:py-[0.3rem] max-md:text-[0.78rem] ${
        status?.open ? "bg-[#e8f7ec] text-[#1f8a3b]" : "bg-[#fdecec] text-[#c0392b]"
      } ${className}`}
    >
      {status && (
        <>
          <span
            className={`size-2 shrink-0 rounded-full ${
              status.open ? "bg-[#28a745] shadow-[0_0_0_3px_rgba(40,167,69,0.2)]" : "bg-[#e02424] shadow-[0_0_0_3px_rgba(224,36,36,0.18)]"
            }`}
          />
          {status.label}
        </>
      )}
    </div>
  );
}
