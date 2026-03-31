import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { initializeSettings, saveSettings, getSettings } from './localStorage.service';

export interface NavigationLink {
  key: string;
  label: string;
  url: string;
}

export interface NavigationSection {
  key: string;
  title: string;
  items: NavigationLink[];
}

export interface NavigationSettings {
  mainMenu_es: NavigationLink[];
  mainMenu_en: NavigationLink[];
  footerSections_es: NavigationSection[];
  footerSections_en: NavigationSection[];
}

const currentSiteNavigation: NavigationSettings = {
  mainMenu_es: [
    { key: 'services', label: 'Servicios', url: '/es/servicios' },
    { key: 'cases', label: 'Casos de éxito', url: '/es/casos-de-exito' },
    { key: 'insights', label: 'Insights', url: '/es/insights' },
    { key: 'about', label: 'Nosotros', url: '/es/nosotros' },
    { key: 'careers', label: 'Trabaja con nosotros', url: '/es/trabaja-con-nosotros' },
    { key: 'contact', label: 'Contacto', url: '/es/contacto' },
  ],
  mainMenu_en: [
    { key: 'services', label: 'Services', url: '/en/services' },
    { key: 'cases', label: 'Case Studies', url: '/en/case-studies' },
    { key: 'insights', label: 'Insights', url: '/en/insights' },
    { key: 'about', label: 'About', url: '/en/about' },
    { key: 'careers', label: 'Work with us', url: '/en/work-with-us' },
    { key: 'contact', label: 'Contact', url: '/en/contact' },
  ],
  footerSections_es: [
    {
      key: 'services',
      title: 'Servicios',
      items: [{ key: 'services', label: 'Servicios', url: '/es/servicios' }],
    },
    {
      key: 'company',
      title: 'Empresa',
      items: [
        { key: 'about', label: 'Nosotros', url: '/es/nosotros' },
        { key: 'careers', label: 'Trabaja con nosotros', url: '/es/trabaja-con-nosotros' },
        { key: 'contact', label: 'Contacto', url: '/es/contacto' },
      ],
    },
    {
      key: 'resources',
      title: 'Recursos',
      items: [
        { key: 'insights', label: 'Insights', url: '/es/insights' },
        { key: 'resources', label: 'Recursos', url: '/es/recursos' },
        { key: 'cases', label: 'Casos de éxito', url: '/es/casos-de-exito' },
      ],
    },
  ],
  footerSections_en: [
    {
      key: 'services',
      title: 'Services',
      items: [{ key: 'services', label: 'Services', url: '/en/services' }],
    },
    {
      key: 'company',
      title: 'Company',
      items: [
        { key: 'about', label: 'About', url: '/en/about' },
        { key: 'careers', label: 'Work with us', url: '/en/work-with-us' },
        { key: 'contact', label: 'Contact', url: '/en/contact' },
      ],
    },
    {
      key: 'resources',
      title: 'Resources',
      items: [
        { key: 'insights', label: 'Insights', url: '/en/insights' },
        { key: 'resources', label: 'Resources', url: '/en/resources' },
        { key: 'cases', label: 'Case Studies', url: '/en/case-studies' },
      ],
    },
  ],
};

function normalizeLinks(links: any[] | undefined, fallback: NavigationLink[]) {
  const valid = Array.isArray(links) ? links : [];
  const byKey = new Map<string, any>();
  for (const item of valid) {
    if (item?.key) byKey.set(item.key, item);
  }

  return fallback.map((baseItem) => {
    const stored = byKey.get(baseItem.key);
    return {
      key: baseItem.key,
      label: stored?.label || baseItem.label,
      url: stored?.url || baseItem.url,
    };
  });
}

function normalizeSections(sections: any[] | undefined, fallback: NavigationSection[]) {
  const valid = Array.isArray(sections) ? sections : [];
  const byKey = new Map<string, any>();
  for (const section of valid) {
    if (section?.key) byKey.set(section.key, section);
  }

  return fallback.map((baseSection) => {
    const stored = byKey.get(baseSection.key);
    return {
      key: baseSection.key,
      title: stored?.title || baseSection.title,
      items: normalizeLinks(stored?.items, baseSection.items),
    };
  });
}

function normalizeLegacyFooter(links: any[] | undefined, fallback: NavigationSection[]) {
  const valid = Array.isArray(links) ? links : [];
  if (valid.length === 0) return fallback;

  return [
    {
      key: 'legacy-footer',
      title: 'Footer',
      items: valid.map((item, index) => ({
        key: item?.key || `legacy-${index}`,
        label: item?.label || '',
        url: item?.url || '',
      })),
    },
  ];
}

function normalizeNavigationSettings(raw: any): NavigationSettings {
  if (!raw || typeof raw !== 'object') {
    return currentSiteNavigation;
  }

  return {
    mainMenu_es: normalizeLinks(raw.mainMenu_es, currentSiteNavigation.mainMenu_es),
    mainMenu_en: normalizeLinks(raw.mainMenu_en, currentSiteNavigation.mainMenu_en),
    footerSections_es: Array.isArray(raw.footerSections_es)
      ? normalizeSections(raw.footerSections_es, currentSiteNavigation.footerSections_es)
      : normalizeLegacyFooter(raw.footerMenu_es, currentSiteNavigation.footerSections_es),
    footerSections_en: Array.isArray(raw.footerSections_en)
      ? normalizeSections(raw.footerSections_en, currentSiteNavigation.footerSections_en)
      : normalizeLegacyFooter(raw.footerMenu_en, currentSiteNavigation.footerSections_en),
  };
}

export async function getNavigationSettings(): Promise<NavigationSettings> {
  if (DATA_PROVIDER === 'mock') {
    const existing = getSettings<any>('navigation');
    const normalized = normalizeNavigationSettings(existing);
    saveSettings('navigation', normalized);
    return Promise.resolve(initializeSettings('navigation', normalized));
  }

  const response = await fetch(`${API_BASE_URL}/settings/navigation`);
  if (!response.ok) throw new Error('Failed to fetch navigation settings');
  const payload = await response.json();
  return normalizeNavigationSettings(payload);
}

export async function saveNavigationSettings(settings: NavigationSettings): Promise<NavigationSettings> {
  const normalized = normalizeNavigationSettings(settings);

  if (DATA_PROVIDER === 'mock') {
    saveSettings('navigation', normalized);
    return Promise.resolve(normalized);
  }

  const response = await fetch(`${API_BASE_URL}/settings/navigation`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalized),
  });
  if (!response.ok) throw new Error('Failed to save navigation settings');
  return response.json();
}
