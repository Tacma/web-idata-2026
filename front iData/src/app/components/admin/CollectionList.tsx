import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import type { BaseEntity, Status } from '../../types';

interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
}

interface CollectionListProps<T extends BaseEntity> {
  title: string;
  description: string;
  items: T[];
  columns: Column<T>[];
  onNew?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

export function CollectionList<T extends BaseEntity>({
  title,
  description,
  items,
  columns,
  onNew,
  onEdit,
  onDelete,
  onView,
}: CollectionListProps<T>) {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        {onNew && (
          <button
            onClick={onNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New {title.slice(0, -1)}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render(item)}
                  </td>
                ))}
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    {onView && (
                      <button
                        onClick={() => onView(item)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {items.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center mt-4">
          <p className="text-gray-500 mb-4">No items found</p>
          {onNew && (
            <button
              onClick={onNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create First Item
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        status === 'published'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {status}
    </span>
  );
}

export function BilingualText({ textEs, textEn }: { textEs: string; textEn: string }) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-900">{textEs}</div>
      <div className="text-sm text-gray-500">{textEn}</div>
    </div>
  );
}
