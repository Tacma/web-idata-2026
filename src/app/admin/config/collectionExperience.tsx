import type { ReactNode } from 'react';
import type { CollectionName } from '../../shared/types';
import { BookOpen, Briefcase, FileText, FolderOpen, Handshake, Newspaper, Radar, Star, Users, UserSquare2, BriefcaseBusiness, FolderKanban } from 'lucide-react';

export interface CollectionExperienceMeta {
  title: string;
  subtitle: string;
  createLabel: string;
  searchPlaceholder: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: ReactNode;
}

export const collectionExperience: Record<CollectionName, CollectionExperienceMeta> = {
  pages: {
    title: 'Páginas del sitio',
    subtitle: 'Administra la base editable de cada página sin cambiar la arquitectura pública.',
    createLabel: 'Crear página',
    searchPlaceholder: 'Busca por nombre de página, slug o estado...',
    emptyTitle: 'Todavía no hay páginas',
    emptyDescription: 'Cuando crees una página aparecerá aquí como base editable del sitio.',
    icon: <FileText className="h-5 w-5" />,
  },
  services: {
    title: 'Servicios',
    subtitle: 'Gestiona la oferta comercial y la forma en que iData presenta sus capacidades.',
    createLabel: 'Crear servicio',
    searchPlaceholder: 'Busca por servicio, categoría o estado...',
    emptyTitle: 'Todavía no hay servicios',
    emptyDescription: 'Crea el primer servicio para empezar a construir la oferta visible en la web.',
    icon: <Briefcase className="h-5 w-5" />,
  },
  partners: {
    title: 'Partners y alianzas',
    subtitle: 'Mantén actualizadas las alianzas que respaldan la propuesta de valor de iData.',
    createLabel: 'Agregar partner',
    searchPlaceholder: 'Busca por partner, alianza o estado...',
    emptyTitle: 'Todavía no hay partners',
    emptyDescription: 'Agrega aliados estratégicos y logos que fortalecen la credibilidad del sitio.',
    icon: <Handshake className="h-5 w-5" />,
  },
  serviceCategories: {
    title: 'Categorías de servicio',
    subtitle: 'Ordena la arquitectura comercial de servicios para facilitar navegación y edición.',
    createLabel: 'Crear categoría',
    searchPlaceholder: 'Busca por categoría o nombre visible...',
    emptyTitle: 'Todavía no hay categorías',
    emptyDescription: 'Crea categorías para estructurar mejor la oferta de servicios.',
    icon: <FolderKanban className="h-5 w-5" />,
  },
  industries: {
    title: 'Industrias',
    subtitle: 'Edita los verticales o sectores donde iData comunica su experiencia.',
    createLabel: 'Crear industria',
    searchPlaceholder: 'Busca por industria, sector o estado...',
    emptyTitle: 'Todavía no hay industrias',
    emptyDescription: 'Agrega industrias para conectar capacidades con contextos de negocio.',
    icon: <FolderOpen className="h-5 w-5" />,
  },
  caseStudies: {
    title: 'Casos de éxito',
    subtitle: 'Muestra proyectos y resultados reales para reforzar confianza comercial.',
    createLabel: 'Crear caso',
    searchPlaceholder: 'Busca por cliente, caso o resultado...',
    emptyTitle: 'Todavía no hay casos de éxito',
    emptyDescription: 'Crea el primer caso para mostrar resultados reales del equipo.',
    icon: <Star className="h-5 w-5" />,
  },
  blogPosts: {
    title: 'Insights',
    subtitle: 'Administra artículos e historias que posicionan el conocimiento de iData.',
    createLabel: 'Crear insight',
    searchPlaceholder: 'Busca por artículo, insight o categoría...',
    emptyTitle: 'Todavía no hay insights',
    emptyDescription: 'Publica el primer artículo para activar el módulo de conocimiento.',
    icon: <Newspaper className="h-5 w-5" />,
  },
  blogCategories: {
    title: 'Categorías de insights',
    subtitle: 'Organiza el contenido editorial para mejorar lectura, navegación y filtrado.',
    createLabel: 'Crear categoría',
    searchPlaceholder: 'Busca por categoría...',
    emptyTitle: 'Todavía no hay categorías',
    emptyDescription: 'Crea categorías para ordenar mejor los contenidos editoriales.',
    icon: <BookOpen className="h-5 w-5" />,
  },
  insightEvents: {
    title: 'Eventos',
    subtitle: 'Gestiona eventos e iniciativas visibles desde el ecosistema de insights.',
    createLabel: 'Crear evento',
    searchPlaceholder: 'Busca por evento, formato o estado...',
    emptyTitle: 'Todavía no hay eventos',
    emptyDescription: 'Crea el primer evento para ampliar la presencia editorial del sitio.',
    icon: <Users className="h-5 w-5" />,
  },
  insightLabs: {
    title: 'Radar / Labs',
    subtitle: 'Administra piezas exploratorias, builds y señales de innovación de iData.',
    createLabel: 'Crear entrada',
    searchPlaceholder: 'Busca por build, radar o laboratorio...',
    emptyTitle: 'Todavía no hay entradas de radar',
    emptyDescription: 'Crea una entrada para mostrar exploración, prototipos o tendencias.',
    icon: <Radar className="h-5 w-5" />,
  },
  jobs: {
    title: 'Vacantes',
    subtitle: 'Publica y organiza oportunidades laborales con detalle y contexto real.',
    createLabel: 'Crear vacante',
    searchPlaceholder: 'Busca por cargo, área, modalidad o nivel...',
    emptyTitle: 'Todavía no hay vacantes',
    emptyDescription: 'Crea la primera vacante para activar la página de careers.',
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  teamMembers: {
    title: 'Miembros del equipo',
    subtitle: 'Gestiona perfiles visibles del equipo, liderazgo y referentes públicos de la marca.',
    createLabel: 'Agregar miembro',
    searchPlaceholder: 'Busca por nombre, rol o equipo...',
    emptyTitle: 'Todavía no hay perfiles',
    emptyDescription: 'Agrega personas del equipo para reforzar cultura y confianza.',
    icon: <UserSquare2 className="h-5 w-5" />,
  },
  resources: {
    title: 'Recursos',
    subtitle: 'Administra descargables, materiales y activos que apoyan la conversación comercial.',
    createLabel: 'Crear recurso',
    searchPlaceholder: 'Busca por recurso, material o tipo...',
    emptyTitle: 'Todavía no hay recursos',
    emptyDescription: 'Sube el primer recurso para nutrir el módulo de materiales.',
    icon: <BookOpen className="h-5 w-5" />,
  },
  testimonials: {
    title: 'Testimonios',
    subtitle: 'Edita voces de clientes y señales de confianza que acompañan el relato comercial.',
    createLabel: 'Crear testimonio',
    searchPlaceholder: 'Busca por cliente, quote o persona...',
    emptyTitle: 'Todavía no hay testimonios',
    emptyDescription: 'Agrega testimonios para reforzar prueba social en el sitio.',
    icon: <Star className="h-5 w-5" />,
  },
  homeSections: {
    title: 'Secciones del home',
    subtitle: 'Gestiona los bloques visibles de la portada respetando la composición actual del sitio.',
    createLabel: 'Crear sección',
    searchPlaceholder: 'Busca por tipo de sección o idioma...',
    emptyTitle: 'Todavía no hay secciones',
    emptyDescription: 'Crea una sección para empezar a editar la portada.',
    icon: <FileText className="h-5 w-5" />,
  },
};
