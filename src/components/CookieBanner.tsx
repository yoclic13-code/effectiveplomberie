import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CookieBannerProps {
  show: boolean;
  onAcceptAll: () => void;
  onRefuseAll: () => void;
  onOpenPanel: () => void;
}

export default function CookieBanner({
  show,
  onAcceptAll,
  onRefuseAll,
  onOpenPanel,
}: CookieBannerProps) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-[9990] backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gestion des cookies — EFFECTIVE'PLOMBERIE"
            aria-describedby="cookie-banner-description"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-4 border-blue-600 shadow-[0_-8px_40px_rgba(0,0,0,0.18)] px-4 py-6 sm:px-8 sm:py-7 md:bottom-6 md:left-6 md:right-auto md:rounded-2xl md:max-w-[520px] md:border-4 md:border-blue-600"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mt-0.5">
                <Cookie className="w-5 h-5 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                  Ce site utilise des cookies
                </h2>
                <p className="text-xs text-blue-600 font-medium mt-0.5">
                  EFFECTIVE&apos;PLOMBERIE respecte votre vie privée
                </p>
              </div>
            </div>

            <p
              id="cookie-banner-description"
              className="text-sm text-gray-600 leading-relaxed mb-5"
            >
              Nous utilisons des cookies pour analyser notre audience et améliorer votre
              expérience. Vous pouvez accepter, refuser ou personnaliser vos choix.{' '}
              <Link
                to="/politique-de-confidentialite"
                className="text-blue-600 underline underline-offset-2 hover:text-blue-800 font-medium transition-colors"
                aria-label="Lire notre politique de confidentialité"
              >
                En savoir plus
              </Link>
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={onAcceptAll}
                className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Accepter tous les cookies"
              >
                ✓ Tout accepter
              </button>

              <button
                type="button"
                onClick={onRefuseAll}
                className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold text-sm px-4 py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                aria-label="Refuser tous les cookies non essentiels"
              >
                ✕ Tout refuser
              </button>

              <button
                type="button"
                onClick={onOpenPanel}
                className="flex items-center justify-center gap-1.5 border border-gray-300 hover:border-blue-600 text-gray-600 hover:text-blue-600 font-medium text-sm px-3 py-3 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:flex-none sm:px-4"
                aria-label="Personnaliser mes préférences de cookies"
                aria-haspopup="dialog"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
                <span className="sm:hidden md:inline">Personnaliser</span>
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-400 leading-snug">
              Votre choix est valable 13 mois. Vous pouvez le modifier à tout moment via le
              bouton <em>Cookies</em> en bas de page.{' '}
              <Link
                to="/mentions-legales"
                className="underline hover:text-gray-600 transition-colors"
              >
                Mentions légales
              </Link>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
