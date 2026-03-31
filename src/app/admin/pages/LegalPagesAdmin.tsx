import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  getLegalPagesSettings,
  saveLegalPagesSettings,
  type LegalPageDocument,
  type LegalPagesSettings,
} from '../services/legalPages.service';

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  rows = 4,
  onChange,
}: {
  label: string;
  value: string;
  rows?: number;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function DocumentEditor({
  title,
  document,
  onChange,
}: {
  title: string;
  document: LegalPageDocument;
  onChange: (value: LegalPageDocument) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="SEO title (Español)"
          value={document.seoTitle_es}
          onChange={(value) => onChange({ ...document, seoTitle_es: value })}
        />
        <TextInput
          label="SEO title (Inglés)"
          value={document.seoTitle_en}
          onChange={(value) => onChange({ ...document, seoTitle_en: value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextArea
          label="SEO description (Español)"
          value={document.seoDescription_es}
          rows={3}
          onChange={(value) => onChange({ ...document, seoDescription_es: value })}
        />
        <TextArea
          label="SEO description (Inglés)"
          value={document.seoDescription_en}
          rows={3}
          onChange={(value) => onChange({ ...document, seoDescription_en: value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Título visible (Español)"
          value={document.title_es}
          onChange={(value) => onChange({ ...document, title_es: value })}
        />
        <TextInput
          label="Visible title (Inglés)"
          value={document.title_en}
          onChange={(value) => onChange({ ...document, title_en: value })}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextArea
          label="Introducción (Español)"
          value={document.intro_es}
          rows={3}
          onChange={(value) => onChange({ ...document, intro_es: value })}
        />
        <TextArea
          label="Introduction (Inglés)"
          value={document.intro_en}
          rows={3}
          onChange={(value) => onChange({ ...document, intro_en: value })}
        />
      </div>

      <div className="grid gap-4">
        <TextArea
          label="Contenido HTML (Español)"
          value={document.bodyHtml_es}
          rows={16}
          onChange={(value) => onChange({ ...document, bodyHtml_es: value })}
        />
        <TextArea
          label="HTML content (Inglés)"
          value={document.bodyHtml_en}
          rows={16}
          onChange={(value) => onChange({ ...document, bodyHtml_en: value })}
        />
      </div>
    </div>
  );
}

export function LegalPagesAdmin() {
  const [settings, setSettings] = useState<LegalPagesSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      setSettings(await getLegalPagesSettings());
    } catch (error) {
      console.error('Error loading legal pages settings:', error);
      alert('Error al cargar las páginas legales');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!settings) return;

    try {
      setSaving(true);
      const saved = await saveLegalPagesSettings(settings);
      setSettings(saved);
      alert('Páginas legales guardadas exitosamente');
    } catch (error) {
      console.error('Error saving legal pages settings:', error);
      alert('Error al guardar las páginas legales');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando páginas legales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Páginas legales</h1>
          <p className="mt-2 text-sm text-gray-600">
            Edita las páginas de privacidad y cookies en español e inglés.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      <DocumentEditor
        title="Política de privacidad"
        document={settings.privacy}
        onChange={(privacy) => setSettings({ ...settings, privacy })}
      />
      <DocumentEditor
        title="Política de cookies"
        document={settings.cookies}
        onChange={(cookies) => setSettings({ ...settings, cookies })}
      />
    </div>
  );
}
