import { Search, Save, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSEOSettings, saveSEOSettings, type SEOSettings } from '../services/seoSettings.service';

export function SEOSettingsAdmin() {
  const [settings, setSettings] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await getSEOSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading SEO settings:', error);
      alert('Error al cargar la configuración SEO');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;
    
    try {
      setSaving(true);
      await saveSEOSettings(settings);
      alert('Configuración SEO guardada exitosamente');
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      alert('Error al guardar la configuración SEO');
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
          <h1 className="text-3xl font-light text-gray-900">SEO y Metadata</h1>
          <p className="mt-2 text-sm text-gray-600">
            Configura los parámetros globales de SEO y metadatos del sitio
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

      {/* SEO Settings Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración global de SEO</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del sitio (Español)
              </label>
              <input
                type="text"
                value={settings.siteTitleTemplate_es}
                onChange={(e) => setSettings({ ...settings, siteTitleTemplate_es: e.target.value })}
                placeholder="%page_title% | iData Global"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Usa %page_title% como variable para el título de la página</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del sitio (Inglés)
              </label>
              <input
                type="text"
                value={settings.siteTitleTemplate_en}
                onChange={(e) => setSettings({ ...settings, siteTitleTemplate_en: e.target.value })}
                placeholder="%page_title% | iData Global"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción por defecto (Español)
              </label>
              <textarea
                rows={3}
                value={settings.defaultDescription_es}
                onChange={(e) => setSettings({ ...settings, defaultDescription_es: e.target.value })}
                placeholder="Transformamos datos en valor empresarial..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción por defecto (Inglés)
              </label>
              <textarea
                rows={3}
                value={settings.defaultDescription_en}
                onChange={(e) => setSettings({ ...settings, defaultDescription_en: e.target.value })}
                placeholder="We transform data into business value..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen OG por defecto (URL)
              </label>
              <input
                type="text"
                value={settings.defaultOgImage}
                onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })}
                placeholder="https://idata.global/og-default.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dominio canónico
                </label>
                <input
                  type="text"
                  value={settings.canonicalDomain}
                  onChange={(e) => setSettings({ ...settings, canonicalDomain: e.target.value })}
                  placeholder="https://idata.global"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Favicon
                </label>
                <input
                  type="text"
                  value={settings.favicon}
                  onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
                  placeholder="/favicon.ico"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Preview */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Vista previa de Google
        </h2>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <img src={settings.favicon} alt="" className="w-4 h-4" onError={(e) => e.currentTarget.style.display = 'none'} />
              <span className="text-sm text-gray-600">{settings.canonicalDomain.replace('https://', '').replace('http://', '')}</span>
            </div>
            <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
              {settings.siteTitleTemplate_es.replace('%page_title%', 'Home')}
            </h3>
            <p className="text-sm text-gray-600">
              {settings.defaultDescription_es}
            </p>
          </div>
        </div>
      </div>

      {/* Robots & Indexing */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Robots e indexación</h2>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="robots-index"
              checked={settings.robotsIndex}
              onChange={(e) => setSettings({ ...settings, robotsIndex: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="robots-index" className="text-sm text-gray-700">
              Permitir indexación por defecto (robots index)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="robots-follow"
              checked={settings.robotsFollow}
              onChange={(e) => setSettings({ ...settings, robotsFollow: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="robots-follow" className="text-sm text-gray-700">
              Permitir seguimiento de enlaces por defecto (robots follow)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hreflang"
              checked={settings.enableHreflang}
              onChange={(e) => setSettings({ ...settings, enableHreflang: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hreflang" className="text-sm text-gray-700">
              Habilitar tags hreflang para multi-idioma
            </label>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Sobre la configuración SEO</h3>
        <p className="text-sm text-blue-700">
          Esta configuración se aplica globalmente a todas las páginas del sitio. Cada página puede sobrescribir 
          estos valores con su propia configuración específica de SEO.
        </p>
      </div>
    </div>
  );
}