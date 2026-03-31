PROJECT: iData Global Website
PAGE: Work with us / Careers
TASK: Build the Careers page and its admin/CMS/backend-ready logic based on the current iData Global site structure, while upgrading it into a fully manageable recruitment module.

IMPORTANT
Do NOT invent company emails.
Do NOT hardcode recipient emails.
Use the current public site as structural reference, but improve it so the page becomes fully manageable from the admin.

Reference pages:
- https://idata.global/en/work-with-us/
- https://idata.global/en/
- https://idata.global/en/contact/

Current public logic that must be respected:
1. Hero inviting people to join the team
2. “Cooltura” / culture section
3. Open positions application flow
4. Alternative form for people who want to apply even if there is no matching vacancy

This new implementation must be fully CMS/admin driven and backend-ready.

--------------------------------------------------
ROUTES

Spanish
/es/trabaja-con-nosotros

English
/en/work-with-us

Language switch must keep the same page.

--------------------------------------------------
GENERAL GOAL

Create a Careers page with 3 operational flows:

1) Job offers that can be published and managed from the admin
2) Application forms for candidates applying to a specific open role
3) General application form for candidates who want to apply even if their role is not currently published

Everything must be manageable from the admin panel from day one.

--------------------------------------------------
DESIGN SYSTEM RULES

Use the same visual logic already defined for the site:
- same compact hero/banner system as Services / Industries / Case Studies / About
- same container widths
- same typography system
- same spacing rhythm
- same CTA style
- same clean corporate tone
- same bilingual logic

Do NOT make this page look like a generic HR portal.
It must still feel like iData Global:
clean
corporate
technological
human
modern

--------------------------------------------------
SECTION 1 — HERO

Component: careers-hero

Use the same banner structure as the other first-level pages.

Content direction based on the current site:

ES
Título:
Trabaja con nosotros

Texto:
Únete a nuestro equipo de CoolStars y crece como experto en Data & AI, aportando a iniciativas de transformación estratégica y digital para organizaciones visionarias.

EN
Title:
Work with us

Text:
Join our team of CoolStars and grow as a Data & AI expert, contributing to strategic and digital transformation initiatives for visionary organizations.

CTA 1:
Ver vacantes / View openings

CTA 2:
Aplicación espontánea / Open application

Hero must remain compact.

--------------------------------------------------
SECTION 2 — CULTURE / COOLTURA

Component: careers-culture

This section must reflect the current “Our Cooltura” logic from the public site.

Layout:
2 columns

Left:
text content

Right:
image or team/culture visual

Content direction:
Explain that iData’s culture combines:
- innovation
- empathy
- excellence
- balance between people, data and solutions

Keep this section editable from admin.

CMS fields:
culture_title_es
culture_title_en
culture_text_es
culture_text_en
culture_image

--------------------------------------------------
SECTION 3 — OPEN POSITIONS LISTING

Component: careers-open-positions

This is the main operational section.

Show all active job openings pulled dynamically from the admin.

Desktop:
responsive grid or stacked list cards

Each job card must include:
- job title
- team/area
- modality (remote / hybrid / onsite)
- location
- seniority
- employment type
- short summary
- publication date
- closing date (optional)
- CTA: Apply now / Aplicar

Filters above listing:
- search by title
- area/team
- location
- modality
- seniority
- employment type

Optional sort:
- newest first
- closing soon
- alphabetical

If there are no active jobs:
show empty state with CTA to general application form.

--------------------------------------------------
SECTION 4 — JOB DETAIL PAGE

Create dynamic job detail pages.

Routes:
ES
/es/trabaja-con-nosotros/{slug}

EN
/en/work-with-us/{slug}

Each job detail must include:
- title
- area/team
- modality
- location
- employment type
- seniority
- salary range (optional, admin controlled)
- job overview
- responsibilities
- requirements
- nice to have
- benefits
- hiring process steps
- publication date
- CTA apply

At the bottom:
- related openings
- CTA for open application if this role is not a fit

--------------------------------------------------
SECTION 5 — APPLICATION FORM FOR SPECIFIC OPEN ROLE

Component: careers-role-application-form

When a candidate clicks “Apply now”, open the application form tied to that exact vacancy.

This form must automatically know which job the person is applying for.

Required fields:
- first_name
- last_name
- email
- phone
- country
- city
- linkedin_url
- portfolio_url (optional)
- cv_upload
- cover_letter / why are you interested?
- years_of_experience
- salary_expectation (optional, configurable)
- availability
- english_level (optional)
- consent_checkbox (privacy policy)

Optional admin-controlled custom questions:
- yes/no
- single choice
- multi choice
- long text
- file upload

Form behavior:
- store submission in admin database
- tag submission with job_id
- send notification email
- send candidate confirmation email
- allow status tracking in admin

--------------------------------------------------
SECTION 6 — OPEN APPLICATION / GENERAL APPLICATION

Component: careers-open-application

This section replaces the current simple “send us your resume” logic with a real structured flow.

Purpose:
Allow candidates to apply even if there is no matching active vacancy.

Must include:
- introductory text
- form
- upload CV
- optionally choose desired area
- optionally choose desired role
- optionally describe interests / expertise

Fields:
- first_name
- last_name
- email
- phone
- country
- city
- desired_area
- desired_role
- linkedin_url
- portfolio_url (optional)
- cv_upload
- cover_letter / tell us about yourself
- consent_checkbox

This form must be different from job-specific applications.
It must be stored separately as “open applications”.

--------------------------------------------------
SECTION 7 — WHY WORK WITH US

Component: careers-benefits

Optional but recommended.

Show:
- growth opportunities
- learning culture
- innovative projects
- regional/international exposure
- people-first culture

This section must be editable from admin.

Use cards or icon-text blocks.

--------------------------------------------------
SECTION 8 — HIRING PROCESS

Component: careers-process

Show a clear hiring flow, editable from admin.

Example:
1. Apply
2. Profile review
3. Interview
4. Technical or case step
5. Final conversation
6. Offer

This helps reduce candidate uncertainty.

--------------------------------------------------
SECTION 9 — FAQ

Component: careers-faq

Admin-manageable accordion.

Examples:
- Can I apply if there is no current opening for my profile?
- Is the process remote?
- What documents should I submit?
- How long does the process take?

--------------------------------------------------
SECTION 10 — FINAL CTA

Component: careers-cta

If no vacancy fits:
Apply through the open application form.

--------------------------------------------------
ADMIN / CMS STRUCTURE

Create the following collections and admin modules.

--------------------------------------------------
COLLECTION 1 — job_openings

Fields:
- id
- status (draft / published / closed / archived)
- title_es
- title_en
- slug_es
- slug_en
- area_es
- area_en
- department
- modality (remote / hybrid / onsite)
- location_es
- location_en
- country
- city
- seniority
- employment_type
- short_summary_es
- short_summary_en
- overview_es
- overview_en
- responsibilities_es
- responsibilities_en
- requirements_es
- requirements_en
- nice_to_have_es
- nice_to_have_en
- benefits_es
- benefits_en
- salary_visible (boolean)
- salary_min
- salary_max
- currency
- publication_date
- closing_date
- featured (boolean)
- display_order
- seo_title_es
- seo_title_en
- seo_description_es
- seo_description_en

--------------------------------------------------
COLLECTION 2 — job_applications

Fields:
- id
- job_id
- application_type (job_specific)
- first_name
- last_name
- email
- phone
- country
- city
- linkedin_url
- portfolio_url
- cv_file
- cover_letter
- years_of_experience
- salary_expectation
- availability
- english_level
- consent_accepted
- source_page
- language
- submitted_at
- status (new / in_review / shortlisted / rejected / hired / archived)
- recruiter_notes
- assigned_reviewer

--------------------------------------------------
COLLECTION 3 — open_applications

Fields:
- id
- application_type (open)
- first_name
- last_name
- email
- phone
- country
- city
- desired_area
- desired_role
- linkedin_url
- portfolio_url
- cv_file
- cover_letter
- consent_accepted
- source_page
- language
- submitted_at
- status (new / in_review / contacted / archived)
- recruiter_notes
- assigned_reviewer

--------------------------------------------------
COLLECTION 4 — application_form_questions

Purpose:
Allow admin to add extra screening questions to specific roles.

Fields:
- id
- job_id
- question_label_es
- question_label_en
- question_type (text / textarea / select / multiselect / radio / checkbox / file)
- options_es
- options_en
- is_required
- display_order

--------------------------------------------------
COLLECTION 5 — careers_settings

Use this for operational settings.

Fields:
- applications_enabled (boolean)
- open_application_enabled (boolean)
- auto_confirmation_enabled (boolean)
- privacy_policy_url_es
- privacy_policy_url_en
- careers_intro_es
- careers_intro_en
- culture_title_es
- culture_title_en
- culture_text_es
- culture_text_en
- culture_image
- careers_email_from_name
- careers_email_from_address
- internal_notification_recipients
- general_application_recipients
- auto_reply_subject_es
- auto_reply_subject_en
- auto_reply_body_es
- auto_reply_body_en

IMPORTANT:
Do NOT hardcode recipient emails into the UI.
These must be configured from the admin settings because the public site does not expose a visible recruitment email.

--------------------------------------------------
EMAIL / BACKEND LOGIC

Build the page and admin assuming real backend integration.

There must be 3 email behaviors:

1. Internal notification for specific job application
When someone applies to a specific role:
- send notification to recipients configured in admin
- include job title, applicant info, links to CV and submission record

2. Internal notification for open application
When someone submits an open application:
- send notification to recipients configured in admin
- include desired area/role, applicant info, CV link and submission record

3. Candidate confirmation email
Send an automatic confirmation email to the applicant.
Admin must manage:
- subject
- body
- sender name
- sender email

IMPORTANT:
Because visible recruitment emails are not publicly exposed on the current site, do not guess them.
Make destination recipients configurable in admin settings.

--------------------------------------------------
ADMIN DASHBOARD REQUIREMENTS

Create admin modules for:

1. Job openings management
- create
- edit
- publish
- close
- archive
- duplicate posting

2. Applications inbox
- list all applications
- filter by role, status, date, country
- view candidate detail
- download CV
- move status
- assign reviewer
- add notes

3. Open applications inbox
- separate view from role-specific applications

4. Careers settings
- configure recipients
- configure auto reply
- manage intro/culture text
- enable or disable open applications

--------------------------------------------------
CANDIDATE EXPERIENCE RULES

- clear success states after submission
- show confirmation message on screen
- show privacy consent clearly
- CV upload must validate file type and size
- forms must save structured data
- bilingual UX must be complete
- each vacancy page must have a unique apply flow

--------------------------------------------------
SUCCESS / EMPTY STATES

If there are no vacancies:
Show friendly empty state:
ES:
No tenemos vacantes activas en este momento, pero nos encantaría conocerte.
EN:
We do not have active openings at the moment, but we would still love to hear from you.

CTA:
Enviar aplicación espontánea / Submit open application

--------------------------------------------------
SEO

Careers listing page must support:
- seo title
- description
- clean URL

Each job detail page must support:
- unique title
- description
- clean slug
- structured metadata

--------------------------------------------------
RESPONSIVE

Desktop:
hero + filters + listing + forms

Tablet:
cards and forms adapt cleanly

Mobile:
single-column layout
sticky apply CTA optional on job detail pages

--------------------------------------------------
FINAL RESULT

Build a fully manageable Careers module where iData can:
- publish job openings from admin
- receive applications for active roles
- receive open applications for non-published roles
- manage submissions in admin
- configure recipient emails from admin
- maintain bilingual content and clean UX
- stay visually consistent with the rest of the website