import { Cookie } from 'lucide-react';

interface CookieButtonProps {
  onClick: () => void;
  hasConsent: boolean;
}

export default function CookieButton({ onClick, hasConsent }: CookieButtonProps) {
  if (!hasConsent) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Modifier mes préférences cookies"
      title="Gérer mes cookies"
      className="fixed bottom-4 left-4 z-[9980] flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-600 hover:shadow-lg text-gray-600 hover:text-blue-600 text-xs font-medium px-3 py-2 rounded-full shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <Cookie className="w-3.5 h-3.5" aria-hidden="true" />
      <span>Cookies</span>
    </button>
  );
}
