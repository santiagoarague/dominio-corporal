# Pendientes — Dominio Corporal

Estado al 21/09/2026. Producción: https://santiagoarague.github.io/dominio-corporal/

> Todo lo que figura como "hecho" más abajo ya está en `main` y en producción.
> `git push` a `main` *es* el deploy.

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

- ~~Explorar y las Travesías eran botones de honor~~ — resuelto. Las dos ahora son sesiones
  que la app acompaña con el tiempo corriendo. No era un problema de tramposos (la app es de
  un solo jugador): era que te pedían llenar un formulario en vez de estar con vos.

## B2 · Errores encontrados jugando

- ~~En Combate el reloj arrancaba solo~~ — resuelto. Elegías el tren y la cuenta empezaba
  sin que tocaras nada; si no llegabas, perdías un corazón. Y volvía a pasar **después de
  cada golpe acertado**. Ahora hay una tarjeta *"Cuando estés listo"* que te dice cuántas
  reps y cuántos segundos vas a tener, y el reloj recién arranca cuando tocás **Empezar**.
  El límite de tiempo sigue existiendo: es lo que diferencia al combate de la rutina.
- De paso: irte a otra pestaña en medio de la ventana ya no te cuesta un corazón, y
  "Cancelar (sin perder vida)" ahora borra las series marcadas.

- ~~Con todo minimizado igual saturaba~~ — resuelto. La guía de 17 temas se mostraba **abierta
  y en las seis pestañas**: 1.976 px que dejaban la botonera del juego en el pixel 2.354, casi
  tres pantallazos abajo. `Minimizar todo` no la tocaba porque no estaba en `af`. Ahora arranca
  cerrada, se abre desde un botón que dice **¿Cómo funciona?** en vez de un `?` suelto, y cada
  tema se despliega solo si lo tocás (los tres básicos vienen abiertos). Las pestañas pasaron
  de 2.751–3.424 px a 812–1.437.
- ~~Perfil tenía ocho barras plegadas~~ — resuelto. **Atributos**, **Volumen de por vida** y
  **Hazañas totales** eran lo mismo: números que mirás y nunca tocás. Ahora son una sola
  tarjeta, **Tus números**, con tres secciones adentro. Quedan seis barras. No se sacó ni un
  dato.

- ~~Constancia mostraba cuadraditos vacíos de días que ya pasaron~~ — resuelto. La grilla armaba
  28 días siempre, así que un jugador nuevo veía **27 cuadros vacíos y uno real**, con una
  leyenda de seis colores que nunca había tenido. Ahora la grilla arranca el primer día con
  registro: día uno son 1 cuadro y 1 referencia (326 px → 220). **Los huecos del medio se
  mantienen**: son días que sí faltaste, y taparlos dibujaría una racha que no existió.

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
