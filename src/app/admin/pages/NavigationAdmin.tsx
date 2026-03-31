import { useEffect, useState } from 'react';
import { Menu, Save } from 'lucide-react';
import {
  getNavigationSettings,
  saveNavigationSettings,
  type NavigationLink,
  type NavigationSection,
  type NavigationSettings,
} from '../services/navigation.service';

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
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      {helper ? <p className="mt-1 text-sm text-gray-600">{helper}</p> : null}
      <div className="mt-4 space-y-2">
        {items.map((item, index) => (
          <div key={item.key} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
            <Menu className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <input
                type="text"
                value={item.label}
                onChange={(e) => onChange(index, 'label', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
                placeholder={labelPlaceholder}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={item.url}
                onChange={(e) => onChange(index, 'url', e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded"
                placeholder="URL"
              />
            </div>
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
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      {helper ? <p className="mt-1 text-sm text-gray-600">{helper}</p> : null}
      <div className="mt-5 space-y-5">
        {sections.map((section, sectionIndex) => (
          <div key={section.key} className="rounded-xl border border-gray-200 p-4">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onSectionTitleChange(sectionIndex, e.target.value)}
              className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
              placeholder={titlePlaceholder}
            />
            <div className="mt-3 space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={item.key} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                  <Menu className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => onItemChange(sectionIndex, itemIndex, 'label', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder={labelPlaceholder}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => onItemChange(sectionIndex, itemIndex, 'url', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      placeholder="URL"
                    />
                  </div>
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
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getNavigationSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading navigation:', error);
    } finally {
      setLoading(false);
    }
  }

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
      alert('Navegación guardada exitosamente');
    } catch (error) {
      console.error('Error saving navigation:', error);
      alert('Error al guardar la navegación');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Navegación del Sitio</h1>
          <p className="mt-2 text-sm text-gray-600">
            Configura el header y el footer con la estructura vigente de la web pública. El hub consolidado de industrias + casos se representa públicamente como “Casos de éxito”.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      <LinkEditorCard
        title="Menú principal (Español)"
        helper="Replica la navegación superior actual del sitio en español."
        items={settings.mainMenu_es}
        labelPlaceholder="Etiqueta"
        onChange={(index, field, value) => updateMainMenu('mainMenu_es', index, field, value)}
      />

      <LinkEditorCard
        title="Menú principal (Inglés)"
        helper="Replica la navegación superior actual del sitio en inglés."
        items={settings.mainMenu_en}
        labelPlaceholder="Label"
        onChange={(index, field, value) => updateMainMenu('mainMenu_en', index, field, value)}
      />

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
        helper="Los grupos corresponden al footer actual: services, company y resources."
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
  );
}
