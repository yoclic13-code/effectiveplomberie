import { useLocation } from 'react-router-dom';
import { useSEO } from '../seo/useSEO';
import type { ViewType } from '../types';

interface SEOHeadProps {
  currentView: ViewType;
}

export default function SEOHead({ currentView }: SEOHeadProps) {
  const location = useLocation();
  const isBlogArticle =
    location.pathname.startsWith('/blog/') && location.pathname.length > '/blog/'.length;

  useSEO({ view: currentView, disabled: isBlogArticle });
  return null;
}
