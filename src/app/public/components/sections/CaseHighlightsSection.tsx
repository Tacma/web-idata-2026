import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Building2, Clock3, TrendingUp } from 'lucide-react';
import type { HomeSection, Language } from '../../../shared/types';
import { getPublished as getPublishedCaseStudies } from '../../../../services/caseStudiesService';
import { useTheme } from '../../../shared/contexts/ThemeContext';

interface CaseHighlightsSectionProps {
  section: HomeSection;
  language: Language;
  getLocalizedValue: (esValue: string, enValue: string) => string;
}

interface MetricEntry {
  value: number;
  unit: 'percent' | 'multiplier' | 'currency' | 'count';
  category: 'time' | 'efficiency' | 'quality' | 'growth' | 'impact' | 'automation' | 'roi' | 'other';
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((total, current) => total + current, 0) / values.length;
}

function parseMetricValue(raw: string): Pick<MetricEntry, 'value' | 'unit'> | null {
  const normalized = raw.replace(',', '.');
  const percentMatch = normalized.match(/(\d+(?:\.\d+)?)\s*%/);
  if (percentMatch) {
    return { value: Number(percentMatch[1]), unit: 'percent' };
  }

  const multiplierMatch = normalized.match(/(\d+(?:\.\d+)?)\s*x/i);
  if (multiplierMatch) {
    return { value: Number(multiplierMatch[1]), unit: 'multiplier' };
  }

  const currencyMatch = normalized.match(/\$\s*(\d+(?:\.\d+)?)\s*([mk])?/i);
  if (currencyMatch) {
    const baseValue = Number(currencyMatch[1]);
    const suffix = currencyMatch[2]?.toLowerCase();
    const multiplier = suffix === 'm' ? 1_000_000 : suffix === 'k' ? 1_000 : 1;
    return { value: baseValue * multiplier, unit: 'currency' };
  }

  const countMatch = normalized.match(/(\d+(?:\.\d+)?)/);
  if (countMatch) {
    return { value: Number(countMatch[1]), unit: 'count' };
  }

  return null;
}

function categorizeMetric(text: string): MetricEntry['category'] {
  const normalized = normalizeText(text);

  if (/(tiempo|time|response|proces|processing|delivery|downtime|inactividad|faster|rapidas|agilidad)/.test(normalized)) {
    return 'time';
  }

  if (/(costo|cost|resource|recurso|planning|planificacion|productiv|operativ|efficien|optimiz)/.test(normalized)) {
    return 'efficiency';
  }

  if (/(calidad|quality|traceability|trazabilidad|trust|confianza)/.test(normalized)) {
    return 'quality';
  }

  if (/(sales|ventas|inventory|inventario|rotacion|revenue|growth|crecimiento)/.test(normalized)) {
    return 'growth';
  }

  if (/(impact|impacto|executive visibility|visibilidad|visibility)/.test(normalized)) {
    return 'impact';
  }

  if (/(automatic|automatica|automation|automatizacion|manual review|revisiones manuales)/.test(normalized)) {
    return 'automation';
  }

  if (/roi/.test(normalized)) {
    return 'roi';
  }

  return 'other';
}

function extractMetricEntries(caseStudy: any, language: Language, getLocalizedValue: (esValue: string, enValue: string) => string): MetricEntry[] {
  const structuredMetrics = Array.isArray(caseStudy?.metrics) ? caseStudy.metrics : [];
  const entries: MetricEntry[] = [];

  structuredMetrics.forEach((metric: any) => {
    const metricValue = parseMetricValue(String(metric?.value || ''));
    if (!metricValue) return;
    const metricLabel = getLocalizedValue(metric?.label_es || '', metric?.label_en || '') || String(metric?.value || '');
    entries.push({
      ...metricValue,
      category: categorizeMetric(metricLabel),
    });
  });

  const localizedResults = getLocalizedValue(caseStudy?.results_es || '', caseStudy?.results_en || '');
  localizedResults
    .split('|')
    .map((item: string) => item.trim())
    .filter(Boolean)
    .forEach((result: string) => {
      const parsed = parseMetricValue(result);
      if (!parsed) return;
      entries.push({
        ...parsed,
        category: categorizeMetric(result),
      });
    });

  return entries;
}

function buildCommonThemes(metricEntries: MetricEntry[], language: Language) {
  const labels = {
    time: language === 'es' ? 'Tiempos y respuesta' : 'Time and responsiveness',
    efficiency: language === 'es' ? 'Eficiencia operativa' : 'Operational efficiency',
    quality: language === 'es' ? 'Calidad y trazabilidad' : 'Quality and traceability',
    growth: language === 'es' ? 'Crecimiento comercial' : 'Commercial growth',
    impact: language === 'es' ? 'Impacto de negocio' : 'Business impact',
    automation: language === 'es' ? 'Automatización' : 'Automation',
    roi: 'ROI',
    other: language === 'es' ? 'Resultados medibles' : 'Measurable outcomes',
  } as const;

  const counts = new Map<MetricEntry['category'], number>();
  metricEntries.forEach((entry) => {
    counts.set(entry.category, (counts.get(entry.category) || 0) + 1);
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([category]) => labels[category]);
}

export function CaseHighlightsSection({
  section,
  language,
  getLocalizedValue
}: CaseHighlightsSectionProps) {
  const { isDark } = useTheme();
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const caseStudies = await getPublishedCaseStudies(language);
        if (!cancelled) {
          const filtered = section.referencedIds && section.referencedIds.length > 0
            ? caseStudies.filter((caseStudy: any) => section.referencedIds?.includes(caseStudy.id))
            : caseStudies;
          setCases(filtered.length > 0 ? filtered : caseStudies);
        }
      } catch (error) {
        console.error('Error loading case highlights:', error);
        if (!cancelled) {
          setCases([]);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [language, section.referencedIds]);

  const aggregated = useMemo(() => {
    const realCases = cases.filter((caseStudy) => caseStudy?.case_type !== 'placeholder');
    const metricEntries = realCases.flatMap((caseStudy) => extractMetricEntries(caseStudy, language, getLocalizedValue));
    const uniqueClients = new Set(realCases.map((caseStudy) => caseStudy?.client).filter(Boolean)).size;
    const timeMetrics = metricEntries.filter((metric) => metric.unit === 'percent' && metric.category === 'time').map((metric) => metric.value);
    const efficiencyMetrics = metricEntries
      .filter((metric) => metric.unit === 'percent' && ['efficiency', 'quality', 'impact', 'automation'].includes(metric.category))
      .map((metric) => metric.value);
    const growthMetrics = metricEntries
      .filter((metric) => metric.unit === 'percent' && metric.category === 'growth')
      .map((metric) => metric.value);
    const roiMetrics = metricEntries
      .filter((metric) => metric.unit === 'multiplier' || metric.category === 'roi')
      .map((metric) => metric.value);

    const averageTime = average(timeMetrics);
    const averageEfficiency = average(efficiencyMetrics);
    const averageGrowth = average(growthMetrics);
    const strongestRoi = roiMetrics.length ? Math.max(...roiMetrics) : null;
    const stats = [
      {
        id: 'companies',
        value: `${Math.max(uniqueClients, realCases.length)}+`,
        label: language === 'es' ? 'Empresas con soluciones implementadas' : 'Companies with delivered solutions',
        helper: language === 'es' ? 'Clientes reales publicados en casos de éxito.' : 'Real clients represented across published case studies.',
        icon: Building2,
        tone: 'sky',
      },
      averageTime
        ? {
            id: 'time',
            value: `${Math.round(averageTime)}%`,
            label: language === 'es' ? 'Tiempos agilizados en promedio' : 'Average acceleration in delivery time',
            helper: language === 'es' ? 'Promedio de indicadores de tiempo y respuesta encontrados en casos publicados.' : 'Average from repeated time and responsiveness metrics across published cases.',
            icon: Clock3,
            tone: 'violet',
          }
        : null,
      averageEfficiency
        ? {
            id: 'efficiency',
            value: `${Math.round(averageEfficiency)}%`,
            label: language === 'es' ? 'Mejora operativa ponderada' : 'Weighted operational improvement',
            helper: language === 'es' ? 'Agregamos métricas recurrentes de eficiencia, calidad, automatización e impacto.' : 'Built from recurring efficiency, quality, automation, and impact metrics.',
            icon: TrendingUp,
            tone: 'emerald',
          }
        : null,
      averageGrowth
        ? {
            id: 'growth',
            value: `${Math.round(averageGrowth)}%`,
            label: language === 'es' ? 'Crecimiento y resultados comerciales' : 'Growth and commercial outcomes',
            helper: language === 'es' ? 'Promedio de ventas, rotación e indicadores de crecimiento donde están publicados.' : 'Average of sales, turnover, and growth indicators where available.',
            icon: BarChart3,
            tone: 'fuchsia',
          }
        : strongestRoi
          ? {
              id: 'roi',
              value: `${strongestRoi.toFixed(1)}x`,
              label: language === 'es' ? 'ROI reportado en casos publicados' : 'ROI reported across published cases',
              helper: language === 'es' ? 'Mostramos el mayor ROI explícitamente documentado en los casos cargados.' : 'We show the highest explicit ROI documented in the loaded case studies.',
              icon: BarChart3,
              tone: 'fuchsia',
            }
          : null,
    ].filter(Boolean) as Array<{
      id: string;
      value: string;
      label: string;
      helper: string;
      icon: typeof Building2;
      tone: 'sky' | 'violet' | 'emerald' | 'fuchsia';
    }>;

    return {
      casesCount: realCases.length,
      commonThemes: buildCommonThemes(metricEntries, language),
      stats,
    };
  }, [cases, getLocalizedValue, language]);

  const title = section.title || (language === 'es' ? 'Resultados que se vuelven señales' : 'Results that turn into signals');
  const subtitle = section.subtitle || (language === 'es'
    ? 'Consolidamos indicadores recurrentes de los casos publicados para mostrar una lectura agregada del impacto que iData viene logrando.'
    : 'We consolidate recurring indicators from published case studies to show an aggregated view of the impact iData is delivering.');

  const toneClasses = {
    sky: isDark ? 'border-sky-300/16 bg-sky-400/6 text-sky-100' : 'border-sky-200/80 bg-sky-50/92 text-slate-950',
    violet: isDark ? 'border-violet-300/16 bg-violet-400/6 text-violet-100' : 'border-violet-200/80 bg-violet-50/92 text-slate-950',
    emerald: isDark ? 'border-emerald-300/16 bg-emerald-400/6 text-emerald-100' : 'border-emerald-200/80 bg-emerald-50/92 text-slate-950',
    fuchsia: isDark ? 'border-fuchsia-300/16 bg-fuchsia-400/6 text-fuchsia-100' : 'border-fuchsia-200/80 bg-fuchsia-50/92 text-slate-950',
  } as const;

  return (
    <section className="relative overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
      <div className={`pointer-events-none absolute inset-0 ${isDark
        ? 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.12),transparent_24%),linear-gradient(180deg,rgba(8,15,30,0.98),rgba(10,20,38,0.96))]'
        : 'bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,249,255,0.94))]'}`} />

      <div className="relative mx-auto max-w-[1440px]">
        <motion.div
          className={`mb-6 overflow-hidden rounded-[34px] border p-6 shadow-[0_24px_56px_rgba(8,15,30,0.08)] sm:p-8 ${isDark ? 'border-white/10 bg-[linear-gradient(135deg,rgba(10,20,38,0.96),rgba(14,27,48,0.92))]' : 'border-[var(--line-soft)] bg-[var(--glass-surface)]'}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.94fr)_minmax(340px,0.96fr)] xl:items-end">
            <div className="max-w-3xl">
              <p className={`text-xs font-medium uppercase tracking-[0.28em] ${isDark ? 'text-sky-300' : 'text-sky-600'}`}>
                {language === 'es' ? 'Lectura agregada de casos reales' : 'Aggregated view from real case studies'}
              </p>
              <h2 className="mt-4 max-w-[11ch] text-[clamp(2.2rem,5vw,4.8rem)] font-light leading-[0.9] tracking-[-0.065em] text-[var(--text-strong)]">
                {title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-body)]">
                {subtitle}
              </p>

              {aggregated.commonThemes.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {aggregated.commonThemes.map((theme) => (
                    <span
                      key={theme}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium ${isDark ? 'border-white/10 bg-white/6 text-slate-200' : 'border-[var(--line-soft)] bg-[var(--surface-0)] text-[var(--text-body)]'}`}
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {aggregated.stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={`hero-${stat.id}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`rounded-[24px] border p-4 backdrop-blur-xl ${toneClasses[stat.tone]}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${isDark ? 'bg-white/10 text-current' : 'bg-white/80 text-current'}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className={`text-right text-[clamp(1.8rem,4vw,2.8rem)] font-light leading-none tracking-[-0.08em] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {stat.value}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-current/75' : 'text-[var(--text-soft)]'}`}>
                        {language === 'es' ? 'KPI agregado' : 'Aggregated KPI'}
                      </p>
                      <h3 className={`mt-2 text-[1rem] font-medium leading-[1.08] ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {stat.label}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
