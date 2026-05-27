export interface BlogCategory {
  id: string;
  label: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  seoKeywords: string[];
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'salle-de-bain',
    label: 'Salle de bain',
    slug: 'salle-de-bain',
    description: 'Rénovation, création, équipements sanitaires à Aix-en-Provence et Marseille',
    icon: 'Bath',
    color: 'blue',
    seoKeywords: ['salle de bain aix en provence', 'rénovation salle de bain 13', 'douche italienne marseille'],
  },
  {
    id: 'chaudiere-chauffage',
    label: 'Chaudière & Chauffage',
    slug: 'chaudiere-chauffage',
    description: 'Installation, remplacement chaudière gaz et pompe à chaleur dans le 13',
    icon: 'Flame',
    color: 'orange',
    seoKeywords: ['installation chaudière aix en provence', 'remplacement chaudière marseille', 'chauffage 13'],
  },
  {
    id: 'eau-chaude',
    label: 'Eau chaude',
    slug: 'eau-chaude',
    description: 'Ballon eau chaude, chauffe-eau thermodynamique et solaire Bouches-du-Rhône',
    icon: 'Droplets',
    color: 'cyan',
    seoKeywords: ['ballon eau chaude aix', 'chauffe-eau thermodynamique 13100', 'chauffe-eau solaire marseille'],
  },
  {
    id: 'cuisine',
    label: 'Cuisine',
    slug: 'cuisine',
    description: 'Raccordements plomberie cuisine, évier, lave-vaisselle à Aix et Marseille',
    icon: 'UtensilsCrossed',
    color: 'green',
    seoKeywords: ['plomberie cuisine aix en provence', 'raccordement évier marseille', 'installation lave-vaisselle 13'],
  },
  {
    id: 'depannage',
    label: 'Dépannage',
    slug: 'depannage',
    description: 'Urgences plomberie, fuites, canalisations bouchées dans tout le 13',
    icon: 'Wrench',
    color: 'red',
    seoKeywords: ['dépannage plomberie aix', 'fuite eau marseille urgence', 'canalisation bouchée 13'],
  },
  {
    id: 'aides-financement',
    label: 'Aides & Financement',
    slug: 'aides-financement',
    description: "MaPrimeRénov', CEE, éco-PTZ pour les travaux de plomberie et chauffage",
    icon: 'Euro',
    color: 'emerald',
    seoKeywords: ['maprimerénov plomberie 13', 'aide chauffage aix en provence', 'cee bouches du rhône'],
  },
];
