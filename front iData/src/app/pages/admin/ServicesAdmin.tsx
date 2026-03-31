import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { mockCollections } from '../../data/mockData';
import type { Service } from '../../types';

export function ServicesAdmin() {
  const [services] = useState<Service[]>(mockCollections.services);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">
            Manage your service offerings in multiple languages
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Service
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title (ES / EN)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => {
              const category = mockCollections.serviceCategories.find(c => c.id === service.categoryId);
              
              return (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{service.title_es}</div>
                    <div className="text-sm text-gray-500">{service.title_en}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {category?.title_en || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      service.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {service.featured && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {service.order}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
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

      {/* Form Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Collection Fields</h3>
        <p className="text-sm text-blue-800 mb-4">
          When creating or editing services, the following fields are available:
        </p>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li><strong>title_es</strong> / <strong>title_en</strong>: Service name in each language</li>
          <li><strong>slug_es</strong> / <strong>slug_en</strong>: URL-friendly identifier (e.g., "estrategia-datos" / "data-strategy")</li>
          <li><strong>excerpt_es</strong> / <strong>excerpt_en</strong>: Short description for listings</li>
          <li><strong>content_es</strong> / <strong>content_en</strong>: Full service description</li>
          <li><strong>categoryId</strong>: Link to service category</li>
          <li><strong>featuredImage</strong>: Hero image URL</li>
          <li><strong>featured</strong>: Show in featured sections (boolean)</li>
          <li><strong>order</strong>: Manual sort order (number)</li>
          <li><strong>status</strong>: "draft" or "published"</li>
          <li><strong>seo_es</strong> / <strong>seo_en</strong>: metaTitle, metaDescription, ogImage, keywords</li>
        </ul>
      </div>
    </div>
  );
}
