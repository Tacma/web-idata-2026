import { useEffect, useState, type ReactNode } from 'react';
import { Mail, MessageCircle, Phone, Plus, Save, Share2, Trash2 } from 'lucide-react';
import {
  DEFAULT_WHATSAPP_REGION_PRESETS,
  getContactSettings,
  saveContactSettings,
  type ContactSettings,
  type WhatsAppRegionSettings,
} from '../services/contactSettings.service';

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

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

function ToggleCard({
  checked,
  label,
  hint,
  onChange,
}: {
  checked: boolean;
  label: string;
  hint: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#4387DF] focus:ring-[#4387DF]/20"
      />
      <span>
        <span className="block text-sm font-medium text-slate-900">{label}</span>
        <span className="mt-1 block text-xs leading-6 text-slate-500">{hint}</span>
      </span>
    </label>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-slate-800">{label}</span>
      {children}
    </label>
  );
}

export function ContactSettingsAdmin() {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        setLoading(true);
        const data = await getContactSettings();
        if (!cancelled) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error loading contact settings:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

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
      alert('Canales de contacto guardados correctamente');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('No fue posible guardar los canales de contacto');
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
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
          <p className="text-slate-600">Cargando canales de contacto...</p>
        </div>
      </div>
    );
  }

  const regions = [...settings.whatsapp.regions].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(37,211,102,0.14),transparent_22%),radial-gradient(circle_at_top_right,rgba(67,135,223,0.18),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Atención y canales</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              WhatsApp, contacto y redes visibles del sitio
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Este módulo controla los datos públicos de contacto y la experiencia transversal de WhatsApp.
              Aquí no editas estructura: editas canales reales que el sitio ya usa.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar canales'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-[#4387DF]/10 p-3 text-[#4387DF]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Datos de contacto visibles</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Se reutilizan en la página de contacto, footer y mensajes institucionales.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <Field label="Email principal">
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className={inputClassName}
                />
              </Field>
              <Field label="Teléfono principal">
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className={inputClassName}
                />
              </Field>
              <Field label="Teléfono administrativo">
                <input
                  type="tel"
                  value={settings.administrativePhone}
                  onChange={(e) => setSettings({ ...settings, administrativePhone: e.target.value })}
                  className={inputClassName}
                />
              </Field>
              <Field label="Horario visible (ES)">
                <input
                  type="text"
                  value={settings.businessHours_es}
                  onChange={(e) => setSettings({ ...settings, businessHours_es: e.target.value })}
                  className={inputClassName}
                />
              </Field>
              <Field label="Dirección visible (ES)">
                <input
                  type="text"
                  value={settings.address_es}
                  onChange={(e) => setSettings({ ...settings, address_es: e.target.value })}
                  className={inputClassName}
                />
              </Field>
              <Field label="Dirección visible (EN)">
                <input
                  type="text"
                  value={settings.address_en}
                  onChange={(e) => setSettings({ ...settings, address_en: e.target.value })}
                  className={inputClassName}
                />
              </Field>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-fuchsia-500/10 p-3 text-fuchsia-600">
                <Share2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Redes sociales globales</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Si cambian aquí, cambian también en el footer, contacto e insights.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <Field label="Facebook">
                <input
                  type="text"
                  value={settings.socialMedia.facebook || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, facebook: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="LinkedIn">
                <input
                  type="text"
                  value={settings.socialMedia.linkedin || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, linkedin: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Instagram">
                <input
                  type="text"
                  value={settings.socialMedia.instagram || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, instagram: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="YouTube">
                <input
                  type="text"
                  value={settings.socialMedia.youtube || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialMedia: { ...settings.socialMedia, youtube: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-medium text-slate-950">WhatsApp transversal</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Controla el botón flotante, el selector de regiones y la versión compacta de contacto.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={restoreExampleRegions}
                  className="rounded-2xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
                >
                  Cargar base sugerida
                </button>
                <button
                  type="button"
                  onClick={addRegion}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                  Agregar región
                </button>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <ToggleCard
                checked={settings.whatsapp.enabled}
                label="Habilitar WhatsApp en el sitio"
                hint="Desactívalo solo si quieres esconder completamente este canal."
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, enabled: value },
                  })
                }
              />
              <ToggleCard
                checked={settings.whatsapp.floatingButtonEnabled}
                label="Mostrar botón flotante"
                hint="Controla el botón persistente que acompaña la navegación pública."
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    whatsapp: { ...settings.whatsapp, floatingButtonEnabled: value },
                  })
                }
              />
              <div className="md:col-span-2">
                <ToggleCard
                  checked={settings.whatsapp.directOpenWhenSingleRegion}
                  label="Abrir directo si hay una sola región"
                  hint="Útil cuando quieras evitar el selector y mandar la persona directo al chat."
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, directOpenWhenSingleRegion: value },
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="URL del ícono de WhatsApp">
                <input
                  type="text"
                  value={settings.whatsapp.iconUrl}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, iconUrl: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Etiqueta botón flotante (ES)">
                <input
                  type="text"
                  value={settings.whatsapp.floatingLabel_es}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, floatingLabel_es: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Etiqueta botón flotante (EN)">
                <input
                  type="text"
                  value={settings.whatsapp.floatingLabel_en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, floatingLabel_en: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Título selector (ES)">
                <input
                  type="text"
                  value={settings.whatsapp.selectorTitle_es}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, selectorTitle_es: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Título selector (EN)">
                <input
                  type="text"
                  value={settings.whatsapp.selectorTitle_en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, selectorTitle_en: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Subtítulo selector (ES)">
                <textarea
                  rows={3}
                  value={settings.whatsapp.selectorSubtitle_es}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, selectorSubtitle_es: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="Subtítulo selector (EN)">
                <textarea
                  rows={3}
                  value={settings.whatsapp.selectorSubtitle_en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, selectorSubtitle_en: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="CTA región (ES)">
                <input
                  type="text"
                  value={settings.whatsapp.regionCtaLabel_es}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, regionCtaLabel_es: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
              <Field label="CTA región (EN)">
                <input
                  type="text"
                  value={settings.whatsapp.regionCtaLabel_en}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      whatsapp: { ...settings.whatsapp, regionCtaLabel_en: e.target.value },
                    })
                  }
                  className={inputClassName}
                />
              </Field>
            </div>
          </div>

          <div className="space-y-4">
            {regions.map((region) => (
              <div key={region.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    Región de WhatsApp
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRegion(region.id)}
                    className="inline-flex items-center gap-2 self-start rounded-2xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="ID">
                    <input
                      type="text"
                      value={region.id}
                      onChange={(e) => updateRegion(region.id, { id: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Slug / código">
                    <input
                      type="text"
                      value={region.slug}
                      onChange={(e) => updateRegion(region.id, { slug: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Nombre visible (ES)">
                    <input
                      type="text"
                      value={region.name_es}
                      onChange={(e) => updateRegion(region.id, { name_es: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Nombre visible (EN)">
                    <input
                      type="text"
                      value={region.name_en}
                      onChange={(e) => updateRegion(region.id, { name_en: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Número de WhatsApp">
                    <input
                      type="tel"
                      value={region.phoneNumber}
                      onChange={(e) => updateRegion(region.id, { phoneNumber: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Orden">
                    <input
                      type="number"
                      value={region.order}
                      onChange={(e) => updateRegion(region.id, { order: Number(e.target.value) || 0 })}
                      className={inputClassName}
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <ToggleCard
                      checked={region.isActive}
                      label="Región activa"
                      hint="Solo las regiones activas aparecen en el sitio y en el selector de WhatsApp."
                      onChange={(value) => updateRegion(region.id, { isActive: value })}
                    />
                  </div>
                  <Field label="Badge / disponibilidad (ES)">
                    <input
                      type="text"
                      value={region.availabilityLabel_es || ''}
                      onChange={(e) => updateRegion(region.id, { availabilityLabel_es: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Badge / disponibilidad (EN)">
                    <input
                      type="text"
                      value={region.availabilityLabel_en || ''}
                      onChange={(e) => updateRegion(region.id, { availabilityLabel_en: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Texto de apoyo (ES)">
                    <input
                      type="text"
                      value={region.helperText_es || ''}
                      onChange={(e) => updateRegion(region.id, { helperText_es: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Texto de apoyo (EN)">
                    <input
                      type="text"
                      value={region.helperText_en || ''}
                      onChange={(e) => updateRegion(region.id, { helperText_en: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Mensaje prellenado (ES)">
                    <textarea
                      rows={3}
                      value={region.prefilledMessage_es}
                      onChange={(e) => updateRegion(region.id, { prefilledMessage_es: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                  <Field label="Mensaje prellenado (EN)">
                    <textarea
                      rows={3}
                      value={region.prefilledMessage_en}
                      onChange={(e) => updateRegion(region.id, { prefilledMessage_en: e.target.value })}
                      className={inputClassName}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
