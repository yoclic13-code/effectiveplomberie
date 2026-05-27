import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Clock, Wrench } from 'lucide-react';
import { REALISATIONS_DATA } from '../data';
import { trackGalleryFilter } from '../analytics/ga4';

type GalleryFilterId = 'all' | 'renovation' | 'heating' | 'repair';

const FILTER_GA_MAP: Record<GalleryFilterId, 'tous' | 'renovation' | 'chauffage' | 'depannage'> = {
  all: 'tous',
  renovation: 'renovation',
  heating: 'chauffage',
  repair: 'depannage',
};

export default function Realisations() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>('all');

  const handleFilterChange = (filterId: GalleryFilterId) => {
    setActiveFilter(filterId);
    trackGalleryFilter({ filter: FILTER_GA_MAP[filterId] });
  };

  const filters = [
    { id: 'all', label: 'Tous les chantiers' },
    { id: 'renovation', label: 'Rénovations SDB & Prestige' },
    { id: 'heating', label: 'Chauffage & Énergie PAC' },
    { id: 'repair', label: 'Urgences & Dépannages' },
  ] as const;

  const filteredRealisations = REALISATIONS_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'renovation') {
      const cat = item.category.toLowerCase();
      return cat.includes('rénovation') || cat.includes('salle de bain') || cat.includes('cuisine') || cat.includes('prestige');
    }
    if (activeFilter === 'heating') {
      const cat = item.category.toLowerCase();
      return cat.includes('chauffage') || cat.includes('climatisation') || cat.includes('énergie');
    }
    if (activeFilter === 'repair') return item.category.toLowerCase().includes('dépannage');
    return true;
  });

  return (
    <section id="realisations-view-page" className="w-full bg-natural-bg py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Content */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] font-mono">
            Rigueur & Réalisations
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-natural-heading tracking-tight mt-1">
            Galerie de nos Chantiers
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Explorez notre savoir-faire concret en images. Du remplacement d'évacuation d'immeuble à la douche à l'italienne de villa d'architecte, nous visons l'ajustement géométrique parfait.
          </p>
        </div>

        {/* Categories filters menu  */}
        <div className="flex flex-nowrap justify-center items-stretch gap-1 sm:gap-1.5 mb-10 w-full max-w-5xl mx-auto bg-white border border-natural-border p-1.5 sm:p-2 rounded-2xl shadow-sm overflow-x-auto">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                id={`filter-tab-${f.id}`}
                onClick={() => handleFilterChange(f.id)}
                className={`relative flex-shrink-0 px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-natural-heading font-extrabold' : 'text-slate-500 hover:text-natural-heading'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-portfolio-filter"
                    className="absolute inset-0 bg-natural-primary/10 border-b-[2px] border-natural-primary rounded-xl"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredRealisations.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                key={item.id}
                id={`realisation-card-${item.id}`}
                className="bg-white border border-natural-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:border-natural-primary/30 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Photo area */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] bg-natural-primary/90 backdrop-blur-sm text-white font-mono uppercase font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Body textual Content */}
                  <div className="p-6">
                    <h3 className="text-base sm:text-lg font-bold text-natural-heading mb-2 leading-tight group-hover:text-natural-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer stats metadata */}
                <div className="p-6 pt-0 border-t border-natural-border flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-natural-primary" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.duration}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Small portfolio CTA encouragement */}
        <div className="text-center mt-14">
          <p className="text-xs text-slate-500 font-mono">
            Un projet similaire de rénovation ou de remplacement ? Contactez-nous pour une étude de faisabilité technique gratuite.
          </p>
        </div>

      </div>
    </section>
  );
}
