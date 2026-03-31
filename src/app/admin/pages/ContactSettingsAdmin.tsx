import { useEffect, useState } from 'react';
import { Mail, MessageCircle, Phone, Plus, Save, Trash2 } from 'lucide-react';
import {
  DEFAULT_WHATSAPP_REGION_PRESETS,
  getContactSettings,
  saveContactSettings,
  type ContactSettings,
  type WhatsAppRegionSettings,
} from '../services/contactSettings.service';

function createEmptyRegion(nextOrder: number): WhatsAppRegionSettings {
  const id = `region-${Date.now()}`;
  return {
    id,
    slug: id,
    name_es: '',
    name_en: '',
    phoneNumber: '',
    prefilledMessage_es: '',
    prefilledMessage_en: '',
    isActive: true,
    order: nextOrder,
    availabilityLabel_es: '',
    availabilityLabel_en: '',
    helperText_es: '',
    helperText_en: '',
  };
}

function createExampleRegions(): WhatsAppRegionSettings[] {
  return DEFAULT_WHATSAPP_REGION_PRESETS.map((region) => ({ ...region }));
}

export function ContactSettingsAdmin() {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await getContactSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading contact settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;

    try {
      setSaving(true);
      const normalizedRegions = [...settings.whatsapp.regions].sort((a, b) => a.order - b.order);
      const payload: ContactSettings = {
        ...settings,
        whatsapp: {
          ...settings.whatsapp,
          regions: normalizedRegions,
        },
      };
      const saved = await saveContactSettings(payload);
      setSettings(saved);
      alert('Configuración de contacto guardada exitosamente');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error al guardar la configuración');
    } finally {
      setSaving(false);
    }
  }

  function updateRegion(regionId: string, updates: Partial<WhatsAppRegionSettings>) {
    if (!settings) return;

    setSettings({
      ...settings,
      whatsapp: {
        ...settings.whatsapp,
        regions: settings.whatsapp.regions.map((region) =>
          region.id === regionId ? { ...region, ...updates } : region
        ),
      },
    });
  }

  function addRegion() {
    if (!settings) return;
    const nextOrder =
      settings.whatsapp.regions.reduce((max, region) => Math.max(max, region.order), 0) + 1;

    setSettings({
      ...settings,
      whatsapp: {
        ...settings.whatsapp,
        regions: [...settings.whatsapp.regions, createEmptyRegion(nextOrder)],
      },
    });
  }

  function restoreExampleRegions() {
    if (!settings) return;

    setSettings({
      ...settings,
      whatsapp: {
        ...settings.whatsapp,
        regions: createExampleRegions(),
      },
    });
  }

  function removeRegion(regionId: string) {
    if (!settings) return;

    setSettings({
      ...settings,
      whatsapp: {
        ...settings.whatsapp,
        regions: settings.whatsapp.regions.filter((region) => region.id !== regionId),
      },
    });
  }

  if (loading || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  const regions = [...settings.whatsapp.regions].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Configuración de Contacto</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona la información pública de contacto y las regiones de WhatsApp del sitio.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h2 className="mb-4 text-lg font-medium text-gray-900">Información de contacto</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <Mail className="mr-2 inline h-4 w-4" />
                Email principal
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <Phone className="mr-2 inline h-4 w-4" />
                Teléfono principal
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Teléfono administrativo</label>
              <input
                type="tel"
                value={settings.administrativePhone}
                onChange={(e) => setSettings({ ...settings, administrativePhone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Horario (Español)</label>
              <input
                type="text"
                value={settings.businessHours_es}
                onChange={(e) => setSettings({ ...settings, businessHours_es: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Dirección (Español)</label>
              <input
                type="text"
                value={settings.address_es}
                onChange={(e) => setSettings({ ...settings, address_es: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Dirección (Inglés)</label>
              <input
                type="text"
                value={settings.address_en}
                onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">WhatsApp transversal</h2>
              <p className="mt-1 text-sm text-gray-600">
                Controla el botón flotante, el selector de regiones y la variante integrada en la página de contacto.
                La base sugerida deja 4 regiones listas para administrar: Centroamérica, Chile, Colombia y Estados Unidos.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={restoreExampleRegions}
                className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100"
              >
                Cargar 4 regiones base
              </button>
              <button
                type="button"
                onClick={addRegion}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
                Agregar región
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            El botón flotante y el selector público usan exactamente las regiones activas que configures aquí, en el orden que definas abajo.
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={settings.whatsapp.enabled}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, enabled: e.target.checked },
                  })
                }
              />
              Habilitar WhatsApp en el sitio
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={settings.whatsapp.floatingButtonEnabled}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, floatingButtonEnabled: e.target.checked },
                  })
                }
              />
              Mostrar botón flotante
            </label>

            <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 md:col-span-2">
              <input
                type="checkbox"
                checked={settings.whatsapp.directOpenWhenSingleRegion}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, directOpenWhenSingleRegion: e.target.checked },
                  })
                }
              />
              Abrir directo cuando solo haya una región activa
            </label>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                URL del ícono de WhatsApp
              </label>
              <input
                type="text"
                value={settings.whatsapp.iconUrl}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, iconUrl: e.target.value },
                  })
                }
                placeholder="/assets/icons/whatsapp-liquid.png o URL remota"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Etiqueta botón flotante (ES)</label>
              <input
                type="text"
                value={settings.whatsapp.floatingLabel_es}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, floatingLabel_es: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Etiqueta botón flotante (EN)</label>
              <input
                type="text"
                value={settings.whatsapp.floatingLabel_en}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, floatingLabel_en: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Título selector (ES)</label>
              <input
                type="text"
                value={settings.whatsapp.selectorTitle_es}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, selectorTitle_es: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Título selector (EN)</label>
              <input
                type="text"
                value={settings.whatsapp.selectorTitle_en}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, selectorTitle_en: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Subtítulo selector (ES)</label>
              <textarea
                value={settings.whatsapp.selectorSubtitle_es}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, selectorSubtitle_es: e.target.value },
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Subtítulo selector (EN)</label>
              <textarea
                value={settings.whatsapp.selectorSubtitle_en}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, selectorSubtitle_en: e.target.value },
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">CTA región (ES)</label>
              <input
                type="text"
                value={settings.whatsapp.regionCtaLabel_es}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, regionCtaLabel_es: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">CTA región (EN)</label>
              <input
                type="text"
                value={settings.whatsapp.regionCtaLabel_en}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, regionCtaLabel_en: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {regions.map((region) => (
              <div key={region.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    Región de WhatsApp
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRegion(region.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">ID</label>
                    <input
                      type="text"
                      value={region.id}
                      onChange={(e) => updateRegion(region.id, { id: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Slug / código</label>
                    <input
                      type="text"
                      value={region.slug}
                      onChange={(e) => updateRegion(region.id, { slug: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Nombre visible (ES)</label>
                    <input
                      type="text"
                      value={region.name_es}
                      onChange={(e) => updateRegion(region.id, { name_es: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Nombre visible (EN)</label>
                    <input
                      type="text"
                      value={region.name_en}
                      onChange={(e) => updateRegion(region.id, { name_en: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Número de WhatsApp</label>
                    <input
                      type="tel"
                      value={region.phoneNumber}
                      onChange={(e) => updateRegion(region.id, { phoneNumber: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Orden</label>
                    <input
                      type="number"
                      value={region.order}
                      onChange={(e) => updateRegion(region.id, { order: Number(e.target.value) || 0 })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 md:col-span-2">
                    <input
                      type="checkbox"
                      checked={region.isActive}
                      onChange={(e) => updateRegion(region.id, { isActive: e.target.checked })}
                    />
                    Región activa públicamente
                  </label>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Etiqueta disponibilidad (ES)</label>
                    <input
                      type="text"
                      value={region.availabilityLabel_es || ''}
                      onChange={(e) => updateRegion(region.id, { availabilityLabel_es: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Etiqueta disponibilidad (EN)</label>
                    <input
                      type="text"
                      value={region.availabilityLabel_en || ''}
                      onChange={(e) => updateRegion(region.id, { availabilityLabel_en: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Texto ayuda (ES)</label>
                    <textarea
                      value={region.helperText_es || ''}
                      onChange={(e) => updateRegion(region.id, { helperText_es: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Texto ayuda (EN)</label>
                    <textarea
                      value={region.helperText_en || ''}
                      onChange={(e) => updateRegion(region.id, { helperText_en: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Mensaje prellenado (ES)</label>
                    <textarea
                      value={region.prefilledMessage_es}
                      onChange={(e) => updateRegion(region.id, { prefilledMessage_es: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Mensaje prellenado (EN)</label>
                    <textarea
                      value={region.prefilledMessage_en}
                      onChange={(e) => updateRegion(region.id, { prefilledMessage_en: e.target.value })}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
