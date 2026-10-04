import Link from "next/link";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

type Crumb = { label: string; href?: string };

// Visible "Accueil › Page" trail + the matching BreadcrumbList JSON-LD.
export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Fil d'Ariane" className={`text-[0.9rem] text-[#999] ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-2">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-x-2">
              {i > 0 && <span aria-hidden="true">›</span>}
              {item.href ? (
                <Link href={item.href} className="text-[#666] transition-colors hover:text-gold-dark">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
