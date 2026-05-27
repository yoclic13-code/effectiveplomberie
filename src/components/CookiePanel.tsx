import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Shield, BarChart2, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COOKIE_CATEGORIES } from '../rgpd/cookieCategories';

interface CookiePanelProps {
  show: boolean;
  onClose: () => void;
  onAcceptAll: () => void;
  onRefuseAll: () => void;
  onSave: (categories: Record<string, boolean>) => void;
}

const CATEGORY_ICONS = {
  necessary: Shield,
  analytics: BarChart2,
  marketing: Megaphone,
};

export default function CookiePanel({
  show,
  onClose,
  onAcceptAll,
  onRefuseAll,
  onSave,
}: CookiePanelProps) {
  const [expanded, setExpanded] = useState<string | null>('necessary');
  const [selected, setSelected] = useState<Record<string, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const toggle = (id: string) => {
    if (id === 'necessary') return;
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Préférences cookies — EFFECTIVE'PLOMBERIE"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-x-4 top-[50%] -translate-y-[50%] z-[9999] bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg mx-auto max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Préférences cookies</h2>
                <p className="text-sm text-gray-500 mt-0.5">Personnalisez votre consentement</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Fermer le panneau de préférences"
              >
                <X className="w-4 h-4 text-gray-600" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-6 py-4 space-y-3">
              {COOKIE_CATEGORIES.map((cat) => {
                const Icon =
                  CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS] ?? Shield;
                const isExpanded = expanded === cat.id;
                const isEnabled = selected[cat.id] ?? false;

                return (
                  <div
                    key={cat.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isEnabled ? 'bg-blue-100' : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${isEnabled ? 'text-blue-600' : 'text-gray-400'}`}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-sm text-gray-900">{cat.name}</span>
                        {cat.required && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                            Toujours actif
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isEnabled}
                          aria-label={`${cat.required ? 'Cookie requis' : isEnabled ? 'Désactiver' : 'Activer'} : ${cat.name}`}
                          disabled={cat.required}
                          onClick={() => toggle(cat.id)}
                          className={`relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                            cat.required ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                          } ${isEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                              isEnabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : cat.id)}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Masquer' : 'Afficher'} les détails : ${cat.name}`}
                          className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-0 border-t border-gray-100">
                            <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">
                              {cat.description}
                            </p>

                            {cat.cookies.length > 0 ? (
                              <div className="space-y-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                  Cookies utilisés
                                </p>
                                {cat.cookies.map((cookie, i) => (
                                  <div
                                    key={i}
                                    className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1"
                                  >
                                    <div className="flex gap-2">
                                      <span className="font-semibold text-gray-900 min-w-[60px]">
                                        Nom :
                                      </span>
                                      <code className="text-blue-700 bg-blue-50 px-1 rounded">
                                        {cookie.name}
                                      </code>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="font-semibold text-gray-900 min-w-[60px]">
                                        Émetteur :
                                      </span>
                                      <span>{cookie.provider}</span>
                                    </div>
                                    <div className="flex gap-2">
                                      <span className="font-semibold text-gray-900 min-w-[60px]">
                                        Durée :
                                      </span>
                                      <span>{cookie.duration}</span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-900">
                                        Finalité :{' '}
                                      </span>
                                      {cookie.purpose}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 italic">
                                Aucun cookie de cette catégorie n&apos;est utilisé actuellement.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-2 pb-1 flex gap-4">
                <Link
                  to="/politique-de-confidentialite"
                  className="text-xs text-blue-600 underline hover:text-blue-800 underline-offset-2 transition-colors"
                  onClick={onClose}
                >
                  Politique de confidentialité
                </Link>
                <Link
                  to="/mentions-legales"
                  className="text-xs text-blue-600 underline hover:text-blue-800 underline-offset-2 transition-colors"
                  onClick={onClose}
                >
                  Mentions légales
                </Link>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0 flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={() => onSave(selected)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Enregistrer mes préférences de cookies"
              >
                Enregistrer mes choix
              </button>
              <button
                type="button"
                onClick={onRefuseAll}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm px-4 py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                aria-label="Refuser tous les cookies non essentiels"
              >
                Tout refuser
              </button>
              <button
                type="button"
                onClick={onAcceptAll}
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm px-4 py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Accepter tous les cookies"
              >
                Tout accepter
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
