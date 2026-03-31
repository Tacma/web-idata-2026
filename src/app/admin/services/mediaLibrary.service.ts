import { supabase } from '../../../lib/supabaseClient';
import { DATA_PROVIDER } from '../config/dataProvider';
import { getSettings, saveSettings } from './localStorage.service';

export interface MediaItem {
  id: string;
  url: string;
  label: string;
  source: string;
  deletable?: boolean;
}

const IMAGE_EXTENSION_RE = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const MEDIA_BUCKET = 'media-library';
const LOCAL_MEDIA_SOURCE = 'Media uploads';
const publicAssetModules = import.meta.glob('/public/assets/**/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

interface LocalUploadedMediaItem {
  id: string;
  url: string;
  label: string;
  source: string;
  createdAt: string;
}

function normalizeAssetUrl(value: string) {
  if (!value) return '';
  if (value.startsWith('/public/')) {
    return value.replace('/public', '');
  }
  return value;
}

function isImageExtension(value: string) {
  const withoutQuery = value.split('?')[0].split('#')[0];
  return IMAGE_EXTENSION_RE.test(withoutQuery);
}

function isImageLike(value: string) {
  return (
    ((value.startsWith('/assets/') ||
      value.startsWith('http://') ||
      value.startsWith('https://')) &&
      isImageExtension(value)) ||
    value.startsWith('data:image/')
  );
}

function extractImagesFromValue(value: any, source: string, results: MediaItem[]) {
  if (!value) return;

  if (typeof value === 'string') {
    if (isImageLike(value)) {
      const fileName = value.split('/').pop() || value;
      results.push({
        id: `${source}:${value}`,
        url: value,
        label: fileName,
        source,
        deletable: false,
      });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => extractImagesFromValue(entry, source, results));
    return;
  }

  if (typeof value === 'object') {
    Object.values(value).forEach((entry) => extractImagesFromValue(entry, source, results));
  }
}

async function safeSelect(table: string, columns: string, source: string) {
  const { data, error } = await supabase.from(table).select(columns);
  if (error) {
    console.error(`Error loading media from ${table}:`, error);
    return [] as MediaItem[];
  }

  const results: MediaItem[] = [];
  for (const row of data || []) {
    extractImagesFromValue(row, source, results);
  }
  return results;
}

function getPublicAssetItems(): MediaItem[] {
  return Object.entries(publicAssetModules).map(([path, moduleValue]) => {
    const fileName = path.split('/').pop() || path;
    const normalizedUrl = normalizeAssetUrl(String(moduleValue));
    return {
      id: `public:${normalizedUrl}`,
      url: normalizedUrl,
      label: fileName,
      source: 'Public assets',
      deletable: false,
    };
  });
}

function sanitizeFileName(value: string) {
  const extension = value.split('.').pop()?.toLowerCase() || 'png';
  const base = value
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return `${base || 'media'}-${Date.now()}.${extension}`;
}

function getLocalUploadedMediaItems(): MediaItem[] {
  const items = getSettings<LocalUploadedMediaItem[]>('uploaded_media') || [];
  return items.map((item) => ({
    id: item.id,
    url: item.url,
    label: item.label,
    source: item.source || LOCAL_MEDIA_SOURCE,
    deletable: true,
  }));
}

function saveLocalUploadedMediaItems(items: LocalUploadedMediaItem[]) {
  saveSettings('uploaded_media', items);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('No fue posible leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

async function uploadMediaFileToLocalStore(file: File): Promise<MediaItem> {
  const fileName = sanitizeFileName(file.name);
  const dataUrl = await readFileAsDataUrl(file);
  const item: LocalUploadedMediaItem = {
    id: `local:${fileName}`,
    url: dataUrl,
    label: file.name,
    source: LOCAL_MEDIA_SOURCE,
    createdAt: new Date().toISOString(),
  };

  const existing = getSettings<LocalUploadedMediaItem[]>('uploaded_media') || [];
  saveLocalUploadedMediaItems([item, ...existing]);

  return {
    id: item.id,
    url: item.url,
    label: item.label,
    source: item.source,
    deletable: true,
  };
}

async function listBucketFolder(path = ''): Promise<MediaItem[]> {
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(path, {
    limit: 100,
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error) {
    console.error(`Error listing storage folder "${path}":`, error);
    return [];
  }

  const results: MediaItem[] = [];

  for (const entry of data || []) {
    const childPath = path ? `${path}/${entry.name}` : entry.name;

    if (!entry.id) {
      const nested = await listBucketFolder(childPath);
      results.push(...nested);
      continue;
    }

    if (!isImageExtension(entry.name)) continue;

    const { data: publicUrlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(childPath);
    results.push({
      id: `storage:${childPath}`,
      url: publicUrlData.publicUrl,
      label: entry.name,
      source: 'Media uploads',
      deletable: true,
    });
  }

  return results;
}

export async function getMediaItems(): Promise<MediaItem[]> {
  const groups = await Promise.all([
    safeSelect('home_sections', 'id, config, content', 'Home sections'),
    safeSelect('services', 'id, hero_image, featured_image', 'Services'),
    safeSelect('partners', 'id, logo_url', 'Partners'),
    safeSelect('case_studies', 'id, cover_image, client_logo_url', 'Case studies'),
    safeSelect('industries', 'id, featured_image', 'Industries'),
    safeSelect('resources', 'id, featured_image, file_url, download_url', 'Resources'),
    safeSelect('blog_posts', 'id, featured_image', 'Insights'),
    safeSelect('team_members', 'id, photo_url', 'Team members'),
    safeSelect('testimonials', 'id, photo_url', 'Testimonials'),
    DATA_PROVIDER === 'mock' ? Promise.resolve(getLocalUploadedMediaItems()) : listBucketFolder(),
  ]);

  const publicAssets = getPublicAssetItems();
  const byUrl = new Map<string, MediaItem>();
  for (const group of [...groups, publicAssets]) {
    for (const item of group) {
      if (!byUrl.has(item.url)) {
        byUrl.set(item.url, item);
      }
    }
  }

  return Array.from(byUrl.values()).sort((a, b) => a.label.localeCompare(b.label));
}

export async function uploadMediaFile(file: File): Promise<MediaItem> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Solo se permiten archivos de imagen.');
  }

  if (DATA_PROVIDER === 'mock') {
    return uploadMediaFileToLocalStore(file);
  }

  const fileName = sanitizeFileName(file.name);
  const path = `uploads/${new Date().toISOString().slice(0, 10)}/${fileName}`;

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'image/png',
  });

  if (error) {
    if (error.message.toLowerCase().includes('bucket')) {
      return uploadMediaFileToLocalStore(file);
    }
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);

  return {
    id: `storage:${path}`,
    url: data.publicUrl,
    label: file.name,
    source: 'Media uploads',
    deletable: true,
  };
}

export async function deleteMediaItem(item: MediaItem): Promise<void> {
  if (!item.deletable) {
    throw new Error('Este archivo no se puede borrar desde la biblioteca de medios.');
  }

  if (item.id.startsWith('local:')) {
    const existing = getSettings<LocalUploadedMediaItem[]>('uploaded_media') || [];
    saveLocalUploadedMediaItems(existing.filter((entry) => entry.id !== item.id));
    return;
  }

  if (item.id.startsWith('storage:')) {
    const storagePath = item.id.replace(/^storage:/, '');
    const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([storagePath]);

    if (error) {
      throw new Error(error.message || 'No fue posible borrar el archivo en Supabase Storage.');
    }
    return;
  }

  throw new Error('No se reconoce el tipo de archivo a borrar.');
}
