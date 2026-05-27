export type ViewType =
  | 'home'
  | 'services'
  | 'realisations'
  | 'devis'
  | 'contact'
  | 'privacy'
  | 'legal'
  | 'blog'
  | 'blogPost'
  | 'apropos'
  | 'faq'
  | 'geo';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: 'depannage' | 'installation' | 'renovation' | 'chauffage' | 'climatisation' | 'cuisine';
  timeEstimate: string;
  iconName: string;
  image: string;
}

export interface RealisationItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  duration: string;
  location: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

export interface DevisSubmission {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  urgency: 'faible' | 'moyen' | 'urgent' | 'critique';
  serviceType: string;
  details: string;
  approximateDate: string;
  budget: string;
  date: string;
}

export interface ProjetSubmission {
  id: string;
  companyName?: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: 'renovation_complete' | 'installation_neuve' | 'chaufferie' | 'autre';
  description: string;
  desiredTimeline: string;
  hasPlacingPlans: boolean;
  date: string;
}
