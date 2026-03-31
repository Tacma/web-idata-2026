import { useState } from 'react';
import { CRUDList } from '../components/CRUDList';
import { LocalizedForm } from '../components/LocalizedForm';
import { mockHomeSections } from '../../data/mockData';
import type { HomeSection } from '../../shared/types';

export function HomeSectionsAdmin() {
  const [items, setItems] = useState(mockHomeSections);
  const [editingItem, setEditingItem] = useState<HomeSection | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const formFields = [
    { name: 'title', label: 'Title', type: 'text' as const, multilingual: false },
    { name: 'subtitle', label: 'Subtitle', type: 'text' as const, multilingual: false },
    { name: 'ctaLabel', label: 'CTA Label', type: 'text' as const, multilingual: false },
    { name: 'ctaHref', label: 'CTA URL', type: 'text' as const, multilingual: false },
    { 
      name: 'language', 
      label: 'Language', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'es', label: 'Spanish' },
        { value: 'en', label: 'English' },
      ]
    },
    { 
      name: 'type', 
      label: 'Section Type', 
      type: 'select' as const, 
      required: true,
      options: [
        { value: 'hero', label: 'Hero' },
        { value: 'logos', label: 'Logos / Authority' },
        { value: 'maturityJourney', label: 'Maturity Journey' },
        { value: 'serviceHighlights', label: 'Service Highlights' },
        { value: 'industryHighlights', label: 'Industry Highlights' },
        { value: 'caseHighlights', label: 'Case Highlights' },
        { value: 'insightsHighlights', label: 'Insights Highlights' },
        { value: 'testimonials', label: 'Testimonials' },
        { value: 'ctaBand', label: 'CTA Band' },
        { value: 'stats', label: 'Stats' },
        { value: 'custom', label: 'Custom' },
      ]
    },
    { name: 'order', label: 'Order', type: 'number' as const, required: true },
    { name: 'isEnabled', label: 'Enabled', type: 'checkbox' as const },
  ];

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleEdit = (item: HomeSection) => {
    setEditingItem(item);
  };

  const handleDelete = (item: HomeSection) => {
    if (confirm('Are you sure you want to delete this section?')) {
      setItems(items.filter(i => i.id !== item.id));
    }
  };

  const handleSubmit = (values: Record<string, any>) => {
    if (editingItem) {
      // Update existing
      setItems(items.map(i => i.id === editingItem.id ? { ...editingItem, ...values, updatedAt: new Date().toISOString() } as HomeSection : i));
      setEditingItem(null);
    } else {
      // Create new
      const newItem: HomeSection = {
        id: `home-${Date.now()}`,
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setItems([...items, newItem]);
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsCreating(false);
  };

  const columns = [
    {
      key: 'language',
      label: 'Language',
      render: (item: HomeSection) => (
        <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
          {item.language.toUpperCase()}
        </span>
      ),
    },
    { key: 'type', label: 'Type' },
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
    {
      key: 'isEnabled',
      label: 'Status',
      render: (item: HomeSection) => (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
          item.isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {item.isEnabled ? 'Enabled' : 'Disabled'}
        </span>
      ),
    },
  ];

  return (
    <>
      <CRUDList
        title="Home Sections"
        items={items}
        columns={columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {(editingItem || isCreating) && (
        <LocalizedForm
          title={editingItem ? 'Edit Home Section' : 'Create Home Section'}
          fields={formFields}
          initialValues={editingItem || { isEnabled: true, order: items.length + 1 }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}