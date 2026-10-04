import { Wrench } from "lucide-react";

// Temporary notice above the navbar while the site is being built. It is fixed and 2rem tall:
// the navbar sits at top-8 and <body> has pt-8 to make room for it. To remove it, delete this
// component from layout.tsx and drop those offsets (search for "maintenance bar").
export function MaintenanceBar() {
  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[1100] flex h-8 items-center justify-center gap-2 bg-gold px-4 text-center text-[0.8rem] leading-none font-semibold text-navy max-md:text-[0.72rem]"
    >
      <Wrench aria-hidden="true" strokeWidth={2.25} className="size-3.5 shrink-0" />
      Site en maintenance et en cours de création
    </div>
  );
}
