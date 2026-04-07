import { getCachedSiteSetting, getSiteSetting, saveSiteSetting } from './siteSettings.service';

export interface ContactPageContent {
  directEyebrow_es: string;
  directEyebrow_en: string;
  directTitle_es: string;
  directTitle_en: string;
  formTitle_es: string;
  formTitle_en: string;
  formDescription_es: string;
  formDescription_en: string;
  formMessageLabel_es: string;
  formMessageLabel_en: string;
  formMessagePlaceholder_es: string;
  formMessagePlaceholder_en: string;
  privacyText_es: string;
  privacyText_en: string;
  submitLabel_es: string;
  submitLabel_en: string;
  successTitle_es: string;
  successTitle_en: string;
  successDescription_es: string;
  successDescription_en: string;
  errorTitle_es: string;
  errorTitle_en: string;
  errorDescription_es: string;
  errorDescription_en: string;
  contactInfoTitle_es: string;
  contactInfoTitle_en: string;
  socialTitle_es: string;
  socialTitle_en: string;
  socialDescription_es: string;
  socialDescription_en: string;
  responseTitle_es: string;
  responseTitle_en: string;
  responseDescription_es: string;
  responseDescription_en: string;
}

export const defaultContactPageContent: ContactPageContent = {
  directEyebrow_es: 'Contacto directo',
  directEyebrow_en: 'Direct contact',
  directTitle_es: 'Escríbenos por WhatsApp o también déjanos tu mensaje',
  directTitle_en: 'Message us on WhatsApp or leave us your message below',
  formTitle_es: 'Hablemos de tu iniciativa',
  formTitle_en: 'Let us talk about your initiative',
  formDescription_es: 'Déjanos tus datos y un breve contexto. Nuestro equipo te contactará pronto.',
  formDescription_en: 'Leave your details and a brief context. Our team will contact you shortly.',
  formMessageLabel_es: 'Cuéntanos brevemente qué necesitas',
  formMessageLabel_en: 'Briefly tell us what you need',
  formMessagePlaceholder_es: 'Cuéntanos el reto, el objetivo o la conversación que te gustaría tener.',
  formMessagePlaceholder_en: 'Tell us the challenge, goal or conversation you would like to have.',
  privacyText_es: 'y el tratamiento de mis datos personales para fines de contacto comercial.',
  privacyText_en: 'and the processing of my personal data for commercial contact purposes.',
  submitLabel_es: 'Enviar mensaje',
  submitLabel_en: 'Send message',
  successTitle_es: 'Gracias por tu mensaje.',
  successTitle_en: 'Thank you for your message.',
  successDescription_es: 'Nuestro equipo te responderá pronto.',
  successDescription_en: 'Our team will respond shortly.',
  errorTitle_es: 'Hubo un problema enviando el mensaje.',
  errorTitle_en: 'There was a problem sending your message.',
  errorDescription_es: 'Intenta nuevamente.',
  errorDescription_en: 'Please try again.',
  contactInfoTitle_es: 'Información de contacto',
  contactInfoTitle_en: 'Contact information',
  socialTitle_es: 'Síguenos en redes sociales',
  socialTitle_en: 'Follow us on social media',
  socialDescription_es: 'También puedes seguir la conversación y conocer lo que estamos construyendo.',
  socialDescription_en: 'You can also follow the conversation and see what we are building.',
  responseTitle_es: 'Tiempo de respuesta',
  responseTitle_en: 'Response time',
  responseDescription_es: 'Respondemos en un máximo de 24 horas hábiles.',
  responseDescription_en: 'We reply within 24 business hours.',
};

function normalize(raw: any): ContactPageContent {
  return {
    ...defaultContactPageContent,
    ...raw,
  };
}

export function getContactPageContentSnapshot(): ContactPageContent {
  return normalize(getCachedSiteSetting('contact_page_content', defaultContactPageContent));
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const raw = await getSiteSetting('contact_page_content', 'contact_page_content', defaultContactPageContent);
  const normalized = normalize(raw);
  await saveSiteSetting('contact_page_content', 'contact_page_content', normalized);
  return normalized;
}

export async function saveContactPageContent(settings: ContactPageContent): Promise<ContactPageContent> {
  const normalized = normalize(settings);
  return normalize(await saveSiteSetting('contact_page_content', 'contact_page_content', normalized));
}
