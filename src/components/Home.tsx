import { Link } from 'react-router-dom';
import { Phone, Droplet, Flame, Wrench, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import Carousel from './Carousel';
import OptimizedImage from './OptimizedImage';
import { BRAND } from '../brand';
import { SITE_IMAGES } from '../constants/images';
import { trackPhoneCall, trackDevisCTAClick } from '../analytics/ga4';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div id="home-view-page" className="w-full relative overflow-hidden bg-slate-50">
      
      {/* Hero bannière — image locale */}
      <section id="hero-banner" className="relative h-[85vh] min-h-[550px] w-full flex items-center justify-center overflow-hidden bg-slate-900">
        <OptimizedImage
          src={SITE_IMAGES.banniere}
          alt={`${BRAND.name} — plombier Aix-en-Provence et Marseille, Bouches-du-Rhône`}
          priority
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] scale-105 pointer-events-none"
        />
        {/* Contraste centré pour le texte, sans assombrir toute l'image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgba(15,23,42,0.72)_0%,rgba(15,23,42,0.2)_55%,transparent_100%)] z-10" />
        {/* Fondu doux vers la section claire en dessous — plus de démarcation brutale */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-slate-50/60 to-slate-50 z-10 pointer-events-none" />

        {/* Hero Elements */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center text-white pt-10 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl mx-auto rounded-3xl px-6 py-8 sm:px-10 sm:py-10 bg-slate-900/40 backdrop-blur-[2px] border border-white/10 shadow-2xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 text-white border border-blue-500 text-xs font-semibold tracking-wider uppercase font-mono shadow-md">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
              Artisans Plombiers Certifiés RGE
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              Plombier à Aix-en-Provence<br />
              <span className="text-sky-300">&amp; Marseille — Bouches-du-Rhône</span>
            </h1>

            <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              Dépannage, recherche de fuite, rénovation, climatisation,
              salle de bain et cuisine. Artisan certifié RGE à Aix (13100), intervention sur Marseille et tout le 13.
              Devis gratuit.
            </p>

            {/* Call to actions */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                id="hero-cta-devis"
                to="/devis"
                onClick={() =>
                  trackDevisCTAClick({
                    source_page: 'home',
                    cta_label: 'Demander un devis gratuit',
                  })
                }
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-8 rounded-xl text-sm tracking-wide shadow-lg shadow-sky-500/25 active:scale-95 transition-all text-center"
              >
                Demander un devis gratuit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚨 QUICK EMERGENCY BAR */}
      <section id="emergency-bar" className="relative z-20 -mt-10 max-w-6xl mx-auto px-4">
        <div className="bg-white border border-natural-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-natural-heading text-base font-bold">🚨 Urgence Fuite ou Chauffage ?</h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Intervention rapide à Aix-en-Provence, Marseille et dans tout le département 13.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a
              href={`tel:${BRAND.phoneTel}`}
              onClick={() => trackPhoneCall({ location: 'urgency_bar' })}
              className="w-full sm:w-auto bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all font-mono shadow-md shadow-rose-500/10"
            >
              <Phone className="w-4 h-4" />
              {BRAND.phone}
            </a>
            <Link
              id="emergency-contact-cta"
              to="/contact"
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-705 font-medium px-5 py-3 rounded-xl text-xs transition-colors text-center"
            >
              Contacter l'Atelier
            </Link>
          </div>
        </div>
      </section>

      {/* 🏗️ STATS SECTION */}
      <section id="stats-section" className="w-full py-16 sm:py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="p-5 bg-white rounded-2xl border border-natural-border shadow-sm hover:border-natural-primary/30 transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-natural-primary font-mono">
              {BRAND.stats.experienceLabel}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1.5">
              {BRAND.stats.experienceSub}
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-natural-border shadow-sm hover:border-natural-primary/30 transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-natural-primary font-mono">25 Mins</div>
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1.5">Moyenne d'Arrivée</div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-natural-border shadow-sm hover:border-natural-primary/30 transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-natural-primary font-mono">100%</div>
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1.5">Garantie Décennale SMABTP</div>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-natural-border shadow-sm hover:border-natural-primary/30 transition-colors">
            <div className="text-2xl sm:text-4xl font-extrabold text-natural-primary font-mono">
              {BRAND.stats.interventions}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 mt-1.5">
              {BRAND.stats.interventionsSub}
            </div>
          </div>

        </div>
      </section>

      {/* 🛠️ CORE SERVICES INTRO */}
      <section id="home-services-intro" className="w-full py-16 md:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] font-mono">Nos Métiers</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-natural-heading mt-1">Savoir-Faire Traditionnel & Moderne</h2>
            </div>
            <Link
              id="services-read-more"
              to="/services"
              className="text-xs font-semibold uppercase tracking-wider text-[#2563eb] hover:text-[#1d4ed8] transition-colors flex items-center gap-1"
            >
              <span>Découvrir l'ensemble des formules</span>
              <CheckCircle2 className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-white border border-natural-border rounded-2xl p-6 hover:border-natural-primary/50 hover:shadow-lg transition-all group shadow-sm hover:-translate-y-1">
              <div className="w-10 h-10 bg-blue-50 text-natural-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Droplet className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-base font-bold text-natural-heading mb-2 group-hover:text-natural-primary transition-colors">Recherche de Fuite Laser</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Détection sans destruction par corrélation acoustique et thermographie. Devis d'intervention rapide pour vos assurances.
              </p>
              <Link to="/services" className="text-xs text-natural-primary font-semibold flex items-center gap-1.5 group-hover:underline">
                <span>Détails & Tarifs</span>
                <span className="font-mono">→</span>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white border border-natural-border rounded-2xl p-6 hover:border-natural-primary/50 hover:shadow-lg transition-all group shadow-sm hover:-translate-y-1">
              <div className="w-10 h-10 bg-orange-50 text-natural-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Flame className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-base font-bold text-natural-heading mb-2 group-hover:text-natural-primary transition-colors">Climatisation</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Installation et entretien de climatisation réversible : confort été comme hiver, splits et multi-splits adaptés à votre logement.
              </p>
              <Link to="/services" className="text-xs text-natural-primary font-semibold flex items-center gap-1.5 group-hover:underline">
                <span>Détails & Tarifs</span>
                <span className="font-mono">→</span>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white border border-natural-border rounded-2xl p-6 hover:border-natural-primary/50 hover:shadow-lg transition-all group shadow-sm hover:-translate-y-1">
              <div className="w-10 h-10 bg-green-50 text-natural-green rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Wrench className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-base font-bold text-natural-heading mb-2 group-hover:text-natural-primary transition-colors">Rénovation, Salle de Bain & Cuisine</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                Rénovation complète, salles de bain et plomberie cuisine clé en main dans le 13.
              </p>
              <Link to="/services" className="text-xs text-natural-primary font-semibold flex items-center gap-1.5 group-hover:underline">
                <span>Détails & Tarifs</span>
                <span className="font-mono">→</span>
              </Link>
            </div>

          </div>

          {/* Quick Realisations Highlight */}
          <div className="mt-12 bg-white rounded-3xl p-6 border border-natural-border text-center max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-natural-primary shrink-0 animate-pulse">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-natural-heading block font-sans">Intéressé(e) par nos travaux précédents ?</span>
                <span className="text-xs text-slate-500 block">Excellence visuelle et étanchéité absolue garanties sur tous nos chantiers de prestige.</span>
              </div>
            </div>
            <Link
              id="portfolio-redirect-cta"
              to="/realisations"
              className="bg-slate-50 border border-slate-200 text-slate-705 hover:bg-slate-100 hover:text-natural-heading px-5 py-2.5 rounded-xl text-xs font-semibold shrink-0"
            >
              Voir nos Réalisations &rarr;
            </Link>
          </div>

        </div>
      </section>

      {/* 🤝 CLIENT CAROUSEL & BRANDS ("Ils nous ont fait confiance") */}
      <Carousel />

    </div>
  );
}
