import { FileText, Plus, Search, Edit, Eye, Trash2, Globe } from 'lucide-react';
import { Link } from 'react-router';

// Mock data - In production, this would come from API/database
const pages = [
  {
    id: '1',
    page_name: 'Home',
    route_es: '/es/',
    route_en: '/en/',
    status: 'published',
    last_updated: '2026-03-12T10:30:00Z',
    market_visibility: 'all',
  },
  {
    id: '2',
    page_name: 'About',
    route_es: '/es/nosotros/',
    route_en: '/en/about/',
    status: 'published',
    last_updated: '2026-03-10T14:20:00Z',
    market_visibility: 'all',
  },
  {
    id: '3',
    page_name: 'Contact',
    route_es: '/es/contacto/',
    route_en: '/en/contact/',
    status: 'published',
    last_updated: '2026-03-13T09:15:00Z',
    market_visibility: 'all',
  },
  {
    id: '4',
    page_name: 'Careers Landing',
    route_es: '/es/trabaja-con-nosotros/',
    route_en: '/en/work-with-us/',
    status: 'published',
    last_updated: '2026-03-08T16:45:00Z',
    market_visibility: 'all',
  },
];

const getStatusBadge = (status: string) => {
  const config = {
    published: { label: 'Publicado', color: 'bg-green-100 text-green-700' },
    draft: { label: 'Borrador', color: 'bg-gray-100 text-gray-700' },
    review: { label: 'En revisión', color: 'bg-yellow-100 text-yellow-700' },
    archived: { label: 'Archivado', color: 'bg-red-100 text-red-700' },
  };
  
  return config[status as keyof typeof config] || config.draft;
};

export function PagesAdmin() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Páginas</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gestiona páginas estáticas y semi-estáticas del sitio
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Nueva página
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar páginas..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">Todos los estados</option>
            <option value="published">Publicado</option>
            <option value="draft">Borrador</option>
            <option value="review">En revisión</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Página
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rutas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visibilidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última actualización
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => {
              const statusBadge = getStatusBadge(page.status);
              
              return (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{page.page_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">ES:</span> {page.route_es}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">EN:</span> {page.route_en}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="capitalize">{page.market_visibility}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(page.last_updated).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Sobre el módulo de páginas</h3>
        <p className="text-sm text-blue-700">
          Las páginas son secciones de contenido estático o semi-estático como Home, Nosotros, Contacto y landing de Carreras.
          Cada página soporta contenido bilingüe (ES/EN), bloques de contenido modulares, configuración SEO y reglas de visibilidad por mercado.
        </p>
      </div>
    </div>
  );
}
