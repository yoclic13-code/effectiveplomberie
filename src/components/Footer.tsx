import { Link } from 'react-router-dom';
import { ShieldCheck, Flame, Award, ShieldAlert, Phone, Mail, MapPin, ArrowUp, Clock } from 'lucide-react';
import { CERTIFICATIONS } from '../data';
import { BRAND } from '../brand';
import { SITE_IMAGES } from '../constants/images';

const AGENCY_WEB_URL = 'https://designwebcreation.fr/';
import { APP_ROUTES } from '../router/routes';
import { trackPhoneCall } from '../analytics/ga4';
import GeoFooterLinks from './GeoFooterLinks';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerRoutes = APP_ROUTES.filter((r) => r.showInFooter);

  return (
    <footer id="app-footer" role="contentinfo" aria-label="Pied de page EFFECTIVE'PLOMBERIE" className="w-full bg-slate-50 border-t border-natural-border text-slate-600 font-sans">

      {/* Bandeau urgence & contact (déplacé depuis le header) */}
      <div
        id="footer-info-banner"
        className="w-full bg-slate-900 text-slate-300 text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2 font-mono"
      >
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Urgence 7j/7 - 24h/24</span>
          </span>
          <span className="flex items-center gap-1.5 sm:border-l sm:border-slate-700 sm:pl-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Assurance Décennale Garantie</span>
          </span>
        </div>
        <a
          href={`tel:${BRAND.phoneTel}`}
          onClick={() => trackPhoneCall({ location: 'urgency_bar' })}
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium"
        >
          <Phone className="w-3.5 h-3.5 animate-pulse shrink-0" />
          <span>Tél: {BRAND.phone}</span>
        </a>
      </div>
      
      {/* 🛡️ Section: Nos Certifications (Placed directly above the footer content) */}
      <section 
        id="certifications-section"
        className="w-full bg-white border-b border-natural-border py-12 md:py-16 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb] font-mono">
              Gages de Confiance & Normes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-natural-heading mt-1">
              Nos Certifications Qualité
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Faire appel à nous, c'est l'assurance d'un chantier conforme aux normes de sécurité, respectueux du DPE et éligible aux financements d'État.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {CERTIFICATIONS.map((cert) => {
              // Dynamically pick the matching icon component
              let IconComponent = ShieldCheck;
              if (cert.iconName === 'Flame') IconComponent = Flame;
              if (cert.iconName === 'Award') IconComponent = Award;
              if (cert.iconName === 'ShieldAlert') IconComponent = ShieldAlert;

              return (
                <div 
                  key={cert.id} 
                  id={`cert-card-${cert.id}`}
                  className="bg-slate-50 p-6 rounded-2xl border border-natural-border hover:border-natural-primary/45 transition-all group flex flex-col items-center text-center shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-natural-primary mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-natural-heading mb-2 group-hover:text-natural-primary transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Additional trust banner */}
          <div className="mt-10 pt-8 border-t border-slate-100 max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500">
            <div>
              <span className="font-bold text-natural-heading">RGE Qualibat N° E-92891</span> - Déclenchez MaPrimeRenov' pour le remplacement de chaudière ou l'installation PAC.
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-semibold text-slate-600">Plombiers agréés assurances MAAF, Allianz & AXA</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Main Footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Desc */}
          <div className="text-left">
            <div className="mb-5">
              <img
                src={BRAND.logoSrc}
                alt={BRAND.name}
                className="h-14 sm:h-16 w-auto max-w-[280px] object-contain object-left"
              />
            </div>
            <p className="text-xs leading-relaxed text-slate-500 mb-4">
              Artisan plombier à Aix-en-Provence et Marseille depuis {BRAND.foundingYear}. Plomberie,
              chauffage, salle de bain et dépannage urgence dans tout le département 13.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#2563eb] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interventions d'urgence opérationnelles</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-natural-heading uppercase tracking-wider mb-4 font-mono">
              Plan du Site
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerRoutes.map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className="hover:text-natural-primary hover:underline transition-colors text-left"
                  >
                    {route.path === '/' ? 'Accueil & Urgences' : route.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-natural-heading uppercase tracking-wider mb-4 font-mono">
              Coordonnées
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-natural-primary shrink-0 mt-0.5" />
                <span className="text-left">
                  {BRAND.serviceArea.headline}<br />
                  Siège : {BRAND.address.postalCode} {BRAND.address.locality}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-natural-primary shrink-0" />
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  onClick={() => trackPhoneCall({ location: 'footer' })}
                  className="hover:text-natural-primary transition-colors font-semibold"
                >
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-natural-primary shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-natural-primary transition-colors font-semibold">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening hours */}
          <div className="text-left">
            <h4 className="text-sm font-bold text-natural-heading uppercase tracking-wider mb-4 font-mono">
              Disponibilité
            </h4>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-natural-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-natural-heading">Plomberie en Ligne:</span>
                  <span className="block text-slate-500">Demandes traitées 24h/24 7j/7</span>
                </div>
              </div>
              <div>
                <span className="block font-bold text-natural-heading">Chantiers & Pose :</span>
                <span className="block text-slate-500">Lundi - Samedi : 8h00 - 19h00</span>
                <span className="block text-amber-600 mt-1 font-semibold">Urgences : Assurées 24h/24 sans interruption</span>
              </div>
            </div>
          </div>
        </div>

        <GeoFooterLinks />

        {/* 📜 Bottom line copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {BRAND.name}. Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
            <Link to="/a-propos" className="hover:text-natural-primary transition-colors">
              À propos
            </Link>
            <Link to="/mentions-legales" className="hover:text-natural-primary transition-colors">
              Mentions légales
            </Link>
            <Link
              to="/politique-de-confidentialite"
              className="hover:text-natural-primary transition-colors"
            >
              Politique de confidentialité
            </Link>
            <button 
              onClick={handleScrollToTop}
              className="bg-white border border-natural-border text-slate-600 hover:text-natural-primary hover:bg-slate-100 p-2 rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-sm"
              title="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-500">
          <span>Créé par</span>
          <a
            href={AGENCY_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity"
            title="Design Web Création — Agence web à Aix-en-Provence"
          >
            <img
              src={SITE_IMAGES.logoDesignWebCreation}
              alt="Design Web Création"
              className="h-8 w-auto object-contain"
              width={160}
              height={32}
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
