Necesito que tomes el proyecto actual y lo reestructures para cumplir exactamente con la arquitectura oficial del sitio iData y con el requerimiento clave: sitio público + Admin CMS en el MISMO proyecto, con multi-idioma real ES/EN y Home diferente por idioma.

Punto de partida: ya existe src/app con components, pages, routes.tsx, etc. NO destruyas todo; refactoriza ordenadamente.

1) Estructura de carpetas (obligatorio)
Reorganiza src/app para que exista una separación clara entre:
- Public Site (público)
- Admin CMS (administrador)

Ejemplo de estructura objetivo (puedes ajustar, pero debe quedar equivalente):
src/app/
  public/
    pages/
    layouts/
    components/
  admin/
    pages/
    components/
    layouts/
  shared/
    components/
    types/
    utils/
  data/
  routes.tsx

2) Rutas multi-idioma reales (obligatorio)
Implementa routing basado en prefijo de idioma:
- /es/...
- /en/...

No es un toggle solamente. Debe existir un “language context” o equivalente para:
- resolver contenido ES vs EN
- resolver slug_es vs slug_en
- resolver SEO ES vs SEO EN

3) Arquitectura oficial del sitemap (obligatorio)
Crea las rutas públicas (aunque sea en wireframe) para:

Home:
- /es/
- /en/

Servicios:
- /es/servicios/
- /en/services/
Categorías cluster:
- /es/servicios/strategy-consulting/
- /es/servicios/data-delivery/
- /es/servicios/data-operations/
- /es/servicios/cloud-services/
y equivalentes EN bajo /en/services/...

Subservicio detail:
- /es/servicios/:serviceSlug
- /en/services/:serviceSlug

Industrias:
- /es/industrias/
- /en/industries/
- /es/industrias/:industrySlug
- /en/industries/:industrySlug

Casos:
- /es/casos/
- /en/case-studies/
- /es/casos/:caseSlug
- /en/case-studies/:caseSlug

Insights:
- /es/insights/
- /en/insights/
- /es/insights/:postSlug
- /en/insights/:postSlug

Nosotros:
- /es/nosotros/
- /en/about/

Talento:
- /es/talento/
- /en/careers/
- /es/talento/ofertas/
- /en/careers/jobs/
- /es/talento/ofertas/:jobSlug
- /en/careers/jobs/:jobSlug

Recursos:
- /es/recursos/
- /en/resources/
- /es/recursos/:resourceSlug
- /en/resources/:resourceSlug

Contacto:
- /es/contacto/
- /en/contact/

4) Admin CMS (skeleton funcional)
Crea módulo /admin con:
- layout admin: sidebar + topbar responsive
- auth/guard básico (aunque sea mock) para proteger /admin
- páginas CRUD skeleton (list/create/edit) para estas colecciones:
  Services, ServiceCategories, Industries, CaseStudies, BlogPosts, BlogCategories, Jobs, TeamMembers, Resources, Testimonials, HomeSections

Cada formulario debe tener tabs ES y EN y campos mínimos:
- title_es, title_en
- slug_es, slug_en
- summary_es/en cuando aplique
- content_es/content_en (rich o textarea)
- SEO ES: metaTitle, metaDescription, ogImage
- SEO EN: metaTitle, metaDescription, ogImage
- coverImage
- featured (cuando aplique)
- order (number)
- status: draft/published
- publishedAt (cuando aplique)

5) HomeSections builder (obligatorio)
Implementa HomeSections como “constructor de Home por idioma”:
- language: ES o EN
- sectionType: hero, serviceHighlights, industryHighlights, caseHighlights, insightsHighlights, testimonials, logos, ctaBand, stats, custom
- isEnabled
- order
- config para seleccionar IDs de colecciones (ej. 3 casos)
- CTA label/href por idioma

Debe quedar listo para que el Public Home renderice secciones según HomeSections del idioma correspondiente.

6) SEO técnico (obligatorio)
Crea un componente reusable SEOHead que soporte:
- title, description
- canonical
- og:title, og:description, og:image
- alternates hreflang ES/EN
Deja preparado el “tipo de schema” por plantilla (Service, Article, JobPosting, BreadcrumbList), aunque sea placeholder.

7) Código limpio (obligatorio)
- Componentes reutilizables
- Tipos centralizados
- Naming consistente
- No mezclar admin con public
- Mantener todo responsive

Importante: No quiero diseño final aún. Quiero arquitectura, rutas, separación public/admin, CMS skeleton y i18n listo.