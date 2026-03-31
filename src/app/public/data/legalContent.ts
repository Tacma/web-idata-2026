export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocumentContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

export const privacyPolicyContent = {
  es: {
    seoTitle: 'Politica de privacidad - iData Global',
    seoDescription:
      'Consulta como iData Global recopila, usa, protege y gestiona los datos personales de acuerdo con la legislacion colombiana aplicable.',
    title: 'Politica de privacidad',
    intro:
      'Esta politica resume como iData Global trata la informacion personal compartida a traves del sitio y los canales digitales vinculados a la marca.',
    sections: [
      {
        title: 'Responsable del tratamiento',
        paragraphs: [
          'iData Global es responsable del tratamiento de los datos personales recopilados a traves de este sitio.',
          'La gestion de la informacion se realiza bajo la normativa colombiana aplicable, en especial la Ley Estatutaria 1581 de 2012 y sus normas complementarias.',
        ],
      },
      {
        title: 'Datos que podemos recopilar',
        paragraphs: [
          'Solo tratamos datos personales cuando el usuario los entrega de forma voluntaria por medio de formularios, correos, aplicaciones a vacantes u otros canales de contacto.',
        ],
        bullets: [
          'Nombre y apellidos',
          'Correo electronico',
          'Telefono',
          'Empresa o cargo',
          'Informacion adicional incluida por el usuario en mensajes o formularios',
        ],
      },
      {
        title: 'Finalidades del tratamiento',
        paragraphs: [
          'La informacion se utiliza exclusivamente para los fines para los cuales fue entregada y para la operacion normal de la relacion con el usuario.',
        ],
        bullets: [
          'Responder solicitudes comerciales o tecnicas',
          'Gestionar procesos de seleccion y oportunidades laborales',
          'Enviar comunicaciones solicitadas o informacion relevante sobre servicios',
          'Hacer seguimiento a formularios, solicitudes o conversaciones iniciadas por el usuario',
          'Mejorar la experiencia digital y la seguridad de la plataforma',
        ],
      },
      {
        title: 'Compartir informacion con terceros',
        paragraphs: [
          'iData Global no comparte datos personales con terceros sin autorizacion previa del titular, salvo en los casos exigidos por ley o cuando sea necesario para la prestacion del servicio con aliados tecnologicos o proveedores autorizados.',
        ],
      },
      {
        title: 'Derechos del titular',
        paragraphs: [
          'El titular de la informacion puede ejercer sus derechos de acceso, actualizacion, rectificacion, supresion y oposicion, asi como solicitar informacion sobre el uso dado a sus datos personales.',
          'Para ejercer estos derechos, el titular puede comunicarse a traves de los canales oficiales de contacto publicados por iData Global.',
        ],
      },
      {
        title: 'Seguridad de la informacion',
        paragraphs: [
          'La organizacion adopta medidas razonables de seguridad administrativa, tecnica y operativa para prevenir accesos no autorizados, perdida, alteracion o divulgacion indebida de los datos personales.',
        ],
      },
      {
        title: 'Relacion con cookies',
        paragraphs: [
          'Este sitio puede utilizar cookies y tecnologias similares para funcionamiento, analitica y mejora continua.',
          'Para mas detalle sobre ese tratamiento puedes consultar la Politica de Cookies disponible en este mismo sitio.',
        ],
      },
      {
        title: 'Actualizaciones de la politica',
        paragraphs: [
          'iData Global podra actualizar esta politica cuando cambien los procesos internos, los servicios digitales o las obligaciones regulatorias aplicables.',
          'La version vigente sera la publicada en esta pagina.',
        ],
      },
    ],
  },
  en: {
    seoTitle: 'Privacy policy - iData Global',
    seoDescription:
      'Review how iData Global collects, uses, protects and manages personal data in line with the applicable Colombian regulatory framework.',
    title: 'Privacy policy',
    intro:
      'This policy explains how iData Global handles personal information shared through the website and any digital channels connected to the brand.',
    sections: [
      {
        title: 'Data controller',
        paragraphs: [
          'iData Global is responsible for the processing of personal data collected through this website.',
          'Data handling follows the applicable Colombian framework, especially Statutory Law 1581 of 2012 and related regulations.',
        ],
      },
      {
        title: 'Personal data we may collect',
        paragraphs: [
          'We only process personal data when users voluntarily provide it through forms, email, job applications or other available contact channels.',
        ],
        bullets: [
          'First and last name',
          'Email address',
          'Phone number',
          'Company or role',
          'Any additional information submitted in forms or messages',
        ],
      },
      {
        title: 'Purposes of processing',
        paragraphs: [
          'Information is used only for the purpose for which it was provided and for the regular operation of the relationship with the user.',
        ],
        bullets: [
          'Reply to commercial or technical inquiries',
          'Manage recruiting processes and career opportunities',
          'Send requested communications or relevant service information',
          'Follow up on forms, requests or conversations initiated by the user',
          'Improve the digital experience and security of the platform',
        ],
      },
      {
        title: 'Sharing data with third parties',
        paragraphs: [
          'iData Global does not share personal data with third parties without prior authorization from the data subject, except when legally required or when it is necessary to deliver services with authorized providers or technology partners.',
        ],
      },
      {
        title: 'Data subject rights',
        paragraphs: [
          'Users may exercise their rights of access, update, rectification, deletion and objection, and may request information about how their personal data is being used.',
          'To exercise these rights, users may contact iData Global through the official contact channels published on the website.',
        ],
      },
      {
        title: 'Information security',
        paragraphs: [
          'The organization applies reasonable administrative, technical and operational safeguards to prevent unauthorized access, loss, alteration or improper disclosure of personal data.',
        ],
      },
      {
        title: 'Relationship with cookies',
        paragraphs: [
          'This site may use cookies and similar technologies for functionality, analytics and continuous improvement.',
          'For more detail, please review the Cookie Policy available on this website.',
        ],
      },
      {
        title: 'Policy updates',
        paragraphs: [
          'iData Global may update this policy whenever internal processes, digital services or regulatory obligations change.',
          'The current version will always be the one published on this page.',
        ],
      },
    ],
  },
} satisfies Record<'es' | 'en', LegalDocumentContent>;

export const cookiePolicyContent = {
  es: {
    seoTitle: 'Politica de cookies - iData Global',
    seoDescription:
      'Conoce como iData Global utiliza cookies propias y de terceros para funcionamiento, analitica, experiencia de navegacion y mejoras del sitio.',
    title: 'Politica de cookies',
    intro:
      'Esta politica explica que son las cookies, como se utilizan en el sitio de iData Global y que opciones tiene el usuario para administrarlas o deshabilitarlas.',
    sections: [
      {
        title: 'Que son las cookies',
        paragraphs: [
          'Las cookies son pequenos archivos de texto que un sitio web almacena en el navegador para recordar preferencias, medir uso o facilitar funciones tecnicas.',
          'Su uso permite que una pagina funcione de forma mas eficiente y que ciertos contenidos se adapten mejor al comportamiento del visitante.',
        ],
      },
      {
        title: 'Como usamos las cookies',
        paragraphs: [
          'En iData Global utilizamos cookies propias y de terceros para mejorar la navegacion, habilitar funciones basicas, analizar el comportamiento general del sitio y entender como evolucionan las visitas.',
        ],
      },
      {
        title: 'Tipos de cookies que pueden estar presentes',
        bullets: [
          'Cookies tecnicas o de sesion para el funcionamiento basico del sitio',
          'Cookies de preferencias para recordar configuraciones del usuario',
          'Cookies de analitica para medir visitas, contenidos consultados y tendencias de uso',
          'Cookies de terceros asociadas a herramientas de medicion, redes sociales o servicios publicitarios',
        ],
      },
      {
        title: 'Cookies de analitica y terceros',
        paragraphs: [
          'Algunas herramientas externas pueden generar cookies de analitica para identificar de manera agregada y anonima patrones de navegacion, contenidos mas consultados o recurrencia de visitas.',
          'Cuando existan proveedores externos, cada uno opera bajo sus propias politicas de privacidad y tratamiento de datos.',
        ],
      },
      {
        title: 'Como deshabilitarlas o gestionarlas',
        paragraphs: [
          'El usuario puede configurar su navegador para aceptar, bloquear o eliminar cookies. Tambien puede revisar periodicamente cuales se encuentran instaladas y su tiempo de permanencia.',
          'Deshabilitar cookies puede afectar algunas funcionalidades del sitio o limitar la personalizacion de la experiencia.',
        ],
      },
      {
        title: 'Consentimiento',
        paragraphs: [
          'Al continuar navegando en el sitio, el usuario acepta el uso de cookies en los terminos descritos en esta politica, salvo que las haya deshabilitado desde su navegador o mediante mecanismos de consentimiento disponibles.',
        ],
      },
      {
        title: 'Actualizaciones',
        paragraphs: [
          'Esta politica puede cambiar cuando se actualicen las herramientas del sitio, los proveedores involucrados o la normativa aplicable.',
          'La version vigente sera la publicada en esta pagina.',
        ],
      },
    ],
  },
  en: {
    seoTitle: 'Cookie policy - iData Global',
    seoDescription:
      'Learn how iData Global uses first-party and third-party cookies for site functionality, analytics, navigation experience and continuous improvement.',
    title: 'Cookie policy',
    intro:
      'This policy explains what cookies are, how they are used on the iData Global website and what options users have to manage or disable them.',
    sections: [
      {
        title: 'What cookies are',
        paragraphs: [
          'Cookies are small text files stored in the browser to remember preferences, measure usage or support technical website functions.',
          'They help websites operate more efficiently and allow some content to be adjusted according to how visitors interact with the site.',
        ],
      },
      {
        title: 'How we use cookies',
        paragraphs: [
          'At iData Global we use first-party and third-party cookies to improve browsing, enable core site functionality, analyze general site behavior and understand how traffic evolves over time.',
        ],
      },
      {
        title: 'Types of cookies that may be used',
        bullets: [
          'Technical or session cookies required for essential site operation',
          'Preference cookies used to remember user settings',
          'Analytics cookies used to measure visits, consulted content and usage trends',
          'Third-party cookies associated with analytics tools, social networks or advertising services',
        ],
      },
      {
        title: 'Analytics and third-party cookies',
        paragraphs: [
          'Some third-party tools may generate analytics cookies in order to identify browsing patterns, popular content and returning visits in an aggregated and anonymous way.',
          'Whenever external providers are involved, they operate under their own privacy and data handling policies.',
        ],
      },
      {
        title: 'How to disable or manage cookies',
        paragraphs: [
          'Users can configure their browser to accept, block or delete cookies. They may also review which cookies are installed and how long they remain active.',
          'Blocking cookies may affect some site features or reduce the level of personalization available.',
        ],
      },
      {
        title: 'Consent',
        paragraphs: [
          'By continuing to browse the site, users accept the use of cookies under the terms described in this policy, unless they have disabled them in the browser or through any available consent mechanism.',
        ],
      },
      {
        title: 'Updates',
        paragraphs: [
          'This policy may change when site tools, external providers or the applicable regulatory framework change.',
          'The latest published version on this page will be the current one.',
        ],
      },
    ],
  },
} satisfies Record<'es' | 'en', LegalDocumentContent>;
