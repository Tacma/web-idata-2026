import { useEffect, useState } from 'react';
import { Menu, Save } from 'lucide-react';
import {
  getNavigationSettings,
  saveNavigationSettings,
  type NavigationLink,
  type NavigationSection,
  type NavigationSettings,
} from '../services/navigation.service';

const inputClassName =
  'ui-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-[#4387DF] focus:ring-4 focus:ring-[#4387DF]/10';

interface LinkEditorCardProps {
  title: string;
  helper?: string;
  items: NavigationLink[];
  labelPlaceholder: string;
  onChange: (index: number, field: 'label' | 'url', value: string) => void;
}

function LinkEditorCard({
  title,
  helper,
  items,
  labelPlaceholder,
  onChange,
}: LinkEditorCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-slate-950">{title}</h2>
      {helper ? <p className="mt-1 text-sm text-slate-500">{helper}</p> : null}
      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <div key={item.key} className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[auto,1fr,1fr]">
            <div className="flex items-center justify-center rounded-2xl bg-white px-3 py-3 text-slate-400 shadow-sm">
              <Menu className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={item.label}
              onChange={(e) => onChange(index, 'label', e.target.value)}
              className={inputClassName}
              placeholder={labelPlaceholder}
            />
            <input
              type="text"
              value={item.url}
              onChange={(e) => onChange(index, 'url', e.target.value)}
              className={inputClassName}
              placeholder="URL"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface FooterSectionsCardProps {
  title: string;
  helper?: string;
  sections: NavigationSection[];
  labelPlaceholder: string;
  titlePlaceholder: string;
  onSectionTitleChange: (sectionIndex: number, value: string) => void;
  onItemChange: (sectionIndex: number, itemIndex: number, field: 'label' | 'url', value: string) => void;
}

function FooterSectionsCard({
  title,
  helper,
  sections,
  labelPlaceholder,
  titlePlaceholder,
  onSectionTitleChange,
  onItemChange,
}: FooterSectionsCardProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-medium text-slate-950">{title}</h2>
      {helper ? <p className="mt-1 text-sm text-slate-500">{helper}</p> : null}
      <div className="mt-5 space-y-5">
        {sections.map((section, sectionIndex) => (
          <div key={section.key} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onSectionTitleChange(sectionIndex, e.target.value)}
              className={`${inputClassName} max-w-sm`}
              placeholder={titlePlaceholder}
            />
            <div className="mt-3 space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={item.key} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[auto,1fr,1fr]">
                  <div className="flex items-center justify-center rounded-2xl bg-slate-50 px-3 py-3 text-slate-400">
                    <Menu className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => onItemChange(sectionIndex, itemIndex, 'label', e.target.value)}
                    className={inputClassName}
                    placeholder={labelPlaceholder}
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => onItemChange(sectionIndex, itemIndex, 'url', e.target.value)}
                    className={inputClassName}
                    placeholder="URL"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NavigationAdmin() {
  const [settings, setSettings] = useState<NavigationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const data = await getNavigationSettings();
        if (!cancelled) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error loading navigation:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  function updateMainMenu(
    menuKey: 'mainMenu_es' | 'mainMenu_en',
    index: number,
    field: 'label' | 'url',
    value: string
  ) {
    setSettings((current) => {
      if (!current) return current;
      const updated = [...current[menuKey]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...current, [menuKey]: updated };
    });
  }

  function updateFooterSectionTitle(
    sectionKey: 'footerSections_es' | 'footerSections_en',
    sectionIndex: number,
    value: string
  ) {
    setSettings((current) => {
      if (!current) return current;
      const updatedSections = [...current[sectionKey]];
      updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], title: value };
      return { ...current, [sectionKey]: updatedSections };
    });
  }

  function updateFooterItem(
    sectionKey: 'footerSections_es' | 'footerSections_en',
    sectionIndex: number,
    itemIndex: number,
    field: 'label' | 'url',
    value: string
  ) {
    setSettings((current) => {
      if (!current) return current;
      const updatedSections = [...current[sectionKey]];
      const updatedItems = [...updatedSections[sectionIndex].items];
      updatedItems[itemIndex] = { ...updatedItems[itemIndex], [field]: value };
      updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], items: updatedItems };
      return { ...current, [sectionKey]: updatedSections };
    });
  }

  async function handleSave() {
    if (!settings) return;
    try {
      setSaving(true);
      const normalized = await saveNavigationSettings(settings);
      setSettings(normalized);
      alert('Navegación guardada correctamente');
    } catch (error) {
      console.error('Error saving navigation:', error);
      alert('Error al guardar la navegación');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#4387DF]">Header y footer</p>
            <h1 className="mt-3 text-4xl font-light tracking-[-0.05em] text-slate-950">
              Navegación del sitio
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Aquí editas etiquetas y URLs del menú principal y del footer sin tocar la arquitectura.
              La estructura pública se mantiene; tú administras el contenido visible de esa estructura.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar navegación'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <LinkEditorCard
          title="Menú principal (Español)"
          helper="Replica la navegación superior actual del sitio en español."
          items={settings.mainMenu_es}
          labelPlaceholder="Etiqueta visible"
          onChange={(index, field, value) => updateMainMenu('mainMenu_es', index, field, value)}
        />

        <LinkEditorCard
          title="Menú principal (Inglés)"
          helper="Replica la navegación superior actual del sitio en inglés."
          items={settings.mainMenu_en}
          labelPlaceholder="Visible label"
          onChange={(index, field, value) => updateMainMenu('mainMenu_en', index, field, value)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <FooterSectionsCard
          title="Footer (Español)"
          helper="Los grupos corresponden al footer actual: servicios, empresa y recursos."
          sections={settings.footerSections_es}
          labelPlaceholder="Etiqueta"
          titlePlaceholder="Título del grupo"
          onSectionTitleChange={(sectionIndex, value) =>
            updateFooterSectionTitle('footerSections_es', sectionIndex, value)
          }
          onItemChange={(sectionIndex, itemIndex, field, value) =>
            updateFooterItem('footerSections_es', sectionIndex, itemIndex, field, value)
          }
        />

        <FooterSectionsCard
          title="Footer (Inglés)"
          helper="Editable para la versión internacional manteniendo la misma estructura visual."
          sections={settings.footerSections_en}
          labelPlaceholder="Label"
          titlePlaceholder="Section title"
          onSectionTitleChange={(sectionIndex, value) =>
            updateFooterSectionTitle('footerSections_en', sectionIndex, value)
          }
          onItemChange={(sectionIndex, itemIndex, field, value) =>
            updateFooterItem('footerSections_en', sectionIndex, itemIndex, field, value)
          }
        />
      </div>
    </div>
  );
}
