import React, { useState, useRef, useCallback } from 'react';
import { ClipboardList, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { DevisSubmission } from '../types';
import {
  trackDevisSubmit,
  trackFormStart,
  mapDevisUrgency,
  detectZoneFromAddress,
} from '../analytics/ga4';

export default function DevisForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    address: '',
    urgency: 'moyen' as 'faible' | 'moyen' | 'urgent' | 'critique',
    serviceType: 'depannage',
    details: '',
    approximateDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formStarted = useRef(false);

  const handleFormStart = useCallback(() => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackFormStart({ form_name: 'devis' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email || !formData.phone || !formData.address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('devisSubmissions') || '[]');
      const newSubmission: DevisSubmission = {
        id: 'd_' + Math.random().toString(36).substring(2, 9),
        clientName: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        urgency: formData.urgency,
        serviceType: formData.serviceType,
        details: formData.details,
        approximateDate: formData.approximateDate || 'Dès que possible',
        budget: '',
        date: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      submissions.unshift(newSubmission);
      localStorage.setItem('devisSubmissions', JSON.stringify(submissions));

      trackDevisSubmit({
        service_type: formData.serviceType,
        urgency: mapDevisUrgency(formData.urgency),
        zone: detectZoneFromAddress(formData.address),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      formStarted.current = false;
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        address: '',
        urgency: 'moyen',
        serviceType: 'depannage',
        details: '',
        approximateDate: '',
      });
    }, 1200);
  };

  const serviceOptions = [
    { value: 'depannage', label: 'Dépannage / Urgence', desc: 'Fuite, débouchage, panne…' },
    { value: 'recherche-fuite', label: 'Recherche de fuite', desc: 'Détection non destructive' },
    { value: 'renovation', label: 'Rénovation', desc: 'Plomberie, réseaux, rénovation globale' },
    { value: 'climatisation', label: 'Climatisation', desc: 'Installation, entretien, dépannage' },
    { value: 'salle-de-bain', label: 'Salle de bain', desc: 'Création, rénovation, douche italienne' },
    { value: 'cuisine', label: 'Cuisine', desc: 'Évier, lave-vaisselle, robinetterie…' },
  ];

  const urgencyOptions = [
    { value: 'faible', label: 'Faible', color: 'border-natural-border text-slate-600 hover:border-natural-primary/30 font-sans' },
    { value: 'moyen', label: 'Moyen', color: 'border-natural-border text-slate-700 hover:border-natural-primary/30 font-sans' },
    { value: 'urgent', label: 'Urgent', color: 'border-orange-200 text-orange-600 hover:bg-orange-50 font-sans' },
    { value: 'critique', label: 'Critique 🚨', color: 'border-rose-200 text-rose-600 hover:bg-rose-50 font-sans' },
  ];

  return (
    <div id="devis-form-container" className="bg-white border border-natural-border rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-36 h-36 bg-blue-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3.5xl rounded-full" />

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 flex flex-col items-center justify-center relative z-10 font-sans"
        >
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-natural-heading mb-2">Demande de devis envoyée</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Nous avons bien reçu votre demande. Un conseiller EFFECTIVE&apos;PLOMBERIE vous recontacte
            rapidement pour établir un devis personnalisé, gratuit et sans engagement.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-8 text-xs font-semibold uppercase tracking-wider text-natural-primary hover:underline transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Nouvelle demande de devis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">
              1. Type de prestation
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviceOptions.map((opt) => {
                const isSelected = formData.serviceType === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`devis-service-${opt.value}`}
                    type="button"
                    onClick={() => setFormData({ ...formData, serviceType: opt.value })}
                    className={`p-4 rounded-xl text-left border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-natural-primary text-natural-heading shadow-md'
                        : 'bg-slate-50 border-natural-border text-slate-705 hover:border-slate-350'
                    }`}
                  >
                    <span className="block text-sm font-bold font-sans">{opt.label}</span>
                    <span className="block text-[11px] text-slate-500 mt-1 lines-clamp-2 leading-tight font-sans">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5 font-mono">
              2. Niveau d&apos;urgence
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {urgencyOptions.map((opt) => {
                const isSelected = formData.urgency === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`devis-urgency-${opt.value}`}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: opt.value as typeof formData.urgency })}
                    className={`px-4 py-3 rounded-xl border cursor-pointer text-center text-xs font-bold uppercase tracking-wide transition-all ${
                      isSelected
                        ? 'bg-blue-50 border-natural-primary text-natural-heading shadow-md font-extrabold font-sans'
                        : `bg-slate-50 ${opt.color}`
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 font-sans">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              3. Vos coordonnées et lieu d&apos;intervention
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="devis-client-name"
                type="text"
                required
                placeholder="Nom complet"
                value={formData.clientName}
                onFocus={handleFormStart}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
              <input
                id="devis-phone"
                type="tel"
                required
                placeholder="Téléphone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                id="devis-email"
                type="email"
                required
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
              <input
                id="devis-address"
                type="text"
                required
                placeholder="Adresse d'intervention (ville, code postal)"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <input
              id="devis-date"
              type="text"
              placeholder="Date souhaitée (ex. dès que possible, samedi matin…)"
              value={formData.approximateDate}
              onChange={(e) => setFormData({ ...formData, approximateDate: e.target.value })}
              className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
            />

            <textarea
              id="devis-details"
              rows={4}
              placeholder="Décrivez votre besoin (symptômes, pièce concernée, travaux envisagés…)"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all resize-none font-sans"
            />
          </div>

          <div>
            <button
              id="devis-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-extrabold tracking-wide py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Envoi en cours…</span>
                </>
              ) : (
                <>
                  <ClipboardList className="w-4 h-4" />
                  <span>Envoyer ma demande de devis gratuit</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-3">
              Devis gratuit et sans engagement — réponse sous 24 h ouvrées.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
