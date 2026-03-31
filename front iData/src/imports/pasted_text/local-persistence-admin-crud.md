PROJECT: iData Global Website + CMS
TASK: Implement the technical fixes identified in the audit so the project becomes export-ready and ready for backend integration in Lovable.

IMPORTANT
Do NOT modify the approved public website design.
Do NOT redesign the public site.
Do NOT change the visual style of the public pages.

This task is focused on:
- technical hardening
- local persistence
- admin completeness
- CRUD functionality
- export readiness
- developer handoff quality

Use the audit report as source of truth.

--------------------------------------------------
GENERAL GOAL

After this pass, the project must be:

- exportable
- runnable locally
- persistent across reloads
- fully usable as a local CMS prototype
- fully in Spanish on the admin side
- ready to connect to backend APIs later in Lovable

--------------------------------------------------
PART 1 — IMPLEMENT LOCAL PERSISTENCE

This is a critical blocker.

Create a reusable local persistence layer using localStorage.

Create:
localStorage.service.ts

It must support:
- getCollection(key)
- saveCollection(key, data)
- resetCollection(key)
- initializeCollection(key, seedData)

Use collection keys such as:
cms_home_sections
cms_service_categories
cms_services
cms_industries
cms_case_studies
cms_blog_posts
cms_blog_categories
cms_jobs
cms_job_applications
cms_team_members
cms_resources
cms_testimonials
cms_contact_submissions
cms_contact_settings
cms_navigation
cms_seo_settings
cms_analytics_settings
cms_markets
cms_redirects
cms_global_settings
cms_users

All editable collections must load from localStorage first.
If localStorage is empty, initialize from the current seed/mock data.

Reloading the page must NOT lose changes.

--------------------------------------------------
PART 2 — COMPLETE ADMIN ROUTES

This is a critical blocker.

Create real pages and routes for all missing admin paths used in the sidebar.

These routes must exist and render:

/admin/job-applications
/admin/contact-settings
/admin/media-library
/admin/navigation
/admin/markets
/admin/redirects
/admin/global-settings
/admin/users

Each route must:
- render correctly
- appear in the router
- match the sidebar links
- use Spanish labels

If a module is not fully developed yet, still create a real admin page shell connected to its local service/store.

No sidebar item should point to a missing route.

--------------------------------------------------
PART 3 — COMPLETE REAL CRUD FOR MAJOR COLLECTIONS

Critical requirement.

The following modules must have real local CRUD using the service/repository layer and localStorage persistence:

- Services
- Industries
- Case Studies
- Blog Posts
- Jobs
- Team Members
- Navigation
- Global Settings
- SEO Settings
- Analytics Settings
- Contact Settings
- Redirects
- Markets
- Users
- Resources
- Testimonials
- Blog Categories
- Service Categories

For each module implement:
- list
- create
- edit
- delete
- save
- cancel
- validation
- empty state
- local persistence on save

Do NOT keep visual-only editing.
Do NOT rely on component-only useState for persisted content.

--------------------------------------------------
PART 4 — COMPLETE SERVICE LAYER

Create missing services so every collection has its own repository/service abstraction.

Expected files include:

industries.service.ts
caseStudies.service.ts
blogPosts.service.ts
blogCategories.service.ts
jobs.service.ts
jobApplications.service.ts
teamMembers.service.ts
resources.service.ts
testimonials.service.ts
navigation.service.ts
seoSettings.service.ts
analyticsSettings.service.ts
contactSettings.service.ts
markets.service.ts
redirects.service.ts
users.service.ts
serviceCategories.service.ts
homeSections.service.ts

Each service must expose:
- getAll()
- getById()
- create()
- update()
- delete()

Global/settings-style services may also expose:
- getSettings()
- saveSettings()

All services must use localStorage-backed persistence.

--------------------------------------------------
PART 5 — REMOVE DIRECT DEPENDENCE ON RAW mockData IN UI COMPONENTS

Critical quality requirement.

The UI must not import collection data directly from mockData files.

Instead:
- UI components call services
- services initialize from seed/mock data only if storage is empty

Search for direct imports like:
mockServices
mockIndustries
mockCaseStudies
mockBlogPosts

Refactor them out of page components and move that dependency into the service layer only.

--------------------------------------------------
PART 6 — ADMIN MUST BE 100% IN SPANISH

Translate all remaining English strings in the admin.

Check especially:
- CRUDList.tsx
- CollectionAdmin.tsx
- LocalizedForm.tsx
- page headers
- action buttons
- placeholders
- validation messages
- table labels
- empty states
- pagination
- filters

Examples:
Create New → Crear nuevo
Search... → Buscar...
Save → Guardar
Cancel → Cancelar
Delete → Eliminar
Edit → Editar
Settings → Configuración
Total items → elementos totales

The entire admin experience must feel fully native in Spanish.

--------------------------------------------------
PART 7 — FIX PACKAGE EXPORT READINESS

Critical blocker.

Update package.json so the project is runnable after export.

Requirements:
- react must be in dependencies
- react-dom must be in dependencies
- add "dev": "vite"
- keep build script valid

Expected scripts:
- npm run dev
- npm run build

Do NOT leave react/react-dom as optional peerDependencies only.

--------------------------------------------------
PART 8 — CONNECT SEO SETTINGS TO REAL LOCAL STORAGE

The SEO module currently has UI but must become actually editable and saved.

Persist:
- site title template
- meta descriptions
- OG settings
- favicon settings
- canonical settings
- robots settings
- hreflang settings if editable

Google search preview and social preview must read from saved editable state.

--------------------------------------------------
PART 9 — CONNECT ANALYTICS SETTINGS TO REAL LOCAL STORAGE

The Analytics module currently has UI but must become actually editable and saved.

Persist:
- GA4 Measurement ID
- GTM Container ID
- Search Console verification code
- consent mode
- event tracking toggles

These values must survive reload.

--------------------------------------------------
PART 10 — IMPROVE EDITOR UX

The editing experience must feel cleaner and more professional.

Replace any dark generic modal pattern with a right-side drawer editor.

Requirements:
- white panel
- slide from the right
- subtle overlay only
- clean header
- Spanish buttons
- close icon
- form sections well spaced
- maintain current admin visual system

Do NOT redesign the full admin.
Only improve the edit interaction pattern.

--------------------------------------------------
PART 11 — KEEP PUBLIC SITE DEFAULT IN ENGLISH

Do not break current language logic.

Verify:
- root loads English by default
- /es works correctly
- language switch still maps equivalent pages
- no public-site visual changes

--------------------------------------------------
PART 12 — FINAL VERIFICATION REQUIRED

After implementing these fixes, generate a final technical verification summary confirming:

1. All admin routes exist
2. All major collections persist after reload
3. CRUD works locally
4. Admin is fully in Spanish
5. package.json is export-ready
6. SEO settings save correctly
7. Analytics settings save correctly
8. Public site remains visually unchanged
9. English remains the default public language
10. Project is ready for export and backend integration in Lovable

Do not just say it is complete.
Actually verify the behavior.

--------------------------------------------------
FINAL RESULT

At the end of this task, the project must be a real local CMS prototype that:
- can be exported
- runs with npm install + npm run dev
- persists data locally
- has complete admin routing
- has CRUD across major modules
- is fully in Spanish in the admin
- keeps the approved public website untouched
- is ready to hand off to Lovable for backend integration