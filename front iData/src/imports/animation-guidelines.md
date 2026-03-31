Eliminar completamente el botón de play (era solo referencia visual).

La animación actual no debe ser flotación aleatoria.

Necesito que el movimiento tenga dirección clara y jerarquía.

1️⃣ Sistema de movimiento correcto

Dividir los elementos en 3 grupos:

Grupo A (izquierda principal)

Grupo B (centro – glass cards)

Grupo C (derecha secundaria)

2️⃣ Dirección del movimiento

No deben flotar libremente.

El movimiento debe ser:

Horizontal dominante (izquierda → derecha)

Muy lento

Loop continuo

Sin rebote

Sin movimiento caótico

Debe sentirse como una banda transportadora muy elegante.

3️⃣ Velocidades distintas por grupo

Grupo A (fondo izquierdo):
Movimiento 20–30px en 12s
Muy sutil.

Grupo B (cards principales):
Movimiento 40–60px en 12s
Más perceptible pero elegante.

Grupo C (lado derecho):
Movimiento 15–25px en 12s
Más lento que el centro.

Ningún elemento debe moverse igual que otro.

4️⃣ Profundidad real

Aplicar:

Opacidad menor en capas más lejanas.

Blur ligero en capas profundas.

Sombra más intensa en las frontales.

Parallax activado con scroll (0.3x, 0.6x, 0.8x).

5️⃣ Secuencia inicial (muy importante)

Al cargar:

Primero aparece la card central (Pro’s Choice).

Luego la de +15 Projects.

Luego la de +1K Artboards.

Cada una con:

Fade

Scale 0.95 → 1

Blur 12px → 0

Delay 250ms entre cada una.

Solo después de la entrada empieza el loop horizontal.

6️⃣ Sensación general

No quiero:

❌ Flotación tipo screensaver
❌ Movimiento vertical continuo
❌ Rebotes
❌ Ease exagerado

Quiero:

✔ Movimiento editorial
✔ Coreografía con intención
✔ Sensación de sistema
✔ Futurismo silencioso