import { useEffect } from 'react';
import type { BlogPost } from './blogData';
import { BRAND } from '../brand';

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

export function useBlogSEO(post: BlogPost | undefined) {
  useEffect(() => {
    if (!post) return;
    const canonicalUrl = `${BRAND.siteUrl}/blog/${post.slug}`;
    const ogImage = post.coverSrc.startsWith('http')
      ? post.coverSrc
      : `${BRAND.siteUrl}${post.coverSrc}`;

    document.title = post.metaTitle;

    upsertMetaByName('description', post.metaDescription);
    upsertMetaByName('keywords', post.keywords.join(', '));
    upsertMetaByProperty('og:title', post.metaTitle);
    upsertMetaByProperty('og:description', post.metaDescription);
    upsertMetaByProperty('og:image', ogImage);
    upsertMetaByProperty('og:url', canonicalUrl);
    upsertMetaByProperty('og:type', 'article');
    upsertMetaByName('twitter:title', post.metaTitle);
    upsertMetaByName('twitter:description', post.metaDescription);
    upsertMetaByName('twitter:image', ogImage);
    upsertMetaByName('twitter:card', 'summary_large_image');

    upsertCanonical(canonicalUrl);
  }, [post]);
}
