import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CRUDList } from '../components/CRUDList';
import type { CollectionName } from '../../shared/types';
import { getCollectionConfig } from '../config/collections';

interface CollectionAdminProps {
  collectionName: CollectionName;
  title: string;
}

export function CollectionAdmin({ collectionName, title }: CollectionAdminProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const config = getCollectionConfig(collectionName);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>((location.state as any)?.notice || null);

  useEffect(() => {
    loadItems();
  }, [collectionName]);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(timeout);
  }, [notice]);

  async function loadItems() {
    try {
      setLoading(true);
      setError(null);
      const data = await config.getAll();
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
      setError((error as any)?.message || 'No fue posible cargar los datos reales de este módulo.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item: any) {
    if (!confirm('¿Estás seguro de eliminar este elemento?')) return;
    
    try {
      setDeleteError(null);
      await config.remove(item.id);
      await loadItems();
      setNotice(`${config.singularTitle} eliminado correctamente.`);
    } catch (error) {
      console.error('Error deleting item:', error);
      setDeleteError((error as any)?.message || 'No fue posible eliminar el registro.');
    }
  }

  const columns = [
    {
      key: 'title' as any,
      label: 'Título',
      render: (item: any) => item.title_es || item.title || item.name || item.page_name || item.client || item.clientName || 'Sin título'
    },
    {
      key: 'status' as any,
      label: 'Estado',
      render: (item: any) => {
        const status = item.status || 'published';
        return (
          <span className={`px-2 py-1 text-xs rounded-full ${
            status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status === 'published' ? 'Publicado' : 'Borrador'}
          </span>
        );
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notice && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {notice}
        </div>
      )}

      {deleteError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {deleteError}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">No se pudo cargar {title.toLowerCase()}</h2>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <button
            onClick={loadItems}
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      )}

      <CRUDList
        title={title}
        items={items}
        columns={columns}
        onCreate={() => navigate(`${config.basePath}/new`)}
        onEdit={(item) => navigate(`${config.basePath}/${item.id}/edit`)}
        onDelete={handleDelete}
      />

      {!error && items.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900">No hay registros</h2>
          <p className="mt-2 text-sm text-gray-600">{config.emptyMessage}</p>
          <button
            onClick={() => navigate(`${config.basePath}/new`)}
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Crear primer registro
          </button>
        </div>
      )}
    </div>
  );
}
