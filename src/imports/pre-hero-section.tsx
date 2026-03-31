Objetivo: agregar nuevamente el mensaje estratégico principal del Home sin romper el diseño actual del banner slider.

No modificar el slider existente ni las imágenes. Solo agregar una capa superior muy sutil llamada **PreHeroSection** encima del banner.

1. Crear sección nueva llamada **PreHeroSection** antes del slider.

Características visuales:

* Altura aproximada 160–220px.
* Fondo blanco o glass muy sutil.
* Tipografía grande y limpia estilo Apple.
* Mucho aire.
* No usar colores planos fuertes.
* Animación fade-in suave al cargar.

2. Contenido del PreHeroSection

ESPAÑOL

Título:
Evoluciona de Datos a Inteligencia Empresarial

Subtítulo:
Impulsamos la transformación tecnológica de organizaciones líderes con soluciones end-to-end en datos, analítica avanzada e inteligencia artificial.

CTA primario:
Hablar con un Experto

CTA secundario:
Ver Casos de Éxito

ENGLISH

Title:
Evolve from Data to Business Intelligence

Subtitle:
We help organizations accelerate their technology maturity with end-to-end solutions in data, advanced analytics and artificial intelligence.

Primary CTA:
Talk to an Expert

Secondary CTA:
View Case Studies

3. Comportamiento

* Responsive mobile-first.
* Desktop: texto centrado o ligeramente alineado a la izquierda.
* Mobile: texto centrado con CTAs apilados.
* Animación fade + slight translateY.

4. Conexión con CMS

El texto debe ser editable desde HomeSections con sectionType:
preHero.

Campos:
title_es
title_en
subtitle_es
subtitle_en
ctaPrimary_es
ctaPrimary_en
ctaSecondary_es
ctaSecondary_en

5. Navbar

Mantener el botón del menú:

CTA:
Contactar (ES)
Contact (EN)

Este debe ser el CTA principal persistente del sitio.

6. Banner Slider

Cada slide del banner debe mantener su propio CTA contextual:

Slide 1:
Modernización de Datos
CTA: Evaluar mi madurez

Slide 2:
Analítica e IA
CTA: Explorar soluciones

Slide 3:
Data Operations
CTA: Hablar con un experto

7. No romper

* HomeSections
* rutas ES/EN
* responsive
* diseño del slider actual

Resultado esperado:
Un encabezado estratégico limpio encima del banner que comunica claramente qué hace iData sin competir visualmente con el slider.
