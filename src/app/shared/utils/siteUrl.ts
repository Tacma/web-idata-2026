const DEFAULT_SITE_URL = 'https://idata.global';

export function getSiteUrl() {
  const envUrl =
    (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) ||
    (import.meta.env.VITE_SITE_URL as string | undefined);

  if (envUrl && envUrl.trim()) {
    return envUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin.replace(/\/$/, '');
  }

  return DEFAULT_SITE_URL;
}

export function buildPublicUrl(path: string) {
  if (!path) return getSiteUrl();
  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function buildRuntimeAssetUrl(path: string) {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  if (typeof window !== 'undefined' && window.location.origin) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${window.location.origin}${normalizedPath}`;
  }

  return buildPublicUrl(path);
}
