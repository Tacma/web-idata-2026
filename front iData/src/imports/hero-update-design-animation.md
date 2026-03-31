ACTUALIZACIÓN URGENTE DEL HERO – CORREGIR DISEÑO + ANIMACIÓN

Hay 4 problemas actuales que debes corregir:

1️⃣ El vector circular de fondo desapareció.
2️⃣ El texto no está rotando (solo quedó uno fijo).
3️⃣ La diagramación es plana y poco creativa.
4️⃣ El título es excesivamente grande y rompe proporción.

Vamos a rediseñar el Hero correctamente.

────────────────────────────
🔵 1. RESTAURAR Y MEJORAR EL HALO / VECTOR VIVO
────────────────────────────

Volver a agregar el fondo circular vectorial (NO imagen raster).

Debe ser un componente llamado:
LivingHaloBackground

Construcción:

- 2–3 arcos concéntricos SVG
- Stroke con gradiente usando colores oficiales iData
- Glow suave (blur leve)
- Capas con diferente opacidad

Animación:

- Rotación ultra lenta (50s por vuelta)
- Pulsación orgánica: scale 1 → 1.04 → 1 (loop 6s)
- Variación leve de grosor (stroke-width animado 1–2px)
- Opacidad respirando (0.35 → 0.55 → 0.35)

Debe sentirse como:
Una IA activa escuchando.
Viva.
Vibrante.
Pero elegante.

Al hacer scroll:
opacity 100% → 0%
blur 0px → 10px
scale 1 → 0.95
durante el primer 40% del scroll.

────────────────────────────
🔵 2. ROTACIÓN REAL DE TEXTOS (NO ESTÁTICO)
────────────────────────────

Crear componente:
ServiceRotator

Debe rotar 3 servicios reales (no simular):

Ejemplo estructura:
- Inteligencia Artificial
- Analítica Avanzada
- Ingeniería de Datos

Comportamiento:

Auto-rotate cada 3 segundos.
Transición:
opacity 0 → 100%
translateY 20px → 0
blur 8px → 0
duración 500–700ms.

Debe existir estado activo visible (chips minimal debajo).

Al hover:
pausa el auto-rotate.

────────────────────────────
🔵 3. NUEVA DIAGRAMACIÓN MÁS CREATIVA
────────────────────────────

Eliminar layout centrado plano.

Nueva composición:

- Título alineado ligeramente hacia la izquierda del centro.
- Halo ligeramente desplazado detrás del título.
- El rotator debe aparecer en bloque tipo glass card flotante debajo del título, no simplemente texto plano.
- CTA principal debajo alineado con el título.
- CTA secundario más minimal al lado derecho.

Debe sentirse:

Menos PowerPoint.
Más producto premium.

Espaciado amplio.
Más respiración.
Más jerarquía.

────────────────────────────
🔵 4. REDUCIR TAMAÑO DEL TÍTULO
────────────────────────────

El H1 actual es absurdamente grande.

Reducir:

Desktop:
max-width 900px
font-size entre 64px y 76px (NO más grande)
line-height 1.05–1.1

Tablet:
48–56px

Mobile:
34–40px

Debe seguir siendo dominante,
pero no exagerado.

────────────────────────────
🔵 5. REGLAS IMPORTANTES
────────────────────────────

- Mantener colores oficiales iData.
- No hardcodear textos (respetar ES/EN).
- Usar componentes reutilizables.
- Código limpio, optimizado, sin divs innecesarios.
- Animaciones usando transform y opacity (performance).

────────────────────────────
RESULTADO ESPERADO

Un hero:

✔ Más dinámico.
✔ Más premium.
✔ Con halo vivo real.
✔ Con rotación funcional.
✔ Mejor jerarquía.
✔ Proporciones equilibradas.
✔ Más creativo que un layout centrado clásico.

Actualizar SOLO el Hero del Home.
No tocar otras secciones.