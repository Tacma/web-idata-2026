import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import {
  getAnalyticsSettings,
  getAnalyticsSettingsSnapshot,
  type AnalyticsSettings,
} from '../../admin/services/analyticsSettings.service';
import { useLanguage } from '../../shared/contexts/LanguageContext';
import { getSiteUrl } from '../../shared/utils/siteUrl';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

function ensureScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureInlineScript(id: string, content: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.text = content;
  document.head.appendChild(script);
}

function setMetaVerification(content: string) {
  let meta = document.querySelector('meta[name="google-site-verification"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'google-site-verification');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function pushDataLayer(eventName: string, payload: Record<string, any>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}

function trackEvent(eventName: string, payload: Record<string, any>, ga4MeasurementId: string) {
  pushDataLayer(eventName, payload);
  if (ga4MeasurementId && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }
}

export function AnalyticsManager() {
  const location = useLocation();
  const { language } = useLanguage();
  const previousLanguage = useRef(language);
  const trackedScrollMarks = useRef<Set<number>>(new Set());
  const [settings, setSettings] = useState<AnalyticsSettings>(getAnalyticsSettingsSnapshot());

  useEffect(() => {
    let cancelled = false;

    void getAnalyticsSettings()
      .then((resolved) => {
        if (!cancelled) {
          setSettings(resolved);
        }
      })
      .catch((error) => {
        console.error('Error loading analytics settings:', error);
      });

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<AnalyticsSettings>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
        return;
      }
      setSettings(getAnalyticsSettingsSnapshot());
    };

    window.addEventListener('idata:analytics-settings-updated', handleUpdate as EventListener);

    return () => {
      cancelled = true;
      window.removeEventListener('idata:analytics-settings-updated', handleUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    if (settings.searchConsoleVerification) {
      setMetaVerification(settings.searchConsoleVerification);
    }

    if (settings.gtmContainerId) {
      ensureScript(
        'idata-gtm-loader',
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(settings.gtmContainerId)}`
      );
      window.dataLayer = window.dataLayer || [];
      pushDataLayer('gtm_init', { gtm_container_id: settings.gtmContainerId });
    }

    if (settings.ga4MeasurementId) {
      ensureScript(
        'idata-ga4-loader',
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(settings.ga4MeasurementId)}`
      );
      ensureInlineScript(
        'idata-ga4-inline',
        `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${settings.ga4MeasurementId}', {
            anonymize_ip: ${settings.anonymizeIp ? 'true' : 'false'},
            send_page_view: false
          });
        `
      );
    }
  }, [settings]);

  useEffect(() => {
    const pagePayload = {
      page_location: `${getSiteUrl()}${location.pathname}${location.search}`,
      page_path: location.pathname,
      page_language: language,
      page_title: document.title,
    };

    trackEvent('page_view', pagePayload, settings.ga4MeasurementId);

    if (settings.trackLanguageChanges && previousLanguage.current !== language) {
      trackEvent(
        'language_change',
        {
          from_language: previousLanguage.current,
          to_language: language,
          page_path: location.pathname,
        },
        settings.ga4MeasurementId
      );
    }

    previousLanguage.current = language;
    trackedScrollMarks.current.clear();
  }, [location.pathname, location.search, language, settings]);

  useEffect(() => {
    const ga4Id = settings.ga4MeasurementId;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a,button') as HTMLElement | null;
      if (!clickable) return;

      const text = clickable.textContent?.trim() || '';
      const href = clickable instanceof HTMLAnchorElement ? clickable.href : clickable.getAttribute('href') || '';

      if (settings.trackCTAs && text) {
        const ctaRegex = /contact|contactanos|contactar|trabaja|work with us|leer mas|read more|conoce mas|learn more|ver|explore|download|descargar|apply|aplicar/i;
        if (ctaRegex.test(text)) {
          trackEvent(
            'cta_click',
            {
              cta_text: text,
              cta_url: href,
              page_path: location.pathname,
            },
            ga4Id
          );
        }
      }

      if (settings.trackBlogInteraction && href.includes('/insights')) {
        trackEvent(
          'insight_interaction',
          {
            link_url: href,
            link_text: text,
            page_path: location.pathname,
          },
          ga4Id
        );
      }

      if (settings.trackOutboundClicks && href && href.startsWith('http') && !href.startsWith(getSiteUrl())) {
        trackEvent(
          'outbound_click',
          {
            outbound_url: href,
            link_text: text,
            page_path: location.pathname,
          },
          ga4Id
        );
      }

      if (settings.trackFileDownloads && /\.(pdf|docx?|xlsx?|zip|pptx?)($|\?)/i.test(href)) {
        trackEvent(
          'file_download',
          {
            file_url: href,
            link_text: text,
            page_path: location.pathname,
          },
          ga4Id
        );
      }
    };

    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      const formName = form.getAttribute('id') || form.getAttribute('name') || location.pathname;

      if (settings.trackForms) {
        trackEvent(
          'form_submit',
          {
            form_name: formName,
            page_path: location.pathname,
          },
          ga4Id
        );
      }

      if (settings.trackJobApplications && /work-with-us|trabaja-con-nosotros|job|vacante|application/i.test(location.pathname)) {
        trackEvent(
          'job_application_submit',
          {
            form_name: formName,
            page_path: location.pathname,
          },
          ga4Id
        );
      }

      if (settings.trackOpenApplications && /open|spontaneous|general|perfil|open-application/i.test(formName)) {
        trackEvent(
          'open_application_submit',
          {
            form_name: formName,
            page_path: location.pathname,
          },
          ga4Id
        );
      }
    };

    const handleScroll = () => {
      if (!settings.trackScroll) return;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const percentage = Math.round((scrollTop / scrollHeight) * 100);
      const milestones = [25, 50, 75, 90];

      for (const milestone of milestones) {
        if (percentage >= milestone && !trackedScrollMarks.current.has(milestone)) {
          trackedScrollMarks.current.add(milestone);
          trackEvent(
            'scroll_depth',
            {
              scroll_percent: milestone,
              page_path: location.pathname,
            },
            ga4Id
          );
        }
      }
    };

    const handleSearch = (event: Event) => {
      if (!settings.trackSearchUsage) return;
      const target = event.target as HTMLInputElement | null;
      if (!target) return;
      const placeholder = target.getAttribute('placeholder') || '';
      const isSearchField =
        target.type === 'search' || /buscar|search/i.test(target.name || '') || /buscar|search/i.test(placeholder);

      if (!isSearchField || !target.value.trim()) return;

      trackEvent(
        'search_usage',
        {
          search_term: target.value.trim(),
          page_path: location.pathname,
        },
        ga4Id
      );
    };

    const handleVideoPlay = (event: Event) => {
      if (!settings.trackVideoInteractions) return;
      const video = event.target as HTMLVideoElement | null;
      if (!video) return;
      trackEvent(
        'video_play',
        {
          current_time: Math.round(video.currentTime),
          page_path: location.pathname,
        },
        ga4Id
      );
    };

    document.addEventListener('click', handleClick, true);
    document.addEventListener('submit', handleSubmit, true);
    document.addEventListener('change', handleSearch, true);
    document.addEventListener('play', handleVideoPlay, true);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('submit', handleSubmit, true);
      document.removeEventListener('change', handleSearch, true);
      document.removeEventListener('play', handleVideoPlay, true);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, language, settings]);

  if (!settings.gtmContainerId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(settings.gtmContainerId)}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
