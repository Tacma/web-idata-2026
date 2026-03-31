PROJECT: iData Website
PAGE: Insights → Article Detail
TASK: Redesign the article detail layout to a more editorial style and fully implement the modular content system with real article content.

IMPORTANT
Do NOT change routing or CMS structure.
Do NOT remove SEO fields.
Do NOT remove bilingual support.

This task must:

1) Improve the article layout to feel editorial (like professional magazines or tech publications).
2) Import the real content from current iData articles.
3) Implement the modular content sections that can be controlled from the admin.

The result must feel like a professional editorial article, not a generic blog template.

--------------------------------------------------

EDITORIAL LAYOUT STRUCTURE

Redesign the article page with a magazine-style layout.

Layout grid:

| left share column | main article | optional right media |

Desktop layout:

Column 1 (narrow)
Social share icons

Column 2 (main content)
Article content

Column 3 (optional)
Images, highlights, or related content

Main text width must stay around 680–760px for readability.

--------------------------------------------------

ARTICLE HEADER

Structure:

1 Featured Image
2 Category Tag
3 Article Title
4 Subtitle
5 Metadata
6 Author / Share

Featured image must remain compact in height.

Image height approx 260px.

Do NOT create a huge hero banner.

--------------------------------------------------

ARTICLE HEADER CONTENT

Example:

Category tag

Data Analytics

Title

Big Data Trends 2025

Subtitle

Analysis of the most important Big Data trends for 2025.

Metadata

March 9, 2025
12 min read

--------------------------------------------------

LEFT SHARE COLUMN

Add a vertical share column on the left side.

Sticky while scrolling.

Icons:

LinkedIn
Twitter/X
Facebook
Copy link

This makes the article feel more editorial.

--------------------------------------------------

ARTICLE BODY (MODULAR SECTIONS)

Replace the single text block with a modular article builder.

The article must support the following content blocks from the admin:

--------------------------------------------------

SECTION TYPE
Main Image

Large editorial image.

Fields:

image
caption
alt text

--------------------------------------------------

SECTION TYPE
Text Block

Fields:

title
text

Supports headings and paragraphs.

--------------------------------------------------

SECTION TYPE
Subheading

Fields:

heading

Used to structure long articles.

--------------------------------------------------

SECTION TYPE
Image + Text

Fields:

image
image position (left/right)

text

--------------------------------------------------

SECTION TYPE
Quote

Fields:

quote
author

Large editorial quote.

--------------------------------------------------

SECTION TYPE
Bullet List

Fields:

items

--------------------------------------------------

SECTION TYPE
Stats / Highlights

Fields:

value
description

Used for key numbers.

--------------------------------------------------

SECTION TYPE
Links Section

Fields:

title
links

Used for references or resources.

--------------------------------------------------

SECTION TYPE
Buttons / CTA

Fields:

title
button label
url

Example:

Explore our Data Services

--------------------------------------------------

SECTION TYPE
Social Links

Fields:

network
url

Networks:

LinkedIn
Twitter
YouTube
Facebook

--------------------------------------------------

SECTION TYPE
Divider

Used to break sections.

--------------------------------------------------

SECTION TYPE
Download

Fields:

title
file

Used for reports or PDFs.

--------------------------------------------------

SECTION TYPE
Logo Strip

Fields:

logos[]

Used for technology partners.

--------------------------------------------------

SECTION TYPE
Embedded Media

Fields:

embed_url

Used for video or presentations.

--------------------------------------------------

ARTICLE CONTENT IMPORT

Populate the system with the real content from these iData articles:

Lakehouse Architecture: The Future of Data Storage
Generative AI in Enterprise: Practical Use Cases
Data Governance: Best Practices for 2025
Cloud Cost Optimization: Effective Strategies
Power BI vs Tableau: 2025 Comparison
Modern Data Platforms for AI
Scaling Analytics in Enterprise Organizations
The Role of Data Governance in AI Projects
From Data Warehouse to Lakehouse
Building Data Culture in Organizations

Do NOT shorten the content.

Articles must remain long-form.

--------------------------------------------------

TYPOGRAPHY

Improve readability.

Article title large.

Subtitles medium.

Paragraph line-height generous.

Paragraph spacing consistent.

Avoid dense text blocks.

--------------------------------------------------

END OF ARTICLE

Add section:

More Insights

Show 3 related articles.

Cards contain:

image
title
date

Clicking opens the article.

Page must scroll to top when opening another article.

--------------------------------------------------

FINAL RESULT

The article page must feel:

editorial
premium
structured
easy to read

similar to modern tech publications.

It must support long-form content and modular sections from the admin.