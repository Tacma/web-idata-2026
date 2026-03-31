import type { Language } from '../types';

export interface MomentumNewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  href: string;
  label: string;
  image?: string | null;
}

export interface MomentumCollectionItem {
  id: string;
  label: string;
  title: string;
  description: string;
  href: string;
  meta: string;
  image?: string | null;
}

const sectionHashByLanguage = {
  es: {
    events: 'eventos',
    builds: 'desarrollos',
  },
  en: {
    events: 'events',
    builds: 'builds',
  },
} as const;

export function buildMomentumContent({
  language,
  articles,
  insightsHref,
}: {
  language: Language;
  articles: MomentumNewsItem[];
  insightsHref: string;
}) {
  const eventsHref = `${insightsHref}#${sectionHashByLanguage[language].events}`;
  const buildsHref = `${insightsHref}#${sectionHashByLanguage[language].builds}`;

  const events: MomentumCollectionItem[] = [
    {
      id: 'event-breakfast',
      label: language === 'es' ? 'Abril 18' : 'April 18',
      title:
        language === 'es'
          ? 'Breakfast ejecutivo: gobierno de datos e IA'
          : 'Executive breakfast: data governance and AI',
      description:
        language === 'es'
          ? 'Conversación cerrada con líderes de tecnología sobre prioridades de adopción, operación y escalabilidad.'
          : 'Private conversation with technology leaders about adoption, operations, and scale priorities.',
      href: `${eventsHref}#event-breakfast`,
      image: articles[0]?.image || articles[1]?.image || null,
      meta: language === 'es' ? 'Bogotá / cupos limitados' : 'Bogota / limited seats',
    },
    {
      id: 'event-workshop',
      label: language === 'es' ? 'Mayo 09' : 'May 09',
      title:
        language === 'es'
          ? 'Workshop iData sobre plataformas modernas'
          : 'iData workshop on modern platforms',
      description:
        language === 'es'
          ? 'Sesión práctica para revisar arquitecturas, quick wins y decisiones de plataforma para equipos de datos.'
          : 'Hands-on session to review architectures, quick wins, and platform decisions for data teams.',
      href: `${eventsHref}#event-workshop`,
      image: articles[1]?.image || articles[0]?.image || null,
      meta: language === 'es' ? 'Formato hands-on' : 'Hands-on format',
    },
  ];

  const labs: MomentumCollectionItem[] = [
    {
      id: 'build-ai-accelerators',
      label: language === 'es' ? 'En desarrollo' : 'In development',
      title:
        language === 'es'
          ? 'Aceleradores para adopción de IA empresarial'
          : 'Accelerators for enterprise AI adoption',
      description:
        language === 'es'
          ? 'Estamos estructurando paquetes de descubrimiento y despliegue para casos de copilots, automatización y analítica aumentada.'
          : 'We are shaping discovery and deployment packages for copilots, automation, and augmented analytics use cases.',
      href: `${buildsHref}#build-ai-accelerators`,
      image: articles[2]?.image || articles[0]?.image || null,
      meta: language === 'es' ? 'AI adoption studio' : 'AI adoption studio',
    },
    {
      id: 'build-ops-frameworks',
      label: language === 'es' ? 'Radar de producto' : 'Product radar',
      title:
        language === 'es'
          ? 'Frameworks de operación y observabilidad'
          : 'Operations and observability frameworks',
      description:
        language === 'es'
          ? 'Estamos refinando componentes para gobernanza, monitoreo y evolución continua de data products.'
          : 'We are refining components for governance, monitoring, and continuous evolution of data products.',
      href: `${buildsHref}#build-ops-frameworks`,
      image: articles[1]?.image || articles[2]?.image || null,
      meta: language === 'es' ? 'Ops + governance' : 'Ops + governance',
    },
  ];

  return { events, labs };
}

