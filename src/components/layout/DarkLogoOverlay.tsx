import Image from "next/image";

// The navbar's desktop logo is white (made for the dark hero) and would vanish on pages that start with a
// white band. A dark copy is laid exactly over it; purely visual, clicks still go to the navbar.
export function DarkLogoOverlay() {
  return (
    <Image
      src="/images/logo/alarme-occitanie-logo.png"
      alt=""
      aria-hidden="true"
      width={800}
      height={276}
      loading="eager"
      sizes="190px"
      className="pointer-events-none absolute top-[calc(var(--bar-h)+1.25rem)] left-12 z-[1070] hidden h-[62px] w-auto lg:block"
    />
  );
}
