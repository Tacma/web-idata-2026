import { useEffect, useState } from 'react';
import { BarChart3, Bot, Globe, Link2, Save, Search, ShieldCheck } from 'lucide-react';
import { getAnalyticsSettings, saveAnalyticsSettings, type AnalyticsSettings } from '../services/analyticsSettings.service';
import { getSEOSettings, saveSEOSettings, type SEOSettings } from '../services/seoSettings.service';

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#4387DF] focus:ring-[#4387DF]/20"
      />
      <span>
        <span className="block text-sm font-medium text-slate-900">{label}</span>
        <span className="mt-1 block text-xs leading-6 text-slate-500">{hint}</span>
      </span>
    </label>
  );
}

export function IntegrationsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [analyticsSettings, setAnalyticsSettings] = useState<AnalyticsSettings | null>(null);
  const [seoSettings, setSeoSettings] = useState<SEOSettings | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const [analytics, seo] = await Promise.all([getAnalyticsSettings(), getSEOSettings()]);
        if (!cancelled) {
          setAnalyticsSettings(analytics);
          setSeoSettings(seo);
        }
      } catch (error) {
        console.error('Error loading integrations:', error);
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
  }, []);

  async function handleSave() {
    if (!analyticsSettings || !seoSettings) return;

    try {
      setSaving(true);
      const [savedAnalytics, savedSEO] = await Promise.all([
        saveAnalyticsSettings(analyticsSettings),
        saveSEOSettings(seoSettings),
      ]);
      setAnalyticsSettings(savedAnalytics);
      setSeoSettings(savedSEO);
      alert('Integraciones y SEO guardados correctamente');
    } catch (error) {
      console.error('Error saving integrations:', error);
      alert('No fue posible guardar las integraciones');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !analyticsSettings || !seoSettings) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.16),transparent_22%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_30%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Google y operación digital</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              Integraciones, indexación y métricas SEO
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Administra Search Console, GA4, GTM, etiquetas de robots y señales clave del sitio desde una vista clara.
              Esto no cambia la estructura de la web; cambia cómo la medimos, verificamos e indexamos.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar integraciones'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-600">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Google Search Console e indexación</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Controla la verificación del dominio, la URL canónica, la indexación, hreflang y las señales base que Google usa para entender el sitio.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-800">Dominio canónico del sitio</span>
                <input
                  value={seoSettings.canonicalDomain}
                  onChange={(event) => setSeoSettings((current) => current ? { ...current, canonicalDomain: event.target.value } : current)}
                  placeholder="https://idata.global"
                  className={inputClassName}
                />
              </label>
              <label className="block space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-slate-800">Código de verificación de Search Console</span>
                <input
                  value={seoSettings.searchConsoleVerificationCode || analyticsSettings.searchConsoleVerification}
                  onChange={(event) => {
                    const value = event.target.value;
                    setSeoSettings((current) => current ? { ...current, searchConsoleVerificationCode: value } : current);
                    setAnalyticsSettings((current) => current ? { ...current, searchConsoleVerification: value } : current);
                  }}
                  placeholder="google-site-verification=..."
                  className={inputClassName}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <Toggle
                label="Permitir indexación"
                hint="Mantén esto activo para que Google pueda indexar las páginas públicas del sitio."
                checked={seoSettings.robotsIndex}
                onChange={(value) => setSeoSettings((current) => current ? { ...current, robotsIndex: value } : current)}
              />
              <Toggle
                label="Seguir enlaces"
                hint="Indica si los buscadores pueden seguir la navegación y las relaciones internas."
                checked={seoSettings.robotsFollow}
                onChange={(value) => setSeoSettings((current) => current ? { ...current, robotsFollow: value } : current)}
              />
              <Toggle
                label="Activar hreflang"
                hint="Recomendado por Google para indicar versiones ES y EN y evitar conflictos entre páginas equivalentes."
                checked={seoSettings.enableHreflang}
                onChange={(value) => setSeoSettings((current) => current ? { ...current, enableHreflang: value } : current)}
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-600">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Medición y etiquetas</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Define cómo se instala la medición y evita configuraciones duplicadas o vacías.
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Measurement ID de GA4</span>
                <input
                  value={analyticsSettings.ga4MeasurementId}
                  onChange={(event) => setAnalyticsSettings((current) => current ? { ...current, ga4MeasurementId: event.target.value } : current)}
                  placeholder="G-XXXXXXXXXX"
                  className={inputClassName}
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-800">Container ID de GTM</span>
                <input
                  value={analyticsSettings.gtmContainerId}
                  onChange={(event) => setAnalyticsSettings((current) => current ? { ...current, gtmContainerId: event.target.value } : current)}
                  placeholder="GTM-XXXXXXX"
                  className={inputClassName}
                />
              </label>
            </div>

            <div className="mt-5 grid gap-3">
              <Toggle
                label="Activar Google Consent Mode v2"
                hint="Recomendado si vas a manejar consentimiento con cookies o mercados regulados."
                checked={analyticsSettings.enableConsentMode}
                onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, enableConsentMode: value } : current)}
              />
              <Toggle
                label="Anonimizar IP cuando aplique"
                hint="Ayuda a mantener la medición alineada con buenas prácticas de privacidad."
                checked={analyticsSettings.anonymizeIp}
                onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, anonymizeIp: value } : current)}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-600">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-950">Eventos que el sitio puede rastrear</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Activa solo lo que realmente quieres medir para evitar ruido en reportes.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Toggle label="Formularios" hint="Envios de contacto y formularios generales." checked={analyticsSettings.trackForms} onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, trackForms: value } : current)} />
              <Toggle label="CTAs del sitio" hint="Clicks en botones estratégicos y llamados a la acción." checked={analyticsSettings.trackCTAs} onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, trackCTAs: value } : current)} />
              <Toggle label="Cambio de idioma" hint="Útil para entender preferencia ES/EN." checked={analyticsSettings.trackLanguageChanges} onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, trackLanguageChanges: value } : current)} />
              <Toggle label="Vacantes y postulaciones" hint="Seguimiento de aplicaciones a ofertas y otras postulaciones." checked={analyticsSettings.trackJobApplications && analyticsSettings.trackOpenApplications} onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, trackJobApplications: value, trackOpenApplications: value } : current)} />
              <Toggle label="Engagement con insights" hint="Interacciones con blog, contenido descargable y recursos." checked={analyticsSettings.trackBlogInteraction && analyticsSettings.trackFileDownloads} onChange={(value) => setAnalyticsSettings((current) => current ? { ...current, trackBlogInteraction: value, trackFileDownloads: value } : current)} />
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-medium">Recomendaciones para dejarlo bien conectado</h2>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Google recomienda verificar la propiedad en Search Console, mantener un sitemap consistente con tus canonicals,
                  declarar hreflang correctamente en sitios multilenguaje y medir las SPA con page views y referrer correctos.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-200">
              <a
                href="https://developers.google.com/search/docs/specialty/international/localized-versions"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><Globe className="h-4 w-4" /> Guía oficial de hreflang y x-default</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><Link2 className="h-4 w-4" /> Canonical y consolidación de URLs</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://developers.google.com/search/docs/crawling-indexing/special-tags"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><ShieldCheck className="h-4 w-4" /> Meta robots y controles de snippet</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://support.google.com/webmasters/answer/9008080"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><Search className="h-4 w-4" /> Verificación de propiedad en Search Console</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://developers.google.com/webmaster-tools/v1/sitemaps/submit"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><Globe className="h-4 w-4" /> Envío de sitemap a Google</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://support.google.com/google-ads/answer/12329709?hl=en"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><BarChart3 className="h-4 w-4" /> Instalación del Google tag y GA4</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://support.google.com/tagmanager/answer/6102821?hl=en"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><Bot className="h-4 w-4" /> Fundamentos de Google Tag Manager</span>
                <Link2 className="h-4 w-4" />
              </a>
              <a
                href="https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-3"><BarChart3 className="h-4 w-4" /> Medición oficial de SPA en GA4</span>
                <Link2 className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
