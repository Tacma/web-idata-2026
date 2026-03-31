PROJECT: iData Global Website + CMS
TASK: Perform a technical verification audit of the entire project.

IMPORTANT
Do NOT modify the public site design.
Do NOT redesign anything.

This task is ONLY an audit and verification pass.

The goal is to confirm that the project is technically ready to be exported and integrated with a backend (Lovable).

--------------------------------------------------

STEP 1 — VERIFY ROUTING

Check that all admin routes actually render pages and do not point to placeholders.

Verify the following routes:

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

Confirm:

• route exists
• component exists
• page renders
• sidebar links work

Report any missing page.

--------------------------------------------------

STEP 2 — VERIFY CRUD

For each major collection verify that CRUD works:

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

Verify:

Create
Edit
Delete
Save
Reload persistence

If persistence does not exist, report it.

--------------------------------------------------

STEP 3 — VERIFY DATA LAYER

Check if the project uses a service layer or if components still contain mock data.

Search for:

mockData
fakeData
hardcoded arrays

If found, report them.

All collections should be loaded through services.

Expected structure:

/services
services.service.ts
industries.service.ts
blog.service.ts
jobs.service.ts
navigation.service.ts
seo.service.ts
analytics.service.ts

Confirm if services exist.

--------------------------------------------------

STEP 4 — VERIFY LOCAL DATA PERSISTENCE

Check if the CMS stores data locally.

Look for usage of:

localStorage
IndexedDB

Test behavior:

Create content
Refresh page

If data disappears → persistence is missing.

Report results.

--------------------------------------------------

STEP 5 — VERIFY LANGUAGE CONFIGURATION

Confirm:

Public website default language = English.

Spanish version must live at:

/es

Verify language switch keeps:

page
slug
anchor
scroll position

If not implemented, report.

--------------------------------------------------

STEP 6 — VERIFY ADMIN LANGUAGE

Confirm the entire admin UI is in Spanish.

Check:

buttons
forms
labels
validation
tables
filters
pagination

Report any English text remaining.

--------------------------------------------------

STEP 7 — VERIFY SEO MODULE

Check if SEO settings actually exist for pages.

Fields expected:

seoTitle
seoDescription
ogTitle
ogDescription
ogImage
canonicalUrl
robotsIndex
robotsFollow

Confirm preview components exist:

Google search preview
Social preview

--------------------------------------------------

STEP 8 — VERIFY ANALYTICS MODULE

Check if analytics configuration fields exist:

GA4 Measurement ID
GTM Container ID
Search Console verification code

Confirm they are editable in admin.

--------------------------------------------------

STEP 9 — VERIFY EDITOR UX

Inspect the edit modal used in admin.

If the editor still uses a dark overlay modal:

Replace with a right-side editing drawer.

Requirements:

• white panel
• slide from right
• form inside
• subtle overlay
• close button

Admin editing experience must feel professional.

--------------------------------------------------

STEP 10 — VERIFY CONTENT PRELOAD

Check if collections are preloaded with the real content from the iData public site.

Collections to verify:

Services
Industries
Case Studies
Insights
Team Members
Resources
Testimonials

If placeholder content exists, report.

--------------------------------------------------

STEP 11 — VERIFY PROJECT EXPORT

Simulate project export readiness.

Confirm project can run with:

npm install
npm run dev

Check dependencies.

Ensure:

react
react-dom

are in dependencies.

--------------------------------------------------

STEP 12 — FINAL REPORT

Provide a clear audit summary:

SECTION
STATUS
NOTES

Routing
CRUD
Persistence
Services Layer
Language System
SEO
Analytics
Admin UX
Content preload
Export readiness

Clearly state:

READY FOR BACKEND
or
REQUIRES FIXES

Do not generate new features.
Only verify and report.