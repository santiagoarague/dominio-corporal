# Pendientes — Dominio Corporal

Estado al 21/09/2026. Producción: https://santiagoarague.github.io/dominio-corporal/

> **Ojo: la rama `rediseno/identidad-propia` tiene 13 commits sin publicar.** Todo lo que
> figura como "hecho" más abajo vive ahí, no en `main`. `git push` a `main` *es* el deploy.

---

## Pasada de identidad (rama `rediseno/identidad-propia`)

El juego tenía el set completo de Solo Leveling y, peor, **tres ficciones que no compartían
mundo**. Se reemplazó por una sola: *tu cuerpo es el territorio que estás relevando*.

- **Nombre**: "Sistema de Dominio Corporal" → **Dominio Corporal**. Sin narrador.
- **Léxico**: Ascensión → Umbral · Anomalías → terrenos · neutralizar → recuperar ·
  Mazmorras/Portales → Travesías · Modo Sombra → el último rango.
- **Rangos**: tres juegos de títulos, uno por modalidad, elegible en Perfil. Claves internas
  `E..Z` intactas.
- **Voseo** en la voz del juego. Texto médico y de ejecución, en neutro.
- **Primeras veces**: la app pregunta una vez y después registra el día que pudiste algo que
  antes no podías.
- **Prueba inicial sin ir al fallo**: seis descripciones para autoevaluarse.
- **Mapa del cuerpo** al frente de Entreno y abierto.
- **Accesibilidad**: contraste (de 3,13:1 a 5,12:1 en 35 textos que fallaban WCAG AA) y áreas
  táctiles (de 19 botones bajo 44 px a 1, y ese es deliberado).

### Errores viejos que aparecieron al hacerlo

- `* { font-family: 'Inter' }` le pisaba la herencia a los contenedores con Chakra Petch: el log
  de arranque, escrito para verse monoespaciado, se veía en Inter.
- `"Legendario Anomalía de Rigidez"`: adjetivo masculino con sustantivo femenino, en producción.
- **Ganar un combate y despejar una mazmorra se pintaban de gris**: no coincidían con ningún
  patrón de `sdcTier` y caían en `info`.
- Varios `<button>` sin estilo mostraban el fondo gris y el borde `outset` del navegador.
- **El mapa del cuerpo pintaba el cuerpo entero al máximo el primer día**, porque el color era
  relativo al grupo más alto y todos empiezan en nivel 1.
- `core.autocrlf=true` a nivel de sistema podía convertir LF→CRLF y correr todos los offsets.

### Dos "falsos positivos" de la auditoría vieja que eran reales

- **`el móvil` sí existía**, dos veces, en la sección neuromotora. Esta lista afirmaba que no.
- `trastear` (peninsular) en el panel de pruebas.

---

## A · Bloqueantes para publicar en Play Store

1. **Correo de contacto en `privacidad.html`** (línea 127) sigue diciendo
   `[completar con el correo de contacto]`. Es requisito obligatorio y **solo vos podés
   decidir qué dirección poner**.
2. **La app vive en `/dominio-corporal/`** y `assetlinks.json` tiene que estar en la raíz del
   dominio. Hay que renombrar el repo a `santiagoarague.github.io` o usar un dominio propio.
3. Cuenta de Play Console (25 USD), capturas y *feature graphic*.
4. `screenshots` en el manifest (faltan; necesitan la UI final).
5. **12 testers × 14 días continuos.** Es el único plazo que no se acelera.

## B · Lo que falta de la pasada de identidad

- **Explorar sigue siendo un botón de honor**: los km se tipean a mano y el Códice está detrás
  de 400 km declarados. Engancharlo a hitos de entrenamiento. El texto ya está reescrito; lo
  que falta es la mecánica.
- **Las Travesías siguen siendo un botón que confirma que lo hiciste.** Mismo problema que
  Explorar, misma decisión pendiente.

## C · Decisiones de diseño que quedaron abiertas

- **Tamaño de texto ajustable** y **poder apagar sistemas**: quedaron explícitamente fuera de
  alcance, no descartados.
- El botón manual de Primeras veces usa `window.prompt()`. Funciona en todos lados, pero merece
  una UI propia. Requiere agregar un hook al componente grande.
- La fuente "medida" de Primeras veces (récord propio superado) se dejó afuera a propósito:
  al principio casi toda sesión bate un récord y la lista se llenaría de ruido.

## D · Deuda menor

- El sitio viejo de Netlify sigue online sirviendo código viejo. Conviene borrarlo.
- El wake lock cubre descanso, prueba de aptitud, combate e Instinto Primal. No cubre la sesión
  entera.
- La notificación diaria no es trivial en una PWA: sin servidor no hay push, y las APIs que lo
  permitirían o no existen o son solo de Chrome y poco fiables.
- `zl` y `J2` quedaron como respaldo detrás de `sdcRango`/`sdcDescRango`. No molestan, pero si
  alguna vez se confirma que nunca se leen, se pueden borrar.

## E · Resuelto en pasadas anteriores

- Rangos B, A, S y Z alcanzables (`au` de `{C:300,B:700,A:1500,S:3000}` a `{C:140,B:180,A:220,S:260}`).
- Curva de XP continua en el nivel 50.
- Fuentes autoalojadas: la app no hace ninguna petición externa.
- Service worker network-first de verdad (`cache:'reload'` para el HTML) y solo cachea 200s
  del mismo origen.
- Política de privacidad, recordatorio de respaldo, `navigator.storage.persist()`, wake lock.
