// Internationalization utilities

import type { Language } from '../types';

// Route mappings for each language
export const routeMappings: Record<string, Record<Language, string>> = {
  home: { es: '/', en: '/' },
  services: { es: '/servicios', en: '/services' },
  industries: { es: '/industrias', en: '/industries' },
  cases: { es: '/casos', en: '/case-studies' },
  insights: { es: '/insights', en: '/insights' },
  about: { es: '/nosotros', en: '/about' },
  careers: { es: '/trabaja-con-nosotros', en: '/work-with-us' },
  jobs: { es: '/trabaja-con-nosotros/ofertas', en: '/work-with-us/jobs' },
  resources: { es: '/recursos', en: '/resources' },
  contact: { es: '/contacto', en: '/contact' },
};

// Service category route mappings
export const serviceCategoryMappings: Record<string, Record<Language, string>> = {
  'strategy-consulting': { es: '/servicios/strategy-consulting/', en: '/services/strategy-consulting/' },
  'data-delivery': { es: '/servicios/data-delivery/', en: '/services/data-delivery/' },
  'data-operations': { es: '/servicios/data-operations/', en: '/services/data-operations/' },
  'cloud-services': { es: '/servicios/cloud-services/', en: '/services/cloud-services/' },
};

// Get localized route
export function getLocalizedRoute(routeKey: string, language: Language): string {
  const route = routeMappings[routeKey]?.[language] || '/';
  return `/${language}${route}`;
}

// Build service category route
export function getServiceCategoryRoute(categorySlug: string, language: Language): string {
  const route = serviceCategoryMappings[categorySlug]?.[language];
  if (route) {
    return `/${language}${route}`;
  }
  const base = language === 'es' ? '/es/servicios/' : '/en/services/';
  return `${base}${categorySlug}/`;
}

// Build service route
export function getServiceRoute(slug: string, language: Language): string {
  const base = language === 'es' ? '/es/servicios/' : '/en/services/';
  return `${base}${slug}`;
}

// Build industry route
export function getIndustryRoute(slug: string, language: Language): string {
  const base = language === 'es' ? '/es/industrias/' : '/en/industries/';
  return `${base}${slug}`;
}

// Build case study route
export function getCaseStudyRoute(slug: string, language: Language): string {
  const base = language === 'es' ? '/es/casos/' : '/en/case-studies/';
  return `${base}${slug}`;
}

// Build blog post route
export function getBlogPostRoute(slug: string, language: Language): string {
  const base = language === 'es' ? '/es/insights/' : '/en/insights/';
  return `${base}${slug}`;
}

// Build job route
export function getJobRoute(slug: string, language: Language): string {
  const base = language === 'es' ? '/es/trabaja-con-nosotros/ofertas/' : '/en/work-with-us/jobs/';
  return `${base}${slug}`;
}

// Build resource route
export function getResourceRoute(slug: string, language: Language): string {
  const base = language === 'es' ? '/es/recursos/' : '/en/resources/';
  return `${base}${slug}`;
}

// Extract language from path
export function getLanguageFromPath(path: string): Language {
  const firstSegment = path.split('/')[1];
  return firstSegment === 'en' ? 'en' : 'es';
}

// Get alternate language
export function getAlternateLanguage(language: Language): Language {
  return language === 'en' ? 'es' : 'en';
}

// Common UI translations
export const translations = {
  es: {
    // Navigation
    home: 'Inicio',
    services: 'Servicios',
    industries: 'Industrias',
    cases: 'Casos de Éxito',
    insights: 'Insights',
    about: 'Nosotros',
    careers: 'Trabaja con nosotros',
    resources: 'Recursos',
    contact: 'Contacto',
    
    // Common
    readMore: 'Leer más',
    learnMore: 'Conoce más',
    viewAll: 'Ver todos',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    search: 'Buscar',
    filter: 'Filtrar',
    
    // Forms
    name: 'Nombre',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    message: 'Mensaje',
    send: 'Enviar',
    required: 'Requerido',
    
    // Status
    published: 'Publicado',
    draft: 'Borrador',
    active: 'Activo',
    inactive: 'Inactivo',
    
    // Actions
    create: 'Crear',
    edit: 'Editar',
    delete: 'Eliminar',
    save: 'Guardar',
    cancel: 'Cancelar',
    
    // Admin
    admin: 'Administrador',
    dashboard: 'Panel',
    collections: 'Colecciones',
    settings: 'Configuración',
  },
  en: {
    // Navigation
    home: 'Home',
    services: 'Services',
    industries: 'Industries',
    cases: 'Case Studies',
    insights: 'Insights',
    about: 'About',
    careers: 'Careers',
    resources: 'Resources',
    contact: 'Contact',
    
    // Common
    readMore: 'Read more',
    learnMore: 'Learn more',
    viewAll: 'View all',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    
    // Forms
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    send: 'Send',
    required: 'Required',
    
    // Status
    published: 'Published',
    draft: 'Draft',
    active: 'Active',
    inactive: 'Inactive',
    
    // Actions
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    
    // Admin
    admin: 'Admin',
    dashboard: 'Dashboard',
    collections: 'Collections',
    settings: 'Settings',
  },
};

export function t(key: string, language: Language): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}