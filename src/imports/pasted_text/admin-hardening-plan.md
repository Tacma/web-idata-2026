PROJECT: iData Global Website + CMS
TASK: Perform a technical hardening pass of the Admin/CMS and project architecture before backend implementation.

IMPORTANT
This task must NOT modify the approved public website design.

Do NOT change:
• layouts
• UI design
• typography
• colors
• components
• content of the public website

The public website is already approved.

The objective is ONLY to harden the architecture, admin implementation, routing, persistence, and developer handoff readiness.

--------------------------------------------------

MAIN GOAL

Prepare the project so it can be safely exported and handed off to Lovable for backend implementation.

The admin must:
• work locally
• persist data locally
• have consistent routing
• have a unified data architecture
• be fully in Spanish
• be ready to connect to backend APIs later

--------------------------------------------------

PART 1 — DO NOT TOUCH PUBLIC SITE DESIGN

Lock the public site UI.

No modifications allowed in:

/public-site
/home
/services
/industries
/case-studies
/insights
/about
/work-with-us
/contact

The only allowed changes in the public site are:

• routing fixes
• language switch improvements
• data connection preparation
• analytics preparation
• SEO metadata structure

--------------------------------------------------

PART 2 — FIX ADMIN ROUTES

Ensure that every menu item in the admin sidebar has a real route.

The following routes must exist and render pages:

/admin/dashboard
/admin/pages
/admin/services
/admin/service-categories
/admin/industries
/admin/case-studies
/admin/blog-posts
/admin/blog-categories
/admin/jobs
/admin/job-applications
/admin/team-members
/admin/resources
/admin/testimonials
/admin/contact-submissions
/admin/contact-settings
/admin/media-library
/admin/navigation
/admin/seo-settings
/admin/analytics
/admin/markets
/admin/redirects
/admin/global-settings
/admin/users

No sidebar item should point to a missing page.

--------------------------------------------------

PART 3 — ADMIN LANGUAGE

The admin must be fully in Spanish.

Translate all UI labels including:

Dashboard
Create
Edit
Delete
Search
Save
Cancel
Settings
Filters
Columns
Pagination
Validation messages
Empty states
Modal titles
Buttons
Placeholders

Examples:

Create New → Crear nuevo
Search → Buscar
Save → Guardar
Cancel → Cancelar
Settings → Configuración

Admin navigation must feel native Spanish.

--------------------------------------------------

PART 4 — UNIFY DATA TYPES

Ensure there is ONE unified type system.

Remove duplicate definitions between:

/admin/types
/shared/types

Create a single source of truth:

/shared/types

Use consistent naming:

camelCase everywhere

Examples:

createdAt
updatedAt
readingTime
sourceType
sourceSlug

Remove mixed snake_case fields.

--------------------------------------------------

PART 5 — REPOSITORY / DATA LAYER

Replace component-level mock data with repository services.

Create a clean service layer:

/services

Example services:

homeSections.service.ts
services.service.ts
industries.service.ts
caseStudies.service.ts
insights.service.ts
jobs.service.ts
teamMembers.service.ts
resources.service.ts
testimonials.service.ts
contactSubmissions.service.ts
seoSettings.service.ts
analyticsSettings.service.ts
navigation.service.ts
markets.service.ts
redirects.service.ts
globalSettings.service.ts

Each service must support:

getAll()
getById()
create()
update()
delete()

--------------------------------------------------

PART 6 — LOCAL PERSISTENCE

While backend is not connected, enable local persistence.

Use:

localStorage

or

IndexedDB

Store collections in local storage keys.

Example:

cms_services
cms_industries
cms_case_studies
cms_blog_posts
cms_jobs
cms_team_members
cms_navigation
cms_global_settings

Reloading the page must NOT lose data.

--------------------------------------------------

PART 7 — ADMIN CRUD SCREENS

Ensure each editable module has:

• list view
• create form
• edit form
• delete action
• validation
• empty state
• loading state

Minimum modules with working CRUD locally:

Services
Industries
Case Studies
Blog Posts
Jobs
Team Members
Navigation
Global Settings
SEO Settings
Analytics Settings

--------------------------------------------------

PART 8 — REPLACE DARK MODAL

The current edit modal uses a dark background overlay that does not match the design quality.

Replace with a clean admin editing panel.

Preferred pattern:

Right side drawer editor.

Behavior:

Click Edit →
panel slides from right →
white background →
form fields inside →
close button top right

Overlay should be subtle, not black.

The admin must feel professional and clean.

--------------------------------------------------

PART 9 — PRELOAD REAL SITE CONTENT

Replace placeholder/mock entries with the real content currently present in the public iData site.

Populate collections with real entries for:

Services
Industries
Case Studies
Insights
Team Members
Testimonials
Resources

Use the existing public content as initial seed data.

--------------------------------------------------

PART 10 — LANGUAGE SWITCH HARDENING

Ensure language switch preserves:

• current page
• section anchor
• scroll position

Example:

User on:

/es/servicios/data-operations#metodologia

Switch to English →

Result:

/en/services/data-operations#methodology

Scroll position must remain approximately the same.

--------------------------------------------------

PART 11 — PACKAGE.JSON FIXES

Ensure dependencies are correct for export.

react and react-dom must be standard dependencies.

Remove optional peerDependencies that could break local runtime.

Ensure the project runs with:

npm install
npm run dev

without extra configuration.

--------------------------------------------------

PART 12 — PUBLIC SITE DEFAULT LANGUAGE

Public site default language must be English.

Root domain behavior:

/ → English homepage

Spanish version:

/es

This setting must be configurable in:

Global Settings

--------------------------------------------------

PART 13 — ANALYTICS READY

Prepare analytics configuration without hardcoding IDs.

Create editable fields:

GA4 Measurement ID
GTM Container ID
Search Console Verification Code

Store in:

analyticsSettings

Ensure events can be configured later.

--------------------------------------------------

PART 14 — SEO SETTINGS

Ensure editable SEO fields exist for pages:

seoTitle
seoDescription
ogTitle
ogDescription
ogImage
canonicalUrl
robotsIndex
robotsFollow

Add preview components for:

Google search preview
Social share preview

--------------------------------------------------

PART 15 — FINAL RESULT

After this hardening pass the project must:

• export cleanly
• run locally
• keep public site design unchanged
• have admin fully in Spanish
• have unified type system
• persist data locally
• have working CRUD admin
• have consistent routing
• preload real site content
• support language switch properly
• be ready for backend integration in Lovable