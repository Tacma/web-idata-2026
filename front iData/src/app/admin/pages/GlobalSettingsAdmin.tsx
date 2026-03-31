import { Settings, Save } from 'lucide-react';

export function GlobalSettingsAdmin() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Configuración Global</h1>
          <p className="mt-2 text-sm text-gray-600">Configuraciones generales del sitio web</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información del sitio</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del sitio</label>
              <input
                type="text"
                defaultValue="iData Global"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>America/Mexico_City</option>
                <option>America/New_York</option>
                <option>Europe/Madrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idioma por defecto</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="en">Inglés</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Mantenimiento</h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="maintenance-mode"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="maintenance-mode" className="text-sm text-gray-700">
              Activar modo de mantenimiento (el sitio mostrará una página de mantenimiento)
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
