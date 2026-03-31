import { useState, useEffect } from 'react';
import { Menu, Save, Plus, Trash2 } from 'lucide-react';
import { getNavigationSettings, saveNavigationSettings } from '../services/navigation.service';

export function NavigationAdmin() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getNavigationSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading navigation:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;
    try {
      setSaving(true);
      await saveNavigationSettings(settings);
      alert('Navegación guardada exitosamente');
    } catch (error) {
      console.error('Error saving navigation:', error);
      alert('Error al guardar la navegación');
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
          <h1 className="text-3xl font-light text-gray-900">Navegación del Sitio</h1>
          <p className="mt-2 text-sm text-gray-600">Configura los menús principales y de pie de página</p>
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

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Menú principal (Español)</h2>
        <div className="space-y-2">
          {settings.mainMenu_es?.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <Menu className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const updated = [...settings.mainMenu_es];
                    updated[index].label = e.target.value;
                    setSettings({ ...settings, mainMenu_es: updated });
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  placeholder="Etiqueta"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => {
                    const updated = [...settings.mainMenu_es];
                    updated[index].url = e.target.value;
                    setSettings({ ...settings, mainMenu_es: updated });
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  placeholder="URL"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Menú principal (Inglés)</h2>
        <div className="space-y-2">
          {settings.mainMenu_en?.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
              <Menu className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const updated = [...settings.mainMenu_en];
                    updated[index].label = e.target.value;
                    setSettings({ ...settings, mainMenu_en: updated });
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  placeholder="Label"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => {
                    const updated = [...settings.mainMenu_en];
                    updated[index].url = e.target.value;
                    setSettings({ ...settings, mainMenu_en: updated });
                  }}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  placeholder="URL"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
