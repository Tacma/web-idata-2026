OBJETIVO: Integrar el Hero principal con las 3 secciones de abajo (Servicios destacados) para que el Hero “cuente” esas 3 propuestas sin repetir bloques debajo. Mantener la lógica y contenido del sitio; el cambio es principalmente estético + interacción. Mantener estilo Apple-like + iData + Liquid Glass. Responsive mobile-first. Código organizado por componentes reutilizables, naming claro, CSS limpio, nada hardcodeado si puede ser parametrizable.

CONTEXTO ACTUAL:
- Hero con título grande: “Evoluciona de Datos a Inteligencia Empresarial”
- Debajo existe un bloque tipo tarjeta/slider con: “Inteligencia Artificial” (y otras 2 secciones equivalentes)
- Fondo del hero: círculos/arcos suaves (muy planos)

CAMBIOS SOLICITADOS (3 puntos):

1) INTEGRACIÓN HERO + 3 SECCIONES (sin duplicar abajo)
- Eliminar el bloque de “3 secciones” debajo (o reducirlo a un solo ancla/índice minimal si necesitas mantener navegación), pero la información de esas 3 secciones debe vivir dentro del Hero.
- Dentro del Hero, crear un “Service Spotlight Rotator” que rote automáticamente el contenido de las 3 secciones (ej: Inteligencia Artificial, Analítica Avanzada, Ingeniería de Datos) y sus microdescripciones/CTA.
- El rotator debe afectar SOLO el texto secundario (no reemplazar el mensaje principal completo).
- Animación del rotator: transición suave (fade + translateY leve 12–16px + blur 6–10px → 0), duration 500–700ms, delay 2500–3500ms entre cambios.
- Controles: chips/puntos minimal (3 estados) para seleccionar manualmente; al hover/press pausa el auto-rotate.
- El CTA del rotator cambia según la sección (ej: “Ver IA en acción”, “Ver analítica en acción”, “Ver ingeniería de datos”), manteniendo un estilo consistente y sin saltos de layout.

2) MANTENER “EVOLUCIONA DE DATOS…” SIEMPRE PRESENTE
- El texto principal “Evoluciona de Datos a Inteligencia Empresarial” NO debe “perderse” cuando el rotator cambia.
- Mantenerlo fijo como H1 (siempre igual), y mover/rotar SOLO:
  - Un “eyebrow” (tag arriba del H1) o
  - Un “subheadline” (línea corta debajo del H1) + párrafo corto + CTA contextual.
- Opcional premium: al hacer scroll (primer 25–35% del viewport), hacer que el H1 se convierta en un header sticky suave (reduce tamaño 100%→70%, opacity 100%→92%, translateY 0→-8px). NO hacerlo agresivo; debe sentirse editorial y no interferir con navegación.

3) CÍRCULO/ARCO DE FONDO CON VOLUMEN “VIVO” (AI LISTENING)
- El círculo/halo de atrás debe verse más voluminoso, vibrante y “vivo”, como una IA escuchando.
- Debe ser 100% vector (SVG o shapes), sin imágenes raster.
- Construir un “Living Halo”:
  - 2–3 arcos concéntricos con stroke grueso variable (stroke-width animado sutil 1–3px de variación)
  - Gradiente en colores de marca iData (usar tokens/variables existentes; no inventar paleta fuera de marca)
  - Glow suave (blur) + ligera difusión (opacity por capas)
  - Micro-ondas: un noise/wave distortion muy leve en la forma (simulación: animar dashoffset + small path morph si es posible; si no, simular con capas y gradients animados)
- Animación:
  - Rotación ultra lenta (40–70s por vuelta, imperceptible)
  - Pulsación orgánica (scale 1 → 1.03 → 1, loop 5–8s)
  - “Breathing glow” (opacity 0.35→0.55→0.35, loop 4–7s, desfasado entre capas)
  - Nada de rebotes, nada de “gamer”.
- Interacción con scroll:
  - A medida que el usuario hace scroll hacia abajo, el halo se desvanece suavemente (opacity 100%→0%), reduce glow y se “disuelve” (blur 0→10px). Transición durante el primer 35–45% del scroll desde el top del Home.

REGLAS DE DISEÑO / UX
- Estilo Apple-like: mucho aire, tipografía clara, jerarquía fuerte, sombras suaves, nada pesado.
- Liquid Glass: cards del rotator y chips deben usar glass (backdrop-blur, borde 1px translúcido, sombras muy suaves).
- Mantener accesibilidad: contraste en texto, respetar prefers-reduced-motion (si está activo, desactivar loops y dejar solo transiciones básicas).
- Performance: animaciones con transform/opacity; evitar repaints costosos.

ESTRUCTURA DE COMPONENTES (OBLIGATORIO)
Crear/actualizar componentes:
- HomeHero (layout general)
- HeroHeading (H1 fijo + eyebrow opcional)
- ServiceSpotlightRotator (data-driven, 3 items, auto-rotate + manual)
- SpotlightChips (controles)
- LivingHaloBackground (SVG/Vector + animaciones)
- CTAGroup (botones principales del hero, consistentes ES/EN)

MULTI-IDIOMA (ES/EN) OBLIGATORIO
- Todo el contenido del rotator debe existir en ES y EN:
  - Títulos de secciones (3)
  - Microdescripción
  - Texto CTA
- URLs/anchors deben respetar idioma (si aplica).
- No hardcodear strings: usar estructura i18n existente del proyecto.

ENTREGABLE
- Actualiza SOLO el inicio del Home (Hero + primera sección inmediata) para lograr esta integración.
- Asegura que el layout final NO tenga el bloque redundante de 3 secciones debajo; en su lugar, el Hero ya presenta esas 3 secciones mediante el rotator.
- Mantén toda la lógica del sitio y CTAs principales.
- Dejar el código limpio, comentado mínimo, reutilizable y mantenible.