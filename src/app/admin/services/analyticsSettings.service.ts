import { getCachedSiteSetting, getSiteSetting, saveSiteSetting } from './siteSettings.service';

export interface AnalyticsSettings {
  ga4MeasurementId: string;
  gtmContainerId: string;
  searchConsoleVerification: string;
  enableConsentMode: boolean;
  anonymizeIp: boolean;
  trackForms: boolean;
  trackCTAs: boolean;
  trackLanguageChanges: boolean;
  trackScroll: boolean;
  trackJobApplications: boolean;
  trackOpenApplications: boolean;
  trackBlogInteraction: boolean;
  trackFileDownloads: boolean;
  trackOutboundClicks: boolean;
  trackSearchUsage: boolean;
  trackVideoInteractions: boolean;
}

const defaultSettings: AnalyticsSettings = {
  ga4MeasurementId: '',
  gtmContainerId: '',
  searchConsoleVerification: '',
  enableConsentMode: false,
  anonymizeIp: true,
  trackForms: true,
  trackCTAs: true,
  trackLanguageChanges: true,
  trackScroll: false,
  trackJobApplications: true,
  trackOpenApplications: true,
  trackBlogInteraction: true,
  trackFileDownloads: true,
  trackOutboundClicks: true,
  trackSearchUsage: true,
  trackVideoInteractions: false,
};

function normalizeSettings(raw: any): AnalyticsSettings {
  return {
    ga4MeasurementId: raw?.ga4MeasurementId || raw?.ga4_measurement_id || '',
    gtmContainerId: raw?.gtmContainerId || raw?.gtm_container_id || '',
    searchConsoleVerification:
      raw?.searchConsoleVerification || raw?.search_console_verification_code || '',
    enableConsentMode:
      typeof raw?.enableConsentMode === 'boolean'
        ? raw.enableConsentMode
        : typeof raw?.consent_mode_enabled === 'boolean'
          ? raw.consent_mode_enabled
          : defaultSettings.enableConsentMode,
    anonymizeIp:
      typeof raw?.anonymizeIp === 'boolean'
        ? raw.anonymizeIp
        : typeof raw?.anonymize_ip === 'boolean'
          ? raw.anonymize_ip
          : defaultSettings.anonymizeIp,
    trackForms:
      typeof raw?.trackForms === 'boolean'
        ? raw.trackForms
        : typeof raw?.track_form_submissions === 'boolean'
          ? raw.track_form_submissions
          : defaultSettings.trackForms,
    trackCTAs:
      typeof raw?.trackCTAs === 'boolean'
        ? raw.trackCTAs
        : typeof raw?.track_cta_clicks === 'boolean'
          ? raw.track_cta_clicks
          : defaultSettings.trackCTAs,
    trackLanguageChanges:
      typeof raw?.trackLanguageChanges === 'boolean'
        ? raw.trackLanguageChanges
        : typeof raw?.track_language_switches === 'boolean'
          ? raw.track_language_switches
          : defaultSettings.trackLanguageChanges,
    trackScroll:
      typeof raw?.trackScroll === 'boolean'
        ? raw.trackScroll
        : typeof raw?.track_scroll_depth === 'boolean'
          ? raw.track_scroll_depth
          : defaultSettings.trackScroll,
    trackJobApplications:
      typeof raw?.trackJobApplications === 'boolean'
        ? raw.trackJobApplications
        : typeof raw?.track_job_applications === 'boolean'
          ? raw.track_job_applications
          : defaultSettings.trackJobApplications,
    trackOpenApplications:
      typeof raw?.trackOpenApplications === 'boolean'
        ? raw.trackOpenApplications
        : typeof raw?.track_open_applications === 'boolean'
          ? raw.track_open_applications
          : defaultSettings.trackOpenApplications,
    trackBlogInteraction:
      typeof raw?.trackBlogInteraction === 'boolean'
        ? raw.trackBlogInteraction
        : typeof raw?.track_blog_engagement === 'boolean'
          ? raw.track_blog_engagement
          : defaultSettings.trackBlogInteraction,
    trackFileDownloads:
      typeof raw?.trackFileDownloads === 'boolean'
        ? raw.trackFileDownloads
        : typeof raw?.track_file_downloads === 'boolean'
          ? raw.track_file_downloads
          : defaultSettings.trackFileDownloads,
    trackOutboundClicks:
      typeof raw?.trackOutboundClicks === 'boolean'
        ? raw.trackOutboundClicks
        : typeof raw?.track_outbound_clicks === 'boolean'
          ? raw.track_outbound_clicks
          : defaultSettings.trackOutboundClicks,
    trackSearchUsage:
      typeof raw?.trackSearchUsage === 'boolean'
        ? raw.trackSearchUsage
        : typeof raw?.track_search_usage === 'boolean'
          ? raw.track_search_usage
          : defaultSettings.trackSearchUsage,
    trackVideoInteractions:
      typeof raw?.trackVideoInteractions === 'boolean'
        ? raw.trackVideoInteractions
        : typeof raw?.track_video_interactions === 'boolean'
          ? raw.track_video_interactions
          : defaultSettings.trackVideoInteractions,
  };
}

export function getAnalyticsSettingsSnapshot(): AnalyticsSettings {
  return normalizeSettings(getCachedSiteSetting('analytics_settings', defaultSettings));
}

export async function getAnalyticsSettings(): Promise<AnalyticsSettings> {
  const raw = await getSiteSetting('analytics', 'analytics_settings', defaultSettings);
  const normalized = normalizeSettings(raw);
  await saveSiteSetting('analytics', 'analytics_settings', normalized);
  return normalized;
}

export async function saveAnalyticsSettings(settings: AnalyticsSettings): Promise<AnalyticsSettings> {
  const normalized = normalizeSettings(settings);
  const saved = normalizeSettings(await saveSiteSetting('analytics', 'analytics_settings', normalized));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('idata:analytics-settings-updated', { detail: saved }));
  }
  return saved;
}
