import { useEffect, useMemo, useRef, useState, type FormEvent, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { ImagePlus, Plus, Trash2, Code2, Eye } from 'lucide-react';
import { GlassButton } from '../../shared/components/GlassButton';
import { GlassCard } from '../../shared/components/GlassCard';
import { HOME_ADMIN_SECTION_TYPES } from '../config/pageRegistry';
import { getMediaItems, type MediaItem } from '../services/mediaLibrary.service';
import { getAllPartners } from '../services/partners.service';
import { getAll as getAllServices } from '../services/services.service';
import { getAllIndustries } from '../services/industries.service';
import { getAllCaseStudies } from '../services/caseStudies.service';
import { getAllBlogPosts } from '../services/blogPosts.service';
import { getAllTestimonials } from '../services/testimonials.service';
import { clientLogosMarqueeItems } from '../../public/components/hero/clientLogosMarqueeData';

interface PageSectionDesignerProps {
  title: string;
  helperText?: string | null;
  breadcrumb?: string[];
  pageSlug?: string | null;
  initialValues: Record<string, any>;
  referenceSection?: {
    language?: string;
    title?: string | null;
    subtitle?: string | null;
    cta_label?: string | null;
    cta_href?: string | null;
    content?: any;
    config?: any;
  } | null;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

interface PanelItem {
  _id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
  accentColor: string;
}

interface NamedImageItem {
  _id: string;
  name: string;
  logo?: string;
  scale?: number;
}

interface PreHeroContentItem {
  title_es: string;
  title_en: string;
  subtitle_es: string;
  subtitle_en: string;
  ctaPrimary_es: string;
  ctaPrimary_en: string;
  ctaSecondary_es: string;
  ctaSecondary_en: string;
}

interface StatItem {
  _id: string;
  value: string;
  label: string;
}

interface MaturityLevelItem {
  _id: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface ReferenceOption {
  id: string;
  label: string;
  meta?: string;
}

interface SectionTypeOption {
  value: string;
  label: string;
}

const DEFAULT_SECTION_TYPE_OPTIONS: SectionTypeOption[] = [
  { value: 'preHero', label: 'Pre Hero' },
  { value: 'hero', label: 'Hero' },
  { value: 'strategicBannerTriple', label: 'Strategic Banner Triple' },
  { value: 'logos', label: 'Logos' },
  { value: 'partners', label: 'Partners' },
  { value: 'clients', label: 'Clients' },
  { value: 'maturityJourney', label: 'Maturity Journey' },
  { value: 'serviceHighlights', label: 'Service Highlights' },
  { value: 'industryHighlights', label: 'Industry Highlights' },
  { value: 'caseHighlights', label: 'Case Highlights' },
  { value: 'insightsEditorial', label: 'Insights Editorial' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'ctaBand', label: 'CTA Band' },
  { value: 'stats', label: 'Stats' },
  { value: 'custom', label: 'Custom' },
];

function safeParseJson(value: string | undefined, fallback: any) {
  if (!value?.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function serializeJson(value: any) {
  if (value === null || value === undefined || value === '') return '';
  return JSON.stringify(value, null, 2);
}

function parseIds(value: string) {
  return (value || '')
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createPanelItem(): PanelItem {
  return {
    _id: `panel-${crypto.randomUUID?.() || Date.now()}`,
    title: '',
    description: '',
    ctaLabel: '',
    ctaHref: '',
    backgroundImage: '',
    accentColor: '#4387DF',
  };
}

function createNamedImageItem(): NamedImageItem {
  return { _id: `media-${crypto.randomUUID?.() || Date.now()}`, name: '', logo: '', scale: 1 };
}

function createStatItem(): StatItem {
  return { _id: `stat-${crypto.randomUUID?.() || Date.now()}`, value: '', label: '' };
}

function createMaturityLevelItem(): MaturityLevelItem {
  return { _id: `level-${crypto.randomUUID?.() || Date.now()}`, title: '', description: '', ctaLabel: '', ctaHref: '' };
}

function ImagePreview({ src, alt }: { src?: string; alt: string }) {
  const [size, setSize] = useState('');

  if (!src) {
    return (
      <div className="flex h-24 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
        <span className="inline-flex items-center gap-2">
          <ImagePlus className="h-4 w-4" />
          Sin imagen
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <div className="flex h-32 items-center justify-center p-3">
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
      {size && <div className="border-t border-slate-200 px-3 py-2 text-xs text-slate-500">{size}</div>}
    </div>
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

function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`glass-input ui-select w-full rounded-2xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#4387DF]/20 ${props.className || ''}`}
    />
  );
}

export function PageSectionDesigner({
  title,
  helperText = null,
  breadcrumb = [],
  pageSlug = null,
  initialValues,
  referenceSection = null,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar sección',
  cancelLabel = 'Cancelar',
  isSubmitting = false,
  errorMessage = null,
}: PageSectionDesignerProps) {
  const parsedConfig = useMemo(() => safeParseJson(initialValues.config, {}), [initialValues.config]);
  const parsedContent = useMemo(() => safeParseJson(initialValues.content, null), [initialValues.content]);

  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [rawConfig, setRawConfig] = useState(initialValues.config ?? '');
  const [rawContent, setRawContent] = useState(initialValues.content ?? '');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [partnerMediaByName, setPartnerMediaByName] = useState<Record<string, string>>({});
  const [pickerTarget, setPickerTarget] = useState<{ list: 'panels' | 'logos' | 'clients' | 'partners' | 'heroMarquee'; index: number } | null>(null);
  const [mediaQuery, setMediaQuery] = useState('');
  const [pendingFocusId, setPendingFocusId] = useState<string | null>(null);
  const sectionItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [panelItems, setPanelItems] = useState<PanelItem[]>(() =>
    (parsedConfig?.panels || []).length > 0
      ? parsedConfig.panels.map((item: any, index: number) => ({ _id: item._id || `panel-${index}-${Date.now()}`, ...item }))
      : [createPanelItem()]
  );
  const [logos, setLogos] = useState<NamedImageItem[]>(() =>
    (parsedConfig?.logos || []).length > 0 ? parsedConfig.logos.map((item: any, index: number) => ({ _id: item._id || `logo-${index}-${Date.now()}`, ...item })) : [createNamedImageItem()]
  );
  const [clients, setClients] = useState<NamedImageItem[]>(() =>
    (parsedConfig?.clients || []).length > 0 ? parsedConfig.clients.map((item: any, index: number) => ({ _id: item._id || `client-${index}-${Date.now()}`, ...item })) : [createNamedImageItem()]
  );
  const [partners, setPartners] = useState<NamedImageItem[]>(() =>
    (parsedConfig?.partners || []).length > 0 ? parsedConfig.partners.map((item: any, index: number) => ({ _id: item._id || `partner-${index}-${Date.now()}`, ...item })) : [createNamedImageItem()]
  );
  const [heroMarqueeLogos, setHeroMarqueeLogos] = useState<NamedImageItem[]>(() =>
    Array.isArray(parsedConfig?.marqueeLogos) && parsedConfig.marqueeLogos.length > 0
      ? parsedConfig.marqueeLogos.map((item: any, index: number) => ({ _id: item._id || `hero-marquee-${index}-${Date.now()}`, ...item }))
      : clientLogosMarqueeItems.map((item, index) => ({ _id: `hero-marquee-default-${index}`, ...item }))
  );
  const [eyebrow, setEyebrow] = useState(parsedConfig?.eyebrow || '');
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState(parsedConfig?.secondaryCtaLabel || '');
  const [secondaryCtaHref, setSecondaryCtaHref] = useState(parsedConfig?.secondaryCtaHref || '');
  const [marqueeDurationSeconds, setMarqueeDurationSeconds] = useState(Number(parsedConfig?.marqueeDurationSeconds || 138));
  const [customHtml, setCustomHtml] = useState(
    typeof parsedContent?.html === 'string' ? parsedContent.html : typeof parsedContent === 'string' ? parsedContent : ''
  );
  const referenceContent = useMemo(() => referenceSection?.content || null, [referenceSection]);
  const [preHeroContent, setPreHeroContent] = useState<PreHeroContentItem>({
    title_es: parsedContent?.title_es || '',
    title_en: parsedContent?.title_en || '',
    subtitle_es: parsedContent?.subtitle_es || '',
    subtitle_en: parsedContent?.subtitle_en || '',
    ctaPrimary_es: parsedContent?.ctaPrimary_es || '',
    ctaPrimary_en: parsedContent?.ctaPrimary_en || '',
    ctaSecondary_es: parsedContent?.ctaSecondary_es || '',
    ctaSecondary_en: parsedContent?.ctaSecondary_en || '',
  });
  const [statsItems, setStatsItems] = useState<StatItem[]>(() =>
    Array.isArray(parsedConfig?.stats) && parsedConfig.stats.length > 0
      ? parsedConfig.stats.map((item: any, index: number) => ({ _id: item._id || `stat-${index}-${Date.now()}`, ...item }))
      : [createStatItem()]
  );
  const [maturityLevels, setMaturityLevels] = useState<MaturityLevelItem[]>(() =>
    Array.isArray(parsedConfig?.levels) && parsedConfig.levels.length > 0
      ? parsedConfig.levels.map((item: any, index: number) => ({ _id: item._id || `level-${index}-${Date.now()}`, ...item }))
      : [createMaturityLevelItem()]
  );
  const [cardsCount, setCardsCount] = useState(parsedConfig?.cardsCount || 3);
  const [metricValue, setMetricValue] = useState(parsedConfig?.metricValue || '');
  const [metricLabel, setMetricLabel] = useState(parsedConfig?.metricLabel || '');
  const [featuredCardTitle, setFeaturedCardTitle] = useState(parsedConfig?.featuredCardTitle || '');
  const [featuredCardText, setFeaturedCardText] = useState(parsedConfig?.featuredCardText || '');
  const [featuredCardCtaLabel, setFeaturedCardCtaLabel] = useState(parsedConfig?.featuredCardCtaLabel || '');
  const [featuredCardCtaHref, setFeaturedCardCtaHref] = useState(parsedConfig?.featuredCardCtaHref || '');
  const [moreInsightsTitle, setMoreInsightsTitle] = useState(parsedConfig?.moreInsightsTitle || '');
  const [moreInsightsText, setMoreInsightsText] = useState(parsedConfig?.moreInsightsText || '');
  const [moreInsightsCtaLabel, setMoreInsightsCtaLabel] = useState(parsedConfig?.moreInsightsCtaLabel || '');
  const [moreInsightsCtaHref, setMoreInsightsCtaHref] = useState(parsedConfig?.moreInsightsCtaHref || '');
  const [serviceOptions, setServiceOptions] = useState<ReferenceOption[]>([]);
  const [industryOptions, setIndustryOptions] = useState<ReferenceOption[]>([]);
  const [caseStudyOptions, setCaseStudyOptions] = useState<ReferenceOption[]>([]);
  const [blogOptions, setBlogOptions] = useState<ReferenceOption[]>([]);
  const [testimonialOptions, setTestimonialOptions] = useState<ReferenceOption[]>([]);
  const isHomePage = pageSlug === 'home';
  const sectionTypeOptions = useMemo(() => {
    if (!isHomePage) {
      return DEFAULT_SECTION_TYPE_OPTIONS;
    }

    return DEFAULT_SECTION_TYPE_OPTIONS.filter((option) =>
      HOME_ADMIN_SECTION_TYPES.includes(option.value as (typeof HOME_ADMIN_SECTION_TYPES)[number])
    );
  }, [isHomePage]);

  useEffect(() => {
    setValues(initialValues);
    setRawConfig(initialValues.config ?? '');
    setRawContent(initialValues.content ?? '');
    setPreHeroContent({
      title_es: parsedContent?.title_es || '',
      title_en: parsedContent?.title_en || '',
      subtitle_es: parsedContent?.subtitle_es || '',
      subtitle_en: parsedContent?.subtitle_en || '',
      ctaPrimary_es: parsedContent?.ctaPrimary_es || '',
      ctaPrimary_en: parsedContent?.ctaPrimary_en || '',
      ctaSecondary_es: parsedContent?.ctaSecondary_es || '',
      ctaSecondary_en: parsedContent?.ctaSecondary_en || '',
    });
    setPanelItems(
      Array.isArray(parsedConfig?.panels) && parsedConfig.panels.length > 0
        ? parsedConfig.panels.map((item: any, index: number) => ({ _id: item._id || `panel-${index}-${Date.now()}`, ...item }))
        : [createPanelItem()]
    );
    setEyebrow(parsedConfig?.eyebrow || '');
    setSecondaryCtaLabel(parsedConfig?.secondaryCtaLabel || '');
    setSecondaryCtaHref(parsedConfig?.secondaryCtaHref || '');
    setHeroMarqueeLogos(
      Array.isArray(parsedConfig?.marqueeLogos) && parsedConfig.marqueeLogos.length > 0
        ? parsedConfig.marqueeLogos.map((item: any, index: number) => ({ _id: item._id || `hero-marquee-${index}-${Date.now()}`, ...item }))
        : clientLogosMarqueeItems.map((item, index) => ({ _id: `hero-marquee-default-${index}`, ...item }))
    );
    setMarqueeDurationSeconds(Number(parsedConfig?.marqueeDurationSeconds || 138));
    setStatsItems(
      Array.isArray(parsedConfig?.stats) && parsedConfig.stats.length > 0
        ? parsedConfig.stats.map((item: any, index: number) => ({ _id: item._id || `stat-${index}-${Date.now()}`, ...item }))
        : [createStatItem()]
    );
    setMaturityLevels(
      Array.isArray(parsedConfig?.levels) && parsedConfig.levels.length > 0
        ? parsedConfig.levels.map((item: any, index: number) => ({ _id: item._id || `level-${index}-${Date.now()}`, ...item }))
        : [createMaturityLevelItem()]
    );
    setCardsCount(parsedConfig?.cardsCount || 3);
    setMetricValue(parsedConfig?.metricValue || '');
    setMetricLabel(parsedConfig?.metricLabel || '');
    setFeaturedCardTitle(parsedConfig?.featuredCardTitle || '');
    setFeaturedCardText(parsedConfig?.featuredCardText || '');
    setFeaturedCardCtaLabel(parsedConfig?.featuredCardCtaLabel || '');
    setFeaturedCardCtaHref(parsedConfig?.featuredCardCtaHref || '');
    setMoreInsightsTitle(parsedConfig?.moreInsightsTitle || '');
    setMoreInsightsText(parsedConfig?.moreInsightsText || '');
    setMoreInsightsCtaLabel(parsedConfig?.moreInsightsCtaLabel || '');
    setMoreInsightsCtaHref(parsedConfig?.moreInsightsCtaHref || '');
  }, [initialValues, parsedConfig, parsedContent]);

  useEffect(() => {
    void getMediaItems().then(setMediaItems).catch((error) => {
      console.error('Error loading media items:', error);
    });

    void getAllPartners()
      .then((records) => {
        const nextMap: Record<string, string> = {};
        for (const record of records) {
          const name = String(record?.name || '').trim().toLowerCase();
          const logo = record?.logo_url || record?.logo;
          if (name && logo) {
            nextMap[name] = logo;
          }
        }
        setPartnerMediaByName(nextMap);
      })
      .catch((error) => {
        console.error('Error loading partner logos:', error);
      });

    void getAllServices()
      .then((records) => setServiceOptions(records.map((item: any) => ({ id: item.id, label: item.title_es || item.title_en || item.title || item.slug_en || item.slug, meta: item.slug_en || item.slug_es || item.slug }))))
      .catch((error) => console.error('Error loading services:', error));
    void getAllIndustries()
      .then((records) => setIndustryOptions(records.map((item: any) => ({ id: item.id, label: item.title_es || item.title_en || item.title || item.slug_en || item.slug, meta: item.slug_en || item.slug_es || item.slug }))))
      .catch((error) => console.error('Error loading industries:', error));
    void getAllCaseStudies()
      .then((records) => setCaseStudyOptions(records.map((item: any) => ({ id: item.id, label: item.client || item.title_es || item.title_en || item.title || 'Caso', meta: item.slug_en || item.slug_es || item.slug }))))
      .catch((error) => console.error('Error loading case studies:', error));
    void getAllBlogPosts()
      .then((records) => setBlogOptions(records.map((item: any) => ({ id: item.id, label: item.title_es || item.title_en || item.title || 'Insight', meta: item.slug_en || item.slug_es || item.slug }))))
      .catch((error) => console.error('Error loading blog posts:', error));
    void getAllTestimonials()
      .then((records) => setTestimonialOptions(records.map((item: any) => ({ id: item.id, label: item.client_name || item.name || 'Testimonial', meta: item.client_company || '' }))))
      .catch((error) => console.error('Error loading testimonials:', error));
  }, []);

  useEffect(() => {
    if (!pendingFocusId) return;

    const target = sectionItemRefs.current[pendingFocusId];
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const focusable = target.querySelector('input, textarea, select, button') as HTMLElement | null;
    focusable?.focus();
    setPendingFocusId(null);
  }, [pendingFocusId, panelItems, logos, clients, partners, heroMarqueeLogos, statsItems, maturityLevels]);

  function updateValue(name: string, value: any) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function updateListItem<T>(items: T[], setter: (items: T[]) => void, index: number, key: string, value: any) {
    setter(items.map((item: any, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  }

  function addItem<T extends { _id: string }>(items: T[], setter: (items: T[]) => void, factory: () => T) {
    const newItem = factory();
    setter([...items, newItem]);
    setPendingFocusId(newItem._id);
  }

  function removeItem<T>(items: T[], setter: (items: T[]) => void, index: number, factory?: () => T) {
    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    setter(nextItems.length > 0 ? nextItems : [factory ? factory() : items[0]]);
  }

  function selectedReferenceIds() {
    return parseIds(values.referenced_ids || '');
  }

  function toggleReference(id: string) {
    const current = selectedReferenceIds();
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    updateValue('referenced_ids', next.join('\n'));
  }

  function buildConfigForType() {
    switch (values.type) {
      case 'hero':
        return {
          eyebrow: eyebrow || null,
          secondaryCtaLabel: secondaryCtaLabel || null,
          secondaryCtaHref: secondaryCtaHref || null,
          marqueeDurationSeconds: Number(marqueeDurationSeconds || 138),
          marqueeLogos: heroMarqueeLogos
            .filter((item) => item.name || item.logo)
            .map(({ _id, ...item }) => ({
              ...item,
              scale: item.scale && Number.isFinite(Number(item.scale)) ? Number(item.scale) : 1,
            })),
        };
      case 'strategicBannerTriple':
        return {
          panels: panelItems
            .filter((item) => item.title || item.description || item.backgroundImage)
            .map(({ _id, ...item }) => item),
        };
      case 'logos':
        return {
          logos: logos.filter((item) => item.name || item.logo).map(({ _id, ...item }) => item),
        };
      case 'clients':
        return {
          clients: clients.filter((item) => item.name || item.logo).map(({ _id, ...item }) => item),
        };
      case 'partners':
        return {
          eyebrow: eyebrow || null,
          partners: partners.filter((item) => item.name || item.logo).map(({ _id, ...item }) => item),
        };
      case 'maturityJourney':
        return {
          levels: maturityLevels
            .filter((item) => item.title || item.description || item.ctaLabel || item.ctaHref)
            .map(({ _id, ...item }) => item),
        };
      case 'stats':
        return {
          stats: statsItems
            .filter((item) => item.value || item.label)
            .map(({ _id, ...item }) => item),
        };
      case 'serviceHighlights':
        return {
          cardsCount: Number(cardsCount || 3),
          metricValue: metricValue || null,
          metricLabel: metricLabel || null,
          featuredCardTitle: featuredCardTitle || null,
          featuredCardText: featuredCardText || null,
          featuredCardCtaLabel: featuredCardCtaLabel || null,
          featuredCardCtaHref: featuredCardCtaHref || null,
        };
      case 'insightsEditorial':
        return {
          moreInsightsTitle: moreInsightsTitle || null,
          moreInsightsText: moreInsightsText || null,
          moreInsightsCtaLabel: moreInsightsCtaLabel || null,
          moreInsightsCtaHref: moreInsightsCtaHref || null,
        };
      default:
        return parsedConfig;
    }
  }

  function buildContentForType() {
    if (values.type === 'preHero') {
      return preHeroContent;
    }
    if (values.type === 'custom') {
      return customHtml ? { html: customHtml } : null;
    }
    return parsedContent;
  }

  const formId = 'page-section-designer-form';

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextConfig = advancedMode ? rawConfig : serializeJson(buildConfigForType());
    const nextContent = advancedMode ? rawContent : serializeJson(buildContentForType());

    await onSubmit({
      ...values,
      referenced_ids: values.referenced_ids ?? '',
      config: nextConfig,
      content: nextContent,
    });
  }

  const visualType = values.type;
  const filteredMedia = mediaItems.filter((item) =>
    `${item.label} ${item.source} ${item.url}`.toLowerCase().includes(mediaQuery.trim().toLowerCase())
  );
  const currentLanguageLabel = values.language === 'en' ? 'EN' : 'ES';
  const referenceLanguageLabel = referenceSection?.language ? String(referenceSection.language).toUpperCase() : values.language === 'en' ? 'ES' : 'EN';

  function applyMedia(url: string) {
    if (!pickerTarget) return;
    if (pickerTarget.list === 'panels') {
      updateListItem(panelItems, setPanelItems, pickerTarget.index, 'backgroundImage', url);
    }
    if (pickerTarget.list === 'logos') {
      updateListItem(logos, setLogos, pickerTarget.index, 'logo', url);
    }
    if (pickerTarget.list === 'clients') {
      updateListItem(clients, setClients, pickerTarget.index, 'logo', url);
    }
    if (pickerTarget.list === 'partners') {
      updateListItem(partners, setPartners, pickerTarget.index, 'logo', url);
    }
    if (pickerTarget.list === 'heroMarquee') {
      updateListItem(heroMarqueeLogos, setHeroMarqueeLogos, pickerTarget.index, 'logo', url);
    }
    setPickerTarget(null);
    setMediaQuery('');
  }

  function resolvePreviewImage(item: NamedImageItem, kind: 'logos' | 'clients' | 'partners') {
    if (item.logo) return item.logo;
    if (kind === 'partners') {
      const key = item.name?.trim().toLowerCase();
      if (key && partnerMediaByName[key]) {
        return partnerMediaByName[key];
      }
    }
    return undefined;
  }

  function bindSectionItemRef(id: string) {
    return (node: HTMLDivElement | null) => {
      sectionItemRefs.current[id] = node;
    };
  }

  const referenceOptions = useMemo(() => {
    switch (visualType) {
      case 'serviceHighlights':
        return serviceOptions;
      case 'industryHighlights':
        return industryOptions;
      case 'caseHighlights':
        return caseStudyOptions;
      case 'insightsEditorial':
        return blogOptions;
      case 'testimonials':
        return testimonialOptions;
      default:
        return [];
    }
  }, [visualType, serviceOptions, industryOptions, caseStudyOptions, blogOptions, testimonialOptions]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/35 p-4 backdrop-blur-[2px]">
      <div className="flex w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/20" style={{ maxHeight: 'min(88vh, 980px)' }}>
        <div className="border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex items-start justify-between gap-6">
            <div>
              {breadcrumb.length > 0 && (
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  {breadcrumb.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-center gap-2">
                      {index > 0 && <span className="text-slate-300">/</span>}
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
              {helperText && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{helperText}</p>}
            </div>
            <GlassButton type="button" variant="glass" size="sm" onClick={onCancel}>Cerrar</GlassButton>
          </div>
        </div>

        <form id={formId} onSubmit={handleSubmit} className="min-h-0 flex-1 overflow-y-auto bg-white">
          <div className="space-y-6 px-6 py-6">
            {errorMessage && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.1fr,1.4fr]">
              <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Base de la sección</h3>
                <div className="space-y-4">
                  <div className="rounded-[22px] border border-slate-200 bg-slate-50/70 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[18px] border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Idioma en edición</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {values.language === 'en' ? 'Inglés (EN)' : 'Español (ES)'}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Los textos que modifiques en este formulario se guardan solo para este idioma.
                        </p>
                      </div>
                      <div className="rounded-[18px] border border-slate-200 bg-white px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Idioma de referencia</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {referenceLanguageLabel === 'EN' ? 'Inglés (EN)' : 'Español (ES)'}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Úsalo para contrastar copy. Si necesitas ese idioma, se administra en su propia fila.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <FieldLabel required>Idioma</FieldLabel>
                    <Select value={values.language || 'es'} onChange={(e) => updateValue('language', e.target.value)}>
                      <option value="es">Spanish</option>
                      <option value="en">English</option>
                    </Select>
                  </div>
                  <div>
                    <FieldLabel required>Tipo de sección</FieldLabel>
                    <Select value={values.type || 'custom'} onChange={(e) => updateValue('type', e.target.value)}>
                      {sectionTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Título</FieldLabel>
                    <TextInput value={values.title || ''} onChange={(e) => updateValue('title', e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel>Subtítulo</FieldLabel>
                    <TextArea rows={3} value={values.subtitle || ''} onChange={(e) => updateValue('subtitle', e.target.value)} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel>CTA label</FieldLabel>
                      <TextInput value={values.cta_label || ''} onChange={(e) => updateValue('cta_label', e.target.value)} />
                    </div>
                    <div>
                      <FieldLabel>CTA URL</FieldLabel>
                      <TextInput value={values.cta_href || ''} onChange={(e) => updateValue('cta_href', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <FieldLabel required>Orden</FieldLabel>
                      <TextInput type="number" value={values.order || 0} onChange={(e) => updateValue('order', e.target.value)} />
                    </div>
                    <label className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-slate-700">
                      <input type="checkbox" checked={!!values.is_enabled} onChange={(e) => updateValue('is_enabled', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#4387DF]" />
                      Habilitada
                    </label>
                  </div>
                  {!['serviceHighlights', 'industryHighlights', 'caseHighlights', 'insightsEditorial', 'testimonials'].includes(visualType) && (
                    <div>
                      <FieldLabel>Referenced IDs</FieldLabel>
                      <TextArea rows={3} value={values.referenced_ids || ''} onChange={(e) => updateValue('referenced_ids', e.target.value)} placeholder="Uno por línea o separados por coma" />
                    </div>
                  )}
                </div>
              </GlassCard>

              <div className="space-y-6">
                {visualType === 'preHero' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-slate-900">Contenido pre hero</h3>
                      <p className="mt-1 text-sm text-slate-600">Editas solo el idioma actual. El idioma opuesto se muestra abajo como referencia visual, pero no se modifica desde este modal.</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Edición actual · {currentLanguageLabel}</p>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <FieldLabel>Título {currentLanguageLabel}</FieldLabel>
                            <TextArea
                              rows={4}
                              value={values.language === 'en' ? preHeroContent.title_en : preHeroContent.title_es}
                              onChange={(e) =>
                                setPreHeroContent((current) => ({
                                  ...current,
                                  [values.language === 'en' ? 'title_en' : 'title_es']: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <FieldLabel>Subtítulo {currentLanguageLabel}</FieldLabel>
                            <TextArea
                              rows={4}
                              value={values.language === 'en' ? preHeroContent.subtitle_en : preHeroContent.subtitle_es}
                              onChange={(e) =>
                                setPreHeroContent((current) => ({
                                  ...current,
                                  [values.language === 'en' ? 'subtitle_en' : 'subtitle_es']: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <FieldLabel>CTA principal {currentLanguageLabel}</FieldLabel>
                            <TextInput
                              value={values.language === 'en' ? preHeroContent.ctaPrimary_en : preHeroContent.ctaPrimary_es}
                              onChange={(e) =>
                                setPreHeroContent((current) => ({
                                  ...current,
                                  [values.language === 'en' ? 'ctaPrimary_en' : 'ctaPrimary_es']: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <FieldLabel>CTA secundaria {currentLanguageLabel}</FieldLabel>
                            <TextInput
                              value={values.language === 'en' ? preHeroContent.ctaSecondary_en : preHeroContent.ctaSecondary_es}
                              onChange={(e) =>
                                setPreHeroContent((current) => ({
                                  ...current,
                                  [values.language === 'en' ? 'ctaSecondary_en' : 'ctaSecondary_es']: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Referencia · {referenceLanguageLabel}</p>
                        </div>
                        <div className="grid gap-4">
                          <div>
                            <FieldLabel>Título {referenceLanguageLabel}</FieldLabel>
                            <TextArea rows={4} value={values.language === 'en' ? referenceContent?.title_es || '' : referenceContent?.title_en || ''} readOnly className="bg-slate-50 text-slate-500" />
                          </div>
                          <div>
                            <FieldLabel>Subtítulo {referenceLanguageLabel}</FieldLabel>
                            <TextArea rows={4} value={values.language === 'en' ? referenceContent?.subtitle_es || '' : referenceContent?.subtitle_en || ''} readOnly className="bg-slate-50 text-slate-500" />
                          </div>
                          <div>
                            <FieldLabel>CTA principal {referenceLanguageLabel}</FieldLabel>
                            <TextInput value={values.language === 'en' ? referenceContent?.ctaPrimary_es || '' : referenceContent?.ctaPrimary_en || ''} readOnly className="bg-slate-50 text-slate-500" />
                          </div>
                          <div>
                            <FieldLabel>CTA secundaria {referenceLanguageLabel}</FieldLabel>
                            <TextInput value={values.language === 'en' ? referenceContent?.ctaSecondary_es || '' : referenceContent?.ctaSecondary_en || ''} readOnly className="bg-slate-50 text-slate-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )}

                {visualType === 'hero' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Hero principal</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Esta sección reemplaza el antiguo slider del inicio. Aquí administras el copy principal y los CTAs del hero único del Home.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <FieldLabel>Eyebrow / etiqueta superior</FieldLabel>
                        <TextInput value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} placeholder="Consultoría Data & AI" />
                      </div>
                      <div>
                        <FieldLabel>CTA secundaria</FieldLabel>
                        <TextInput value={secondaryCtaLabel} onChange={(e) => setSecondaryCtaLabel(e.target.value)} />
                      </div>
                      <div>
                        <FieldLabel>URL CTA secundaria</FieldLabel>
                        <TextInput value={secondaryCtaHref} onChange={(e) => setSecondaryCtaHref(e.target.value)} />
                      </div>
                      <div>
                        <FieldLabel>Velocidad marquee (segundos)</FieldLabel>
                        <TextInput
                          type="number"
                          min="20"
                          step="1"
                          value={marqueeDurationSeconds}
                          onChange={(e) => setMarqueeDurationSeconds(Number(e.target.value || 138))}
                        />
                      </div>
                    </div>

                    <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Comportamiento del hero</h4>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        El fondo visual del hero es una animación integrada en el front. Ya no depende de slides, banners rotativos ni imágenes administradas desde esta sección.
                      </p>
                    </div>

                    <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Logos del marquee inferior</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            Esta lista controla el carrusel doble que aparece debajo del hero en la página pública. Cada logo usa una sola versión base en blanco; no se administra una variante negra aparte.
                          </p>
                        </div>
                        <GlassButton type="button" variant="outline" size="sm" onClick={() => addItem(heroMarqueeLogos, setHeroMarqueeLogos, createNamedImageItem)}>
                          <Plus className="h-4 w-4" />
                          Agregar logo
                        </GlassButton>
                      </div>

                      <div className="space-y-4">
                        {heroMarqueeLogos.map((item, index) => (
                          <div key={item._id} ref={bindSectionItemRef(item._id)} className="grid gap-4 rounded-[24px] border border-slate-200 bg-white/80 p-4 lg:grid-cols-[1.3fr,0.8fr]">
                            <div className="space-y-4">
                              <div>
                                <FieldLabel>Nombre</FieldLabel>
                                <TextInput value={item.name} onChange={(e) => updateListItem(heroMarqueeLogos, setHeroMarqueeLogos, index, 'name', e.target.value)} />
                              </div>
                              <div>
                                <FieldLabel>Ruta del logo base (blanco)</FieldLabel>
                                <TextInput value={item.logo || ''} onChange={(e) => updateListItem(heroMarqueeLogos, setHeroMarqueeLogos, index, 'logo', e.target.value)} placeholder="/assets/... o URL de la versión blanca" />
                              </div>
                              <div>
                                <FieldLabel>Escala visual</FieldLabel>
                                <TextInput
                                  type="number"
                                  min="0.5"
                                  max="2"
                                  step="0.01"
                                  value={item.scale ?? 1}
                                  onChange={(e) => updateListItem(heroMarqueeLogos, setHeroMarqueeLogos, index, 'scale', Number(e.target.value || 1))}
                                />
                              </div>
                              <div className="flex justify-end">
                                <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerTarget({ list: 'heroMarquee', index })}>
                                  Elegir desde biblioteca
                                </GlassButton>
                              </div>
                              <button type="button" onClick={() => removeItem(heroMarqueeLogos, setHeroMarqueeLogos, index, createNamedImageItem)} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                                Eliminar
                              </button>
                            </div>
                            <div className="space-y-2">
                              <ImagePreview src={item.logo} alt={item.name || `Marquee logo ${index + 1}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                )}

                {visualType === 'strategicBannerTriple' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    {isHomePage ? (
                      <>
                        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4">
                          <h3 className="text-lg font-semibold text-amber-900">Sección legacy del Home</h3>
                          <p className="mt-2 text-sm leading-6 text-amber-800">
                            El inicio ya no usa banners rotativos. Esta sección queda solo como referencia histórica y no participa en el render público mientras exista un hero activo.
                          </p>
                          <p className="mt-2 text-sm leading-6 text-amber-800">
                            Para cambiar la primera pantalla del Home, edita la sección <strong>hero</strong> del mismo idioma.
                          </p>
                        </div>

                        <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Datos legacy solo lectura</h4>
                          <div className="mt-4 space-y-4">
                            {panelItems.map((panel, index) => (
                              <div key={panel._id} className="grid gap-4 rounded-[20px] border border-slate-200 bg-white p-4 lg:grid-cols-[1.3fr,0.9fr]">
                                <div className="space-y-3">
                                  <div>
                                    <FieldLabel>Título</FieldLabel>
                                    <TextInput value={panel.title} readOnly className="bg-slate-50 text-slate-500" />
                                  </div>
                                  <div>
                                    <FieldLabel>Descripción</FieldLabel>
                                    <TextArea rows={3} value={panel.description} readOnly className="bg-slate-50 text-slate-500" />
                                  </div>
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <FieldLabel>CTA label</FieldLabel>
                                      <TextInput value={panel.ctaLabel} readOnly className="bg-slate-50 text-slate-500" />
                                    </div>
                                    <div>
                                      <FieldLabel>CTA URL</FieldLabel>
                                      <TextInput value={panel.ctaHref} readOnly className="bg-slate-50 text-slate-500" />
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <FieldLabel>Imagen de fondo</FieldLabel>
                                    <TextInput value={panel.backgroundImage} readOnly className="bg-slate-50 text-slate-500" />
                                  </div>
                                  <ImagePreview src={panel.backgroundImage} alt={panel.title || `Panel ${index + 1}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">Paneles estratégicos</h3>
                            <p className="mt-1 text-sm text-slate-600">Edita el contenido visual de esta sección cuando se use fuera del Home.</p>
                          </div>
                          <GlassButton type="button" variant="outline" size="sm" onClick={() => addItem(panelItems, setPanelItems, createPanelItem)}>
                            <Plus className="h-4 w-4" />
                            Agregar panel
                          </GlassButton>
                        </div>

                        <div className="space-y-5">
                          {panelItems.map((panel, index) => (
                            <div key={panel._id} ref={bindSectionItemRef(panel._id)} className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                              <div className="mb-4 flex items-center justify-between">
                                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Panel {index + 1}</h4>
                                <button type="button" onClick={() => removeItem(panelItems, setPanelItems, index, createPanelItem)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="grid gap-4 lg:grid-cols-[1.3fr,0.9fr]">
                                <div className="space-y-4">
                                  <div>
                                    <FieldLabel>Título</FieldLabel>
                                    <TextInput value={panel.title} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'title', e.target.value)} />
                                  </div>
                                  <div>
                                    <FieldLabel>Descripción</FieldLabel>
                                    <TextArea rows={3} value={panel.description} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'description', e.target.value)} />
                                  </div>
                                  <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                      <FieldLabel>CTA label</FieldLabel>
                                      <TextInput value={panel.ctaLabel} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'ctaLabel', e.target.value)} />
                                    </div>
                                    <div>
                                      <FieldLabel>CTA URL</FieldLabel>
                                      <TextInput value={panel.ctaHref} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'ctaHref', e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <FieldLabel>Imagen de fondo</FieldLabel>
                                    <TextInput value={panel.backgroundImage} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'backgroundImage', e.target.value)} placeholder="/assets/... o URL" />
                                  </div>
                                  <div className="flex justify-end">
                                    <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerTarget({ list: 'panels', index })}>
                                      Elegir desde biblioteca
                                    </GlassButton>
                                  </div>
                                  <ImagePreview src={panel.backgroundImage} alt={panel.title || `Panel ${index + 1}`} />
                                  <div>
                                    <FieldLabel>Color de acento</FieldLabel>
                                    <div className="flex items-center gap-3">
                                      <input type="color" value={panel.accentColor || '#4387DF'} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'accentColor', e.target.value)} className="h-11 w-14 rounded-xl border border-slate-200 bg-white" />
                                      <TextInput value={panel.accentColor || '#4387DF'} onChange={(e) => updateListItem(panelItems, setPanelItems, index, 'accentColor', e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </GlassCard>
                )}

                {visualType === 'logos' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Logos / nombres</h3>
                        <p className="mt-1 text-sm text-slate-600">Carga cada logo o deja solo el nombre si quieres una fila textual.</p>
                      </div>
                      <GlassButton type="button" variant="outline" size="sm" onClick={() => addItem(logos, setLogos, createNamedImageItem)}>
                        <Plus className="h-4 w-4" />
                        Agregar logo
                      </GlassButton>
                    </div>
                    <div className="space-y-4">
                      {logos.map((item, index) => (
                        <div key={item._id} ref={bindSectionItemRef(item._id)} className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 lg:grid-cols-[1.3fr,0.8fr]">
                          <div className="space-y-4">
                            <div>
                              <FieldLabel>Nombre</FieldLabel>
                              <TextInput value={item.name} onChange={(e) => updateListItem(logos, setLogos, index, 'name', e.target.value)} />
                            </div>
                            <div>
                              <FieldLabel>Ruta del logo</FieldLabel>
                              <TextInput value={item.logo || ''} onChange={(e) => updateListItem(logos, setLogos, index, 'logo', e.target.value)} placeholder="/assets/... o URL" />
                            </div>
                            <div className="flex justify-end">
                              <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerTarget({ list: 'logos', index })}>
                                Elegir desde biblioteca
                              </GlassButton>
                            </div>
                            <button type="button" onClick={() => removeItem(logos, setLogos, index)} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </button>
                          </div>
                          <div className="space-y-2">
                            <ImagePreview src={resolvePreviewImage(item, 'logos')} alt={item.name || `Logo ${index + 1}`} />
                            {!item.logo && resolvePreviewImage(item, 'logos') && (
                              <p className="text-xs text-slate-500">Vista previa resuelta automáticamente desde medios existentes.</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {(visualType === 'clients' || visualType === 'partners') && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{visualType === 'clients' ? 'Clientes' : 'Partners'}</h3>
                        <p className="mt-1 text-sm text-slate-600">Gestiona nombres, logos y el orden visual del bloque.</p>
                      </div>
                      <GlassButton
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addItem(visualType === 'clients' ? clients : partners, visualType === 'clients' ? setClients : setPartners, createNamedImageItem)}
                      >
                        <Plus className="h-4 w-4" />
                        Agregar item
                      </GlassButton>
                    </div>
                    {visualType === 'partners' && (
                      <div className="mb-4">
                        <FieldLabel>Eyebrow</FieldLabel>
                        <TextInput value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} />
                      </div>
                    )}
                    <div className="space-y-4">
                      {(visualType === 'clients' ? clients : partners).map((item, index) => (
                        <div key={item._id} ref={bindSectionItemRef(item._id)} className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 lg:grid-cols-[1.3fr,0.8fr]">
                          <div className="space-y-4">
                            <div>
                              <FieldLabel>Nombre</FieldLabel>
                              <TextInput value={item.name} onChange={(e) => updateListItem(visualType === 'clients' ? clients : partners, visualType === 'clients' ? setClients : setPartners, index, 'name', e.target.value)} />
                            </div>
                            <div>
                              <FieldLabel>Logo</FieldLabel>
                              <TextInput value={item.logo || ''} onChange={(e) => updateListItem(visualType === 'clients' ? clients : partners, visualType === 'clients' ? setClients : setPartners, index, 'logo', e.target.value)} placeholder="/assets/... o URL" />
                            </div>
                            <div className="flex justify-end">
                              <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerTarget({ list: visualType === 'clients' ? 'clients' : 'partners', index })}>
                                Elegir desde biblioteca
                              </GlassButton>
                            </div>
                            <button type="button" onClick={() => removeItem(visualType === 'clients' ? clients : partners, visualType === 'clients' ? setClients : setPartners, index)} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </button>
                          </div>
                          <div className="space-y-2">
                            <ImagePreview
                              src={resolvePreviewImage(item, visualType === 'clients' ? 'clients' : 'partners')}
                              alt={item.name || `${visualType} ${index + 1}`}
                            />
                            {!item.logo && visualType === 'partners' && resolvePreviewImage(item, 'partners') && (
                              <p className="text-xs text-slate-500">
                                Vista previa heredada desde la colección `Partners`.
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {visualType === 'custom' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <Eye className="h-5 w-5 text-slate-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Contenido visual</h3>
                        <p className="mt-1 text-sm text-slate-600">Usa HTML simple cuando quieras un bloque libre, pero sin entrar a JSON.</p>
                      </div>
                    </div>
                    <div>
                      <FieldLabel>HTML del bloque</FieldLabel>
                      <TextArea rows={12} value={customHtml} onChange={(e) => setCustomHtml(e.target.value)} placeholder="<h2>Título</h2><p>Contenido...</p>" />
                    </div>
                  </GlassCard>
                )}

                {visualType === 'maturityJourney' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Niveles de madurez</h3>
                        <p className="mt-1 text-sm text-slate-600">Cada tarjeta representa una etapa del journey.</p>
                      </div>
                      <GlassButton type="button" variant="outline" size="sm" onClick={() => addItem(maturityLevels, setMaturityLevels, createMaturityLevelItem)}>
                        <Plus className="h-4 w-4" />
                        Agregar nivel
                      </GlassButton>
                    </div>
                    <div className="space-y-4">
                      {maturityLevels.map((item, index) => (
                        <div key={item._id} ref={bindSectionItemRef(item._id)} className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Nivel {index + 1}</h4>
                            <button type="button" onClick={() => removeItem(maturityLevels, setMaturityLevels, index, createMaturityLevelItem)} className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <FieldLabel>Título</FieldLabel>
                              <TextInput value={item.title} onChange={(e) => updateListItem(maturityLevels, setMaturityLevels, index, 'title', e.target.value)} />
                            </div>
                            <div>
                              <FieldLabel>Descripción</FieldLabel>
                              <TextArea rows={3} value={item.description} onChange={(e) => updateListItem(maturityLevels, setMaturityLevels, index, 'description', e.target.value)} />
                            </div>
                            <div>
                              <FieldLabel>CTA label</FieldLabel>
                              <TextInput value={item.ctaLabel || ''} onChange={(e) => updateListItem(maturityLevels, setMaturityLevels, index, 'ctaLabel', e.target.value)} />
                            </div>
                            <div>
                              <FieldLabel>CTA URL</FieldLabel>
                              <TextInput value={item.ctaHref || ''} onChange={(e) => updateListItem(maturityLevels, setMaturityLevels, index, 'ctaHref', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {visualType === 'stats' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Estadísticas</h3>
                        <p className="mt-1 text-sm text-slate-600">Edita cada métrica que aparece en la grilla.</p>
                      </div>
                      <GlassButton type="button" variant="outline" size="sm" onClick={() => addItem(statsItems, setStatsItems, createStatItem)}>
                        <Plus className="h-4 w-4" />
                        Agregar stat
                      </GlassButton>
                    </div>
                    <div className="space-y-4">
                      {statsItems.map((item, index) => (
                        <div key={item._id} ref={bindSectionItemRef(item._id)} className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-[0.7fr,1.1fr,auto]">
                          <div>
                            <FieldLabel>Valor</FieldLabel>
                            <TextInput value={item.value} onChange={(e) => updateListItem(statsItems, setStatsItems, index, 'value', e.target.value)} />
                          </div>
                          <div>
                            <FieldLabel>Etiqueta</FieldLabel>
                            <TextInput value={item.label} onChange={(e) => updateListItem(statsItems, setStatsItems, index, 'label', e.target.value)} />
                          </div>
                          <div className="flex items-end">
                            <button type="button" onClick={() => removeItem(statsItems, setStatsItems, index, createStatItem)} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {['serviceHighlights', 'industryHighlights', 'caseHighlights', 'insightsEditorial', 'testimonials'].includes(visualType) && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Contenido relacionado</h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {visualType === 'insightsEditorial'
                            ? 'Selecciona artículos si quieres curar el bloque manualmente. Si no eliges ninguno, el sitio usará los últimos publicados.'
                            : 'Selecciona qué elementos reales del CMS deben mostrarse en este bloque.'}
                        </p>
                      </div>
                      {visualType === 'serviceHighlights' && (
                        <div className="w-28">
                          <FieldLabel>Cards</FieldLabel>
                          <TextInput type="number" min="1" max="6" value={cardsCount} onChange={(e) => setCardsCount(Number(e.target.value || 3))} />
                        </div>
                      )}
                    </div>

                    {visualType === 'serviceHighlights' && (
                      <div className="mb-5 grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Valor métrico destacado</FieldLabel>
                          <TextInput value={metricValue} onChange={(e) => setMetricValue(e.target.value)} placeholder="200+" />
                        </div>
                        <div>
                          <FieldLabel>Etiqueta de la métrica</FieldLabel>
                          <TextInput value={metricLabel} onChange={(e) => setMetricLabel(e.target.value)} placeholder="200+ proyectos entregados" />
                        </div>
                        <div>
                          <FieldLabel>Título de la card destacada</FieldLabel>
                          <TextInput value={featuredCardTitle} onChange={(e) => setFeaturedCardTitle(e.target.value)} placeholder="4.8★" />
                        </div>
                        <div>
                          <FieldLabel>Texto de la card destacada</FieldLabel>
                          <TextInput value={featuredCardText} onChange={(e) => setFeaturedCardText(e.target.value)} placeholder="Calificación promedio de clientes" />
                        </div>
                        <div>
                          <FieldLabel>CTA de la card destacada</FieldLabel>
                          <TextInput value={featuredCardCtaLabel} onChange={(e) => setFeaturedCardCtaLabel(e.target.value)} placeholder="Ver casos de éxito" />
                        </div>
                        <div>
                          <FieldLabel>URL CTA destacada</FieldLabel>
                          <TextInput value={featuredCardCtaHref} onChange={(e) => setFeaturedCardCtaHref(e.target.value)} placeholder="/es/casos-de-exito" />
                        </div>
                      </div>
                    )}

                    {visualType === 'insightsEditorial' && (
                      <div className="mb-5 grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Título del bloque lateral</FieldLabel>
                          <TextInput value={moreInsightsTitle} onChange={(e) => setMoreInsightsTitle(e.target.value)} placeholder="Más insights" />
                        </div>
                        <div>
                          <FieldLabel>CTA del bloque lateral</FieldLabel>
                          <TextInput value={moreInsightsCtaLabel} onChange={(e) => setMoreInsightsCtaLabel(e.target.value)} placeholder="Ver todos los artículos" />
                        </div>
                        <div className="sm:col-span-2">
                          <FieldLabel>Texto del bloque lateral</FieldLabel>
                          <TextArea rows={3} value={moreInsightsText} onChange={(e) => setMoreInsightsText(e.target.value)} placeholder="Explora nuestra biblioteca completa de artículos..." />
                        </div>
                        <div className="sm:col-span-2">
                          <FieldLabel>URL CTA del bloque lateral</FieldLabel>
                          <TextInput value={moreInsightsCtaHref} onChange={(e) => setMoreInsightsCtaHref(e.target.value)} placeholder="/es/insights" />
                        </div>
                      </div>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                      {referenceOptions.map((option) => {
                        const isSelected = selectedReferenceIds().includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => toggleReference(option.id)}
                            className={`rounded-[20px] border px-4 py-4 text-left transition ${
                              isSelected
                                ? 'border-[#4387DF] bg-blue-50 shadow-sm'
                                : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{option.label}</p>
                                {option.meta && <p className="mt-1 text-xs text-slate-500">{option.meta}</p>}
                              </div>
                              <span className={`mt-0.5 h-4 w-4 rounded-full border ${isSelected ? 'border-[#4387DF] bg-[#4387DF]' : 'border-slate-300 bg-white'}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </GlassCard>
                )}

                {visualType === 'ctaBand' && (
                  <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                    <h3 className="text-lg font-semibold text-slate-900">Bloque CTA</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Este bloque ya se controla visualmente con título, subtítulo, CTA label y CTA URL desde la columna izquierda. No necesitas editar JSON.
                    </p>
                  </GlassCard>
                )}

                <GlassCard variant="card" hover="none" className="rounded-[28px] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Code2 className="h-5 w-5 text-slate-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">Modo avanzado</h3>
                        <p className="mt-1 text-sm text-slate-600">Solo para casos técnicos o tipos aún no modelados visualmente.</p>
                      </div>
                    </div>
                    <GlassButton type="button" variant="glass" size="sm" onClick={() => setAdvancedMode((current) => !current)}>
                      {advancedMode ? 'Ocultar JSON' : 'Mostrar JSON'}
                    </GlassButton>
                  </div>

                  {advancedMode && (
                    <div className="space-y-4">
                      <div>
                        <FieldLabel>Config JSON</FieldLabel>
                        <TextArea rows={10} value={rawConfig} onChange={(e) => setRawConfig(e.target.value)} />
                      </div>
                      <div>
                        <FieldLabel>Content JSON</FieldLabel>
                        <TextArea rows={8} value={rawContent} onChange={(e) => setRawContent(e.target.value)} />
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          </div>
        </form>

        <div className="border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-end gap-3">
            <GlassButton type="button" variant="glass" size="sm" onClick={onCancel}>
              {cancelLabel}
            </GlassButton>
            <GlassButton type="submit" form={formId} variant="primary" size="sm" className="min-w-[140px]">
              {isSubmitting ? 'Guardando...' : submitLabel}
            </GlassButton>
          </div>
        </div>
      </div>

      {pickerTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/45 p-4 backdrop-blur-[2px]">
          <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl shadow-slate-300/20" style={{ maxHeight: 'min(86vh, 920px)' }}>
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900">Elegir imagen</h3>
                  <p className="mt-1 text-sm text-slate-600">Selecciona una imagen ya usada por el sitio para traerla al bloque.</p>
                </div>
                <GlassButton type="button" variant="glass" size="sm" onClick={() => setPickerTarget(null)}>
                  Cerrar
                </GlassButton>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-5">
                <TextInput value={mediaQuery} onChange={(e) => setMediaQuery(e.target.value)} placeholder="Buscar imagen por nombre, origen o URL" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMedia.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => applyMedia(item.url)}
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
    </div>
  );
}
