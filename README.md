# EFFECTIVE'PLOMBERIE — Documentation complète du site

Site vitrine professionnel pour **Wissem ALAYA** — plombier certifié RGE à **Aix-en-Provence**, intervention sur **Marseille** et tout le **département 13**.

**Domaine cible :** [https://www.effective-plomberie.fr](https://www.effective-plomberie.fr)

---

## Sommaire

1. [Vue d'ensemble](#1-vue-densemble)
2. [Identité & marque](#2-identité--marque)
3. [Stack technique](#3-stack-technique)
4. [Architecture du projet](#4-architecture-du-projet)
5. [Pages & routes](#5-pages--routes)
6. [Images WebP](#6-images-webp)
7. [SEO — référencement](#7-seo--référencement)
8. [Pages géo locales (50 villes)](#8-pages-géo-locales-50-villes)
9. [Blog (12 articles)](#9-blog-12-articles)
10. [RGPD & cookies](#10-rgpd--cookies)
11. [Sécurité](#11-sécurité)
12. [Google Analytics 4](#12-google-analytics-4)
13. [Formulaires & données](#13-formulaires--données)
14. [Structure des fichiers](#14-structure-des-fichiers)
15. [Installation & commandes](#15-installation--commandes)
16. [Déploiement Hostinger](#16-déploiement-hostinger)
17. [Checklist mise en production](#17-checklist-mise-en-production)
18. [À faire / évolutions](#18-à-faire--évolutions)

---

## 1. Vue d'ensemble

| Élément | Détail |
|--------|--------|
| **Type** | SPA React (Single Page Application) — build statique Vite |
| **Client** | EFFECTIVE'PLOMBERIE — Entrepreneur individuel |
| **Dirigeant** | Wissem ALAYA |
| **Création entreprise** | 11 novembre 2019 |
| **Siège** | 2 Bd du Clos Gabriel, 13100 Aix-en-Provence |
| **SIRET** | 878 778 778 00018 |
| **Langue** | Français (`lang="fr"`) |
| **Pages indexables** | ~70+ (accueil, services, blog, géo, légal…) |
| **Port dev** | `3000` |

### Ce qui a été livré (résumé A → Z)

- Site vitrine moderne (React 19, TypeScript, Tailwind 4, animations Motion)
- **50 pages SEO locales** par commune du 13 (`/plombier-vitrolles`, etc.)
- **12 articles de blog** optimisés SEO
- Conformité **RGPD/CNIL** (bandeau cookies, politique, mentions légales)
- **Google Analytics 4** conditionnel au consentement + événements conversions
- **JSON-LD** (Plumber, FAQ, WebSite, articles blog, pages géo)
- **4 sitemaps XML** + `robots.txt`
- Images **WebP** optimisées (performance & SEO)
- En-têtes **sécurité** (CSP, HSTS, X-Frame-Options…) dev + production
- Positionnement **Aix-en-Provence + Marseille + Bouches-du-Rhône**

---

## 2. Identité & marque

Toute la configuration centralisée est dans **`src/brand.ts`**.

| Champ | Valeur actuelle |
|-------|-----------------|
| Nom | EFFECTIVE'PLOMBERIE |
| Dirigeant | Wissem ALAYA |
| E-mail | contact@effective-plomberie.fr |
| Téléphone | `04 42 00 00 00` (**provisoire** — à remplacer) |
| Tél. lien `tel:` | `+33442000000` |
| Site URL | https://www.effective-plomberie.fr |
| Année création | 2019 |
| Stats accueil | « Depuis 2019 » · « 500+ » interventions |
| Note Google (schema) | 4,9 / 87 avis |
| Adresse siège | 2 Bd du Clos Gabriel, 13100 Aix-en-Provence |
| Zone intervention | Aix-en-Provence, Marseille & tout le 13 |
| Hébergeur | Hostinger International Ltd |

**Pour modifier le téléphone partout :** éditer uniquement `phone` et `phoneTel` dans `src/brand.ts`.

---

## 3. Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 19.x | Interface utilisateur |
| **TypeScript** | 5.8 | Typage statique |
| **Vite** | 6.x | Build, dev server, HMR |
| **React Router** | 7.x | URLs propres, navigation SPA |
| **Tailwind CSS** | 4.x | Styles (`@tailwindcss/vite`) |
| **Motion** | 12.x | Animations (pages, carousel, accordéons) |
| **Lucide React** | 0.54x | Icônes |
| **@fontsource/outfit** | 5.x | Police principale (auto-hébergée) |
| **@fontsource/jetbrains-mono** | 5.x | Police mono (auto-hébergée) |
| **web-vitals** | 5.x | Mesure performances (LCP, CLS, INP…) |

> Les polices Google Fonts ont été **retirées** au profit de `@fontsource` (meilleure perf, pas de requête externe obligatoire).

---

## 4. Architecture du projet

```
┌──────────────────────────────────────────────────────────────────┐
│  index.html  →  main.tsx  →  App.tsx                             │
├──────────────────────────────────────────────────────────────────┤
│  SEOHead (meta dynamiques) · LegacyHashRedirect                  │
│  Header (nav fixe, logo WebP, menu mobile)                       │
├──────────────────────────────────────────────────────────────────┤
│  <main> React Router + AnimatePresence                            │
│    /  /services  /realisations  /devis  /projet  /contact        │
│    /blog  /blog/:slug  /a-propos                                │
│    /politique-de-confidentialite  /mentions-legales              │
│    /:slug  →  GeoPage (50 villes, ex. /plombier-aix-en-provence) │
├──────────────────────────────────────────────────────────────────┤
│  ZoneSEO (sr-only, pages hors géo) · Footer · GeoFooterLinks     │
├──────────────────────────────────────────────────────────────────┤
│  CookieBanner · CookiePanel · CookieButton (RGPD)                │
│  AdminSection (inspection localStorage)                          │
└──────────────────────────────────────────────────────────────────┘
```

### Couches

| Couche | Dossier / fichiers | Rôle |
|--------|-------------------|------|
| **Shell** | `App.tsx`, `main.tsx` | Layout, routage, tracking |
| **Marque** | `src/brand.ts` | Nom, tel, adresse, légal, stats |
| **Images** | `src/constants/images.ts` | Chemins WebP centralisés |
| **Contenu** | `src/data.ts` | Services, réalisations, avis, certifications |
| **SEO** | `src/seo/` | Meta, JSON-LD, sitemaps config |
| **Géo** | `src/geo/` | 50 communes, contenu unique |
| **Blog** | `src/blog/` | 12 articles, catégories, SEO article |
| **RGPD** | `src/rgpd/` | Consentement cookies, catégories |
| **Analytics** | `src/analytics/` | GA4, Web Vitals, page tracking |
| **Pages** | `src/components/` | UI métier |
| **Assets** | `public/images/` | Fichiers WebP servis tels quels |

---

## 5. Pages & routes

### Routes principales

| URL | Composant | SEO (`ViewType`) |
|-----|-----------|------------------|
| `/` | `Home.tsx` | `home` |
| `/services` | `Services.tsx` | `services` |
| `/realisations` | `Realisations.tsx` | `realisations` |
| `/devis` | `Devis.tsx` + `DevisForm.tsx` | `devis` |
| `/projet` | `Projet.tsx` + `PrestationForm.tsx` | `projet` |
| `/contact` | `Contact.tsx` + `ContactForm.tsx` | `contact` |
| `/blog` | `Blog.tsx` | `blog` |
| `/blog/:slug` | `BlogPost.tsx` | `blogPost` (SEO dédié) |
| `/a-propos` | `APropos.tsx` | `apropos` |
| `/politique-de-confidentialite` | `PolitiqueConfidentialite.tsx` | `privacy` |
| `/mentions-legales` | `MentionsLegales.tsx` | `legal` |
| `/plombier-*` | `GeoPage.tsx` | `geo` (meta dynamique par ville) |

Définition navigation : **`src/router/routes.tsx`**

### Accueil (`Home.tsx`)

- Hero H1 SEO : **« Plombier à Aix-en-Provence & Marseille »**
- Bannière WebP preload
- Stats : Depuis 2019 · 500+ interventions · 4,9★ · 24h/7j
- CTA devis + appel téléphone (tracking GA4)
- Aperçu services + carousel témoignages

### Services, réalisations, formulaires

- **6 services** en accordéon avec images WebP, tarifs indicatifs, CTA
- **6 réalisations** filtrables (tous / rénovation / chauffage / dépannage)
- **3 formulaires** : contact, devis (estimation dynamique), projet pro (upload simulé)

### Anciens liens hash

`/#services` → `/services`, etc. (`LEGACY_HASH_REDIRECTS` dans `routes.tsx`)

---

## 6. Images WebP

### Fichiers dans `public/images/`

| Fichier | Usage |
|---------|--------|
| `logoeffectiv.webp` | Logo header/footer, **favicon**, apple-touch-icon, PWA |
| `banniere.webp` | Hero accueil, preload LCP |
| `og-effective-plomberie.webp` | Open Graph, Twitter Card, partage réseaux |
| `depannageurgent.webp` | Service dépannage, carousel, blog |
| `installationchaudiere.webp` | Service chauffage, carousel |
| `creationsalledebain.webp` | Service SDB, réalisations |
| `raccordements-reseau.webp` | Service raccordements |
| `realisation-31.webp` … `realisation-35.webp` | Galerie réalisations |

### Centralisation des chemins

**`src/constants/images.ts`** — modifier un chemin une seule fois :

```ts
export const SITE_IMAGES = {
  logo: '/images/logoeffectiv.webp',
  og: '/images/og-effective-plomberie.webp',
  banniere: '/images/banniere.webp',
  // ...
} as const;
```

Utilisé par : `data.ts`, `Home.tsx`, `blogData.ts`, `OptimizedImage` (fallback erreur).

### Source des fichiers

Images converties depuis le dossier fourni `imageplombierwebp` → copiées dans `public/images/`.

Les anciens **PNG/JPG** ont été retirés du dossier public (gain de poids, cohérence SEO).

### Composant `OptimizedImage.tsx`

- `loading="lazy"` (sauf `priority` sur hero)
- `fetchPriority="high"` sur bannière
- Fallback vers le logo WebP si image cassée

### SEO images

- `sitemap.xml` : balises `<image:image>` en `.webp`
- `index.html` : `og:image` + `og:image:type` = `image/webp`
- Preload hero : `<link rel="preload" href="/images/banniere.webp" type="image/webp">`

---

## 7. SEO — référencement

### Meta dynamiques par page

| Fichier | Rôle |
|---------|------|
| `src/seo/seoConfig.ts` | Titres, descriptions, keywords, canonical par `ViewType` |
| `src/seo/useSEO.ts` | Injection `title`, meta, OG, Twitter, canonical |
| `src/components/SEOHead.tsx` | Branché dans `App.tsx` |

Les pages **blog** et **géo** ont leurs propres meta (override dans `BlogPost` / `GeoPage`).

### `index.html` — SEO statique accueil

- Title : Plombier **Aix-en-Provence** & Marseille (Aix en premier)
- Meta geo : `FR-13`, coordonnées **Aix** (43.5263, 5.4454)
- Open Graph + Twitter Card (image WebP 1200×630)
- Canonical + `hreflang` fr / x-default
- Favicon WebP + `site.webmanifest`
- JSON-LD inline (`#ld-json-graph`) : Plumber, WebSite, FAQPage

### JSON-LD (données structurées)

| Type | Où |
|------|-----|
| **Plumber** + adresse Aix + `areaServed` | `index.html`, `structuredDataGraph.ts` |
| **WebSite** | `index.html` |
| **FAQPage** | Accueil + chaque page géo |
| **BlogPosting** + **BreadcrumbList** | `BlogPost.tsx` |
| **Plumber** géolocalisé | `GeoPage.tsx` (lat/lng par ville) |

Fichier maintenance : **`src/seo/structuredDataGraph.ts`**

### Zone SEO texte (accessibilité)

**`src/components/ZoneSEO.tsx`** — blocs sémantiques masqués visuellement (`sr-only`) sur les pages **hors géo**, listant les communes du 13. Les vraies pages indexables sont les **GeoPage**.

### Sitemaps (`public/`)

| Fichier | Contenu |
|---------|---------|
| `sitemap.xml` | Pages principales + images WebP |
| `sitemap-geo.xml` | **50 URLs** `/plombier-*` |
| `sitemap-blog.xml` | 12 articles `/blog/:slug` |
| `sitemap-local.xml` | Anciennes zones query (legacy) |

### `robots.txt`

```
Allow: /
Disallow: /src/, /node_modules/, /dist/
Sitemap: sitemap.xml
Sitemap: sitemap-local.xml
Sitemap: sitemap-blog.xml
Sitemap: sitemap-geo.xml
```

### Mots-clés cibles (exemples)

- plombier aix en provence, plombier marseille, plombier 13100, plombier 13
- dépannage plomberie aix, urgence plombier marseille
- installation chaudière, salle de bain, MaPrimeRénov'

### Outils à utiliser après déploiement

1. [Google Search Console](https://search.google.com/search-console) — soumettre les 4 sitemaps
2. [Rich Results Test](https://search.google.com/test/rich-results)
3. [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 8. Pages géo locales (50 villes)

### Objectif

Quand quelqu'un cherche **« plombier Vitrolles »** ou **« plombier 13127 »** → page dédiée `/plombier-vitrolles` avec contenu **unique** (pas de duplicate content).

### URLs

Format : `https://www.effective-plomberie.fr/plombier-{ville}`

Exemples :
- `/plombier-aix-en-provence` (priorité 1.0)
- `/plombier-marseille`
- `/plombier-marseille-8eme`
- `/plombier-vitrolles`
- `/plombier-martigues`
- … **50 pages au total**

### Répartition

| Source | Nombre | Fichier |
|--------|--------|---------|
| Villes principales (contenu détaillé) | 21 | `src/geo/geoCitiesPrimary.ts` |
| Arrondissements Marseille + communes 13 | 29 | `src/geo/geoCitiesExtended.ts` |
| **Total** | **50** | fusion dans `src/geo/geoData.ts` |

### Contenu unique par ville

Chaque `GeoCity` contient :
- `metaTitle`, `metaDescription`, `h1`
- `intro`, `logements`, `problemesTypiques` (3–4)
- `quartiers`, `particularite`
- `delaiIntervention`, `distanceFromAix`
- `faq` (2–3 questions)
- `testimonial` (optionnel)
- Coordonnées `lat` / `lng` pour JSON-LD

### Fichiers clés

| Fichier | Rôle |
|---------|------|
| `src/geo/types.ts` | Interface `GeoCity` |
| `src/geo/helpers.ts` | Remplacement `[TELEPHONE]` → `BRAND.phone` |
| `src/geo/geoData.ts` | Export `GEO_CITIES`, `getCityBySlug`, footer |
| `src/components/GeoPage.tsx` | Template page |
| `src/components/GeoFooterLinks.tsx` | Grille liens villes dans footer |
| `scripts/generate-geo-cities.mjs` | Régénération données + `sitemap-geo.xml` |

### Régénérer les villes / sitemap

```bash
node scripts/generate-geo-cities.mjs
```

### Route React

Dans `App.tsx`, route **en dernier** :

```tsx
<Route path="/:slug" element={<GeoPage />} />
```

Slug inconnu → redirection accueil.

---

## 9. Blog (12 articles)

### Routes

- Liste : `/blog`
- Article : `/blog/:slug`

### Articles

| Slug | Thème |
|------|--------|
| `renovation-salle-de-bain-aix-en-provence` | Rénovation SDB Aix |
| `ballon-eau-chaude-aix-en-provence-guide` | Ballon eau chaude |
| `installation-chaudiere-gaz-marseille` | Chaudière gaz Marseille |
| `fuite-eau-que-faire-aix-marseille` | Fuite d'eau urgence |
| `plomberie-cuisine-aix-en-provence` | Plomberie cuisine |
| `maprimerénov-plomberie-chauffage-bouches-du-rhone` | Aides MaPrimeRénov' |
| `plombier-aix-en-provence-13100` | Plombier Aix |
| `plancher-chauffant-hydraulique-aix-marseille` | Plancher chauffant |
| `salle-de-bain-pmr-aix-en-provence` | SDB PMR |
| `debouchage-canalisation-marseille` | Débouchage Marseille |
| `raccordement-gaz-normes-bouches-du-rhone` | Normes gaz |
| `plombier-communes-autour-aix-en-provence` | Communes autour d'Aix |

### Fichiers

| Fichier | Rôle |
|---------|------|
| `src/blog/blogData.ts` | Contenu articles, FAQ, zones |
| `src/blog/blogCategories.ts` | Catégories filtre |
| `src/blog/useBlogSEO.ts` | Meta + canonical par article |
| `src/components/Blog.tsx` | Liste |
| `src/components/BlogPost.tsx` | Article + JSON-LD BlogPosting |

### Images de couverture blog

Pas de dossier `/images/blog/` séparé : les couvertures pointent vers les **WebP du site** (`SITE_IMAGES`) selon le thème de l'article.

---

## 10. RGPD & cookies

### Conformité CNIL

| Élément | Fichier |
|---------|---------|
| Bandeau consentement | `src/components/CookieBanner.tsx` |
| Panneau préférences | `src/components/CookiePanel.tsx` |
| Bouton rouvrir choix | `src/components/CookieButton.tsx` |
| Logique consentement | `src/rgpd/useCookieConsent.ts` |
| Catégories cookies | `src/rgpd/cookieCategories.ts` |
| Stockage choix | `src/rgpd/cookieManager.ts` |

### Catégories

1. **Nécessaires** (toujours actifs) — consentement, localStorage formulaires
2. **Analytics** (opt-in) — Google Analytics 4
3. **Marketing** (opt-in) — réservé extensions futures

### Pages légales

| URL | Contenu |
|-----|---------|
| `/politique-de-confidentialite` | RGPD, droits, cookies, hébergeur, SIRET |
| `/mentions-legales` | Mentions légales complètes (Wissem ALAYA, Hostinger…) |

Données réelles depuis `BRAND.legal` et `BRAND.hosting`.

### GA4

Le tracking **ne démarre qu'après** consentement analytics (`useCookieConsent` + chargement conditionnel gtag).

---

## 11. Sécurité

### En-têtes HTTP (production)

| Fichier | Hébergeur |
|---------|-----------|
| `public/_headers` | Netlify / Cloudflare Pages |
| `public/.htaccess` | Apache / **Hostinger** |

### En-têtes appliqués

| En-tête | Valeur |
|---------|--------|
| `Content-Security-Policy` | Scripts limités (self, GA, GTM), `frame-ancestors 'none'` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, mic, payment désactivés |
| `Strict-Transport-Security` | 1 an, preload |
| `Cross-Origin-Opener-Policy` | `same-origin` |

### Développement local

Mêmes en-têtes via **`vite.config.ts`** (`server.headers` et `preview.headers`).

### Note console

`X-Frame-Options` **ne doit pas** être en balise `<meta>` (ignoré par le navigateur). Il est configuré uniquement en **en-tête HTTP** — l'avertissement console a été corrigé.

### Cache

- Assets JS/CSS : 1 an immutable
- Images `/images/*` : 7 jours
- HTML SPA : no-store (comportement classique SPA)

---

## 12. Google Analytics 4

### Configuration

Variable d'environnement (fichier `.env` à la racine) :

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Fichiers

| Fichier | Rôle |
|---------|------|
| `src/analytics/ga4.ts` | Événements métier |
| `src/analytics/usePageTracking.ts` | `page_view` à chaque navigation |
| `src/analytics/useWebVitals.ts` | LCP, INP, CLS… |

### Événements trackés

| Événement | Déclencheur |
|-----------|-------------|
| `page_view` | Changement de route |
| `phone_call_click` | Clic `tel:` (header, footer, hero, contact…) |
| `devis_cta_click` | Clic CTA vers `/devis` |
| `devis_submit` + `generate_lead` | Envoi formulaire devis |
| `contact_submit` + `generate_lead` | Envoi formulaire contact |
| `projet_submit` + `generate_lead` | Envoi formulaire projet |
| `service_interaction` | Accordéon services |
| `gallery_filter` | Filtre réalisations |

---

## 13. Formulaires & données

### Formulaires

| Formulaire | Route | Stockage |
|------------|-------|----------|
| Contact | `/contact` | `localStorage` → `contactSubmissions` |
| Devis | `/devis` | `localStorage` → `devisSubmissions` |
| Projet pro | `/projet` | `localStorage` → `projetSubmissions` |

> **Important :** pas d'envoi e-mail serveur configuré par défaut. Les demandes restent dans le **navigateur** de l'utilisateur. L'**AdminSection** (bouton flottant) permet de les consulter en local.

### Admin local

**`src/components/AdminSection.tsx`** — panneau latéral pour voir/supprimer les soumissions (démo / test).

---

## 14. Structure des fichiers

```
artisan-plomberie/
├── index.html                 # SEO statique, JSON-LD, favicon WebP
├── package.json
├── vite.config.ts             # Build, sécurité, chunks
├── .env                       # VITE_GA_MEASUREMENT_ID (non versionné)
│
├── public/
│   ├── images/                # 11 fichiers WebP
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── sitemap-geo.xml        # 50 URLs
│   ├── sitemap-blog.xml
│   ├── sitemap-local.xml
│   ├── site.webmanifest       # PWA, icônes WebP
│   ├── _headers               # Sécurité Netlify/CF
│   └── .htaccess              # Sécurité Apache/Hostinger
│
├── scripts/
│   └── generate-geo-cities.mjs
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── brand.ts               # ★ Configuration centrale
    ├── types.ts
    ├── data.ts
    ├── constants/images.ts    # ★ Chemins WebP
    │
    ├── router/routes.tsx
    │
    ├── seo/
    │   ├── seoConfig.ts
    │   ├── useSEO.ts
    │   ├── structuredDataGraph.ts
    │   ├── LocalBusinessSchema.ts
    │   └── GeoSchema.ts
    │
    ├── geo/
    │   ├── geoData.ts
    │   ├── geoCitiesPrimary.ts    # 21 villes
    │   ├── geoCitiesExtended.ts   # 29 villes
    │   ├── types.ts
    │   └── helpers.ts
    │
    ├── blog/
    │   ├── blogData.ts            # 12 articles
    │   ├── blogCategories.ts
    │   └── useBlogSEO.ts
    │
    ├── rgpd/
    │   ├── cookieCategories.ts
    │   ├── cookieManager.ts
    │   └── useCookieConsent.ts
    │
    ├── analytics/
    │   ├── ga4.ts
    │   ├── usePageTracking.ts
    │   └── useWebVitals.ts
    │
    └── components/
        ├── Header.tsx, Footer.tsx, Home.tsx, …
        ├── GeoPage.tsx, GeoFooterLinks.tsx
        ├── Blog.tsx, BlogPost.tsx
        ├── CookieBanner.tsx, CookiePanel.tsx, CookieButton.tsx
        ├── SEOHead.tsx, OptimizedImage.tsx, ZoneSEO.tsx
        └── pages/
            ├── APropos.tsx
            ├── MentionsLegales.tsx
            └── PolitiqueConfidentialite.tsx
```

**~9 000 lignes** de TypeScript/TSX dans `src/`.

---

## 15. Installation & commandes

### Prérequis

- Node.js **18+**
- npm

### Installation

```bash
cd artisan-plomberie
npm install
```

### Développement

```bash
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
```

Sortie : dossier **`dist/`**

### Prévisualisation du build

```bash
npm run preview
```

### Vérification TypeScript

```bash
npm run lint
```

### Régénérer pages géo + sitemap

```bash
node scripts/generate-geo-cities.mjs
```

---

## 16. Déploiement Hostinger

1. `npm run build`
2. Uploader **tout le contenu de `dist/`** à la racine du domaine
3. Vérifier que **`.htaccess`** est bien uploadé (réécriture SPA)
4. Activer **HTTPS** (Let's Encrypt)
5. Créer `.env` en local seulement ; en prod, variables Vite sont **inlinées au build** :

```bash
# Avant build, sur votre machine :
set VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
npm run build
```

### Réécriture SPA (`.htaccess`)

Toutes les routes (`/plombier-vitrolles`, `/blog/...`) doivent renvoyer vers `index.html`.

---

## 17. Checklist mise en production

- [ ] Remplacer le **téléphone provisoire** `04 42 00 00 00` dans `src/brand.ts`
- [ ] Configurer **`VITE_GA_MEASUREMENT_ID`** et rebuild
- [ ] Google Search Console : vérification domaine + soumission des **4 sitemaps**
- [ ] Google Business Profile : lien Maps dans `BRAND.googleBusinessUrl`
- [ ] Tester Rich Results + PageSpeed
- [ ] Vérifier formulaires (brancher e-mail : Formspree, Resend, PHP Hostinger…)
- [ ] Relire contenus géo / blog si besoin
- [ ] Mettre à jour lieux des **réalisations** (encore des villes hors 13 dans `data.ts`)
- [ ] Photos chantiers réelles (remplacer WebP génériques si possible)

---

## 18. À faire / évolutions

| Priorité | Sujet | Détail |
|----------|--------|--------|
| Haute | Téléphone définitif | `brand.ts` |
| Haute | Envoi e-mail formulaires | API / Formspree / script PHP Hostinger |
| Haute | Search Console + GMB | Référencement local |
| Moyenne | CMS ou interface admin | Éditer textes sans développeur |
| Moyenne | Photos réalisations réelles | Crédibilité + SEO images |
| Moyenne | Backend sécurisé admin | Protéger AdminSection |
| Basse | Chat / assistant devis IA | `@google/genai` déjà en dépendance |
| Basse | Code-splitting geo data | Réduire bundle JS (~550 kB) |

---

## Estimation valeur livrable

Site sur mesure équivalent marché freelance/agence : **~6 000 – 10 000 € HT** (voir discussion projet — dépend CMS, photos pro, maintenance).

---

## Licence

Projet privé — **EFFECTIVE'PLOMBERIE** / Wissem ALAYA. Tous droits réservés.

---

*Documentation générée pour le projet artisan-plomberie — dernière mise à jour : mai 2026*
