Necesitamos validar y corregir toda la navegación de la página de detalle de servicios.

CONTEXTO
Esta pantalla corresponde al detalle de un servicio (ejemplo: Data Strategy & Governance) dentro del sitio web de iData Global.

Tu tarea es revisar TODOS los botones y enlaces visibles en esta pantalla y confirmar que su navegación sea coherente con la arquitectura del sitio.

Si detectas inconsistencias debes corregirlas.

ARQUITECTURA DEL SITIO

ES
/
 /servicios
 /servicios/{service-slug}
 /industrias
 /casos
 /casos/{case-slug}
 /insights
 /insights/{article-slug}
 /nosotros
 /contacto

EN
/en
/en/services
/en/services/{service-slug}
/en/industries
/en/case-studies
/en/case-studies/{case-slug}
/en/insights
/en/insights/{article-slug}
/en/about
/en/contact


BOTONES QUE DEBES VALIDAR EN ESTA PÁGINA

1️⃣ HERO

Botón: "Talk to an expert"

Debe llevar a:

/contact

Mejor aún:

/contact?service=data-strategy-governance

Esto permite que el formulario se abra con el servicio ya seleccionado.


Botón: "View case studies"

Debe llevar a:

/case-studies

Si el sistema permite filtros:

/case-studies?service=data-strategy


2️⃣ NAVBAR

Services → /services  
Industries → /industries  
Case Studies → /case-studies  
Insights → /insights  
About → /about  
Contact → /contact  


3️⃣ SECCIÓN "EXPLORE OTHER SERVICES"

Cada tarjeta debe llevar a su página de detalle.

Ejemplo:

Data Engineering → /services/data-engineering  
Advanced Analytics → /services/advanced-analytics  
Artificial Intelligence → /services/artificial-intelligence  


4️⃣ CTA FINAL

Botón: "Talk to an expert"

Debe llevar a:

/contact

o idealmente

/contact?service=data-strategy-governance


5️⃣ FOOTER

Services → /services  
Insights → /insights  
Case Studies → /case-studies  
About → /about  
Contact → /contact  


REGLA DE CONSISTENCIA

Ningún botón debe:

- quedarse sin enlace
- redirigir al home
- duplicar navegación
- tener rutas inconsistentes


IDIOMAS (MUY IMPORTANTE)

El cambio de idioma debe respetar la página actual.

Ejemplo:

/en/services/data-strategy-governance

al cambiar idioma debe ir a

/es/servicios/estrategia-gobierno-datos

NO al home.


VERIFICACIÓN QUE DEBES HACER

1. Revisar todos los botones de la página
2. Confirmar su destino
3. Corregir rutas si es necesario
4. Mantener consistencia con la arquitectura del sitio
5. Mantener compatibilidad con el sistema de idioma
6. No romper componentes existentes


OBJETIVO

Garantizar que toda la navegación de la página de detalle de servicio sea coherente, predecible y consistente con el resto del sitio.