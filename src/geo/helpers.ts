import { BRAND } from '../brand';
import type { GeoCity } from './types';

export function replacePhoneText(text: string): string {
  return text.replace(/\[TELEPHONE\]/g, BRAND.phone);
}

export function finalizeCity(city: GeoCity): GeoCity {
  return {
    ...city,
    metaTitle: replacePhoneText(city.metaTitle),
    metaDescription: replacePhoneText(city.metaDescription),
    faq: city.faq.map((f) => ({
      question: replacePhoneText(f.question),
      answer: replacePhoneText(f.answer),
    })),
  };
}

/** Villes proches d'Aix pour le footer (sans doublons arrondissements Marseille) */
export function isFooterGeoCity(city: GeoCity): boolean {
  if (!city.slug.startsWith('plombier-marseille-')) return true;
  return city.slug === 'plombier-marseille';
}
