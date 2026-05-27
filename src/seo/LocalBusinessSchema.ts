import { BRAND } from '../brand';
import { COMMUNES_DEPARTEMENT_13 } from './seoConfig';

/** Met à jour le nombre d'avis dans le JSON-LD si présent (sinon ne duplique pas le graphe index.html) */
export function injectLocalBusinessSchema(reviewCount = BRAND.aggregateRating.count) {
  if (document.getElementById('ld-json-graph')) return;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${BRAND.siteUrl}/#business`,
    name: BRAND.name,
    telephone: BRAND.phoneTel,
    email: BRAND.email,
    url: BRAND.siteUrl,
    logo: `${BRAND.siteUrl}${BRAND.logoSrc}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.address.streetAddress,
      addressLocality: BRAND.address.locality,
      postalCode: BRAND.address.postalCode,
      addressRegion: BRAND.address.region,
      addressCountry: BRAND.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: String(BRAND.geo.latitude),
      longitude: String(BRAND.geo.longitude),
    },
    areaServed: COMMUNES_DEPARTEMENT_13.map((city) => ({
      '@type': 'City',
      name: city,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BRAND.aggregateRating.value,
      reviewCount: String(reviewCount),
      bestRating: '5',
    },
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'ld-local-business-fallback';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/** Met à jour reviewCount dans le graphe inline de index.html */
export function syncReviewCountInGraph(reviewCount: number) {
  const script = document.getElementById('ld-json-graph');
  if (!script?.textContent) return;
  try {
    const data = JSON.parse(script.textContent);
    const business = data['@graph']?.find(
      (n: { '@type'?: string }) => n['@type'] === 'Plumber'
    );
    if (business?.aggregateRating) {
      business.aggregateRating.reviewCount = String(reviewCount);
      script.textContent = JSON.stringify(data);
    }
  } catch {
    /* ignore parse errors */
  }
}
