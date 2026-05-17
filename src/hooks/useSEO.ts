import { useEffect } from 'react';

export const SITE_URL = 'https://aireasolutions.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/airea-og.jpg`;
export const SITE_NAME = 'AIREA Solutions';

export type SEOBreadcrumb = { name: string; url: string };

export type SEOConfig = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'profile' | 'product.item';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  breadcrumbs?: SEOBreadcrumb[];
  jsonLd?: object | object[];
};

const MANAGED_ATTR = 'data-seo-managed';

function setOrCreateMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function clearManagedJsonLd() {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTR}]`)
    .forEach((n) => n.parentNode?.removeChild(n));
}

function appendJsonLd(obj: object) {
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.setAttribute(MANAGED_ATTR, 'true');
  s.text = JSON.stringify(obj);
  document.head.appendChild(s);
}

export function useSEO(cfg: SEOConfig) {
  useEffect(() => {
    const url = `${SITE_URL}${cfg.path}`;
    const image = cfg.image || DEFAULT_OG_IMAGE;
    const type = cfg.type || 'website';

    document.title = cfg.title;

    setOrCreateMeta('meta[name="description"]', { name: 'description', content: cfg.description });
    if (cfg.keywords?.length) {
      setOrCreateMeta('meta[name="keywords"]', { name: 'keywords', content: cfg.keywords.join(', ') });
    }
    setOrCreateMeta('meta[name="robots"]', {
      name: 'robots',
      content: cfg.noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    setCanonical(url);

    setOrCreateMeta('meta[property="og:title"]', { property: 'og:title', content: cfg.title });
    setOrCreateMeta('meta[property="og:description"]', { property: 'og:description', content: cfg.description });
    setOrCreateMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setOrCreateMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setOrCreateMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setOrCreateMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });

    setOrCreateMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setOrCreateMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: cfg.title });
    setOrCreateMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: cfg.description });
    setOrCreateMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    if (cfg.publishedTime) {
      setOrCreateMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: cfg.publishedTime,
      });
    }
    if (cfg.modifiedTime) {
      setOrCreateMeta('meta[property="article:modified_time"]', {
        property: 'article:modified_time',
        content: cfg.modifiedTime,
      });
    }

    clearManagedJsonLd();

    if (cfg.breadcrumbs?.length) {
      appendJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: cfg.breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: b.url.startsWith('http') ? b.url : `${SITE_URL}${b.url}`,
        })),
      });
    }

    if (cfg.jsonLd) {
      const entries = Array.isArray(cfg.jsonLd) ? cfg.jsonLd : [cfg.jsonLd];
      entries.forEach((e) => appendJsonLd(e));
    }
  }, [
    cfg.title,
    cfg.description,
    cfg.path,
    cfg.image,
    cfg.type,
    cfg.publishedTime,
    cfg.modifiedTime,
    cfg.noindex,
    JSON.stringify(cfg.keywords || []),
    JSON.stringify(cfg.breadcrumbs || []),
    JSON.stringify(cfg.jsonLd || null),
  ]);
}
