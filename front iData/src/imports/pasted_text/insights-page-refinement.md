PROJECT: iData Corporate Website
PAGE: Insights / Blog
TASK: Refine the visual design of the Insights listing page without breaking the CMS logic, bilingual structure, filters, search, SEO setup, or responsive behavior already created.

IMPORTANT:
Do NOT redesign the site from scratch.
Do NOT break the existing architecture.
Keep all current logic for CMS, bilingual routes, tags, search, article detail pages, and admin structure.
This task is only to improve the visual organization of the Insights listing page.

--------------------------------------------------
OBJECTIVES

Adjust the Insights page with these 3 improvements:

1) Make the hero/banner follow the exact same structural style used in the main first-level pages such as:
- Services
- Industries
- Case Studies

2) Keep search + tag/category filtering, but place them together in a single horizontal line.

3) Replace the normal blog card grid with a modular editorial-style grid inspired by the uploaded reference:
- visually dynamic
- modular
- elegant
- still clean and corporate
- fully responsive
- fully CMS-driven
- scalable as new articles are created from the admin

The final result must feel more premium and designed, but still consistent with iData’s corporate visual system.

--------------------------------------------------
1) HERO / BANNER ADJUSTMENT

Component: insights-hero

Update the Insights page hero so it matches the same visual and structural system already used in:
- Services
- Industries
- Case Studies

Requirements:
- same container logic
- same spacing rhythm
- same alignment principles
- same visual hierarchy
- same general banner behavior
- same compact height logic already approved for the site

Content inside hero:

ES
Title: Insights
Subtitle: Ideas, tendencias y experiencias sobre datos, analítica e inteligencia artificial.

EN
Title: Insights
Subtitle: Ideas, trends and experiences about data, analytics and artificial intelligence.

Rules:
- do not make the hero oversized
- do not create a second intro section below
- this banner must already contain the title and intro text
- visually it must clearly belong to the same family as Services / Industries / Case Studies

--------------------------------------------------
2) SEARCH + FILTERS IN ONE SINGLE ROW

Component wrapper: insights-toolbar

Take the current search and filtering system and reorganize it into one clean horizontal row.

The row must include:
- search input
- tags / category filters
- optional clear filters action if needed

Behavior:
- one single aligned row on desktop
- on tablet/mobile it can wrap into 2 rows if necessary, but the design intention is one unified toolbar

Desktop layout recommendation:
[ Search field........................ ] [ Filter chips / tags ......................... ]

Search:
- keep search by title, tags and content
- keep dynamic-ready logic

Filters:
- keep tags and/or categories dynamic-ready
- use chips or pills
- active state must be clear
- hover and selected states must be subtle and elegant

Visual direction:
- very clean
- professional
- no bulky filter bar
- integrated with the site aesthetic
- enough spacing to breathe

Important:
This toolbar must feel like part of the system, not like a blog plugin.

--------------------------------------------------
3) MODULAR EDITORIAL GRID FOR ARTICLES

Component: insights-editorial-grid

Replace the standard equal-card grid with a modular editorial grid inspired by the uploaded reference image.

IMPORTANT:
This is inspiration for layout behavior, not for copying colors or making it look like a lifestyle magazine.
Maintain the iData brand style:
- corporate
- technological
- clean
- premium
- modern

--------------------------------------------------
GRID CONCEPT

The article listing must behave like a modular masonry-style editorial grid built from predefined card size variants.

This means articles can render in different card proportions, for example:
- featured horizontal large
- vertical medium
- square medium
- horizontal medium
- standard small

But everything must still sit on a clean underlying grid system.

Use a modular pattern, not random placements.

The layout should feel curated but scalable.

--------------------------------------------------
GRID RULES

Build the grid using predefined article card variants:

Variant A — Hero Horizontal
- larger horizontal card
- used for featured or important article
- spans more columns than standard cards

Variant B — Tall Vertical
- portrait orientation
- good for strong image-led articles

Variant C — Standard Vertical
- balanced card for regular articles

Variant D — Wide Medium
- horizontal but smaller than hero

Variant E — Compact
- smaller fallback card

The system must assign cards into a repeating modular layout pattern so that when new articles are added from the CMS they continue to fall into a visually balanced structure.

Do NOT make every article manually positioned.
Do NOT make the layout depend on hand-crafted design every time.

The grid must be systematic and scalable.

--------------------------------------------------
CMS-DRIVEN GRID LOGIC

This is extremely important.

The admin will keep adding articles over time, so the grid must support growth automatically.

Create a layout system based on:
- article order
- optional featured flag
- optional card style field if needed

Recommended logic:

Option A (preferred):
Use a repeating pattern by index.
Example idea:
1st article = Variant A
2nd article = Variant C
3rd article = Variant B
4th article = Variant C
5th article = Variant D
6th article = Variant C
7th article = Variant B
8th article = Variant C
...then repeat pattern

Option B:
Allow CMS to define a display_variant field with allowed values:
- hero-horizontal
- tall
- standard
- wide
- compact

Best approach:
Support both:
- automatic fallback pattern by index
- optional CMS override field display_variant

This gives flexibility without breaking scalability.

--------------------------------------------------
ARTICLE CARD DESIGN

Component base: insights-article-card

All card variants must belong to the same component family.

Shared content structure:
- featured image
- category or tag label
- title
- optional short excerpt
- publish date
- reading time
- clickable area

Behavior:
- full card clickable
- subtle hover
- slight lift or image shift only
- no exaggerated animation

Visual style:
- clean corners consistent with site system
- elegant spacing
- strong typography
- image-forward but still readable
- no clutter

Important:
Because this is a corporate data consultancy, the cards should feel editorial and premium, not playful or consumer-blog style.

--------------------------------------------------
CONTENT PRIORITY BY CARD SIZE

Variant A — Hero Horizontal
Show:
- image
- category
- title
- excerpt
- date
- reading time

Variant B — Tall Vertical
Show:
- image
- category
- title
- date

Variant C — Standard Vertical
Show:
- image
- category
- title
- date

Variant D — Wide Medium
Show:
- image
- category
- title
- short excerpt optional

Variant E — Compact
Show:
- category
- title
- date

This creates variety while keeping consistency.

--------------------------------------------------
LAYOUT BEHAVIOR

Desktop:
- modular editorial grid with multiple spans
- clean gutters
- consistent baseline spacing
- visually balanced row rhythm

Tablet:
- simplify the pattern
- maintain visual hierarchy
- reduce span complexity
- still modular, but more controlled

Mobile:
- convert to a single-column stack or simplified 2-pattern rhythm
- do not force masonry chaos on mobile
- preserve editorial feel through alternating image ratios and spacing

--------------------------------------------------
TECHNICAL IMPLEMENTATION GUIDANCE

Build this as a maintainable layout system, not a static artboard.

Use:
- reusable grid wrapper
- reusable article card family
- size variants via props/classes
- predictable CSS classes
- scalable responsive rules

Avoid:
- absolute-positioned random cards
- manual hardcoded placement
- layouts that break when article count changes
- visual dependency on fixed number of posts

Prefer:
- CSS grid with column/row spans
- variant-driven cards
- pattern assignment logic
- dynamic rendering from CMS list

Example implementation idea:
- render article list from CMS
- assign a variant class based on display_variant or index
- place cards in a CSS grid with predefined spans
- ensure automatic flow still looks balanced

--------------------------------------------------
ADMIN / CMS REQUIREMENTS

Keep existing CMS logic and make sure article cards can still be created from the admin with fields such as:

title_es
title_en
slug_es
slug_en
summary_es
summary_en
content_es
content_en
category
tags
featured_image
publish_date
reading_time
featured
display_variant
seo_title_es
seo_title_en
seo_description_es
seo_description_en
social_image
status

New optional field:
display_variant

Allowed values:
- hero-horizontal
- tall
- standard
- wide
- compact

If display_variant is empty, assign automatically by layout pattern.

--------------------------------------------------
BILINGUAL RULES

Keep everything bilingual.
The page must exist in:
- /es/insights
- /en/insights

All article cards must link to the equivalent localized route.

Language switch must keep the user on the equivalent page/article and never redirect to home.

--------------------------------------------------
DO NOT CHANGE

Do NOT remove:
- search logic
- filter logic
- tag logic
- article detail logic
- CMS structure
- SEO fields
- bilingual architecture

Only improve:
- hero consistency
- toolbar layout
- article listing grid design

--------------------------------------------------
FINAL RESULT

Create a refined Insights page where:
- the hero matches the rest of the site system
- search and filters live in one elegant toolbar row
- articles appear in a modular editorial grid inspired by the reference image
- the layout is dynamic and scalable from the CMS
- new posts can be added without redesigning the page
- the page feels premium, structured, modern and aligned with iData’s corporate design system