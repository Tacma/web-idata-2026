# Contact Page - CMS Structure & Backend Integration

## Overview
This document describes the database collections, email flows, and admin configurations needed for the Contact page to function with a backend/CMS system.

---

## DATABASE COLLECTIONS

### 1. `contact_submissions`

Stores all form submissions from the contact page.

**Fields:**

```typescript
interface ContactSubmission {
  id: string;                    // Auto-generated unique ID
  first_name: string;            // Required
  last_name: string;             // Required
  email: string;                 // Required (validated email format)
  company: string;               // Required
  country: string;               // Required
  phone: string;                 // Required (validated phone format)
  project_type: string;          // Optional dropdown selection
  industry: string;              // Optional dropdown selection
  budget_range: string;          // Optional dropdown selection
  timeline: string;              // Optional dropdown selection
  message: string;               // Required (min 10 chars, max 2000 chars)
  language: 'es' | 'en';         // Auto-detected from page language
  source_page: string;           // Auto-populated: /es/contacto/ or /en/contact/
  submitted_at: string;          // ISO timestamp
  status: 'new' | 'reviewed' | 'contacted' | 'converted' | 'archived';
  internal_notes: string;        // Admin-only field for team notes
  assigned_contact: string;      // Admin can assign to team member
  privacy_policy_acceptance: boolean; // Must be true to submit
}
```

**Indexes:**
- `email` (for duplicate checking)
- `submitted_at` (for date filtering)
- `status` (for filtering in admin)
- `country` (for regional filtering)

---

### 2. `contact_settings`

Singleton collection (single document) for global contact configuration.

**Fields:**

```typescript
interface ContactSettings {
  // Email Configuration
  notification_recipients: string[];           // Array of internal emails to notify - DEFAULT: ['marketing@idata.global']
  confirmation_email_sender: string;           // From address for user confirmation
  confirmation_email_subject_es: string;       // Subject line in Spanish
  confirmation_email_subject_en: string;       // Subject line in English
  confirmation_email_body_es: string;          // HTML/Text body in Spanish
  confirmation_email_body_en: string;          // HTML/Text body in English
  
  // Contact Information (displayed on page)
  contact_address: string;                     // Office address
  contact_phone: string;                       // Primary phone number
  contact_secondary_phone: string;             // Secondary/support phone
  contact_email: string;                       // Public contact email
  
  // Map Integration
  google_maps_embed: string;                   // Google Maps iframe embed code
  
  // Form Settings
  enable_captcha: boolean;                     // Enable/disable CAPTCHA
  captcha_site_key: string;                    // Google reCAPTCHA site key
  max_submissions_per_ip_per_day: number;      // Spam prevention
  
  // Response SLA
  expected_response_hours: number;             // Default: 24
}
```

---

## EMAIL FLOWS

### Flow 1: Internal Notification Email

**Trigger:** User submits contact form

**Recipients:** From `contact_settings.notification_recipients`

**Subject:** 
- ES: "Nueva consulta de contacto - [Company Name]"
- EN: "New contact inquiry - [Company Name]"

**Body Template:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Contact Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <h2 style="color: #7c3aed; margin-bottom: 20px;">Nueva consulta de contacto</h2>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #1f2937;">Información del contacto</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 150px;">Nombre:</td>
          <td style="padding: 8px 0;">{{first_name}} {{last_name}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email:</td>
          <td style="padding: 8px 0;">{{email}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Teléfono:</td>
          <td style="padding: 8px 0;">{{phone}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Empresa:</td>
          <td style="padding: 8px 0;">{{company}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">País:</td>
          <td style="padding: 8px 0;">{{country}}</td>
        </tr>
      </table>
    </div>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #1f2937;">Detalles del proyecto</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 150px;">Tipo de proyecto:</td>
          <td style="padding: 8px 0;">{{project_type}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Industria:</td>
          <td style="padding: 8px 0;">{{industry}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Presupuesto:</td>
          <td style="padding: 8px 0;">{{budget_range}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Plazo:</td>
          <td style="padding: 8px 0;">{{timeline}}</td>
        </tr>
      </table>
    </div>
    
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="margin-top: 0; color: #1f2937;">Mensaje</h3>
      <p style="white-space: pre-wrap;">{{message}}</p>
    </div>
    
    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; font-size: 14px; color: #6b7280;">
      <p style="margin: 0;"><strong>Enviado:</strong> {{submitted_at}}</p>
      <p style="margin: 5px 0 0 0;"><strong>Idioma:</strong> {{language}}</p>
      <p style="margin: 5px 0 0 0;"><strong>Página origen:</strong> {{source_page}}</p>
    </div>
    
    <div style="margin-top: 20px; text-align: center;">
      <a href="https://idata.global/admin/contact-submissions" 
         style="display: inline-block; background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
        Ver en Panel Admin
      </a>
    </div>
  </div>
</body>
</html>
```

---

### Flow 2: User Confirmation Email

**Trigger:** User submits contact form

**Recipient:** User's email from form

**From:** `contact_settings.confirmation_email_sender`

**Subject:** From `contact_settings.confirmation_email_subject_[es|en]`

**Body:** From `contact_settings.confirmation_email_body_[es|en]`

**Default Body Template (ES):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hemos recibido tu mensaje</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #7c3aed; margin: 0;">iData</h1>
    </div>
    
    <div style="background-color: white; padding: 30px; border-radius: 8px;">
      <h2 style="margin-top: 0; color: #1f2937;">Gracias por contactarnos, {{first_name}}</h2>
      
      <p style="font-size: 16px; color: #4b5563;">
        Hemos recibido tu mensaje y nuestro equipo lo está revisando.
      </p>
      
      <p style="font-size: 16px; color: #4b5563;">
        Uno de nuestros especialistas se pondrá en contacto contigo en un plazo máximo de <strong>24 horas hábiles</strong> para discutir tu proyecto.
      </p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #7c3aed;">
        <h3 style="margin-top: 0; color: #1f2937; font-size: 18px;">Resumen de tu consulta</h3>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Empresa:</strong> {{company}}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Tipo de proyecto:</strong> {{project_type}}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>País:</strong> {{country}}</p>
      </div>
      
      <p style="font-size: 16px; color: #4b5563;">
        Mientras tanto, te invitamos a explorar nuestros <a href="https://idata.global/es/casos/" style="color: #7c3aed; text-decoration: none; font-weight: bold;">casos de éxito</a> y conocer más sobre cómo ayudamos a empresas como la tuya a transformar sus datos en valor estratégico.
      </p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 14px; color: #6b7280; margin: 5px 0;">
          <strong>iData</strong><br>
          Email: info@idata.global<br>
          Web: <a href="https://idata.global" style="color: #7c3aed; text-decoration: none;">idata.global</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## ADMIN PANEL REQUIREMENTS

### Contact Submissions Management Page

**Route:** `/admin/contact-submissions`

**Features:**

1. **List View**
   - Table with columns: Date, Name, Company, Country, Project Type, Status, Actions
   - Pagination (20 items per page)
   - Sort by: Date (newest first default), Status, Country
   - Filters:
     - Status: All / New / Reviewed / Contacted / Converted / Archived
     - Date range picker
     - Country dropdown
     - Search by: Name, Email, Company
   
2. **Detail View/Modal**
   - Full submission details
   - Timeline of status changes
   - Assign to team member dropdown
   - Internal notes field (rich text editor)
   - Status change buttons
   - Quick actions: Email, Call, Mark as spam

3. **Bulk Actions**
   - Change status for multiple submissions
   - Assign multiple submissions to team member
   - Export selected to CSV
   - Delete/Archive

4. **Email Templates Editor**
   - Visual editor for confirmation email templates
   - Live preview
   - Variables support: {{first_name}}, {{company}}, etc.
   - Separate templates for ES/EN

5. **Settings Tab**
   - Notification recipients management
   - Contact information fields
   - Google Maps embed code
   - CAPTCHA configuration
   - Response time SLA settings

---

## API ENDPOINTS

### POST `/api/contact/submit`

Submit a new contact form.

**Request Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "company": "string",
  "country": "string",
  "phone": "string",
  "project_type": "string",
  "industry": "string",
  "budget_range": "string",
  "timeline": "string",
  "message": "string",
  "privacy_policy_acceptance": true,
  "language": "es"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Your message has been received",
  "submission_id": "abc123"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email format",
  "field": "email"
}
```

---

### GET `/api/contact/settings`

Get public contact settings (for displaying on page).

**Response:**
```json
{
  "contact_address": "Bogotá, Colombia",
  "contact_phone": "+57 (1) XXX-XXXX",
  "contact_email": "info@idata.global",
  "google_maps_embed": "<iframe src='...'></iframe>",
  "expected_response_hours": 24
}
```

---

## SECURITY CONSIDERATIONS

1. **Rate Limiting**
   - Max 3 submissions per IP per hour
   - Max 10 submissions per IP per day
   - Configurable in `contact_settings`

2. **Validation**
   - Server-side validation for all fields
   - Email format validation (regex + DNS check)
   - Phone number format validation
   - Message content spam detection

3. **CAPTCHA Integration**
   - Google reCAPTCHA v3 recommended
   - Only validate on server-side
   - Site key from `contact_settings.captcha_site_key`

4. **Data Privacy**
   - GDPR compliance
   - Explicit consent checkbox required
   - Data retention policy: 2 years
   - Right to deletion upon request

5. **SQL Injection Prevention**
   - Parameterized queries
   - Input sanitization
   - Prepared statements

---

## TESTING CHECKLIST

- [ ] Form validation works for all required fields
- [ ] Email format validation works
- [ ] Phone format validation works
- [ ] Success message appears after submission
- [ ] Error message appears on failure
- [ ] Internal notification email sent
- [ ] User confirmation email sent
- [ ] Submission stored in database
- [ ] Admin panel displays submission
- [ ] Status can be changed in admin
- [ ] Notes can be added in admin
- [ ] Filters work in admin list view
- [ ] Export to CSV works
- [ ] Rate limiting works
- [ ] CAPTCHA validation works (if enabled)
- [ ] Mobile responsive layout
- [ ] Language switching works (/es/contacto ↔ /en/contact)

---

## FUTURE ENHANCEMENTS

1. **File Uploads**
   - Allow users to attach documents (PDF, DOCX)
   - Max file size: 10MB
   - Virus scanning

2. **Calendar Integration**
   - "Schedule a call" CTA
   - Calendly or Microsoft Bookings embed
   - Auto-populate name/email from form

3. **Live Chat**
   - Intercom or Drift integration
   - Only during business hours
   - Fallback to form outside hours

4. **CRM Integration**
   - Auto-create leads in HubSpot/Salesforce
   - Two-way sync of status updates
   - Activity tracking

5. **Analytics**
   - Conversion tracking (form views → submissions)
   - Source attribution (UTM parameters)
   - A/B testing for form layouts
   - Heatmap analysis

---

## MAINTENANCE

**Weekly:**
- Review new submissions
- Respond to all pending inquiries
- Update internal notes

**Monthly:**
- Export submissions to backup
- Review spam submissions
- Update email templates if needed
- Analyze conversion metrics

**Quarterly:**
- Review and update contact information
- Test all form validations
- Update privacy policy if needed
- Security audit