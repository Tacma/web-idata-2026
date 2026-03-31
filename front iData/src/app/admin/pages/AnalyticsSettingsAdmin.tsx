import { BarChart3, Save, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAnalyticsSettings, saveAnalyticsSettings, type AnalyticsSettings } from '../services/analyticsSettings.service';

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
      await saveAnalyticsSettings(settings);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Configuración de analítica</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona las herramientas de analítica y seguimiento del sitio
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

      {/* Google Analytics 4 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Google Analytics 4</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID de medición GA4
          </label>
          <input
            type="text"
            value={settings.ga4MeasurementId}
            onChange={(e) => setSettings({ ...settings, ga4MeasurementId: e.target.value })}
            placeholder="G-XXXXXXXXXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Formato: G-XXXXXXXXXX</p>
        </div>
      </div>

      {/* Google Tag Manager */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Google Tag Manager</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID del contenedor GTM
          </label>
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

      {/* Google Search Console */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Google Search Console</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código de verificación
          </label>
          <input
            type="text"
            value={settings.searchConsoleVerification}
            onChange={(e) => setSettings({ ...settings, searchConsoleVerification: e.target.value })}
            placeholder="google-site-verification=xxxxx"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-xs text-gray-500">Este código se añadirá como meta tag en el head</p>
        </div>
      </div>

      {/* Event Tracking */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Seguimiento de eventos</h2>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="track-forms"
              checked={settings.trackForms}
              onChange={(e) => setSettings({ ...settings, trackForms: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="track-forms" className="text-sm text-gray-700">
              Rastrear envíos de formularios
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="track-cta"
              checked={settings.trackCTAs}
              onChange={(e) => setSettings({ ...settings, trackCTAs: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="track-cta" className="text-sm text-gray-700">
              Rastrear clics en CTAs
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="track-lang"
              checked={settings.trackLanguageChanges}
              onChange={(e) => setSettings({ ...settings, trackLanguageChanges: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="track-lang" className="text-sm text-gray-700">
              Rastrear cambios de idioma
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="track-scroll"
              checked={settings.trackScroll}
              onChange={(e) => setSettings({ ...settings, trackScroll: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="track-scroll" className="text-sm text-gray-700">
              Rastrear profundidad de scroll
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="track-jobs"
              checked={settings.trackJobApplications}
              onChange={(e) => setSettings({ ...settings, trackJobApplications: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="track-jobs" className="text-sm text-gray-700">
              Rastrear aplicaciones a vacantes
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="track-blog"
              checked={settings.trackBlogInteraction}
              onChange={(e) => setSettings({ ...settings, trackBlogInteraction: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="track-blog" className="text-sm text-gray-700">
              Rastrear interacción con blog/insights
            </label>
          </div>
        </div>
      </div>

      {/* Consent Mode */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Modo de consentimiento</h2>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="consent-mode"
            checked={settings.enableConsentMode}
            onChange={(e) => setSettings({ ...settings, enableConsentMode: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="consent-mode" className="text-sm text-gray-700">
            Habilitar Google Consent Mode v2
          </label>
        </div>
        <p className="text-xs text-gray-500">
          Activar si necesitas cumplimiento GDPR/CCPA con banners de cookies
        </p>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-blue-900 mb-2">Importante</h3>
          <p className="text-sm text-blue-700">
            Los IDs de analytics no deben estar hardcodeados en el código. Esta configuración
            se inyecta dinámicamente en el head de todas las páginas. Asegúrate de probar 
            el tracking en modo preview antes de publicar en producción.
          </p>
        </div>
      </div>
    </div>
  );
}