import { Layers, FileText, CheckCircle2 } from 'lucide-react';
import PrestationForm from './PrestationForm';

export default function Projet() {
  return (
    <section id="projet-view-page" className="w-full bg-natural-bg py-24 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content mapping */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2563eb] font-mono">
            Grands Chantiers & Spécifications
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-natural-heading tracking-tight mt-1">
            Demande de Projet & Prestation
          </h1>
          <p className="text-slate-650 text-sm sm:text-base mt-2">
            Rénovation complète d'appartement, construction neuve ou chaufferie collective syndicale. Soumettez votre cahier des charges technique et vos plans d'exécution fluidiques.
          </p>
        </div>

        {/* Form elements split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left information column - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Project info card */}
            <div className="bg-white border border-natural-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-bold text-natural-heading flex items-center gap-2">
                <Layers className="w-5 h-5 text-natural-primary" />
                <span>Études Techniques Fluides</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Les chantiers d'envergure nécessitent une étude approfondie de votre réseau et de la charge hydraulique :
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Dimensionnement des collecteurs :</span>
                    <span className="text-slate-500 block">Calcul exact du débit, de la pression dynamique, et choix des sections en cuivre ou multicouche.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Conformité acoustique & thermique :</span>
                    <span className="text-slate-500 block">Isolation conforme à la norme NRA et respect rigoureux de la réglementation RE2020.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-natural-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-natural-heading block">Modélisation de salles d'eau :</span>
                    <span className="text-slate-505 block">Positionnement géométrique au millimètre près des caniveaux d'évacuation de douche italienne et évents primaires.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support box */}
            <div className="bg-white border border-natural-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-[#2563eb] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-natural-heading text-xs font-bold uppercase tracking-wider font-mono">Dépôt d'autres fichiers possible</h4>
                  <p className="text-slate-550 text-xs leading-relaxed mt-1">
                    Si votre fichier de plans CAO d'architecte dépasse les 15 Mo, n'hésitez pas à soumettre un premier cahier de charges succinct dans le formulaire, notre ingénieur-projeteur dédié vous fera parvenir un lien de dépôt cloud sécurisé à réception.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right form block - 7 cols */}
          <div className="lg:col-span-7">
            <PrestationForm />
          </div>

        </div>

      </div>
    </section>
  );
}
