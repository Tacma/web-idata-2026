import { useEffect, useState } from 'react';
import { Globe2, Save, Settings, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import {
  getGlobalConfiguration,
  updateGlobalConfiguration,
} from '../services/globalSettings.service';

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

export function GlobalSettingsAdmin() {
  const [settings, setSettings] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getGlobalConfiguration();
        if (!cancelled) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error loading global settings:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    if (!settings) return;
    try {
      setSaving(true);
      const saved = await updateGlobalConfiguration(settings);
      setSettings(saved);
      alert('Configuración avanzada guardada correctamente');
    } catch (error) {
      console.error('Error saving global settings:', error);
      alert('No fue posible guardar la configuración avanzada');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.15),transparent_20%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_24%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Configuración avanzada</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              Reglas base del sitio y publicación
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Este módulo queda para decisiones operativas de idioma, routing y comportamiento base.
              Los datos editoriales como marca, contacto y redes ya viven en el centro de marca.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar configuración'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-2xl bg-[#4387DF]/10 p-3 text-[#4387DF]">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-slate-950">Comportamiento base</h2>
              <p className="mt-1 text-sm text-slate-500">
                Ajustes que definen cómo arranca el sitio y cómo resuelve idiomas y rutas.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="block text-sm font-medium text-slate-800">Idioma público por defecto</span>
              <select
                value={settings.default_public_language}
                onChange={(event) =>
                  setSettings((current: any) => ({
                    ...current,
                    default_public_language: event.target.value,
                  }))
                }
                className={inputClassName}
              >
                <option value="en">Inglés</option>
                <option value="es">Español</option>
              </select>
            </label>

            <label className="block space-y-2">
              <span className="block text-sm font-medium text-slate-800">Modo raíz del dominio</span>
              <select
                value={settings.root_domain_language_mode}
                onChange={(event) =>
                  setSettings((current: any) => ({
                    ...current,
                    root_domain_language_mode: event.target.value,
                  }))
                }
                className={inputClassName}
              >
                <option value="default">Usar idioma por defecto</option>
                <option value="redirect">Redirigir según la configuración</option>
              </select>
            </label>

            <label className="block space-y-2 md:col-span-2">
              <span className="block text-sm font-medium text-slate-800">Estrategia de rutas localizadas</span>
              <select
                value={settings.localized_route_strategy}
                onChange={(event) =>
                  setSettings((current: any) => ({
                    ...current,
                    localized_route_strategy: event.target.value,
                  }))
                }
                className={inputClassName}
              >
                <option value="prefix">Prefijo por idioma</option>
                <option value="domain">Dominio por mercado</option>
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Qué se mueve aquí y qué no</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Esta separación ayuda a que quien administra no termine tocando pantallas técnicas sin necesidad.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <span className="font-medium text-slate-900">Sí vive aquí:</span>
                <p className="mt-1">Idioma por defecto, reglas de rutas y modo de entrada del dominio.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <span className="font-medium text-slate-900">Ya no vive aquí:</span>
                <p className="mt-1">Redes, correos visibles, teléfonos y datos de marca; eso quedó en el centro de marca.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <Globe2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium">Atajos útiles</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Si lo que buscas es editar información visible para negocio o SEO, estos módulos son más directos.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm">
              <Link to="/admin/brand" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
                Ir a Marca y datos globales
              </Link>
              <Link to="/admin/integrations" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
                Ir a SEO, Google e integraciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
