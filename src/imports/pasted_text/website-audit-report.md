PROJECT: iData Global Website
TASK: Perform a full navigation and architecture audit of the website before CMS/admin implementation.

IMPORTANT
This task is an AUDIT only.

DO NOT:
- change the visual design
- change layouts
- change typography
- change colors
- change components
- modify existing content

The goal is to review and validate navigation logic, routing, links, language switching, and CMS readiness.

--------------------------------------------------

AUDIT OBJECTIVES

1 Verify that all internal links work correctly
2 Verify that navigation routes are consistent
3 Verify bilingual navigation behavior
4 Verify language switching keeps page and scroll position
5 Verify CTA routing
6 Verify page hierarchy
7 Verify anchor navigation
8 Verify contact form routes
9 Verify careers routes
10 Verify Insights article navigation
11 Verify related article navigation
12 Verify admin-ready structure
13 Verify that all dynamic content sections can later connect to CMS

--------------------------------------------------

ROUTE STRUCTURE AUDIT

Verify all routes exist in both languages.

Examples:

ES

/es
/es/servicios
/es/servicios/{slug}
/es/industrias
/es/industrias/{slug}
/es/casos
/es/casos/{slug}
/es/insights
/es/insights/{slug}
/es/nosotros
/es/trabaja-con-nosotros
/es/contacto

EN

/en
/en/services
/en/services/{slug}
/en/industries
/en/industries/{slug}
/en/case-studies
/en/case-studies/{slug}
/en/insights
/en/insights/{slug}
/en/about
/en/work-with-us
/en/contact

Verify that each ES route maps correctly to the EN equivalent.

--------------------------------------------------

LANGUAGE SWITCH AUDIT

CRITICAL RULE

When a user switches language:

The site must keep:

1 the same page
2 the same section
3 the same scroll position

Example:

User is on:

/es/servicios/data-operations

Scrolled to the middle of the page.

Switches language.

Result must be:

/en/services/data-operations

And the page must remain at the same scroll position.

Do NOT redirect to home.

Do NOT reset scroll.

Implement logic to preserve scroll position during language change.

--------------------------------------------------

ANCHOR AND SECTION AUDIT

Verify that section anchors work correctly.

Examples:

/es/servicios#metodologia
/es/servicios#beneficios
/es/contacto#form

Switching language must preserve anchors.

Example:

/es/contacto#form

→

/en/contact#form

--------------------------------------------------

NAVIGATION AUDIT

Check the following navigation elements:

Main navbar
Footer links
CTA buttons
Inline section CTAs
Related content navigation

Verify all links point to valid pages.

--------------------------------------------------

CTA ROUTING AUDIT

Verify every CTA that links to Contact sends context parameters correctly.

Example:

source_type
source_slug
intent

Ensure no CTA sends users to a broken route.

--------------------------------------------------

INSIGHTS AUDIT

Verify:

Insights listing page
Article detail pages
Related article navigation
Share buttons
Sidebar navigation

Ensure articles always load correctly.

Verify clicking related article:

opens article
scrolls to top

--------------------------------------------------

CAREERS AUDIT

Verify:

Careers page
Open positions listing
Job detail routes
Application forms
Open application forms

Verify these routes are isolated from commercial contact forms.

--------------------------------------------------

CONTACT AUDIT

Verify:

Contact form routes
Form validation
Submission logic
Confirmation messages

Verify form routes do not break when language changes.

--------------------------------------------------

CMS READINESS AUDIT

Confirm that the following sections are structured for CMS connection.

Services
Industries
Case Studies
Insights
Team members
Partners
Clients
Careers jobs
Contact submissions

Ensure these sections are componentized and dynamic-ready.

Do NOT convert them yet.

Just confirm readiness.

--------------------------------------------------

BROKEN LINK SCAN

Run an internal link scan.

Identify:

broken internal links
missing pages
duplicate routes
wrong language routes
anchor issues

Produce a report.

--------------------------------------------------

DUPLICATE CONTENT AUDIT

Check that no page duplicates the same content block unnecessarily.

Example:

duplicate insight sections
duplicate related content
duplicate CTA blocks

Flag them but do not modify layout.

--------------------------------------------------

SCROLL BEHAVIOR AUDIT

Verify that:

- navigation between articles scrolls to top
- navigation between services scrolls to top
- language switching preserves scroll position

--------------------------------------------------

ADMIN PREPARATION

Verify that the site structure supports:

future CMS integration
database-driven content
dynamic content loading
admin editing

Mark sections that will connect to CMS.

--------------------------------------------------

AUDIT OUTPUT

Produce an internal audit checklist confirming:

navigation integrity
language integrity
route mapping
CTA routing
scroll behavior
CMS readiness

Do not redesign anything.

--------------------------------------------------

FINAL GOAL

Ensure the website frontend architecture is stable, logical, and ready for CMS/admin implementation without breaking navigation, bilingual behavior, or user flows.