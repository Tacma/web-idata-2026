PROJECT: iData Corporate Website
PAGE: Insights (Blog)
LANGUAGES: Spanish (ES) / English (EN)

OBJECTIVE
Design and generate the complete INSIGHTS section for the iData corporate website.

The page must support:
- scalable article management
- CMS connectivity
- SEO optimization
- bilingual structure
- tags and search
- social sharing
- responsive layout

The design must follow the existing iData visual system:
clean
modern
technological
corporate
minimal
with soft micro-interactions.

Avoid visual noise or heavy animations.

--------------------------------------------------

GLOBAL COMPONENT RULES

All elements must be built as reusable components.

Use consistent naming.

Component prefix: insights-

Example:
insights-hero
insights-search
insights-filter-tabs
insights-card
insights-grid
insights-article-layout
insights-related
insights-share

Use clean CSS structure and modular layout.

Avoid hardcoded content.

All content must be dynamic-ready for CMS.

--------------------------------------------------

BILINGUAL STRUCTURE

All content must support ES and EN.

Routes:

/es/insights
/en/insights

Article example:

/es/insights/lakehouse-architecture
/en/insights/lakehouse-architecture

Language switch must keep the same article slug.

Never redirect to home.

--------------------------------------------------

INSIGHTS PAGE STRUCTURE

SECTION 1 — HERO

Component: insights-hero

Compact hero banner with:

Title:
ES → Insights
EN → Insights

Subtitle:
ES → Ideas, tendencias y experiencias sobre datos, analítica e inteligencia artificial.
EN → Ideas, trends and experiences about data, analytics and artificial intelligence.

Optional CTA:
Explore articles

Layout:
left aligned text
subtle background pattern or tech image

Hero must remain compact.

--------------------------------------------------

SECTION 2 — SEARCH BAR

Component: insights-search

Centered search field.

Placeholder:

ES:
Buscar insights...

EN:
Search insights...

Search must support:

title
tags
content

Include search icon.

Soft hover interaction.

--------------------------------------------------

SECTION 3 — CATEGORY FILTER TABS

Component: insights-filter-tabs

Horizontal category filters.

Categories:

All
Data Strategy
Artificial Intelligence
Data Engineering
Analytics & BI
Cloud & Architecture
Industry Insights
Company News

Each category should filter articles dynamically.

Active state highlight.

Scrollable on mobile.

--------------------------------------------------

SECTION 4 — FEATURED INSIGHT

Component: insights-featured

Display the most recent or featured article.

Layout:

Large image
Category label
Title
Short summary
Author
Date
Reading time

CTA:
Read article

This component must support CMS flag:

featured = true

--------------------------------------------------

SECTION 5 — ARTICLES GRID

Component: insights-grid

Responsive grid layout.

Desktop:
3 columns

Tablet:
2 columns

Mobile:
1 column

Cards use component: insights-card

Each card contains:

featured image
category label
title
excerpt
publish date
reading time
tags

Card interactions:

hover elevation
image zoom subtle
clickable full card

--------------------------------------------------

SECTION 6 — LOAD MORE / PAGINATION

Component: insights-pagination

Load more button or pagination.

Prefer load more.

Text:

ES → Cargar más artículos
EN → Load more articles

--------------------------------------------------

ARTICLE DETAIL PAGE

Component: insights-article-layout

URL:

/es/insights/{slug}
/en/insights/{slug}

Structure:

ARTICLE HERO

large cover image

CATEGORY LABEL

ARTICLE TITLE

METADATA BAR

author
publish date
reading time

Example:

Mar 12, 2026 · 6 min read

--------------------------------------------------

ARTICLE CONTENT

Rich text support.

Content blocks:

paragraph
heading
image
quote
list
code block
data visualization embed

Max reading width: 760px

--------------------------------------------------

TAGS SECTION

Component: insights-tags

Clickable tags.

Example:

Machine Learning
Lakehouse
Data Governance
Power BI
Azure
Databricks
Data Culture

Clicking a tag filters insights page.

--------------------------------------------------

SOCIAL SHARE

Component: insights-share

Icons:

LinkedIn
Twitter/X
Facebook

Must include OpenGraph support.

--------------------------------------------------

RELATED ARTICLES

Component: insights-related

Display 3 articles related by:

category
tags

Layout: 3 cards.

--------------------------------------------------

CMS DATA MODEL

Create CMS structure for article content.

COLLECTION: insights_articles

Fields:

title_es
title_en

slug_es
slug_en

summary_es
summary_en

content_es
content_en

category

tags (multi-select)

related_services

related_industries

author

publish_date

reading_time

featured_image

featured (boolean)

seo_title_es
seo_title_en

seo_description_es
seo_description_en

social_image

status:
draft
published

--------------------------------------------------

SEO STRUCTURE

Each article must generate:

title tag
meta description
OpenGraph image
clean slug

Example:

/es/insights/lakehouse-architecture
/en/insights/lakehouse-architecture

--------------------------------------------------

RESPONSIVE DESIGN

Desktop
Tablet
Mobile

Ensure:

search collapses cleanly
filters become scrollable
cards stack vertically
images remain proportional

--------------------------------------------------

ADMIN MANAGEMENT REQUIREMENTS

Admin must be able to:

create article
edit article
upload images
assign category
assign tags
assign related services
assign related industries
set featured article
schedule publish date

No hardcoded categories.

Use controlled category list.

--------------------------------------------------

FINAL GOAL

Generate a scalable, SEO-ready, CMS-connected Insights system suitable for a modern data consultancy website.