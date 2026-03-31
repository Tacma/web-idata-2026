import { DATA_PROVIDER, API_BASE_URL } from '../config/dataProvider';
import { getSettings, initializeSettings, saveSettings } from './localStorage.service';

export interface LegalPageDocument {
  seoTitle_es: string;
  seoTitle_en: string;
  seoDescription_es: string;
  seoDescription_en: string;
  title_es: string;
  title_en: string;
  intro_es: string;
  intro_en: string;
  bodyHtml_es: string;
  bodyHtml_en: string;
}

export interface LegalPagesSettings {
  privacy: LegalPageDocument;
  cookies: LegalPageDocument;
}

const LEGAL_PAGES_VERSION = 2;

const defaultSettings: LegalPagesSettings = {
  privacy: {
    seoTitle_es: 'Politica de privacidad | iData Global',
    seoTitle_en: 'Privacy Policies | iData Global',
    seoDescription_es:
      'Consulta como iData Global recopila, usa, protege y trata los datos personales de acuerdo con la legislacion colombiana aplicable.',
    seoDescription_en:
      'Review how iData Global collects, uses, protects and processes personal data under the applicable Colombian legal framework.',
    title_es: 'Politica de privacidad',
    title_en: 'Privacy Policies',
    intro_es:
      'Esta politica describe como iData Global recopila, procesa y protege los datos personales compartidos a traves de este sitio web y otros canales de contacto disponibles.',
    intro_en:
      'This policy describes how iData Global collects, processes and protects personal data shared through this website and other available contact channels.',
    bodyHtml_es: `
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>El responsable de la recopilacion, procesamiento y utilizacion de tus datos personales, de acuerdo con la Ley Estatutaria 1581 de 2012 y sus normas complementarias, es la pagina web idata.global, propiedad de iData Global, con domicilio en la ciudad de Bogota D.C.</p>
      </section>
      <section>
        <h2>2. Recopilacion de datos personales</h2>
        <p>Esta plataforma web recopila y procesa datos personales solo cuando los usuarios los proporcionan voluntariamente, ya sea a traves de formularios de contacto u otras vias de comunicacion disponibles en la plataforma.</p>
        <p>Los datos recopilados pueden incluir, entre otros, tu nombre, direccion de correo electronico y cualquier otra informacion que decidas proporcionar.</p>
      </section>
      <section>
        <h2>3. Uso de datos personales</h2>
        <p>Los datos personales recopilados se utilizan exclusivamente para los fines especificos para los cuales fueron proporcionados. Esto puede incluir responder a consultas, enviar boletines informativos o proporcionar acceso a servicios especificos.</p>
      </section>
      <section>
        <h2>4. Compartir datos personales</h2>
        <p>Tus datos personales no seran compartidos con terceros sin tu consentimiento expreso, a menos que la ley asi lo requiera.</p>
      </section>
      <section>
        <h2>5. Derechos de los usuarios</h2>
        <p>Como usuario, tienes derechos garantizados por la Ley Estatutaria 1581 de 2012, como el derecho de acceso, rectificacion, eliminacion, oposicion y portabilidad de tus datos personales.</p>
        <p>Puedes ejercer estos derechos contactando al responsable de datos personales a traves de los datos de contacto proporcionados en esta politica.</p>
      </section>
      <section>
        <h2>6. Seguridad de los datos</h2>
        <p>Se han implementado medidas de seguridad adecuadas para proteger tus datos personales y prevenir el acceso no autorizado, de acuerdo con las disposiciones de la Ley Estatutaria 1581 de 2012.</p>
      </section>
      <section>
        <h2>7. Politica de cookies</h2>
        <p>Ademas de la informacion sobre el tratamiento de datos personales, tambien se recopilan cookies en esta plataforma. Consulta la seccion Politica de Cookies de este sitio para obtener detalles sobre su uso y como deshabilitarlas.</p>
      </section>
      <section>
        <h2>8. Actualizaciones y cambios</h2>
        <p>Esta politica puede ser modificada ocasionalmente para reflejar cambios en las practicas de privacidad y cookies. Los cambios significativos seran notificados a los usuarios.</p>
        <p>Al continuar navegando en esta plataforma web, aceptas las politicas de privacidad y cookies descritas anteriormente, en cumplimiento de la legislacion colombiana y la Ley Estatutaria 1581 de 2012.</p>
      </section>
    `.trim(),
    bodyHtml_en: `
      <section>
        <h2>1. Data controller</h2>
        <p>The party responsible for the collection, processing and use of your personal data, in accordance with Statutory Law 1581 of 2012 and related regulations, is the website idata.global, owned by iData Global and domiciled in Bogota D.C., Colombia.</p>
      </section>
      <section>
        <h2>2. Collection of personal data</h2>
        <p>This website collects and processes personal data only when users voluntarily provide it, whether through contact forms or other communication channels available on the platform.</p>
        <p>Collected data may include, among other things, your name, email address and any other information you choose to provide.</p>
      </section>
      <section>
        <h2>3. Use of personal data</h2>
        <p>Collected personal data is used exclusively for the specific purposes for which it was provided. This may include responding to inquiries, sending newsletters or providing access to specific services.</p>
      </section>
      <section>
        <h2>4. Sharing personal data</h2>
        <p>Your personal data will not be shared with third parties without your express consent, unless required by law.</p>
      </section>
      <section>
        <h2>5. User rights</h2>
        <p>As a user, you have rights guaranteed by Statutory Law 1581 of 2012, including the right to access, rectify, delete, object to and request portability of your personal data.</p>
        <p>You may exercise these rights by contacting the data controller through the contact information provided in this policy.</p>
      </section>
      <section>
        <h2>6. Data security</h2>
        <p>Appropriate security measures have been implemented to protect your personal data and prevent unauthorized access, in accordance with the provisions of Statutory Law 1581 of 2012.</p>
      </section>
      <section>
        <h2>7. Cookie policy</h2>
        <p>In addition to information about the processing of personal data, cookies are also collected on this platform. Please review the Cookie Policy section on this website for details about their use and how to disable them.</p>
      </section>
      <section>
        <h2>8. Updates and changes</h2>
        <p>This policy may be modified occasionally to reflect changes in privacy and cookie practices. Significant changes will be communicated to users.</p>
        <p>By continuing to browse this website, you accept the privacy and cookie policies described above, in accordance with Colombian law and Statutory Law 1581 of 2012.</p>
      </section>
    `.trim(),
  },
  cookies: {
    seoTitle_es: 'Politicas de cookies | iData Global',
    seoTitle_en: 'Cookie Policies | iData Global',
    seoDescription_es:
      'Consulta como iData Global utiliza cookies propias y de terceros para mejorar la navegacion, compartir contenido y obtener estadisticas generales de uso.',
    seoDescription_en:
      'Review how iData Global uses first-party and third-party cookies to improve browsing, support content sharing and obtain general usage statistics.',
    title_es: 'Politicas de cookies',
    title_en: 'Cookie Policies',
    intro_es:
      'En esta web se utilizan cookies de terceros y propias para conseguir que tengas una mejor experiencia de navegacion, puedas compartir contenido en redes sociales y para que podamos obtener estadisticas generales de los usuarios.',
    intro_en:
      'This website uses first-party and third-party cookies to provide a better browsing experience, enable content sharing on social networks and help us obtain general user statistics.',
    bodyHtml_es: `
      <section>
        <h2>1. Que son las cookies</h2>
        <p>Las cookies son un conjunto de datos que un servidor deposita en el navegador del usuario para recoger informacion de registro estandar de Internet y datos sobre el comportamiento de los visitantes en un sitio web.</p>
        <p>Se trata de pequenos archivos de texto que quedan almacenados en el dispositivo y sirven para identificar al usuario cuando se conecta nuevamente al sitio web, registrar la visita y guardar cierta informacion.</p>
      </section>
      <section>
        <h2>2. Informacion general sobre su uso</h2>
        <p>Puedes evitar la descarga de cookies a traves de la configuracion de tu navegador, evitando que las cookies se almacenen en tu dispositivo.</p>
        <p>Como propietario de este sitio web, te comunicamos que idata.global no utiliza ninguna informacion personal procedente de cookies; unicamente realizamos estadisticas generales de visitas que no suponen informacion personal.</p>
        <p>Si continuas navegando, consideraremos que aceptas su uso, de acuerdo con los terminos aplicables al empleo de estos mecanismos.</p>
      </section>
      <section>
        <h2>3. Tipos de cookies que existen</h2>
        <p>Las cookies utilizadas en el sitio web pueden ser de sesion y de terceros, y permiten almacenar y acceder a informacion relativa al idioma, el tipo de navegador utilizado y otras caracteristicas generales predefinidas por el usuario, asi como seguir y analizar la actividad realizada para introducir mejoras y prestar los servicios de una manera mas eficiente y personalizada.</p>
        <p>En funcion de su permanencia, las cookies pueden dividirse en cookies de sesion o cookies permanentes. Las primeras expiran cuando el usuario cierra el navegador. Las permanentes expiran cuando se cumple el objetivo para el que sirven o cuando se borran manualmente.</p>
      </section>
      <section>
        <h2>4. Tipologias segun su finalidad</h2>
        <ul>
          <li><strong>Cookies de rendimiento:</strong> recuerdan preferencias para herramientas o servicios y evitan que el usuario tenga que reconfigurarlos en cada visita.</li>
          <li><strong>Cookies de geo-localizacion:</strong> permiten identificar en que pais se encuentra el usuario para orientar el contenido de forma anonima.</li>
          <li><strong>Cookies de registro:</strong> se generan cuando el usuario se registra o inicia sesion y permiten mantenerlo identificado o validar accesos autorizados.</li>
          <li><strong>Cookies de analiticas:</strong> permiten identificar de forma anonima navegadores y dispositivos, contabilizar visitantes, medir tendencias y conocer los contenidos mas visitados.</li>
          <li><strong>Cookies de publicidad:</strong> amplian la informacion de los anuncios mostrados y ayudan a conformar perfiles de interes publicitario.</li>
          <li><strong>Cookies publicitarias de terceros:</strong> pueden ser servidas por terceros como ad-servers o plataformas externas segun sus propias politicas.</li>
        </ul>
      </section>
      <section>
        <h2>5. Cookies de analitica y terceros</h2>
        <p>Cada vez que un usuario visita un servicio, una herramienta de un proveedor externo puede generar una cookie analitica en su ordenador. Esta cookie sirve para identificar de forma anonima al visitante en proximas visitas, contabilizar el numero aproximado de visitantes y conocer los contenidos mas consultados.</p>
        <p>Salvo que el usuario decida registrarse en un servicio de idata.global, la cookie nunca ira asociada a ningun dato de caracter personal que pueda identificarle. Dichas cookies solo se utilizaran con propositos estadisticos que ayuden a la optimizacion de la experiencia en el sitio.</p>
        <p>Algunos servicios publicitarios pueden apoyarse en terceros como Google DoubleClick. Esos proveedores operan con sus propias politicas de privacidad.</p>
      </section>
      <section>
        <h2>6. Como deshabilitarlas o gestionarlas</h2>
        <p>Se pueden configurar los diferentes navegadores para avisar al usuario de la recepcion de cookies y, si se desea, impedir su instalacion en el equipo. Asimismo, el usuario puede revisar en su navegador que cookies tiene instaladas y cual es su plazo de caducidad, pudiendo eliminarlas.</p>
        <ul>
          <li>Google Chrome: https://support.google.com/chrome/answer/95647?hl=es</li>
          <li>Internet Explorer: http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions</li>
          <li>Mozilla Firefox: http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-web</li>
          <li>Safari: http://www.apple.com/es/privacy/use-of-cookies/</li>
          <li>Opera: http://help.opera.com/Windows/11.50/es-ES/cookies.html</li>
          <li>Google Analytics opt-out: http://tools.google.com/dlpage/gaoptout</li>
          <li>Your Online Choices: http://www.youronlinechoices.com/es/</li>
          <li>Google Analytics privacy: http://www.google.com/analytics/learn/privacy.html</li>
          <li>Google Analytics cookie usage: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs</li>
        </ul>
      </section>
      <section>
        <h2>7. Actualizaciones y cambios en la politica de cookies</h2>
        <p>iData Global mantendra la Politica de Cookies bajo revision constante y se reserva el derecho de modificarla periodicamente, informando cualquier actualizacion en este sitio web.</p>
      </section>
    `.trim(),
    bodyHtml_en: `
      <section>
        <h2>1. What cookies are</h2>
        <p>Cookies are small text files stored in a visitor's browser or device to collect standard Internet log information and information about behavior on a website.</p>
        <p>They help identify returning visitors, record visits and retain certain information so websites can operate more efficiently and provide a more personalized experience.</p>
      </section>
      <section>
        <h2>2. General information about their use</h2>
        <p>You can prevent cookies from being stored on your device through your browser settings.</p>
        <p>As the owner of this website, iData Global informs visitors that the site does not use personally identifiable information from cookies; it only collects general visit statistics that do not directly identify individuals.</p>
        <p>If you continue browsing the site, we will understand that you accept the use of cookies under the applicable terms.</p>
      </section>
      <section>
        <h2>3. Types of cookies that exist</h2>
        <p>Cookies used on the website may include session cookies and third-party cookies. They allow storage of information related to language, browser type and other user preferences, as well as analysis of site activity in order to improve the service.</p>
        <p>Depending on how long they remain active, cookies may be classified as session cookies or persistent cookies. Session cookies expire when the browser closes. Persistent cookies expire when their purpose is fulfilled or when they are manually deleted.</p>
      </section>
      <section>
        <h2>4. Categories according to purpose</h2>
        <ul>
          <li><strong>Performance cookies:</strong> remember preferences for tools or services so users do not need to reconfigure them on every visit.</li>
          <li><strong>Geo-location cookies:</strong> help determine the visitor's country in order to orient content in an anonymous way.</li>
          <li><strong>Registration cookies:</strong> are created when a user registers or signs in and help keep the session identified or validate access permissions.</li>
          <li><strong>Analytics cookies:</strong> help anonymously identify browsers and devices, estimate visitor counts, measure trends and identify the most visited content.</li>
          <li><strong>Advertising cookies:</strong> expand information related to ads shown to users and help build profiles of advertising interest.</li>
          <li><strong>Third-party advertising cookies:</strong> may be served by external ad servers or platforms in accordance with their own policies.</li>
        </ul>
      </section>
      <section>
        <h2>5. Analytics and third-party cookies</h2>
        <p>Whenever a user visits a service, a third-party provider may generate an analytics cookie on the user's device. That cookie may be used on future visits to anonymously identify the browser or device, estimate the number of visitors and understand which content is most attractive.</p>
        <p>Unless a user chooses to register in a service provided by iData Global, the cookie will not be associated with personally identifiable information. These cookies are used for statistical purposes intended to optimize the website experience.</p>
        <p>Some advertising services may rely on third parties such as Google DoubleClick. Those providers operate under their own privacy policies.</p>
      </section>
      <section>
        <h2>6. How to disable or manage cookies</h2>
        <p>Browsers can be configured to notify users when cookies are received and, if desired, prevent their installation. Users may also review which cookies are installed and their duration, and remove them manually.</p>
        <ul>
          <li>Google Chrome: https://support.google.com/chrome/answer/95647?hl=es</li>
          <li>Internet Explorer: http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions</li>
          <li>Mozilla Firefox: http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-web</li>
          <li>Safari: http://www.apple.com/es/privacy/use-of-cookies/</li>
          <li>Opera: http://help.opera.com/Windows/11.50/es-ES/cookies.html</li>
          <li>Google Analytics opt-out: http://tools.google.com/dlpage/gaoptout</li>
          <li>Your Online Choices: http://www.youronlinechoices.com/es/</li>
          <li>Google Analytics privacy: http://www.google.com/analytics/learn/privacy.html</li>
          <li>Google Analytics cookie usage: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs</li>
        </ul>
      </section>
      <section>
        <h2>7. Updates and changes to this cookie policy</h2>
        <p>iData Global keeps this Cookie Policy under continuous review and reserves the right to modify it periodically, informing users of any update on this website.</p>
      </section>
    `.trim(),
  },
};

function normalizeDocument(raw: any, fallback: LegalPageDocument): LegalPageDocument {
  return {
    seoTitle_es: raw?.seoTitle_es || fallback.seoTitle_es,
    seoTitle_en: raw?.seoTitle_en || fallback.seoTitle_en,
    seoDescription_es: raw?.seoDescription_es || fallback.seoDescription_es,
    seoDescription_en: raw?.seoDescription_en || fallback.seoDescription_en,
    title_es: raw?.title_es || fallback.title_es,
    title_en: raw?.title_en || fallback.title_en,
    intro_es: raw?.intro_es || fallback.intro_es,
    intro_en: raw?.intro_en || fallback.intro_en,
    bodyHtml_es: raw?.bodyHtml_es || fallback.bodyHtml_es,
    bodyHtml_en: raw?.bodyHtml_en || fallback.bodyHtml_en,
  };
}

function normalizeSettings(raw: any): LegalPagesSettings {
  return {
    privacy: normalizeDocument(raw?.privacy, defaultSettings.privacy),
    cookies: normalizeDocument(raw?.cookies, defaultSettings.cookies),
  };
}

function withVersion(settings: LegalPagesSettings) {
  return {
    ...settings,
    __version: LEGAL_PAGES_VERSION,
  };
}

export async function getLegalPagesSettings(): Promise<LegalPagesSettings> {
  if (DATA_PROVIDER === 'mock') {
    const existing = getSettings<any>('legal_pages');
    if (!existing || existing.__version !== LEGAL_PAGES_VERSION) {
      const versionedDefaults = withVersion(defaultSettings);
      saveSettings('legal_pages', versionedDefaults);
      return Promise.resolve(initializeSettings('legal_pages', versionedDefaults));
    }
    const normalized = normalizeSettings(existing);
    saveSettings('legal_pages', withVersion(normalized));
    return Promise.resolve(initializeSettings('legal_pages', normalized));
  }

  const response = await fetch(`${API_BASE_URL}/settings/legal-pages`);
  if (!response.ok) throw new Error('Failed to fetch legal pages settings');
  return normalizeSettings(await response.json());
}

export async function saveLegalPagesSettings(settings: LegalPagesSettings): Promise<LegalPagesSettings> {
  const normalized = normalizeSettings(settings);

  if (DATA_PROVIDER === 'mock') {
    saveSettings('legal_pages', withVersion(normalized));
    return Promise.resolve(normalized);
  }

  const response = await fetch(`${API_BASE_URL}/settings/legal-pages`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(normalized),
  });
  if (!response.ok) throw new Error('Failed to save legal pages settings');
  return normalizeSettings(await response.json());
}
