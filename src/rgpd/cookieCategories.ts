export interface CookieDetail {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: 'session' | 'persistent';
}

export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
  cookies: CookieDetail[];
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Cookies strictement nécessaires',
    description:
      "Ces cookies sont indispensables au fonctionnement du site. Ils permettent la navigation et l'utilisation des fonctionnalités de base (formulaires, sécurité). Ils ne peuvent pas être désactivés.",
    required: true,
    cookies: [
      {
        name: 'cookie_consent',
        provider: "EFFECTIVE'PLOMBERIE",
        purpose: 'Mémorise vos préférences de consentement aux cookies',
        duration: '13 mois',
        type: 'persistent',
      },
      {
        name: 'contactSubmissions, devisSubmissions, projetSubmissions',
        provider: "EFFECTIVE'PLOMBERIE",
        purpose: 'Stockage local des demandes de contact et devis (localStorage)',
        duration: "Session / jusqu'à suppression manuelle",
        type: 'persistent',
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Cookies analytiques',
    description:
      "Ces cookies nous permettent de mesurer l'audience du site (pages visitées, durée de session). Les données sont anonymisées et utilisées uniquement pour améliorer notre site.",
    required: false,
    cookies: [
      {
        name: '_ga, _ga_*',
        provider: 'Google Analytics 4',
        purpose: "Mesure d'audience anonymisée — visites, pages vues, durée de session",
        duration: '2 ans',
        type: 'persistent',
      },
      {
        name: '_gid',
        provider: 'Google Analytics 4',
        purpose: 'Distingue les utilisateurs (session)',
        duration: '24 heures',
        type: 'persistent',
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Cookies marketing',
    description:
      "Ces cookies permettent d'afficher des publicités personnalisées et de mesurer l'efficacité de campagnes. Ils ne sont pas utilisés actuellement sur ce site.",
    required: false,
    cookies: [],
  },
];
