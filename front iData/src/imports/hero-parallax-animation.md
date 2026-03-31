Quiero que la sección inferior del hero tenga una animación tipo parallax premium inspirada en Apple + motion editorial.

1️⃣ Estructura de capas

Separar en 3 capas principales:

Background cubes (capa profunda)

Cubes front (capa media)

Glass data cards (capa superior)

Cada capa debe moverse a diferente velocidad en scroll.

2️⃣ Animación de cubos (no brusca)

Los cubos deben:

Desplazarse horizontalmente muy lento (loop infinito)

Tener ligera rotación en eje Y (1° a 3° máximo)

Micro flotación vertical (translateY 6–10px en loop suave)

Ease in-out muy orgánico (cubic-bezier suave, nada lineal)

Velocidades:

Background: 0.3x scroll

Middle layer: 0.6x scroll

Foreground cubes: 0.8x scroll

Debe sentirse profundidad real.

3️⃣ Entrada de tarjetas (Glass Cards)

Las tarjetas:

+15 Projects

+1K Artboards

Pro’s Choice

NO deben aparecer todas juntas.

Secuencia:

Fade + scale 0.95 → 1

Blur de 10px → 0px

Opacidad 0 → 100%

Delay entre cada una: 200–300ms

Duración: 600–800ms.

4️⃣ Estética Liquid Glass

Las cards deben:

backdrop-blur fuerte

fondo blanco translúcido

borde 1px blanco con baja opacidad

sombra muy suave y amplia

ligera reflexión superior (gradiente sutil)

Nada de sombras duras.
Nada de bordes marcados.
Todo debe sentirse aireado.

5️⃣ Movimiento continuo (importante)

Aunque el usuario no haga scroll:

Las cards deben tener micro floating (2–4px vertical loop).

Los cubos deben seguir moviéndose lentamente.

Todo debe sentirse vivo pero minimal.

6️⃣ Sensación general

La animación no debe sentirse:

❌ Gamer
❌ Tech agresiva
❌ Rápida

Debe sentirse:

✔ Editorial
✔ Premium
✔ Orgánica
✔ Silenciosamente futurista