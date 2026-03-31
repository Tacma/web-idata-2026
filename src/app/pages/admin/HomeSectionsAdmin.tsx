import { useState } from 'react';
import { Plus, Edit2, Trash2, MoveUp, MoveDown, Eye, EyeOff } from 'lucide-react';
import { mockCollections } from '../../data/mockData';
import type { HomeSection, Language } from '../../types';

export function HomeSectionsAdmin() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');
  const [sections] = useState<HomeSection[]>(mockCollections.homeSections);

  const filteredSections = sections
    .filter(s => s.language === selectedLanguage)
    .sort((a, b) => a.order - b.order);

  const getSectionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'hero': 'Hero Banner',
      'strategicBannerTriple': 'Strategic Banner Triple',
      'serviceHighlights': 'Service Highlights',
      'industryHighlights': 'Industry Highlights',
      'caseHighlights': 'Case Studies Highlights',
      'insightsHighlights': 'Insights Highlights',
      'testimonials': 'Testimonials',
      'logos': 'Client Logos',
      'ctaBand': 'Call to Action Band',
      'stats': 'Statistics',
      'maturityJourney': 'Maturity Journey',
      'custom': 'Custom Section',
    };
    return labels[type] || type;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Home Sections</h1>
        <p className="text-gray-600 mt-2">
          Configure which sections appear on the home page for each language
        </p>
      </div>

      {/* Language Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedLanguage('es')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              selectedLanguage === 'es'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Spanish (ES)
          </button>
          <button
            onClick={() => setSelectedLanguage('en')}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              selectedLanguage === 'en'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            English (EN)
          </button>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Section
        </button>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        {filteredSections.map((section, index) => (
          <div
            key={section.id}
            className={`bg-white rounded-lg shadow p-6 ${
              !section.isEnabled ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-medium">
                    Order: {section.order}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                    {getSectionTypeLabel(section.type)}
                  </span>
                  {section.isEnabled ? (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Enabled
                    </span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                      <EyeOff className="w-3 h-3" />
                      Disabled
                    </span>
                  )}
                </div>
                {section.title && (
                  <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                )}
                {section.subtitle && (
                  <p className="text-gray-600 text-sm mb-2">{section.subtitle}</p>
                )}
                {section.referencedIds && section.referencedIds.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Referenced items: {section.referencedIds.length}
                  </p>
                )}
                {section.ctaText && section.ctaUrl && (
                  <p className="text-sm text-gray-500">
                    CTA: {section.ctaText} → {section.ctaUrl}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={index === 0}
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={index === filteredSections.length - 1}
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredSections.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-500">
              No sections configured for {selectedLanguage === 'es' ? 'Spanish' : 'English'}
            </p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add First Section
            </button>
          </div>
        )}
      </div>

      {/* Configuration Guide */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Home Sections Configuration</h3>
        <p className="text-sm text-blue-800 mb-4">
          Each language (ES/EN) can have completely different home page structures. Available fields:
        </p>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li><strong>language</strong>: "es" or "en"</li>
          <li><strong>type</strong>: Section type (hero, featured-services, testimonials, etc.)</li>
          <li><strong>active</strong>: Show/hide section (boolean)</li>
          <li><strong>order</strong>: Display order (number)</li>
          <li><strong>title</strong> / <strong>subtitle</strong>: Section headings (optional)</li>
          <li><strong>ctaText</strong> / <strong>ctaUrl</strong>: Call-to-action button (optional)</li>
          <li><strong>referencedIds</strong>: Array of IDs from other collections to feature</li>
          <li><strong>customContent</strong>: HTML or JSON for custom sections</li>
          <li><strong>config</strong>: Additional configuration object</li>
        </ul>
      </div>
    </div>
  );
}