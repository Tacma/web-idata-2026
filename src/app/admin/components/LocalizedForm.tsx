import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ExternalLink, ImagePlus, Search, X } from 'lucide-react';
import { GlassButton } from '../../shared/components/GlassButton';
import { GlassCard } from '../../shared/components/GlassCard';
import { getMediaItems, type MediaItem } from '../services/mediaLibrary.service';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'checkbox' | 'file' | 'date';
  required?: boolean;
  multilingual?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  rows?: number;
  description?: string;
}

function isImageLike(value: string) {
  return (
    value.startsWith('/assets/') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:image/')
  );
}

function isMediaField(field: FormField) {
  return /(image|logo|photo|cover|hero|featured)/i.test(field.name) || /(image|logo|photo|cover)/i.test(field.label);
}

function isFileField(field: FormField) {
  return /(file_url|download_url)/i.test(field.name);
}

function FieldMediaPreview({ value }: { value?: string }) {
  const [size, setSize] = useState('');

  if (!value || !isImageLike(value)) {
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
          src={value}
          alt="Preview"
          className="h-full w-full object-contain"
          onLoad={(event) => {
            const image = event.currentTarget;
            setSize(`${image.naturalWidth} x ${image.naturalHeight}px`);
          }}
        />
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-3 py-2 text-xs text-slate-500">
        <span className="truncate">{value}</span>
        {size && <span className="shrink-0 pl-3">{size}</span>}
      </div>
    </div>
  );
}

interface LocalizedFormProps {
  title: string;
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  onCancel: () => void;
  variant?: 'modal' | 'page';
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  helperText?: string | null;
  backHref?: string | null;
  backLabel?: string;
}

export function LocalizedForm({
  title,
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  variant = 'modal',
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  errorMessage = null,
  helperText = null,
  backHref = null,
  backLabel = 'Volver al listado',
}: LocalizedFormProps) {
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es');
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [mediaQuery, setMediaQuery] = useState('');
  const [pickerField, setPickerField] = useState<string | null>(null);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    void getMediaItems()
      .then(setMediaItems)
      .catch((error) => console.error('Error loading media items:', error));
  }, []);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const filteredMedia = useMemo(() => {
    const query = mediaQuery.trim().toLowerCase();
    if (!query) return mediaItems;
    return mediaItems.filter((item) =>
      `${item.label} ${item.source} ${item.url}`.toLowerCase().includes(query)
    );
  }, [mediaItems, mediaQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  };

  const renderField = (field: FormField, lang?: 'es' | 'en') => {
    const fieldName = field.multilingual && lang ? `${field.name}_${lang}` : field.name;
    const fieldValue = values[fieldName] ?? '';

    const baseClassName =
      'glass-input w-full rounded-2xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4387DF]/20';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            required={field.required}
            className={`${baseClassName} min-h-[120px] resize-y`}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={field.required}
            className={`${baseClassName} appearance-none`}
          />
        );

      case 'select':
        return (
          <select
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={field.required}
            className={`${baseClassName} ui-select`}
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseClassName}
          />
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={fieldName}
            checked={!!fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-[#4387DF] focus:ring-[#4387DF]/30"
          />
        );

      case 'file':
        return (
          <input
            type="file"
            name={fieldName}
            onChange={(e) => handleChange(fieldName, e.target.files?.[0])}
            className={baseClassName}
          />
        );

      default:
        if (field.type === 'text' && (isMediaField(field) || isFileField(field))) {
          return (
            <div className="space-y-3">
              <input
                type="text"
                name={fieldName}
                value={fieldValue}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={field.placeholder || (isMediaField(field) ? '/assets/... o URL' : 'https://...')}
                required={field.required}
                className={baseClassName}
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {isMediaField(field) && (
                    <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerField(fieldName)}>
                      Elegir desde biblioteca
                    </GlassButton>
                  )}
                  {fieldValue && (
                    <GlassButton type="button" variant="glass" size="sm" onClick={() => handleChange(fieldName, '')}>
                      Limpiar
                    </GlassButton>
                  )}
                </div>
                {fieldValue && (
                  <a
                    href={fieldValue}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Abrir recurso
                  </a>
                )}
              </div>

              {isMediaField(field) && <FieldMediaPreview value={fieldValue} />}
            </div>
          );
        }

        return (
          <input
            type="text"
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={baseClassName}
          />
        );
    }
  };

  const multilingualFields = fields.filter(f => f.multilingual);
  const globalFields = fields.filter(f => !f.multilingual);

  const showLanguageTabs = multilingualFields.length > 0 && variant !== 'page';

  const headerContent = (
    <>
      <div className={`${variant === 'modal' ? 'border-b border-white/20 px-6 py-5' : 'border-b border-slate-200 px-6 py-5 bg-white sticky top-0 z-20'}`}>
        <div>
          {variant === 'page' && backHref && (
            <Link
              to={backHref}
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          )}
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          {helperText && <p className="mt-2 text-sm text-gray-600">{helperText}</p>}
        </div>
        {variant === 'modal' && (
          <button
            onClick={onCancel}
            className="rounded-full bg-white/70 p-2 text-gray-500 backdrop-blur-xl transition hover:bg-white/90 hover:text-gray-700"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {showLanguageTabs && (
        <div className={`${variant === 'modal' ? 'px-6 pt-5' : 'sticky top-[117px] z-10 border-b border-slate-200 bg-white px-6 py-4'}`}>
          <div className="inline-flex rounded-full bg-white/70 p-1 shadow-sm backdrop-blur-xl">
            <nav className="flex gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('es')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === 'es'
                    ? 'bg-[#4387DF] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'
                }`}
              >
                Spanish (ES)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === 'en'
                    ? 'bg-[#4387DF] text-white shadow-sm'
                    : 'text-gray-500 hover:bg-white/70 hover:text-gray-700'
                }`}
              >
                English (EN)
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );

  const formBody = (
    <form onSubmit={handleSubmit} className="min-h-0 flex flex-1 flex-col">
      <div className={`min-h-0 flex-1 overflow-y-auto ${variant === 'modal' ? 'p-6' : 'px-6 py-6'}`}>
          {errorMessage && (
            <div className="mb-6 rounded-2xl border border-red-200/80 bg-red-50/90 px-4 py-3 text-sm text-red-700 backdrop-blur-xl">
              {errorMessage}
            </div>
          )}

          {multilingualFields.length > 0 && variant === 'page' && (
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contenido por idioma</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Edita por separado los textos de la página en español e inglés. Cada bloque guarda su propio contenido.
                </p>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                {([
                  { code: 'es' as const, title: 'Español (ES)', helper: 'Textos visibles para la versión en español.' },
                  { code: 'en' as const, title: 'Inglés (EN)', helper: 'Textos visibles para la versión en inglés.' },
                ]).map((languagePanel) => (
                  <div key={languagePanel.code} className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
                        {languagePanel.title}
                      </h4>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{languagePanel.helper}</p>
                    </div>

                    <div className="space-y-4">
                      {multilingualFields.map((field) => (
                        <div key={`${field.name}_${languagePanel.code}`}>
                          <label className="mb-1 block text-sm font-medium text-gray-700">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {field.description && (
                            <p className="mb-2 text-xs text-gray-500">{field.description}</p>
                          )}
                          {renderField(field, languagePanel.code)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {multilingualFields.length > 0 && variant !== 'page' && (
            <div className="mb-6">
              <div className={`${showLanguageTabs ? 'mt-0' : 'mt-6'} space-y-4`}>
                {multilingualFields.map((field) => (
                  <div key={`${field.name}_${activeTab}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.description && (
                      <p className="mb-2 text-xs text-gray-500">{field.description}</p>
                    )}
                    {renderField(field, activeTab)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {globalFields.length > 0 && (
            <div className="mt-6 space-y-4 border-t border-white/20 pt-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">General Settings</h3>
              {globalFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.description && (
                    <p className="mb-2 text-xs text-gray-500">{field.description}</p>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </div>
          )}
      </div>

      <div className={`flex items-center justify-end gap-3 ${variant === 'modal' ? 'border-t border-white/20 bg-white/35 px-6 py-5 backdrop-blur-xl' : 'sticky bottom-0 z-20 border-t border-slate-200 bg-white px-6 py-5'}`}>
          <GlassButton
            type="button"
            onClick={onCancel}
            variant="glass"
            size="sm"
            className="min-w-[112px]"
          >
            {cancelLabel}
          </GlassButton>
          <GlassButton
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="sm"
            className="min-w-[140px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Saving...' : submitLabel}
          </GlassButton>
      </div>
    </form>
  );

  const content = (
    <>
      {headerContent}
      {formBody}

      {pickerField && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/45 p-4 backdrop-blur-[2px]">
          <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/20" style={{ maxHeight: 'min(86vh, 920px)' }}>
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Elegir recurso</h3>
                  <p className="mt-1 text-sm text-slate-600">Selecciona una imagen ya usada por el sitio para reutilizarla en este formulario.</p>
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
                      handleChange(pickerField, item.url);
                      setPickerField(null);
                      setMediaQuery('');
                    }}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <FieldMediaPreview value={item.url} />
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
    </>
  );

  if (variant === 'page') {
    return (
      <GlassCard
        variant="card"
        hover="none"
        className="flex h-[calc(100vh-9rem)] min-h-[700px] flex-col overflow-hidden rounded-[28px] p-0"
      >
        {content}
      </GlassCard>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/35 p-4 backdrop-blur-[2px]">
      <div
        className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/20"
        style={{ maxHeight: 'min(88vh, 980px)' }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto bg-white">
          {content}
        </div>
      </div>
    </div>
  );
}
