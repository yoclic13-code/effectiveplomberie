import type { ViewType } from '../types';

export interface AppRoute {
  path: string;
  view: ViewType;
  label: string;
  navLabel: string;
  showInNav: boolean;
  showInFooter: boolean;
}

export const APP_ROUTES: AppRoute[] = [
  {
    path: '/',
    view: 'home',
    label: 'Accueil',
    navLabel: 'Accueil',
    showInNav: false,
    showInFooter: true,
  },
  {
    path: '/services',
    view: 'services',
    label: 'Nos Services',
    navLabel: 'Nos Services',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/realisations',
    view: 'realisations',
    label: 'Réalisations',
    navLabel: 'Réalisations',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/devis',
    view: 'devis',
    label: 'Demande de devis',
    navLabel: 'Demande de devis',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/contact',
    view: 'contact',
    label: 'Nous Contacter',
    navLabel: 'Contact',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/politique-de-confidentialite',
    view: 'privacy',
    label: 'Politique de confidentialité',
    navLabel: 'Politique de confidentialité',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/mentions-legales',
    view: 'legal',
    label: 'Mentions légales',
    navLabel: 'Mentions légales',
    showInNav: false,
    showInFooter: false,
  },
  {
    path: '/blog',
    view: 'blog',
    label: 'Blog',
    navLabel: 'Blog',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/a-propos',
    view: 'apropos',
    label: 'À propos',
    navLabel: 'À propos',
    showInNav: true,
    showInFooter: true,
  },
  {
    path: '/faq',
    view: 'faq',
    label: 'FAQ',
    navLabel: 'FAQ',
    showInNav: false,
    showInFooter: true,
  },
];

export function getRouteByPath(path: string): AppRoute | undefined {
  return APP_ROUTES.find((r) => r.path === path);
}

export function getRouteByView(view: ViewType): AppRoute | undefined {
  return APP_ROUTES.find((r) => r.view === view);
}

/** Anciens liens avec fragment #services → chemins réels */
export const LEGACY_HASH_REDIRECTS: Record<string, string> = {
  services: '/services',
  realisations: '/realisations',
  devis: '/devis',
  projet: '/devis',
  contact: '/contact',
  home: '/',
};
