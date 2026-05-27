import React, { useState, useRef, useCallback } from 'react';
import { Layers, CheckCircle2, UploadCloud, X, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjetSubmission } from '../types';
import { trackProjetSubmit, trackFormStart } from '../analytics/ga4';

export default function PrestationForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: 'renovation_complete' as 'renovation_complete' | 'installation_neuve' | 'chaufferie' | 'autre',
    description: '',
    desiredTimeline: '1-mois'
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; progress: number }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formStarted = useRef(false);

  const handleFormStart = useCallback(() => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackFormStart({ form_name: 'projet' });
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFiles = (filesList: FileList) => {
    const newFiles = Array.from(filesList).map((f) => {
      const sizeMb = (f.size / (1024 * 1024)).toFixed(2);
      return {
        name: f.name,
        size: `${sizeMb} MB`,
        progress: 0
      };
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate progress uploading
    newFiles.forEach((_, idx) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setUploadedFiles((prev) =>
          prev.map((item, pidx) => {
            if (pidx === prev.length - newFiles.length + idx) {
              return { ...item, progress: Math.min(currentProgress, 100) };
            }
            return item;
          })
        );
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 150);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const triggerManualSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.email || !formData.phone || !formData.description) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('projetSubmissions') || '[]');
      const newSubmission: ProjetSubmission = {
        id: 'p_' + Math.random().toString(36).substring(2, 9),
        companyName: formData.companyName || undefined,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        description: formData.description,
        desiredTimeline: formData.desiredTimeline,
        hasPlacingPlans: uploadedFiles.length > 0,
        date: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      submissions.unshift(newSubmission);
      localStorage.setItem('projetSubmissions', JSON.stringify(submissions));

      trackProjetSubmit({
        project_type: formData.projectType,
        timeline: formData.desiredTimeline,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      formStarted.current = false;
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        projectType: 'renovation_complete',
        description: '',
        desiredTimeline: '1-mois'
      });
      setUploadedFiles([]);
    }, 1500);
  };

  return (
    <div id="prestation-form-container" className="bg-white border border-natural-border rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 blur-2.5xl rounded-full" />

      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 flex flex-col items-center justify-center relative z-10"
        >
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-natural-heading mb-2">Cahier des charges envoyé !</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Votre demande d'étude de projet & prestation technique a bien été transmise à notre bureau d'études hydrauliques. Un ingénieur-projeteur dédié va étudier vos plans et vous contacter sous 24 à 48 heures.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 text-xs font-semibold uppercase tracking-wider text-natural-primary hover:underline transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Déposer une autre étude technique</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nom de la société (Optionnel) */}
            <div>
              <label htmlFor="projet-company" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
                Entreprise / Syndic <span className="text-slate-500 font-sans font-normal">(Optionnel)</span>
              </label>
              <input
                id="projet-company"
                type="text"
                placeholder="Ex: Copropriété / Agence Immo"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Nom du Contact Référent */}
            <div>
              <label htmlFor="projet-contact" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
                Nom du référent projet <span className="text-rose-500 font-sans">*</span>
              </label>
              <input
                id="projet-contact"
                type="text"
                required
                placeholder="Ex: Mme Claire Lemoine"
                value={formData.contactName}
                onFocus={handleFormStart}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email de communication */}
            <div>
              <label htmlFor="projet-email" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
                Adresse Email Pro <span className="text-rose-500 font-sans">*</span>
              </label>
              <input
                id="projet-email"
                type="email"
                required
                placeholder="Ex: c.lemoine@domaine.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Téléphone mobile/direct */}
            <div>
              <label htmlFor="projet-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
                Téléphone Direct <span className="text-rose-500 font-sans">*</span>
              </label>
              <input
                id="projet-phone"
                type="tel"
                required
                placeholder="Ex: 01 42 78 90 12"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nature du projet majeur */}
            <div>
              <label htmlFor="projet-type" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
                Nature des Prestations
              </label>
              <select
                id="projet-type"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading cursor-pointer outline-none transition-all"
              >
                <option value="renovation_complete" className="text-slate-800 bg-white">🛁 Rénovation Complète Salle de Bain de Prestige</option>
                <option value="installation_neuve" className="text-slate-800 bg-white">🏢 Installation Réseau Hydraulique Neuf</option>
                <option value="chaufferie" className="text-slate-800 bg-white font-semibold">🔥 Conception de Chaufferie Collective ou PAC</option>
                <option value="autre" className="text-slate-800 bg-white">⚙️ Autre étude de réseau technique en fluides</option>
              </select>
            </div>

            {/* Calendrier de réalisation */}
            <div>
              <label htmlFor="projet-timeline" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
                Échéance de réalisation souhaitée
              </label>
              <select
                id="projet-timeline"
                value={formData.desiredTimeline}
                onChange={(e) => setFormData({ ...formData, desiredTimeline: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading cursor-pointer outline-none transition-all"
              >
                <option value="1-mois" className="text-slate-800 bg-white font-semibold">Sous 1 mois (Urgences Projets)</option>
                <option value="3-mois" className="text-slate-800 bg-white font-semibold">Sous 3 mois (Planification)</option>
                <option value="6-mois" className="text-slate-800 bg-white">Sous 6 mois (Gros œil / Neuf)</option>
              </select>
            </div>
          </div>

          {/* Description complète du projet */}
          <div>
            <label htmlFor="projet-desc" className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
              Cahier des charges succinct / Descriptif des travaux <span className="text-rose-500 font-sans">*</span>
            </label>
            <textarea
              id="projet-desc"
              required
              rows={4}
              placeholder="Ex : Réaménagement d'une ancienne salle de bain en espace PMR avec adaptation de l'alimentation en cuivre, déplacement de l'évacuation principale en PVC acoustique, et pose de WC suspendus encastrés Geberit..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-450 outline-none transition-all resize-none font-sans"
            />
          </div>

          {/* Usability Pattern: Drag-and-Drop & Manual File Upload Area */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-550 mb-2 font-mono">
              Déposer vos plans, schémas ou photos techniques
            </span>
            
            <div
              id="file-dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerManualSelect}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-natural-primary bg-blue-50/50' 
                  : 'border-natural-border bg-slate-50 hover:border-slate-350'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.dwg"
              />
              <div className="flex flex-col items-center justify-center gap-2 text-slate-600">
                <UploadCloud className="w-10 h-10 text-natural-primary animate-bounce shrink-0" />
                <span className="text-sm">
                  <span className="text-natural-primary font-bold underline">Glissez vos fichiers</span> ici ou <span className="text-natural-primary font-bold underline">parcourez vos répertoires</span>.
                </span>
                <span className="text-xs text-slate-550">
                  Formats supportés : PDF, PNG, JPG, DWG (Max. 15 Mo par fichier)
                </span>
              </div>
            </div>

            {/* List of uploaded items */}
            <AnimatePresence>
              {uploadedFiles.length > 0 && (
                <div id="blueprint-files-list" className="mt-3 space-y-2">
                  {uploadedFiles.map((file, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-natural-border"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-4">
                        <FileText className="w-4.5 h-4.5 text-natural-primary shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-xs text-natural-heading font-semibold truncate text-left">
                            {file.name}
                          </span>
                          <span className="block text-[10px] text-slate-550 font-mono text-left">
                            {file.size}
                          </span>
                        </div>
                      </div>

                      {/* Loading/Action item */}
                      <div className="flex items-center gap-3 shrink-0">
                        {file.progress < 100 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-slate-200 h-1 rounded-full overflow-hidden">
                              <div className="bg-natural-primary h-full" style={{ width: `${file.progress}%` }} />
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">{file.progress}%</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Prêt</span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="projet-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold tracking-wide py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Traitement des spécifications complexes...</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>Déposer le dossier d'étude technique</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}
    </div>
  );
}
