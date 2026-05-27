import { Link, Navigate, useParams } from 'react-router-dom';
import { MapPin, Clock, Phone, CheckCircle, Star } from 'lucide-react';
import { useEffect } from 'react';
import { getCityBySlug } from '../geo/geoData';
import { BRAND } from '../brand';
import { trackPhoneCall, trackDevisCTAClick } from '../analytics/ga4';
import { useSEO } from '../seo/useSEO';

const SERVICES = [
  'Dépannage urgence 24h/7j',
  'Recherche de fuite non destructive',
  'Rénovation complète',
  'Climatisation (installation & entretien)',
  'Salle de bain complète',
  'Plomberie cuisine',
  'Raccordements eau et gaz',
  'Débouchage canalisation',
];

export default function GeoPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = getCityBySlug(slug ?? '');

  useSEO({
    view: 'geo',
    overrideTitle: city?.metaTitle,
    overrideDescription: city?.metaDescription,
    disabled: !city,
  });

  useEffect(() => {
    if (!city) return;
    const url = `${BRAND.siteUrl}/${city.slug}`;
    let scriptLocal = document.getElementById('geo-ld-local');
    let scriptFaq = document.getElementById('geo-ld-faq');
    if (!scriptLocal) {
      const el = document.createElement('script');
      el.id = 'geo-ld-local';
      el.type = 'application/ld+json';
      document.head.appendChild(el);
      scriptLocal = el;
    }
    if (!scriptFaq) {
      const el = document.createElement('script');
      el.id = 'geo-ld-faq';
      el.type = 'application/ld+json';
      document.head.appendChild(el);
      scriptFaq = el;
    }
    scriptLocal.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Plumber',
      name: BRAND.name,
      description: city.metaDescription,
      telephone: BRAND.phoneTel,
      url,
      areaServed: {
        '@type': 'City',
        name: city.name,
        postalCode: city.codePostal,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: city.lat,
        longitude: city.lng,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: BRAND.aggregateRating.value,
        reviewCount: String(BRAND.aggregateRating.count),
      },
    });
    scriptFaq.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: city.faq.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
    return () => {
      scriptLocal?.remove();
      scriptFaq?.remove();
    };
  }, [city]);

  if (!city) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-natural-bg">
      <div className="bg-blue-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav aria-label="Fil d'Ariane" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-blue-300 flex-wrap">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>Zones d&apos;intervention</li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">{city.name}</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{city.h1}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-blue-200 mb-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              {city.codePostal} · {city.population}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
              Intervention en {city.delaiIntervention}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              {BRAND.aggregateRating.value}/5 · {BRAND.aggregateRating.count} avis Google
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/devis"
              onClick={() =>
                trackDevisCTAClick({ source_page: city.slug, cta_label: 'Devis gratuit' })
              }
              className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors text-center"
            >
              Devis gratuit sous 24h
            </Link>
            <a
              href={`tel:${BRAND.phoneTel}`}
              onClick={() =>
                trackPhoneCall({ location: 'hero', phone_number: BRAND.phoneTel.replace('+', '') })
              }
              className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-14">
        <section>
          <h2 className="text-2xl font-bold text-natural-heading mb-4">
            Votre plombier de confiance à {city.name}
          </h2>
          <p className="text-slate-700 leading-relaxed text-lg mb-4">{city.intro}</p>
          <p className="text-slate-600 leading-relaxed">{city.particularite}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-bold text-natural-heading mb-5">
              Nos interventions à {city.name}
            </h2>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-slate-700">
                  <CheckCircle
                    className="w-5 h-5 text-natural-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-natural-heading mb-5">
              Problèmes typiques à {city.name}
            </h2>
            <ul className="space-y-3">
              {city.problemesTypiques.map((p) => (
                <li
                  key={p}
                  className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg text-sm text-amber-900 leading-relaxed"
                >
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="bg-white rounded-2xl border border-natural-border p-6">
          <h2 className="text-xl font-bold text-natural-heading mb-3">Parc immobilier local</h2>
          <p className="text-slate-600 leading-relaxed">{city.logements}</p>
        </section>

        {city.quartiers && city.quartiers.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-natural-heading mb-4">
              Quartiers et secteurs desservis à {city.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {city.quartiers.map((q) => (
                <span
                  key={q}
                  className="bg-blue-50 text-blue-800 text-sm px-3 py-1.5 rounded-full border border-blue-100 font-medium"
                >
                  {q}
                </span>
              ))}
            </div>
          </section>
        )}

        {city.testimonial && (
          <section className="bg-slate-50 rounded-2xl p-8 border border-natural-border">
            <div className="flex gap-1 mb-4" aria-label="Note 5 sur 5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-slate-700 text-lg leading-relaxed mb-4 italic">
              &ldquo;{city.testimonial.text}&rdquo;
            </blockquote>
            <cite className="not-italic text-sm text-slate-500 font-medium">
              — {city.testimonial.author} · {city.testimonial.quartier}
            </cite>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-natural-heading mb-6">
            Questions fréquentes — plombier à {city.name}
          </h2>
          <div className="space-y-4">
            {city.faq.map((item) => (
              <details
                key={item.question}
                className="bg-white rounded-xl border border-natural-border p-5 group"
              >
                <summary className="font-semibold text-natural-heading cursor-pointer hover:text-natural-primary transition-colors">
                  {item.question}
                </summary>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="bg-blue-600 rounded-3xl p-8 sm:p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Besoin d&apos;un plombier à {city.name} ?</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            {BRAND.name} intervient à {city.name} ({city.codePostal}) en {city.delaiIntervention}.
            Artisan certifié RGE, {BRAND.owner} depuis {BRAND.foundingYear}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/devis"
              onClick={() =>
                trackDevisCTAClick({ source_page: city.slug, cta_label: 'Devis gratuit en ligne' })
              }
              className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Devis gratuit en ligne
            </Link>
            <a
              href={`tel:${BRAND.phoneTel}`}
              onClick={() =>
                trackPhoneCall({ location: 'cta', phone_number: BRAND.phoneTel.replace('+', '') })
              }
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
