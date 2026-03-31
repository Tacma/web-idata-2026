Vamos a rediseñar completamente el Home público del sitio iData manteniendo la arquitectura existente, el sistema multi-idioma ES/EN, el motor de HomeSections y el CMS actual. No rompas rutas ni estructura.

Este rediseño debe convertir el Home en una página estratégica enfocada en evolución tecnológica, madurez analítica e innovación en IA. iData no es solo proveedor de servicios; es partner de transformación empresarial impulsada por datos.

REGLAS OBLIGATORIAS:
- No hardcodear contenido que ya es administrable.
- Si una sección es configurable desde HomeSections, debe mantenerse conectada al CMS.
- Si un contenido es editable (títulos, CTAs, cards), debe provenir del admin.
- Mantener soporte completo ES y EN.
- Todo debe ser responsive y mobile-first.
- Todo debe construirse con componentes reutilizables.

OBJETIVO DEL NUEVO HOME:
Comunicar:
1) Evolución en madurez tecnológica
2) Autoridad en IA y herramientas modernas
3) Capacidad integral end-to-end
4) Prueba social y credibilidad
5) Conversión clara

ESTRUCTURA DEL NUEVO HOME (orden estratégico)

1) HERO SECTION (sectionType: hero)
- H1 potente enfocado en evolución tecnológica y datos + IA
- Subtítulo estratégico
- CTA primario: hablar con experto
- CTA secundario: ver casos
- Campo administrable ES/EN
- Variante visual más premium (mejor jerarquía tipográfica, más aire, mejor contraste)
- Mantener como componente HeroSection reutilizable

2) BLOQUE DE AUTORIDAD (sectionType: logos)
- Logos de partners / certificaciones / clientes destacados
- Administrable desde colección (puede usar Testimonials o crear simple Logos collection si necesario)
- Layout horizontal responsive
- Reutilizable como AuthoritySection

3) BLOQUE “CAMINO DE MADUREZ” (sectionType: maturityJourney)
Crear nueva sección reusable:
- 3 niveles visuales:
   - Data Foundations
   - Advanced Analytics
   - AI-Driven Organization
- Cada nivel con título, descripción corta y opcional CTA
- Contenido editable desde HomeSections (payload configurable)
- Componente MaturityJourneySection
- Visual limpio pero con jerarquía fuerte

4) CAPACIDADES (sectionType: serviceHighlights)
- Mostrar categorías estratégicas (no solo lista genérica)
- Render desde Services + ServiceCategories
- Cards más robustas visualmente
- Mantener conexión al CMS

5) CASOS DE IMPACTO (sectionType: caseHighlights)
- Mostrar métricas grandes visibles (usar datos de CaseStudies)
- Destacar resultados numéricos
- Card variante “impact”
- Reutilizable

6) INSIGHTS DE VANGUARDIA (sectionType: insightsHighlights)
- Mostrar artículos relacionados con IA, modernización y tendencias
- Extraer desde BlogPosts
- Card editorial más limpia

7) CTA FINAL FUERTE (sectionType: ctaBand)
- Fondo contrastante
- Título potente
- CTA primario claro
- Administrable por idioma

REQUERIMIENTOS DE DISEÑO:
- Mantener identidad limpia y corporativa
- Más aire, más jerarquía tipográfica
- Mejor uso de espaciado vertical
- Reducir sensación de “bloque azul plano”
- Crear variantes de Section con background alternable (white, light gray, dark accent)
- Todo mobile-first

REQUERIMIENTOS TÉCNICOS:
- Cada sección debe ser un componente reutilizable dentro de public/components/sections
- No duplicar código entre ES y EN
- Home debe seguir renderizando dinámicamente desde HomeSections
- No romper SEOHead
- No romper rutas existentes
- Mantener consistencia con design system actual
- Si se crea nueva sectionType (maturityJourney), actualizar HomeSectionsAdmin para permitir seleccionarla y configurarla

NO cambiar arquitectura de carpetas.
NO romper /es y /en.
NO eliminar secciones existentes; evolucionarlas.

El resultado esperado es un Home estratégico de nivel consultora internacional, manteniendo el sistema dinámico y administrable.