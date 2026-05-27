import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './ga4';
import { SEO_BY_VIEW } from '../seo/seoConfig';
import { getRouteByPath } from '../router/routes';
import { getPostBySlug } from '../blog/blogData';
import type { ViewType } from '../types';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      let pageTitle = document.title;

      if (location.pathname.startsWith('/blog/') && location.pathname.length > '/blog/'.length) {
        const slug = location.pathname.replace(/^\/blog\//, '');
        const post = getPostBySlug(slug);
        pageTitle = post?.metaTitle ?? post?.title ?? pageTitle;
      } else {
        const route = getRouteByPath(location.pathname);
        const view = route?.view as ViewType | undefined;
        const seo = view ? SEO_BY_VIEW[view] : null;
        pageTitle = seo?.pageTitle ?? seo?.title ?? pageTitle;
      }

      trackPageView({
        page_path: location.pathname,
        page_title: pageTitle,
        page_location: window.location.href,
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}
