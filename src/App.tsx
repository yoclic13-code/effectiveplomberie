import { useEffect, type ReactNode } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

import Header from './components/Header';
import Footer from './components/Footer';
import AdminSection from './components/AdminSection';
import SEOHead from './components/SEOHead';
import ZoneSEO from './components/ZoneSEO';

import Home from './components/Home';
import Services from './components/Services';
import Realisations from './components/Realisations';
import Devis from './components/Devis';
import Contact from './components/Contact';
import PolitiqueConfidentialite from './components/pages/PolitiqueConfidentialite';
import MentionsLegales from './components/pages/MentionsLegales';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import APropos from './components/pages/APropos';
import FAQ from './components/pages/FAQ';
import GeoPage from './components/GeoPage';
import { getCityBySlug } from './geo/geoData';
import CookieBanner from './components/CookieBanner';
import CookiePanel from './components/CookiePanel';
import CookieButton from './components/CookieButton';
import { useCookieConsent } from './rgpd/useCookieConsent';
import { usePageTracking } from './analytics/usePageTracking';
import { useWebVitals } from './analytics/useWebVitals';

import { injectLocalBusinessSchema } from './seo/LocalBusinessSchema';
import { getRouteByPath, LEGACY_HASH_REDIRECTS } from './router/routes';
import type { ViewType } from './types';

const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={PAGE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.22, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function LegacyHashRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    const target = LEGACY_HASH_REDIRECTS[hash];
    if (target) {
      navigate(target, { replace: true });
    }
  }, [location.hash, navigate]);

  return null;
}

export default function App() {
  const location = useLocation();
  const {
    consent,
    showBanner,
    showPanel,
    openPanel,
    closePanel,
    handleAcceptAll,
    handleRefuseAll,
    handleSavePreferences,
  } = useCookieConsent();

  usePageTracking();
  useWebVitals();

  useEffect(() => {
    injectLocalBusinessSchema();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const pathSlug = location.pathname.replace(/^\//, '');
  const geoCity = getCityBySlug(pathSlug);

  const currentRoute = getRouteByPath(location.pathname);
  const currentView: ViewType =
    geoCity
      ? 'geo'
      : location.pathname === '/blog'
        ? 'blog'
        : location.pathname.startsWith('/blog/')
          ? 'blogPost'
          : (currentRoute?.view ?? 'home');

  return (
    <div
      id="plumbing-webapp-root"
      className="min-h-screen bg-natural-bg text-natural-text flex flex-col justify-between selection:bg-natural-primary/15 selection:text-natural-primary font-sans"
    >
      <LegacyHashRedirect />
      <SEOHead currentView={currentView} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <Header />

      <main id="main-content" className="flex-grow pt-[76px]" aria-label="Contenu principal">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location}>
            <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path="/services" element={<AnimatedPage><Services /></AnimatedPage>} />
            <Route path="/realisations" element={<AnimatedPage><Realisations /></AnimatedPage>} />
            <Route path="/devis" element={<AnimatedPage><Devis /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route
              path="/politique-de-confidentialite"
              element={
                <AnimatedPage>
                  <PolitiqueConfidentialite />
                </AnimatedPage>
              }
            />
            <Route
              path="/mentions-legales"
              element={
                <AnimatedPage>
                  <MentionsLegales />
                </AnimatedPage>
              }
            />
            <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
            <Route
              path="/blog/installation-chaudiere-gaz-marseille"
              element={<Navigate to="/blog" replace />}
            />
            <Route
              path="/blog/plancher-chauffant-hydraulique-aix-marseille"
              element={<Navigate to="/blog" replace />}
            />
            <Route path="/blog/:slug" element={<AnimatedPage><BlogPost /></AnimatedPage>} />
            <Route path="/a-propos" element={<AnimatedPage><APropos /></AnimatedPage>} />
            <Route path="/faq" element={<AnimatedPage><FAQ /></AnimatedPage>} />
            <Route path="/projet" element={<Navigate to="/devis" replace />} />
            <Route path="/:slug" element={<AnimatedPage><GeoPage /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
        {!geoCity && <ZoneSEO />}
      </main>

      <Footer />
      <AdminSection />

      <CookieBanner
        show={showBanner}
        onAcceptAll={handleAcceptAll}
        onRefuseAll={handleRefuseAll}
        onOpenPanel={openPanel}
      />
      <CookiePanel
        show={showPanel}
        onClose={closePanel}
        onAcceptAll={handleAcceptAll}
        onRefuseAll={handleRefuseAll}
        onSave={handleSavePreferences}
      />
      <CookieButton onClick={openPanel} hasConsent={consent !== null} />
    </div>
  );
}
