PROJECT: iData Global Website
PAGE: Insights → Article Detail
TASK: Fix social links, share behavior, redundant sections, and enforce visual consistency with the rest of the site.

IMPORTANT
Do NOT invent information.
Do NOT use placeholder social links.
All external links must come from the real iData Global website.

Reference site:
https://idata.global

--------------------------------------------------

1) SOCIAL NETWORK CORRECTION

Remove any social networks that are not present on the official iData Global website.

Delete any links to:

Twitter/X
Facebook
YouTube
Instagram

if they are not explicitly present on the real site.

Only keep the official networks that exist in the current website footer or contact section.

Do not guess URLs.

Use only verified company links.

--------------------------------------------------

2) SHARE BUTTON FIX

Currently there are duplicated sharing controls.

Remove the current icon-only sharing controls.

Replace them with ONE single button.

Button label:

ES
Compartir

EN
Share

--------------------------------------------------

SHARE INTERACTION

When clicking the share button:

Open a small modal or dropdown.

Title:

Compartir este artículo
Share this article

Inside the modal show the available platforms.

These options must appear only AFTER the user clicks Share.

Possible options:

LinkedIn
Copy Link
Email

If other networks exist on the official site they can be added.

Each option must generate a real share action for the article URL.

Example behavior:

LinkedIn
opens LinkedIn share dialog

Copy Link
copies article URL

Email
opens email client with article link

--------------------------------------------------

3) REMOVE REDUNDANT ARTICLE SECTION

Currently the page has two sections:

"Otras noticias e insights"
and
"Explorar todos los insights"

This is redundant.

Keep ONLY ONE section.

Final section title:

ES
Otras noticias e insights

EN
More insights

Remove the other section completely.

--------------------------------------------------

4) MATCH DESIGN WITH OTHER DETAIL PAGES

The bottom section must follow the same visual structure used in:

Case Studies detail pages
Services detail pages

Use the same container width.

Use the same card component style.

Do NOT introduce a new card design.

--------------------------------------------------

RELATED ARTICLES COMPONENT

Component: insights-related-articles

Display 3 cards.

Card structure:

image
publish date
reading time
title
link text

ES
Leer más →

EN
Read more →

Cards must be identical to the cards used in the Insights listing page.

--------------------------------------------------

NAVIGATION BEHAVIOR

When a user clicks another article:

1) open the new article
2) scroll page to top

Use:

window.scrollTo({
top: 0,
behavior: "smooth"
})

--------------------------------------------------

SIDEBAR CLEANUP

In the sidebar keep only:

Search
Tags
Suggested Articles

Remove any social widgets from the sidebar if they are not verified from the real site.

--------------------------------------------------

FINAL RESULT

The article page must:

have only one share control
use verified company social links
remove redundant insight sections
follow the same visual language as other detail pages
keep the layout clean and consistent with the rest of the site.