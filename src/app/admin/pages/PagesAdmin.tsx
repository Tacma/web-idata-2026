import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, FileText, Pencil, Plus, Trash2 } from 'lucide-react';
import { getPageConnection, getPageRegistryEntry } from '../config/pageRegistry';
import {
  deletePage,
  getAllPages,
  updatePage,
} from '../services/pages.service';

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-700',
    archived: 'bg-red-100 text-red-700',
  };

  return styles[status] || styles.draft;
}

function connectionBadge(slug: string) {
  const connection = getPageConnection(slug);
  if (connection === 'live') {
    return 'bg-emerald-100 text-emerald-700';
  }
  if (connection === 'base') {
    return 'bg-amber-100 text-amber-700';
  }
  return 'bg-rose-100 text-rose-700';
}

function connectionLabel(slug: string) {
  const connection = getPageConnection(slug);
  if (connection === 'live') return 'Conectada';
  if (connection === 'base') return 'Base CMS';
  return 'No existe en front';
}

export function PagesAdmin() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPages();
      setPages(data);
    } catch (err: any) {
      setError(err?.message || 'No fue posible cargar las páginas.');
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleVisibility(page: any) {
    try {
      await updatePage(page.slug, {
        ...page,
        is_visible: !page.is_visible,
      });
      await loadPages();
    } catch (err) {
      console.error('Error toggling page visibility:', err);
    }
  }

  async function handleDelete(page: any) {
    if (!confirm(`¿Eliminar la página "${page.page_name}" y sus secciones?`)) return;

    try {
      await deletePage(page.slug);
      await loadPages();
    } catch (err) {
      console.error('Error deleting page:', err);
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-600">Cargando páginas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Páginas</h1>
          <p className="mt-2 text-sm text-gray-600">
            Registra páginas públicas, controla su visibilidad y verifica si ya existen realmente en el front o si siguen siendo solo base editorial del CMS.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/pages/new')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nueva página
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Página</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rutas</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Conexión</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Visibilidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Secciones</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.slug} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{page.page_name}</p>
                      <p className="text-xs text-gray-500">{page.slug}</p>
                      {!getPageRegistryEntry(page.slug) && (
                        <p className="mt-1 text-[11px] text-rose-600">No hay ruta pública registrada para esta página.</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-600">
                  <div>{page.route_es}</div>
                  <div>{page.route_en}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge(page.status)}`}>
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${connectionBadge(page.slug)}`}>
                    {connectionLabel(page.slug)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleVisibility(page)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                      page.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {page.is_visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {page.is_visible ? 'Visible' : 'Oculta'}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{page.sections_count || 0}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/pages/${page.slug}/edit`}
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      title="Editar página"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(page)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      title="Eliminar página"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {pages.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                  No hay páginas registradas todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
