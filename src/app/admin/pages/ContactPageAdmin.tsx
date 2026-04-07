import { useEffect, useState } from 'react';
import { Save, MessageSquare } from 'lucide-react';
import {
  defaultContactPageContent,
  getContactPageContent,
  saveContactPageContent,
  type ContactPageContent,
} from '../services/contactPageContent.service';

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

function Field({
  label,
  value,
  onChange,
  textarea = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
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

export function ContactPageAdmin() {
  const [content, setContent] = useState<ContactPageContent>(defaultContactPageContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getContactPageContent();
        if (!cancelled) setContent(data);
      } catch (error) {
        console.error('Error loading contact page content:', error);
      } finally {
        if (!cancelled) setLoading(false);
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
      const saved = await saveContactPageContent(content);
      setContent(saved);
      alert('Contenido de Contacto guardado correctamente');
    } catch (error) {
      console.error('Error saving contact page content:', error);
      alert('No fue posible guardar el contenido de Contacto');
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
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">Contenido de Contacto</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Ajusta los mensajes visibles de la página sin tocar la lógica de formularios, prefills ni canales.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar Contacto'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-[#4387DF]" />
            <h2 className="text-xl font-medium text-slate-950">WhatsApp y formulario</h2>
          </div>
          <Field label="Eyebrow superior ES" value={content.directEyebrow_es} onChange={(value) => setContent((current) => ({ ...current, directEyebrow_es: value }))} />
          <Field label="Eyebrow superior EN" value={content.directEyebrow_en} onChange={(value) => setContent((current) => ({ ...current, directEyebrow_en: value }))} />
          <Field textarea rows={3} label="Título superior ES" value={content.directTitle_es} onChange={(value) => setContent((current) => ({ ...current, directTitle_es: value }))} />
          <Field textarea rows={3} label="Título superior EN" value={content.directTitle_en} onChange={(value) => setContent((current) => ({ ...current, directTitle_en: value }))} />
          <Field label="Título formulario ES" value={content.formTitle_es} onChange={(value) => setContent((current) => ({ ...current, formTitle_es: value }))} />
          <Field label="Título formulario EN" value={content.formTitle_en} onChange={(value) => setContent((current) => ({ ...current, formTitle_en: value }))} />
          <Field textarea rows={3} label="Descripción formulario ES" value={content.formDescription_es} onChange={(value) => setContent((current) => ({ ...current, formDescription_es: value }))} />
          <Field textarea rows={3} label="Descripción formulario EN" value={content.formDescription_en} onChange={(value) => setContent((current) => ({ ...current, formDescription_en: value }))} />
          <Field label="Label mensaje ES" value={content.formMessageLabel_es} onChange={(value) => setContent((current) => ({ ...current, formMessageLabel_es: value }))} />
          <Field label="Label mensaje EN" value={content.formMessageLabel_en} onChange={(value) => setContent((current) => ({ ...current, formMessageLabel_en: value }))} />
          <Field textarea rows={3} label="Placeholder mensaje ES" value={content.formMessagePlaceholder_es} onChange={(value) => setContent((current) => ({ ...current, formMessagePlaceholder_es: value }))} />
          <Field textarea rows={3} label="Placeholder mensaje EN" value={content.formMessagePlaceholder_en} onChange={(value) => setContent((current) => ({ ...current, formMessagePlaceholder_en: value }))} />
          <Field textarea rows={2} label="Texto legal final ES" value={content.privacyText_es} onChange={(value) => setContent((current) => ({ ...current, privacyText_es: value }))} />
          <Field textarea rows={2} label="Texto legal final EN" value={content.privacyText_en} onChange={(value) => setContent((current) => ({ ...current, privacyText_en: value }))} />
          <Field label="Botón enviar ES" value={content.submitLabel_es} onChange={(value) => setContent((current) => ({ ...current, submitLabel_es: value }))} />
          <Field label="Botón enviar EN" value={content.submitLabel_en} onChange={(value) => setContent((current) => ({ ...current, submitLabel_en: value }))} />
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-medium text-slate-950">Mensajes y laterales</h2>
          <Field label="Éxito título ES" value={content.successTitle_es} onChange={(value) => setContent((current) => ({ ...current, successTitle_es: value }))} />
          <Field label="Éxito título EN" value={content.successTitle_en} onChange={(value) => setContent((current) => ({ ...current, successTitle_en: value }))} />
          <Field textarea rows={2} label="Éxito descripción ES" value={content.successDescription_es} onChange={(value) => setContent((current) => ({ ...current, successDescription_es: value }))} />
          <Field textarea rows={2} label="Éxito descripción EN" value={content.successDescription_en} onChange={(value) => setContent((current) => ({ ...current, successDescription_en: value }))} />
          <Field label="Error título ES" value={content.errorTitle_es} onChange={(value) => setContent((current) => ({ ...current, errorTitle_es: value }))} />
          <Field label="Error título EN" value={content.errorTitle_en} onChange={(value) => setContent((current) => ({ ...current, errorTitle_en: value }))} />
          <Field textarea rows={2} label="Error descripción ES" value={content.errorDescription_es} onChange={(value) => setContent((current) => ({ ...current, errorDescription_es: value }))} />
          <Field textarea rows={2} label="Error descripción EN" value={content.errorDescription_en} onChange={(value) => setContent((current) => ({ ...current, errorDescription_en: value }))} />
          <Field label="Título info de contacto ES" value={content.contactInfoTitle_es} onChange={(value) => setContent((current) => ({ ...current, contactInfoTitle_es: value }))} />
          <Field label="Título info de contacto EN" value={content.contactInfoTitle_en} onChange={(value) => setContent((current) => ({ ...current, contactInfoTitle_en: value }))} />
          <Field label="Título redes ES" value={content.socialTitle_es} onChange={(value) => setContent((current) => ({ ...current, socialTitle_es: value }))} />
          <Field label="Título redes EN" value={content.socialTitle_en} onChange={(value) => setContent((current) => ({ ...current, socialTitle_en: value }))} />
          <Field textarea rows={3} label="Texto redes ES" value={content.socialDescription_es} onChange={(value) => setContent((current) => ({ ...current, socialDescription_es: value }))} />
          <Field textarea rows={3} label="Texto redes EN" value={content.socialDescription_en} onChange={(value) => setContent((current) => ({ ...current, socialDescription_en: value }))} />
          <Field label="Título tiempo de respuesta ES" value={content.responseTitle_es} onChange={(value) => setContent((current) => ({ ...current, responseTitle_es: value }))} />
          <Field label="Título tiempo de respuesta EN" value={content.responseTitle_en} onChange={(value) => setContent((current) => ({ ...current, responseTitle_en: value }))} />
          <Field textarea rows={2} label="Texto tiempo de respuesta ES" value={content.responseDescription_es} onChange={(value) => setContent((current) => ({ ...current, responseDescription_es: value }))} />
          <Field textarea rows={2} label="Texto tiempo de respuesta EN" value={content.responseDescription_en} onChange={(value) => setContent((current) => ({ ...current, responseDescription_en: value }))} />
        </div>
      </div>
    </div>
  );
}
