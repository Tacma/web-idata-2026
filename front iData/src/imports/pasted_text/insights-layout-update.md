PROJECT: iData Website
TASK: Fix Insights grid layout and add blog sidebar

IMPORTANT:
Do NOT change CMS logic or article data structure.
Only improve the layout.

--------------------------------------------------

GRID STRUCTURE FIX

The Insights grid must use a fixed 4 column layout.

Cards must NEVER change width.

Each article card must occupy exactly 1 column.

Example layout:

| card | card | card | card |
| card | card | card | card |

The only element allowed to vary in size is the image height.

--------------------------------------------------

CARD RULES

Each card must contain:

image
category
title
date
reading time
read more

Important:

The text section must always remain below the image.

Text blocks must have fixed height rules.

Cards must never stretch vertically because of text.

Only the image block should change height.

--------------------------------------------------

CARD IMAGE VARIANTS

Create image height variants:

variant-small
variant-medium
variant-large

These variants only change the image container height.

Examples:

small → 180px
medium → 240px
large → 320px

The card width always stays the same.

--------------------------------------------------

GRID BEHAVIOR WITH CMS

Articles come dynamically from CMS.

The layout must assign image variants automatically based on index.

Example pattern:

1 → large
2 → medium
3 → small
4 → medium
5 → small
6 → large

Repeat pattern.

Admin may optionally override with:

display_variant

Allowed values:

small
medium
large

--------------------------------------------------

BLOG SIDEBAR

Add a right sidebar to the Insights listing page.

Layout:

Main content 70%
Sidebar 30%

Sidebar must contain:

1 Search

Search insights...

2 Tags

AI
Data Governance
Analytics
Machine Learning
Cloud
Data Architecture
Power BI
Data Strategy

3 Suggested articles

Show 3 recent posts.

4 iData social networks

LinkedIn
Twitter/X
YouTube
Facebook

Use official iData links.

--------------------------------------------------

RESPONSIVE

Desktop

4 column grid + sidebar

Tablet

2 column grid
sidebar moves below content

Mobile

1 column grid
sidebar content stacked below

--------------------------------------------------

FINAL RESULT

The Insights page must feel:

clean
editorial
modern
structured

Similar to a professional technology blog.

Do not create stretched cards or random masonry layouts.