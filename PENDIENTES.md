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

- ~~El estiramiento parecía forzado~~ — resuelto. Era la única pantalla que **mirabas** en vez
  de hacer: un reloj de 5 minutos sin sonido, sin wake lock (la pantalla se apagaba), con el
  contador descontándose solo (se congelaba al bloquear el teléfono) y con **cuatro de los
  nueve estiramientos por lado sin que nada te avisara de cambiar de pierna**. Ahora cada lado
  es un paso propio con su beep, hay dos rutinas (**Corta 3:00** y **Completa 6:05**), el
  tiempo se calcula desde una marca de reloj así que irte a otra pestaña no lo congela, y si
  cortás a mitad de camino cobrás lo que hiciste.
- **Y ahora mide algo.** Una vez por semana te pregunta hasta dónde llegás sentado con las
  piernas estiradas (cinco opciones, de las rodillas a las palmas en el piso). Cuando mejorás,
  entra en **Primeras veces**. Era la única sección que no te enseñaba nada de tu cuerpo.

- ~~La guía no alcanzaba para alguien que nunca jugó nada~~ — resuelto. Pasó de 17 temas a 26,
  agrupados en cinco secciones. Explicaba el juego con las palabras del juego: hablaba del
  *Umbral* tres temas antes de definirlo y de *los cuatro patrones* sin que nada en la app
  dijera nunca qué es un patrón. Y faltaba lo más importante: no había un tema para la rutina
  del día, ni para **cómo se anota una serie** (la única interacción de la que depende todo),
  ni para el estiramiento, Primeras veces, el mapa del cuerpo, el calendario, los logros o el
  calibre. Lo peor: **nada le decía al jugador que su partida vive solo en ese teléfono.** Ese
  es ahora el último tema.
- Y se lee: títulos de 16 px, texto de 15 px con interlineado 1,65 y más contraste. Antes era
  el mismo 12 px apretado que usan las etiquetas.

- ~~En gimnasio había un solo peso por ejercicio y un número que no significaba nada~~ —
  resuelto. Ahora **cada serie tiene su propio campo de kilos**, alineado debajo de las fichas
  de repeticiones, y podés subir el peso serie a serie como se hace de verdad. Escribir 30 en
  la primera llena las siguientes; cambiás la segunda a 32,5 y arrastra a la tercera. Y
  aparece **"La última vez: 30 · 32,5 · 35 kg"**, que es el dato que un gimnasio necesita.
- Se fue el **"= 450 kg movidos"** de al lado del ejercicio. Es un total de carga, no algo que
  levantaste: 20 kg × 30 reps le gana a 60 kg × 8 y eso no tiene sentido. El acumulado de por
  vida sigue existiendo (16 logros dependen de él) y ahora se ve en Perfil → Tus números.
- De paso: **no se podían escribir decimales** en el peso. "32," se parseaba a 32, el campo se
  redibujaba y la siguiente tecla daba 325.

- ~~La guía tenía 26 temas y varios eran la misma pregunta partida~~ — resuelto. Quedaron **18
  en cuatro grupos**. *Modo Recuperación*, *Día de descanso* y *Escudo de Racha* eran tres
  temas de una oración cada uno contestando una sola pregunta: ahora son **"Si hoy no podés"**.
  *El Umbral* solo existe como la puerta entre rangos, así que vive dentro de *Los rangos*.
  *¿Qué cuenta como sesión?* y *el calendario* entraron en **"Tu semana"**. El índice bajó de
  1.653 px a 1.209 y no se perdió un solo dato.

- ~~Si te interrumpían a mitad de la sesión, la app se olvidaba de todo~~ — resuelto, y era lo
  peor que había. Las series marcadas vivían solo en memoria: marcabas 2 de 3, se bloqueaba el
  teléfono o el sistema descartaba la app mientras contestabas un mensaje, volvías y **no
  habías hecho nada**. Ahora cada toque deja anotado qué marcaste; volvés y está todo donde lo
  dejaste. El XP sigue liquidándose una sola vez al registrar, así que *Deshacer registro de
  hoy* no cambió.

- ~~4 a 12 segundos de pantalla negra al abrir~~ — resuelto a medias, y es lo honesto: el
  procesamiento de 498 KB de JavaScript no se puede acelerar sin rehacer la app. Pero a los
  **170 ms** ya se ve el nombre, tu nivel y una barra moviéndose, en vez de negro. Los mismos
  segundos; la diferencia es que parece viva y no rota.
- ~~La rutina arrancaba en el pixel 1.222~~ — resuelto. Ahora arranca en el **478**, dentro de
  la primera pantalla. El mapa del cuerpo baja mientras no entrenaste y **vuelve arriba cuando
  terminás**: ahí sí es un premio y no un peaje.
- ~~No se podía anotar un día que ya pasó~~ — resuelto. Tocás un cuadrito vacío o fallado en
  Constancia y aparece *"Entrené este día y me olvidé de anotarlo"*, con confirmación. **No da
  XP** (no hay forma de saber cuánto hiciste) pero el día cuenta y la racha se recalcula. Solo
  puede subirla, nunca bajarla.
- ~~Los logros de gimnasio tenían números absurdos~~ — resuelto. Eran 16 y **nueve** medían
  "kg movidos", justo el número que sacamos de la pantalla por engañoso. El último pedía
  **1.000.000 de kg**: entre cuatro y ocho años. Quedaron 12, el tope es 150.000 (≈ un año) y
  dicen *"sumando todas tus series"*, que es lo que el número realmente es.

- ~~La rutina repetía los mismos cuatro ejercicios durante meses~~ — resuelto a medias. No era
  falta de contenido: hay 70 ejercicios escritos, pero `_d` **nunca recibía la fecha**, así que
  tu rango fijaba los cuatro movimientos y lo único que cambiaba era uno de seis modificadores.
  Del nivel 1 al 50 hacen falta 5.880 XP: **entre 36 y 85 sesiones** con los mismos cuatro.
  Ahora cada escalón de **peso corporal tiene 3 ejercicios** (84 en total) y la app rota por día.
- **Las tres modalidades tienen 3 por escalón: 252 ejercicios**, de los 70 que había.
- **Flow está completo: los cuatro patrones, 84 ejercicios.** Empuje con queda de rins, aú, baby
  freeze, bananeira y molino. Y tracción propia, armada solo con movimientos que **traccionan de
  verdad**: colgarse (pasivo, activo, skin the cat, front lever), arrastres por el suelo que
  tiran con el dorsal, y el macaco, donde te tirás por encima del brazo apoyado. Nada de puentes
  ni escorpiones disfrazados de tracción.


- ~~Metas de repeticiones imposibles en los sostenes~~ — resuelto. Audité las 252 variantes: el
  daño estaba todo en los ejercicios de sostén, porque `repFactor` no sabía que "1 rep = 3
  segundos" cuesta el triple. El peor pedía **60 segundos de pino libre en la primera serie**
  (y hay tres). La plancha con disco del gimnasio pedía **120 segundos**. Ahora el peor sostén
  es de 30 s y la serie más grande bajó de 24 a 20 reps.
- ~~Resistencia cobraba de más y el peso no contaba para nada~~ — resuelto. `resistencia` hacía
  **140% de las reps cobrando 1×**, o sea que le pagaban entero un volumen que los otros dos
  cambian por intensidad. Medido en gimnasio rango C, misma sesión: fuerza 210, salud 200,
  resistencia **268**. Ahora resistencia cobra 0,8× y queda en 214, apenas 2% arriba de fuerza
  — a propósito, porque 238 repeticiones llevan más tiempo que 110.
- **Y la carga ahora da XP**: superar tu mejor marca en un patrón paga **+25 XP** con aviso
  ("Piernas y glúteos 60 → 65 kg"). Solo cuenta si ya tenías marca previa: la primera sesión de
  gimnasio de tu vida no regala 100 XP por anotar cuatro números.
- ~~El peso se guardaba por patrón, no por ejercicio~~ — resuelto, y lo había roto yo al meter
  la rotación. Con un solo ejercicio por escalón daba igual; con tres, *Prensa de piernas*,
  *Extensión de cuádriceps* y *Curl femoral* compartían casillero. La app te decía "La última
  vez: 120 kg" debajo de una extensión de cuádriceps, te llenaba el campo con ese número y te
  pagaba marca nueva por cambiarte a una máquina más fácil. Ahora la memoria va por **nombre de
  ejercicio**: si nunca lo hiciste, el campo viene vacío y no hay línea de historial. Un peso
  sugerido equivocado es peor que ninguno.
- ~~El gimnasio no sugería cuánto cargar~~ — resuelto. Anotar lo que levantaste es un cuaderno;
  decirte qué levantar mañana es el trabajo. Ahora, debajo de los kilos: **"Hoy probá 65 kg →"**
  si completaste las reps la última vez, o **"Repetí 70 kg y cerralo →"** si te quedaste corto.
  **Solo sube si cerraste todas las reps** — mandarle más carga a alguien que ya está fallando
  series es como se lesiona la gente. El incremento es 5 kg en piernas desde 40, 2,5 en el
  resto, 1 abajo de 20 kg: una elevación lateral y una prensa no pueden compartir escalón.
  La línea es un botón: al tocarlo llena las tres series. **Nunca se llena solo**, porque el
  campo de kilos guarda lo que hiciste y no lo que la app supone.
- ~~Había que ir a buscar un video para saber cómo se hace el ejercicio~~ — hechos **peso corporal
  y gimnasio: 168 de 252**. Falta flow.

  Cada ejercicio tenía una sola línea de instrucción, escondida detrás de un botón que decía
  **💡 alternativa** — nadie que no conozca el movimiento toca un botón que se llama
  "alternativa". Y 56 de los 252 tenían menos de 50 caracteres, del tipo *"Plancha lateral →
  Cuenta 1 rep por cada 3 segundos por lado"* o *"Hollow body hold → En hollow hold, cuenta 1
  rep por cada 3 segundos"*, que define el término con el término.

  Mandar a YouTube no era opción: la app no hace ninguna conexión a terceros y la política de
  privacidad lo dice. El texto tiene que alcanzar.

  Ahora cada ejercicio de peso corporal trae tres líneas, una por pregunta:

  ```
  Posición      dónde está tu cuerpo antes de la primera repetición
  Movimiento    qué se mueve y hasta dónde
  Error común   lo único que arruina el ejercicio o te lastima
  ```

  El botón pasó a decir **¿Cómo se hace?**, que es la pregunta real, y el panel se lee a 14 px
  en vez de los 12 px apretados que usaba antes.

  **Se abre solo la primera vez.** Cuatro paneles abiertos suman 860 px: la tarjeta de rutina
  pasa de 1.117 a 1.977 px. Eso está bien el día uno y es insoportable todos los días. La app
  ahora anota qué ejercicios ya hiciste alguna vez, así que un movimiento nuevo llega con las
  instrucciones abiertas y a partir de la segunda vez queda cerrado. Si cambiás de rango y
  aparecen ejercicios nuevos, se vuelven a abrir solos.

  En gimnasio la línea de **Error común** es la línea de seguridad: una señal equivocada en una
  extensión de cuádriceps es una serie perdida, pero en una sentadilla con barra es un disco. Por
  eso ahí los errores nombran la falla que lastima y qué hacer — *si la espalda baja se redondea
  al final, para justo antes*, *nunca hagas esto sin seguros: la pausa es justo donde una serie
  se cae* — y no un detalle de forma.

  Flow sigue funcionando igual que antes hasta que le toque su pasada: botón "💡 alternativa" y
  una sola línea.
- ~~Los logros decían "RANGO Z" y no estaban ordenados por dificultad~~ — resuelto, las dos cosas.

  **El rango en el logro no iba.** Las cabeceras de cada grupo decían `RANGO Z`, que se salvó de
  la pasada de identidad: las letras de rango no aparecen en ningún otro texto, y el nombre
  visible del rango depende de la modalidad, así que alguien en *Quietud* leía "Rango Z". La
  clave interna sigue siendo `E..Z` (ordena los grupos y paga los Puntos de Dominio), pero lo
  que se lee ahora es la dificultad:

  ```
  FÁCIL · ACCESIBLE · EXIGENTE · DIFÍCIL · MUY DIFÍCIL · PARA POCOS · EXCEPCIONAL
  ```

  **Y tenías razón con el que te tocó.** *Atleta Híbrido* estaba en el tier más alto del juego y
  su comprobación era `tenés tres modalidades elegidas en el perfil`: **se pagaba por tildar
  tres casillas en el onboarding**, sin entrenar nada, mientras el texto prometía "entrená con
  los tres métodos". Ahora exige los tres el mismo día. Los cuatro *PR de...* pedían 60 reps de
  piernas, 40 de empuje, 30 de tracción o 60 de core en una sesión — un día normal con perfil
  resistencia.

  21 logros recolocados en total: los PR bajaron a EXIGENTE y DIFÍCIL, los de levantar tu peso
  corporal bajaron un escalón (`Math.max` mira los cuatro patrones y una prensa a 2× peso
  corporal es común), las rachas de 26/12/4 semanas bajaron una, y subieron los que estaban
  demasiado abajo: el primer Umbral (unos 5 meses) compartía tier con una racha de 3 días, y
  200 sesiones de una modalidad — dos a cuatro años — estaban en EXIGENTE.

  El tier más alto quedó con seis, y los seis son años: el último rango, un año entero de metas
  semanales, 250 terrenos, un atributo a nivel 30, todas las skills y 25.000 reps de tracción.

  Nada se pierde: las partidas guardan los **ids** desbloqueados, nunca el tier, así que lo que
  ya tenías sigue estando.
- ~~El estiramiento no daba tiempo a acomodarse entre posiciones~~ — resuelto. El pitido te
  avisaba que cambiaras y el reloj del sostén ya estaba corriendo, así que los primeros segundos
  de un estiramiento de 25 se te iban en bajar al piso. El peor caso era el cambio de lado:
  levantarte, girar y volver a empezar contra un cronómetro que no paraba.

  Ahora **cada posición arranca con 5 segundos de preparación**, con el nombre, el lado y la
  descripción de la que viene ya en pantalla y la cuenta atrás en ámbar. La primera dice
  *PONETE EN POSICIÓN*; las demás, *PREPARATE*. Dos pitidos en vez de uno: grave para que te
  prepares, agudo para empezar.

  Las rutinas quedaron en **3:30 (corta)** y **7:10 (completa)**. Ese tiempo ya lo estabas
  gastando, solo que salía del estiramiento. La puntuación no cambió: un paso que solo estás
  preparando no cuenta como hecho si tocás *Terminar acá*.
- ~~"Tu cuerpo → Hoy" solo contaba la última sesión del día~~ — resuelto, y reproducido igual:
  una sesión de peso corporal y una de flow, y el mapa mostraba **24 · 19 · 22 · 24**, solo flow,
  mientras la línea de XP de la misma tarjeta decía 264, o sea las dos. `today.reps` se
  **reemplaza** en cada sesión (y `mmNueva` lo pone en cero para abrir la siguiente); el total
  del día vive en `dayLog`, que sí suma. El mapa leía el primero.

  Revisándolo apareció algo peor que ni había notado: **antes de entrenar, Hoy marcaba 33/33** y
  pintaba el cuerpo entero al 100%, porque cuando el día no estaba registrado mostraba la meta
  como si ya estuviera hecha. Un día nuevo arrancaba diciéndote que ya habías terminado.

  ```
  antes de entrenar          0/33    (era 33/33)
  una serie marcada         13/33    (ahora va en vivo, antes no se movía)
  sesión 1 registrada       33/33
  empieza la 2ª modalidad   33/57    (la meta crece, lo hecho se conserva)
  ambas registradas         57/57    (era 24/24)
  ```

  La meta del día se guarda ahora igual que las reps, con un hook alrededor de `i5` para no
  tocar la función que liquida el XP. El panel de la zona muestra los mismos dos números, y
  deshacer el registro lo devuelve todo — verificado.
- ~~Había ejercicios que daban por hecho que tenés el elemento~~ — resuelto en los 252. La regla
  ya estaba escrita ("el `alt` tiene que nombrar un reemplazo sin material") pero solo se había
  aplicado donde el objeto estaba en el **nombre**. Donde estaba escondido en la instrucción, no:
  *Remo invertido con pausa arriba* decía "el pecho pegado a la mesa" y nada más, *Remo a un
  brazo con mochila* daba por hecho que tenés mochila, y media escalera de tracción de flow
  asumía una barra porque solo el primer escalón decía "Sin barra". **51 salidas agregadas.**

  Dos cosas distintas se arreglaron:

  - **El objeto que no tenés.** Toalla, dos trapos, mochila, barra, mesa, cinturón de lastre,
    rueda abdominal, polea, máquina. Cada uno nombra ahora un reemplazo al alcance: un bidón de
    agua o una funda de almohada con libros en vez de la mochila, remo invertido bajo una mesa
    en vez de la barra, mancuernas en vez de la polea, una barra con discos que giren en vez de
    la rueda.
  - **El objeto que tenés pero no funciona donde estás.** *Arrastre con trapos* y las dos ruedas
    abdominales con trapos necesitan un **piso que deslice**; sobre alfombra no hacen nada y
    nadie lo decía. Ahora arrancan con "sobre alfombra no deslizan" y dan el movimiento que las
    reemplaza.

  El reemplazo siempre es el mismo patrón: si falta la barra, se cae a un remo, nunca a un
  puente. El mapa del cuerpo paga por dorsal y bíceps y tiene que seguir siendo cierto.
- ~~En gimnasio la superserie perdía los kilos de la primera serie~~ — resuelto. Revisé lo mismo
  que pasaba con las marcas y en gimnasio había **otra cosa además**: las series se quedaban
  marcadas, pero el campo de kilos de la **serie 1** volvía vacío. Medido: cargo 60 · 62,5 · 65,
  paso a peso corporal, vuelvo, y me encuentro `— · 62,5 · 65`. Las series 2 y 3 sobrevivían
  porque se guardan en `gymSerieKg`; la 1 se guarda en `gymWeights` y la función que dibuja el
  campo no lo lee nunca — cae directo al historial del ejercicio. Sin historial, campo vacío.
  **Y eso no era cosmético**: al registrar, esa serie contaba como 0 kg. Una sesión de 2.052 kg
  se anotaba como 1.272, un 38% menos, sin avisar. Ahora el texto que escribís hoy se guarda en
  el mismo casillero del día que las marcas, así que aguanta el cambio de modalidad y la recarga
  de la página. Verificado: 60 · 62,5 · 65 con 13 · 11 · 9 reps registra 2.053 kg.
- ~~Haciendo superserie entre dos modalidades se desmarcaban las series~~ — resuelto, y lo
  reproduje tal cual: marco la serie 1 en peso corporal → paso a flow → marco la serie 1 ahí →
  vuelvo a peso corporal y **la serie 1 aparece sin marcar**. El memo de las marcas era un solo
  casillero con su propio `{mod, mode}` adentro, así que cada toque en flow pisaba el de peso
  corporal; al volver, el `mod` no coincidía y las fichas se reseteaban a cero. Funcionaba bien
  para *cambiar* de modalidad, no para *alternar*, que es lo que hace una superserie. Ahora hay
  un casillero por modalidad **y** por modo (`"flow|normal"`, `"bodyweight|recovery"`), así que
  los cuatro conviven y cada uno aguanta la recarga de la página. La forma vieja se sigue
  leyendo, para no tirar a la basura una sesión que estuviera abierta al momento del deploy.
  De paso: si una modalidad ya quedó registrada hoy, volver a ella no devuelve sus marcas
  viejas — `mmNueva` apaga `completed` para abrir la segunda sesión, y sin ese freno te
  ofrecería registrar dos veces lo mismo.
- ~~El calibre hablaba un solo idioma~~ — resuelto. La prueba mide a todos con los mismos cuatro
  ejercicios de peso corporal, **y eso es a propósito**: la idea es un fondo que te sirva para
  las tres modalidades sin necesitar material (el remo invertido ya trae "superman en el suelo"
  como alternativa). Lo que estaba mal era el nombre del resultado: la escala iba de
  *Principiante Base* a *Élite / Dominio Total* y el enfoque del penúltimo escalón decía
  literalmente "Calistenia / Flow de alto impacto" **a alguien que solo levanta pesas**. Ahora
  los seis escalones tienen tres juegos de nombres, elegidos con el mismo `sdcJuego` que ya
  eligen los rangos, así que la cabecera dice `Nv. 1 · Gateo` sobre `Tránsito largo` en flow y
  `Barra` sobre `Sesión larga` en gimnasio, en vez de mezclar vocabularios.

  ```
  peso corporal  Primeros apoyos · Base firme · Aguante propio · Trabajo largo · Fuerza relativa · Fuera de la tabla
  gimnasio       Primeros pesos · Base para cargar · Aguante entre series · Sesión larga · Carga alta · Fuera de la tabla
  flow           Primeras posiciones · Piso firme · Aguante continuo · Tránsito largo · Control fino · Fuera de la tabla
  ```

  La regla con la que se escribieron los 36 textos: **un calibre describe cuánto trabajo
  aguantás, nunca una habilidad**. La prueba no sabe si hacés el pino ni si sentadilleás 100 kg,
  así que la escala de gimnasio habla de series y volumen y jamás de kilos, y el escalón más
  alto es *Fuera de la tabla* — te pasaste de la escala, que es lo que de verdad ocurrió — en
  vez de *Élite*. La tarjeta de Perfil suma además la línea **Enfoque**, que es lo único que
  puede nombrar un movimiento, porque un enfoque es lo que viene, no lo que ya tenés.
  Los números no cambiaron: `classification` sale del mismo `vy` de siempre y el volumen de la
  rutina es idéntico.
- **Falta decidir**: las reps de gimnasio suben con el rango (117/día en E, 190 en C) aunque el
  diseño dice que en el gimnasio la variable es la carga, no las reps. Un jugador de rango C
  hace 20 sentadillas con barra en la primera serie: duro pero real. Aplanarlo cambiaría el XP
  por sesión de todos los que entrenan en gimnasio, así que es una decisión tuya, no un bug.

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
