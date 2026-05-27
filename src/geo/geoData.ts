import { GEO_CITIES_PRIMARY } from './geoCitiesPrimary';
import { GEO_CITIES_EXTENDED } from './geoCitiesExtended';
import { finalizeCity, isFooterGeoCity } from './helpers';
import type { GeoCity } from './types';

export const GEO_CITIES_ALL: GeoCity[] = [
  ...GEO_CITIES_PRIMARY.map(finalizeCity),
  ...GEO_CITIES_EXTENDED.map(finalizeCity),
];

export const GEO_FOOTER_CITIES = GEO_CITIES_ALL.filter(isFooterGeoCity);

export const GEO_CITIES = GEO_CITIES_ALL;

export const ALL_GEO_SLUGS = GEO_CITIES_ALL.map((c) => c.slug);

export function getCityBySlug(slug: string): GeoCity | undefined {
  return GEO_CITIES_ALL.find((city) => city.slug === slug);
}

export function isGeoSlug(slug: string): boolean {
  return ALL_GEO_SLUGS.includes(slug);
}
