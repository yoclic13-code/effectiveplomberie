export type ConsentStatus = 'accepted' | 'refused' | 'partial' | null;

export interface CookieConsent {
  status: ConsentStatus;
  categories: Record<string, boolean>;
  timestamp: number;
  expiresAt: number;
  version: string;
}

const CONSENT_KEY = 'cookie_consent';
const CONSENT_VERSION = '1.0';
const CONSENT_DURATION_MS = 13 * 30 * 24 * 60 * 60 * 1000;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const consent: CookieConsent = JSON.parse(raw);

    if (Date.now() > consent.expiresAt) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    if (consent.version !== CONSENT_VERSION) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return consent;
  } catch {
    return null;
  }
}

export function saveConsent(categories: Record<string, boolean>): CookieConsent {
  const withNecessary = { ...categories, necessary: true };
  const values = Object.entries(withNecessary).filter(([k]) => k !== 'necessary').map(([, v]) => v);
  const allAccepted = Object.values(withNecessary).every(Boolean);
  const allRefused = values.every((v) => !v);

  const consent: CookieConsent = {
    status: allAccepted ? 'accepted' : allRefused ? 'refused' : 'partial',
    categories: withNecessary,
    timestamp: Date.now(),
    expiresAt: Date.now() + CONSENT_DURATION_MS,
    version: CONSENT_VERSION,
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  applyConsent(consent);
  return consent;
}

export function acceptAll(): CookieConsent {
  return saveConsent({ necessary: true, analytics: true, marketing: true });
}

export function refuseAll(): CookieConsent {
  return saveConsent({ necessary: true, analytics: false, marketing: false });
}

export function resetConsent(): void {
  localStorage.removeItem(CONSENT_KEY);
  deleteGACookies();
  const gaScript = document.getElementById('ga4-script');
  if (gaScript) gaScript.remove();
  window.location.reload();
}

export function applyConsent(consent: CookieConsent): void {
  if (consent.categories.analytics) {
    loadGA4();
  } else {
    deleteGACookies();
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  }
}

function loadGA4(): void {
  const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!GA_ID || document.getElementById('ga4-script')) return;

  const gtagScript = document.createElement('script');
  gtagScript.id = 'ga4-script';
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(gtagScript);

  gtagScript.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
    });
    gtag('config', GA_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  };
}

function deleteGACookies(): void {
  const domain = window.location.hostname;
  const names = ['_ga', '_gid', '_gat'];

  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  names.forEach((name) => {
    document.cookie = `${name}=; ${expire}; path=/`;
    document.cookie = `${name}=; ${expire}; path=/; domain=${domain}`;
    document.cookie = `${name}=; ${expire}; path=/; domain=.${domain}`;
  });

  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('_ga_')) {
      document.cookie = `${name}=; ${expire}; path=/`;
      document.cookie = `${name}=; ${expire}; path=/; domain=${domain}`;
      document.cookie = `${name}=; ${expire}; path=/; domain=.${domain}`;
    }
  });
}

export function isCategoryConsented(categoryId: string): boolean {
  const consent = getConsent();
  if (!consent) return categoryId === 'necessary';
  return consent.categories[categoryId] === true;
}
