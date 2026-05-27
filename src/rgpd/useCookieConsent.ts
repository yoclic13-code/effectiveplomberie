import { useState, useEffect, useCallback } from 'react';
import {
  getConsent,
  saveConsent,
  acceptAll,
  refuseAll,
  resetConsent,
  applyConsent,
  type CookieConsent,
} from './cookieManager';

interface UseCookieConsentReturn {
  consent: CookieConsent | null;
  showBanner: boolean;
  showPanel: boolean;
  openPanel: () => void;
  closePanel: () => void;
  handleAcceptAll: () => void;
  handleRefuseAll: () => void;
  handleSavePreferences: (categories: Record<string, boolean>) => void;
  handleReset: () => void;
}

export function useCookieConsent(): UseCookieConsentReturn {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      setConsent(existing);
      applyConsent(existing);
      setShowBanner(false);
    } else {
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handler = () => setShowPanel(true);
    window.addEventListener('open-cookie-panel', handler);
    return () => window.removeEventListener('open-cookie-panel', handler);
  }, []);

  const handleAcceptAll = useCallback(() => {
    const c = acceptAll();
    setConsent(c);
    setShowBanner(false);
    setShowPanel(false);
  }, []);

  const handleRefuseAll = useCallback(() => {
    const c = refuseAll();
    setConsent(c);
    setShowBanner(false);
    setShowPanel(false);
  }, []);

  const handleSavePreferences = useCallback((categories: Record<string, boolean>) => {
    const c = saveConsent({ ...categories, necessary: true });
    setConsent(c);
    setShowBanner(false);
    setShowPanel(false);
  }, []);

  const handleReset = useCallback(() => {
    resetConsent();
  }, []);

  return {
    consent,
    showBanner,
    showPanel,
    openPanel: () => setShowPanel(true),
    closePanel: () => setShowPanel(false),
    handleAcceptAll,
    handleRefuseAll,
    handleSavePreferences,
    handleReset,
  };
}
