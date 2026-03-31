PROJECT: iData Global Website
TASK: Re-enable the small Admin button in the footer and build the full Admin/CMS architecture based on the current website, without breaking the existing frontend, bilingual mirror logic, navigation audit, or future development handoff.

IMPORTANT
Do NOT redesign the public website.
Do NOT change current frontend content unless required for CMS connection.
Do NOT break the existing ES/EN mirror structure.
Do NOT break page/section persistence on language switch.

This task has 4 goals:

1) Re-enable the small Admin button in the footer.
2) Build the Admin/CMS architecture based on the current public website.
3) Support mirrored domains/sites with optional market-specific visibility overrides.
4) Configure analytics, SEO, metadata, and search-preview settings in a robust, development-friendly way.

--------------------------------------------------
PART 1 — RE-ENABLE SMALL ADMIN BUTTON IN FOOTER

Add back the small footer access button for the administrator.

Component:
footer-admin-link

Requirements:
- small and discreet
- placed in the footer, not visually dominant
- keep same site visual language
- text:
  ES → Administrador
  EN → Admin
- should route to the admin login entry point

Routes:
Primary option:
/admin

If separate localized admin routes are needed:
- /es/admin
- /en/admin

Preferred behavior:
single admin route /admin

Do NOT make this button large or promotional.
It must feel like a utility access.

--------------------------------------------------
PART 2 — BUILD THE ADMIN / CMS BASED ON CURRENT WEBSITE

Build the admin by mapping the current public website structure and all the logic already defined in the project.

The admin must support:

SITE CONTENT
- Home
- Services
- Industries
- Case Studies
- Insights / Blog
- About / Nosotros
- Work With Us / Careers
- Contact
- Global settings

SITE OPERATIONS
- navigation
- CTA destinations
- bilingual content
- market visibility
- SEO
- analytics settings
- social/share settings
- contact routing
- careers routing

The admin must be structured for easy implementation by developers.
Use reusable data models, clean entity separation, and CMS-friendly content architecture.

--------------------------------------------------
PART 3 — CORE ADMIN MODULES

Create these admin modules:

1. Dashboard
2. Pages
3. Services
4. Industries
5. Case Studies
6. Insights
7. Team / About
8. Careers
9. Contact / Leads
10. Media Library
11. Navigation
12. SEO & Metadata
13. Analytics
14. Market / Domain Settings
15. Global Settings
16. Users / Roles
17. Forms / Submissions
18. Redirects / URL Management

--------------------------------------------------
PART 4 — ADMIN DASHBOARD

Component:
admin-dashboard

Show key widgets:
- total published pages
- total Insights posts
- total active job openings
- total contact submissions
- total job applications
- recent submissions
- content pending translation
- SEO issues / missing metadata
- broken links flagged in audit
- pages missing market configuration
- analytics quick summary placeholders

This dashboard is operational, not decorative.

--------------------------------------------------
PART 5 — CONTENT MODEL BY MODULE

A. Pages
For static and semi-static pages:
- Home
- About
- Contact
- Careers landing

Fields:
- page_name
- route_es
- route_en
- status
- hero content
- modular content blocks
- SEO metadata
- market visibility rules

B. Services
Fields:
- title_es
- title_en
- slug_es
- slug_en
- summary_es
- summary_en
- hero fields
- body modular sections
- CTA config
- contact prefill config
- seo fields
- market visibility

C. Industries
Fields:
- title_es
- title_en
- slug_es
- slug_en
- summary_es
- summary_en
- image
- body modular sections
- CTA config
- contact prefill config
- seo fields
- market visibility

D. Case Studies
Fields:
- client_name
- title_es
- title_en
- slug_es
- slug_en
- challenge_es
- challenge_en
- solution_es
- solution_en
- results_es
- results_en
- metrics
- related_services
- related_industries
- hero image
- body modular sections
- seo fields
- market visibility

E. Insights
Fields:
- title_es
- title_en
- slug_es
- slug_en
- summary_es
- summary_en
- category
- tags
- featured_image
- display_variant
- content_blocks
- related_services
- related_industries
- author
- publish_date
- reading_time
- featured
- status
- seo_title_es
- seo_title_en
- seo_description_es
- seo_description_en
- social_image
- market visibility

F. Team / About
Fields:
- team members
- leadership
- clients
- partners
- about intro
- culture blocks
- stats
- global presence
- seo fields

G. Careers
Fields:
- careers landing content
- culture content
- job openings
- job detail content
- job applications
- open applications
- recruiters email routing settings
- seo fields
- market visibility

H. Contact / Leads
Fields:
- contact page content
- phone numbers
- contact email routing settings
- social links
- map embed
- submissions
- lead source metadata
- confirmation email templates

--------------------------------------------------
PART 6 — MIRROR DOMAINS / MARKET LOGIC

The project uses mirrored sites/domains with the same base structure.

Build a market/domain configuration system so the admin can manage mirrored experiences without duplicating the whole website.

Concept:
- one core content model
- multiple market/domain outputs
- optional visibility overrides

Examples:
- Domain A = general/global market
- Domain B = another mirrored market
- same page architecture
- same design system
- same admin
- optional content visibility differences

Create:
market_settings

Fields:
- market_name
- domain_name
- default_language
- enabled_languages
- is_primary_market
- favicon_override
- logo_override_optional
- contact_phone_override
- contact_email_override
- seo_defaults_override
- social_links_override
- pages_visibility_rules
- sections_visibility_rules
- CTA_override_rules

For each content item and section, allow:
- show in all markets
- show only in selected markets
- hide in selected markets

This must be controlled by simple visibility rules, not duplicated pages by default.

--------------------------------------------------
PART 7 — LANGUAGE / LOCALIZATION RULES

Keep current bilingual mirror logic:
- ES and EN are equivalent page structures
- language switch must keep the same page
- language switch must keep the same anchor/section
- language switch must preserve scroll position

The admin must support:
- localized fields side by side
- translation completeness status
- warning if EN or ES content is missing
- slug pairing validation
- route parity validation

Do NOT let editors publish one locale if critical localized SEO fields are missing, unless explicitly allowed by role.

--------------------------------------------------
PART 8 — FORMS AND SUBMISSIONS

A. Commercial contact forms
All commercial forms route to:
marketing@idata.global

Applies to:
- Contact page
- service CTAs
- industry CTAs
- case study CTAs
- article/contact CTAs
- “hablemos / let’s talk / request info / start project”

Store submissions in:
contact_submissions

Include source metadata:
- source_type
- source_slug
- source_title
- source_url
- source_cta_label
- intent
- language
- market
- submitted_at

B. Careers forms
Keep separate from commercial forms.
Do NOT route careers submissions to marketing@idata.global
Those recipient settings remain configurable for later.

--------------------------------------------------
PART 9 — MEDIA LIBRARY

Create a central media library with:
- images
- article images
- logos
- team photos
- partner logos
- social images
- favicon files
- OG images
- downloadable PDFs

Features:
- search
- tags
- alt text ES/EN
- usage tracking
- dimensions
- file size
- crop variants where needed

--------------------------------------------------
PART 10 — NAVIGATION MANAGER

Create a Navigation admin module to manage:
- main navbar
- footer links
- utility links
- legal links
- CTA labels
- market-specific nav visibility
- external/internal target rules

All nav items must support:
- ES label
- EN label
- route or external link
- open in new tab toggle
- market visibility
- order

--------------------------------------------------
PART 11 — SEO & METADATA MODULE

Create a full SEO management module.

Global defaults:
- site title template
- default meta description
- default OG image
- robots settings
- canonical rules
- hreflang pairing
- favicon
- brand name
- default share title
- default share description

Per-page SEO fields:
- seo_title_es
- seo_title_en
- seo_description_es
- seo_description_en
- canonical_url_override
- og_title_es
- og_title_en
- og_description_es
- og_description_en
- og_image
- robots_index
- robots_follow
- schema_type
- breadcrumb_title_es
- breadcrumb_title_en

Add validations:
- title length guidance
- meta description length guidance
- missing OG image warnings
- duplicate slug warnings
- missing canonical/hreflang warnings

--------------------------------------------------
PART 12 — SEARCH APPEARANCE / GOOGLE RESULT PREVIEW

Create a preview inside admin for how each page could appear in Google and social previews.

Show:
- page title preview
- meta description preview
- URL preview
- social share preview
- OG image preview

This is for editorial confidence and SEO QA.

--------------------------------------------------
PART 13 — FAVICON / BRAND ASSETS

Create a Global Settings section for:
- favicon
- apple touch icon
- browser theme color
- default social image
- email sender name
- company legal name
- company phones
- company social links

The current site publicly shows these contact phones:
- LATAM (+57) 300 571 3092
- USA (+1) 303 901 9526
- Administrativo (+57) 300 479 91 52

And currently shows these social channels in Contact:
- Instagram
- LinkedIn
- YouTube

Preload those current channels and numbers into the admin settings as editable defaults.

Do NOT invent other social channels.

--------------------------------------------------
PART 14 — GOOGLE ANALYTICS / TAGGING

Create an Analytics module optimized for clean future implementation.

Use best-practice structure for:
- Google Analytics 4
- Google Tag Manager
- Google Search Console verification support
- consent-ready tracking configuration

Create:
analytics_settings

Fields:
- ga4_measurement_id
- gtm_container_id
- search_console_verification_code
- google_ads_id_optional
- meta_pixel_id_optional
- consent_mode_enabled
- anonymize_ip_toggle
- track_form_submissions
- track_cta_clicks
- track_language_switches
- track_scroll_depth
- track_file_downloads
- track_outbound_clicks
- track_job_applications
- track_open_applications
- track_blog_engagement
- track_search_usage
- track_video_or_embed_interactions

Recommended tracked events:
- page_view
- generate_lead
- contact_form_submit
- job_application_submit
- open_application_submit
- cta_click
- language_switch
- select_content
- search
- file_download
- outbound_click
- scroll_50
- scroll_90

For each event capture useful parameters:
- page_type
- page_slug
- market
- language
- source_type
- source_title
- cta_label
- form_type

Do NOT hardcode analytics IDs into templates directly.
Use global settings/config.

--------------------------------------------------
PART 15 — TECHNICAL SEO / INDEXING PREP

Prepare admin settings and implementation readiness for:
- title tags
- meta descriptions
- OG tags
- Twitter/social card fallback if used later
- hreflang
- canonical tags
- robots meta
- XML sitemap generation readiness
- clean URLs
- redirects management
- 404 management
- trailing slash consistency
- schema markup support

Create a Redirects module:
- old URL
- new URL
- status code (301/302)
- notes
- market
- locale mapping

Create a basic 404 settings panel:
- fallback CTA
- suggested links
- market-aware messaging

--------------------------------------------------
PART 16 — SCHEMA / STRUCTURED DATA

Prepare schema settings for:
- Organization
- WebSite
- BreadcrumbList
- Article
- JobPosting
- ContactPage
- AboutPage
- Service

Allow default organization data in global settings and page-level schema overrides where relevant.

--------------------------------------------------
PART 17 — ADMIN USERS / ROLES

Create admin roles:
- Super Admin
- Content Admin
- Marketing Admin
- HR Admin
- SEO Admin
- Read Only

Permissions example:
Marketing Admin:
- can manage services, industries, case studies, insights, contact leads, SEO
HR Admin:
- can manage careers and applications only

--------------------------------------------------
PART 18 — WORKFLOW / QA

Create editorial workflow helpers:
- draft
- review
- published
- archived

Add QA checks before publish:
- missing EN/ES content
- missing SEO title
- missing meta description
- missing OG image
- slug conflict
- missing market visibility
- missing alt text in key images

--------------------------------------------------
PART 19 — DEV HANDOFF QUALITY

The admin and data model must be easy to implement in development.

Requirements:
- modular content sections
- normalized collections
- consistent naming
- predictable route mapping
- no duplicated content models
- no hardcoded market logic in templates
- no hardcoded analytics IDs
- no hardcoded contact destinations except the already-approved commercial recipient marketing@idata.global
- API-friendly structure
- future headless/CMS-compatible architecture

--------------------------------------------------
PART 20 — FINAL RESULT

Deliver an admin/CMS architecture that:
- connects to the current public website structure
- keeps ES/EN mirrored correctly
- supports mirrored domains/markets with visibility overrides
- re-enables the small Admin footer button
- centralizes commercial lead routing to marketing@idata.global
- separates careers routing
- includes robust GA4/GTM/Search Console readiness
- includes SEO, favicon, metadata, preview, schema, and redirects management
- is implementation-friendly for developers
- becomes the stable operational base for the entire website