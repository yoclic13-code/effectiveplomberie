import { BRAND } from '../brand';
import { COMMUNES_DEPARTEMENT_13 } from './seoConfig';

/** Graphe JSON-LD injecté dans index.html (export pour tests / maintenance) */
export function getStructuredDataGraph() {
  const url = BRAND.siteUrl;
  const areaServed = COMMUNES_DEPARTEMENT_13.slice(0, 40).map((name) => ({
    '@type': 'City',
    name,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Plumber',
        '@id': `${url}/#business`,
        name: BRAND.name,
        alternateName: ['Effective Plomberie', 'Effectiv Plomberie'],
        description:
          "Plombier certifié RGE basé à Aix-en-Provence (13100), intervenant à Marseille et dans tout le département des Bouches-du-Rhône (13). Dépannage urgence 24h/24, installation chaudière, création salle de bain.",
        url,
        logo: `${url}${BRAND.logoSrc}`,
        image: `${url}/images/banniere.webp`,
        telephone: BRAND.phoneTel,
        email: BRAND.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BRAND.address.streetAddress,
          addressLocality: BRAND.address.locality,
          postalCode: BRAND.address.postalCode,
          addressRegion: BRAND.address.region,
          addressCountry: BRAND.address.country,
        },
        areaServed: [
          ...areaServed,
          {
            '@type': 'AdministrativeArea',
            name: 'Bouches-du-Rhône',
            sameAs: 'https://www.wikidata.org/wiki/Q3073',
          },
        ],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: String(BRAND.geo.latitude),
          longitude: String(BRAND.geo.longitude),
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '07:30',
            closes: '19:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '08:00',
            closes: '17:00',
          },
        ],
        priceRange: '€€',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: BRAND.aggregateRating.value,
          reviewCount: String(BRAND.aggregateRating.count),
          bestRating: '5',
        },
        sameAs: [BRAND.social.facebook, BRAND.social.instagram, BRAND.social.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: BRAND.name,
        publisher: { '@id': `${url}/#business` },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${url}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos Services', item: `${url}/services` },
          { '@type': 'ListItem', position: 3, name: 'Réalisations', item: `${url}/realisations` },
          { '@type': 'ListItem', position: 4, name: 'Devis', item: `${url}/devis` },
          { '@type': 'ListItem', position: 5, name: 'Contact', item: `${url}/contact` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Intervenez-vous en urgence à Aix-en-Provence et Marseille ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui, ${BRAND.name} intervient en urgence 24h/24 et 7j/7 à Aix-en-Provence (13100), Marseille (tous arrondissements) et dans tout le 13. Appelez le ${BRAND.phone}.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Quelles zones géographiques couvrez-vous ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nous intervenons dans tout le département 13 : Aix-en-Provence (13080, 13090, 13100), Marseille (13001 à 13016), Aubagne, La Ciotat, Martigues, Salon-de-Provence, Arles, Istres, Vitrolles, Marignane et toutes les communes des Bouches-du-Rhône.',
            },
          },
          {
            '@type': 'Question',
            name: 'Êtes-vous certifiés RGE ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Oui, ${BRAND.name} est certifié Qualibat RGE, PG Gaz et QualiPAC pour bénéficier des aides MaPrimeRénov' et CEE.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Proposez-vous des devis gratuits ?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Oui, le devis est totalement gratuit et sans engagement via notre formulaire en ligne ou par téléphone.',
            },
          },
        ],
      },
    ],
  };
}
