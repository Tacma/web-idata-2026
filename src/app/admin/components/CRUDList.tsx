import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CRUDListProps<T> {
  title: string;
  subtitle?: string;
  createLabel?: string;
  searchPlaceholder?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  summary?: ReactNode;
  items: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  onCreate?: () => void;
  renderCustomActions?: (item: T) => React.ReactNode;
}

export function CRUDList<T extends { id: string; status?: string }>({
  title,
  subtitle,
  createLabel = 'Crear nuevo',
  searchPlaceholder = 'Buscar...',
  emptyTitle = 'No hay registros',
  emptyDescription = 'Todavía no hay elementos en este módulo.',
  summary,
  items,
  columns,
  onEdit,
  onDelete,
  onView,
  onCreate,
  renderCustomActions,
}: CRUDListProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => {
    if (!searchTerm) return true;
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-[-0.04em] text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle || `${items.length} elementos en total`}</p>
        </div>
        {onCreate && (
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus className="w-5 h-5" />
            {createLabel}
          </button>
        )}
      </div>

      {summary ? summary : null}

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ui-select w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-500">
                    <p className="text-sm font-medium text-slate-700">{emptyTitle}</p>
                    <p className="mt-1 text-sm text-slate-500">{emptyDescription}</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-slate-50">
                    {columns.map((column, index) => (
                      <td key={index} className="px-6 py-4 text-sm text-slate-900">
                        {column.render 
                          ? column.render(item)
                          : String((item as any)[column.key] || '-')
                        }
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {renderCustomActions && renderCustomActions(item)}
                        {onView && (
                          <button
                            onClick={() => onView(item)}
                            className="text-slate-500 transition-colors hover:text-slate-900"
                            title="Ver"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-[#4387DF] transition-colors hover:text-[#3272c4]"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="text-red-600 transition-colors hover:text-red-900"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
