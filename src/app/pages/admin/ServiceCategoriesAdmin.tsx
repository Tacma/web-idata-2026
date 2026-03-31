import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { mockCollections } from '../../data/mockData';
import type { ServiceCategory } from '../../types';

export function ServiceCategoriesAdmin() {
  const [categories] = useState<ServiceCategory[]>(mockCollections.serviceCategories);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Categories</h1>
          <p className="text-gray-600 mt-2">
            Manage SEO clusters for service organization
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title (ES / EN)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
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
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">{category.categorySlug}</code>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{category.title_es}</div>
                  <div className="text-sm text-gray-500">{category.title_en}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    category.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {category.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {category.order}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors p-1">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Service Category Fields</h3>
        <p className="text-sm text-blue-800 mb-4">
          Categories are fixed SEO clusters with the following structure:
        </p>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li><strong>categorySlug</strong>: Fixed slug (strategy-consulting, data-delivery, data-operations, cloud-services)</li>
          <li><strong>title_es</strong> / <strong>title_en</strong>: Category name</li>
          <li><strong>description_es</strong> / <strong>description_en</strong>: Category description</li>
          <li><strong>icon</strong>: Optional icon identifier</li>
          <li><strong>order</strong>: Display order</li>
          <li><strong>seo_es</strong> / <strong>seo_en</strong>: SEO metadata per language</li>
        </ul>
      </div>
    </div>
  );
}
