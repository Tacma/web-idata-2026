PROJECT: iData Corporate Website
PAGE: Insights → Article Detail
TASK: Populate the article detail template with REAL content from the current iData website and upgrade the article body so it supports a modular content builder controlled from the admin.

IMPORTANT
Do NOT change routing, CMS collection names, bilingual structure, SEO fields, or article listing logic.

This task has two goals:

1) Bring the REAL content from the current iData articles (the long ones currently published).
2) Convert the article body into a modular section system so the admin can build long-form articles easily.

The article page must remain:
clean
corporate
editorial
high readability
scalable for long content

--------------------------------------------------
1) IMPORT REAL ARTICLE CONTENT

Pull real content from the currently published iData articles.

Use at least these articles as initial dataset:

Lakehouse Architecture: The Future of Data Storage  
Generative AI in Enterprise: Practical Use Cases  
Data Governance: Best Practices for 2025  
Cloud Cost Optimization: Effective Strategies  
Power BI vs Tableau: 2025 Comparison  
Building Data Culture in Organizations  
Modern Data Platforms for AI  
Scaling Analytics in Enterprise Organizations  
The Role of Data Governance in AI Projects  
From Data Warehouse to Lakehouse

For each article import:

title
summary
publish date
reading time
featured image
article body content

Do not shorten the article body.

These articles are intentionally long and must remain long.

--------------------------------------------------
2) ARTICLE DETAIL LAYOUT STRUCTURE

Component: insights-article-layout

Structure order:

1 Featured Image (short height)
2 Article Metadata
3 Article Title
4 Optional Summary
5 Modular Content Sections
6 Social Sharing
7 Continue Reading / Related Articles

--------------------------------------------------
3) FEATURED IMAGE (FROM CARD)

Component: article-top-image

Use the same image used in the article card.

But with controlled height.

Rules:

- full width inside container
- short height (approx 220–260px)
- image cropped elegantly
- image never pushes title down excessively

--------------------------------------------------
4) ARTICLE METADATA

Component: article-meta

Display:

publish date
reading time
optional category tag

Example:

March 7, 2025 · 8 min read

--------------------------------------------------
5) MODULAR ARTICLE BUILDER

Replace the single body text with a flexible section builder.

Admin must be able to add multiple sections to compose the article.

Each section type must be reusable.

Sections must be reorderable.

Sections must support ES and EN content.

--------------------------------------------------
6) AVAILABLE CONTENT SECTION TYPES

Create the following block types.

--------------------------------------------------

SECTION TYPE 1
Hero Image

block_type: hero_image

Fields:

image
alt_text_es
alt_text_en
caption_es
caption_en

Used for major article visuals.

--------------------------------------------------

SECTION TYPE 2
Text Section

block_type: text

Fields:

title_es
title_en
text_es
text_en

Used for paragraphs and explanation blocks.

--------------------------------------------------

SECTION TYPE 3
Subtext / Highlight Paragraph

block_type: subtext

Fields:

text_es
text_en

Used for emphasis, key takeaways, or highlighted statements.

Styled slightly larger than normal text.

--------------------------------------------------

SECTION TYPE 4
Image + Text

block_type: image_text

Fields:

image
image_position (left / right)

title_es
title_en

text_es
text_en

caption_es
caption_en

Used for explanatory sections.

--------------------------------------------------

SECTION TYPE 5
Image Only

block_type: image

Fields:

image
alt_text_es
alt_text_en
caption_es
caption_en

size_variant:

small
medium
large

--------------------------------------------------

SECTION TYPE 6
Buttons / CTA

block_type: buttons

Fields:

title_es
title_en

buttons[]

Each button:

label_es
label_en
url
style_variant (primary / secondary)

Example use:

Explorar servicios  
Contactar a iData  
Ver caso de éxito

--------------------------------------------------

SECTION TYPE 7
Links List

block_type: links

Fields:

title_es
title_en

links[]

Each link:

label_es
label_en
url
description_es
description_en

Used for references or resources.

--------------------------------------------------

SECTION TYPE 8
Bullet List

block_type: list

Fields:

title_es
title_en

items_es[]
items_en[]

Used for structured points.

--------------------------------------------------

SECTION TYPE 9
Quote

block_type: quote

Fields:

quote_es
quote_en

author_name
author_role_es
author_role_en

Used for highlighted insights.

--------------------------------------------------

SECTION TYPE 10
Statistics

block_type: stats

Fields:

title_es
title_en

stats[]

Each stat:

value
label_es
label_en
description_es
description_en

--------------------------------------------------

SECTION TYPE 11
Logo Strip

block_type: logos

Fields:

title_es
title_en

logos[]

Each logo:

image
alt_text_es
alt_text_en
url_optional

--------------------------------------------------

SECTION TYPE 12
Social Links Section

block_type: social_links

Fields:

title_es
title_en

networks[]

Supported networks:

LinkedIn
Twitter/X
YouTube
Facebook

Must support official iData accounts.

--------------------------------------------------

SECTION TYPE 13
Divider

block_type: divider

Used to visually separate sections.

--------------------------------------------------

SECTION TYPE 14
Embedded Media

block_type: embed

Fields:

embed_url
title_es
title_en
caption_es
caption_en

Supports:

video
iframe
interactive charts
presentations

--------------------------------------------------

SECTION TYPE 15
Downloadable File

block_type: download

Fields:

title_es
title_en
file_url
button_label_es
button_label_en
description_es
description_en

--------------------------------------------------
7) ARTICLE BODY RULES

Articles may contain many sections.

Admin must be able to:

add
reorder
duplicate
remove

sections freely.

The layout must remain visually consistent.

--------------------------------------------------
8) SOCIAL SHARE

Component: article-share

Display:

LinkedIn
Twitter/X
Facebook

--------------------------------------------------
9) RELATED ARTICLES AT END

Component: article-related

Title:

ES
Otras noticias e insights

EN
More insights

Show 3 articles.

Based on:

same category
or similar tags
or latest posts.

Each card:

image
title
date
reading time

Card must link to the article.

When clicking another article:

scroll page to top automatically.

--------------------------------------------------
10) CMS DATA MODEL

COLLECTION: insights_articles

Keep existing fields and add:

content_blocks[]

Each block:

block_type
order
fields depending on block type

--------------------------------------------------
11) RESPONSIVE RULES

Desktop

article width optimized for reading
approx 720–820px text width

Tablet

reduce spacing
stack image_text sections

Mobile

all sections stack vertically
images remain proportional
text readable

--------------------------------------------------
FINAL RESULT

The article page must support:

very long editorial content
multiple section types
rich storytelling
structured readability

while remaining:

clean
corporate
modern
fully editable from the admin.