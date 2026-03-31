import { useEffect, useMemo, useRef, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, ImagePlus, Plus, Search, Trash2 } from 'lucide-react';
import { GlassButton } from '../../shared/components/GlassButton';
import { GlassCard } from '../../shared/components/GlassCard';
import { getMediaItems, type MediaItem } from '../services/mediaLibrary.service';
import { getAllPartners } from '../services/partners.service';
import { getAllCaseStudies } from '../services/caseStudies.service';

interface ServiceVisualEditorProps {
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

interface LocalizedItem {
  _id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
}

function createLocalizedItem(): LocalizedItem {
  return {
    _id: `localized-item-${crypto.randomUUID?.() || Date.now()}`,
    title_es: '',
    title_en: '',
    description_es: '',
    description_en: '',
  };
}

function parseJsonArray(value: string | undefined) {
  if (!value?.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function isImageLike(value: string) {
  return (
    value.startsWith('/assets/') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:image/')
  );
}

function FieldLabel({ children, required = false }: { children: string; required?: boolean }) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`glass-input w-full rounded-2xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4387DF]/20 ${props.className || ''}`}
    />
  );
}

function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`glass-input w-full rounded-2xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4387DF]/20 ${props.className || ''}`}
    />
  );
}

function ImagePreview({ src, alt }: { src?: string; alt: string }) {
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
          alt={alt}
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

export function ServiceVisualEditor({
  title,
  helperText = null,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar servicio',
  cancelLabel = 'Cancelar',
  isSubmitting = false,
  errorMessage = null,
  backHref = null,
  backLabel = 'Volver al listado',
}: ServiceVisualEditorProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [partnerOptions, setPartnerOptions] = useState<string[]>([]);
  const [caseStudyOptions, setCaseStudyOptions] = useState<Array<{ slug: string; label: string }>>([]);
  const [pickerField, setPickerField] = useState<'hero_image' | 'featured_image' | null>(null);
  const [mediaQuery, setMediaQuery] = useState('');
  const [pendingFocusId, setPendingFocusId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [capabilities, setCapabilities] = useState<LocalizedItem[]>(() => {
    const items = parseJsonArray(initialValues.capabilities_json);
    return items.length > 0 ? items.map((item: any, index: number) => ({ _id: item._id || `capability-${index}-${Date.now()}`, ...item })) : [createLocalizedItem()];
  });
  const [benefits, setBenefits] = useState<LocalizedItem[]>(() => {
    const items = parseJsonArray(initialValues.benefits_json);
    return items.length > 0 ? items.map((item: any, index: number) => ({ _id: item._id || `benefit-${index}-${Date.now()}`, ...item })) : [createLocalizedItem()];
  });
  const [technologies, setTechnologies] = useState<string[]>(() =>
    String(initialValues.technologies_csv || '')
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)
  );
  const [relatedCaseStudies, setRelatedCaseStudies] = useState<string[]>(() =>
    String(initialValues.related_case_studies_csv || '')
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)
  );

  useEffect(() => {
    setValues(initialValues);
    const nextCapabilities = parseJsonArray(initialValues.capabilities_json);
    setCapabilities(
      nextCapabilities.length > 0 ? nextCapabilities.map((item: any, index: number) => ({ _id: item._id || `capability-${index}-${Date.now()}`, ...item })) : [createLocalizedItem()]
    );
    const nextBenefits = parseJsonArray(initialValues.benefits_json);
    setBenefits(
      nextBenefits.length > 0 ? nextBenefits.map((item: any, index: number) => ({ _id: item._id || `benefit-${index}-${Date.now()}`, ...item })) : [createLocalizedItem()]
    );
    setTechnologies(
      String(initialValues.technologies_csv || '')
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    );
    setRelatedCaseStudies(
      String(initialValues.related_case_studies_csv || '')
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean)
    );
  }, [initialValues]);

  useEffect(() => {
    void getMediaItems().then(setMediaItems).catch((error) => console.error('Error loading media items:', error));
    void getAllPartners()
      .then((items) => {
        setPartnerOptions(
          items
            .map((item) => String(item?.name || '').trim())
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b))
        );
      })
      .catch((error) => console.error('Error loading partners:', error));
    void getAllCaseStudies()
      .then((items) => {
        setCaseStudyOptions(
          items
            .map((item) => ({
              slug: String(item?.slug_en || item?.slug || item?.slug_es || '').trim(),
              label: String(item?.title_en || item?.title || item?.title_es || item?.client || 'Caso').trim(),
            }))
            .filter((item) => item.slug)
        );
      })
      .catch((error) => console.error('Error loading case studies:', error));
  }, []);

  useEffect(() => {
    if (!pendingFocusId) return;
    const target = itemRefs.current[pendingFocusId];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const focusable = target.querySelector('input, textarea, select, button') as HTMLElement | null;
    focusable?.focus();
    setPendingFocusId(null);
  }, [pendingFocusId, capabilities, benefits]);

  const filteredMedia = useMemo(() => {
    const query = mediaQuery.trim().toLowerCase();
    if (!query) return mediaItems;
    return mediaItems.filter((item) =>
      `${item.label} ${item.source} ${item.url}`.toLowerCase().includes(query)
    );
  }, [mediaItems, mediaQuery]);

  function updateValue(name: string, value: any) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function updateListItem(
    items: LocalizedItem[],
    setter: (items: LocalizedItem[]) => void,
    index: number,
    key: keyof LocalizedItem,
    value: string
  ) {
    setter(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  }

  function addListItem(items: LocalizedItem[], setter: (items: LocalizedItem[]) => void) {
    const newItem = createLocalizedItem();
    setter([...items, newItem]);
    setPendingFocusId(newItem._id);
  }

  function removeListItem(items: LocalizedItem[], setter: (items: LocalizedItem[]) => void, index: number) {
    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    setter(nextItems.length > 0 ? nextItems : [createLocalizedItem()]);
  }

  function toggleSelection(value: string, current: string[], setter: (values: string[]) => void) {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await onSubmit({
      ...values,
      technologies_csv: technologies.join(', '),
      related_case_studies_csv: relatedCaseStudies.join(', '),
      capabilities_json: JSON.stringify(capabilities.filter((item) => item.title_es || item.title_en || item.description_es || item.description_en).map(({ _id, ...item }) => item), null, 2),
      benefits_json: JSON.stringify(benefits.filter((item) => item.title_es || item.title_en || item.description_es || item.description_en).map(({ _id, ...item }) => item), null, 2),
    });
  }

  return (
    <GlassCard
      variant="card"
      hover="none"
      className="flex h-[calc(100vh-9rem)] min-h-[700px] flex-col overflow-hidden rounded-[28px] p-0"
    >
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white px-6 py-5">
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

      <form onSubmit={handleSubmit} className="min-h-0 flex flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.05fr,1.4fr]">
          <div className="space-y-6">
            <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Base del servicio</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel required>Título ES</FieldLabel>
                    <TextInput value={values.title_es || ''} onChange={(e) => updateValue('title_es', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel required>Título EN</FieldLabel>
                    <TextInput value={values.title_en || ''} onChange={(e) => updateValue('title_en', e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel required>Slug ES</FieldLabel>
                    <TextInput value={values.slug_es || ''} onChange={(e) => updateValue('slug_es', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel required>Slug EN</FieldLabel>
                    <TextInput value={values.slug_en || ''} onChange={(e) => updateValue('slug_en', e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Extracto ES</FieldLabel>
                    <TextArea rows={3} value={values.excerpt_es || ''} onChange={(e) => updateValue('excerpt_es', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Extracto EN</FieldLabel>
                    <TextArea rows={3} value={values.excerpt_en || ''} onChange={(e) => updateValue('excerpt_en', e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Contenido ES</FieldLabel>
                    <TextArea rows={7} value={values.content_es || ''} onChange={(e) => updateValue('content_es', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Contenido EN</FieldLabel>
                    <TextArea rows={7} value={values.content_en || ''} onChange={(e) => updateValue('content_en', e.target.value)} />
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Publicación</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <FieldLabel required>Estado</FieldLabel>
                  <select value={values.status || 'published'} onChange={(e) => updateValue('status', e.target.value)} className="glass-input w-full rounded-2xl px-4 py-2.5 text-gray-900">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <FieldLabel required>Orden</FieldLabel>
                  <TextInput type="number" value={values.order || 0} onChange={(e) => updateValue('order', e.target.value)} />
                </div>
                <label className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-slate-700">
                  <input type="checkbox" checked={!!values.featured} onChange={(e) => updateValue('featured', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#4387DF]" />
                  Destacado
                </label>
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Imágenes</h3>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {(['hero_image', 'featured_image'] as const).map((field) => (
                  <div key={field} className="space-y-3">
                    <FieldLabel>{field === 'hero_image' ? 'Hero image' : 'Featured image'}</FieldLabel>
                    <TextInput
                      value={values[field] || ''}
                      onChange={(e) => updateValue(field, e.target.value)}
                      placeholder="/assets/... o URL"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-2">
                        <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerField(field)}>
                          Elegir desde biblioteca
                        </GlassButton>
                        {values[field] && (
                          <GlassButton type="button" variant="glass" size="sm" onClick={() => updateValue(field, '')}>
                            Limpiar
                          </GlassButton>
                        )}
                      </div>
                      {values[field] && (
                        <a href={values[field]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Abrir recurso
                        </a>
                      )}
                    </div>
                    <ImagePreview src={values[field]} alt={field} />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
              <h3 className="text-lg font-semibold text-slate-900">Tecnologías relacionadas</h3>
              <p className="mt-1 text-sm text-slate-600">Marca los partners/tecnologías que deben aparecer en la página del servicio.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {partnerOptions.map((name) => (
                  <label key={name} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={technologies.includes(name)}
                      onChange={() => toggleSelection(name, technologies, setTechnologies)}
                      className="h-4 w-4 rounded border-slate-300 text-[#4387DF]"
                    />
                    {name}
                  </label>
                ))}
              </div>
            </GlassCard>

            <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
              <h3 className="text-lg font-semibold text-slate-900">Casos de éxito relacionados</h3>
              <p className="mt-1 text-sm text-slate-600">Selecciona los casos que deben vincularse a este servicio.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {caseStudyOptions.map((item) => (
                  <label key={item.slug} className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={relatedCaseStudies.includes(item.slug)}
                      onChange={() => toggleSelection(item.slug, relatedCaseStudies, setRelatedCaseStudies)}
                      className="h-4 w-4 rounded border-slate-300 text-[#4387DF]"
                    />
                    <span>
                      <span className="block font-medium text-slate-800">{item.label}</span>
                      <span className="block text-xs text-slate-500">{item.slug}</span>
                    </span>
                  </label>
                ))}
              </div>
            </GlassCard>

            {[{ key: 'capabilities', label: 'Capabilities', items: capabilities, setter: setCapabilities }, { key: 'benefits', label: 'Benefits', items: benefits, setter: setBenefits }].map((group) => (
              <GlassCard key={group.key} variant="card" hover="none" className="rounded-[28px] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{group.label}</h3>
                    <p className="mt-1 text-sm text-slate-600">Edita cada tarjeta con copy en ES y EN.</p>
                  </div>
                  <GlassButton type="button" variant="outline" size="sm" onClick={() => addListItem(group.items, group.setter)}>
                    <Plus className="h-4 w-4" />
                    Agregar item
                  </GlassButton>
                </div>

                <div className="space-y-4">
                  {group.items.map((item, index) => (
                    <div key={item._id} ref={(node) => { itemRefs.current[item._id] = node; }} className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{group.label} {index + 1}</h4>
                        <button type="button" onClick={() => removeListItem(group.items, group.setter, index)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Título ES</FieldLabel>
                          <TextInput value={item.title_es} onChange={(e) => updateListItem(group.items, group.setter, index, 'title_es', e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Título EN</FieldLabel>
                          <TextInput value={item.title_en} onChange={(e) => updateListItem(group.items, group.setter, index, 'title_en', e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Descripción ES</FieldLabel>
                          <TextArea rows={4} value={item.description_es} onChange={(e) => updateListItem(group.items, group.setter, index, 'description_es', e.target.value)} />
                        </div>
                        <div>
                          <FieldLabel>Descripción EN</FieldLabel>
                          <TextArea rows={4} value={item.description_en} onChange={(e) => updateListItem(group.items, group.setter, index, 'description_en', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
        </div>

        <div className="sticky bottom-0 z-20 flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-5">
          <GlassButton type="button" variant="glass" size="sm" onClick={onCancel}>
            {cancelLabel}
          </GlassButton>
          <GlassButton type="submit" variant="primary" size="sm" className="min-w-[160px]">
            {isSubmitting ? 'Guardando...' : submitLabel}
          </GlassButton>
        </div>
      </form>

      {pickerField && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/45 p-4 backdrop-blur-[2px]">
          <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/20" style={{ maxHeight: 'min(86vh, 920px)' }}>
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Elegir imagen</h3>
                  <p className="mt-1 text-sm text-slate-600">Selecciona una imagen ya usada por el sitio para reutilizarla en el servicio.</p>
                </div>
                <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerField(null)}>
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
                    onClick={() => {
                      updateValue(pickerField, item.url);
                      setPickerField(null);
                      setMediaQuery('');
                    }}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <ImagePreview src={item.url} alt={item.label} />
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
