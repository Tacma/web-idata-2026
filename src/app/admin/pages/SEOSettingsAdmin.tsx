import { Eye, Image as ImageIcon, Save, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSEOSettings, saveSEOSettings, type SEOSettings } from '../services/seoSettings.service';
import { getMediaItems, type MediaItem } from '../services/mediaLibrary.service';
import { buildRuntimeAssetUrl } from '../../shared/utils/siteUrl';

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function AssetField({
  label,
  value,
  onChange,
  onPick,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPick: () => void;
}) {
  const isImage = !!value && /\.(png|jpe?g|webp|gif|svg|avif|ico)(\?|#|$)/i.test(value);
  const previewUrl = value ? buildRuntimeAssetUrl(value) : '';

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/favicon.svg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={onPick}
          className="shrink-0 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Elegir desde medios
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            className="shrink-0 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            Limpiar
          </button>
        ) : null}
      </div>

      {isImage ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <img src={previewUrl} alt={label} className="w-10 h-10 rounded object-contain bg-white border border-gray-200" />
          <span className="text-sm text-gray-600 truncate">{value}</span>
        </div>
      ) : value ? (
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
          <ImageIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600 truncate">{value}</span>
        </div>
      ) : null}
    </div>
  );
}

export function SEOSettingsAdmin() {
  const [settings, setSettings] = useState<SEOSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'favicon' | 'appleTouchIcon' | null>(null);
  const [mediaQuery, setMediaQuery] = useState('');

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

  async function loadMediaItems() {
    try {
      setMediaLoading(true);
      const items = await getMediaItems();
      setMediaItems(items);
    } catch (error) {
      console.error('Error loading media items:', error);
      alert('Error al cargar la biblioteca de medios');
    } finally {
      setMediaLoading(false);
    }
  }

  function openPicker(target: 'favicon' | 'appleTouchIcon') {
    setPickerTarget(target);
    setPickerOpen(true);
    setMediaQuery('');
    if (mediaItems.length === 0) {
      void loadMediaItems();
    }
  }

  function selectMedia(url: string) {
    if (!settings || !pickerTarget) return;
    setSettings({ ...settings, [pickerTarget]: url });
    setPickerOpen(false);
    setPickerTarget(null);
  }

  async function handleSave() {
    if (!settings) return;

    try {
      setSaving(true);
      const normalized = await saveSEOSettings(settings);
      setSettings(normalized);
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

  const googlePreviewTitle = settings.siteTitleTemplate_es.replace('%page_title%', 'Home');
  const googlePreviewDescription = `${settings.defaultDescription_es} ${settings.searchSnippetSuffix_es}`.trim();
  const faviconPreviewUrl = buildRuntimeAssetUrl(settings.favicon);
  const filteredMediaItems = mediaItems.filter((item) =>
    `${item.label} ${item.source} ${item.url}`.toLowerCase().includes(mediaQuery.trim().toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">SEO y Metadata</h1>
          <p className="mt-2 text-sm text-gray-600">
            Configura defaults reales del sitio, snippets, share metadata y estructura para buscadores.
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

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración global de SEO</h2>
          <div className="space-y-4">
            <TextField
              label="Título del sitio (Español)"
              value={settings.siteTitleTemplate_es}
              onChange={(value) => setSettings({ ...settings, siteTitleTemplate_es: value })}
              placeholder="%page_title% | iData Global"
            />
            <TextField
              label="Título del sitio (Inglés)"
              value={settings.siteTitleTemplate_en}
              onChange={(value) => setSettings({ ...settings, siteTitleTemplate_en: value })}
              placeholder="%page_title% | iData Global"
            />
            <TextAreaField
              label="Descripción por defecto (Español)"
              value={settings.defaultDescription_es}
              onChange={(value) => setSettings({ ...settings, defaultDescription_es: value })}
              placeholder="Transformamos datos en valor empresarial..."
            />
            <TextAreaField
              label="Descripción por defecto (Inglés)"
              value={settings.defaultDescription_en}
              onChange={(value) => setSettings({ ...settings, defaultDescription_en: value })}
              placeholder="We transform data into business value..."
            />
            <TextAreaField
              label="Complemento del snippet en búsqueda (Español)"
              value={settings.searchSnippetSuffix_es}
              onChange={(value) => setSettings({ ...settings, searchSnippetSuffix_es: value })}
              placeholder="Contactanos. Trabaja con nosotros. Siguenos en LinkedIn, Instagram y YouTube."
            />
            <TextAreaField
              label="Complemento del snippet en búsqueda (Inglés)"
              value={settings.searchSnippetSuffix_en}
              onChange={(value) => setSettings({ ...settings, searchSnippetSuffix_en: value })}
              placeholder="Contact us. Work with us. Follow us on LinkedIn, Instagram and YouTube."
            />
            <TextField
              label="Imagen OG por defecto"
              value={settings.defaultOgImage}
              onChange={(value) => setSettings({ ...settings, defaultOgImage: value })}
              placeholder="/assets/logos/brand/logo-complete.png"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Dominio canónico"
                value={settings.canonicalDomain}
                onChange={(value) => setSettings({ ...settings, canonicalDomain: value })}
                placeholder="https://idata.global"
              />
              <AssetField
                label="Favicon"
                value={settings.favicon}
                onChange={(value) => setSettings({ ...settings, favicon: value })}
                onPick={() => openPicker('favicon')}
              />
            </div>
            <AssetField
              label="Apple touch icon"
              value={settings.appleTouchIcon}
              onChange={(value) => setSettings({ ...settings, appleTouchIcon: value })}
              onPick={() => openPicker('appleTouchIcon')}
            />
            <TextField
              label="Código de verificación de Search Console"
              value={settings.searchConsoleVerificationCode}
              onChange={(value) => setSettings({ ...settings, searchConsoleVerificationCode: value })}
              placeholder="google-site-verification=..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Share metadata y branding</h2>
          <div className="space-y-4">
            <TextField
              label="Marca"
              value={settings.brandName}
              onChange={(value) => setSettings({ ...settings, brandName: value })}
              placeholder="iData Global"
            />
            <TextField
              label="Título compartido por defecto (Español)"
              value={settings.defaultShareTitle_es}
              onChange={(value) => setSettings({ ...settings, defaultShareTitle_es: value })}
            />
            <TextField
              label="Título compartido por defecto (Inglés)"
              value={settings.defaultShareTitle_en}
              onChange={(value) => setSettings({ ...settings, defaultShareTitle_en: value })}
            />
            <TextAreaField
              label="Descripción compartida por defecto (Español)"
              value={settings.defaultShareDescription_es}
              onChange={(value) => setSettings({ ...settings, defaultShareDescription_es: value })}
            />
            <TextAreaField
              label="Descripción compartida por defecto (Inglés)"
              value={settings.defaultShareDescription_en}
              onChange={(value) => setSettings({ ...settings, defaultShareDescription_en: value })}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">URLs clave y redes sociales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="URL de contacto (Español)"
              value={settings.contactPageUrl_es}
              onChange={(value) => setSettings({ ...settings, contactPageUrl_es: value })}
            />
            <TextField
              label="URL de contacto (Inglés)"
              value={settings.contactPageUrl_en}
              onChange={(value) => setSettings({ ...settings, contactPageUrl_en: value })}
            />
            <TextField
              label="URL trabaja con nosotros (Español)"
              value={settings.careersPageUrl_es}
              onChange={(value) => setSettings({ ...settings, careersPageUrl_es: value })}
            />
            <TextField
              label="URL work with us (Inglés)"
              value={settings.careersPageUrl_en}
              onChange={(value) => setSettings({ ...settings, careersPageUrl_en: value })}
            />
            <TextField
              label="LinkedIn"
              value={settings.linkedinUrl}
              onChange={(value) => setSettings({ ...settings, linkedinUrl: value })}
            />
            <TextField
              label="Instagram"
              value={settings.instagramUrl}
              onChange={(value) => setSettings({ ...settings, instagramUrl: value })}
            />
            <TextField
              label="YouTube"
              value={settings.youtubeUrl}
              onChange={(value) => setSettings({ ...settings, youtubeUrl: value })}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Schema de organización</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Nombre de organización"
                value={settings.organizationName}
                onChange={(value) => setSettings({ ...settings, organizationName: value })}
              />
              <TextField
                label="Razón social"
                value={settings.organizationLegalName}
                onChange={(value) => setSettings({ ...settings, organizationLegalName: value })}
              />
              <TextField
                label="Email"
                value={settings.organizationEmail}
                onChange={(value) => setSettings({ ...settings, organizationEmail: value })}
              />
              <TextField
                label="Teléfono"
                value={settings.organizationPhone}
                onChange={(value) => setSettings({ ...settings, organizationPhone: value })}
              />
              <TextField
                label="Logo de organización"
                value={settings.organizationLogo}
                onChange={(value) => setSettings({ ...settings, organizationLogo: value })}
              />
              <TextField
                label="País"
                value={settings.organizationAddress.country}
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    organizationAddress: { ...settings.organizationAddress, country: value },
                  })
                }
              />
            </div>
            <TextAreaField
              label="Descripción de organización (Español)"
              value={settings.organizationDescription_es}
              onChange={(value) => setSettings({ ...settings, organizationDescription_es: value })}
            />
            <TextAreaField
              label="Descripción de organización (Inglés)"
              value={settings.organizationDescription_en}
              onChange={(value) => setSettings({ ...settings, organizationDescription_en: value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Dirección"
                value={settings.organizationAddress.street}
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    organizationAddress: { ...settings.organizationAddress, street: value },
                  })
                }
              />
              <TextField
                label="Ciudad"
                value={settings.organizationAddress.city}
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    organizationAddress: { ...settings.organizationAddress, city: value },
                  })
                }
              />
              <TextField
                label="Región"
                value={settings.organizationAddress.region}
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    organizationAddress: { ...settings.organizationAddress, region: value },
                  })
                }
              />
              <TextField
                label="Código postal"
                value={settings.organizationAddress.postalCode}
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    organizationAddress: { ...settings.organizationAddress, postalCode: value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Vista previa de Google
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={faviconPreviewUrl}
                alt=""
                className="w-4 h-4"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <span className="text-sm text-gray-600">
                {settings.canonicalDomain.replace('https://', '').replace('http://', '')}
              </span>
            </div>
            <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">{googlePreviewTitle}</h3>
            <p className="text-sm text-gray-600">{googlePreviewDescription}</p>
          </div>
        </div>
      </div>

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
              Permitir indexación por defecto
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
              Permitir seguimiento de enlaces por defecto
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
              Habilitar hreflang para español e inglés
            </label>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Qué queda conectado</h3>
        <p className="text-sm text-blue-700">
          Esta configuración alimenta títulos, meta descriptions, Open Graph, Twitter cards, canonical, hreflang,
          favicon, robots, verificación de Search Console y JSON-LD de organización, website y página en toda la web
          pública que usa el componente central de SEO.
        </p>
      </div>

      {pickerOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
          <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Elegir asset para favicon</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Selecciona una imagen existente de la biblioteca de medios para usarla en este campo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPickerOpen(false);
                  setPickerTarget(null);
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-b border-gray-200 px-6 py-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={mediaQuery}
                  onChange={(e) => setMediaQuery(e.target.value)}
                  placeholder="Buscar por nombre, origen o URL"
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-6">
              {mediaLoading ? (
                <div className="py-16 text-center text-sm text-gray-500">Cargando biblioteca...</div>
              ) : filteredMediaItems.length === 0 ? (
                <div className="py-16 text-center text-sm text-gray-500">No se encontraron assets para ese filtro.</div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredMediaItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectMedia(item.url)}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white text-left hover:border-blue-400 hover:shadow-md transition-all"
                    >
                      <div className="flex h-40 items-center justify-center bg-gray-50 p-4">
                        <img src={item.url} alt={item.label} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="space-y-1 px-4 py-3">
                        <p className="truncate text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.source}</p>
                        <p className="truncate text-xs text-gray-400">{item.url}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
