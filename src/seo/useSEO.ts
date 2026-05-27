import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { ViewType } from '../types';
import { SEO_BY_VIEW } from './seoConfig';
import { BRAND } from '../brand';

interface UseSEOOptions {
  view: ViewType;
  overrideTitle?: string;
  overrideDescription?: string;
  disabled?: boolean;
}

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export function useSEO({ view, overrideTitle, overrideDescription, disabled }: UseSEOOptions) {
  const location = useLocation();

  useEffect(() => {
    if (disabled) return;
    const seo = SEO_BY_VIEW[view];
    const title = overrideTitle ?? seo.title;
    const description = overrideDescription ?? seo.description;
    const ogImage = seo.ogImage ?? `${BRAND.siteUrl}${BRAND.ogImage}`;
    const canonicalUrl = `${BRAND.siteUrl}${location.pathname}`;

    document.title = title;

    upsertMetaByName('description', description);
    upsertMetaByName('keywords', seo.keywords);
    upsertMetaByProperty('og:title', seo.ogTitle ?? title);
    upsertMetaByProperty('og:description', seo.ogDescription ?? description);
    upsertMetaByProperty('og:image', ogImage);
    upsertMetaByProperty('og:url', canonicalUrl);
    upsertMetaByName('twitter:title', seo.ogTitle ?? title);
    upsertMetaByName('twitter:description', seo.ogDescription ?? description);
    upsertMetaByName('twitter:image', ogImage);

    upsertCanonical(canonicalUrl);
  }, [view, location.pathname, overrideTitle, overrideDescription, disabled]);
}
