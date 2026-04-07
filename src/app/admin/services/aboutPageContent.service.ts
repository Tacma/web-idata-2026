import { getCachedSiteSetting, getSiteSetting, saveSiteSetting } from './siteSettings.service';

export interface AboutRecognitionCardContent {
  metric: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  detail_es: string;
  detail_en: string;
}

export interface AboutCultureCardContent {
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
}

export interface AboutHighlightContent {
  label_es: string;
  label_en: string;
  text_es: string;
  text_en: string;
}

export interface AboutPageContent {
  heroTitle_es: string;
  heroTitle_en: string;
  heroPrimaryCta_es: string;
  heroPrimaryCta_en: string;
  heroSecondaryCta_es: string;
  heroSecondaryCta_en: string;
  whoEyebrow_es: string;
  whoEyebrow_en: string;
  whoTitle_es: string;
  whoTitle_en: string;
  whoDescription_es: string;
  whoDescription_en: string;
  whoPills_es: string[];
  whoPills_en: string[];
  cultureEyebrow_es: string;
  cultureEyebrow_en: string;
  cultureTitle_es: string;
  cultureTitle_en: string;
  cultureDescription_es: string;
  cultureDescription_en: string;
  purposeEyebrow_es: string;
  purposeEyebrow_en: string;
  purposeTitle_es: string;
  purposeTitle_en: string;
  purposeDescription_es: string;
  purposeDescription_en: string;
  purposeHighlights: AboutHighlightContent[];
  mindsetEyebrow_es: string;
  mindsetEyebrow_en: string;
  mindsetTitle_es: string;
  mindsetTitle_en: string;
  mindsetDescription_es: string;
  mindsetDescription_en: string;
  mindsetBeforeTitle_es: string;
  mindsetBeforeTitle_en: string;
  mindsetAfterTitle_es: string;
  mindsetAfterTitle_en: string;
  mindsetBeforePoints_es: string[];
  mindsetBeforePoints_en: string[];
  mindsetAfterPoints_es: string[];
  mindsetAfterPoints_en: string[];
  valuesEyebrow_es: string;
  valuesEyebrow_en: string;
  valuesTitle_es: string;
  valuesTitle_en: string;
  values_es: string[];
  values_en: string[];
  humanEyebrow_es: string;
  humanEyebrow_en: string;
  humanTitle_es: string;
  humanTitle_en: string;
  humanDescription_es: string;
  humanDescription_en: string;
  ctaTitle_es: string;
  ctaTitle_en: string;
  ctaDescription_es: string;
  ctaDescription_en: string;
  ctaLabel_es: string;
  ctaLabel_en: string;
  recognitionEyebrow_es: string;
  recognitionEyebrow_en: string;
  recognitionTitle_es: string;
  recognitionTitle_en: string;
  recognitionDescription_es: string;
  recognitionDescription_en: string;
  cultureCards: AboutCultureCardContent[];
  recognitionCards: AboutRecognitionCardContent[];
}

export const defaultAboutPageContent: AboutPageContent = {
  heroTitle_es: 'Personas, datos e impacto real.',
  heroTitle_en: 'People, data, real impact.',
  heroPrimaryCta_es: 'Explorar vacantes',
  heroPrimaryCta_en: 'Explore careers',
  heroSecondaryCta_es: 'Hablar con nosotros',
  heroSecondaryCta_en: 'Work with us',
  whoEyebrow_es: 'Quiénes somos',
  whoEyebrow_en: 'Who we are',
  whoTitle_es: 'Una compañía global de datos, analítica e IA',
  whoTitle_en: 'A global data, analytics and AI company',
  whoDescription_es:
    'iData Global es una compañía multinacional especializada en soluciones de datos, analítica e inteligencia artificial. Trabajamos con organizaciones de múltiples industrias combinando visión estratégica, ejecución técnica y entendimiento del negocio para acelerar resultados medibles.',
  whoDescription_en:
    'iData Global is a multinational company specialized in data, analytics and AI solutions. We work with organizations across industries, combining strategic thinking, technical execution and business understanding to accelerate measurable outcomes.',
  whoPills_es: ['Multinacional', 'Data + AI solutions', 'Múltiples industrias', 'Estrategia + delivery'],
  whoPills_en: ['Multinational', 'Data + AI solutions', 'Cross-industry expertise', 'Strategy + delivery'],
  cultureEyebrow_es: 'COOLTURA',
  cultureEyebrow_en: 'COOLTURA',
  cultureTitle_es: 'Cooltura',
  cultureTitle_en: 'Cooltura',
  cultureDescription_es:
    'En iData Global, nuestra cultura, o COOLTURA, es el equilibrio entre personas, datos y soluciones. Es lo que nos permite combinar excelencia técnica, empatía y pensamiento estratégico para crear impacto significativo.',
  cultureDescription_en:
    'At iData Global, our culture, or COOLTURA, is the balance between people, data and solutions. It is what allows us to combine technical excellence, empathy and strategic thinking to create meaningful impact.',
  purposeEyebrow_es: 'Nuestro propósito',
  purposeEyebrow_en: 'Our Purpose',
  purposeTitle_es: 'Transformar nuestro entorno a través del poder de los datos',
  purposeTitle_en: 'Transforming our environment through the power of data.',
  purposeDescription_es:
    'Creemos que los datos no son solo información: son la base para decisiones más inteligentes, más humanas y más sostenibles.',
  purposeDescription_en:
    'We believe data is not just information — it is the foundation for smarter, more human and more sustainable decisions.',
  purposeHighlights: [
    {
      label_es: 'Más claridad',
      label_en: 'More clarity',
      text_es: 'Decisiones con mejor contexto',
      text_en: 'Decisions with better context',
    },
    {
      label_es: 'Más confianza',
      label_en: 'More trust',
      text_es: 'Modelos y procesos con criterio',
      text_en: 'Models and processes with accountability',
    },
    {
      label_es: 'Más impacto',
      label_en: 'More impact',
      text_es: 'Resultados conectados al negocio',
      text_en: 'Outcomes tied to business value',
    },
  ],
  mindsetEyebrow_es: 'Evolución',
  mindsetEyebrow_en: 'Evolution',
  mindsetTitle_es: 'De la excelencia individual al impacto colectivo',
  mindsetTitle_en: 'From individual excellence to collective impact',
  mindsetDescription_es:
    'En iData evolucionamos de una mentalidad orientada al rendimiento individual hacia una cultura basada en colaboración, propósito compartido e impacto de largo plazo.',
  mindsetDescription_en:
    'At iData, we evolved from a performance-driven mindset to a culture built on collaboration, shared purpose and long-term impact.',
  mindsetBeforeTitle_es: 'Antes',
  mindsetBeforeTitle_en: 'Before',
  mindsetAfterTitle_es: 'Ahora',
  mindsetAfterTitle_en: 'Now',
  mindsetBeforePoints_es: [
    'Excelencia medida por capacidad individual',
    'Éxito entendido como entrega puntual',
    'Resolución enfocada en disciplinas aisladas',
  ],
  mindsetBeforePoints_en: [
    'Excellence measured by individual capability',
    'Success understood as on-time delivery',
    'Problem solving centered on isolated disciplines',
  ],
  mindsetAfterPoints_es: [
    'Equipos multidisciplinarios con ownership real',
    'Impacto compartido entre negocio, datos y experiencia',
    'Relaciones de largo plazo y mejora continua',
  ],
  mindsetAfterPoints_en: [
    'Multidisciplinary teams with real ownership',
    'Shared impact across business, data and experience',
    'Long-term relationships and continuous improvement',
  ],
  valuesEyebrow_es: 'Valores en acción',
  valuesEyebrow_en: 'Values in action',
  valuesTitle_es: 'Lo que nos define en el día a día',
  valuesTitle_en: 'What defines us in action',
  values_es: [
    'Lideramos con empatía e intención.',
    'Tomamos decisiones basadas en datos y ética.',
    'Innovamos con propósito.',
    'Comunicamos con claridad y actuamos con responsabilidad.',
    'Nos enfocamos en impacto real, no solo en entrega.',
  ],
  values_en: [
    'We lead with empathy and intention.',
    'We make decisions based on data and ethics.',
    'We innovate with purpose.',
    'We communicate clearly and act with responsibility.',
    'We focus on real impact, not just delivery.',
  ],
  humanEyebrow_es: 'Cooltura',
  humanEyebrow_en: 'Cooltura',
  humanTitle_es: 'La cultura se construye en cómo colaboramos, aprendemos y respondemos',
  humanTitle_en: 'Culture is built in how we collaborate, learn and respond',
  humanDescription_es:
    'Nuestra manera de trabajar combina cercanía, rigor y una vocación real por resolver problemas complejos con equipos diversos, curiosos y comprometidos.',
  humanDescription_en:
    'Our way of working combines proximity, rigor and a real vocation for solving complex problems with diverse, curious and committed teams.',
  ctaTitle_es: '¿Listo para transformar tu negocio con datos?',
  ctaTitle_en: 'Ready to transform your business with data?',
  ctaDescription_es:
    'Si buscas un socio para acelerar decisiones, modernizar capacidades o escalar una operación de datos e IA, conversemos.',
  ctaDescription_en:
    'If you are looking for a partner to accelerate decisions, modernize capabilities or scale a data and AI operation, let’s talk.',
  ctaLabel_es: 'Contactarnos',
  ctaLabel_en: 'Talk to an expert',
  recognitionEyebrow_es: 'Reconocimientos',
  recognitionEyebrow_en: 'Recognition',
  recognitionTitle_es: 'Premios, credenciales y logros que respaldan nuestro trabajo',
  recognitionTitle_en: 'Awards, credentials and achievements that support our work',
  recognitionDescription_es:
    'Esta sección resume la solidez de nuestro ecosistema partner, la evolución de nuestro talento certificado y los hitos que demuestran capacidad real de ejecución.',
  recognitionDescription_en:
    'This section summarizes the strength of our partner ecosystem, the evolution of our certified talent and the milestones that prove real execution capability.',
  cultureCards: [
    {
      title_es: 'Cool People',
      title_en: 'Cool People',
      description_es:
        'Creemos en la colaboración, la empatía y el crecimiento continuo. Las personas están en el centro de todo lo que construimos.',
      description_en:
        'We believe in collaboration, empathy and continuous growth. People are at the center of everything we build.',
    },
    {
      title_es: 'Cool Tech',
      title_en: 'Cool Tech',
      description_es:
        'Usamos los datos con rigor, ética e innovación, transformando información en decisiones estratégicas.',
      description_en:
        'We use data with rigor, ethics and innovation, transforming information into strategic decisions.',
    },
    {
      title_es: 'Cool Solutions',
      title_en: 'Cool Solutions',
      description_es:
        'Diseñamos soluciones prácticas, creativas y centradas en el usuario que generan valor real para el negocio.',
      description_en:
        'We design practical, creative and user-centered solutions that generate real business value.',
    },
  ],
  recognitionCards: [
    {
      metric: '05+',
      title_es: 'Partners reconocidos',
      title_en: 'Recognized partnerships',
      description_es:
        'Fortalecemos nuestro impacto con alianzas estratégicas, especializaciones y reconocimientos que respaldan nuestras implementaciones.',
      description_en:
        'We expand our impact through strategic alliances, specializations and recognitions that support our implementations.',
      detail_es: 'Ecosistema partner, especializaciones y presencia regional',
      detail_en: 'Partner ecosystem, specializations and regional presence',
    },
    {
      metric: '40+',
      title_es: 'Talento certificado',
      title_en: 'Certified talent',
      description_es:
        'Nuestro equipo crece con certificaciones técnicas y formación continua en plataformas, analítica avanzada e inteligencia artificial.',
      description_en:
        'Our team grows through technical certifications and continuous learning across platforms, advanced analytics and AI.',
      detail_es: 'Certificaciones activas y aprendizaje continuo',
      detail_en: 'Active certifications and continuous learning',
    },
    {
      metric: 'Enterprise',
      title_es: 'Confianza enterprise',
      title_en: 'Enterprise trust',
      description_es:
        'Los logros del equipo se reflejan en programas, credenciales y entregables que generan confianza en operaciones de alto nivel.',
      description_en:
        'Team achievements show up in programs, credentials and deliverables that build confidence in high-level operations.',
      detail_es: 'Estándares, validaciones y ejecución confiable',
      detail_en: 'Standards, validations and dependable execution',
    },
    {
      metric: 'Top Team',
      title_es: 'Premios que elevan la práctica',
      title_en: 'Awards that elevate the craft',
      description_es:
        'Celebramos hitos que combinan excelencia técnica, colaboración y resultados de negocio en proyectos reales.',
      description_en:
        'We celebrate milestones that combine technical excellence, collaboration and business results in real engagements.',
      detail_es: 'Reconocimientos, hitos y cultura de excelencia',
      detail_en: 'Recognitions, milestones and a culture of excellence',
    },
  ],
};

function normalize(raw: any): AboutPageContent {
  return {
    ...defaultAboutPageContent,
    ...raw,
    whoPills_es: Array.isArray(raw?.whoPills_es) && raw.whoPills_es.length > 0 ? raw.whoPills_es : defaultAboutPageContent.whoPills_es,
    whoPills_en: Array.isArray(raw?.whoPills_en) && raw.whoPills_en.length > 0 ? raw.whoPills_en : defaultAboutPageContent.whoPills_en,
    purposeHighlights:
      Array.isArray(raw?.purposeHighlights) && raw.purposeHighlights.length > 0
        ? raw.purposeHighlights.map((item: any, index: number) => ({
            ...defaultAboutPageContent.purposeHighlights[index % defaultAboutPageContent.purposeHighlights.length],
            ...item,
          }))
        : defaultAboutPageContent.purposeHighlights,
    mindsetBeforePoints_es:
      Array.isArray(raw?.mindsetBeforePoints_es) && raw.mindsetBeforePoints_es.length > 0
        ? raw.mindsetBeforePoints_es
        : defaultAboutPageContent.mindsetBeforePoints_es,
    mindsetBeforePoints_en:
      Array.isArray(raw?.mindsetBeforePoints_en) && raw.mindsetBeforePoints_en.length > 0
        ? raw.mindsetBeforePoints_en
        : defaultAboutPageContent.mindsetBeforePoints_en,
    mindsetAfterPoints_es:
      Array.isArray(raw?.mindsetAfterPoints_es) && raw.mindsetAfterPoints_es.length > 0
        ? raw.mindsetAfterPoints_es
        : defaultAboutPageContent.mindsetAfterPoints_es,
    mindsetAfterPoints_en:
      Array.isArray(raw?.mindsetAfterPoints_en) && raw.mindsetAfterPoints_en.length > 0
        ? raw.mindsetAfterPoints_en
        : defaultAboutPageContent.mindsetAfterPoints_en,
    values_es: Array.isArray(raw?.values_es) && raw.values_es.length > 0 ? raw.values_es : defaultAboutPageContent.values_es,
    values_en: Array.isArray(raw?.values_en) && raw.values_en.length > 0 ? raw.values_en : defaultAboutPageContent.values_en,
    cultureCards:
      Array.isArray(raw?.cultureCards) && raw.cultureCards.length > 0
        ? raw.cultureCards.map((card: any, index: number) => ({
            ...defaultAboutPageContent.cultureCards[index % defaultAboutPageContent.cultureCards.length],
            ...card,
          }))
        : defaultAboutPageContent.cultureCards,
    recognitionCards:
      Array.isArray(raw?.recognitionCards) && raw.recognitionCards.length > 0
        ? raw.recognitionCards.map((card: any, index: number) => ({
            ...defaultAboutPageContent.recognitionCards[index % defaultAboutPageContent.recognitionCards.length],
            ...card,
          }))
        : defaultAboutPageContent.recognitionCards,
  };
}

export function getAboutPageContentSnapshot(): AboutPageContent {
  return normalize(getCachedSiteSetting('about_page_content', defaultAboutPageContent));
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const raw = await getSiteSetting('about_page_content', 'about_page_content', defaultAboutPageContent);
  const normalized = normalize(raw);
  await saveSiteSetting('about_page_content', 'about_page_content', normalized);
  return normalized;
}

export async function saveAboutPageContent(settings: AboutPageContent): Promise<AboutPageContent> {
  const normalized = normalize(settings);
  return normalize(await saveSiteSetting('about_page_content', 'about_page_content', normalized));
}
