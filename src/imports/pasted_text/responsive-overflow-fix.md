TASK: Responsive overflow audit and fix.

The mobile version of the public site currently produces horizontal scrolling, which should never happen.

Example visible in the Services page:
the layout overflows to the right side creating a horizontal scroll.

Your task is to perform a responsive audit and fix the issue without changing the approved visual design.

IMPORTANT
Do NOT redesign the site.
Do NOT change layout structure or components.
Only fix CSS/layout issues that cause overflow.

--------------------------------------------------

STEP 1 — FIND ALL SOURCES OF HORIZONTAL OVERFLOW

Audit the entire public site and locate components causing overflow.

Common causes to check:

• elements using width: 100vw
• containers wider than the viewport
• padding that breaks container width
• components with fixed width
• images without max-width
• cards with min-width larger than mobile viewport
• flex containers without wrap
• negative margins
• grid columns overflowing the container

Check especially:

Hero sections
Service cards
CTA buttons
Image containers
Case study cards
Insights/blog cards
Footer layout
Header navigation
Mobile menu
Any grid layout

--------------------------------------------------

STEP 2 — ENSURE GLOBAL MOBILE SAFETY

Implement the following safeguards:

body, html
must not allow horizontal overflow.

Add if necessary:

overflow-x: hidden

But ONLY if the root cause is fixed first.

Containers must follow this pattern:

max-width: 100%
width: 100%
box-sizing: border-box

--------------------------------------------------

STEP 3 — FIX CONTAINER SYSTEM

Ensure the layout system respects the viewport.

Main page containers should use:

max-width layout pattern
not 100vw

Example safe pattern:

.container {
width: 100%;
max-width: 1200px;
margin: 0 auto;
padding-left: 16px;
padding-right: 16px;
}

Ensure padding does not cause overflow.

--------------------------------------------------

STEP 4 — CHECK CARD COMPONENTS

Service cards and content cards must:

• shrink correctly on mobile
• never exceed viewport width
• use flexible layout

Ensure:

width: 100%
max-width: 100%

Remove any fixed width or min-width that breaks mobile.

--------------------------------------------------

STEP 5 — CHECK IMAGES AND MEDIA

Images must never overflow their containers.

Apply:

max-width: 100%
height: auto

Ensure hero images and card images are responsive.

--------------------------------------------------

STEP 6 — VERIFY BREAKPOINTS

Verify responsive behavior for:

320px
375px
414px
768px
1024px

There must be:

NO horizontal scroll
NO elements cut off
NO overflow outside viewport

--------------------------------------------------

STEP 7 — FINAL CHECK

After the fix:

• scroll horizontally must be impossible
• layout must stay visually identical
• spacing must remain consistent
• responsive behavior must remain smooth

Do not change design — only correct layout overflow.