import { useEffect, useMemo, useRef, useState } from 'react';
import { Image as ImageIcon, RefreshCcw, Search, Trash2, Upload } from 'lucide-react';
import { GlassButton } from '../../shared/components/GlassButton';
import { GlassCard } from '../../shared/components/GlassCard';
import { deleteMediaItem, getMediaItems, type MediaItem, uploadMediaFile } from '../services/mediaLibrary.service';

function MediaThumb({
  item,
  deleting,
  onDelete,
}: {
  item: MediaItem;
  deleting: boolean;
  onDelete: (item: MediaItem) => void;
}) {
  const [size, setSize] = useState<string>('');

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <div className="flex h-44 items-center justify-center bg-slate-100 p-3">
        <img
          src={item.url}
          alt={item.label}
          className="h-full w-full object-contain"
          onLoad={(event) => {
            const image = event.currentTarget;
            setSize(`${image.naturalWidth} x ${image.naturalHeight}px`);
          }}
        />
      </div>
      <div className="space-y-1 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate text-sm font-medium text-slate-900">{item.label}</p>
          {item.deletable ? (
            <button
              type="button"
              onClick={() => onDelete(item)}
              disabled={deleting}
              className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`Borrar ${item.label}`}
              title="Borrar archivo"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <p className="text-xs text-slate-500">{item.source}</p>
        {size && <p className="text-xs text-slate-400">{size}</p>}
        <p className="truncate text-xs text-slate-400">{item.url}</p>
      </div>
    </div>
  );
}

export function MediaLibraryAdmin() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function load() {
    setLoading(true);
    try {
      const media = await getMediaItems();
      setItems(media);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item: MediaItem) {
    const confirmed = window.confirm(
      `Vas a borrar "${item.label}". Esta acción no se puede deshacer.\n\n¿Deseas continuar?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(item.id);
      setUploadError(null);
      await deleteMediaItem(item);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (error) {
      console.error('Error deleting media:', error);
      setUploadError(error instanceof Error ? error.message : 'No fue posible borrar el archivo.');
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleFilesSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    try {
      setUploading(true);
      setUploadError(null);

      const uploadedItems = await Promise.all(files.map((file) => uploadMediaFile(file)));
      setItems((current) => {
        const next = new Map<string, MediaItem>();
        [...uploadedItems, ...current].forEach((item) => next.set(item.url, item));
        return Array.from(next.values()).sort((a, b) => a.label.localeCompare(b.label));
      });
    } catch (error) {
      console.error('Error uploading media:', error);
      setUploadError(error instanceof Error ? error.message : 'No fue posible subir el archivo.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      `${item.label} ${item.source} ${item.url}`.toLowerCase().includes(normalized)
    );
  }, [items, query]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Biblioteca de Medios</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Aquí ves las imágenes que ya están siendo usadas por el sitio, por el CMS y las que subas directamente al
            bucket de medios. Desde el editor de secciones podrás escogerlas sin pegar URLs manualmente.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />
          <GlassButton
            type="button"
            variant="glass"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4" />
            {uploading ? 'Subiendo...' : 'Subir imagenes'}
          </GlassButton>
          <GlassButton type="button" variant="glass" size="sm" onClick={() => void load()}>
            <RefreshCcw className="h-4 w-4" />
            Recargar
          </GlassButton>
        </div>
      </div>

      {uploadError ? (
        <GlassCard variant="card" hover="none" className="rounded-[28px] p-4 text-sm text-red-700">
          {uploadError}
        </GlassCard>
      ) : null}

      <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, origen o URL"
              className="glass-input w-full rounded-2xl py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="text-sm text-slate-500">{filtered.length} imagenes</div>
        </div>
      </GlassCard>

      {loading ? (
        <GlassCard variant="card" hover="none" className="rounded-[28px] p-10 text-center text-sm text-slate-500">
          Cargando biblioteca...
        </GlassCard>
      ) : filtered.length === 0 ? (
        <GlassCard variant="card" hover="none" className="rounded-[28px] p-12 text-center">
          <ImageIcon className="mx-auto mb-4 h-12 w-12 text-slate-300" />
          <p className="text-sm text-slate-500">No se encontraron imágenes para ese filtro.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <MediaThumb
              key={item.id}
              item={item}
              deleting={deletingId === item.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
