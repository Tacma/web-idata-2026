import { Info, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAnalyticsSettings, saveAnalyticsSettings, type AnalyticsSettings } from '../services/analyticsSettings.service';

function ToggleField({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}

export function AnalyticsSettingsAdmin() {
  const [settings, setSettings] = useState<AnalyticsSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await getAnalyticsSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading analytics settings:', error);
      alert('Error al cargar la configuración de analítica');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;

    try {
      setSaving(true);
      const normalized = await saveAnalyticsSettings(settings);
      setSettings(normalized);
      alert('Configuración de analítica guardada exitosamente');
    } catch (error) {
      console.error('Error saving analytics settings:', error);
      alert('Error al guardar la configuración de analítica');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Configuración de analítica</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona GA4, GTM, Search Console e instrumentación de eventos reales del sitio.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Google Analytics 4</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ID de medición GA4</label>
          <input
            type="text"
            value={settings.ga4MeasurementId}
            onChange={(e) => setSettings({ ...settings, ga4MeasurementId: e.target.value })}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Formato: G-XXXXXXXXXX</p>
        </div>
        <ToggleField
          id="anonymize-ip"
          label="Anonimizar IP en GA4 cuando aplique"
          checked={settings.anonymizeIp}
          onChange={(value) => setSettings({ ...settings, anonymizeIp: value })}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Google Tag Manager</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ID del contenedor GTM</label>
          <input
            type="text"
            value={settings.gtmContainerId}
            onChange={(e) => setSettings({ ...settings, gtmContainerId: e.target.value })}
            placeholder="GTM-XXXXXXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Formato: GTM-XXXXXXX</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Google Search Console</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Código de verificación</label>
          <input
            type="text"
            value={settings.searchConsoleVerification}
            onChange={(e) => setSettings({ ...settings, searchConsoleVerification: e.target.value })}
            placeholder="google-site-verification=xxxxx"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Se añadirá como meta tag para validación del dominio.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Seguimiento de eventos</h2>
        <div className="space-y-3">
          <ToggleField
            id="track-forms"
            label="Rastrear envíos de formularios"
            checked={settings.trackForms}
            onChange={(value) => setSettings({ ...settings, trackForms: value })}
          />
          <ToggleField
            id="track-cta"
            label="Rastrear clics en CTAs"
            checked={settings.trackCTAs}
            onChange={(value) => setSettings({ ...settings, trackCTAs: value })}
          />
          <ToggleField
            id="track-language"
            label="Rastrear cambios de idioma"
            checked={settings.trackLanguageChanges}
            onChange={(value) => setSettings({ ...settings, trackLanguageChanges: value })}
          />
          <ToggleField
            id="track-scroll"
            label="Rastrear profundidad de scroll"
            checked={settings.trackScroll}
            onChange={(value) => setSettings({ ...settings, trackScroll: value })}
          />
          <ToggleField
            id="track-job-applications"
            label="Rastrear aplicaciones a vacantes"
            checked={settings.trackJobApplications}
            onChange={(value) => setSettings({ ...settings, trackJobApplications: value })}
          />
          <ToggleField
            id="track-open-applications"
            label="Rastrear aplicaciones abiertas"
            checked={settings.trackOpenApplications}
            onChange={(value) => setSettings({ ...settings, trackOpenApplications: value })}
          />
          <ToggleField
            id="track-blog"
            label="Rastrear interacción con blog e insights"
            checked={settings.trackBlogInteraction}
            onChange={(value) => setSettings({ ...settings, trackBlogInteraction: value })}
          />
          <ToggleField
            id="track-downloads"
            label="Rastrear descargas de archivos"
            checked={settings.trackFileDownloads}
            onChange={(value) => setSettings({ ...settings, trackFileDownloads: value })}
          />
          <ToggleField
            id="track-outbound"
            label="Rastrear clics salientes"
            checked={settings.trackOutboundClicks}
            onChange={(value) => setSettings({ ...settings, trackOutboundClicks: value })}
          />
          <ToggleField
            id="track-search"
            label="Rastrear búsquedas internas"
            checked={settings.trackSearchUsage}
            onChange={(value) => setSettings({ ...settings, trackSearchUsage: value })}
          />
          <ToggleField
            id="track-video"
            label="Rastrear interacción con videos"
            checked={settings.trackVideoInteractions}
            onChange={(value) => setSettings({ ...settings, trackVideoInteractions: value })}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Modo de consentimiento</h2>
        <ToggleField
          id="consent-mode"
          label="Habilitar Google Consent Mode v2"
          checked={settings.enableConsentMode}
          onChange={(value) => setSettings({ ...settings, enableConsentMode: value })}
        />
        <p className="text-xs text-gray-500">
          Actívalo si vas a trabajar con banners de cookies o flujos de cumplimiento para GDPR/CCPA.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-blue-900 mb-2">Qué queda conectado</h3>
          <p className="text-sm text-blue-700">
            Esta configuración ya no queda solo en el formulario del admin. El sitio público la usa para inyectar
            GA4, GTM, Search Console y listeners globales de eventos según los toggles que actives aquí.
          </p>
        </div>
      </div>
    </div>
  );
}
