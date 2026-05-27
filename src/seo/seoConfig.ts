import type { ViewType } from '../types';
import { BRAND } from '../brand';

export interface SEOData {
  title: string;
  pageTitle: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

const BASE_URL = BRAND.siteUrl;
const BASE_IMAGE = `${BASE_URL}${BRAND.ogImage}`;

export const SEO_BY_VIEW: Record<ViewType, SEOData> = {
  home: {
    title: "Plombier Aix-en-Provence & Marseille | EFFECTIVE'PLOMBERIE — Dépannage 24h/7j",
    pageTitle: 'Accueil',
    description:
      "EFFECTIVE'PLOMBERIE : plombier certifié RGE à Aix-en-Provence (13100, 13080, 13090), Marseille (13001–13016) et tout le 13. Dépannage, recherche de fuite, rénovation, climatisation, salle de bain, cuisine. Devis gratuit.",
    keywords:
      'plombier aix en provence, plombier marseille, plombier 13100, dépannage plomberie aix, recherche fuite 13, climatisation aix, rénovation salle de bain marseille, plomberie cuisine 13',
    canonicalPath: '/',
    ogTitle: "EFFECTIVE'PLOMBERIE — Plombier Aix-en-Provence & Marseille",
    ogDescription:
      'Plombier RGE basé à Aix-en-Provence. Intervention urgente 24h/7j sur Marseille et tout le département 13. Devis gratuit.',
    ogImage: BASE_IMAGE,
  },
  services: {
    title: "Nos Services Plomberie | Dépannage, Climatisation, Rénovation — Marseille & 13",
    pageTitle: 'Services',
    description:
      "Découvrez les prestations d'EFFECTIVE'PLOMBERIE : dépannage, recherche de fuite, rénovation, climatisation, salle de bain et cuisine. Intervention dans tout le 13.",
    keywords:
      'services plomberie marseille, climatisation aix, rénovation salle de bain aix, plomberie cuisine 13, recherche fuite marseille, plombier qualibat rge',
    canonicalPath: '/services',
    ogTitle: "Services Plomberie — EFFECTIVE'PLOMBERIE Marseille",
    ogDescription:
      'Dépannage, climatisation, rénovation, salle de bain et cuisine : toutes nos prestations dans le 13.',
  },
  realisations: {
    title: "Réalisations Plomberie Marseille & 13 | EFFECTIVE'PLOMBERIE — Chantiers Récents",
    pageTitle: 'Réalisations',
    description:
      "Galerie de réalisations EFFECTIVE'PLOMBERIE : rénovations, installations chaudières, créations salles de bain, dépannages à Marseille, Aix-en-Provence, Aubagne et dans tout le Bouches-du-Rhône.",
    keywords:
      'réalisations plomberie marseille, chantiers plomberie 13, avant après salle de bain aix, installation chaudière bouches du rhône',
    canonicalPath: '/realisations',
  },
  devis: {
    title: "Demande de Devis Plomberie Gratuit | EFFECTIVE'PLOMBERIE — Aix & Marseille",
    pageTitle: 'Demande de devis',
    description:
      'Demandez votre devis gratuit en ligne pour tous vos travaux de plomberie à Aix-en-Provence, Marseille et dans le 13. Réponse personnalisée, sans engagement.',
    keywords:
      'devis plomberie marseille, devis gratuit plombier 13, demande devis plomberie aix, devis chaudière marseille',
    canonicalPath: '/devis',
  },
  contact: {
    title: `Contact Plombier Aix & Marseille | EFFECTIVE'PLOMBERIE — ${BRAND.phone}`,
    pageTitle: 'Contact',
    description:
      `Contactez EFFECTIVE'PLOMBERIE à Aix-en-Provence et Marseille. Téléphone ${BRAND.phone}, e-mail ${BRAND.email}. Intervention dans tout le 13.`,
    keywords:
      'contact plombier marseille, téléphone plombier 13, plombier urgence aix en provence',
    canonicalPath: '/contact',
  },
  privacy: {
    title: "Politique de Confidentialité | EFFECTIVE'PLOMBERIE",
    pageTitle: 'Politique de confidentialité',
    description:
      "Politique de confidentialité et gestion des cookies d'EFFECTIVE'PLOMBERIE. RGPD, droits des utilisateurs, données collectées.",
    keywords: 'politique confidentialité, rgpd, cookies, données personnelles',
    canonicalPath: '/politique-de-confidentialite',
  },
  legal: {
    title: "Mentions Légales | EFFECTIVE'PLOMBERIE — SIRET 878 778 778 00018",
    pageTitle: 'Mentions légales',
    description:
      "Mentions légales d'EFFECTIVE'PLOMBERIE : Wissem ALAYA, entrepreneur individuel, SIRET 878 778 778 00018, 2 Bd du Clos Gabriel 13100 Aix-en-Provence.",
    keywords: 'mentions légales plombier aix, effective plomberie siret',
    canonicalPath: '/mentions-legales',
  },
  apropos: {
    title: "À Propos | EFFECTIVE'PLOMBERIE — Wissem ALAYA, Artisan Plombier Aix-en-Provence depuis 2019",
    pageTitle: 'À propos',
    description:
      "EFFECTIVE'PLOMBERIE : entrepreneur individuel fondé en 2019 à Aix-en-Provence par Wissem ALAYA. Plomberie, chauffage, salle de bain, ballon eau chaude. Certifié RGE, PG Gaz, QualiPAC. Intervention dans tout le 13.",
    keywords:
      'effective plomberie aix en provence, wissem alaya plombier aix, artisan plombier certifié rge 13100, plomberie chauffage aix depuis 2019, entrepreneur plombier bouches du rhône',
    canonicalPath: '/a-propos',
    ogTitle: "EFFECTIVE'PLOMBERIE — Artisan Plombier à Aix-en-Provence depuis 2019",
    ogDescription:
      'Wissem ALAYA, entrepreneur individuel certifié RGE depuis 2019. Plomberie, chauffage, sanitaires dans tout le département 13.',
  },
  blog: {
    title: "Blog Plomberie — Conseils & Guides | EFFECTIVE'PLOMBERIE Aix-en-Provence",
    pageTitle: 'Blog',
    description:
      "Guides pratiques et conseils d'expert en plomberie et chauffage pour Aix-en-Provence, Marseille et tout le département 13. Par Wissem ALAYA, artisan certifié RGE.",
    keywords:
      'blog plomberie aix en provence, conseils plomberie marseille, guide chauffage 13, salle de bain aix, ballon eau chaude provence',
    canonicalPath: '/blog',
    ogTitle: "Blog plomberie — EFFECTIVE'PLOMBERIE",
    ogDescription: 'Conseils plomberie, chauffage et sanitaires dans les Bouches-du-Rhône.',
  },
  blogPost: {
    title: "Article blog | EFFECTIVE'PLOMBERIE",
    pageTitle: 'Article blog',
    description: 'Conseils et guides plomberie par EFFECTIVE\'PLOMBERIE — Aix-en-Provence et Marseille.',
    keywords: 'blog plomberie, conseils chauffage 13',
    canonicalPath: '/blog',
  },
  faq: {
    title: "FAQ Plomberie Aix-en-Provence & Marseille | EFFECTIVE'PLOMBERIE",
    pageTitle: 'FAQ',
    description:
      "Toutes les réponses à vos questions sur la plomberie, le chauffage et les sanitaires à Aix-en-Provence et dans le 13. Tarifs, délais, certifications RGE, aides MaPrimeRénov'.",
    keywords:
      'faq plomberie aix en provence, questions plombier marseille, prix plomberie 13, urgence plombier bouches du rhône, aide maprimerénov chaudière aix, certifications rge plombier 13',
    canonicalPath: '/faq',
    ogTitle: "FAQ — EFFECTIVE'PLOMBERIE Aix-en-Provence & Marseille",
    ogDescription:
      'Questions répondues sur la plomberie, le chauffage et les sanitaires dans le département 13.',
  },
  geo: {
    title: "Plombier dans les Bouches-du-Rhône (13) | EFFECTIVE'PLOMBERIE",
    pageTitle: 'Zone d\'intervention',
    description:
      "Plombier certifié RGE à Aix-en-Provence, Marseille et tout le département 13. Dépannage urgent, chaudière, salle de bain. Devis gratuit.",
    keywords:
      'plombier 13, plombier marseille, plombier aix en provence, dépannage plomberie bouches du rhône',
    canonicalPath: '/',
  },
};

export const DEPARTEMENT_13_CODES_POSTAUX = [
  '13001', '13002', '13003', '13004', '13005', '13006', '13007', '13008',
  '13009', '13010', '13011', '13012', '13013', '13014', '13015', '13016',
  '13080', '13090', '13100', '13400', '13600', '13500', '13300', '13200',
  '13800', '13127', '13700', '13120', '13260', '13240', '13190', '13220',
  '13130', '13790', '13560', '13530', '13710', '13124', '13420', '13470',
  '13320', '13510', '13770', '13410', '13330', '13140', '13450', '13680',
  '13210', '13110', '13270', '13340', '13520', '13570',
];

export const COMMUNES_DEPARTEMENT_13 = [
  'Marseille', 'Aix-en-Provence', 'Aubagne', 'La Ciotat', 'Martigues',
  'Salon-de-Provence', 'Arles', 'Istres', 'Vitrolles', 'Marignane',
  'Gardanne', 'Cassis', 'Septèmes-les-Vallons', 'Plan-de-Cuques', 'Allauch',
  'Châteauneuf-les-Martigues', "Berre-l'Étang", 'Rognac', 'Peynier',
  'Roquevaire', 'Trets', 'Fuveau', 'Rousset', 'Peypin', 'Gémenos',
  'Carnoux-en-Provence', 'Bouc-Bel-Air', 'Éguilles', 'Venelles',
  'Lambesc', 'Pélissanne', 'Miramas', 'Grans', 'Lançon-Provence',
  'Châteaurenard', 'Tarascon', 'Saint-Rémy-de-Provence', 'Eyguières',
  'Port-de-Bouc', 'Fos-sur-Mer', 'Cabriès', 'La Penne-sur-Huveaune',
  'Saint-Mitre-les-Remparts', 'Les Pennes-Mirabeau', 'Auriol', 'La Bouilladisse',
];
