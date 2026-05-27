import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Bath, Wrench, Layers, ClipboardCheck, ArrowRight, HelpCircle, Search, Snowflake, ChefHat } from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { trackServiceView, trackDevisCTAClick } from '../analytics/ga4';

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    const willExpand = expandedId !== id;
    if (willExpand) {
      trackServiceView({
        service_name: id,
        action: 'expand',
      });
    }
    setExpandedId(willExpand ? id : null);
  };

  const mapIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Bath': return <Bath className="w-6 h-6" />;
      case 'Wrench': return <Wrench className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Snowflake': return <Snowflake className="w-6 h-6" />;
      case 'ChefHat': return <ChefHat className="w-6 h-6" />;
      default: return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <section id="services-view-page" className="w-full bg-natural-bg py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content mapping */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] font-mono">
            Compagnies & Savoir-Faire
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-natural-heading tracking-tight mt-1">
            Nos prestations
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Découvrez nos interventions en plomberie, chauffage et sanitaires dans les Bouches-du-Rhône.
            Chaque chantier fait l&apos;objet d&apos;un devis gratuit et personnalisé sur demande.
          </p>
        </div>

        {/* Dynamic Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div 
                key={service.id} 
                id={`services-card-${service.id}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleExpand(service.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(service.id);
                  }
                }}
                aria-expanded={isExpanded}
                aria-controls={`accordion-content-${service.id}`}
                className={`bg-white border text-left rounded-3xl cursor-pointer transition-all duration-300 relative overflow-hidden group select-none flex flex-col sm:flex-row ${
                  isExpanded 
                    ? 'border-natural-primary shadow-lg shadow-blue-500/5' 
                    : 'border-natural-border hover:border-natural-primary/30 hover:shadow-md'
                }`}
              >
                {/* Contenu texte */}
                <div id={`accordion-content-${service.id}`} className="flex-1 p-6 sm:p-8 min-w-0" role="region" aria-labelledby={`accordion-trigger-${service.id}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                      isExpanded ? 'bg-blue-50 text-natural-primary' : 'bg-slate-100 text-[#2563eb]'
                    }`}>
                      {mapIcon(service.iconName)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-natural-muted">
                        {service.category === 'depannage' && '🚨 Dépannage'}
                        {service.category === 'climatisation' && '❄️ Climatisation'}
                        {service.category === 'cuisine' && '🍳 Cuisine'}
                        {service.category === 'renovation' && '🛁 Rénovation'}
                        {service.category === 'chauffage' && '🔥 Chauffage'}
                        {service.category === 'installation' && '⚙️ Installation'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-natural-heading leading-tight mt-0.5 group-hover:text-natural-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span className="text-slate-500">Délai indicatif :</span>
                      <span className="text-natural-primary font-bold">{service.timeEstimate}</span>
                    </span>
                  </div>

                  {/* Accordion extension */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-natural-border"
                        onClick={(e) => e.stopPropagation()} // Stop clicking elements from retracting accordion
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                          {service.fullDescription}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to="/devis"
                            onClick={() => {
                              trackServiceView({ service_name: service.id, action: 'cta_devis' });
                              trackDevisCTAClick({
                                source_page: 'services',
                                cta_label: 'Faire ma demande de devis',
                              });
                            }}
                            className="flex-1 bg-gradient-to-r from-natural-primary to-blue-600 hover:opacity-95 text-white font-semibold py-2.5 px-4 rounded-xl text-xs text-center justify-center flex items-center gap-1.5 transition-all"
                          >
                            <span>Faire ma demande de devis</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to="/contact"
                            onClick={() =>
                              trackServiceView({ service_name: service.id, action: 'cta_contact' })
                            }
                            className="bg-slate-50 border border-slate-200 hover:bg-slate-100 text-xs font-semibold px-4 py-2.5 rounded-xl text-slate-700 transition-all text-center"
                          >
                            Poser une question
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Small trigger click handle */}
                  {!isExpanded && (
                    <div className="mt-4 text-[10px] text-natural-primary font-mono font-bold flex items-center gap-1">
                      <span>Cliquez pour en savoir plus</span>
                      <span>💡</span>
                    </div>
                  )}
                </div>

                {/* Image visible à droite */}
                <div className="relative w-full sm:w-[42%] md:w-[38%] min-h-[180px] sm:min-h-0 sm:self-stretch shrink-0 border-t sm:border-t-0 sm:border-l border-natural-border/80">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-l from-black/25 via-transparent to-transparent sm:from-white/20 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative advice box */}
        <div className="mt-16 bg-white border border-natural-border rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-natural-heading text-sm font-bold">ℹ️ Prise en charge des dégâts des eaux (Assurance)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Toutes nos interventions de recherche de fuite d'eau font l'objet d'un rapport technique normalisé et agréé par les assureurs. Le coût de la détection et les dommages indirects sont généralement pris en charge par votre convention MRH (Multirisque Habitation). Ne tardez pas à déclarer votre sinistre !
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
