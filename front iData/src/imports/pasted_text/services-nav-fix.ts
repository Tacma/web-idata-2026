PROJECT: iData Corporate Website
TASK: Fix navigation and behavior for Services section
CONTEXT: Services cards and cross-navigation inside service detail pages were altered and some links or behaviors are broken. Fix the logic without changing the visual design.

--------------------------------------------------

OBJECTIVE

Correct the navigation logic for the Services section so that:

1) Each "Ver servicio / View service" button correctly opens the corresponding service detail page.
2) The "Explora otros servicios / Explore other services" section at the bottom of each service page correctly navigates to the other services.
3) When navigating to another service from that section, the page automatically scrolls to the top so the new service loads clearly.

Do NOT redesign the UI. Only fix navigation, routing and behavior.

--------------------------------------------------

SERVICES STRUCTURE (EXISTING PAGES)

Ensure these routes exist and are connected:

Spanish

/es/servicios/strategy-consulting
/es/servicios/data-delivery
/es/servicios/data-operations
/es/servicios/cloud-services-provider

English

/en/services/strategy-consulting
/en/services/data-delivery
/en/services/data-operations
/en/services/cloud-services-provider

Each card must link to the corresponding page.

--------------------------------------------------

FIX SERVICE CARDS (HOME / SERVICES PAGE)

Component: services-card

Each card must link to the correct route.

Mapping:

Strategy & Consulting  
→ /es/servicios/strategy-consulting  
→ /en/services/strategy-consulting  

Data Delivery  
→ /es/servicios/data-delivery  
→ /en/services/data-delivery  

Data Operations  
→ /es/servicios/data-operations  
→ /en/services/data-operations  

Cloud Services Provider  
→ /es/servicios/cloud-services-provider  
→ /en/services/cloud-services-provider  

The button "Ver servicio / View service" must trigger navigation to the correct page.

The entire card should also be clickable.

--------------------------------------------------

FIX "EXPLORE OTHER SERVICES" SECTION

Component: services-related

Location:
Bottom of each service detail page.

Example:

If user is inside:

/servicios/data-delivery

Show the other 3 services:

Strategy & Consulting  
Data Operations  
Cloud Services Provider

Do NOT show the current service.

--------------------------------------------------

RELATED SERVICE CARD STRUCTURE

Component: services-related-card

Elements:

service image  
service title  
short description  
link text:  

ES → Ver servicio  
EN → View service  

Click behavior:

Navigate to the selected service page.

--------------------------------------------------

SCROLL BEHAVIOR (VERY IMPORTANT)

When user selects another service from the "Explora otros servicios" section:

1) Load the new service page
2) Automatically scroll to top

Implement:

window.scrollTo({
  top: 0,
  behavior: "smooth"
})

This ensures the new service loads from the beginning of the page.

--------------------------------------------------

LANGUAGE CONSISTENCY

When switching services, preserve language.

Example:

/es/servicios/data-delivery  
→ selecting Strategy  

must go to  

/es/servicios/strategy-consulting

NOT the English version.

Same logic for EN.

--------------------------------------------------

CMS COMPATIBILITY

Ensure services are treated as dynamic entities so the CMS can manage them.

Service fields should include:

service_name_es  
service_name_en  

slug_es  
slug_en  

short_description_es  
short_description_en  

hero_image  

icon  

service_order  

status  

--------------------------------------------------

COMPONENT REUSABILITY

Ensure components are reusable:

services-card  
services-related  
services-related-card  

Avoid duplicate implementations.

--------------------------------------------------

FINAL RESULT

Users must be able to:

- click any service card
- open the correct service page
- navigate between services easily
- clearly understand that a new service page loaded
- always land at the top of the page

All while preserving the existing UI design.