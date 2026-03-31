import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../shared/contexts/ThemeContext';

type JourneyStepId = 'foundation' | 'structure' | 'enablement' | 'operations';

interface JourneyNode {
  id: string;
  step: JourneyStepId;
  title: { es: string; en: string };
  eyebrow: { es: string; en: string };
  description: { es: string; en: string };
  outcome: { es: string; en: string };
  href: { es: string; en: string };
  visual: {
    x: string;
    y: string;
    width: string;
    height: string;
    z: number;
  };
}

const journeyStepOrder: JourneyStepId[] = ['foundation', 'structure', 'enablement', 'operations'];

const journeyNodes: JourneyNode[] = [
  {
    id: 'data-strategy',
    step: 'foundation',
    title: { es: 'Estrategia de datos', en: 'Data strategy' },
    eyebrow: { es: 'Cimiento 01', en: 'Foundation 01' },
    description: {
      es: 'Definimos el norte, prioridades y modelo de valor para que el dato responda al negocio y no al revés.',
      en: 'We define direction, priorities and the value model so data answers the business, not the other way around.',
    },
    outcome: {
      es: 'Alineación ejecutiva, foco y roadmap.',
      en: 'Executive alignment, focus and roadmap.',
    },
    href: { es: '/es/servicios/strategy-consulting', en: '/en/services/strategy-consulting' },
    visual: { x: '16%', y: '83%', width: '20%', height: '12%', z: 1 },
  },
  {
    id: 'data-architecture',
    step: 'structure',
    title: { es: 'Arquitectura de datos', en: 'Data architecture' },
    eyebrow: { es: 'Estructura 01', en: 'Structure 01' },
    description: {
      es: 'Diseñamos la estructura técnica, integración y escalabilidad sobre la que se monta toda la torre.',
      en: 'We design the technical structure, integration and scalability on which the whole tower is built.',
    },
    outcome: {
      es: 'Base técnica firme para crecer.',
      en: 'A solid technical base for growth.',
    },
    href: { es: '/es/servicios/data-delivery', en: '/en/services/data-delivery' },
    visual: { x: '31%', y: '59%', width: '15%', height: '23%', z: 3 },
  },
  {
    id: 'data-governance',
    step: 'foundation',
    title: { es: 'Gobierno de datos', en: 'Data governance' },
    eyebrow: { es: 'Cimiento 02', en: 'Foundation 02' },
    description: {
      es: 'Ponemos ownership, reglas y control para que el dato sea utilizable y sostenible en el tiempo.',
      en: 'We establish ownership, rules and control so data remains usable and sustainable over time.',
    },
    outcome: {
      es: 'Confianza, orden y cumplimiento.',
      en: 'Trust, order and compliance.',
    },
    href: { es: '/es/servicios/strategy-consulting', en: '/en/services/strategy-consulting' },
    visual: { x: '52%', y: '83%', width: '20%', height: '12%', z: 1 },
  },
  {
    id: 'data-quality',
    step: 'foundation',
    title: { es: 'Calidad de datos', en: 'Data quality' },
    eyebrow: { es: 'Cimiento 03', en: 'Foundation 03' },
    description: {
      es: 'Aseguramos que la materia prima del sistema llegue limpia, completa y lista para decisiones críticas.',
      en: 'We ensure the raw material arrives clean, complete and ready for critical decisions.',
    },
    outcome: {
      es: 'Menos fricción, más confiabilidad.',
      en: 'Less friction, more reliability.',
    },
    href: { es: '/es/servicios/strategy-consulting', en: '/en/services/strategy-consulting' },
    visual: { x: '68%', y: '83%', width: '16%', height: '12%', z: 1 },
  },
  {
    id: 'data-integration',
    step: 'structure',
    title: { es: 'Pipelines e integración', en: 'Pipelines and integration' },
    eyebrow: { es: 'Estructura 02', en: 'Structure 02' },
    description: {
      es: 'Conectamos fuentes, procesos y flujos para que la plataforma mueva datos con criterio, trazabilidad y continuidad.',
      en: 'We connect sources, processes and flows so the platform moves data with rigor, traceability and continuity.',
    },
    outcome: {
      es: 'Datos listos para circular y escalar.',
      en: 'Data ready to circulate and scale.',
    },
    href: { es: '/es/servicios/data-delivery', en: '/en/services/data-delivery' },
    visual: { x: '53%', y: '60%', width: '16%', height: '22%', z: 3 },
  },
  {
    id: 'applied-analytics',
    step: 'structure',
    title: { es: 'Analítica aplicada', en: 'Applied analytics' },
    eyebrow: { es: 'Estructura 03', en: 'Structure 03' },
    description: {
      es: 'Diseñamos consumo analítico y lectura operativa para que la información se convierta en decisiones accionables.',
      en: 'We design analytics consumption and operational reading so information becomes actionable decisions.',
    },
    outcome: {
      es: 'Una estructura preparada para decidir mejor.',
      en: 'A structure prepared for better decisions.',
    },
    href: { es: '/es/servicios/data-delivery', en: '/en/services/data-delivery' },
    visual: { x: '71%', y: '61%', width: '12%', height: '19%', z: 3 },
  },
  {
    id: 'cloud-platforms',
    step: 'enablement',
    title: { es: 'Plataformas cloud', en: 'Cloud platforms' },
    eyebrow: { es: 'Habilitación 01', en: 'Enablement 01' },
    description: {
      es: 'Activamos el entorno tecnológico donde el edificio realmente puede correr con elasticidad y control.',
      en: 'We activate the technology environment where the building can truly run with elasticity and control.',
    },
    outcome: {
      es: 'Base cloud lista para operar.',
      en: 'A cloud base ready to operate.',
    },
    href: { es: '/es/servicios/cloud-services-provider', en: '/en/services/cloud-services-provider' },
    visual: { x: '56%', y: '28%', width: '13%', height: '24%', z: 4 },
  },
  {
    id: 'lakehouse-sharing',
    step: 'enablement',
    title: { es: 'Lakehouse y data sharing', en: 'Lakehouse and data sharing' },
    eyebrow: { es: 'Habilitación 02', en: 'Enablement 02' },
    description: {
      es: 'Habilitamos consumo compartido y acceso moderno a datos para que las capacidades ya construidas puedan operar juntas.',
      en: 'We enable shared consumption and modern data access so the built capabilities can operate together.',
    },
    outcome: {
      es: 'Un entorno listo para consumo conectado.',
      en: 'An environment ready for connected consumption.',
    },
    href: { es: '/es/servicios/cloud-services-provider', en: '/en/services/cloud-services-provider' },
    visual: { x: '42%', y: '10%', width: '14%', height: '12%', z: 5 },
  },
  {
    id: 'observability-security',
    step: 'enablement',
    title: { es: 'Observabilidad y seguridad base', en: 'Observability and core security' },
    eyebrow: { es: 'Habilitación 03', en: 'Enablement 03' },
    description: {
      es: 'Ponemos monitoreo, trazabilidad y seguridad para que la solución funcione con confianza desde el primer día.',
      en: 'We add monitoring, traceability and security so the solution runs with confidence from day one.',
    },
    outcome: {
      es: 'Control real sobre la plataforma.',
      en: 'Real control over the platform.',
    },
    href: { es: '/es/servicios/cloud-services-provider', en: '/en/services/cloud-services-provider' },
    visual: { x: '70%', y: '13%', width: '11%', height: '18%', z: 5 },
  },
  {
    id: 'operational-support',
    step: 'operations',
    title: { es: 'Soporte operativo', en: 'Operational support' },
    eyebrow: { es: 'Operación 01', en: 'Operations 01' },
    description: {
      es: 'Acompañamos el funcionamiento diario para que el edificio no dependa de esfuerzo heroico.',
      en: 'We support day-to-day operations so the building does not depend on heroic effort.',
    },
    outcome: {
      es: 'Continuidad y respuesta operativa.',
      en: 'Continuity and operational response.',
    },
    href: { es: '/es/servicios/data-operations', en: '/en/services/data-operations' },
    visual: { x: '54%', y: '12%', width: '15%', height: '30%', z: 6 },
  },
  {
    id: 'automation-monitoring',
    step: 'operations',
    title: { es: 'Automatización y monitoreo', en: 'Automation and monitoring' },
    eyebrow: { es: 'Operación 02', en: 'Operations 02' },
    description: {
      es: 'Automatizamos tareas críticas y monitoreamos desempeño para que la solución escale sin fricción.',
      en: 'We automate critical tasks and monitor performance so the solution scales without friction.',
    },
    outcome: {
      es: 'Menos fricción y más velocidad operativa.',
      en: 'Less friction and more operational speed.',
    },
    href: { es: '/es/servicios/data-operations', en: '/en/services/data-operations' },
    visual: { x: '40%', y: '4%', width: '12%', height: '14%', z: 7 },
  },
  {
    id: 'continuous-optimization',
    step: 'operations',
    title: { es: 'Optimización continua', en: 'Continuous optimization' },
    eyebrow: { es: 'Operación 03', en: 'Operations 03' },
    description: {
      es: 'Medimos, ajustamos y dejamos una ruta clara para que la operación siga creciendo con control.',
      en: 'We measure, refine and leave a clear path so operations keep growing with control.',
    },
    outcome: {
      es: 'Un edificio listo para evolucionar.',
      en: 'A building ready to evolve.',
    },
    href: { es: '/es/servicios/data-operations', en: '/en/services/data-operations' },
    visual: { x: '69%', y: '7%', width: '12%', height: '16%', z: 7 },
  },
];

const journeySteps = {
  foundation: {
    es: {
      step: 'Paso 1',
      title: 'Alineamos la base del valor',
      description:
        'Empezamos por la base que hace viable todo lo demás: estrategia, gobierno, calidad y la arquitectura necesaria para avanzar con criterio.',
      summary: 'Aquí conectamos negocio, gobierno y capacidad técnica para construir sobre terreno firme.',
      defaultNodeId: 'data-strategy',
    },
    en: {
      step: 'Step 1',
      title: 'We align the value foundation',
      description:
        'We start with the base that makes everything else viable: strategy, governance, quality, and the architecture required to move forward with clarity.',
      summary: 'This is where business priorities, governance, and technical capability come together on solid ground.',
      defaultNodeId: 'data-strategy',
    },
  },
  structure: {
    es: {
      step: 'Paso 2',
      title: 'Le damos estructura a la plataforma',
      description:
        'Sobre esa base definimos arquitectura, integración y consumo analítico para que la plataforma tenga forma y propósito.',
      summary: 'Aquí el edificio deja de ser idea y empieza a volverse una estructura utilizable.',
      defaultNodeId: 'data-architecture',
    },
    en: {
      step: 'Step 2',
      title: 'We give the platform its structure',
      description:
        'On top of that base, we define architecture, integration and analytics consumption so the platform has shape and purpose.',
      summary: 'This is where the building stops being an idea and starts becoming usable structure.',
      defaultNodeId: 'data-architecture',
    },
  },
  enablement: {
    es: {
      step: 'Paso 3',
      title: 'Habilitamos el entorno para operar',
      description:
        'Con la estructura definida, activamos plataforma, entorno cloud y capacidades base para que todo pueda correr con control.',
      summary: 'La solución ya tiene dónde vivir, escalar y conectarse con seguridad.',
      defaultNodeId: 'cloud-platforms',
    },
    en: {
      step: 'Step 3',
      title: 'We enable the environment to operate',
      description:
        'With the structure defined, we activate platform, cloud environment and core capabilities so everything can run with control.',
      summary: 'The solution now has a place to live, scale and connect securely.',
      defaultNodeId: 'cloud-platforms',
    },
  },
  operations: {
    es: {
      step: 'Paso 4',
      title: 'Llevamos el edificio a operación continua',
      description:
        'Finalmente estabilizamos, automatizamos y optimizamos la operación para que el valor siga creciendo sin perder control.',
      summary: 'El edificio no solo se construye: también se sostiene, se mide y evoluciona.',
      defaultNodeId: 'operational-support',
    },
    en: {
      step: 'Step 4',
      title: 'We take the building into continuous operation',
      description:
        'Finally, we stabilize, automate and optimize operations so value keeps growing without losing control.',
      summary: 'The building is not only built: it is also sustained, measured and evolved.',
      defaultNodeId: 'operational-support',
    },
  },
} as const;

const nodeLabelPositions: Record<string, string> = {
  'data-strategy': 'left-[2%] top-[66%]',
  'data-architecture': 'left-[6%] top-[46%]',
  'data-governance': 'left-[39%] top-[84%]',
  'data-quality': 'right-[2%] top-[66%]',
  'data-integration': 'left-[34%] top-[83%]',
  'applied-analytics': 'right-[4%] top-[45%]',
  'cloud-platforms': 'right-[6%] top-[24%]',
  'lakehouse-sharing': 'left-[6%] top-[10%]',
  'observability-security': 'right-[4%] top-[7%]',
  'operational-support': 'right-[5%] top-[10%]',
  'automation-monitoring': 'left-[4%] top-[8%]',
  'continuous-optimization': 'left-[70%] top-[6%]',
};

const nodeConnectorPaths: Record<string, string> = {
  'data-strategy': 'M26 85 H16 Q13 85 13 82 V74',
  'data-architecture': 'M38 60 H22 Q17 60 17 55 V49',
  'data-governance': 'M58 85 H56 Q54 85 54 84',
  'data-quality': 'M74 85 H84 Q87 85 87 82 V74',
  'data-integration': 'M60 62 H44 Q41 62 41 68 V83',
  'applied-analytics': 'M75 63 H82 Q86 63 86 57 V49',
  'cloud-platforms': 'M62 40 H79 Q84 40 84 34 V28',
  'lakehouse-sharing': 'M48 18 H21 Q16 18 16 15',
  'observability-security': 'M75 20 H82 Q86 20 86 16 V12',
  'operational-support': 'M60 27 H79 Q84 27 84 22 V16',
  'automation-monitoring': 'M44 12 H20 Q16 12 16 14',
  'continuous-optimization': 'M76 14 H79 Q82 14 82 12',
};

interface DataBlueprintJourneyProps {
  language: 'es' | 'en';
}

export function DataBlueprintJourney({ language }: DataBlueprintJourneyProps) {
  const { isDark } = useTheme();
  const [activeStep, setActiveStep] = useState<JourneyStepId>('foundation');
  const [activeNodeId, setActiveNodeId] = useState(journeySteps.foundation[language].defaultNodeId);

  useEffect(() => {
    setActiveNodeId(journeySteps[activeStep][language].defaultNodeId);
  }, [activeStep, language]);

  const stepTheme = {
    foundation: {
      accent: isDark ? 'text-cyan-300' : 'text-cyan-700',
      panel: isDark ? 'border-cyan-300/30 bg-cyan-300/14 text-cyan-50' : 'border-cyan-700/15 bg-cyan-500/10 text-cyan-950',
      edge: isDark ? 'rgba(125,211,252,0.92)' : 'rgba(14,165,233,0.68)',
      line: isDark ? 'rgba(34,211,238,0.5)' : 'rgba(8,145,178,0.24)',
      glow: isDark ? 'rgba(103,232,249,1)' : 'rgba(8,145,178,0.9)',
      node: isDark
        ? 'linear-gradient(180deg, rgba(34,211,238,0.28) 0%, rgba(14,165,233,0.18) 100%)'
        : 'linear-gradient(180deg, rgba(220,245,255,0.85) 0%, rgba(238,247,255,0.48) 100%)',
      muted: 'rgba(148,163,184,0.18)',
    },
    structure: {
      accent: isDark ? 'text-blue-300' : 'text-blue-700',
      panel: isDark ? 'border-blue-300/30 bg-blue-300/14 text-blue-50' : 'border-blue-700/15 bg-blue-500/10 text-blue-950',
      edge: isDark ? 'rgba(147,197,253,0.94)' : 'rgba(37,99,235,0.68)',
      line: isDark ? 'rgba(96,165,250,0.5)' : 'rgba(37,99,235,0.24)',
      glow: isDark ? 'rgba(191,219,254,1)' : 'rgba(29,78,216,0.9)',
      node: isDark
        ? 'linear-gradient(180deg, rgba(96,165,250,0.28) 0%, rgba(37,99,235,0.18) 100%)'
        : 'linear-gradient(180deg, rgba(219,234,254,0.82) 0%, rgba(239,246,255,0.48) 100%)',
      muted: 'rgba(148,163,184,0.18)',
    },
    enablement: {
      accent: isDark ? 'text-violet-300' : 'text-violet-700',
      panel: isDark ? 'border-violet-300/30 bg-violet-300/14 text-violet-50' : 'border-violet-700/15 bg-violet-500/10 text-violet-950',
      edge: isDark ? 'rgba(196,181,253,0.94)' : 'rgba(124,58,237,0.68)',
      line: isDark ? 'rgba(167,139,250,0.5)' : 'rgba(124,58,237,0.22)',
      glow: isDark ? 'rgba(221,214,254,1)' : 'rgba(109,40,217,0.88)',
      node: isDark
        ? 'linear-gradient(180deg, rgba(244,114,182,0.28) 0%, rgba(217,70,239,0.18) 100%)'
        : 'linear-gradient(180deg, rgba(237,233,254,0.86) 0%, rgba(250,245,255,0.5) 100%)',
      muted: 'rgba(148,163,184,0.18)',
    },
    operations: {
      accent: isDark ? 'text-fuchsia-300' : 'text-fuchsia-700',
      panel: isDark ? 'border-fuchsia-300/30 bg-fuchsia-300/14 text-fuchsia-50' : 'border-fuchsia-700/15 bg-fuchsia-500/10 text-fuchsia-950',
      edge: isDark ? 'rgba(249,168,212,0.94)' : 'rgba(219,39,119,0.68)',
      line: isDark ? 'rgba(244,114,182,0.48)' : 'rgba(219,39,119,0.24)',
      glow: isDark ? 'rgba(251,207,232,1)' : 'rgba(190,24,93,0.9)',
      node: isDark
        ? 'linear-gradient(180deg, rgba(244,114,182,0.28) 0%, rgba(190,24,93,0.18) 100%)'
        : 'linear-gradient(180deg, rgba(252,231,243,0.86) 0%, rgba(255,241,242,0.5) 100%)',
      muted: 'rgba(148,163,184,0.18)',
    },
  }[activeStep];

  const activeNode = useMemo(
    () => journeyNodes.find((node) => node.id === activeNodeId) || journeyNodes[0],
    [activeNodeId]
  );
  const nodesForStep = useMemo(
    () => journeyNodes.filter((node) => node.step === activeStep),
    [activeStep]
  );

  const currentStep = journeySteps[activeStep][language];
  const titleClass = isDark ? 'text-white' : 'text-slate-950';
  const mutedClass = isDark ? 'text-slate-300' : 'text-slate-600';
  const shellClass = isDark
    ? 'border-white/10 bg-[linear-gradient(180deg,rgba(9,16,35,0.96)_0%,rgba(6,11,24,0.99)_100%)]'
    : 'border-slate-900/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,248,255,0.98)_100%)]';
  const mobileCardClass = isDark
    ? 'border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(7,12,24,0.92)_100%)] shadow-[0_18px_50px_rgba(2,6,23,0.36)]'
    : 'border-white/60 bg-white/50 shadow-[0_18px_50px_rgba(15,23,42,0.06)]';
  const mobileControlClass = isDark
    ? 'border-white/12 bg-white/[0.06] text-slate-100 hover:bg-white/[0.12]'
    : 'border-slate-200/80 bg-white/82 text-slate-700 hover:bg-white';
  const mobileStageClass = isDark
    ? 'border-white/10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_34%),rgba(15,23,42,0.6)] shadow-[0_18px_50px_rgba(2,6,23,0.32)]'
    : 'border-white/55 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_34%),rgba(255,255,255,0.44)] shadow-[0_18px_50px_rgba(15,23,42,0.06)]';
  const mobileStageInnerClass = isDark
    ? 'bg-[linear-gradient(180deg,rgba(15,23,42,0.6)_0%,rgba(2,6,23,0.2)_100%)]'
    : 'bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(248,250,252,0.18)_100%)]';
  const activeStepIndex = journeyStepOrder.indexOf(activeStep);
  const activeNodeStepIndex = Math.max(
    nodesForStep.findIndex((node) => node.id === activeNode.id),
    0
  );
  const towerBaseFill =
    activeStep === 'foundation'
      ? stepTheme.node
      : isDark
        ? 'linear-gradient(180deg, rgba(51,65,85,0.5) 0%, rgba(15,23,42,0.26) 100%)'
        : 'linear-gradient(180deg, rgba(226,232,240,0.38) 0%, rgba(226,232,240,0.12) 100%)';
  const structureFill =
    activeStep === 'structure'
      ? stepTheme.node
      : isDark
        ? 'linear-gradient(180deg, rgba(51,65,85,0.46) 0%, rgba(15,23,42,0.22) 100%)'
        : 'linear-gradient(180deg, rgba(226,232,240,0.34) 0%, rgba(226,232,240,0.1) 100%)';
  const enablementFill =
    activeStep === 'enablement'
      ? stepTheme.node
      : isDark
        ? 'linear-gradient(180deg, rgba(51,65,85,0.52) 0%, rgba(15,23,42,0.22) 100%)'
        : 'linear-gradient(180deg, rgba(226,232,240,0.42) 0%, rgba(226,232,240,0.12) 100%)';
  const operationsFill =
    activeStep === 'operations'
      ? stepTheme.node
      : isDark
        ? 'linear-gradient(180deg, rgba(51,65,85,0.44) 0%, rgba(15,23,42,0.18) 100%)'
        : 'linear-gradient(180deg, rgba(241,245,249,0.42) 0%, rgba(226,232,240,0.12) 100%)';
  const towerGlow = activeStep === 'operations' ? `0 0 28px ${stepTheme.line}` : 'none';
  const foundationGlow = activeStep === 'foundation' ? `0 0 24px ${stepTheme.line}` : 'none';

  return (
    <section className="relative px-6 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className={`relative rounded-[36px] border p-6 shadow-[0_28px_80px_rgba(8,18,38,0.12)] sm:p-8 lg:px-8 lg:pb-7 lg:pt-[104px] ${shellClass}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <div className="lg:hidden">
            <div className={`rounded-[28px] border p-4 backdrop-blur-xl ${mobileCardClass}`}>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveStep(journeyStepOrder[Math.max(activeStepIndex - 1, 0)])}
                  disabled={activeStepIndex === 0}
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${mobileControlClass}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0 flex-1 px-2">
                  <p className={`text-center text-[11px] font-medium uppercase tracking-[0.22em] ${stepTheme.accent}`}>
                    {currentStep.step}
                  </p>
                  <p className={`mt-1 text-center text-[13px] font-medium leading-5 tracking-[-0.02em] ${titleClass}`}>
                    {currentStep.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveStep(journeyStepOrder[Math.min(activeStepIndex + 1, journeyStepOrder.length - 1)])
                  }
                  disabled={activeStepIndex === journeyStepOrder.length - 1}
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${mobileControlClass}`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <h2 className={`mt-4 max-w-[10ch] text-[clamp(1.7rem,7vw,2.8rem)] font-light leading-[0.92] tracking-[-0.055em] ${titleClass}`}>
                {language === 'es' ? 'Arquitectura del valor en datos' : 'The architecture of data value'}
              </h2>

              <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>
                {currentStep.description}
              </p>

              <div className={`mt-5 overflow-hidden rounded-[30px] border p-4 backdrop-blur-xl ${mobileStageClass}`}>
                <div className={`relative h-[250px] rounded-[22px] ${mobileStageInnerClass}`}>
                  <div
                    className={`absolute left-1/2 top-[74%] h-[16%] w-[82%] -translate-x-1/2 rounded-[50%] blur-2xl ${isDark ? 'bg-cyan-300/10' : 'bg-sky-200/40'}`}
                  />
                  <div
                    className="absolute left-1/2 top-[9%] h-[4%] w-[24%] -translate-x-1/2 rounded-full"
                    style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.72)' }}
                  />
                  <div
                    className={`absolute left-1/2 top-[15%] h-[50%] w-[30%] -translate-x-1/2 rounded-[2rem] border ${isDark ? 'shadow-[inset_-8px_0_18px_rgba(15,23,42,0.34),inset_8px_0_20px_rgba(255,255,255,0.05)]' : 'shadow-[inset_-8px_0_18px_rgba(148,163,184,0.18),inset_8px_0_20px_rgba(255,255,255,0.42)]'}`}
                    style={{
                      borderColor: activeStep === 'operations' ? stepTheme.edge : 'rgba(148,163,184,0.26)',
                      background: operationsFill,
                      boxShadow: towerGlow,
                    }}
                  />
                  <div
                    className={`absolute left-[24%] top-[32%] h-[28%] w-[14%] rounded-[1.1rem] border ${isDark ? 'shadow-[inset_-6px_0_14px_rgba(15,23,42,0.28)]' : 'shadow-[inset_-6px_0_14px_rgba(148,163,184,0.16)]'}`}
                    style={{
                      borderColor: activeStep === 'structure' ? stepTheme.edge : 'rgba(148,163,184,0.26)',
                      background: structureFill,
                    }}
                  />
                  <div
                    className={`absolute right-[24%] top-[36%] h-[24%] w-[13%] rounded-[1rem] border ${isDark ? 'shadow-[inset_6px_0_14px_rgba(15,23,42,0.28)]' : 'shadow-[inset_6px_0_14px_rgba(148,163,184,0.16)]'}`}
                    style={{
                      borderColor: activeStep === 'structure' ? stepTheme.edge : 'rgba(148,163,184,0.26)',
                      background: structureFill,
                    }}
                  />
                  <div
                    className="absolute left-1/2 top-[6%] h-[11%] w-[18%] -translate-x-1/2 rounded-[1rem] border"
                    style={{
                      borderColor: activeStep === 'enablement' ? stepTheme.edge : stepTheme.line,
                      background: enablementFill,
                    }}
                  />
                  <div
                    className={`absolute left-[12%] top-[67%] h-[13%] w-[76%] rounded-[1.4rem] border ${isDark ? 'shadow-[inset_0_-10px_18px_rgba(2,6,23,0.28)]' : 'shadow-[inset_0_-10px_18px_rgba(148,163,184,0.14)]'}`}
                    style={{
                      borderColor: activeStep === 'foundation' ? stepTheme.edge : 'rgba(148,163,184,0.24)',
                      background: towerBaseFill,
                      boxShadow: foundationGlow,
                    }}
                  />
                  <div
                    className={`absolute left-[17%] top-[61%] h-[7%] w-[66%] rounded-[1rem] border ${isDark ? 'border-white/8 bg-white/[0.03]' : 'border-slate-200/45 bg-white/22'}`}
                  />
                  <div
                    className={`absolute left-[18%] top-[61%] h-[7%] w-[64%] rounded-[1rem] border ${isDark ? 'border-white/10 bg-white/[0.05]' : 'border-slate-200/50 bg-white/15'}`}
                  />
                  <div
                    className={`absolute left-[24%] top-[80%] h-[6%] w-[52%] rounded-[1rem] border ${isDark ? 'border-white/10 bg-white/[0.05]' : 'border-slate-200/50 bg-white/18'}`}
                  />
                  <div
                    className={`absolute left-[18%] top-[68.5%] h-[2.4%] w-[64%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/44'}`}
                  />
                  <div
                    className={`absolute left-1/2 top-[20%] h-[42%] w-[12%] -translate-x-1/2 rounded-[1.4rem] ${isDark ? 'bg-white/[0.04]' : 'bg-white/30'}`}
                  />
                  <div
                    className={`absolute left-[30%] top-[36%] h-[15%] w-[4%] rounded-full ${isDark ? 'bg-white/10' : 'bg-white/26'}`}
                  />
                  <div
                    className={`absolute right-[30%] top-[39%] h-[12%] w-[4%] rounded-full ${isDark ? 'bg-white/8' : 'bg-white/26'}`}
                  />
                  <div className={`absolute left-1/2 top-[18%] h-[44%] w-[2.6%] -translate-x-[260%] rounded-full ${isDark ? 'bg-white/18 opacity-70' : 'bg-white/30 opacity-45'}`} />
                  <div className={`absolute left-1/2 top-[18%] h-[44%] w-[2.6%] -translate-x-[50%] rounded-full ${isDark ? 'bg-white/22 opacity-80' : 'bg-white/35 opacity-55'}`} />
                  <div className={`absolute left-1/2 top-[18%] h-[44%] w-[2.6%] translate-x-[160%] rounded-full ${isDark ? 'bg-white/18 opacity-70' : 'bg-white/30 opacity-45'}`} />
                  <div className={`absolute left-[24%] top-[69%] h-[10%] w-[7%] rounded-[0.7rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-4px_0_10px_rgba(2,6,23,0.24)]' : 'border-slate-200/40 bg-white/30 shadow-[inset_-4px_0_10px_rgba(148,163,184,0.12)]'}`} />
                  <div className={`absolute left-[38%] top-[69%] h-[10%] w-[7%] rounded-[0.7rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-4px_0_10px_rgba(2,6,23,0.24)]' : 'border-slate-200/40 bg-white/30 shadow-[inset_-4px_0_10px_rgba(148,163,184,0.12)]'}`} />
                  <div className={`absolute left-[52%] top-[69%] h-[10%] w-[7%] rounded-[0.7rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-4px_0_10px_rgba(2,6,23,0.24)]' : 'border-slate-200/40 bg-white/30 shadow-[inset_-4px_0_10px_rgba(148,163,184,0.12)]'}`} />
                  <div className={`absolute left-[66%] top-[69%] h-[10%] w-[7%] rounded-[0.7rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-4px_0_10px_rgba(2,6,23,0.24)]' : 'border-slate-200/40 bg-white/30 shadow-[inset_-4px_0_10px_rgba(148,163,184,0.12)]'}`} />
                  <div className={`absolute left-[23%] top-[68%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/48'}`} />
                  <div className={`absolute left-[37%] top-[68%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/48'}`} />
                  <div className={`absolute left-[51%] top-[68%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/48'}`} />
                  <div className={`absolute left-[65%] top-[68%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/48'}`} />
                  <div className={`absolute left-[23%] top-[79.2%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />
                  <div className={`absolute left-[37%] top-[79.2%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />
                  <div className={`absolute left-[51%] top-[79.2%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />
                  <div className={`absolute left-[65%] top-[79.2%] h-[1.8%] w-[9%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />

                  {journeyNodes.map((node) => {
                    const isCurrent = node.id === activeNode.id;
                    const isVisible = node.step === activeStep;

                    return (
                      <motion.div
                        key={`${node.id}-mobile`}
                        className="absolute rounded-[0.9rem] border"
                        animate={{
                          opacity: isVisible ? (isCurrent ? 1 : 0.62) : isDark ? 0.18 : 0.12,
                          scale: isCurrent ? [1, 1.035, 1] : 1,
                          y: isCurrent ? [0, -2, 0] : 0,
                        }}
                        transition={{ duration: isCurrent ? 2.4 : 0.22, repeat: isCurrent ? Number.POSITIVE_INFINITY : 0, ease: 'easeInOut' }}
                        style={{
                          left: node.visual.x,
                          top: node.visual.y,
                          width: node.visual.width,
                          height: node.visual.height,
                          zIndex: node.visual.z,
                          borderColor: isCurrent ? stepTheme.edge : isVisible ? stepTheme.line : stepTheme.muted,
                          background: isCurrent
                            ? stepTheme.node
                            : isVisible
                              ? 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(241,245,249,0.12) 100%)'
                              : 'linear-gradient(180deg, rgba(226,232,240,0.16) 0%, rgba(226,232,240,0.05) 100%)',
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <p className={`mb-3 text-[11px] font-medium uppercase tracking-[0.24em] ${stepTheme.accent}`}>
                  {language === 'es' ? 'Capas activas de este paso' : 'Active layers in this step'}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveNodeId(nodesForStep[Math.max(activeNodeStepIndex - 1, 0)].id)}
                    disabled={activeNodeStepIndex === 0}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${mobileControlClass}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveNodeId(activeNode.id)}
                    className={`min-w-0 flex-1 rounded-[18px] border px-4 py-3 text-center text-sm font-medium transition-all duration-300 ${stepTheme.panel}`}
                  >
                    {activeNode.title[language]}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveNodeId(nodesForStep[Math.min(activeNodeStepIndex + 1, nodesForStep.length - 1)].id)
                    }
                    disabled={activeNodeStepIndex === nodesForStep.length - 1}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-35 ${mobileControlClass}`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className={`mt-5 rounded-[24px] border p-4 ${stepTheme.panel}`}>
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${stepTheme.panel}`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {activeNode.eyebrow[language]}
                </div>
                <p className={`mt-3 text-[13px] font-medium uppercase tracking-[0.22em] ${stepTheme.accent}`}>
                  {language === 'es' ? 'Bloque protagonista' : 'Featured block'}
                </p>
                <p className={`mt-2 text-xl font-light leading-tight tracking-[-0.03em] ${titleClass}`}>
                  {activeNode.title[language]}
                </p>
                <div className="mt-3 flex min-h-[248px] flex-col">
                  <p className={`text-sm leading-7 ${mutedClass}`}>
                    {activeNode.description[language]}
                  </p>
                  <div className="mt-4 rounded-[18px] border border-white/40 bg-white/45 px-4 py-3">
                    <p className={`text-[11px] font-medium uppercase tracking-[0.22em] ${stepTheme.accent}`}>
                      {language === 'es' ? 'Resultado esperado' : 'Expected outcome'}
                    </p>
                    <p className={`mt-2 text-sm leading-6 ${titleClass}`}>
                      {activeNode.outcome[language]}
                    </p>
                  </div>
                  <a
                    href={activeNode.href[language]}
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-[0_16px_34px_rgba(2,6,23,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_rgba(2,6,23,0.28)]"
                  >
                    <span>{language === 'es' ? 'Ver servicio' : 'View service'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-0 hidden overflow-hidden rounded-t-[36px] lg:block">
            <div className={`grid w-full grid-cols-4 border-b ${isDark ? 'border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(8,14,28,0.9)_100%)]' : 'border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(246,249,255,0.88)_100%)]'}`}>
            {journeyStepOrder.map((step) => {
              const isActive = step === activeStep;
              const stepCopy = journeySteps[step][language];
              const isFirst = step === journeyStepOrder[0];
              const isLast = step === journeyStepOrder[journeyStepOrder.length - 1];

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(step)}
                  className={`group relative min-h-[92px] border-b px-6 pb-4 pt-4 text-left text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? `${stepTheme.panel} border-b-transparent shadow-[0_18px_38px_rgba(15,23,42,0.08)]`
                      : isDark
                        ? 'border-white/10 bg-white/[0.03] text-slate-200'
                        : 'border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.85)_0%,rgba(244,247,252,0.82)_100%)] text-slate-700'
                  } ${isFirst ? 'rounded-tl-[36px]' : ''} ${isLast ? 'rounded-tr-[36px]' : ''}`}
                  style={{
                    borderRightWidth: step === journeyStepOrder[journeyStepOrder.length - 1] ? '0px' : '1px',
                  }}
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-[3px] transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                    style={{ background: stepTheme.glow }}
                  />
                  <span className="block text-[11px] uppercase tracking-[0.22em] opacity-70">
                    {stepCopy.step}
                  </span>
                  <span className="mt-1.5 block text-[15px] font-medium tracking-[-0.02em]">
                    {stepCopy.title}
                  </span>
                </button>
              );
            })}
            </div>
          </div>

          <div className="mt-4 hidden items-start gap-5 xl:grid xl:grid-cols-[minmax(0,0.88fr)_minmax(0,0.96fr)_300px]">
            <div className={`rounded-[28px] border p-5 backdrop-blur-xl ${isDark ? 'border-white/10 bg-white/[0.04]' : 'border-white/40 bg-white/55'}`}>
              <p className={`text-xs font-medium uppercase tracking-[0.26em] ${stepTheme.accent}`}>
                {currentStep.step}
              </p>
              <h2 className={`mt-3 text-[clamp(1.25rem,2vw,2.2rem)] font-light leading-[0.98] tracking-[-0.05em] ${titleClass}`}>
                {language === 'es' ? 'Arquitectura del valor en datos' : 'The architecture of data value'}
              </h2>

              <div className="mt-6">
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${stepTheme.panel}`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {activeNode.eyebrow[language]}
                </div>
                <h3 className={`mt-4 text-[clamp(1.1rem,1.8vw,1.65rem)] font-light leading-[1.02] tracking-[-0.035em] ${titleClass}`}>
                  {currentStep.title}
                </h3>
                <p className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${mutedClass}`}>
                  {currentStep.description}
                </p>

              </div>
            </div>

            <div className={`relative overflow-hidden rounded-[28px] border p-4 sm:p-5 xl:min-h-[480px] ${shellClass}`}>
              <div
                className="absolute inset-0"
                style={{
                  background: isDark
                    ? 'radial-gradient(circle at 50% 18%, rgba(34,211,238,0.14), transparent 28%), radial-gradient(circle at 12% 84%, rgba(217,70,239,0.12), transparent 24%), radial-gradient(circle at 86% 72%, rgba(14,165,233,0.08), transparent 20%)'
                  : 'radial-gradient(circle at 50% 18%, rgba(14,165,233,0.12), transparent 28%), radial-gradient(circle at 12% 84%, rgba(217,70,239,0.08), transparent 24%), radial-gradient(circle at 86% 72%, rgba(14,165,233,0.08), transparent 20%)',
                }}
              />

              <div className="relative z-[2]">
                <p className={`text-xs font-medium uppercase tracking-[0.24em] ${stepTheme.accent}`}>
                  {language === 'es' ? 'Capas activas en este paso' : 'Active layers in this step'}
                </p>
                <div className="mt-3 flex w-full flex-wrap gap-2">
                  {nodesForStep.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      className={`min-h-[3rem] rounded-full border px-4 py-2 text-sm leading-tight transition-all duration-300 hover:-translate-y-0.5 ${
                        node.id === activeNode.id
                          ? `${stepTheme.panel}`
                          : isDark
                            ? 'border-white/10 bg-white/[0.03] text-slate-200'
                            : 'border-slate-900/10 bg-white/70 text-slate-800'
                      }`}
                    >
                      {node.title[language]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mt-5 h-[410px]">
                <div
                  className={`absolute left-1/2 top-[76%] h-[17%] w-[86%] -translate-x-1/2 rounded-[50%] blur-3xl ${isDark ? 'bg-cyan-300/10' : 'bg-sky-200/45'}`}
                />
                <div
                  className="absolute left-1/2 top-[7%] h-[3.5%] w-[19%] -translate-x-1/2 rounded-full"
                  style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.74)' }}
                />
                <div
                  className={`absolute left-1/2 top-[12%] h-[61%] w-[28%] -translate-x-1/2 rounded-[2.2rem] border ${isDark ? 'shadow-[inset_-12px_0_22px_rgba(2,6,23,0.34),inset_12px_0_22px_rgba(255,255,255,0.04)]' : 'shadow-[inset_-12px_0_22px_rgba(148,163,184,0.16),inset_12px_0_22px_rgba(255,255,255,0.42)]'}`}
                  style={{
                    borderColor: activeStep === 'operations' ? stepTheme.edge : 'rgba(148,163,184,0.26)',
                    background: operationsFill,
                    boxShadow: towerGlow,
                  }}
                />
                <div
                  className={`absolute left-[23%] top-[30%] h-[34%] w-[13%] rounded-[1.4rem] border ${isDark ? 'shadow-[inset_-10px_0_18px_rgba(2,6,23,0.3)]' : 'shadow-[inset_-10px_0_18px_rgba(148,163,184,0.16)]'}`}
                  style={{
                    borderColor: activeStep === 'structure' ? stepTheme.edge : 'rgba(148,163,184,0.26)',
                    background: structureFill,
                  }}
                />
                <div
                  className={`absolute right-[23%] top-[34%] h-[30%] w-[12.5%] rounded-[1.35rem] border ${isDark ? 'shadow-[inset_10px_0_18px_rgba(2,6,23,0.3)]' : 'shadow-[inset_10px_0_18px_rgba(148,163,184,0.16)]'}`}
                  style={{
                    borderColor: activeStep === 'structure' ? stepTheme.edge : 'rgba(148,163,184,0.26)',
                    background: structureFill,
                  }}
                />
                <div
                  className="absolute left-1/2 top-[3%] h-[11%] w-[14%] -translate-x-1/2 rounded-[1rem] border"
                  style={{ borderColor: activeStep === 'enablement' ? stepTheme.edge : stepTheme.line, background: enablementFill }}
                />
                <div
                  className={`absolute left-[14%] top-[81%] h-[15%] w-[72%] rounded-[1.9rem] border ${isDark ? 'shadow-[inset_0_-14px_24px_rgba(2,6,23,0.32)]' : 'shadow-[inset_0_-14px_24px_rgba(148,163,184,0.14)]'}`}
                  style={{
                    borderColor: activeStep === 'foundation' ? stepTheme.edge : 'rgba(148,163,184,0.24)',
                    background: towerBaseFill,
                    boxShadow: foundationGlow,
                  }}
                />
                <div className={`absolute left-[18%] top-[61%] h-[7%] w-[64%] rounded-[1rem] border ${isDark ? 'border-white/6 bg-white/[0.03]' : 'border-slate-200/30 bg-white/18'}`} />
                <div className={`absolute left-[21%] top-[66%] h-[8%] w-[58%] rounded-[1.15rem] border ${isDark ? 'border-white/12 bg-white/[0.05]' : 'border-slate-200/40 bg-white/12'}`} />
                <div className={`absolute left-[26%] top-[73%] h-[6%] w-[48%] rounded-[1rem] border ${isDark ? 'border-white/12 bg-white/[0.05]' : 'border-slate-200/40 bg-white/10'}`} />
                <div className={`absolute left-[18%] top-[82.5%] h-[2.2%] w-[64%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/48'}`} />
                <div className={`absolute left-[35.5%] top-[18%] h-[48%] w-[5.5%] rounded-[1.2rem] ${isDark ? 'bg-white/[0.05]' : 'bg-white/22'}`} />
                <div className={`absolute left-[46.8%] top-[16%] h-[52%] w-[6.4%] rounded-[1.4rem] ${isDark ? 'bg-white/[0.08]' : 'bg-white/36'}`} />
                <div className={`absolute left-[58.2%] top-[18%] h-[48%] w-[5.5%] rounded-[1.2rem] ${isDark ? 'bg-white/[0.05]' : 'bg-white/22'}`} />
                <div className={`absolute left-1/2 top-[18%] h-[48%] w-[2.4%] -translate-x-[260%] rounded-full ${isDark ? 'bg-white/18 opacity-70' : 'bg-white/30 opacity-45'}`} />
                <div className={`absolute left-1/2 top-[18%] h-[48%] w-[2.4%] -translate-x-[50%] rounded-full ${isDark ? 'bg-white/22 opacity-80' : 'bg-white/35 opacity-55'}`} />
                <div className={`absolute left-1/2 top-[18%] h-[48%] w-[2.4%] translate-x-[160%] rounded-full ${isDark ? 'bg-white/18 opacity-70' : 'bg-white/30 opacity-45'}`} />
                <div className={`absolute left-1/2 top-[74%] h-[7%] w-[36%] -translate-x-1/2 rounded-[1.4rem] border ${isDark ? 'border-white/12 bg-white/[0.05]' : 'border-slate-200/40 bg-white/10'}`} />
                <div className={`absolute left-[21.5%] top-[83.8%] h-[9%] w-[10%] rounded-[0.95rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-6px_0_12px_rgba(2,6,23,0.24)]' : 'border-slate-200/45 bg-white/32 shadow-[inset_-6px_0_12px_rgba(148,163,184,0.12)]'}`} />
                <div className={`absolute left-[34.5%] top-[83.8%] h-[9%] w-[10%] rounded-[0.95rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-6px_0_12px_rgba(2,6,23,0.24)]' : 'border-slate-200/45 bg-white/32 shadow-[inset_-6px_0_12px_rgba(148,163,184,0.12)]'}`} />
                <div className={`absolute left-[47.5%] top-[83.8%] h-[9%] w-[10%] rounded-[0.95rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-6px_0_12px_rgba(2,6,23,0.24)]' : 'border-slate-200/45 bg-white/32 shadow-[inset_-6px_0_12px_rgba(148,163,184,0.12)]'}`} />
                <div className={`absolute left-[60.5%] top-[83.8%] h-[9%] w-[10%] rounded-[0.95rem] border ${isDark ? 'border-white/10 bg-white/[0.04] shadow-[inset_-6px_0_12px_rgba(2,6,23,0.24)]' : 'border-slate-200/45 bg-white/32 shadow-[inset_-6px_0_12px_rgba(148,163,184,0.12)]'}`} />
                <div className={`absolute left-[20.8%] top-[82.8%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/50'}`} />
                <div className={`absolute left-[33.8%] top-[82.8%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/50'}`} />
                <div className={`absolute left-[46.8%] top-[82.8%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/50'}`} />
                <div className={`absolute left-[59.8%] top-[82.8%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.08]' : 'bg-white/50'}`} />
                <div className={`absolute left-[20.8%] top-[92.9%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />
                <div className={`absolute left-[33.8%] top-[92.9%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />
                <div className={`absolute left-[46.8%] top-[92.9%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />
                <div className={`absolute left-[59.8%] top-[92.9%] h-[1.8%] w-[11.4%] rounded-full ${isDark ? 'bg-white/[0.07]' : 'bg-slate-100/80'}`} />

                {journeyNodes.map((node) => {
                  const isCurrent = node.id === activeNode.id;
                  const isVisible = true;
                  const isInActiveLayer = node.step === activeStep;

                  return (
                    <motion.div
                      key={node.id}
                      className="absolute rounded-[1rem] border"
                      animate={{
                        opacity: isCurrent ? 1 : isInActiveLayer ? (isDark ? 0.82 : 0.74) : isDark ? 0.2 : 0.16,
                        scale: isCurrent ? [1, 1.045, 1] : 1,
                        y: isCurrent ? [0, -5, 0] : 0,
                      }}
                      transition={{ duration: isCurrent ? 2.4 : 0.28, repeat: isCurrent ? Number.POSITIVE_INFINITY : 0, ease: 'easeInOut' }}
                      style={{
                        left: node.visual.x,
                        top: node.visual.y,
                        width: node.visual.width,
                        height: node.visual.height,
                        zIndex: node.visual.z,
                        borderColor: isCurrent ? stepTheme.edge : isInActiveLayer ? stepTheme.line : 'rgba(148,163,184,0.12)',
                        background: isCurrent
                          ? stepTheme.node
                          : isInActiveLayer
                            ? 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(241,245,249,0.1) 100%)'
                            : 'linear-gradient(180deg, rgba(226,232,240,0.08) 0%, rgba(226,232,240,0.02) 100%)',
                        boxShadow: isCurrent ? `0 0 24px ${stepTheme.glow}` : isInActiveLayer && isDark ? `0 0 10px ${stepTheme.line}` : 'none',
                      }}
                    />
                  );
                })}

                <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {journeyNodes.map((node) => {
                    const isCurrent = node.id === activeNode.id;
                    const isInActiveLayer = node.step === activeStep;

                    return (
                      <g key={`${node.id}-connector`}>
                        <path
                          d={nodeConnectorPaths[node.id]}
                          fill="none"
                          stroke={isInActiveLayer ? stepTheme.line : 'rgba(148,163,184,0.12)'}
                          strokeWidth="0.32"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={isInActiveLayer ? (isDark ? 0.78 : 0.58) : isDark ? 0.28 : 0.22}
                        />
                        <motion.path
                          d={nodeConnectorPaths[node.id]}
                          fill="none"
                          stroke={isCurrent ? stepTheme.glow : stepTheme.edge}
                          strokeWidth="0.56"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          animate={{
                            opacity: isCurrent ? [0.45, 1, 0.45] : 0,
                            pathLength: isCurrent ? [0.18, 1, 0.18] : 0,
                          }}
                          transition={{ duration: isCurrent ? 2.8 : 0.35, repeat: isCurrent ? Number.POSITIVE_INFINITY : 0, ease: 'easeInOut' }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {nodesForStep.map((node) => {
                  const isCurrent = node.id === activeNode.id;
                  const isInActiveLayer = true;

                  return (
                    <button
                      key={`${node.id}-label`}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      className={`absolute z-20 max-w-[138px] text-left ${nodeLabelPositions[node.id]}`}
                    >
                      <div
                          className="rounded-[16px] border px-3 py-2 shadow-[0_12px_28px_rgba(2,8,23,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                        style={{
                          borderColor: isCurrent ? stepTheme.edge : isInActiveLayer ? (isDark ? 'rgba(226,232,240,0.24)' : 'rgba(148,163,184,0.44)') : 'rgba(203,213,225,0.5)',
                          background: isDark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
                          boxShadow: isCurrent ? `0 0 18px ${stepTheme.line}` : isDark ? '0 12px 28px rgba(2,8,23,0.35)' : '0 12px 28px rgba(2,8,23,0.12)',
                        }}
                      >
                        <span className={`block text-[11px] font-medium leading-[1.3] tracking-[-0.01em] sm:text-[12px] ${isCurrent ? titleClass : isInActiveLayer ? (isDark ? 'text-slate-100' : 'text-slate-700') : mutedClass}`}>
                          {node.title[language]}
                        </span>
                      </div>
                      <div className="pointer-events-none ml-3 mt-1.5 flex items-end gap-1.5">
                        <div className="h-6 w-px" style={{ backgroundColor: isCurrent ? stepTheme.glow : isInActiveLayer ? stepTheme.line : 'rgba(148,163,184,0.22)' }} />
                        <motion.div
                          className="mb-0.5 h-2.5 w-2.5 rounded-full border"
                          animate={{ scale: isCurrent ? [1, 1.16, 1] : 1, opacity: isCurrent ? [0.7, 1, 0.7] : isInActiveLayer ? 0.7 : 0.35 }}
                          transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                          style={{
                            borderColor: isCurrent ? stepTheme.edge : isInActiveLayer ? stepTheme.line : 'rgba(148,163,184,0.28)',
                            backgroundColor: isCurrent ? stepTheme.glow : isInActiveLayer ? stepTheme.edge : 'rgba(148,163,184,0.18)',
                            boxShadow: isCurrent ? `0 0 14px ${stepTheme.glow}` : 'none',
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`rounded-[28px] border p-5 backdrop-blur-xl ${shellClass}`}>
              <p className={`text-xs font-medium uppercase tracking-[0.24em] ${stepTheme.accent}`}>
                {language === 'es' ? 'Bloque activo' : 'Active block'}
              </p>

              <div className="mt-4">
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] ${stepTheme.panel}`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {activeNode.eyebrow[language]}
                </div>
                <h3 className={`mt-3 text-[2rem] font-light leading-tight tracking-[-0.03em] ${titleClass}`}>
                  {activeNode.title[language]}
                </h3>
                <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>{activeNode.description[language]}</p>

                <div className={`mt-5 rounded-[24px] border p-4 ${stepTheme.panel}`}>
                  <p className={`text-xs font-medium uppercase tracking-[0.22em] ${stepTheme.accent}`}>
                    {language === 'es' ? 'Resultado' : 'Outcome'}
                  </p>
                  <p className={`mt-3 text-sm leading-7 ${titleClass}`}>{activeNode.outcome[language]}</p>
                </div>

                <a
                  href={activeNode.href[language]}
                  className={`group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[22px] px-6 py-4 text-sm font-medium shadow-[0_18px_38px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 ${isDark ? 'bg-white text-slate-950 hover:bg-slate-100' : 'bg-slate-950 text-white hover:bg-slate-900'}`}
                >
                  <span>{language === 'es' ? 'Explorar servicio' : 'Explore service'}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
