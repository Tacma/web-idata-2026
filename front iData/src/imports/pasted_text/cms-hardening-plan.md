PROJECT: iData Global CMS
TASK: Harden the Admin/CMS implementation for real code export, editable bindings, local runtime readiness, and future backend integration.

IMPORTANT
Do NOT redesign the admin UI.
Do NOT change content structure unless required for implementation quality.
Do NOT break the current public website.
This task is about making the generated code exportable, maintainable, and ready for backend integration later.

CRITICAL REQUIREMENTS
1. The Admin UI must be fully in Spanish.
2. The public website must open by default in English.
3. The admin code must be exportable and usable outside Figma Make.
4. Editable collections and fields must be truly connected in code structure, not only visually represented.
5. The implementation must be prepared to run locally first, even with mock/local data, while backend integration is completed later in Lovable.

--------------------------------------------------
PART 1 — ADMIN LANGUAGE / PUBLIC DEFAULT LANGUAGE

Set these rules:

Admin interface language:
Spanish only

Examples:
Dashboard
Páginas
Servicios
Industrias
Casos de éxito
Insights
Empleos
Aplicaciones
Leads
SEO y metadata
Analítica
Mercados
Redirecciones
Configuración global
Usuarios y roles

Public website default language:
English

If user enters the root domain:
load English version by default

Examples:
Primary public default:
/
→ English homepage

Spanish version:
accessible via /es

English version:
accessible via /en if needed, or via root if that is the defined production behavior

Make this behavior configurable in global settings:
default_public_language = en

--------------------------------------------------
PART 2 — EXPORTABLE CODE QUALITY

Ensure the generated code is exportable as a clean project.

Requirements:
- valid React + TypeScript structure
- no Figma-only runtime dependencies
- no hidden visual-only bindings
- no fake CRUD behavior
- no simulated collections that cannot later connect to API/database
- no hardcoded mock data inside visual components unless explicitly isolated in mock files

Organize code into a real structure like:

/src
  /app
  /admin
    /components
    /layouts
    /pages
    /hooks
    /services
    /types
    /mocks
    /config
  /public-site
  /shared
    /components
    /types
    /utils
    /config

--------------------------------------------------
PART 3 — EDITABLE DATA CONNECTIONS

Every editable thing shown in the admin must map to a real typed data model.

Do NOT leave “editable-looking” cards that are not truly connected to a data source abstraction.

For each admin module create:

1. Type/interface
2. Local mock repository/service
3. Read/list function
4. Detail/get-by-id function
5. Create/update/delete function signatures
6. Form schema or typed field model
7. Validation-ready structure

Modules that must be truly structured:
- Home Sections
- Service Categories
- Services
- Industries
- Case Studies
- Blog Posts / Insights
- Blog Categories
- Jobs
- Team Members
- Resources
- Testimonials
- Contact Submissions
- SEO Settings
- Analytics Settings
- Navigation
- Markets
- Redirects
- Global Settings
- Users / Roles

--------------------------------------------------
PART 4 — REPOSITORY / SERVICE ABSTRACTION

Prepare the code so it can run locally first and later switch to real backend.

For each collection create a service/repository abstraction.

Example pattern:
services/
- homeSections.service.ts
- services.service.ts
- industries.service.ts
- caseStudies.service.ts
- insights.service.ts
- jobs.service.ts
- contactSubmissions.service.ts
- seoSettings.service.ts
- analyticsSettings.service.ts

Each service should support two modes:

mode 1:
local/mock mode

mode 2:
api mode

Use a config switch such as:
DATA_PROVIDER=mock | api

This is critical so the admin works locally now and can later connect to Lovable/backend without rewriting the UI.

--------------------------------------------------
PART 5 — LOCAL RUNTIME READINESS

Prepare the admin to work locally immediately.

Requirements:
- use local mock JSON/TS seed data
- all dashboard counters must read from mock repositories
- all lists must render real mock records
- forms must update local state/store or mock repository
- create/edit/delete flows must work in local mode
- success/error states must exist
- loading states must exist

This local mode can be in-memory or mock-file driven, but it must actually work.

Do NOT leave static cards with fixed numbers unless they come from the local repository layer.

--------------------------------------------------
PART 6 — FORM / CRUD READINESS

For each admin module that is editable, prepare:
- list view
- create form
- edit form
- delete action
- validation states
- empty state
- save/cancel behavior

At minimum implement proper CRUD-ready structure for:
- Services
- Industries
- Case Studies
- Blog Posts
- Jobs
- Team Members
- Global Settings
- Navigation
- SEO Settings
- Analytics Settings

Even if backend is not connected yet, the code must clearly support these actions in local/mock mode.

--------------------------------------------------
PART 7 — ADMIN NAVIGATION IN SPANISH

Convert all admin navigation labels to Spanish.

Examples:
Dashboard
Secciones del inicio
Categorías de servicios
Servicios
Industrias
Casos de éxito
Publicaciones del blog
Categorías del blog
Vacantes
Miembros del equipo
Recursos
Testimonios
Leads de contacto
Configuración SEO
Configuración de analítica
Mercados
Redirecciones
Configuración global
Usuarios y roles

The admin must feel native in Spanish.

--------------------------------------------------
PART 8 — PUBLIC DEFAULT TO ENGLISH

Set public site logic so English is the default entry point.

Requirements:
- root domain opens English
- Spanish remains available
- language switch still preserves page, section, and scroll
- this behavior must be configurable from global settings

Global setting fields:
- default_public_language
- root_domain_language_mode
- localized_route_strategy

--------------------------------------------------
PART 9 — CMS SETTINGS MUST BE REAL

Global settings shown in admin must map to a real config structure.

At minimum:
- default public language
- site title
- default meta description
- favicon
- default OG image
- contact notification recipients
- social links
- GA4 id
- GTM id
- Search Console verification
- market/domain settings

These must not be decorative fields only.
They must have a real storage shape and service abstraction.

--------------------------------------------------
PART 10 — ANALYTICS READY STRUCTURE

Prepare analytics configuration in a production-friendly way.

Create:
analyticsSettings service/type/form

Fields:
- ga4_measurement_id
- gtm_container_id
- search_console_verification_code
- consent_mode_enabled
- track_form_submissions
- track_cta_clicks
- track_language_switches
- track_scroll_depth
- track_job_applications
- track_blog_engagement

Keep this configuration editable from admin.

Do NOT hardcode IDs in components.

--------------------------------------------------
PART 11 — SEO / GOOGLE APPEARANCE READINESS

Prepare real editable structures for:
- page title
- meta description
- og title
- og description
- og image
- canonical
- hreflang
- robots index/follow
- favicon

Include preview components for:
- Google result preview
- social share preview

These previews must read from editable state/config, not hardcoded demo content.

--------------------------------------------------
PART 12 — CODE HANDOFF QUALITY

The exported code must follow these standards:

- TypeScript everywhere
- reusable components
- clear naming
- no duplicated types
- no huge monolithic page files
- separate UI from data access
- separate mock data from components
- no hidden business logic inside JSX
- forms typed cleanly
- route config centralized
- admin menu config centralized
- collection definitions centralized if possible

--------------------------------------------------
PART 13 — WHAT TO DELIVER IN CODE

Ensure the generated project includes:

1. Real folder structure
2. Typed entities
3. Mock repositories/services
4. Working local admin flows
5. Spanish admin labels
6. English public default config
7. Editable settings architecture
8. Dashboard pulling from repository data
9. No fake visual-only editability
10. Easy future replacement of mock provider with backend/API provider

--------------------------------------------------
PART 14 — FINAL RESULT

The admin/CMS must be ready for this workflow:

NOW:
- export code
- run locally
- navigate admin in Spanish
- public site opens in English by default
- use mock/local data but with real repository structure
- see editable collections actually wired to code

LATER:
- connect backend in Lovable
- replace mock repositories with API/database services
- keep same UI and same typed contracts
- avoid rebuilding the CMS from scratch

Do not just simulate a CMS visually.
Build the code structure as a real implementation-ready foundation.