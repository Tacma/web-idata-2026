import { useState, useEffect } from 'react';
import { Link2, Plus, Trash2 } from 'lucide-react';
import { getAllRedirects, createRedirect, deleteRedirect } from '../services/redirects.service';

export function RedirectsAdmin() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRedirects();
  }, []);

  async function loadRedirects() {
    try {
      const data = await getAllRedirects();
      setRedirects(data);
    } catch (error) {
      console.error('Error loading redirects:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Eliminar esta redirección?')) return;
    try {
      await deleteRedirect(id);
      await loadRedirects();
    } catch (error) {
      console.error('Error deleting redirect:', error);
    }
  }

  if (loading) {
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
          <h1 className="text-3xl font-light text-gray-900">Redirecciones</h1>
          <p className="mt-2 text-sm text-gray-600">Gestiona las redirecciones 301/302 del sitio</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Crear redirección
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {redirects.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Link2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No hay redirecciones configuradas</p>
            <p className="text-sm mt-2">Las redirecciones ayudan a mantener el SEO al cambiar URLs</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Desde</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hacia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {redirects.map((redirect) => (
                <tr key={redirect.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{redirect.from || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{redirect.to || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{redirect.type || '301'}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(redirect.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
