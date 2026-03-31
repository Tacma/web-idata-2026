Vamos a llevar el Home de iData al siguiente nivel visual sin romper la arquitectura existente ni el sistema dinámico.

Mantén todas las reglas anteriores:
- Componentes reutilizables obligatorios.
- Nada hardcodeado si es administrable.
- Soporte completo ES/EN.
- Todo responsive (mobile-first).
- Mantener conexión con HomeSections.
- No romper rutas ni SEO.

OBJETIVO VISUAL:
Estética sobria, minimalista, tipo Apple.
Futurista pero elegante.
Liquid glass sutil.
Parallax muy leve.
Microinteracciones premium.
Nada exagerado ni “gamer”.

1) IMPLEMENTAR NUEVO HERO INICIAL COMO TRIPLE BANNER ESTRATÉGICO

Crear nuevo sectionType: strategicBannerTriple

Debe renderizar 3 paneles estratégicos configurables desde HomeSections.

Cada panel debe tener:
- title_es / title_en
- description_es / description_en
- ctaLabel_es / ctaLabel_en
- ctaHref
- backgroundImage
- accentColor opcional

Visual:
- Layout horizontal en desktop
- Stack vertical en mobile
- Fondo con imagen + overlay degradado
- Capa liquid glass encima con blur sutil
- Hover con elevación leve + cambio suave de opacidad
- Micro animación de entrada en scroll
- Movimiento parallax extremadamente leve en background (translateY 5-10px máximo)
- Nada exagerado

2) IMPLEMENTAR ESTÉTICA LIQUID GLASS GLOBAL

- Navbar con glass effect leve (blur + transparencia ligera)
- Cards principales con fondo semitransparente leve
- CTA buttons con borde luminoso muy sutil
- Section backgrounds alternando blanco y gris claro
- Evitar saturación de colores fuertes

3) PALETA

Usar principalmente:
- Blanco
- Gris claro (#E6E6E6)
- Negro profundo (#0B231F)
- Azul iData (#4387DF) como accent principal
- Violeta (#8138C6) como acento secundario muy controlado

No usar todos los colores primarios al tiempo.
Mantener sobriedad.

4) IMÁGENES

Implementar:
- Imagen abstracta tipo data flow o network para hero
- Imágenes enterprise limpias en secciones clave
- Imágenes en case studies más editoriales
- Todas responsive
- Soporte para coverImage desde CMS donde aplique

5) LOGO

Usar:
- "logo" como logotipo completo en navbar
- "simbolo" como versión reducida en favicon o usos secundarios
No modificar proporciones.

6) MICROINTERACCIONES

- Fade in en scroll suave
- Hover suave en cards
- Transiciones 200–300ms
- Nada dramático
- Mantener sensación premium

7) PERFORMANCE

- No usar animaciones pesadas
- Mantener parallax leve
- Todo debe seguir siendo rápido

No romper estructura.
No romper HomeSections.
No eliminar secciones actuales.
Solo evolucionar diseño y crear strategicBannerTriple.

Resultado esperado:
Un Home sobrio, premium, futurista, tipo Apple, con liquid glass elegante y triple banner estratégico como entrada.