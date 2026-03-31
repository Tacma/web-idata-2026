import { useState, useEffect } from 'react';
import { Globe, Save } from 'lucide-react';
import { getMarketsSettings, saveMarketsSettings } from '../services/markets.service';

export function MarketsAdmin() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getMarketsSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading markets:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;
    try {
      setSaving(true);
      await saveMarketsSettings(settings);
      alert('Mercados guardados exitosamente');
    } catch (error) {
      console.error('Error saving markets:', error);
      alert('Error al guardar mercados');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Mercados y Dominios</h1>
          <p className="mt-2 text-sm text-gray-600">Gestiona los mercados geográficos y sus configuraciones</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mercado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Idioma</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dominio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {settings.markets?.map((market: any, index: number) => (
              <tr key={market.id}>
                <td className="px-6 py-4">
                  <Globe className="w-5 h-5 inline mr-2 text-blue-600" />
                  {market.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.code}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{market.language}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{market.domain}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={market.enabled}
                    onChange={(e) => {
                      const updated = [...settings.markets];
                      updated[index].enabled = e.target.checked;
                      setSettings({ ...settings, markets: updated });
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
