export interface GeoCity {
  slug: string;
  name: string;
  codePostal: string;
  departement: '13';
  lat: number;
  lng: number;
  distanceFromAix: number;
  delaiIntervention: string;
  population: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  logements: string;
  problemesTypiques: string[];
  quartiers?: string[];
  particularite: string;
  testimonial?: {
    text: string;
    author: string;
    quartier: string;
  };
  faq: { question: string; answer: string }[];
}
