# Pendientes — Sistema de Dominio Corporal

Estado al 20/09/2026. Producción: https://santiagoarague.github.io/dominio-corporal/

---

## Hecho en esta pasada

- Link "Volver" de la prueba inicial: volvía al paso 4 y salteaba el compromiso semanal.
- `c_boss1` compartía condición con `c_combat5` y se desbloqueaban siempre juntos.
- Panel de pruebas: se anunciaba solo en Perfil con 16 acciones destructivas. Ahora el botón dice
  `v1.0` y hay que tocarlo **5 veces**.
- `segun` sin tilde, `Pulsa` → `Toca`.
- El compromiso semanal decía que el Sistema "te penaliza". Ya no hay penalización de XP.
- Fuentes de Google: se pedían dos veces (link en `<head>` + `@import` inyectado por React).
- `env(safe-area-inset-*)`, `100dvh`, inputs de 16 px en iOS.
- `navigator.storage.persist()`.
- Wake lock durante el descanso y durante la prueba de aptitud.
- `sw.js`: guardaba en caché cualquier respuesta, incluido un 404, y después la servía como copia
  offline. Caché `v1` → `v2`.
- `manifest`: `id`, `lang`, `dir`, `categories`, e icono maskable propio con zona segura.
- `netlify.toml` eliminado.
- Curva de XP: `li(50)` costaba **375** contra `li(49)=192`. Ahora es continua (`5e−55`).

### Dos pendientes que resultaron falsos

- **`coger` ×3** — son las tres `encoger` ("sin encoger los hombros"). No hay peninsularismo ahí.
- **`el móvil`, `pulsa`, `aquí`** — `móvil` y `pulsa` (minúscula) no aparecen nunca; `aquí` no es
  peninsular. El único caso real era un `Pulsa`, ya corregido. El texto de la app es tuteo neutro,
  no español de España. Pasarlo a voseo es una decisión de tono, no una corrección.

---

## A · Decisión pendiente: los rangos B, A, S y Z son inalcanzables

Es lo más grande que queda, y es tuya.

`au = {E:50, D:100, C:300, B:700, A:1500, S:3000}` son **niveles**, y con la curva actual eso es:

| Rango | Nivel | XP acumulada | Sesiones a 80 XP | Años a 4/semana |
|---|---:|---:|---:|---:|
| D | 50 | 5.880 | 73 | 0,4 |
| C | 100 | 21.755 | 272 | 1,3 |
| B | 300 | 210.255 | 2.628 | **12,6** |
| A | 700 | 1.187.255 | 14.840 | 71 |
| S | 1500 | 5.541.255 | 69.265 | 333 |
| Z | 3000 | 22.330.005 | 279.125 | 1.342 |

En la práctica el juego tiene **tres rangos**, no siete, y la ascensión —que es el corazón del
diseño— ocurre dos veces en la vida del jugador.

Arreglarlo es una línea: bajar `au`. Una propuesta con la curva ya corregida:

`au = {E:50, D:100, C:140, B:180, A:220, S:260}`

| Rango | Nivel | XP acumulada | Sesiones | Años a 4/semana |
|---|---:|---:|---:|---:|
| D | 50 | 5.880 | 73 | 0,4 |
| C | 100 | 21.755 | 272 | 1,3 |
| B | 140 | 43.455 | 543 | 2,6 |
| A | 180 | 73.155 | 914 | 4,4 |
| S | 220 | 110.855 | 1.386 | 6,7 |
| Z | 260 | 156.555 | 1.957 | 9,4 |

Z a ~9 años de entrenar en serio. Si te parece largo, bajar el último tramo. **No lo toqué porque
define la forma del juego durante años y es tu decisión, no mía.**

---

## B · Sistemas que siguen siendo botones de honor

- **Explorar**: los km se tipean a mano. El Códice (27 nodos, el mejor texto del juego) está detrás
  de **400 km declarados**. Engancharlo a hitos de entrenamiento en vez de a kilómetros.
- **Mazmorras**: ya quedó coherente (nombre y reto emparejados en `sdcPortales`), pero sigue siendo
  un botón que confirma que lo hiciste.
- **Intro**: es un log de arranque de 5 s. No cuenta ninguna historia.

## C · Variedad, lo que no se eligió

- "Foco del día" (un grupo muscular rinde más).
- Variante difícil opcional por ejercicio.

## D · Camino a la tienda

1. **Bloqueante para TWA:** la app vive en `/dominio-corporal/` y `assetlinks.json` tiene que estar
   en la raíz del dominio. Hay que **renombrar el repo a `santiagoarague.github.io`** o usar un
   dominio propio.
2. **Política de privacidad** (bloqueante para Play Console).
3. Cuenta de Play Console (25 USD), capturas, *feature graphic*.
4. `screenshots` en el manifest (faltan; necesitan la UI final).
5. Autoalojar Chakra Petch e Inter: hoy la primera pintada depende de Google Fonts.
6. Notificación diaria.
7. Respaldo: recordatorio periódico de exportar. Hoy `persist()` ayuda pero no garantiza nada.
8. Auditar áreas táctiles de 48 px.
9. **12 testers × 14 días continuos.** Es el único plazo que no se acelera: conviene arrancar la
   prueba cerrada apenas esté resuelto el punto 1.

## E · Deuda menor

- El sitio viejo de Netlify sigue online sirviendo código viejo. Conviene borrarlo para no tener dos
  apps en el teléfono (y exportar antes la partida que tengas ahí).
- `sdcWakeUse()` solo corre en el descanso y en la prueba. Podría cubrir toda la sesión.
