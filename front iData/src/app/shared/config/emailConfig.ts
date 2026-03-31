/**
 * Email Configuration
 * Centralized email settings for the iData website
 */

export const emailConfig = {
  // Commercial Contact Email
  // All commercial inquiries, lead forms, and contact submissions
  commercial: {
    recipient: 'marketing@idata.global',
    name: 'iData Marketing Team',
  },

  // Careers/HR Email (to be configured later)
  careers: {
    recipient: '', // To be configured
    name: 'iData HR Team',
  },

  // System Sender (for automated emails)
  sender: {
    email: 'noreply@idata.global',
    name: 'iData Global',
  },
} as const;

/**
 * Email Templates Configuration
 */
export const emailTemplates = {
  // Internal Notification for Commercial Inquiries
  commercialNotification: {
    subject: {
      es: 'Nueva consulta comercial desde el sitio web',
      en: 'New website contact submission',
    },
  },

  // User Confirmation for Commercial Inquiries
  commercialConfirmation: {
    subject: {
      es: 'Gracias por contactar a iData Global',
      en: 'Thank you for contacting iData Global',
    },
    body: {
      es: 'Gracias por contactar a iData Global. Nuestro equipo revisará tu mensaje y se pondrá en contacto contigo pronto.',
      en: 'Thank you for contacting iData Global. Our team will review your message and get back to you shortly.',
    },
  },
} as const;
