import { useEffect, useState } from 'react';
import { Save, Settings } from 'lucide-react';
import {
  getGlobalConfiguration,
  updateGlobalConfiguration,
} from '../services/globalSettings.service';

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
      alert('Configuración global guardada exitosamente');
    } catch (error) {
      console.error('Error saving global settings:', error);
      alert('No fue posible guardar la configuración global');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Configuración Global</h1>
          <p className="mt-2 text-sm text-gray-600">
            Controla la base operativa del sitio: idioma por defecto, estrategia de rutas y correos generales.
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

      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
        <div className="flex items-center gap-2 text-gray-900">
          <Settings className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-medium">Base administrable</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Idioma público por defecto</label>
            <select
              value={settings.default_public_language}
              onChange={(event) =>
                setSettings((current: any) => ({
                  ...current,
                  default_public_language: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="en">Inglés</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Modo raíz del dominio</label>
            <select
              value={settings.root_domain_language_mode}
              onChange={(event) =>
                setSettings((current: any) => ({
                  ...current,
                  root_domain_language_mode: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="default">Usar idioma por defecto</option>
              <option value="redirect">Redirigir según la configuración</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Estrategia de rutas localizadas</label>
            <select
              value={settings.localized_route_strategy}
              onChange={(event) =>
                setSettings((current: any) => ({
                  ...current,
                  localized_route_strategy: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="prefix">Prefijo por idioma</option>
              <option value="domain">Dominio por mercado</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Correo de marketing</label>
            <input
              type="email"
              value={settings.marketing_email || ''}
              onChange={(event) =>
                setSettings((current: any) => ({
                  ...current,
                  marketing_email: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Correo de careers</label>
            <input
              type="email"
              value={settings.careers_email || ''}
              onChange={(event) =>
                setSettings((current: any) => ({
                  ...current,
                  careers_email: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
