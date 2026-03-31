import { useEffect } from 'react';
import { getSEOSettings, getSEOSettingsSnapshot, type SEOSettings } from '../../admin/services/seoSettings.service';
import { buildRuntimeAssetUrl } from '../utils/siteUrl';

function setIconLink(rel: string, href: string) {
  if (!href) return;

  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = buildRuntimeAssetUrl(href);
}

function applyRuntimeSEOSettings(settings: SEOSettings) {
  setIconLink('icon', settings.favicon);
  setIconLink('shortcut icon', settings.favicon);
  setIconLink('apple-touch-icon', settings.appleTouchIcon);
}

export function RuntimeSEOSettingsSync() {
  useEffect(() => {
    applyRuntimeSEOSettings(getSEOSettingsSnapshot());
    void getSEOSettings()
      .then((settings) => {
        applyRuntimeSEOSettings(settings);
      })
      .catch((error) => {
        console.error('Error syncing runtime SEO settings:', error);
      });

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<SEOSettings>;
      if (customEvent.detail) {
        applyRuntimeSEOSettings(customEvent.detail);
        return;
      }

      applyRuntimeSEOSettings(getSEOSettingsSnapshot());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== 'cms_seo_settings') return;
      applyRuntimeSEOSettings(getSEOSettingsSnapshot());
    };

    window.addEventListener('idata:seo-settings-updated', handleUpdate as EventListener);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('idata:seo-settings-updated', handleUpdate as EventListener);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return null;
}
