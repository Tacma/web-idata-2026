import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { AlertCircle, ArrowLeft, CheckCircle2, Info, Pencil, Plus, Trash2 } from 'lucide-react';
import { LocalizedForm, type FormField } from '../components/LocalizedForm';
import { PageSectionDesigner } from '../components/PageSectionDesigner';
import {
  getPageConnection,
  getSectionRenderRank,
  HOME_DISABLED_SECTION_TYPES,
} from '../config/pageRegistry';
import {
  createPage,
  createPageSection,
  deletePageSection,
  getPageById,
  getPageSections,
  updatePage,
  updatePageSection,
} from '../services/pages.service';

function formatSectionTypeLabel(value: string | null | undefined) {
  if (!value) return 'Sección';
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getSectionDisplayTitle(section: any) {
  if (section?.title) return section.title;

  if (section?.type === 'preHero' && section?.content) {
    if (section.language === 'en') return section.content.title_en || section.content.title_es || 'Sin título';
    return section.content.title_es || section.content.title_en || 'Sin título';
  }

  if (section?.type === 'hero') {
    if (section?.config?.eyebrow) return section.config.eyebrow;
  }

  return 'Sin título';
}

function getSectionScore(section: any) {
  let score = 0;
  if (section?.title) score += 2;
  if (section?.subtitle) score += 2;
  if (section?.cta_label) score += 1;
  if (section?.cta_href) score += 1;
  if (section?.referenced_ids?.length) score += 2;
  if (section?.content && Object.keys(section.content).length > 0) score += 3;
  if (section?.config && Object.keys(section.config).length > 0) score += 4;
  return score;
}

function getSectionVisibilityState(section: any, allSections: any[], pageSlug?: string | null) {
  if (!section?.is_enabled) {
    return {
      visible: false,
      label: 'Desactivada',
      className: 'bg-gray-100 text-gray-700',
    };
  }

  if (pageSlug !== 'home') {
    return {
      visible: true,
      label: 'Activa',
      className: 'bg-green-100 text-green-700',
    };
  }

  if (HOME_DISABLED_SECTION_TYPES.has(section.type)) {
    return {
      visible: false,
      label: 'No activa en front',
      className: 'bg-rose-100 text-rose-700',
    };
  }

  const sameLanguageEnabled = allSections
    .filter((item) => item.language === section.language && item.is_enabled)
    .sort((a, b) => a.order - b.order);

  const byType = new Map<string, any>();

  for (const item of sameLanguageEnabled) {
    const existing = byType.get(item.type);
    if (!existing) {
      byType.set(item.type, item);
      continue;
    }

    const currentScore = getSectionScore(item);
    const existingScore = getSectionScore(existing);

    if (
      currentScore > existingScore ||
      (currentScore === existingScore &&
        new Date(item.updated_at || 0).getTime() > new Date(existing.updated_at || 0).getTime())
    ) {
      byType.set(item.type, item);
    }
  }

  let visible = Array.from(byType.values()).sort((a, b) => a.order - b.order);
  const hero = visible.find((item) => item.type === 'hero');
  const hidesPreHero = Boolean(hero);
  const hidesStrategicBanner = Boolean(hero);

  if (hero) {
    visible = visible.filter((item) => item.type !== 'preHero');

    if (hidesStrategicBanner) {
      visible = visible.filter((item) => item.type !== 'strategicBannerTriple');
    }
  }

  if (visible.some((item) => item.id === section.id)) {
    return {
      visible: true,
      label: 'Activa',
      className: 'bg-green-100 text-green-700',
    };
  }

  if (section.type === 'preHero' && hidesPreHero) {
    return {
      visible: false,
      label: 'Integrada en hero',
      className: 'bg-amber-100 text-amber-700',
    };
  }

  if (section.type === 'strategicBannerTriple' && hidesStrategicBanner) {
    return {
      visible: false,
      label: 'Integrada en hero',
      className: 'bg-amber-100 text-amber-700',
    };
  }

  return {
    visible: false,
    label: 'Oculta',
    className: 'bg-gray-100 text-gray-700',
  };
}

function isSectionManagedFromHero(section: any, allSections: any[], pageSlug?: string | null) {
  if (pageSlug !== 'home') return false;
  if (section?.type !== 'strategicBannerTriple') return false;

  const hero = allSections.find(
    (item) => item.language === section.language && item.type === 'hero' && item.is_enabled
  );

  return Boolean(hero);
}

function shouldHideSectionFromAdmin(section: any, allSections: any[], pageSlug?: string | null) {
  if (isSectionManagedFromHero(section, allSections, pageSlug)) {
    return true;
  }

  if (pageSlug === 'home') {
    const visibility = getSectionVisibilityState(section, allSections, pageSlug);
    return !visibility.visible;
  }

  return false;
}

type FeedbackTone = 'success' | 'error' | 'info';

interface FeedbackState {
  tone: FeedbackTone;
  title: string;
  description: string;
}

function buildSectionLabel(section: any, fallbackType?: string, fallbackLanguage?: string) {
  const type = formatSectionTypeLabel(section?.type || fallbackType);
  const language = String(section?.language || fallbackLanguage || '').toUpperCase();
  return language ? `${type} (${language})` : type;
}

function feedbackStyles(tone: FeedbackTone) {
  if (tone === 'success') {
    return {
      wrapper: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      icon: 'text-emerald-600',
      Icon: CheckCircle2,
    };
  }
  if (tone === 'error') {
    return {
      wrapper: 'border-red-200 bg-red-50 text-red-900',
      icon: 'text-red-600',
      Icon: AlertCircle,
    };
  }
  return {
    wrapper: 'border-sky-200 bg-sky-50 text-sky-900',
    icon: 'text-sky-600',
    Icon: Info,
  };
}

function generateId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}`;
}

const pageFields: FormField[] = [
  { name: 'page_name', label: 'Nombre de la página', type: 'text', required: true },
  { name: 'slug', label: 'Slug interno', type: 'text', required: true },
  { name: 'route_es', label: 'Ruta ES', type: 'text', required: true },
  { name: 'route_en', label: 'Ruta EN', type: 'text', required: true },
  { name: 'title', label: 'SEO Title', type: 'text', multilingual: true, required: true },
  { name: 'description', label: 'SEO Description', type: 'textarea', multilingual: true, rows: 3 },
  {
    name: 'status',
    label: 'Estado',
    type: 'select',
    required: true,
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' },
      { value: 'archived', label: 'Archived' },
    ],
  },
  { name: 'is_visible', label: 'Visible en el sitio', type: 'checkbox' },
];

function parseJson(value: string) {
  if (!value?.trim()) return null;
  return JSON.parse(value);
}

function parseIds(value: string) {
  return (value || '')
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function PageEditorPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [page, setPage] = useState<any | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>((location.state as any)?.feedback || null);
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [showSectionForm, setShowSectionForm] = useState(false);

  useEffect(() => {
    if (!feedback) return;
    const timeout = setTimeout(() => setFeedback(null), 4500);
    return () => clearTimeout(timeout);
  }, [feedback]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!id) return;

      try {
        setLoading(true);
        const [pageData, sectionData] = await Promise.all([
          getPageById(id),
          getPageSections(id),
        ]);

        if (!cancelled) {
          setPage(pageData);
          setSections(sectionData);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || 'No fue posible cargar la página.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const pageInitialValues = useMemo(() => ({
    page_name: page?.page_name ?? '',
    slug: page?.slug ?? '',
    route_es: page?.route_es ?? '/es/',
    route_en: page?.route_en ?? '/en/',
    title_es: page?.title_es ?? '',
    title_en: page?.title_en ?? '',
    description_es: page?.description_es ?? '',
    description_en: page?.description_en ?? '',
    status: page?.status ?? 'published',
    is_visible: page?.is_visible ?? true,
  }), [page]);

  const sectionInitialValues = useMemo(() => ({
    language: editingSection?.language ?? 'es',
    type: editingSection?.type ?? 'custom',
    title: editingSection?.title ?? '',
    subtitle: editingSection?.subtitle ?? '',
    cta_label: editingSection?.cta_label ?? '',
    cta_href: editingSection?.cta_href ?? '',
    order: editingSection?.order ?? sections.length + 1,
    is_enabled: editingSection?.is_enabled ?? true,
    referenced_ids: editingSection?.referenced_ids?.join('\n') ?? '',
    content: editingSection?.content ? JSON.stringify(editingSection.content, null, 2) : '',
    config: editingSection?.config ? JSON.stringify(editingSection.config, null, 2) : '',
  }), [editingSection, sections.length]);

  const effectiveSlug = page?.slug ?? id ?? null;
  const pageConnection = getPageConnection(effectiveSlug);
  const isLiveCmsConnected = pageConnection === 'live';
  const adminSections = useMemo(
    () =>
      sections
        .filter((section) => !shouldHideSectionFromAdmin(section, sections, effectiveSlug))
        .sort((a, b) => {
          if (a.language !== b.language) {
            const languageOrder = { es: 0, en: 1 } as const;
            return (languageOrder[a.language as 'es' | 'en'] ?? 99) - (languageOrder[b.language as 'es' | 'en'] ?? 99);
          }

          const rankA = getSectionRenderRank(effectiveSlug, a.type);
          const rankB = getSectionRenderRank(effectiveSlug, b.type);
          if (rankA !== rankB) return rankA - rankB;

          if ((a.order || 0) !== (b.order || 0)) {
            return (a.order || 0) - (b.order || 0);
          }

          return String(a.type || '').localeCompare(String(b.type || ''));
        }),
    [effectiveSlug, sections]
  );
  const referenceSection = useMemo(() => {
    if (!editingSection) return null;
    return sections.find((section) =>
      section.id !== editingSection.id &&
      section.type === editingSection.type &&
      section.order === editingSection.order &&
      section.language !== editingSection.language
    ) || null;
  }, [editingSection, sections]);

  async function reloadSections(slug: string) {
    const nextSections = await getPageSections(slug);
    setSections(nextSections);
  }

  async function handleSavePage(values: Record<string, any>) {
    try {
      setSaving(true);
      setError(null);

      const payload = {
        page_name: values.page_name,
        slug: values.slug,
        route_es: values.route_es,
        route_en: values.route_en,
        title_es: values.title_es,
        title_en: values.title_en,
        description_es: values.description_es,
        description_en: values.description_en,
        status: values.status,
        is_visible: !!values.is_visible,
      };

      const saved = isEditing && id
        ? await updatePage(id, payload)
        : await createPage(payload);

      const nextFeedback: FeedbackState = {
        tone: 'success',
        title: isEditing ? 'Datos de página actualizados' : 'Página creada',
        description: isEditing
          ? `Se guardaron correctamente los datos generales de la página ${saved.page_name || saved.slug}.`
          : `Se creó la página ${saved.page_name || saved.slug} y ya puedes empezar a administrarle secciones.`,
      };

      navigate(`/admin/pages/${saved.slug}/edit`, { replace: true, state: { feedback: nextFeedback } });
      setPage(saved);
      setFeedback(nextFeedback);
    } catch (err: any) {
      const message = err?.message || 'No fue posible guardar la página.';
      setError(message);
      setFeedback({
        tone: 'error',
        title: 'No se guardaron los datos de la página',
        description: `${message}${page?.page_name || page?.slug ? ` Contexto: ${page?.page_name || page?.slug}.` : ''}`,
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSection(values: Record<string, any>) {
    const pageSlug = page?.slug ?? id;
    if (!pageSlug) return;

    try {
      const payload = {
        ...(editingSection ? {} : { id: generateId('page-section') }),
        page_slug: pageSlug,
        language: values.language,
        type: values.type,
        title: values.title || null,
        subtitle: values.subtitle || null,
        cta_label: values.cta_label || null,
        cta_href: values.cta_href || null,
        order: Number(values.order || 0),
        is_enabled: !!values.is_enabled,
        referenced_ids: parseIds(values.referenced_ids),
        content: parseJson(values.content),
        config: parseJson(values.config),
      };

      if (editingSection) {
        await updatePageSection(editingSection.id, payload);
      } else {
        await createPageSection(payload);
      }

      await reloadSections(pageSlug);
      const sectionLabel = buildSectionLabel(editingSection, values.type, values.language);
      setFeedback({
        tone: 'success',
        title: editingSection ? 'Sección actualizada' : 'Sección creada',
        description: editingSection
          ? `Se guardó correctamente la sección ${sectionLabel} dentro de la página ${page?.page_name || pageSlug}.`
          : `Se creó la sección ${sectionLabel} dentro de la página ${page?.page_name || pageSlug}.`,
      });
      setEditingSection(null);
      setShowSectionForm(false);
    } catch (err: any) {
      const message = err?.message || 'No fue posible guardar la sección.';
      setError(message);
      setFeedback({
        tone: 'error',
        title: 'No se guardó la sección',
        description: `${message} Contexto: ${buildSectionLabel(editingSection, values.type, values.language)} en ${page?.page_name || pageSlug}.`,
      });
    }
  }

  async function handleDeleteSection(sectionId: string) {
    if (!confirm('¿Eliminar esta sección?')) return;
    if (!page?.slug && !id) return;

    try {
      const sectionToDelete = sections.find((section) => section.id === sectionId);
      await deletePageSection(sectionId);
      await reloadSections(page?.slug ?? id!);
      setFeedback({
        tone: 'success',
        title: 'Sección eliminada',
        description: `Se eliminó la sección ${buildSectionLabel(sectionToDelete)} de la página ${page?.page_name || page?.slug || id}.`,
      });
    } catch (err) {
      console.error('Error deleting section:', err);
      const message = (err as any)?.message || 'No fue posible eliminar la sección.';
      setFeedback({
        tone: 'error',
        title: 'No se eliminó la sección',
        description: `${message} Contexto: ${buildSectionLabel(section)} en ${page?.page_name || page?.slug || id}.`,
      });
    }
  }

  if (loading) {
    return <div className="text-sm text-gray-600">Cargando página...</div>;
  }

  return (
    <div className="space-y-6 pb-24">
      <Link
        to="/admin/pages"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a páginas
      </Link>

      <LocalizedForm
        title={isEditing ? `Editar página: ${page?.page_name || page?.slug}` : 'Crear página'}
        helperText="Aquí defines la página pública, sus rutas y su metadata principal. Luego puedes administrar sus secciones."
        fields={pageFields}
        initialValues={pageInitialValues}
        onSubmit={handleSavePage}
        onCancel={() => navigate('/admin/pages')}
        variant="page"
        submitLabel={isEditing ? 'Guardar datos de la página' : 'Crear página'}
        cancelLabel="Cancelar"
        isSubmitting={saving}
        errorMessage={error}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-sky-200/80 bg-white/75 p-5 shadow-lg shadow-sky-100/40 backdrop-blur-2xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Flujo de guardado</h3>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            El botón superior solo guarda nombre, rutas, SEO y visibilidad de la página. El botón del modal guarda la
            sección y la cierra inmediatamente. No necesitas volver a guardar la página después de editar una sección,
            salvo que también hayas cambiado esos datos generales.
          </p>
        </div>

        <div className={`rounded-[28px] border p-5 shadow-lg backdrop-blur-2xl ${
          isLiveCmsConnected
            ? 'border-emerald-200/80 bg-white/75 shadow-emerald-100/40'
            : 'border-amber-200/80 bg-white/75 shadow-amber-100/40'
        }`}>
          <h3 className={`text-sm font-semibold uppercase tracking-[0.18em] ${
            isLiveCmsConnected ? 'text-emerald-700' : 'text-amber-700'
          }`}>
            Conexion con la web
          </h3>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            {isLiveCmsConnected
              ? 'Las secciones de esta página sí están conectadas al sitio público. Cuando guardas una sección, el cambio debería reflejarse en la web.'
              : pageConnection === 'base'
                ? 'Las secciones de esta página existen en el CMS como base editorial, pero la ruta pública todavía usa su componente legacy. Aquí puedes preparar contenido, pero aún no controla completamente la página visible.'
                : 'Esta página está registrada en el admin, pero no existe una ruta pública conectada en el front actual. Úsala solo como borrador hasta que la implementación pública exista.'}
          </p>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/60 bg-white/75 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Secciones de la página</h2>
            <p className="mt-1 text-sm text-gray-600">
              Administra los bloques asociados a esta página. Cada fila representa una sección para un idioma y se guarda de forma independiente.
              El estado indica si la fila está activa en la web, desactivada manualmente o integrada dentro de otra sección por la lógica real de renderizado.
              {effectiveSlug === 'home'
                ? ' En Home solo se muestran las secciones que realmente están activas en el front, en el mismo orden en que aparecen públicamente.'
                : ''}
            </p>
          </div>

          <button
            onClick={() => {
              setEditingSection(null);
              setShowSectionForm(true);
            }}
            disabled={!page?.slug}
            className="inline-flex items-center gap-2 rounded-full bg-[#4387DF] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#3577cf] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Agregar sección
          </button>
        </div>

        {!page?.slug && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Guarda la página primero para poder agregar secciones.
          </div>
        )}

        {page?.slug && adminSections.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">
            Esta página todavía no tiene secciones.
          </div>
        )}

        {adminSections.length > 0 && (
          <div className="overflow-hidden rounded-[24px] border border-white/60 bg-white/60 shadow-inner backdrop-blur-xl">
            <table className="w-full">
              <thead className="border-b border-white/60 bg-white/50 backdrop-blur-xl">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Idioma</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Título</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Orden</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/60">
                {adminSections.map((section) => (
                  <tr key={section.id} className="bg-white/30">
                    <td className="px-4 py-3 text-sm text-gray-700">{section.language.toUpperCase()}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{section.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{getSectionDisplayTitle(section)}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{section.order}</td>
                    <td className="px-4 py-3 text-sm">
                      {(() => {
                        const visibility = getSectionVisibilityState(section, sections, page?.slug ?? id);
                        return (
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${visibility.className}`}>
                            {visibility.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {isSectionManagedFromHero(section, sections, page?.slug ?? id) ? (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-700">
                            Edita en hero
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingSection(section);
                              setShowSectionForm(true);
                            }}
                            className="rounded-full border border-white/60 bg-white/70 p-2 text-gray-500 backdrop-blur-xl transition hover:bg-white/90 hover:text-gray-900"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSection(section.id)}
                          className="rounded-full border border-white/60 bg-white/70 p-2 text-gray-500 backdrop-blur-xl transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showSectionForm && (
        <PageSectionDesigner
          title={editingSection ? 'Editar sección' : 'Agregar sección'}
          helperText="Cada sección se guarda por idioma y en cuanto guardas este formulario, queda persistida en el servidor. Si necesitas ES y EN, crea una fila para cada idioma."
          breadcrumb={[
            'Páginas',
            page?.page_name || page?.slug || 'Página',
            'Secciones',
            editingSection ? `${formatSectionTypeLabel(editingSection?.type)} ${editingSection?.language ? `(${String(editingSection.language).toUpperCase()})` : ''}` : 'Nueva sección',
          ]}
          pageSlug={effectiveSlug}
          initialValues={sectionInitialValues}
          referenceSection={referenceSection}
          onSubmit={handleSaveSection}
          onCancel={() => {
            setEditingSection(null);
            setShowSectionForm(false);
          }}
          submitLabel={editingSection ? 'Guardar sección y cerrar' : 'Crear sección y cerrar'}
          cancelLabel="Cancelar"
          isSubmitting={false}
          errorMessage={error}
        />
      )}

      {feedback && (
        <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-40 px-4 lg:px-8">
          <div className={`pointer-events-auto mx-auto w-full max-w-[1400px] rounded-[20px] border px-5 py-3 shadow-lg backdrop-blur-sm ${feedbackStyles(feedback.tone).wrapper}`}>
            <div className="flex items-start gap-3">
              {(() => {
                const { Icon, icon } = feedbackStyles(feedback.tone);
                return <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${icon}`} />;
              })()}
              <div className="min-w-0">
                <p className="text-sm font-semibold">{feedback.title}</p>
                <p className="mt-1 text-xs leading-5 opacity-90">{feedback.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
