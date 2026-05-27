import { BRAND } from '../brand';
import { DEPARTEMENT_13_CODES_POSTAUX } from '../seo/seoConfig';

const ZONES_SEO = [
  {
    h2: "Plombier à Aix-en-Provence — Siège 13100, 13080, 13090",
    description:
      "EFFECTIVE'PLOMBERIE est basé à Aix-en-Provence (2 Bd du Clos Gabriel, 13100). Intervention rapide sur 13080, 13090 et 13100 : dépannage, chaudière, salle de bain. Certifié RGE, devis gratuit.",
    codes: ['13080', '13090', '13100'],
  },
  {
    h2: "Plombier à Marseille — Intervention dans tous les arrondissements",
    description:
      "Intervention dans les 16 arrondissements de Marseille (13001 à 13016). Dépannage urgent fuite d'eau, débouchage canalisation, installation chaudière, rénovation salle de bain. Assurance décennale.",
    codes: ['13001', '13002', '13003', '13004', '13005', '13006', '13007', '13008', '13009', '13010', '13011', '13012', '13013', '13014', '13015', '13016'],
  },
  {
    h2: "Plombier à Aubagne (13400) — Dépannage & Installation",
    description:
      "EFFECTIVE'PLOMBERIE assure les interventions de plomberie à Aubagne et dans le Pays d'Aubagne. Urgence, rénovation, chauffage.",
    codes: ['13400'],
  },
  {
    h2: "Plombier Vitrolles (13127), Marignane (13700) & étang de Berre",
    description:
      "Interventions plomberie sur Vitrolles, Marignane, Rognac et le secteur de l'étang de Berre. Dépannage rapide par des artisans certifiés.",
    codes: ['13127', '13700', '13340'],
  },
  {
    h2: "Plombier Martigues (13500), Istres (13800) & Fos-sur-Mer",
    description:
      "Couverture plomberie sur l'ouest des Bouches-du-Rhône : Martigues, Istres, Port-de-Bouc, Fos-sur-Mer, Miramas. Dépannage urgence et travaux RGE.",
    codes: ['13500', '13800', '13110', '13270', '13140'],
  },
];

export default function ZoneSEO() {
  return (
    <section aria-label="Zones d'intervention plomberie département 13" className="sr-only">
      {ZONES_SEO.map((zone) => (
        <article key={zone.h2}>
          <h2>{zone.h2}</h2>
          <p>{zone.description}</p>
          <p>Codes postaux couverts : {zone.codes.join(', ')}</p>
        </article>
      ))}
      <p>
        Département 13 — codes postaux : {DEPARTEMENT_13_CODES_POSTAUX.join(', ')}
      </p>
      <address>
        <span>{BRAND.name}</span>
        <span> — Tél. {BRAND.phone}</span>
        <span> — {BRAND.email}</span>
        <span> — Zone : Bouches-du-Rhône (13)</span>
      </address>
    </section>
  );
}
