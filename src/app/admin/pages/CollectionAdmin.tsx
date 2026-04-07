import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CRUDList } from '../components/CRUDList';
import type { CollectionName } from '../../shared/types';
import { getCollectionConfig } from '../config/collections';
import { collectionExperience } from '../config/collectionExperience';

interface CollectionAdminProps {
  collectionName: CollectionName;
  title: string;
}

function getPrimaryTitle(item: any) {
  return item.title_es || item.title || item.name || item.page_name || item.client || item.clientName || 'Sin título';
}

function getSecondaryText(item: any) {
  return (
    item.slug ||
    item.slug_es ||
    item.category ||
    item.area ||
    item.location ||
    item.language ||
    item.route_es ||
    ''
  );
}

function getPublishedCount(items: any[]) {
  return items.filter((item) => (item.status || 'published') === 'published').length;
}

export function CollectionAdmin({ collectionName, title }: CollectionAdminProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const config = getCollectionConfig(collectionName);
  const experience = collectionExperience[collectionName];
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>((location.state as any)?.notice || null);

  useEffect(() => {
    void loadItems();
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

  const columns = useMemo(
    () => [
      {
        key: 'title' as any,
        label: 'Contenido',
        render: (item: any) => (
          <div className="min-w-0">
            <p className="font-medium text-slate-900">{getPrimaryTitle(item)}</p>
            {getSecondaryText(item) ? (
              <p className="mt-1 truncate text-xs text-slate-500">{getSecondaryText(item)}</p>
            ) : null}
          </div>
        ),
      },
      {
        key: 'status' as any,
        label: 'Estado',
        render: (item: any) => {
          const status = item.status || 'published';
          return (
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                status === 'published'
                  ? 'bg-emerald-100 text-emerald-700'
                  : status === 'draft'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-700'
              }`}
            >
              {status === 'published' ? 'Publicado' : status === 'draft' ? 'Borrador' : status}
            </span>
          );
        },
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
          <p className="text-slate-600">Cargando módulo...</p>
        </div>
      </div>
    );
  }

  const totalCount = items.length;
  const publishedCount = getPublishedCount(items);

  return (
    <div className="space-y-6">
      {notice && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </div>
      )}

      {deleteError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {deleteError}
        </div>
      )}

      {error && (
        <div className="rounded-[28px] border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No se pudo cargar {title.toLowerCase()}</h2>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <button
            onClick={() => void loadItems()}
            className="mt-4 inline-flex items-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.16),transparent_20%),radial-gradient(circle_at_top_right,rgba(196,181,253,0.18),transparent_24%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4387DF]/15 bg-[#4387DF]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#4387DF]">
              <span className="text-[#4387DF]">{experience.icon}</span>
              <span>Módulo editable</span>
            </div>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              {experience.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{experience.subtitle}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Registros</p>
              <p className="mt-1 text-2xl font-light text-slate-950">{totalCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Publicados</p>
              <p className="mt-1 text-2xl font-light text-slate-950">{publishedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {!error && (
        <CRUDList
          title={experience.title}
          subtitle={experience.subtitle}
          createLabel={experience.createLabel}
          searchPlaceholder={experience.searchPlaceholder}
          emptyTitle={experience.emptyTitle}
          emptyDescription={experience.emptyDescription}
          items={items}
          columns={columns}
          onCreate={() => navigate(`${config.basePath}/new`)}
          onEdit={(item) => navigate(`${config.basePath}/${item.id}/edit`)}
          onDelete={handleDelete}
          summary={
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Qué administras</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {experience.subtitle}
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Acción principal</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {experience.createLabel} para ampliar o actualizar la base visible del sitio.
                </p>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Registros cargados</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {totalCount} en total, {publishedCount} publicados y visibles según el estado actual.
                </p>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
