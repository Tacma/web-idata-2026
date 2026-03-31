PROJECT: iData Corporate Website
PAGE: Insights / Article Detail
TASK: Improve the blog article detail page so it becomes more flexible, richer for long-form content, fully manageable from the admin, and connected to navigation toward other news/articles.

IMPORTANT:
Do NOT break the existing bilingual architecture, CMS structure, SEO fields, or routing logic.
Do NOT redesign the whole site.
This task is to improve the ARTICLE DETAIL experience and its content model.

--------------------------------------------------
OBJECTIVES

Adjust the Insights article detail page with these improvements:

1) Keep the same image from the article card at the top of the detail page, but with a very short height.
2) Make the article body fully modular from the admin, so long iData articles can be built with flexible content sections.
3) Add navigation at the end of the article so users can continue exploring other news/articles from there.

The final result must feel:
- clean
- editorial
- premium
- corporate
- easy to read
- scalable for very long articles
- fully CMS-manageable
- bilingual
- SEO-ready

--------------------------------------------------
1) TOP IMAGE / ARTICLE HEADER IMAGE

Component: insights-article-top-media

Requirement:
The same image used in the article card must also appear at the beginning of the article detail page.

But:
- it should be much shorter in height
- it should feel like a slim visual header, not a giant hero
- it must help the user understand they opened that same article

Design direction:
- full-width inside the site container
- short vertical height
- elegant crop
- maintain image quality
- soft rounded corners if consistent with site system

Recommended behavior:
- use the article featured image
- height should be compact and controlled
- the article title and metadata should appear below this image, not over it unless that is already part of the site system

Content order recommendation:
1. small top image
2. category/tag label
3. article title
4. metadata
5. article body

--------------------------------------------------
2) FLEXIBLE MODULAR ARTICLE BODY FROM ADMIN

Component system: insights-article-builder

iData articles can be long and content-heavy, so the article detail page must be built from modular content blocks that can be added from the admin.

Do NOT rely on one single rich-text blob only.

Create a flexible content builder / block-based structure so the admin can compose each article using multiple section types.

The admin must be able to add, reorder, duplicate, and remove sections.

Each block must be bilingual-ready:
- Spanish content
- English content
when applicable

--------------------------------------------------
REQUIRED CONTENT BLOCK TYPES

Create a modular content model with at least these block types:

1. Header Image
Block type: header_image
Use for large visual separators or intro visuals inside the article.

Fields:
- image
- alt_text_es
- alt_text_en
- caption_es
- caption_en

--------------------------------------------------
2. Rich Text Section
Block type: rich_text
Use for paragraphs, headings, emphasized text, inline links.

Fields:
- content_es
- content_en

--------------------------------------------------
3. Image + Text
Block type: image_text
Use for sections with an image and explanatory text side by side.

Fields:
- image
- image_position (left / right)
- title_es
- title_en
- text_es
- text_en
- caption_es
- caption_en

--------------------------------------------------
4. Image Only
Block type: image_only
Use for standalone image blocks inside the article.

Fields:
- image
- alt_text_es
- alt_text_en
- caption_es
- caption_en
- size_variant (full / medium / contained)

--------------------------------------------------
5. Logo Strip / Logo Group
Block type: logo_strip
Use for partner logos, client logos, technology logos, certification logos.

Fields:
- section_title_es
- section_title_en
- logos[]
Each logo item:
- image
- alt_text_es
- alt_text_en
- optional_link

--------------------------------------------------
6. Link List / Resources
Block type: links_list
Use for references, related links, downloadable resources, external sources.

Fields:
- section_title_es
- section_title_en
- items[]
Each item:
- label_es
- label_en
- url
- optional_description_es
- optional_description_en

--------------------------------------------------
7. Bullet List / Key Points
Block type: bullet_list
Use for highlights, conclusions, recommendations, steps, findings.

Fields:
- section_title_es
- section_title_en
- items_es[]
- items_en[]

--------------------------------------------------
8. Quote / Highlight Statement
Block type: quote
Use for important statements or editorial emphasis.

Fields:
- quote_es
- quote_en
- author_name
- author_role_es
- author_role_en

--------------------------------------------------
9. Statistics / KPI Highlights
Block type: stats
Use for data points or numeric highlights.

Fields:
- section_title_es
- section_title_en
- stats[]
Each stat:
- value
- label_es
- label_en
- description_es
- description_en

--------------------------------------------------
10. CTA Banner
Block type: cta_banner
Use for inviting users to contact iData, explore a service, or read a case study.

Fields:
- title_es
- title_en
- text_es
- text_en
- button_label_es
- button_label_en
- button_url_es
- button_url_en
- optional_background_image

--------------------------------------------------
11. Two-Column Text
Block type: two_column_text
Use for longer structured sections that benefit from splitting content into two columns on desktop.

Fields:
- title_es
- title_en
- left_content_es
- left_content_en
- right_content_es
- right_content_en

--------------------------------------------------
12. Divider / Spacer
Block type: divider
Use for rhythm and content separation.

Fields:
- style_variant (line / space / subtle graphic)

--------------------------------------------------
13. Embedded Media
Block type: embed
Use for video, iframe, charts, presentations or interactive embeds.

Fields:
- embed_url
- title_es
- title_en
- caption_es
- caption_en

--------------------------------------------------
14. Table
Block type: table
Use for structured comparisons or data summaries.

Fields:
- title_es
- title_en
- columns[]
- rows[]
- optional_note_es
- optional_note_en

--------------------------------------------------
15. Downloadable File
Block type: download
Use for PDFs, reports, one-pagers, guides.

Fields:
- title_es
- title_en
- file_url
- button_label_es
- button_label_en
- description_es
- description_en

--------------------------------------------------
16. Related Service Highlight
Block type: related_service
Use for connecting article content to an iData service.

Fields:
- service_reference
- custom_title_es
- custom_title_en
- custom_text_es
- custom_text_en

--------------------------------------------------
17. Related Industry Highlight
Block type: related_industry
Use for connecting the article to a specific industry.

Fields:
- industry_reference
- custom_title_es
- custom_title_en
- custom_text_es
- custom_text_en

--------------------------------------------------
18. Author Box
Block type: author_box
Use when an article requires an author presentation at the end or middle of the article.

Fields:
- author_name
- author_role_es
- author_role_en
- author_photo
- bio_es
- bio_en
- linkedin_url

--------------------------------------------------
CONTENT BUILDER RULES

- Admin must be able to stack these blocks in any order
- blocks must be reusable
- blocks must be optional
- each article can have a completely different composition
- all blocks must remain visually within the same editorial system
- long articles must still feel organized and easy to scan

Important:
The article page must not feel like one endless wall of text.
Use rhythm, spacing, section separation and hierarchy.

--------------------------------------------------
ARTICLE DETAIL LAYOUT RECOMMENDATION

Order:

1. top compact image
2. category / tags
3. title
4. metadata
5. optional short summary
6. modular content blocks
7. share section
8. continue reading / related articles

--------------------------------------------------
3) NAVIGATION TO OTHER NEWS AT THE END

Component: insights-article-related-news

At the end of each article, add a section that allows users to continue browsing other insights/news.

Section title:
ES → Otras noticias e insights
EN → More news and insights

Behavior:
- show 3 related articles
- relation can be based on category, tags, or latest published articles
- cards should reuse the same visual language of the Insights listing system
- clicking a card must open the selected article
- when entering another article from here, scroll to top automatically

Implement smooth scroll to top when navigating to another article:
window.scrollTo({
  top: 0,
  behavior: "smooth"
})

This is important so users clearly understand a new article has loaded.

--------------------------------------------------
RELATED ARTICLE CARD CONTENT

Component: insights-related-article-card

Show:
- image
- category/tag
- title
- publish date
- optional reading time

Make the full card clickable.

--------------------------------------------------
SOCIAL SHARING

Keep or improve the share section near the end of the article.

Networks:
- LinkedIn
- Twitter/X
- Facebook

Make it elegant and compact.

--------------------------------------------------
CMS / ADMIN STRUCTURE UPDATE

Keep the existing article collection, but expand it to support modular content blocks.

COLLECTION: insights_articles

Existing fields remain, including:
- title_es
- title_en
- slug_es
- slug_en
- summary_es
- summary_en
- category
- tags
- related_services
- related_industries
- author
- publish_date
- reading_time
- featured_image
- featured
- display_variant
- seo_title_es
- seo_title_en
- seo_description_es
- seo_description_en
- social_image
- status

Add:
- content_blocks[]  ← flexible modular content builder

Each block entry should include:
- block_type
- sort_order
- locale-aware content fields depending on block type

--------------------------------------------------
BILINGUAL RULES

Everything must support ES and EN.

Routes:
- /es/insights/{slug}
- /en/insights/{slug}

Language switch must keep the user on the equivalent article, never redirect to home.

All modular block content must support localized values where applicable.

--------------------------------------------------
RESPONSIVE RULES

Desktop:
- article content centered with comfortable reading width
- image+text blocks can show 2 columns
- logo strips and tables must stay clean

Tablet:
- simplify side-by-side blocks when needed

Mobile:
- all blocks stack gracefully
- text remains readable
- images stay proportional
- links and CTA elements remain easy to tap

--------------------------------------------------
VISUAL DIRECTION

The article detail page must feel:
- refined
- structured
- easy to read
- consistent with Services / Industries / Case Studies
- modern corporate editorial
- not like a generic blog template

Use:
- generous spacing
- clear hierarchy
- modular rhythm
- subtle separators
- high readability

Avoid:
- giant heavy hero
- cluttered article body
- plugin-like blog styles
- chaotic block spacing

--------------------------------------------------
FINAL RESULT

Create an article detail page where:
- the article card image carries into the detail page as a compact top image
- long-form iData articles can be built from many modular admin-managed section types
- users can navigate to other insights/news at the end of the article
- the whole system stays scalable, bilingual, SEO-ready, and aligned with the iData design system