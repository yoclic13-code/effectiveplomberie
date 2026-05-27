import { Link } from 'react-router-dom';
import { BRAND, formatLegalAddress } from '../../brand';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-natural-bg">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium">Politique de confidentialité</li>
          </ol>
        </nav>

        <article>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Politique de confidentialité
          </h1>
          <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : 25 mai 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Responsable du traitement</h2>
              <p>
                <strong>{BRAND.name}</strong>
                <br />
                {BRAND.legal.legalForm} — {BRAND.owner}
                <br />
                Adresse : {formatLegalAddress()}
                <br />
                SIRET : {BRAND.legal.siret}
                <br />
                E-mail :{' '}
                <a href={`mailto:${BRAND.email}`} className="text-blue-600 underline">
                  {BRAND.email}
                </a>
                <br />
                Téléphone :{' '}
                <a href={`tel:${BRAND.phoneTel}`} className="text-blue-600 underline">
                  {BRAND.phone}
                </a>
                <br />
                Contact RGPD / DPO : {BRAND.email}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                2. Données collectées et finalités
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border border-gray-200 font-semibold">
                        Données
                      </th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">
                        Finalité
                      </th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">
                        Base légale
                      </th>
                      <th className="text-left p-3 border border-gray-200 font-semibold">
                        Durée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-200">
                        Nom, e-mail, téléphone, message
                      </td>
                      <td className="p-3 border border-gray-200">
                        Répondre à vos demandes de contact
                      </td>
                      <td className="p-3 border border-gray-200">
                        Intérêt légitime (Art. 6.1.f RGPD)
                      </td>
                      <td className="p-3 border border-gray-200">3 ans</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200">
                        Données devis (adresse, type travaux, description)
                      </td>
                      <td className="p-3 border border-gray-200">Établissement de devis</td>
                      <td className="p-3 border border-gray-200">
                        Exécution précontractuelle (Art. 6.1.b)
                      </td>
                      <td className="p-3 border border-gray-200">5 ans</td>
                    </tr>
                    <tr>
                      <td className="p-3 border border-gray-200">
                        Données analytiques (GA4, anonymisées)
                      </td>
                      <td className="p-3 border border-gray-200">
                        Mesure d&apos;audience, amélioration du site
                      </td>
                      <td className="p-3 border border-gray-200">Consentement (Art. 6.1.a)</td>
                      <td className="p-3 border border-gray-200">
                        13 mois (cookies), 26 mois (rapports)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies</h2>
              <p className="mb-3">
                Notre site utilise des cookies. Vous pouvez gérer vos préférences à tout moment
                via le bouton <strong>« Cookies »</strong> en bas de page ou en{' '}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-panel'))}
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors font-medium"
                >
                  cliquant ici
                </button>
                .
              </p>
              <p>
                Conformément aux recommandations de la{' '}
                <a
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  CNIL
                </a>
                , aucun cookie non essentiel n&apos;est déposé sans votre consentement préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Destinataires des données</h2>
              <p>Vos données sont destinées exclusivement à {BRAND.name}.</p>
              <p className="mt-2">
                En cas d&apos;utilisation de Google Analytics (avec votre consentement), Google
                Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irlande) traite des données
                d&apos;audience anonymisées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Vos droits</h2>
              <p className="mb-3">
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits
                suivants :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Droit d&apos;accès</strong> — obtenir une copie de vos données
                </li>
                <li>
                  <strong>Droit de rectification</strong> — corriger des données inexactes
                </li>
                <li>
                  <strong>Droit à l&apos;effacement</strong> — demander la suppression
                </li>
                <li>
                  <strong>Droit d&apos;opposition</strong> — s&apos;opposer au traitement
                </li>
                <li>
                  <strong>Droit à la portabilité</strong> — recevoir vos données dans un format
                  structuré
                </li>
                <li>
                  <strong>Droit de retrait du consentement</strong> — à tout moment, sans effet
                  rétroactif
                </li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits :{' '}
                <a href={`mailto:${BRAND.email}`} className="text-blue-600 underline">
                  {BRAND.email}
                </a>
                .
                <br />
                En cas de litige, vous pouvez saisir la{' '}
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  CNIL
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :
                HTTPS, en-têtes de sécurité (CSP, HSTS, X-Frame-Options), chiffrement des données
                en transit. Les formulaires sont actuellement stockés localement dans votre
                navigateur (localStorage) et non transmis à un serveur tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Hébergement</h2>
              <p>
                Ce site est hébergé par <strong>{BRAND.hosting.name}</strong>, {BRAND.hosting.address}.
                <br />
                Site web de l&apos;hébergeur :{' '}
                <a
                  href={BRAND.hosting.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {BRAND.hosting.website.replace('https://', '')}
                </a>
                .
              </p>
            </section>
          </div>
        </article>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link
            to="/"
            className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
