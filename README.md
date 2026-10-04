# alarmeoccitanie.fr

Site d'Alarme Occitanie — Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · hébergé sur Vercel.

## Commandes

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run lint
```

## Où modifier quoi

- `src/lib/site.ts` — **source unique** des infos entreprise (NAP, horaires, note Google, zones). Doit correspondre exactement à la fiche Google Business Profile.
- `src/lib/schema.ts` — données structurées JSON-LD.
- `src/lib/metadata.ts` — `pageMetadata()` à utiliser pour chaque nouvelle page (title, description, canonical, OG).
- `src/app/sitemap.ts` — ajouter chaque nouvelle page indexable.
- `src/lib/navigation.ts` — liens du menu (Services, Nos offres) ; `quoteHref` mène au tunnel de devis (`/#devis`).
- `src/lib/reviews.ts` — avis affichés sur l'accueil.
- `src/lib/quote.ts` — questions du tunnel « Votre demande de devis en moins d'une minute ».
- `photos/` — dépôt des photos brutes (non publiées), converties en WebP dans `public/images/`.

## Formulaires

Les 3 formulaires (« Rappelez-moi », tunnel de devis, page `/contact`) envoient depuis le navigateur vers Formspree
(`site.formspree` dans `src/lib/site.ts`, envoi dans `src/lib/formspree.ts`). Aucune variable d'environnement n'est
nécessaire. Ne pas envoyer de vrais tests en boucle : chaque envoi compte dans le quota Formspree.

Le site ne dépose aucun cookie.

## Règles de marque

Couleurs : blanc, navy `#0E2238`, or `#C8992F`. L'or en texte sur fond blanc n'est pas assez contrasté : utiliser `text-gold-dark` (`#8A6A1F`). Les boutons or ont un texte navy.
