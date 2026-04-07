import { useEffect, useState } from 'react';
import { Save, Sparkles } from 'lucide-react';
import {
  defaultAboutPageContent,
  getAboutPageContent,
  saveAboutPageContent,
  type AboutPageContent,
  type AboutCultureCardContent,
  type AboutRecognitionCardContent,
} from '../services/aboutPageContent.service';

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

function Field({
  label,
  textarea = false,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  textarea?: boolean;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-slate-800">{label}</span>
      {textarea ? (
        <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} className={inputClassName} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClassName} />
      )}
    </label>
  );
}

function ListField({
  label,
  values,
  onChange,
  rows = 4,
}: {
  label: string;
  values: string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium text-slate-800">{label}</span>
      <textarea
        rows={rows}
        value={values.join('\n')}
        onChange={(event) =>
          onChange(
            event.target.value
              .split('\n')
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
        className={inputClassName}
      />
      <p className="text-xs text-slate-500">Una línea por elemento.</p>
    </label>
  );
}

export function AboutPageAdmin() {
  const [content, setContent] = useState<AboutPageContent>(defaultAboutPageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const data = await getAboutPageContent();
        if (!cancelled) {
          setContent(data);
        }
      } catch (error) {
        console.error('Error loading about content:', error);
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
    try {
      setSaving(true);
      const saved = await saveAboutPageContent(content);
      setContent(saved);
      alert('Contenido de Nosotros guardado correctamente');
    } catch (error) {
      console.error('Error saving about content:', error);
      alert('No fue posible guardar el contenido de Nosotros');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#4387DF] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(67,135,223,0.16),transparent_20%),radial-gradient(circle_at_top_right,rgba(196,181,253,0.18),transparent_24%),linear-gradient(180deg,#ffffff,#f8fafc)] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Página base editable</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              Contenido de Nosotros
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Esta pantalla toma como base el contenido actual de la página y lo deja editable en un formato simple.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar Nosotros'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#4387DF]" />
            <h2 className="text-xl font-medium text-slate-950">Hero y quiénes somos</h2>
          </div>
          <Field label="Hero title ES" value={content.heroTitle_es} onChange={(value) => setContent((current) => ({ ...current, heroTitle_es: value }))} />
          <Field label="Hero title EN" value={content.heroTitle_en} onChange={(value) => setContent((current) => ({ ...current, heroTitle_en: value }))} />
          <Field label="CTA principal ES" value={content.heroPrimaryCta_es} onChange={(value) => setContent((current) => ({ ...current, heroPrimaryCta_es: value }))} />
          <Field label="CTA principal EN" value={content.heroPrimaryCta_en} onChange={(value) => setContent((current) => ({ ...current, heroPrimaryCta_en: value }))} />
          <Field label="CTA secundario ES" value={content.heroSecondaryCta_es} onChange={(value) => setContent((current) => ({ ...current, heroSecondaryCta_es: value }))} />
          <Field label="CTA secundario EN" value={content.heroSecondaryCta_en} onChange={(value) => setContent((current) => ({ ...current, heroSecondaryCta_en: value }))} />
          <Field label="Eyebrow quiénes somos ES" value={content.whoEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, whoEyebrow_es: value }))} />
          <Field label="Eyebrow quiénes somos EN" value={content.whoEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, whoEyebrow_en: value }))} />
          <Field label="Título quiénes somos ES" value={content.whoTitle_es} onChange={(value) => setContent((current) => ({ ...current, whoTitle_es: value }))} />
          <Field label="Título quiénes somos EN" value={content.whoTitle_en} onChange={(value) => setContent((current) => ({ ...current, whoTitle_en: value }))} />
          <Field textarea rows={5} label="Descripción quiénes somos ES" value={content.whoDescription_es} onChange={(value) => setContent((current) => ({ ...current, whoDescription_es: value }))} />
          <Field textarea rows={5} label="Descripción quiénes somos EN" value={content.whoDescription_en} onChange={(value) => setContent((current) => ({ ...current, whoDescription_en: value }))} />
          <ListField label="Píldoras quiénes somos ES" values={content.whoPills_es} onChange={(value) => setContent((current) => ({ ...current, whoPills_es: value }))} />
          <ListField label="Píldoras quiénes somos EN" values={content.whoPills_en} onChange={(value) => setContent((current) => ({ ...current, whoPills_en: value }))} />
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-medium text-slate-950">Propósito y cierre</h2>
          <Field label="Eyebrow propósito ES" value={content.purposeEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, purposeEyebrow_es: value }))} />
          <Field label="Eyebrow propósito EN" value={content.purposeEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, purposeEyebrow_en: value }))} />
          <Field label="Título propósito ES" value={content.purposeTitle_es} onChange={(value) => setContent((current) => ({ ...current, purposeTitle_es: value }))} />
          <Field label="Título propósito EN" value={content.purposeTitle_en} onChange={(value) => setContent((current) => ({ ...current, purposeTitle_en: value }))} />
          <Field textarea rows={4} label="Descripción propósito ES" value={content.purposeDescription_es} onChange={(value) => setContent((current) => ({ ...current, purposeDescription_es: value }))} />
          <Field textarea rows={4} label="Descripción propósito EN" value={content.purposeDescription_en} onChange={(value) => setContent((current) => ({ ...current, purposeDescription_en: value }))} />
          <div className="grid gap-4">
            {content.purposeHighlights.map((item, index) => (
              <div key={`highlight-${index}`} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Highlight {index + 1}</p>
                <div className="mt-3 grid gap-3">
                  <Field label="Label ES" value={item.label_es} onChange={(value) => setContent((current) => ({ ...current, purposeHighlights: current.purposeHighlights.map((entry, entryIndex) => entryIndex === index ? { ...entry, label_es: value } : entry) }))} />
                  <Field label="Label EN" value={item.label_en} onChange={(value) => setContent((current) => ({ ...current, purposeHighlights: current.purposeHighlights.map((entry, entryIndex) => entryIndex === index ? { ...entry, label_en: value } : entry) }))} />
                  <Field label="Texto ES" value={item.text_es} onChange={(value) => setContent((current) => ({ ...current, purposeHighlights: current.purposeHighlights.map((entry, entryIndex) => entryIndex === index ? { ...entry, text_es: value } : entry) }))} />
                  <Field label="Texto EN" value={item.text_en} onChange={(value) => setContent((current) => ({ ...current, purposeHighlights: current.purposeHighlights.map((entry, entryIndex) => entryIndex === index ? { ...entry, text_en: value } : entry) }))} />
                </div>
              </div>
            ))}
          </div>
          <Field label="CTA final ES" value={content.ctaTitle_es} onChange={(value) => setContent((current) => ({ ...current, ctaTitle_es: value }))} />
          <Field label="CTA final EN" value={content.ctaTitle_en} onChange={(value) => setContent((current) => ({ ...current, ctaTitle_en: value }))} />
          <Field textarea rows={4} label="Descripción CTA final ES" value={content.ctaDescription_es} onChange={(value) => setContent((current) => ({ ...current, ctaDescription_es: value }))} />
          <Field textarea rows={4} label="Descripción CTA final EN" value={content.ctaDescription_en} onChange={(value) => setContent((current) => ({ ...current, ctaDescription_en: value }))} />
          <Field label="Botón CTA final ES" value={content.ctaLabel_es} onChange={(value) => setContent((current) => ({ ...current, ctaLabel_es: value }))} />
          <Field label="Botón CTA final EN" value={content.ctaLabel_en} onChange={(value) => setContent((current) => ({ ...current, ctaLabel_en: value }))} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-medium text-slate-950">Cooltura y evolución</h2>
          <Field label="Eyebrow cultura ES" value={content.cultureEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, cultureEyebrow_es: value }))} />
          <Field label="Eyebrow cultura EN" value={content.cultureEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, cultureEyebrow_en: value }))} />
          <Field label="Título cultura ES" value={content.cultureTitle_es} onChange={(value) => setContent((current) => ({ ...current, cultureTitle_es: value }))} />
          <Field label="Título cultura EN" value={content.cultureTitle_en} onChange={(value) => setContent((current) => ({ ...current, cultureTitle_en: value }))} />
          <Field textarea rows={4} label="Descripción cultura ES" value={content.cultureDescription_es} onChange={(value) => setContent((current) => ({ ...current, cultureDescription_es: value }))} />
          <Field textarea rows={4} label="Descripción cultura EN" value={content.cultureDescription_en} onChange={(value) => setContent((current) => ({ ...current, cultureDescription_en: value }))} />
          <Field label="Eyebrow evolución ES" value={content.mindsetEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, mindsetEyebrow_es: value }))} />
          <Field label="Eyebrow evolución EN" value={content.mindsetEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, mindsetEyebrow_en: value }))} />
          <Field label="Título evolución ES" value={content.mindsetTitle_es} onChange={(value) => setContent((current) => ({ ...current, mindsetTitle_es: value }))} />
          <Field label="Título evolución EN" value={content.mindsetTitle_en} onChange={(value) => setContent((current) => ({ ...current, mindsetTitle_en: value }))} />
          <Field textarea rows={4} label="Descripción evolución ES" value={content.mindsetDescription_es} onChange={(value) => setContent((current) => ({ ...current, mindsetDescription_es: value }))} />
          <Field textarea rows={4} label="Descripción evolución EN" value={content.mindsetDescription_en} onChange={(value) => setContent((current) => ({ ...current, mindsetDescription_en: value }))} />
          <Field label="Título columna izquierda ES" value={content.mindsetBeforeTitle_es} onChange={(value) => setContent((current) => ({ ...current, mindsetBeforeTitle_es: value }))} />
          <Field label="Título columna izquierda EN" value={content.mindsetBeforeTitle_en} onChange={(value) => setContent((current) => ({ ...current, mindsetBeforeTitle_en: value }))} />
          <Field label="Título columna derecha ES" value={content.mindsetAfterTitle_es} onChange={(value) => setContent((current) => ({ ...current, mindsetAfterTitle_es: value }))} />
          <Field label="Título columna derecha EN" value={content.mindsetAfterTitle_en} onChange={(value) => setContent((current) => ({ ...current, mindsetAfterTitle_en: value }))} />
          <ListField label="Puntos columna izquierda ES" values={content.mindsetBeforePoints_es} onChange={(value) => setContent((current) => ({ ...current, mindsetBeforePoints_es: value }))} />
          <ListField label="Puntos columna izquierda EN" values={content.mindsetBeforePoints_en} onChange={(value) => setContent((current) => ({ ...current, mindsetBeforePoints_en: value }))} />
          <ListField label="Puntos columna derecha ES" values={content.mindsetAfterPoints_es} onChange={(value) => setContent((current) => ({ ...current, mindsetAfterPoints_es: value }))} />
          <ListField label="Puntos columna derecha EN" values={content.mindsetAfterPoints_en} onChange={(value) => setContent((current) => ({ ...current, mindsetAfterPoints_en: value }))} />
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-medium text-slate-950">Valores y reconocimientos</h2>
          <Field label="Eyebrow valores ES" value={content.valuesEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, valuesEyebrow_es: value }))} />
          <Field label="Eyebrow valores EN" value={content.valuesEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, valuesEyebrow_en: value }))} />
          <Field label="Título valores ES" value={content.valuesTitle_es} onChange={(value) => setContent((current) => ({ ...current, valuesTitle_es: value }))} />
          <Field label="Título valores EN" value={content.valuesTitle_en} onChange={(value) => setContent((current) => ({ ...current, valuesTitle_en: value }))} />
          <ListField label="Lista de valores ES" values={content.values_es} onChange={(value) => setContent((current) => ({ ...current, values_es: value }))} />
          <ListField label="Lista de valores EN" values={content.values_en} onChange={(value) => setContent((current) => ({ ...current, values_en: value }))} />
          <Field label="Eyebrow reconocimientos ES" value={content.recognitionEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, recognitionEyebrow_es: value }))} />
          <Field label="Eyebrow reconocimientos EN" value={content.recognitionEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, recognitionEyebrow_en: value }))} />
          <Field label="Título reconocimientos ES" value={content.recognitionTitle_es} onChange={(value) => setContent((current) => ({ ...current, recognitionTitle_es: value }))} />
          <Field label="Título reconocimientos EN" value={content.recognitionTitle_en} onChange={(value) => setContent((current) => ({ ...current, recognitionTitle_en: value }))} />
          <Field textarea rows={4} label="Descripción reconocimientos ES" value={content.recognitionDescription_es} onChange={(value) => setContent((current) => ({ ...current, recognitionDescription_es: value }))} />
          <Field textarea rows={4} label="Descripción reconocimientos EN" value={content.recognitionDescription_en} onChange={(value) => setContent((current) => ({ ...current, recognitionDescription_en: value }))} />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-medium text-slate-950">Cards de cooltura</h2>
          {content.cultureCards.map((card: AboutCultureCardContent, index: number) => (
            <div key={`culture-card-${index}`} className="rounded-2xl border border-slate-200 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Card {index + 1}</p>
              <Field label="Título ES" value={card.title_es} onChange={(value) => setContent((current) => ({ ...current, cultureCards: current.cultureCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, title_es: value } : entry) }))} />
              <Field label="Título EN" value={card.title_en} onChange={(value) => setContent((current) => ({ ...current, cultureCards: current.cultureCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, title_en: value } : entry) }))} />
              <Field textarea rows={4} label="Descripción ES" value={card.description_es} onChange={(value) => setContent((current) => ({ ...current, cultureCards: current.cultureCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, description_es: value } : entry) }))} />
              <Field textarea rows={4} label="Descripción EN" value={card.description_en} onChange={(value) => setContent((current) => ({ ...current, cultureCards: current.cultureCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, description_en: value } : entry) }))} />
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-medium text-slate-950">Cards de reconocimientos</h2>
          {content.recognitionCards.map((card: AboutRecognitionCardContent, index: number) => (
            <div key={`recognition-card-${index}`} className="rounded-2xl border border-slate-200 p-4 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Card {index + 1}</p>
              <Field label="Métrica" value={card.metric} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, metric: value } : entry) }))} />
              <Field label="Título ES" value={card.title_es} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, title_es: value } : entry) }))} />
              <Field label="Título EN" value={card.title_en} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, title_en: value } : entry) }))} />
              <Field textarea rows={4} label="Descripción ES" value={card.description_es} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, description_es: value } : entry) }))} />
              <Field textarea rows={4} label="Descripción EN" value={card.description_en} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, description_en: value } : entry) }))} />
              <Field label="Detalle ES" value={card.detail_es} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, detail_es: value } : entry) }))} />
              <Field label="Detalle EN" value={card.detail_en} onChange={(value) => setContent((current) => ({ ...current, recognitionCards: current.recognitionCards.map((entry, entryIndex) => entryIndex === index ? { ...entry, detail_en: value } : entry) }))} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
