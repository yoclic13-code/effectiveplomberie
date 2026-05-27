import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import DevisForm from './DevisForm';

export default function Devis() {
  return (
    <section id="devis-view-page" className="w-full bg-natural-bg py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] font-mono">
            Gratuit & sans engagement
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-natural-heading tracking-tight mt-1">
            Demande de devis
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Décrivez votre besoin en quelques minutes. Nous vous recontactons pour établir un devis
            personnalisé — sans tarif affiché en ligne, chaque intervention est chiffrée sur mesure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-natural-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-lg font-bold text-natural-heading">Comment ça marche ?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-natural-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-natural-heading">
                      Décrivez votre besoin
                    </span>
                    <span className="block text-xs text-slate-500">
                      Type de prestation, urgence et adresse d&apos;intervention.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-natural-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-natural-heading">
                      Nous étudions votre demande
                    </span>
                    <span className="block text-xs text-slate-500">
                      Un conseiller analyse votre situation et prépare un devis adapté.
                    </span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-natural-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-natural-heading">
                      Vous recevez votre devis
                    </span>
                    <span className="block text-xs text-slate-500">
                      Proposition détaillée par e-mail ou téléphone, sans surprise.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-natural-border rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex gap-3 items-start">
                <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-natural-heading text-xs font-bold uppercase tracking-wider font-mono">
                    Devis gratuit
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">
                    Aucun frais pour la demande ni pour l&apos;établissement du devis sur simple
                    dépannage ou travaux courants.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Clock className="w-8 h-8 text-natural-primary shrink-0" />
                <div>
                  <h4 className="text-natural-heading text-xs font-bold uppercase tracking-wider font-mono">
                    Réponse rapide
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">
                    Pour les urgences, nous traitons votre demande en priorité et vous recontactons
                    dans les plus brefs délais.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-natural-heading text-xs font-bold uppercase tracking-wider font-mono">
                    Artisan certifié RGE
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed mt-1">
                    Qualibat RGE, PG Gaz — travaux éligibles aux aides selon votre situation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <DevisForm />
          </div>
        </div>
      </div>
    </section>
  );
}
