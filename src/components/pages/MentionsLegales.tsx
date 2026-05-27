import { Link } from 'react-router-dom';
import { BRAND, formatLegalAddress } from '../../brand';

export default function MentionsLegales() {
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
            <li className="text-gray-900 font-medium">Mentions légales</li>
          </ol>
        </nav>

        <article>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentions légales</h1>
          <p className="text-sm text-gray-500 mb-10">
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans
            l&apos;économie numérique (LCEN).
          </p>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
              <address className="not-italic space-y-1 text-sm leading-relaxed">
                <p>
                  <strong>{BRAND.name}</strong>
                </p>
                <p>{BRAND.legal.legalForm}</p>
                <p>Représentant légal : {BRAND.owner}</p>
                <p>SIRET : {BRAND.legal.siret}</p>
                <p>SIREN : {BRAND.legal.siren}</p>
                <p>Numéro de TVA intracommunautaire : {BRAND.legal.vatNumber}</p>
                <p>Code NAF / APE : {BRAND.legal.naf}</p>
                <p>Date de création : {BRAND.legal.createdAt}</p>
                <p>Adresse : {formatLegalAddress()}</p>
                <p>
                  Téléphone :{' '}
                  <a href={`tel:${BRAND.phoneTel}`} className="text-blue-600 underline">
                    {BRAND.phone}
                  </a>
                </p>
                <p>
                  E-mail :{' '}
                  <a href={`mailto:${BRAND.email}`} className="text-blue-600 underline">
                    {BRAND.email}
                  </a>
                </p>
                <p>Directeur de la publication : {BRAND.owner}</p>
              </address>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hébergement</h2>
              <address className="not-italic space-y-1 text-sm">
                <p>
                  <strong>{BRAND.hosting.name}</strong>
                </p>
                <p>{BRAND.hosting.address}</p>
                <p>
                  Site :{' '}
                  <a
                    href={BRAND.hosting.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {BRAND.hosting.website.replace('https://', '')}
                  </a>
                </p>
              </address>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Activité professionnelle</h2>
              <p className="text-sm leading-relaxed">
                {BRAND.name} est un entrepreneur individuel spécialisé dans les travaux
                d&apos;installation d&apos;eau et de gaz en tous locaux (code NAF 4322A). Nos
                activités comprennent la rénovation et création de salles de bain, l&apos;installation
                de cuisines, le remplacement et l&apos;installation de ballons d&apos;eau chaude,
                l&apos;installation et la maintenance de chaudières gaz, ainsi que tous travaux de
                plomberie générale et de chauffage.
              </p>
              <p className="text-sm leading-relaxed mt-3">
                <strong>Certifications professionnelles :</strong> Qualibat RGE, Professionnel du
                Gaz (PG Gaz), QualiPAC. Assurance garantie décennale et responsabilité civile
                professionnelle en vigueur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
              <p className="text-sm leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, logos, structure) est la
                propriété d&apos;{BRAND.name} ou fait l&apos;objet d&apos;une autorisation
                d&apos;utilisation. Toute reproduction, même partielle, est interdite sans accord
                préalable écrit de {BRAND.owner}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Responsabilité</h2>
              <p className="text-sm leading-relaxed">
                {BRAND.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations
                diffusées sur ce site. Les informations présentées sont
                données à titre indicatif et ne constituent pas un devis contractuel. Seul le devis
                écrit signé par les deux parties engage {BRAND.name}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Données personnelles & cookies</h2>
              <p className="text-sm leading-relaxed">
                Pour toute question relative au traitement de vos données personnelles et à
                l&apos;utilisation des cookies, consultez notre{' '}
                <Link
                  to="/politique-de-confidentialite"
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Droit applicable</h2>
              <p className="text-sm leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. Tout litige relatif
                au site sera soumis à la compétence exclusive des tribunaux du ressort de la Cour
                d&apos;appel d&apos;Aix-en-Provence.
              </p>
            </section>
          </div>
        </article>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
          <Link
            to="/a-propos"
            className="text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
          >
            En savoir plus sur nous
          </Link>
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
