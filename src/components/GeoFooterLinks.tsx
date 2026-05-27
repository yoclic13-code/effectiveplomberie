import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { GEO_FOOTER_CITIES } from '../geo/geoData';

export default function GeoFooterLinks() {
  return (
    <div className="border-t border-slate-200 pt-8 mt-8 col-span-full">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-natural-primary shrink-0" aria-hidden="true" />
        <h3 className="text-sm font-bold text-natural-heading uppercase tracking-wider font-mono">
          Zones d&apos;intervention — Département 13
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {GEO_FOOTER_CITIES.map((city) => (
          <Link
            key={city.slug}
            to={`/${city.slug}`}
            className="text-xs text-slate-600 hover:text-natural-primary transition-colors bg-white hover:bg-slate-50 px-3 py-1.5 rounded-full border border-natural-border hover:border-natural-primary/30"
            aria-label={`Plombier à ${city.name} (${city.codePostal})`}
          >
            {city.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
