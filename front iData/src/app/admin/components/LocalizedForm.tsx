import { useState } from 'react';
import { X } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'checkbox' | 'file';
  required?: boolean;
  multilingual?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  rows?: number;
}

interface LocalizedFormProps {
  title: string;
  fields: FormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
}

export function LocalizedForm({
  title,
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
}: LocalizedFormProps) {
  const [activeTab, setActiveTab] = useState<'es' | 'en'>('es');
  const [values, setValues] = useState<Record<string, any>>(initialValues);

  const handleChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const renderField = (field: FormField, lang?: 'es' | 'en') => {
    const fieldName = field.multilingual && lang ? `${field.name}_${lang}` : field.name;
    const fieldValue = values[fieldName] || '';

    const baseClassName = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

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
            className={baseClassName}
          />
        );

      case 'select':
        return (
          <select
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={field.required}
            className={baseClassName}
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
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Language Tabs */}
            {multilingualFields.length > 0 && (
              <div className="mb-6">
                <div className="border-b border-gray-200">
                  <nav className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab('es')}
                      className={`px-4 py-2 border-b-2 font-medium transition-colors ${
                        activeTab === 'es'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Spanish (ES)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('en')}
                      className={`px-4 py-2 border-b-2 font-medium transition-colors ${
                        activeTab === 'en'
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      English (EN)
                    </button>
                  </nav>
                </div>

                {/* Multilingual Fields */}
                <div className="mt-6 space-y-4">
                  {multilingualFields.map((field) => (
                    <div key={`${field.name}_${activeTab}`}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {renderField(field, activeTab)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Global Fields */}
            {globalFields.length > 0 && (
              <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                {globalFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
