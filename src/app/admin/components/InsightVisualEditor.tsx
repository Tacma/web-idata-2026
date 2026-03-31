import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, ImagePlus, Plus, Search, Trash2 } from 'lucide-react';
import type { ContentBlock, ContentBlockType } from '../../types/content-blocks';
import { GlassButton } from '../../shared/components/GlassButton';
import { GlassCard } from '../../shared/components/GlassCard';
import { getMediaItems, type MediaItem } from '../services/mediaLibrary.service';
import { getAllBlogCategories } from '../services/blogCategories.service';

interface InsightVisualEditorProps {
  title: string;
  helperText?: string | null;
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  backHref?: string | null;
  backLabel?: string;
}

type Language = 'es' | 'en';
type PickerTarget =
  | { kind: 'featured' }
  | { kind: 'block'; index: number; field: string };

const BLOCK_TYPE_OPTIONS: Array<{ value: ContentBlockType; label: string }> = [
  { value: 'text', label: 'Texto' },
  { value: 'subtext', label: 'Subtexto' },
  { value: 'image', label: 'Imagen' },
  { value: 'image_text', label: 'Imagen con texto' },
  { value: 'hero_image', label: 'Imagen hero' },
  { value: 'list', label: 'Lista' },
  { value: 'quote', label: 'Cita' },
  { value: 'stats', label: 'Métricas' },
  { value: 'buttons', label: 'Botones' },
  { value: 'links', label: 'Enlaces' },
  { value: 'embed', label: 'Embed' },
  { value: 'download', label: 'Descarga' },
  { value: 'divider', label: 'Divisor' },
];

function isImageLike(value: string) {
  return (
    value.startsWith('/assets/') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:image/')
  );
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function reindexBlocks(blocks: ContentBlock[]) {
  return blocks.map((block, index) => ({ ...block, order: index + 1 }));
}

function parseCsv(value: string) {
  return (value || '')
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBlockArray(value: unknown): ContentBlock[] {
  if (Array.isArray(value)) {
    return reindexBlocks([...value].sort((a, b) => (a.order || 0) - (b.order || 0)) as ContentBlock[]);
  }

  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return reindexBlocks([...parsed].sort((a, b) => (a.order || 0) - (b.order || 0)) as ContentBlock[]);
      }
    } catch (error) {
      console.error('Error parsing content blocks JSON:', error);
    }
  }

  return [];
}

function createEmptyBlock(type: ContentBlockType): ContentBlock {
  const id = createId(type);
  switch (type) {
    case 'text':
      return { id, block_type: 'text', order: 0, title_es: '', title_en: '', text_es: '', text_en: '' };
    case 'subtext':
      return { id, block_type: 'subtext', order: 0, text_es: '', text_en: '' };
    case 'image':
      return { id, block_type: 'image', order: 0, image: '', alt_text_es: '', alt_text_en: '', caption_es: '', caption_en: '', size_variant: 'large' };
    case 'image_text':
      return { id, block_type: 'image_text', order: 0, image: '', image_position: 'left', title_es: '', title_en: '', text_es: '', text_en: '', caption_es: '', caption_en: '' };
    case 'hero_image':
      return { id, block_type: 'hero_image', order: 0, image: '', alt_text_es: '', alt_text_en: '', caption_es: '', caption_en: '' };
    case 'list':
      return { id, block_type: 'list', order: 0, title_es: '', title_en: '', items_es: [], items_en: [] };
    case 'quote':
      return { id, block_type: 'quote', order: 0, quote_es: '', quote_en: '', author_name: '', author_role_es: '', author_role_en: '' };
    case 'stats':
      return { id, block_type: 'stats', order: 0, title_es: '', title_en: '', stats: [{ value: '', label_es: '', label_en: '', description_es: '', description_en: '' }] };
    case 'buttons':
      return { id, block_type: 'buttons', order: 0, title_es: '', title_en: '', buttons: [{ label_es: '', label_en: '', url: '', style_variant: 'primary' }] };
    case 'links':
      return { id, block_type: 'links', order: 0, title_es: '', title_en: '', links: [{ label_es: '', label_en: '', url: '', description_es: '', description_en: '' }] };
    case 'embed':
      return { id, block_type: 'embed', order: 0, embed_url: '', title_es: '', title_en: '', caption_es: '', caption_en: '' };
    case 'download':
      return { id, block_type: 'download', order: 0, title_es: '', title_en: '', file_url: '', button_label_es: '', button_label_en: '', description_es: '', description_en: '' };
    case 'divider':
      return { id, block_type: 'divider', order: 0 };
    default:
      return { id, block_type: 'text', order: 0, title_es: '', title_en: '', text_es: '', text_en: '' };
  }
}

function blockTypeLabel(type: ContentBlockType) {
  return BLOCK_TYPE_OPTIONS.find((option) => option.value === type)?.label || type;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4387DF]/20 ${props.className || ''}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4387DF]/20 ${props.className || ''}`}
    />
  );
}

function FieldLabel({ children, required = false }: { children: string; required?: boolean }) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function ImagePreview({ src }: { src?: string }) {
  const [size, setSize] = useState('');

  if (!src || !isImageLike(src)) {
    return (
      <div className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2">
          <ImagePlus className="h-4 w-4" />
          Sin imagen
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <div className="flex h-36 items-center justify-center p-3">
        <img
          src={src}
          alt="Preview"
          className="h-full w-full object-contain"
          onLoad={(event) => {
            const image = event.currentTarget;
            setSize(`${image.naturalWidth} x ${image.naturalHeight}px`);
          }}
        />
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
        <span className="truncate">{src}</span>
        {size && <span className="shrink-0 pl-3">{size}</span>}
      </div>
    </div>
  );
}

function BlockImageField({
  label,
  value,
  onChange,
  onPick,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onPick: () => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <FieldLabel>{label}</FieldLabel>
        <TextInput value={value} onChange={(event) => onChange(event.target.value)} placeholder="/assets/... o URL" />
      </div>
      <div className="flex flex-wrap gap-2">
        <GlassButton type="button" variant="glass" size="sm" onClick={onPick}>
          Elegir imagen
        </GlassButton>
        {value ? (
          <GlassButton type="button" variant="glass" size="sm" onClick={() => onChange('')}>
            Limpiar
          </GlassButton>
        ) : null}
      </div>
      <ImagePreview src={value} />
    </div>
  );
}

export function InsightVisualEditor({
  title,
  helperText = null,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar insight',
  cancelLabel = 'Cancelar',
  isSubmitting = false,
  errorMessage = null,
  backHref = null,
  backLabel = 'Volver al listado',
}: InsightVisualEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>('es');
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => parseBlockArray(initialValues.content_blocks_json));
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const [mediaQuery, setMediaQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => parseCsv(String(initialValues.category_ids_csv || '')));
  const [selectedTags, setSelectedTags] = useState<string[]>(() => parseCsv(String(initialValues.tags_csv || '')));
  const [newBlockType, setNewBlockType] = useState<ContentBlockType>('text');

  useEffect(() => {
    setValues(initialValues);
    setBlocks(parseBlockArray(initialValues.content_blocks_json));
    setSelectedCategories(parseCsv(String(initialValues.category_ids_csv || '')));
    setSelectedTags(parseCsv(String(initialValues.tags_csv || '')));
  }, [initialValues]);

  useEffect(() => {
    void getMediaItems().then(setMediaItems).catch((error) => console.error('Error loading media items:', error));
    void getAllBlogCategories({ status: 'published' })
      .then(setCategoryOptions)
      .catch((error) => console.error('Error loading blog categories:', error));
  }, []);

  const filteredMedia = useMemo(() => {
    const query = mediaQuery.trim().toLowerCase();
    if (!query) return mediaItems;
    return mediaItems.filter((item) =>
      `${item.label} ${item.source} ${item.url}`.toLowerCase().includes(query)
    );
  }, [mediaItems, mediaQuery]);

  const updateValue = (name: string, value: any) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const updateBlock = (index: number, updater: (block: ContentBlock) => ContentBlock) => {
    setBlocks((current) => reindexBlocks(current.map((block, currentIndex) => (currentIndex === index ? updater(block) : block))));
  };

  const updateBlockField = (index: number, field: string, value: any) => {
    updateBlock(index, (block) => ({ ...block, [field]: value } as ContentBlock));
  };

  const updateLocalizedBlockField = (index: number, baseField: string, value: any) => {
    updateBlockField(index, `${baseField}_${activeLanguage}`, value);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    setBlocks((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const clone = [...current];
      const [block] = clone.splice(index, 1);
      clone.splice(nextIndex, 0, block);
      return reindexBlocks(clone);
    });
  };

  const removeBlock = (index: number) => {
    setBlocks((current) => reindexBlocks(current.filter((_, currentIndex) => currentIndex !== index)));
  };

  const addBlock = () => {
    setBlocks((current) => reindexBlocks([...current, createEmptyBlock(newBlockType)]));
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const openPicker = (target: PickerTarget) => {
    setPickerTarget(target);
    setPickerOpen(true);
  };

  const applyPickedMedia = (url: string) => {
    if (!pickerTarget) return;

    if (pickerTarget.kind === 'featured') {
      updateValue('featured_image', url);
    } else {
      updateBlockField(pickerTarget.index, pickerTarget.field, url);
    }

    setPickerOpen(false);
    setPickerTarget(null);
    setMediaQuery('');
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await onSubmit({
      ...values,
      category_ids_csv: selectedCategories.join(', '),
      tags_csv: selectedTags.join(', '),
      content_blocks_json: blocks.length > 0 ? JSON.stringify(reindexBlocks(blocks), null, 2) : '',
    });
  }

  const renderBlockEditor = (block: ContentBlock, index: number) => {
    const localizedSuffix = activeLanguage.toUpperCase();

    switch (block.block_type) {
      case 'text':
        return (
          <div className="grid gap-4">
            <div>
              <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
              <TextInput
                value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>{`Texto ${localizedSuffix}`}</FieldLabel>
              <TextArea
                rows={8}
                value={block[`text_${activeLanguage}` as 'text_es' | 'text_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'text', event.target.value)}
                placeholder="Puedes pegar texto enriquecido o HTML simple."
              />
            </div>
          </div>
        );

      case 'subtext':
        return (
          <div>
            <FieldLabel>{`Subtexto ${localizedSuffix}`}</FieldLabel>
            <TextArea
              rows={4}
              value={block[`text_${activeLanguage}` as 'text_es' | 'text_en'] || ''}
              onChange={(event) => updateLocalizedBlockField(index, 'text', event.target.value)}
            />
          </div>
        );

      case 'image':
      case 'hero_image':
        return (
          <div className="grid gap-4">
            <BlockImageField
              label="Imagen"
              value={String(block.image || '')}
              onChange={(value) => updateBlockField(index, 'image', value)}
              onPick={() => openPicker({ kind: 'block', index, field: 'image' })}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{`Texto alternativo ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`alt_text_${activeLanguage}` as 'alt_text_es' | 'alt_text_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'alt_text', event.target.value)}
                />
              </div>
              <div>
                <FieldLabel>{`Caption ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`caption_${activeLanguage}` as 'caption_es' | 'caption_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'caption', event.target.value)}
                />
              </div>
            </div>
            {block.block_type === 'image' ? (
              <div>
                <FieldLabel>Tamaño</FieldLabel>
                <select
                  value={block.size_variant || 'large'}
                  onChange={(event) => updateBlockField(index, 'size_variant', event.target.value)}
                  className="glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            ) : null}
          </div>
        );

      case 'image_text':
        return (
          <div className="grid gap-4">
            <BlockImageField
              label="Imagen"
              value={String(block.image || '')}
              onChange={(value) => updateBlockField(index, 'image', value)}
              onPick={() => openPicker({ kind: 'block', index, field: 'image' })}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Posición</FieldLabel>
                <select
                  value={block.image_position || 'left'}
                  onChange={(event) => updateBlockField(index, 'image_position', event.target.value)}
                  className="glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900"
                >
                  <option value="left">Izquierda</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
              <div>
                <FieldLabel>{`Caption ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`caption_${activeLanguage}` as 'caption_es' | 'caption_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'caption', event.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
              <TextInput
                value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>{`Texto ${localizedSuffix}`}</FieldLabel>
              <TextArea
                rows={8}
                value={block[`text_${activeLanguage}` as 'text_es' | 'text_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'text', event.target.value)}
              />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="grid gap-4">
            <div>
              <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
              <TextInput
                value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
              />
            </div>
            <div>
              <FieldLabel>{`Ítems ${localizedSuffix}`}</FieldLabel>
              <TextArea
                rows={8}
                value={(block[`items_${activeLanguage}` as 'items_es' | 'items_en'] || []).join('\n')}
                onChange={(event) => updateBlockField(index, `items_${activeLanguage}`, parseCsv(event.target.value))}
                placeholder="Un ítem por línea"
              />
            </div>
          </div>
        );

      case 'quote':
        return (
          <div className="grid gap-4">
            <div>
              <FieldLabel>{`Cita ${localizedSuffix}`}</FieldLabel>
              <TextArea
                rows={5}
                value={block[`quote_${activeLanguage}` as 'quote_es' | 'quote_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'quote', event.target.value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Autor</FieldLabel>
                <TextInput
                  value={block.author_name || ''}
                  onChange={(event) => updateBlockField(index, 'author_name', event.target.value)}
                />
              </div>
              <div>
                <FieldLabel>{`Rol ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`author_role_${activeLanguage}` as 'author_role_es' | 'author_role_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'author_role', event.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-4">
            <div>
              <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
              <TextInput
                value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
              />
            </div>
            <div className="space-y-3">
              {block.stats.map((stat, statIndex) => (
                <div key={`${block.id}-stat-${statIndex}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700">Métrica {statIndex + 1}</p>
                    <button
                      type="button"
                      onClick={() => updateBlockField(index, 'stats', block.stats.filter((_, currentIndex) => currentIndex !== statIndex))}
                      className="text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <TextInput
                      value={stat.value || ''}
                      onChange={(event) =>
                        updateBlockField(
                          index,
                          'stats',
                          block.stats.map((item, currentIndex) =>
                            currentIndex === statIndex ? { ...item, value: event.target.value } : item
                          )
                        )
                      }
                      placeholder="Valor"
                    />
                    <TextInput
                      value={stat[`label_${activeLanguage}` as 'label_es' | 'label_en'] || ''}
                      onChange={(event) =>
                        updateBlockField(
                          index,
                          'stats',
                          block.stats.map((item, currentIndex) =>
                            currentIndex === statIndex ? { ...item, [`label_${activeLanguage}`]: event.target.value } : item
                          )
                        )
                      }
                      placeholder={`Label ${localizedSuffix}`}
                    />
                    <TextInput
                      value={stat[`description_${activeLanguage}` as 'description_es' | 'description_en'] || ''}
                      onChange={(event) =>
                        updateBlockField(
                          index,
                          'stats',
                          block.stats.map((item, currentIndex) =>
                            currentIndex === statIndex ? { ...item, [`description_${activeLanguage}`]: event.target.value } : item
                          )
                        )
                      }
                      placeholder={`Descripción ${localizedSuffix}`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <GlassButton
              type="button"
              variant="glass"
              size="sm"
              onClick={() =>
                updateBlockField(index, 'stats', [
                  ...block.stats,
                  { value: '', label_es: '', label_en: '', description_es: '', description_en: '' },
                ])
              }
            >
              <Plus className="h-4 w-4" />
              Agregar métrica
            </GlassButton>
          </div>
        );

      case 'buttons':
        return (
          <div className="space-y-4">
            <div>
              <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
              <TextInput
                value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
              />
            </div>
            {block.buttons.map((button, buttonIndex) => (
              <div key={`${block.id}-button-${buttonIndex}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Botón {buttonIndex + 1}</p>
                  <button
                    type="button"
                    onClick={() => updateBlockField(index, 'buttons', block.buttons.filter((_, currentIndex) => currentIndex !== buttonIndex))}
                    className="text-sm font-medium text-red-500 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <TextInput
                    value={button[`label_${activeLanguage}` as 'label_es' | 'label_en'] || ''}
                    onChange={(event) =>
                      updateBlockField(
                        index,
                        'buttons',
                        block.buttons.map((item, currentIndex) =>
                          currentIndex === buttonIndex ? { ...item, [`label_${activeLanguage}`]: event.target.value } : item
                        )
                      )
                    }
                    placeholder={`Label ${localizedSuffix}`}
                  />
                  <TextInput
                    value={button.url || ''}
                    onChange={(event) =>
                      updateBlockField(
                        index,
                        'buttons',
                        block.buttons.map((item, currentIndex) =>
                          currentIndex === buttonIndex ? { ...item, url: event.target.value } : item
                        )
                      )
                    }
                    placeholder="URL"
                  />
                  <select
                    value={button.style_variant || 'primary'}
                    onChange={(event) =>
                      updateBlockField(
                        index,
                        'buttons',
                        block.buttons.map((item, currentIndex) =>
                          currentIndex === buttonIndex ? { ...item, style_variant: event.target.value } : item
                        )
                      )
                    }
                    className="glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
              </div>
            ))}
            <GlassButton
              type="button"
              variant="glass"
              size="sm"
              onClick={() =>
                updateBlockField(index, 'buttons', [
                  ...block.buttons,
                  { label_es: '', label_en: '', url: '', style_variant: 'primary' },
                ])
              }
            >
              <Plus className="h-4 w-4" />
              Agregar botón
            </GlassButton>
          </div>
        );

      case 'links':
        return (
          <div className="space-y-4">
            <div>
              <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
              <TextInput
                value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
              />
            </div>
            {block.links.map((linkItem, linkIndex) => (
              <div key={`${block.id}-link-${linkIndex}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-700">Enlace {linkIndex + 1}</p>
                  <button
                    type="button"
                    onClick={() => updateBlockField(index, 'links', block.links.filter((_, currentIndex) => currentIndex !== linkIndex))}
                    className="text-sm font-medium text-red-500 hover:text-red-600"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <TextInput
                    value={linkItem[`label_${activeLanguage}` as 'label_es' | 'label_en'] || ''}
                    onChange={(event) =>
                      updateBlockField(
                        index,
                        'links',
                        block.links.map((item, currentIndex) =>
                          currentIndex === linkIndex ? { ...item, [`label_${activeLanguage}`]: event.target.value } : item
                        )
                      )
                    }
                    placeholder={`Label ${localizedSuffix}`}
                  />
                  <TextInput
                    value={linkItem.url || ''}
                    onChange={(event) =>
                      updateBlockField(
                        index,
                        'links',
                        block.links.map((item, currentIndex) =>
                          currentIndex === linkIndex ? { ...item, url: event.target.value } : item
                        )
                      )
                    }
                    placeholder="URL"
                  />
                  <div className="md:col-span-2">
                    <TextArea
                      rows={3}
                      value={linkItem[`description_${activeLanguage}` as 'description_es' | 'description_en'] || ''}
                      onChange={(event) =>
                        updateBlockField(
                          index,
                          'links',
                          block.links.map((item, currentIndex) =>
                            currentIndex === linkIndex ? { ...item, [`description_${activeLanguage}`]: event.target.value } : item
                          )
                        )
                      }
                      placeholder={`Descripción ${localizedSuffix}`}
                    />
                  </div>
                </div>
              </div>
            ))}
            <GlassButton
              type="button"
              variant="glass"
              size="sm"
              onClick={() =>
                updateBlockField(index, 'links', [
                  ...block.links,
                  { label_es: '', label_en: '', url: '', description_es: '', description_en: '' },
                ])
              }
            >
              <Plus className="h-4 w-4" />
              Agregar enlace
            </GlassButton>
          </div>
        );

      case 'embed':
        return (
          <div className="grid gap-4">
            <div>
              <FieldLabel>URL embebida</FieldLabel>
              <TextInput
                value={block.embed_url || ''}
                onChange={(event) => updateBlockField(index, 'embed_url', event.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
                />
              </div>
              <div>
                <FieldLabel>{`Caption ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`caption_${activeLanguage}` as 'caption_es' | 'caption_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'caption', event.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'download':
        return (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{`Título ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`title_${activeLanguage}` as 'title_es' | 'title_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'title', event.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Archivo</FieldLabel>
                <TextInput
                  value={block.file_url || ''}
                  onChange={(event) => updateBlockField(index, 'file_url', event.target.value)}
                  placeholder="/assets/... o URL"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{`Label botón ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`button_label_${activeLanguage}` as 'button_label_es' | 'button_label_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'button_label', event.target.value)}
                />
              </div>
              <div>
                <FieldLabel>{`Descripción ${localizedSuffix}`}</FieldLabel>
                <TextInput
                  value={block[`description_${activeLanguage}` as 'description_es' | 'description_en'] || ''}
                  onChange={(event) => updateLocalizedBlockField(index, 'description', event.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'divider':
        return (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500">
            Este bloque solo agrega una separación visual en la noticia.
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <GlassCard
      variant="card"
      hover="none"
      className="flex h-[calc(100vh-9rem)] min-h-[720px] flex-col overflow-hidden rounded-[28px] p-0"
    >
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="px-6 py-5">
          <div className="flex items-start justify-between gap-6">
            <div>
              {backHref && (
                <Link
                  to={backHref}
                  className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {backLabel}
                </Link>
              )}
              <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
              {helperText && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{helperText}</p>}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4">
          <div className="inline-flex rounded-full bg-white/70 p-1 shadow-sm backdrop-blur-xl">
            <nav className="flex gap-1">
              <button
                type="button"
                onClick={() => setActiveLanguage('es')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeLanguage === 'es'
                    ? 'bg-[#4387DF] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'
                }`}
              >
                Spanish (ES)
              </button>
              <button
                type="button"
                onClick={() => setActiveLanguage('en')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeLanguage === 'en'
                    ? 'bg-[#4387DF] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'
                }`}
              >
                English (EN)
              </button>
            </nav>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="min-h-0 flex flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-6 py-6">
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)]">
            <div className="min-w-0 space-y-6">
              <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Card y metadata</h3>
                <div className="space-y-4">
                  <div>
                    <FieldLabel required>{`Título ${activeLanguage.toUpperCase()}`}</FieldLabel>
                    <TextInput
                      value={values[`title_${activeLanguage}`] || ''}
                      onChange={(e) => updateValue(`title_${activeLanguage}`, e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel required>{`Slug ${activeLanguage.toUpperCase()}`}</FieldLabel>
                    <TextInput
                      value={values[`slug_${activeLanguage}`] || ''}
                      onChange={(e) => updateValue(`slug_${activeLanguage}`, e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel>{`Excerpt ${activeLanguage.toUpperCase()}`}</FieldLabel>
                    <TextArea
                      rows={4}
                      value={values[`excerpt_${activeLanguage}`] || ''}
                      onChange={(e) => updateValue(`excerpt_${activeLanguage}`, e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <FieldLabel>Autor</FieldLabel>
                      <TextInput value={values.author || ''} onChange={(e) => updateValue('author', e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Fecha</FieldLabel>
                      <TextInput type="date" value={values.published_date || ''} onChange={(e) => updateValue('published_date', e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>Tiempo de lectura</FieldLabel>
                      <TextInput type="number" value={values.read_time || ''} onChange={(e) => updateValue('read_time', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <FieldLabel>Estado</FieldLabel>
                      <select value={values.status || 'published'} onChange={(e) => updateValue('status', e.target.value)} className="glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <FieldLabel>Variant</FieldLabel>
                      <select value={values.display_variant || ''} onChange={(e) => updateValue('display_variant', e.target.value)} className="glass-input min-w-0 w-full rounded-2xl px-4 py-2.5 text-gray-900">
                        <option value="">Default</option>
                        <option value="default">Default</option>
                        <option value="large">Large</option>
                        <option value="compact">Compact</option>
                      </select>
                    </div>
                    <label className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-slate-700">
                      <input type="checkbox" checked={!!values.featured} onChange={(e) => updateValue('featured', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#4387DF]" />
                      Destacado
                    </label>
                  </div>
                </div>
              </GlassCard>

              <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Imagen destacada</h3>
                </div>
                <div className="space-y-3">
                  <TextInput value={values.featured_image || ''} onChange={(e) => updateValue('featured_image', e.target.value)} placeholder="/assets/... o URL" />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <GlassButton type="button" variant="glass" size="sm" onClick={() => openPicker({ kind: 'featured' })}>
                        Elegir desde biblioteca
                      </GlassButton>
                      {values.featured_image && (
                        <GlassButton type="button" variant="glass" size="sm" onClick={() => updateValue('featured_image', '')}>
                          Limpiar
                        </GlassButton>
                      )}
                    </div>
                    {values.featured_image && (
                      <a href={values.featured_image} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Abrir recurso
                      </a>
                    )}
                  </div>
                  <ImagePreview src={values.featured_image} />
                </div>
              </GlassCard>

              <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Clasificación</h3>
                <div className="space-y-4">
                  <div>
                    <FieldLabel>Categorías</FieldLabel>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categoryOptions.map((category) => (
                        <label key={category.id} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="h-4 w-4 rounded border-slate-300 text-[#4387DF]"
                          />
                          <span>{category.title_es || category.title_en}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Tags</FieldLabel>
                    <TextArea
                      rows={3}
                      value={selectedTags.join(', ')}
                      onChange={(e) => setSelectedTags(parseCsv(e.target.value))}
                      placeholder="data, ai, governance"
                    />
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="min-w-0 space-y-6">
              <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Detalle del insight</h3>
                <div>
                  <FieldLabel>{`Contenido ${activeLanguage.toUpperCase()}`}</FieldLabel>
                  <TextArea
                    rows={10}
                    value={values[`content_${activeLanguage}`] || ''}
                    onChange={(e) => updateValue(`content_${activeLanguage}`, e.target.value)}
                  />
                </div>
              </GlassCard>

              <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Contenido por bloques</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={newBlockType}
                      onChange={(event) => setNewBlockType(event.target.value as ContentBlockType)}
                      className="glass-input min-w-0 rounded-2xl px-4 py-2.5 text-sm text-gray-900"
                    >
                      {BLOCK_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <GlassButton type="button" variant="primary" size="sm" onClick={addBlock}>
                      <Plus className="h-4 w-4" />
                      Agregar bloque
                    </GlassButton>
                  </div>
                </div>

                {blocks.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                    Aún no has agregado bloques.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blocks.map((block, index) => (
                      <div key={block.id} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-3 text-sm font-semibold text-slate-700">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{blockTypeLabel(block.block_type)}</p>
                              <p className="text-xs text-slate-500">Editando campos {activeLanguage.toUpperCase()} cuando aplique</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => moveBlock(index, -1)}
                              disabled={index === 0}
                              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveBlock(index, 1)}
                              disabled={index === blocks.length - 1}
                              className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeBlock(index)}
                              className="rounded-full border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {renderBlockEditor(block, index)}
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-5">
          <div className="flex items-center justify-end gap-3">
            <GlassButton type="button" variant="glass" size="sm" onClick={onCancel}>
              {cancelLabel}
            </GlassButton>
            <GlassButton type="submit" variant="primary" size="sm" className="min-w-[160px]">
              {isSubmitting ? 'Guardando...' : submitLabel}
            </GlassButton>
          </div>
        </div>
      </form>

      {pickerOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/45 p-4 backdrop-blur-[2px]">
          <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/20" style={{ maxHeight: 'min(86vh, 920px)' }}>
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Elegir imagen</h3>
                  <p className="mt-1 text-sm text-slate-600">Selecciona una imagen ya usada por el sitio para reutilizarla en el insight.</p>
                </div>
                <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerOpen(false)}>
                  Cerrar
                </GlassButton>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={mediaQuery}
                  onChange={(e) => setMediaQuery(e.target.value)}
                  placeholder="Buscar por nombre, origen o URL"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMedia.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => applyPickedMedia(item.url)}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <ImagePreview src={item.url} />
                    <div className="space-y-1 px-4 py-3">
                      <p className="truncate text-sm font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.source}</p>
                      <p className="truncate text-xs text-slate-400">{item.url}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
