PROJECT: iData Global Website
TASK: Implement smart prefilled contact logic based on the page/section/CTA from which the user enters the contact flow.

IMPORTANT
Do NOT redesign the Contact page.
Do NOT change the visual system.
This task is about interaction logic, routing context, hidden metadata, and smart prefill behavior.

The goal is:
when a user clicks a CTA like “Contáctanos”, “Hablemos”, “Start a project”, “Request information”, etc. from any section of the site, the Contact page should already know where the lead came from and prefill relevant information in the form.

This logic must apply only to commercial/contact forms.
Do NOT apply this to Careers / Work With Us forms.

--------------------------------------------------
GENERAL OBJECTIVE

Create a smart lead-intent system so that every CTA that routes to Contact sends contextual information.

Examples:

If the user clicks from:
- a specific Service page
- a specific Industry page
- a specific Case Study page
- the Insights blog
- the Home page
- a CTA block inside a section

Then the Contact page should:
1. identify the origin
2. prefill relevant form values
3. store the origin in the database
4. send that context in the notification email to marketing@idata.global

--------------------------------------------------
HOW THE LOGIC SHOULD WORK

Every CTA that goes to the Contact page must pass contextual parameters.

Use query params, route state, or equivalent internal page state.

Preferred URL example:

/es/contacto?source_type=service&source_slug=data-operations&source_title=Data%20Operations&intent=request-information

/en/contact?source_type=industry&source_slug=retail-manufacturing&source_title=Retail%20and%20Manufacturing&intent=talk-to-an-expert

--------------------------------------------------
SUPPORTED SOURCE TYPES

The system must support these source types:

home
service
industry
case_study
insight
about
general_cta
footer
navbar

Optional extra:
campaign
landing_page

--------------------------------------------------
SUPPORTED CTA INTENTS

Each CTA should also send intent when possible.

Allowed intent values:

contact-commercial
request-information
start-project
talk-to-an-expert
book-consultation
learn-more
request-demo
discuss-service
discuss-industry
discuss-case-study

--------------------------------------------------
CTA EXAMPLES

Example 1
Service page CTA

From:
Data Operations page

CTA:
Contáctanos

Send:

source_type=service
source_slug=data-operations
source_title=Data Operations
intent=discuss-service

--------------------------------------------------
Example 2
Industry page CTA

From:
Retail y Manufactura

CTA:
Hablemos

Send:

source_type=industry
source_slug=retail-manufacturing
source_title=Retail y Manufactura
intent=discuss-industry

--------------------------------------------------
Example 3
Case Study CTA

From:
INS case study

CTA:
Solicitar información

Send:

source_type=case_study
source_slug=ins
source_title=INS
intent=request-information

--------------------------------------------------
Example 4
Insight article CTA

From:
Lakehouse Architecture article

CTA:
Habla con un especialista

Send:

source_type=insight
source_slug=lakehouse-architecture
source_title=Lakehouse Architecture
intent=talk-to-an-expert

--------------------------------------------------
CONTACT PAGE PREFILL BEHAVIOR

When the Contact page loads, detect incoming context and prefill these form fields when applicable.

Visible field prefills:

1. project_type
2. industry
3. message

Hidden metadata fields:
1. source_type
2. source_slug
3. source_title
4. source_url
5. source_language
6. source_cta_label
7. intent
8. campaign_id (optional)
9. referrer_path

--------------------------------------------------
PREFILL RULES

RULE 1 — If source_type = service

Prefill:
project_type = selected service

Examples:
Data Operations
Data Delivery
Strategy & Consulting
Cloud Services Provider

Message helper example:

ES:
Hola, quiero recibir más información sobre el servicio de [source_title].

EN:
Hello, I would like to receive more information about the [source_title] service.

--------------------------------------------------
RULE 2 — If source_type = industry

Prefill:
industry = selected industry

Message helper example:

ES:
Hola, quiero hablar con iData sobre soluciones para la industria [source_title].

EN:
Hello, I would like to talk with iData about solutions for the [source_title] industry.

--------------------------------------------------
RULE 3 — If source_type = case_study

Prefill message:

ES:
Hola, vi el caso de éxito [source_title] y me gustaría conocer una solución similar para mi empresa.

EN:
Hello, I saw the [source_title] case study and would like to explore a similar solution for my company.

Optionally prefill:
project_type = related service if mapped in CMS

--------------------------------------------------
RULE 4 — If source_type = insight

Prefill message:

ES:
Hola, leí el insight “[source_title]” y me gustaría hablar con un especialista sobre este tema.

EN:
Hello, I read the insight “[source_title]” and would like to speak with a specialist about this topic.

--------------------------------------------------
RULE 5 — If source_type = home or general_cta

No aggressive prefill.
Use only a generic helper message or leave the fields blank.

Example:

ES:
Hola, me gustaría recibir más información sobre los servicios de iData.

EN:
Hello, I would like to receive more information about iData’s services.

--------------------------------------------------
FORM FIELD BEHAVIOR

Visible prefilled values must remain editable by the user.

Important:
- prefill must help, not lock the user
- users can change the dropdowns and message
- helper message can disappear once user starts typing or can remain editable

--------------------------------------------------
CONTACT FORM FIELDS TO SUPPORT THIS LOGIC

Visible fields:
first_name
last_name
email
company
country
phone
project_type
industry
budget_range
timeline
message

Hidden system fields:
source_type
source_slug
source_title
source_url
source_language
source_cta_label
intent
referrer_path
submitted_from_page

--------------------------------------------------
DATABASE STORAGE

Collection: contact_submissions

Ensure every submission stores both user input and CTA context.

Required fields:

id
first_name
last_name
email
company
country
phone
project_type
industry
budget_range
timeline
message
language
source_page
submitted_at
status

Add these contextual fields:

source_type
source_slug
source_title
source_url
source_language
source_cta_label
intent
referrer_path
prefill_used (boolean)

--------------------------------------------------
EMAIL NOTIFICATION TO marketing@idata.global

Every internal notification email must include the lead context.

Email must include:

Name
Email
Company
Phone
Country
Project Type
Industry
Message
Source Type
Source Title
Intent
Source URL
Source CTA Label
Submission Timestamp

Subject example:

New website lead — [source_type] — [source_title]

Example:
New website lead — service — Data Operations

--------------------------------------------------
ADMIN PANEL LOGIC

In the admin panel, contact submissions must show the CTA origin clearly.

Add fields/views for:
- source type
- source title
- intent
- source page
- language
- submission date

Allow filtering by:
- service-origin leads
- industry-origin leads
- case-study-origin leads
- insight-origin leads

This will help marketing understand which page generated each lead.

--------------------------------------------------
CMS MAPPING SUPPORT

Add optional CMS mapping fields so pages can define what should be passed to contact.

For Services collection:
contact_prefill_project_type
contact_prefill_message_es
contact_prefill_message_en

For Industries collection:
contact_prefill_industry
contact_prefill_message_es
contact_prefill_message_en

For Case Studies collection:
contact_prefill_related_service
contact_prefill_message_es
contact_prefill_message_en

For Insights collection:
contact_prefill_message_es
contact_prefill_message_en

If these fields are empty, use default system-generated helper messages.

--------------------------------------------------
UX DETAILS

If the user arrives with prefilled context:
show a small contextual label above the form.

Examples:

ES:
Estás contactándonos sobre: Data Operations

EN:
You are contacting us about: Data Operations

This label should be subtle and removable if needed.

Do NOT make it look intrusive.

--------------------------------------------------
URL CLEANUP

If query params are used for context:
- use them to prefill the form on load
- after data is captured in page state, optionally keep or clean the URL depending on framework best practice
- do not lose the context before submission

--------------------------------------------------
RESPONSIVE

This logic must work on:
desktop
tablet
mobile

Prefill labels and helper text must remain readable and clean on all devices.

--------------------------------------------------
CTA IMPLEMENTATION RULE

Every CTA across the site that leads to Contact must be updated to send its own context.

This includes:
- hero CTAs
- service detail CTAs
- industry detail CTAs
- case study detail CTAs
- insight article CTAs
- footer CTA
- navbar CTA
- section banners
- inline “talk to us” buttons

Do NOT leave any contact CTA without source context.

--------------------------------------------------
FINAL RESULT

Build a smart contact-intent system where:
- every CTA passes contextual data
- the Contact page intelligently pre-fills relevant fields
- the user can still edit everything
- submissions store full origin metadata
- marketing@idata.global receives enriched lead notifications
- the admin can analyze where leads are coming from
- the site becomes much more useful for commercial conversion tracking