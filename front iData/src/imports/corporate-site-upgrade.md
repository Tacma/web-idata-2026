Necesito que continúes sobre el proyecto existente (NO reestructures carpetas otra vez; ya están bien). Este paso es para convertir la base actual en un sitio corporativo top: motor de secciones completo, templates reales (list/detail), y SEO enterprise. Todo debe seguir funcionando en ES/EN con rutas /es y /en, y el Home ES y EN deben poder ser diferentes.

1) Completar el “Section Engine” del Home (obligatorio)
Actualmente el Home renderiza algunas secciones por idioma. Extiende el sistema para soportar estos sectionType, todos configurables desde HomeSections:
- hero
- serviceHighlights
- industryHighlights
- caseHighlights
- insightsHighlights
- testimonials
- logos
- ctaBand
- stats
- custom (render genérico)
Cada sección debe ser un componente reutilizable y responsive. Home debe renderizar secciones activas por idioma ordenadas por order.

HomeSections debe soportar referenciar contenido real:
- referencedIds (array) para seleccionar items (services, industries, caseStudies, blogPosts, testimonials)
- config opcional por sección (ej: cardsCount, layoutVariant, showCTA, etc)
Mantén el modelo simple pero extensible.

2) Crear templates reales para páginas públicas (reemplazar PlaceholderPage)
Reemplaza PlaceholderPage por páginas reales (list + detail) que consuman mockData (por ahora) y que estén listas para DB después.

Debes implementar al menos:
- IndustriesIndex + IndustryDetail
- CaseStudiesIndex + CaseStudyDetail
- InsightsIndex + InsightDetail
- CareersIndex + JobsIndex + JobDetail
- ResourcesIndex + ResourceDetail

Cada list debe tener:
- título y copy por idioma
- cards (reutilizables) con link a detail
- filtro simple (por category/tag cuando aplique)
- soporte “featured” y “order” cuando aplique

Cada detail debe tener:
- H1 correcto
- contenido completo desde mockData (es/en)
- “related” (servicios relacionados, casos relacionados, posts relacionados, etc.)
- CTA final consistente

3) SEO enterprise (obligatorio)
Mejora SEOHead y su uso en templates:
- title/description dinámicos desde seo_es/seo_en cuando existan
- canonical correcto y REAL (no debe quedar “:slug” en canonical; debe ser el slug actual)
- hreflang alternates ES/EN correctos
- OpenGraph image cuando exista
- BreadcrumbList schema en detail pages
- Schema por tipo:
  - Service page: Service schema (placeholder ok)
  - Blog post: Article schema
  - Job detail: JobPosting schema
  - Organization/WebSite schema a nivel global (layout)

4) CMS: Forms completos + UX pro para edición (obligatorio)
En /admin, mejora CollectionAdmin para que cada colección tenga formulario completo con:
- Tabs ES / EN (campos duplicados)
- Slug ES / Slug EN
- SEO ES (metaTitle, metaDescription, ogImage)
- SEO EN (metaTitle, metaDescription, ogImage)
- status draft/published
- featured, order, coverImage cuando aplique
- publishedAt cuando aplique (BlogPosts, Jobs)

HomeSectionsAdmin:
- permitir seleccionar referencedIds desde listas (multi-select)
- permitir reordenar (al menos con controles subir/bajar; si puedes drag&drop mejor)
- mantener “language” por registro (ES o EN) para que Home sea diferente por idioma
- botón “Preview” que abra el Home del idioma correspondiente

5) Design System base (sin cambiar branding final todavía)
Crea componentes shared reutilizables:
- Container / Section
- Button (primary/secondary/ghost)
- Card (variants)
- Badge
- Input / Select / Textarea
- RichText renderer básico (si content es string, renderizar con estilo)
Mantener estilo corporativo limpio, sin colores dominantes, con jerarquía tipográfica clara y espaciado consistente.
Todo responsive.

Importante: No cambies la arquitectura de rutas existente. No rompas /es y /en. No rompas /admin.
El objetivo es que el sitio ya “camine” con contenido real (mockData) y que el CMS quede usable y listo para conectar DB luego.