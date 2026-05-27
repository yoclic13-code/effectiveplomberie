import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Award,
  Shield,
  Zap,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Calendar,
  Wrench,
  Star,
  ExternalLink,
} from 'lucide-react';
import { BRAND, formatLegalAddress } from '../../brand';

const CERTIFICATIONS = [
  {
    name: 'Qualibat RGE',
    description:
      "Reconnu Garant de l'Environnement — travaux éligibles MaPrimeRénov' et CEE",
    icon: Award,
  },
  {
    name: 'PG Gaz',
    description:
      'Professionnel du Gaz — habilitation obligatoire pour tous travaux sur les installations gaz',
    icon: Shield,
  },
  {
    name: 'QualiPAC',
    description:
      "Qualification pour l'installation de pompes à chaleur — exigée pour les aides de l'État",
    icon: Zap,
  },
  {
    name: 'Garantie Décennale',
    description:
      'Tous nos travaux sont couverts par une assurance garantie décennale pendant 10 ans',
    icon: CheckCircle,
  },
];

const KEY_FIGURES = [
  { value: '2019', label: 'Année de création', icon: Calendar },
  { value: BRAND.stats.interventions, label: 'Chantiers réalisés', icon: Wrench },
  { value: '4.9★', label: 'Note Google', icon: Star },
  { value: '40 km', label: "Rayon d'intervention", icon: MapPin },
];

const SERVICES_COMPLETS = [
  {
    category: 'Rénovation',
    items: [
      'Rénovation complète de plomberie et sanitaires',
      'Remplacement de réseaux encastrés',
      'Mise aux normes des installations existantes',
      'Coordination des corps de métier sur chantier',
    ],
  },
  {
    category: 'Salle de bain & Sanitaires',
    items: [
      'Création et rénovation complète de salle de bain',
      "Douche à l'italienne, baignoire, baignoire balnéo",
      'Pose de WC suspendu et WC au sol',
      'Installation meuble vasque, lavabo, colonne',
      'Salle de bain PMR (accessible handicap/senior)',
      'Pose de carrelage et faïence (sol et mur)',
      "Barres d'appui et équipements de sécurité",
      'Robinetterie et mitigeurs thermostatiques',
    ],
  },
  {
    category: 'Climatisation',
    items: [
      'Installation climatisation réversible (split, multi-split)',
      'Entretien et dépannage climatisation',
      'Mise en service et contrôle d\'étanchéité',
      'Conseil dimensionnement selon surface et isolation',
    ],
  },
  {
    category: 'Eau chaude sanitaire',
    items: [
      "Ballon d'eau chaude (cumulus) — installation et remplacement",
      'Chauffe-eau thermodynamique',
      'Chauffe-eau solaire individuel (CESI)',
      'Ballon de stockage et préparateur ECS',
      'Résistances et thermostats',
      'Groupe de sécurité et soupape de décharge',
    ],
  },
  {
    category: 'Cuisine & Raccordements',
    items: [
      'Installation et raccordement évier cuisine',
      'Raccordement lave-vaisselle et lave-linge',
      'Pose de robinetterie et mitigeur cuisine',
      'Filtre eau à osmose inverse sous évier',
      "Adoucisseur d'eau",
      'Raccordement gazinière et plaque gaz',
    ],
  },
  {
    category: 'Réseaux & Tuyauterie',
    items: [
      'Raccordement eau froide et eau chaude',
      'Remplacement canalisations (cuivre, PER, multicouche)',
      'Recherche et réparation de fuites',
      'Détection de fuite non destructive',
      'Débouchage canalisation et hydrocurage',
      'Mise en conformité installation plomberie',
    ],
  },
  {
    category: 'Urgences & Dépannage',
    items: [
      "Fuite d'eau urgente (robinet, joint, canalisation)",
      'Dégât des eaux — intervention et constat',
      'Panne chaudière (dépannage rapide)',
      'Canalisation bouchée (évier, WC, douche)',
      'Remplacement joint et flexible en urgence',
      'Intervention week-end et soirée',
    ],
  },
];

const VALUES = [
  {
    title: 'Transparence',
    text: 'Devis gratuit et détaillé avant chaque intervention. Pas de surprise sur la facture finale. Les tarifs sont discutés et validés avec vous avant le démarrage des travaux.',
    icon: '📋',
  },
  {
    title: "Qualité d'exécution",
    text: 'Matériaux sélectionnés chez des fournisseurs reconnus (Grohe, Geberit, Frisquet, Atlantic). Finitions soignées. Chaque chantier est nettoyé avant notre départ.',
    icon: '⭐',
  },
  {
    title: 'Réactivité',
    text: "Réponse sous 2h à tout contact. Intervention dépannage sous 24h en semaine. Urgences traitées en priorité — nous savons ce que coûte une heure d'eau coupée.",
    icon: '⚡',
  },
  {
    title: 'Artisan local',
    text: 'Entrepreneur individuel basé à Aix-en-Provence. Vous avez un seul interlocuteur : Wissem, qui réalise lui-même les travaux. Pas de sous-traitance non annoncée.',
    icon: '📍',
  },
];

export default function APropos() {
  return (
    <div className="min-h-screen bg-natural-bg">
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-blue-300 text-sm font-medium mb-3 uppercase tracking-widest">
              Qui sommes-nous
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              {BRAND.name}
              <br />
              <span className="text-blue-300">Artisan plombier depuis {BRAND.foundingYear}</span>
              <br />à Aix-en-Provence
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
              Entrepreneur individuel certifié RGE, {BRAND.owner} réalise tous vos travaux de
              plomberie, chauffage et sanitaires dans les Bouches-du-Rhône. Travail soigné, tarifs
              transparents, réactivité garantie.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-20">
        <section aria-label="Chiffres clés EFFECTIVE'PLOMBERIE">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {KEY_FIGURES.map((fig, i) => {
              const Icon = fig.icon;
              return (
                <motion.div
                  key={fig.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm"
                >
                  <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <div className="text-2xl font-bold text-gray-900">{fig.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{fig.label}</div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section aria-label="Histoire de EFFECTIVE'PLOMBERIE">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                {BRAND.owner},
                <br />
                plombier artisan à Aix depuis {BRAND.foundingYear}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  {BRAND.name} a été créée en novembre 2019 à Aix-en-Provence. Entrepreneur
                  individuel spécialisé dans les travaux d&apos;installation d&apos;eau et de gaz
                  (NAF 4322A), {BRAND.owner} intervient dans l&apos;ensemble du département des
                  Bouches-du-Rhône.
                </p>
                <p>
                  Fort d&apos;une expérience terrain acquise sur de nombreux chantiers de
                  rénovation et de construction neuve, il a choisi de créer sa propre structure
                  pour proposer un service artisanal de qualité : un seul interlocuteur, une vraie
                  relation de confiance, et des travaux exécutés avec soin.
                </p>
                <p>
                  Aujourd&apos;hui, {BRAND.name} intervient pour des particuliers et des
                  professionnels sur Aix-en-Provence, Marseille et toutes les communes du 13 — de la
                  rénovation complète de salle de bain au dépannage d&apos;urgence, en passant par
                  la climatisation et la plomberie cuisine.
                </p>
              </div>
            </div>

            <div className="space-y-4" aria-label="Chronologie EFFECTIVE'PLOMBERIE">
              {[
                {
                  year: '2019',
                  event:
                    "Création d'EFFECTIVE'PLOMBERIE à Aix-en-Provence — adresse : 2 Boulevard du Clos Gabriel, Les Rougets",
                },
                {
                  year: '2020',
                  event:
                    'Obtention des certifications PG Gaz et Qualibat RGE — premiers chantiers de rénovation salle de bain',
                },
                {
                  year: '2021',
                  event:
                    "Développement climatisation, rénovation et plomberie cuisine dans tout le 13",
                },
                {
                  year: '2022',
                  event:
                    'Certification QualiPAC — extension de la zone d\'intervention à tout le département 13',
                },
                { year: '2023', event: 'Plus de 150 chantiers réalisés — note Google 4.9/5' },
                {
                  year: '2024-2025',
                  event:
                    "Spécialisation en rénovation énergétique — accompagnement MaPrimeRénov' pour nos clients",
                },
              ].map((item, i, arr) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex-shrink-0 w-14 text-right">
                    <span className="text-sm font-bold text-blue-600">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600 mt-0.5" />
                    {i < arr.length - 1 && <div className="w-0.5 bg-blue-200 flex-1 mt-1 min-h-[24px]" />}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pb-4">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="certif-title">
          <h2 id="certif-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Certifications & garanties
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {CERTIFICATIONS.map((certif) => {
              const Icon = certif.icon;
              return (
                <div
                  key={certif.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{certif.name}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{certif.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Nos attestations sont disponibles sur demande — et vérifiables sur{' '}
            <a
              href="https://qualibat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              qualibat.com
            </a>{' '}
            et{' '}
            <a
              href="https://www.qualit-enr.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              qualit-enr.org
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="values-title">
          <h2 id="values-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Comment nous travaillons
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-3" aria-hidden="true">
                  {val.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{val.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="services-title">
          <h2 id="services-title" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
            Toutes nos prestations
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Plomberie, chauffage, sanitaires — du dépannage à la rénovation complète, dans tout le
            département 13.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_COMPLETS.map((service) => (
              <div key={service.category} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  {service.category}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="zone-title" className="bg-blue-50 rounded-3xl p-8 sm:p-10">
          <h2 id="zone-title" className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Zone d&apos;intervention
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Basé au <strong>{formatLegalAddress()}</strong>, nous intervenons dans tout le
            département des Bouches-du-Rhône.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {[
              ['Aix-en-Provence', '13080 / 13090 / 13100'],
              ['Marseille', '13001 → 13016'],
              ['Aubagne', '13400'],
              ['La Ciotat', '13600'],
              ['Vitrolles', '13127'],
              ['Marignane', '13700'],
              ['Gardanne', '13120'],
              ['Bouc-Bel-Air', '13320'],
              ['Éguilles', '13510'],
              ['Venelles', '13770'],
              ['Meyreuil', '13590'],
              ['Rousset / Fuveau', '13790 / 13710'],
              ['Martigues', '13500'],
              ['Istres', '13800'],
              ['Salon-de-Provence', '13300'],
            ].map(([city, cp]) => (
              <div
                key={city}
                className="bg-white rounded-xl px-4 py-3 flex justify-between items-center border border-blue-100"
              >
                <span className="font-medium text-gray-900">{city}</span>
                <span className="text-xs text-blue-600 font-mono">{cp}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Votre commune n&apos;est pas listée ?{' '}
            <Link to="/contact" className="text-blue-600 underline hover:text-blue-800">
              Contactez-nous
            </Link>{' '}
            — nous étudions chaque demande.
          </p>
        </section>

        <section aria-labelledby="contact-apropos-title">
          <h2 id="contact-apropos-title" className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Nous contacter
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900">Informations légales</h3>
              <dl className="space-y-2 text-sm">
                {[
                  ['Raison sociale', BRAND.name],
                  ['Dirigeant', BRAND.owner],
                  ['Forme juridique', BRAND.legal.legalForm],
                  ['SIRET', BRAND.legal.siret],
                  ['N° TVA', BRAND.legal.vatNumber],
                  ['Code NAF', BRAND.legal.naf],
                  ['Création', BRAND.legal.createdAt],
                  ['Adresse', formatLegalAddress()],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-2">
                    <dt className="text-gray-500 min-w-[120px] flex-shrink-0">{label} :</dt>
                    <dd className="text-gray-900 font-medium">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900">Nous joindre</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white transition-colors"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <div>
                    <div className="font-bold">{BRAND.phone}</div>
                    <div className="text-blue-200 text-xs">Disponible 7j/7 pour les urgences</div>
                  </div>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 transition-colors border border-gray-200"
                >
                  <Mail className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  <div>
                    <div className="font-medium">{BRAND.email}</div>
                    <div className="text-gray-500 text-xs">Réponse sous 24h</div>
                  </div>
                </a>
                <a
                  href={BRAND.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 transition-colors border border-gray-200"
                >
                  <Star className="w-5 h-5 text-amber-500" aria-hidden="true" />
                  <div>
                    <div className="font-medium">Voir nos avis Google</div>
                    <div className="text-gray-500 text-xs">
                      Note {BRAND.aggregateRating.value}/5
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" aria-hidden="true" />
                </a>
              </div>

              <div className="pt-2">
                <p className="text-xs text-gray-500 font-medium mb-2">Horaires</p>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li className="flex justify-between">
                    <span>Lun – Ven</span>
                    <span className="font-medium">07:30 – 19:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-medium">08:00 – 17:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Urgences</span>
                    <span className="font-medium text-blue-600">7j/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center bg-blue-600 rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">
            Un projet de plomberie à Aix-en-Provence ou dans le 13 ?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Devis gratuit sous 24h. Artisan certifié RGE. Intervention dans tout le département.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/devis"
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Devis gratuit en ligne
            </Link>
            <a
              href={`tel:${BRAND.phoneTel}`}
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Appeler {BRAND.owner} — {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
