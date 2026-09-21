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

### Segunda pasada

- **La app mentía sobre los XP en cuatro lugares más**: la ayuda ("Meta semanal" y "Escudo de
  Racha"), la descripción del escudo en la tienda y la meta semanal de Perfil seguían diciendo que
  perdías XP. No se pierde XP en ningún caso desde que se sacó la penalización.
- **Áreas táctiles**, medidas en el navegador, no supuestas: la barra de pestañas pasó de 34 a
  48 px y los steppers `− +` de 32 a 44. `touch-action:manipulation` en todos los botones.
- **`privacidad.html`**: política de privacidad completa, enlazada desde Perfil. Es requisito
  bloqueante de Play Console. **Falta completar el correo de contacto** (está marcado en la página).
- **Recordatorio de respaldo** en Entreno, a los 10 días de historial. "Más tarde" lo calla una
  semana; exportar, un mes.
- **Wake lock** extendido a los cronómetros de combate e Instinto Primal.

### Dos pendientes que resultaron falsos

- **`coger` ×3** — son las tres `encoger` ("sin encoger los hombros"). No hay peninsularismo ahí.
- **`el móvil`, `pulsa`, `aquí`** — `móvil` y `pulsa` (minúscula) no aparecen nunca; `aquí` no es
  peninsular. El único caso real era un `Pulsa`, ya corregido. El texto de la app es tuteo neutro,
  no español de España. Pasarlo a voseo es una decisión de tono, no una corrección.

---

## A · ~~Los rangos B, A, S y Z son inalcanzables~~ — resuelto

`au` pasó de `{E:50, D:100, C:300, B:700, A:1500, S:3000}` a
`{E:50, D:100, C:140, B:180, A:220, S:260}`. Antes el juego tenía tres rangos reales de siete:
el rango B costaba 255.000 XP (12,6 años entrenando cuatro veces por semana) y el Z, 22,9 millones.

| Rango | Nivel | XP acumulada | Sesiones a 80 XP | Años a 4/semana |
|---|---:|---:|---:|---:|
| D | 50 | 5.880 | 73 | 0,4 |
| C | 100 | 21.755 | 272 | 1,3 |
| B | 140 | 43.455 | 543 | 2,6 |
| A | 180 | 73.155 | 914 | 4,4 |
| S | 220 | 110.855 | 1.386 | 6,7 |
| Z | 260 | 156.555 | 1.957 | 9,4 |

Verificado saltando rango por rango con el panel de pruebas.

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
2. ~~Política de privacidad~~ — hecha (`privacidad.html`). **Falta poner el correo de contacto.**
3. Cuenta de Play Console (25 USD), capturas, *feature graphic*.
4. `screenshots` en el manifest (faltan; necesitan la UI final).
5. Notificación diaria (ver nota en E: no es trivial en una PWA).
6. ~~Recordatorio de respaldo~~ — hecho.
7. Áreas táctiles: hechas las dos que importaban. Quedan las cabeceras plegables (21 px), la
   `💡 alternativa` (21 px) y el `?` de la cabecera (22 px); subirlas cambia la densidad visual de
   todas las tarjetas, así que es una decisión de diseño.
8. ~~Autoalojar las fuentes~~ — hecho. Chakra Petch e Inter viven en `fuentes/` (5 archivos
   woff2, 88 KB). **La app ya no hace ninguna petición externa**, y la política de privacidad puede
   decir "ninguna conexión a terceros" y ser cierta.
9. **12 testers × 14 días continuos.** Es el único plazo que no se acelera: conviene arrancar la
   prueba cerrada apenas esté resuelto el punto 1.

## E · Deuda menor

- El sitio viejo de Netlify sigue online sirviendo código viejo. Conviene borrarlo para no tener dos
  apps en el teléfono (y exportar antes la partida que tengas ahí).
- El wake lock cubre descanso, prueba de aptitud, combate e Instinto Primal. No cubre la sesión
  entera, que es lo que haría falta si el teléfono se apaga entre series sin cronómetro.
- La notificación diaria no es trivial en una PWA: sin servidor no hay push, y las APIs que lo
  permitirían (Notification Triggers, Periodic Background Sync) o no existen o son solo de Chrome y
  poco fiables. Conviene decidir si vale la pena antes de invertir en ello.
