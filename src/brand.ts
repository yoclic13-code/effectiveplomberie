export const BRAND = {
  name: "EFFECTIVE'PLOMBERIE",
  shortName: "Effective' Plomberie",
  tagline: 'Plombier certifié RGE — Aix-en-Provence, Marseille & Bouches-du-Rhône (13)',
  logoSrc: '/images/logoeffectiv.webp',
  ogImage: '/images/og-effective-plomberie.webp',
  faviconSrc: '/images/favicon.png',
  email: 'contact@effective-plomberie.fr',
  phone: '06 29 11 70 69',
  phoneTel: '+33629117069',
  siteUrl: 'https://www.effective-plomberie.fr',
  foundingYear: '2019',
  owner: 'Wissem ALAYA',
  /** Chiffres affichés sur le site (cohérents avec création 2019) */
  stats: {
    experienceLabel: 'Depuis 2019',
    experienceSub: 'Artisan à Aix-en-Provence',
    interventions: '500+',
    interventionsSub: 'Interventions réussies',
  },
  /** Siège & zone SEO principale */
  address: {
    streetAddress: "2 Boulevard du Clos Gabriel, Les Rougets 2",
    locality: 'Aix-en-Provence',
    postalCode: '13100',
    region: "Provence-Alpes-Côte d'Azur",
    country: 'FR',
  },
  /** Coordonnées géo (centre Aix-en-Provence — SEO local) */
  geo: {
    latitude: 43.5263,
    longitude: 5.4454,
  },
  /** Zone d'intervention élargie (affichage footer / contact) */
  serviceArea: {
    headline: 'Aix-en-Provence, Marseille & tout le 13',
    locality: 'Bouches-du-Rhône',
  },
  social: {
    facebook: 'https://www.facebook.com/effectiveplomberie',
    instagram: 'https://www.instagram.com/effectiveplomberie',
    linkedin: 'https://www.linkedin.com/company/effective-plomberie',
  },
  aggregateRating: {
    value: '4.9',
    count: 87,
  },
  legal: {
    siret: '878 778 778 00018',
    siren: '878 778 778',
    vatNumber: 'FR21878778778',
    naf: "4322A — Travaux d'installation d'eau et de gaz en tous locaux",
    legalForm: 'Entrepreneur individuel',
    createdAt: '11 novembre 2019',
    streetAddress: '2 Boulevard du Clos Gabriel, Les Rougets 2',
    locality: 'Aix-en-Provence',
    postalCode: '13100',
    region: "Provence-Alpes-Côte d'Azur",
    country: 'FR',
  },
  googleBusinessUrl:
    'https://www.google.com/maps/search/?api=1&query=EFFECTIVE+PLOMBERIE+2+Boulevard+du+Clos+Gabriel+13100+Aix-en-Provence',
  hosting: {
    name: 'o2switch',
    address: '222-224 Boulevard Gustave Flaitout, 63000 Clermont-Ferrand, France',
    website: 'https://www.o2switch.fr',
  },
} as const;

export function formatBrandAddress(): string {
  const { streetAddress, postalCode, locality, country } = BRAND.address;
  const countryLabel = country === 'FR' ? 'France' : country;
  return `${streetAddress}, ${postalCode} ${locality}, ${countryLabel}`;
}

export function formatLegalAddress(): string {
  const { streetAddress, postalCode, locality, country } = BRAND.legal;
  const countryLabel = country === 'FR' ? 'France' : country;
  return `${streetAddress}, ${postalCode} ${locality}, ${countryLabel}`;
}
