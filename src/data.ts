import { ServiceItem, RealisationItem } from './types';
import { SITE_IMAGES } from './constants/images';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '1',
    title: 'Dépannage & Urgence',
    category: 'depannage',
    description:
      "Intervention rapide pour fuite d'eau, canalisation bouchée, WC bloqué ou dégât des eaux — 7j/7 sur Aix, Marseille et le 13.",
    fullDescription:
      "Nos plombiers interviennent en urgence pour résoudre vos pannes : fuites sur canalisations, robinets, WC, débouchages et remise en service. Chaque intervention fait l'objet d'un diagnostic et d'un accord avant travaux.",
    timeEstimate: "Moins d'1 heure en urgence",
    iconName: 'Droplet',
    image: SITE_IMAGES.depannageUrgent,
  },
  {
    id: '2',
    title: 'Recherche de Fuite',
    category: 'depannage',
    description:
      'Localisation précise de fuites (encastrées, dalle, réseau) par détection non destructive et caméra d\'inspection.',
    fullDescription:
      "Nous localisons l'origine des fuites sans casser inutilement : corrélation acoustique, caméra, test de pression. Rapport utile pour votre assurance en cas de dégât des eaux.",
    timeEstimate: '1 à 3 heures selon complexité',
    iconName: 'Search',
    image: SITE_IMAGES.realisation33,
  },
  {
    id: '3',
    title: 'Rénovation',
    category: 'renovation',
    description:
      'Rénovation complète de plomberie, salles d\'eau et réseaux dans l\'existant — coordination des corps de métier.',
    fullDescription:
      "Rénovation de logements et locaux professionnels : remplacement de réseaux, création ou transformation de pièces d'eau, mise aux normes et finitions soignées.",
    timeEstimate: '5 à 15 jours selon chantier',
    iconName: 'Layers',
    image: SITE_IMAGES.renovation,
  },
  {
    id: '4',
    title: 'Climatisation',
    category: 'climatisation',
    description:
      'Installation, entretien et dépannage de climatisation réversible pour le confort été comme hiver.',
    fullDescription:
      "Pose de splits, multi-splits et systèmes réversibles adaptés à votre logement. Mise en service, étanchéité des liaisons frigorifiques et conseils d'entretien.",
    timeEstimate: '1 à 2 jours d\'installation',
    iconName: 'Snowflake',
    image: SITE_IMAGES.climatisation,
  },
  {
    id: '5',
    title: 'Salle de Bain',
    category: 'renovation',
    description:
      'Création ou rénovation de salle de bain : douche à l\'italienne, baignoire, PMR, carrelage et robinetterie.',
    fullDescription:
      "Projet clé en main : plomberie, équipements (Grohe, Geberit, Ideal Standard), douche plain-pied, étanchéité et pose de carrelage dans le cadre de nos chantiers.",
    timeEstimate: '5 à 10 jours de travaux',
    iconName: 'Bath',
    image: SITE_IMAGES.creationSalleDeBain,
  },
  {
    id: '6',
    title: 'Cuisine',
    category: 'cuisine',
    description:
      'Plomberie cuisine : évier, lave-vaisselle, robinetterie, filtre eau et raccordements gaz.',
    fullDescription:
      "Installation et rénovation de plomberie cuisine : découpe plan de travail, siphons, arrivées d'eau, évacuations et raccordement des appareils électroménagers.",
    timeEstimate: '1 journée en moyenne',
    iconName: 'ChefHat',
    image: SITE_IMAGES.cuisine,
  },
];

export const REALISATIONS_DATA: RealisationItem[] = [
  {
    id: 'r1',
    title: 'Rénovation salle de bain — douche à l\'italienne',
    category: 'Salle de bain',
    description:
      'Rénovation complète avec douche plain-pied, robinetterie encastrée et meuble vasque — finitions contemporaines.',
    image: SITE_IMAGES.creationSalleDeBain,
    duration: '8 jours de travaux',
    location: 'Aix-en-Provence (13100)',
  },
  {
    id: 'r2',
    title: 'Installation climatisation réversible',
    category: 'Climatisation',
    description:
      'Pose multi-split pour maison individuelle : unités intérieures discrètes et mise en service complète.',
    image: SITE_IMAGES.climatisation,
    duration: '2 jours d\'installation',
    location: 'Marseille (13008)',
  },
  {
    id: 'r3',
    title: 'Plomberie cuisine complète',
    category: 'Cuisine',
    description:
      'Raccordement évier, lave-vaisselle et robinetterie mitigeur dans le cadre d\'une rénovation cuisine.',
    image: SITE_IMAGES.cuisine,
    duration: '1 journée',
    location: 'Venelles (13770)',
  },
  {
    id: 'r4',
    title: 'Rénovation plomberie appartement',
    category: 'Rénovation',
    description:
      'Remplacement des réseaux encastrés, pose sanitaires et mise en conformité des évacuations.',
    image: SITE_IMAGES.renovation,
    duration: '5 jours de travaux',
    location: 'Aubagne (13400)',
  },
  {
    id: 'r5',
    title: 'Recherche et réparation de fuite',
    category: 'Dépannage',
    description:
      'Détection non destructive et réparation d\'une fuite sur réseau encastré — intervention sans démolition lourde.',
    image: SITE_IMAGES.depannageUrgent,
    duration: '4 heures',
    location: 'Gardanne (13120)',
  },
  {
    id: 'r6',
    title: 'Dépannage urgence — colonne évacuation',
    category: 'Dépannage majeur',
    description:
      'Remplacement d\'une colonne d\'évacuation en copropriété avec remise en service rapide pour les résidents.',
    image: SITE_IMAGES.realisation35,
    duration: '6 heures',
    location: 'Marseille (13012)',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    author: 'Jean-Marc L.',
    role: 'Copropriétaire - Syndic Les Tilleuls',
    quote:
      'La détection de fuite a sauvé notre hall d\'entrée. Travail propre, rapide et rapport envoyé à l\'assureur sous 24h.',
    rating: 5,
    city: 'Aix-en-Provence',
  },
  {
    id: 't2',
    author: 'Sophie Martin-Dumas',
    role: 'Particulier - Rénovation de maison',
    quote:
      'Rénovation de salle de bain magnifique. Coordination carrelage et plomberie impeccable. Je recommande vivement.',
    rating: 5,
    city: 'Marseille',
  },
  {
    id: 't3',
    author: 'Cabinet Lemaire & Gendre',
    role: 'Architectes d\'Intérieur',
    quote:
      'Nous collaborons sur nos chantiers dans le 13. Finitions et respect des normes irréprochables.',
    rating: 5,
    city: 'Aix-en-Provence',
  },
  {
    id: 't4',
    author: 'Mathieu Bertrand',
    role: 'Gérant du restaurant "Le Bistrot Gourmet"',
    quote:
      'Dépannage express de la plomberie cuisine un samedi soir. Un vrai sauveur avant le service.',
    rating: 5,
    city: 'Aubagne',
  },
];

export const PARTNERS_LOGOS = [
  { name: 'Frisquet', logoText: 'FRISQUET', desc: 'Chauffage & ECS' },
  { name: 'Grohe', logoText: 'GROHE', desc: 'Robinetterie Premium' },
  { name: 'Geberit', logoText: 'GEBERIT', desc: 'Sanitaires d\'Exception' },
  { name: 'Saunier Duval', logoText: 'SAUNIER DUVAL', desc: 'Climatisation & chauffage' },
  { name: 'Villeroy & Boch', logoText: 'VILLEROY & BOCH', desc: 'Céramiques & Design' },
  { name: 'Atlantic', logoText: 'ATLANTIC', desc: 'Chauffage & ECS' },
];

export const CERTIFICATIONS = [
  {
    id: 'cert1',
    name: 'Qualibat RGE',
    description:
      'Reconnu Garant de l\'Environnement — travaux éligibles MaPrimeRénov\' et CEE.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'cert2',
    name: 'PG - Professionnel du Gaz',
    description:
      'Habilitation pour installations gaz et mise en conformité.',
    iconName: 'Flame',
  },
  {
    id: 'cert3',
    name: 'QualiPAC (RGE)',
    description:
      'Installation de pompes à chaleur et équipements thermiques.',
    iconName: 'Award',
  },
  {
    id: 'cert4',
    name: 'Garantie Décennale SMABTP',
    description:
      'Travaux de plomberie et sanitaires couverts pendant 10 ans.',
    iconName: 'ShieldAlert',
  },
];
