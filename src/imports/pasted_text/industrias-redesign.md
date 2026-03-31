Vamos a rediseñar la página de Industrias con una interacción más potente y más útil que una simple grilla estática.

IMPORTANTE
No inventar industrias.
No quitar ninguna industria que aparece en el sitio actual de iData.
Usar exactamente los sectores reales publicados actualmente.

SECTORES REALES OBLIGATORIOS

1. Petróleo y Gas
2. Energía y Telco
3. Logística
4. Construcción y Vías
5. Retail y Manufactura
6. Gobierno
7. Finanzas y Seguros
8. Salud
9. Otras industrias

OBJETIVO DE UX

No queremos una página con cards estáticas + páginas de detalle separadas.
Queremos una experiencia más dinámica dentro de la misma pantalla.

PROPUESTA DE INTERACCIÓN

Crear una grilla tipo flexbox / masonry controlada con 4 columnas en desktop.

Cada industria inicia como una tarjeta cuadrada compacta.

Cuando el usuario hace clic en una industria:
- esa tarjeta debe expandirse ocupando el espacio equivalente a 4 cards
- debe desplegar el contenido completo de esa industria
- las demás cards deben reacomodarse alrededor
- la expansión debe sentirse natural, elegante y fluida
- no abrir una página nueva
- no usar modal
- no sacar al usuario del contexto

La experiencia debe parecer una grilla editorial interactiva y premium.

ESTILO DE REFERENCIA

Tomar como referencia un layout similar al ejemplo cargado:
- bloques cuadrados
- algunos se expanden más grandes al interactuar
- composición flexible
- sensación moderna y editorial
- mucho aire
- interacción elegante

LAYOUT

DESKTOP
- grid de 4 columnas
- cards base cuadradas
- al expandirse, una card puede ocupar ancho 2 columnas x alto 2 filas, o un bloque equivalente a 4 cards
- la expansión debe empujar y reorganizar las demás cards de la grilla

TABLET
- grid de 2 columnas
- mantener interacción expandible adaptada

MOBILE
- stack vertical
- expansión tipo accordion dentro de cada card

CONTENIDO DE CADA CARD CERRADA

Cada industria en estado cerrado debe mostrar:
- icono o visual
- nombre de la industria
- 2 o 3 desafíos clave del sector
- CTA visual sutil tipo “Ver más” o flecha

CONTENIDO DE CADA CARD EXPANDIDA

Cuando la card se despliega debe mostrar:
- nombre de la industria
- descripción completa
- desafíos clave
- cómo iData puede aportar valor en ese sector
- CTA final “Hablar con un experto” o “Ver servicios”

No crear una subpágina separada para cada industria.
Todo el detalle debe vivir en esta misma pantalla expandible.

CONTENIDO REAL POR INDUSTRIA

Usar esta información base tomada del sitio actual de iData y enriquecerla sin inventar promesas irreales:

1) Petróleo y Gas
Descripción:
Convertimos datos en decisiones estratégicas para optimizar operaciones, reducir costos y aumentar la seguridad.
Desafíos clave:
- optimización operativa
- reducción de costos
- seguridad y confiabilidad
Aporte de iData:
- visibilidad de operación
- analítica para eficiencia
- mejor toma de decisiones

2) Energía y Telco
Descripción:
Impulsamos eficiencia operativa, gestión de infraestructuras y experiencia del cliente con analítica avanzada.
Desafíos clave:
- eficiencia operativa
- gestión de infraestructura
- experiencia del cliente
Aporte de iData:
- analítica avanzada
- optimización de activos
- mejor servicio

3) Logística
Descripción:
Hacemos cadenas de suministro más ágiles y resilientes con trazabilidad en tiempo real y predicción de la demanda.
Desafíos clave:
- trazabilidad
- predicción de demanda
- resiliencia operativa
Aporte de iData:
- monitoreo de cadena
- analítica para demanda
- eficiencia logística

4) Construcción y Vías
Descripción:
Mejoramos la planificación, ejecución y control de proyectos con soluciones basadas en datos.
Desafíos clave:
- planificación
- ejecución
- control de proyectos
Aporte de iData:
- visibilidad de avance
- control basado en datos
- mejor toma de decisiones

5) Retail y Manufactura
Descripción:
Desde inventarios inteligentes hasta motores de recomendación, potenciamos la experiencia del cliente y las ventas online.
Desafíos clave:
- inventario
- experiencia del cliente
- ventas y eficiencia
Aporte de iData:
- analítica comercial
- optimización de inventario
- personalización

6) Gobierno
Descripción:
Generamos impacto social y transparencia al apoyar la toma de decisiones con datos confiables y modelos predictivos.
Desafíos clave:
- transparencia
- impacto social
- decisiones públicas
Aporte de iData:
- datos confiables
- modelos predictivos
- mejor gestión pública

7) Finanzas y Seguros
Descripción:
Optimizamos análisis de riesgo, detección de fraude y modelos de scoring con IA confiable.
Desafíos clave:
- riesgo
- fraude
- scoring
Aporte de iData:
- IA confiable
- analítica de riesgo
- automatización de evaluación

8) Salud
Descripción:
Aplicamos IA ética para gestión de pacientes, predicción de demanda y trazabilidad en servicios de salud.
Desafíos clave:
- gestión de pacientes
- predicción de demanda
- trazabilidad
Aporte de iData:
- IA ética
- analítica operativa
- mejor visibilidad clínica y administrativa

9) Otras industrias
Descripción:
Adaptamos nuestras soluciones de datos e IA para responder a las necesidades únicas de cada sector.
Desafíos clave:
- necesidades específicas
- adaptación sectorial
- escalabilidad
Aporte de iData:
- enfoque flexible
- soluciones a medida
- consultoría aplicada

REGLAS VISUALES

- Mantener coherencia con el Home, Services y Case Studies
- Reutilizar tipografía, espaciados y sistema visual existente
- No hacer la página recargada
- Mantener look sobrio y premium
- Usar microinteracciones suaves
- La expansión debe sentirse elegante, no brusca
- No usar colores planos excesivos
- Mantener consistencia con el design system ya definido

COMPONENTES

Crear un componente reusable:
IndustryExpandableCard

Estados:
- collapsed
- expanded

Props:
- title_es
- title_en
- description_es
- description_en
- challenges_es[]
- challenges_en[]
- value_es[]
- value_en[]
- icon
- image
- slug_es
- slug_en

IDIOMA

La página debe seguir existiendo en:
- /es/industrias
- /en/industries

Todo el contenido debe estar en ambos idiomas.
El cambio de idioma debe mantener la misma página y, si una card está expandida, idealmente mantener expandida la industria equivalente.

CTA FINAL DE PÁGINA

Al final de la página mantener un CTA general del sitio:
ES:
¿Listo para transformar tu industria con datos?
Botón:
Hablar con un experto

EN:
Ready to transform your industry with data?
Button:
Talk to an expert

OBJETIVO FINAL

Que la página de Industrias se convierta en una experiencia interactiva tipo grid expandible, mucho más potente que una simple grilla estática, manteniendo toda la información real del sitio actual de iData y sin perder coherencia visual con el resto del sitio.