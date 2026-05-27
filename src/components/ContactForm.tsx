import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND } from '../brand';
import { ContactSubmission } from '../types';
import { trackContactSubmit, trackFormStart, trackPhoneCall } from '../analytics/ga4';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'depannage',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStarted = useRef(false);

  const handleFormStart = useCallback(() => {
    if (formStarted.current) return;
    formStarted.current = true;
    trackFormStart({ form_name: 'contact' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;

    setIsSubmitting(true);

    // Simulate short network latency
    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      const newSubmission: ContactSubmission = {
        id: 'c_' + Math.random().toString(36).substring(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        date: new Date().toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      submissions.unshift(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      trackContactSubmit({ subject: formData.subject });

      setIsSubmitting(false);
      setIsSubmitted(true);
      formStarted.current = false;
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'depannage',
        message: ''
      });
    }, 1200);
  };

  return (
    <div id="contact-form-container" className="bg-white border border-natural-border rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-2xl rounded-full pointer-events-none" />

      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 flex flex-col items-center justify-center relative z-10"
        >
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-natural-heading mb-2 animate-fade-in">Message envoyé avec succès !</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Merci pour votre prise de contact. Un de nos compagnons plombiers va étudier votre demande et vous recontacter par téléphone sous moins de 2 heures.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-8 text-xs font-semibold uppercase tracking-wider text-natural-primary hover:underline transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Envoyer un autre message</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Nom */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-555 mb-2 font-mono">
                Nom complet <span className="text-rose-550 font-sans">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Ex: Alexandre Dupont"
                value={formData.name}
                onFocus={handleFormStart}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-555 mb-2 font-mono">
                Téléphone <span className="text-rose-550 font-sans">*</span>
              </label>
              <input
                id="contact-phone"
                type="text"
                required
                placeholder="Ex: 06 12 34 56 78"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-555 mb-2 font-mono">
              Adresse Email <span className="text-rose-550 font-sans">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="Ex: contact@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all"
            />
          </div>

          {/* Sujet de la prise de contact */}
          <div>
            <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-slate-555 mb-2 font-mono">
              Objet de votre demande
            </label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading cursor-pointer outline-none transition-all"
            >
              <option value="depannage" className="text-slate-800 bg-white">🔧 Dépannage urgent / Dépannage hydraulique</option>
              <option value="renovation" className="text-slate-800 bg-white font-semibold">🛁 Projet de rénovation de réseau</option>
              <option value="partenaire" className="text-slate-800 bg-white">🤝 Demande de partenariat / Architecte</option>
              <option value="recrutement" className="text-slate-800 bg-white">💼 Recrutement & Compagnonnage</option>
              <option value="autre" className="text-slate-800 bg-white">💡 Autre demande d'information</option>
            </select>
          </div>

          {/* Message principal */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-555 mb-2 font-mono">
              votre message <span className="text-rose-550 font-sans">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              placeholder="Décrivez votre besoin en quelques lignes... (Ex: Robinet cassé dans la cuisine, besoin d'un dépannage rapide avant ce soir)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 border border-natural-border focus:border-natural-primary focus:ring-2 focus:ring-natural-primary/10 rounded-xl px-4 py-3 text-sm text-natural-heading placeholder-slate-400 outline-none transition-all resize-none font-sans"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="contact-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-650 hover:opacity-95 text-white font-extrabold tracking-wide py-3.5 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </>
              )}
            </button>
          </div>

          {/* Quick legal notice inside form */}
          <p className="text-[10px] text-center text-slate-500 leading-relaxed font-mono mt-3">
            * En envoyant ce formulaire, vous acceptez que vos données soient traitées par{' '}
            {BRAND.name} pour répondre à votre demande.{' '}
            <Link
              to="/politique-de-confidentialite"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </form>
      )}

      {/* Emergency Phone CTA box inside the Contact block */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left font-sans">
            <span className="block text-[10px] uppercase font-bold text-rose-600 font-mono">Besoin d'un dépannage immédiat ?</span>
            <span className="block text-sm font-bold text-natural-heading">Ligne directe plombier d'astreinte :</span>
          </div>
        </div>
        <a
          href={`tel:${BRAND.phoneTel}`}
          onClick={() => trackPhoneCall({ location: 'contact_page' })}
          className="bg-white border border-rose-500 hover:bg-rose-50 text-rose-600 font-bold px-4 py-2 rounded-xl text-xs transition-all shrink-0 font-mono shadow-sm"
        >
          {BRAND.phone}
        </a>
      </div>
    </div>
  );
}
