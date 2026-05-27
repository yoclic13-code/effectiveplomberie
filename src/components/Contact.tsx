import { Phone, Mail, MapPin, Clock, HeartHandshake, CheckCircle2 } from 'lucide-react';
import ContactForm from './ContactForm';
import { BRAND } from '../brand';
import { trackPhoneCall } from '../analytics/ga4';

export default function Contact() {
  return (
    <section id="contact-view-page" className="w-full bg-natural-bg py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] font-mono">
            À Votre Écoute
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-natural-heading tracking-tight mt-1">
            Prendre Contact
          </h1>
          <p className="text-slate-650 text-sm sm:text-base mt-2">
            Une question sur nos prestations, une demande d'entretien annuel de chauffage ou un projet de raccordements ? Utilisez notre formulaire de contact rapide pour nous faire part de vos interrogations.
          </p>
        </div>

        {/* Dynamic sections layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left direct contact cards - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick business coordination */}
            <div className="bg-white border border-natural-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-natural-heading flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-natural-primary" />
                <span>Nos Coordonnées</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Adresse de l'Atelier :</span>
                    <span className="text-slate-600 block mt-0.5">
                      Siège : {BRAND.address.postalCode} {BRAND.address.locality} — intervention sur{' '}
                      {BRAND.serviceArea.headline}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-4">
                  <Phone className="w-5 h-5 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Secrétariat Général :</span>
                    <a
                      href={`tel:${BRAND.phoneTel}`}
                      onClick={() => trackPhoneCall({ location: 'contact_page' })}
                      className="text-natural-primary hover:underline block mt-0.5 transition-colors font-semibold"
                    >
                      {BRAND.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-4">
                  <Mail className="w-5 h-5 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Adresse E-mail :</span>
                    <a href={`mailto:${BRAND.email}`} className="text-natural-primary hover:underline block mt-0.5 transition-colors font-semibold">{BRAND.email}</a>
                  </div>
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-4">
                  <Clock className="w-5 h-5 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Heures d'Accueil :</span>
                    <span className="text-slate-600 block mt-0.5">Du Lundi au Samedi : 8h00 - 19h00</span>
                    <span className="text-emerald-600 block font-semibold text-xs mt-1">Secteur urgences fuites d'eaux : disponible 24h/24 7j/7</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated Interactive Vector Map / Cover Area showing Zone of intervention */}
            <div className="bg-white border border-natural-border rounded-3xl p-5 overflow-hidden relative min-h-[180px] flex flex-col justify-between group shadow-sm">
              {/* Abs dark tint grid graph paper background */}
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-85" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 blur-2xl rounded-full pointer-events-none" />

              <div className="relative z-10 text-left">
                <span className="text-[10px] uppercase font-bold font-mono text-natural-primary">Périmètre d'Intervention</span>
                <h4 className="text-natural-heading text-base font-bold mt-1">Marseille & Bouches-du-Rhône (13)</h4>
                <p className="text-slate-600 text-xs leading-relaxed mt-2.5">
                  Nos équipes interviennent sur Marseille (13001 à 13016), Aix-en-Provence (13080, 13090, 13100), Aubagne, La Ciotat, Martigues, Salon-de-Provence, Vitrolles, Marignane et l'ensemble du département 13.
                </p>
              </div>

              <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-natural-primary font-bold group-hover:text-natural-primary/85 transition-colors">
                <span>Interventions garanties en -30 mins chrono</span>
                <span>🗺️</span>
              </div>
            </div>

          </div>

          {/* Right form block - 7 cols */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

      </div>
    </section>
  );
}
