import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND } from '../brand';
import { APP_ROUTES } from '../router/routes';
import { trackDevisCTAClick } from '../analytics/ga4';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRoutes = APP_ROUTES.filter((r) => r.showInNav);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      id="main-sticky-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-natural-border py-3 mt-0'
          : 'bg-white/70 backdrop-blur-sm border-b border-natural-border/50 py-4 mt-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            id="header-logo-button"
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center shrink-0 focus:outline-none group py-0.5"
            aria-label={`Accueil — ${BRAND.name}`}
          >
            <img
              src={BRAND.logoSrc}
              alt={BRAND.name}
              className="h-12 sm:h-14 md:h-16 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] object-contain object-left group-hover:opacity-90 transition-opacity"
            />
          </Link>

          <nav
            id="desktop-nav"
            role="navigation"
            aria-label="Navigation principale"
            className="hidden lg:flex items-center gap-1"
          >
            {navRoutes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                id={`nav-item-${route.view}`}
                aria-label={route.label}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-natural-primary'
                      : 'text-slate-600 hover:text-natural-primary hover:bg-slate-100/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 bg-natural-primary/10 rounded-lg border-b-2 border-natural-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{route.navLabel}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              id="emergency-cta-header"
              to="/devis"
              onClick={() =>
                trackDevisCTAClick({ source_page: 'header', cta_label: 'Demande de devis' })
              }
              className="bg-gradient-to-r from-natural-primary to-blue-600 text-white hover:opacity-95 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide shadow-md shadow-blue-500/20 active:scale-95 transition-all text-center"
              aria-label="Obtenir un devis gratuit en ligne"
            >
              Demande de devis
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-705 hover:text-natural-primary hover:bg-slate-100 focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-natural-border overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5 shadow-inner">
              {navRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  id={`mobile-nav-item-${route.view}`}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-natural-primary/10 text-natural-primary border-l-4 border-natural-primary'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-natural-heading'
                    }`
                  }
                >
                  {route.navLabel}
                </NavLink>
              ))}
              <div className="pt-4 px-2 border-t border-natural-border">
                <Link
                  id="mobile-emergency-cta"
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="w-full bg-slate-100 text-natural-heading text-center py-3 rounded-xl font-semibold border border-natural-border hover:bg-slate-200 active:scale-95 transition-all mb-3 text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-natural-primary" />
                  Appel Dépannage Immédiat
                </Link>
                <Link
                  id="mobile-devis-cta"
                  to="/devis"
                  onClick={() => {
                    trackDevisCTAClick({
                      source_page: 'header',
                      cta_label: 'Demande de devis',
                    });
                    closeMobileMenu();
                  }}
                  className="w-full bg-gradient-to-r from-natural-primary to-blue-600 hover:opacity-95 text-white text-center py-3 rounded-xl font-semibold active:scale-95 transition-all text-sm shadow-md shadow-blue-500/20 block"
                >
                  Demande de devis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
