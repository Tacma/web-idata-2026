Necesitamos rediseñar completamente la sección de Insights del Home para que tenga una composición editorial más moderna.

Eliminar el layout actual y crear una nueva sección llamada:

InsightsEditorialSection

OBJETIVO

Mostrar 5 artículos reales del blog de iData en una composición de 3 columnas.

COLUMNAS

COLUMNA 1

2 artículos compactos con:

title
description
cta "Leer artículo"

Artículo 1

Título:
Data Governance: Mejores Prácticas

Descripción:
Cómo implementar un framework efectivo de gobierno de datos en organizaciones modernas.

Link:
"/blog/data-governance-mejores-practicas/"


Artículo 2

Título:
Arquitecturas Modernas de Datos

Descripción:
Principios clave para diseñar arquitecturas de datos escalables en entornos cloud.

Link:
"/blog/arquitecturas-modernas-de-datos/"


COLUMNA 2 (ARTÍCULO DESTACADO)

Artículo principal con imagen de fondo.

Título:
El Futuro de la Analítica de Datos

Descripción:
Exploramos cómo la analítica avanzada y la inteligencia artificial están redefiniendo la toma de decisiones empresariales.

Link:
"/blog/el-futuro-de-la-analitica-de-datos/"

Diseño:

imagen grande de fondo
overlay degradado oscuro
texto encima
botón "Leer artículo"

La imagen debe ocupar toda la tarjeta.


COLUMNA 3

Artículo pequeño

Título:
IA Generativa en Empresas: Casos de Uso Reales

Descripción:
Aplicaciones prácticas de la inteligencia artificial generativa en empresas.

Link:
"/blog/ia-generativa-casos-de-uso/"


Debajo de este artículo agregar un bloque CTA:

Título:
Más insights

Descripción:
Explora nuestra biblioteca completa de artículos sobre datos, analítica e inteligencia artificial.

Botón:
Ver todos los artículos

Link:
"/blog/"


REGLAS DE DISEÑO

- layout en grid de 3 columnas
- composición editorial
- mucho espacio en blanco
- hover suave
- responsive
- en mobile convertir a stack vertical

IMPLEMENTACIÓN

Crear componente:

InsightCard

props:

title
description
image
link
variant ("featured" o "compact")

No hardcodear si existe colección Blog.
Si existe CMS usar los artículos más recientes.

OBJETIVO

Que la sección de insights del Home tenga un diseño editorial moderno y conecte directamente con la página de blog.