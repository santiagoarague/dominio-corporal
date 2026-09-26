# Dominio Corporal — documento de diseño

Estado al 23/09/2026. Este documento es para diseñar el juego sin tener el código delante. Describe
**qué es el juego, hacia dónde va y qué reglas no se rompen**. La implementación la hace otra
instancia de Claude (Claude Code, en la PC), que tiene el código y un manual técnico propio.

---

## 1. Qué es

Una app de entrenamiento con peso corporal, gimnasio y "flow" (movimiento en el suelo), convertida
en juego: niveles, XP, rangos, rachas, logros, un compañero (perro, gato o una cara) y sistemas que se van
abriendo con el nivel. Está en **español rioplatense** y es para el teléfono.

- Es una **web app (PWA)** instalable, publicada en GitHub Pages. El objetivo es llevarla a Play Store.
- **Un solo jugador.** No hay cuenta, ni servidor, ni ranking. Todo el progreso vive en el teléfono.
- **Funciona sin conexión** y no hace ninguna petición a internet después de cargar.
- Se llamaba "Sistema de Dominio Corporal" y tenía todo el vocabulario de *Solo Leveling*. Eso se
  sacó a propósito (ver §3).

## 2. La tesis

> **Cualquiera ama entrenar cuando descubre de qué es capaz su cuerpo.**

No es un eslogan: es la regla para decir que no. Ante cualquier idea, la pregunta es:

> **¿Esto hace que alguien descubra algo de su cuerpo, o solo que cumpla?**

Por eso el combate dejó de tratar al cuerpo como enemigo, el mapa del cuerpo está arriba de todo
en Entreno y existe **Primeras veces**. Una mecánica que solo agrega obligación (otra tarea diaria,
otro contador que llenar) no pasa este filtro aunque sea divertida.

## 3. Un solo mundo: tu cuerpo es el territorio

*Dominio* significa a la vez maestría y territorio. El juego es **relevar tu propio cuerpo**.

Antes convivían tres ficciones que no compartían mundo (un bestiario fantástico, un registro clínico
y ciencia ficción isekai). Esa incoherencia era peor que el préstamo. Ahora hay un solo mundo, con
este léxico:

| Antes | Ahora |
|---|---|
| El Sistema (narrador) | **no hay narrador**: la app te habla en segunda persona |
| Ascensión / evolucionar | **Umbral** |
| Anomalías · neutralizar | **terrenos** · **recuperar** |
| Mazmorras · Portales | **Travesías** |
| Modo Sombra (último rango) | *el último rango* |
| Cazador / Sombra | Atleta / "Tu compañero" |

Reglas del mundo:
- **No se reintroduce una entidad que narre.** Si una frase necesita un sujeto, el sujeto real ya
  existe (el metrónomo, la app, vos).
- **Las letras de rango (E, D, C…) no aparecen nunca en textos.** El nombre visible del rango
  depende de la modalidad; si hace falta, se usa un ordinal ("el sexto rango").
- Explorar es el único lugar donde el mapa es literal: los lugares son **cosas reales que la
  distancia te muestra** (*La Subida de Siempre*, *El Kilómetro Aburrido*, *El Día que No
  Querías*), no castillos ni estaciones espaciales.
- Las travesías se llaman por la cualidad del cuerpo que revelan (*La Guardia*, *El Rebote*,
  *La Cuesta*), nunca por un monstruo.

## 4. La voz

- El juego habla en **voseo rioplatense**: *tocá*, *hacés*, *podés*, *entrenaste*.
- Dos registros se quedan en **español neutro** a propósito:
  - **Médico**: señales de alarma, la regla del dolor y los protocolos articulares.
  - **Instrucciones de ejecución**: cómo se hace cada ejercicio (*Baja el pecho*, nunca *Bajá*).
- **La app enuncia reglas, no las defiende.** Dice qué hace algo y qué da ("Da 10 XP una vez por
  día"), **nunca por qué lo diseñamos así** ("poca a propósito porque…", "para no abrumarte",
  "es la única forma de que veas…"). El razonamiento es para nosotros, no para la pantalla. Las
  indicaciones sobre el cuerpo sí se quedan ("es un ensayo, no una serie" te dice cuánta
  intensidad poner, no justifica un número).
- **Sin amenazas y sin mentiras.** Un texto nunca asusta al jugador con consecuencias que no existen.
- **Cada término se define la primera vez que aparece.** Un jugador que nunca jugó nada tiene que
  entender "patrón", "Umbral" o "flow" sin adivinar.
- Tono: directo, cálido y breve. El compañero habla distinto según el caso: celebra una marca
  personal o una racha y acompaña una sesión floja. Las frases del compañero sirven igual para un
  perro que para un gato; con la cara, los gestos de animal ("apoya la cabeza en tu pierna") se
  cambian por gestos de cara ("te sonríe").

## 5. Principios de diseño

Estas reglas salieron de errores reales. Una propuesta nueva tiene que respetarlas o decir
explícitamente cuál rompe y por qué.

1. **La app acompaña, no pide formularios.** Todo lo que se hace con el cuerpo se hace *con la app
   corriendo*: tocás cada serie cuando la terminás y la app responde (sonido, vibración, XP,
   descanso). Las travesías y las caminatas tienen cronómetro. Un formulario para llenar después
   no te enseña nada de tu cuerpo. Siempre queda una salida manual ("la hice sin el teléfono"),
   pero nunca es lo primero.
2. **La app nunca inventa.** No declara algo que no presenció: Primeras veces primero pregunta si
   ya podías hacerlo. Una estimación nunca se disfraza de medición: los kilómetros estimados se
   ponen en el campo para que los confirmes.
3. **No se castiga.** Nunca se pierde XP. La única consecuencia de fallar es que se corte la racha.
   Y hacer poco nunca es peor que no hacer nada: una rutina de menos de la mitad no cuenta como día
   entrenado, pero tampoco es falta; el día queda como si no hubieras entrenado.
   Si alguna vez vuelve una penalidad, **nunca proporcional a la XP acumulada**: eso castiga más
   justo antes de subir de nivel.
4. **Las recompensas se ganan.** Nada paga por tildar casillas. Hubo un logro del tier más alto que
   se cobraba por elegir tres modalidades en el onboarding; ahora exige entrenar las tres el mismo
   día. Una marca de carga paga solo si superás una marca previa, no la primera vez que anotás.
5. **Seguridad antes que números.** Todos empiezan en el primer rango aunque la prueba inicial sea
   excelente: la prueba ajusta **cuántas** repeticiones hacés, no **cuáles** ejercicios. En
   gimnasio la carga solo sube si completaste todas las reps la vez anterior. Los sostenes (planchas,
   pino) tienen tope de segundos.
6. **El ejercicio se enseña solo.** No hay videos ni enlaces: la app no se conecta a nada. Cada
   uno de los 252 ejercicios trae **Posición** (dónde está tu cuerpo antes de empezar),
   **Movimiento** (qué se mueve y hasta dónde) y **Error común** (lo que lo arruina o te lastima).
   En flow los nombres no enseñan nada (*macaco*, *aú*, *6-step*), así que la posición describe
   huesos y ángulos.
7. **Sin material, igual se puede.** Todo ejercicio que necesita un objeto (toalla, mochila, barra,
   mesa, máquina) dice qué hacer sin él, **manteniendo el mismo patrón**: si falta la barra se
   cae a un remo, nunca a un puente.
8. **Cada tarjeta cuesta píxeles.** La densidad se mide. La rutina del día tiene que estar en la
   primera pantalla; lo que es útil el primer día y molesto todos los demás se abre solo la primera
   vez (por ejemplo, "¿Cómo se hace?" en un ejercicio nuevo).
9. **Legible de los 13 a los más de 70 años.** Ninguna letra por debajo de 14 px; el texto
   principal va a 16. Todo lo tocable mide al menos 44 px de alto y de ancho (los cuadrados de la
   grilla de Constancia, 40 de alto). Contraste de al menos 4,5:1 también en lo bloqueado: un logro
   o un movimiento que todavía no tenés tiene que poder leerse, porque dice qué te falta. Un botón
   deshabilitado se ve más apagado pero se lee. Los textos que se ven siempre son de una o dos
   oraciones; lo largo va en la guía. Una prueba automática mide todo esto en cada pestaña, en un
   teléfono de 375 px y en uno de 320.
10. **En todo lo guiado hay tiempo para acomodarse.** Antes de cada paso cronometrado hay una cuenta
    de preparación: 10 s antes del primero (dejar el teléfono), 8 s si cambia la posición del
    cuerpo (pared, piso, boca arriba, plancha) y 5 s si no cambia (cambio de lado). **La primera vez
    que te toca un movimiento, el reloj espera a que toques "Listo"**: alguien que no lo conoce
    necesita leerlo, y el tiempo no puede correr mientras lee. Siempre hay **Pausa**. Nada
    cronometrado arranca solo al tocar algo: primero se ve qué viene y después se toca Empezar. La
    pantalla no se apaga —tampoco en medio de la rutina, desde la primera serie marcada hasta
    registrarla— y el reloj se calcula desde una marca de tiempo, así que bloquear el
    teléfono no lo congela. **Cada cambio se oye**, con el teléfono lejos: cuenta 3-2-1 antes de
    arrancar y antes de terminar, y un sonido distinto para "arranca" y para "terminó". Los avisos
    van por encima de ~700 Hz, porque el parlante de un teléfono casi no da tonos graves.
11. **Números honestos.** Se sacó "450 kg movidos" de al lado de cada ejercicio: 20 kg × 30 reps le
    gana a 60 kg × 8 y eso no significa nada. Un número en pantalla tiene que decir lo que parece.
12. **Privacidad total.** Cero peticiones de red, sin cuenta, sin analíticas. La guía avisa que el
    progreso vive solo en ese teléfono y la app recuerda hacer respaldos.

## 6. Cómo está armado el juego

### Modalidades
Tres formas de entrenar, se pueden tener varias y elegir cada día:
- **Peso corporal**, **Gimnasio** y **Flow** (breaking, capoeira, locomoción animal, pino). En la
  rutina y al elegirlas se llaman **Calistenia**, **Fuerza de Acero** y **Flow**.
  Peso corporal se llamaba *Dominio Corporal*, igual que el juego, y se cambió por eso.
- Cada una tiene su propio juego de nombres de rango:

```
peso corporal  Suelo · Eje · Recorrido · Palanca · Lado · Sostén · Oficio
gimnasio       Barra · Disco · Forma · Carga · Tope · Máxima · Hierro
flow           Gateo · Apoyo · Giro · Enlace · Inversión · Quietud · Vuelo
```

- Flow sigue el **orden real de enseñanza**. Breaking: toprock → footwork (2-step, 6-step, CC) →
  freezes (baby → elbow → shoulder) → powermoves. Capoeira: ginga → negativa → rolê → aú → queda de
  rins → macaco → bananeira. Un freeze antes del footwork no es una elección de dificultad, es un
  currículo equivocado.
- La tracción de flow se armó solo con movimientos que **tiran de verdad** (colgarse, arrastres por
  el suelo, macaco), nada de puentes disfrazados.

### La rutina del día (el corazón)
- Siempre **cuatro patrones**: piernas, empuje, tracción y core. No cambian nunca.
- Lo que cambia es **qué ejercicio** te toca: hay 3 por escalón de rango en cada modalidad
  (**252 ejercicios**) y la app rota según la fecha.
- Las reps del día se parten en 2–3 series **descendentes** (40/33/27%), porque la última serie es
  la más cara. Cada serie es un botón: se toca al terminarla. Suena, vibra, suma XP y arranca el
  descanso, que queda fijo abajo de la pantalla con su cuenta y un botón para saltarlo. Tocar una
  serie marcada la desmarca a ella sola; "MARCAR TODAS" y "DESMARCAR TODAS" están juntos, arriba de
  los ejercicios. "Ajustar series", al lado de "Llevás X de Y reps", pone un + arriba y un − abajo
  de cada serie para armar el plan antes de hacerlo (15-15-12, 8-12-8); la meta del día no cambia.
- Cuando se completan todas las series de un ejercicio, **la fila se pliega** a una línea
  ("✓ nombre · 12 reps") para que un toque sin querer no la desmarque; se abre tocándola.
- **Modificador del día**: uno de seis por modalidad (Tempo, Densidad, Drop set, Sostén largo…).
  Da +20–30% de XP solo si el jugador lo reclama.
- **Metrónomo** opcional que marca bajada, pausa y subida con tres sonidos distintos: un tono que cae
  al bajar, un doble tic seco en la pausa (el momento de frenar y cambiar de dirección) y un tono que
  sube al subir. La prueba de aptitud usa los mismos tres.
- **Reloj de sostén** en los ejercicios que se miden en segundos (plancha, hollow, colgarse): debajo
  de las series aparece "Sostener 12 s" con los segundos de la serie pendiente, que el jugador
  ajusta con el − / + de esa serie. Da 10 s para ponerse en posición ("Ya estoy →" los salta),
  suena 3-2-1 antes de arrancar y antes de terminar, tiene Pausa, y al terminar marca la serie sola
  y arranca el descanso. "Terminé antes" anota lo que realmente sostuvo (2 reps de 3 s si aguantó 7
  s). Mientras corre, el metrónomo se calla.
- En gimnasio: un campo de kilos por serie, "La última vez: 30 · 32,5 · 35 kg" y una sugerencia
  ("Hoy probá 65 kg →" o "Repetí 70 kg y cerralo →") que solo sube si cerraste todas las reps.
  Tu peso corporal se anota en Perfil → Tus números (aparece si entrenás en el gimnasio) y lo usan
  tres logros: levantar 1×, 1,5× y 2× tu peso en un ejercicio.
- **Modo Recuperación**: la mitad de las reps, cuenta como entrenar.

### Calentamiento (nuevo)
Tarjeta arriba de la rutina, de unos 7 minutos, en cuatro fases: **pulso** (trote, saltos),
**movilidad** (brazos, cadera, piernas, muñecas), **activación** (un ejercicio por patrón, según la
modalidad) y **ensayo** (pocas repeticiones suaves de los cuatro ejercicios reales de hoy, que se
avanzan tocando "Hecho"). En gimnasio el ensayo propone la mitad de la carga sugerida. Da 10 XP una
vez por día y se puede repetir sin XP antes de una segunda sesión.

### Después de entrenar
- **Estiramiento**: rutina corta (3:44) o completa (7:33), guiada, con la misma preparación y la misma espera que el calentamiento. Dos veces por semana dan +10% de
  XP la semana siguiente. Una vez por semana pregunta hasta dónde llegás sentado con las piernas
  estiradas y lo compara con cuando empezaste.
- **Mapa del cuerpo**: figura que se pinta más fuerte en las zonas más entrenadas (hoy, semana,
  desarrollo). Antes de entrenar baja; después de entrenar vuelve arriba, como premio.

### Constancia
- El jugador elige **cuántas sesiones por semana**. La racha solo se corta si ya no se puede llegar
  a esa meta: un día suelto no cuesta nada.
- Calendario con los últimos días; tocando un día pasado sin registro se puede anotar "Entrené este
  día y me olvidé": cuenta para la racha, sin XP.
- Salidas para un mal día: Recuperación, **un día de descanso por semana** y **Escudo de Racha**
  (se compra).

### Cómo llegás (el chequeo de ánimo)
Para los días sin ganas, que es cuando más fácil se deja para mañana. Lo que importa no es la
pregunta, es la comparación: la app te muestra con tus números que entrenar te cambia el día.
- **Antes**, arriba de todo en Entreno y solo antes de empezar: *¿Cómo llegás hoy?* con cinco
  caritas (Sin ganas · Pocas ganas · Normal · Con ganas · A full). Siempre está "Hoy no" y nunca
  bloquea la rutina.
- Si llegás sin ganas o con pocas ganas, pregunta *¿Y el cuerpo?* (Cansancio · Músculos cargados ·
  Me duele algo · Bien). Si no es dolor, pone la rutina en Recuperación y te propone **empezar por
  el calentamiento**: la promesa del día es empezar, no terminar. Si hay historia, suma tu propia
  evidencia: *"Las últimas 4 veces que llegaste así, en 3 terminaste mejor"*.
- **Si te duele algo**, no te sugiere entrenar igual: muestra la regla del dolor, ofrece el día de
  descanso y la opción de entrenar suave sin esa zona.
- **Al terminar el calentamiento**, *¿Y ahora?*: si te vino el envión, pasás a la rutina normal
  antes de la primera serie.
- **Al registrar la rutina**, *¿Cómo te vas?* con las mismas caritas, y *¿Cómo te quedó la
  rutina?* (Corta · Justa · Mucha). Si tres veces seguidas te queda corta o mucha, te propone
  repetir la prueba de aptitud.
- **Toda respuesta se puede corregir** con *Cambiar respuesta*, porque una cara se toca sin querer.
  La de llegada queda como una línea (*Llegás normal.*) hasta la primera serie o el calentamiento;
  la de salida, en el resumen de la rutina.
- **No da XP**: contestar no es entrenar. Se festeja con 7 logros en la categoría **Días que no
  querías** (entrenar esos días, el envión, terminar mejor de lo que llegaste) y se ve en Perfil →
  Tus números y en el detalle de cada día de Constancia.
- No es un test de salud mental: pregunta por ganas y cuerpo para entrenar, nada más. Se apaga en
  Perfil → Sistemas del juego.

### Sonido
Un parlante 🔊 arriba de todo, al lado de *¿Cómo funciona?*, silencia la app entera (metrónomo,
series, relojes, compañero). La vibración sigue. Queda guardado.

### Tu compañero
Perro, gato o **una cara** (para quien no quiere un animal); se elige al empezar, con nombre
opcional, y se cambia en Perfil. Arriba de todo muestra un consejo por día. Además **se asoma**:
en el descanso entre series (a los 3 s) o en el resumen de la rutina (a los 4 s) aparece quieto en
una esquina, arriba de la barra de descanso, con un **¡Psst!** y un silbido corto. Tocarlo cuenta
**algo de la app que todavía no usaste** (desmarcar una serie, Ajustar series, Sostener, ¿Cómo se
hace?, la sugerencia de kilos, estirar, Constancia, Recuperación, Minimizar todo, la guía) con un
botón **Mostrame** que baja hasta ese botón y lo ilumina. Si ya lo usaste, ese consejo no sale
nunca; cuando ya usaste todo, cuenta un consejo de entrenamiento.
- **No obliga a nada**: si no lo tocás se va solo a los 20 s, o cuando termina el descanso.
- Como mucho **una vez por sesión** y **nunca el primer día** (ese día las explicaciones de los
  ejercicios ya se abren solas).
- No se mueve por la pantalla ni tapa botones: a los 70 años un blanco que se mueve no se toca, y
  un toque errado puede marcar una serie. No suena si el metrónomo está sonando.
- Se apaga en Perfil → Sistemas del juego.

**Relajate** — un rato con el compañero, tipo salvapantallas, para el descanso entre series o para
bajar los nervios. Sin puntos ni reloj en contra, y sin depender del sonido (mucha gente entrena con
música): lo que da gusto es lo que se ve y la vibración.
- *Jugar*: flota y rebota despacio, cambia de color en cada borde; tocarlo lo aplasta con chispas;
  se arrastra y se lanza. Suben mancuernas, pesas rusas, discos (tocalos: vuelan y los levanta) y
  gotas (llenan una botella; con 6, "Tomá un trago de agua").
- *Respirar*: se infla 4 s y se desinfla 6, con los ojos cerrados.
- Se abre con **Relajate** en la barra de descanso (arriba se ve el reloj y se cierra solo al
  terminar el descanso) o tocando al compañero arriba de todo, cualquier día. No da XP.

### Primeras veces
Registro del día en que hiciste algo que antes no podías. La app pregunta una sola vez por cada
movimiento ("¿Alguna vez hiciste X?" → *Nunca pude* / *Ya podía*) y después lo detecta sola. También
hay un botón para anotar a mano. Es la tesis hecha pantalla.

### Progresión
- **XP y niveles.** La XP de la rutina son las reps hechas, más **30** si la completás al 100%.
  El primer nivel cuesta 48 XP y **la primera rutina tiene que alcanzar para subirlo**: es la
  recompensa más barata e importante del juego.
- **Rangos** (7). Para pasar hace falta un nivel, **rutinas completas en ese rango** (24, 36, 48, 60,
  72 y 84, del primero al sexto) y superar el **Umbral**: **una rutina completa del rango que viene**,
  con sus ejercicios, repartida en 3 a 5 rondas encadenadas; solo se puede dar un día con la
  rutina al 100%. Antes cada ronda era el 60–80% de esa rutina y la prueba sumaba entre 2 y 6
  rutinas encima de la del día (575 reps en el gimnasio para el sexto rango). Las dos condiciones nuevas
  existen porque el nivel se puede apurar y el cuerpo no: entrenando todos los días con racha se
  llegaba al primer Umbral en 7 semanas, y la prueba se hacía con ejercicios que ya dominabas. Los
  impulsos de la tienda aceleran poco (~10%) y no se tocaron. Tiempos
  aproximados entrenando 4 veces por semana: 2º rango ~5 meses, 3º ~1,3 años, 4º ~2,6, 5º ~4,4,
  6º ~6,7 y 7º ~9,4 años. En el último rango la meta diaria es superar tu propio récord un 1%.
- **¿Cuánto mejoraste?**: cada prueba de aptitud queda guardada con su fecha. En Perfil → Prueba de
  aptitud se ve la primera contra la última, ejercicio por ejercicio, con la diferencia en verde (si
  bajó, en gris, sin alarma). Cada 4 semanas, antes de la primera serie del día, arriba de Entreno
  aparece *¿Cuánto mejoraste?* con **Hacer la prueba** (abre Perfil con la prueba empezada) y **Más
  tarde** (una semana). Solo se comparan pruebas medidas por la app al mismo ritmo.
- **Calibre**: sale de la prueba de aptitud (4 ejercicios de peso corporal **al mismo ritmo que el
  metrónomo de la rutina: 2 s baja, 1 s pausa, 2 s sube**, o eligiendo entre seis descripciones sin
  ir al fallo). Antes medía a 3 s por repetición y daba metas más altas de las que se podían cumplir
  entrenando. Las bandas del calibre se escalan para las pruebas hechas al ritmo nuevo, así que
  nadie baja de escalón solo por el cambio. Ajusta solo el volumen. Un calibre
  describe **cuánto trabajo aguantás, nunca una habilidad**:

```
peso corporal  Primeros apoyos · Base firme · Aguante propio · Trabajo largo · Fuerza relativa · Fuera de la tabla
gimnasio       Primeros pesos · Base para cargar · Aguante entre series · Sesión larga · Carga alta · Fuera de la tabla
flow           Primeras posiciones · Piso firme · Aguante continuo · Tránsito largo · Control fino · Fuera de la tabla
```

- **Perfiles de enfoque**: fuerza (65% de reps, ×1,5 XP), salud (100%, +15% con racha) y
  resistencia (140%, ×0,72). Tienen que pagar parecido por trabajo equivalente, y hoy pagan
  dentro de un 3,4% en todas las modalidades y rangos. El bono de +30 por rutina completa es
  igual para los tres: antes se multiplicaba por el enfoque y fuerza cobraba ~20% más en peso
  corporal.

### Sistemas que se abren con el nivel
| Nivel | Sistema | Qué es |
|---|---|---|
| 1 | Cómo llegás | chequeo de ánimo antes y después de entrenar (apagable) |
| 1 | Tu compañero | se asoma en el descanso o en el resumen con algo de la app que todavía no usaste (apagable) |
| 1 | Logros | 147 logros, con dificultad: fácil · accesible · exigente · difícil · muy difícil · para pocos · excepcional |
| 3 | Explorar | kilómetros caminados o corridos; revelan lugares y reliquias |
| 8 | Articulaciones | protocolos de cuidado por zona (registro médico, neutro) |
| 10 | Misiones | un objetivo semanal y uno mensual según lo que descuidás. **No hay misiones diarias**, a propósito |
| 12 | Instinto Primal | movimientos de suelo en tres rondas cronometradas, hasta 5 por día. Cuenta 3-2-1 y sonido propio al arrancar y al terminar cada ronda; 15 s de descanso entre rondas, los últimos 5 anunciados como PREPARATE; con Pausa |
| 15 | Combate | recuperar "terrenos": elegís patrón, tenés un tiempo, marcás las series y golpeás. 3 corazones; cada 5 terrenos un jefe con dos patrones |
| 20 | Travesías | sesión larga de cardio (60% de los días), cronometrada, con intervalos |
| 25 | Skills | movimientos que se aprenden paso a paso, sin reloj |
| 30 | Neuromotor | reflejos, memoria de movimiento, doble tarea |

### Economía
- **XP por actividad** (de menor a mayor): calentamiento 10 · paso de skill 15 · neuromotor 15 ·
  terreno de combate 15+ · articulaciones 20 · Instinto Primal 20 · estiramiento 25 · travesía
  40–150 · rutina (reps + 30) · skill aprendida 80.
- **Multiplicadores**: racha +2% por día (tope +30%), estiramiento semanal +10%, segunda y tercera
  modalidad del día +25%/+50%, modificador reclamado, compras de la tienda y dos mejoras permanentes.
- **Puntos de Dominio (PD)**: 3 por rutina al 100%, 1 si pasás la mitad (solo la primera sesión del
  día), más logros (1–5 según dificultad), misiones y reliquias. Se gastan en la tienda: sesión
  extra de Primal, cambiar travesía, día de descanso extra, impulsos de XP (+10% semana, +25% o
  +50% día), Escudo de Racha y dos mejoras permanentes (+5% y +10% de XP).

### La guía ("¿Cómo funciona?")
19 temas en cuatro grupos: Para empezar · Cómo progresás · Los sistemas · Lo demás. Cada tema tiene
que ser **una pregunta que un jugador haría de verdad**. Cuando un sistema cambia, su tema cambia en
el mismo momento.

## 7. Restricciones técnicas que importan al diseñar

No hace falta saber programar, pero sí qué es posible:

- **No hay servidor.** Por lo tanto no hay notificaciones push, ni ranking, ni amigos, ni
  sincronización entre dispositivos, ni cuenta. Todo lo social está fuera de alcance salvo que se
  cambie la arquitectura.
- **No hay red.** Nada de videos, fuentes externas, mapas en línea ni analíticas. Si algún día se
  agrega algo que toque internet, la política de privacidad deja de ser cierta y hay que cambiarla.
- **Rediseñar el núcleo (cómo se calcula la XP, cómo se registra una rutina) es caro y riesgoso**,
  porque de eso depende la partida de cada jugador. Las funciones chicas y contenidas son baratas y
  seguras. Una buena propuesta se apoya en lo que ya existe.
- **Las partidas viejas tienen que seguir funcionando.** Todo dato nuevo necesita un valor por
  defecto razonable para quien ya viene jugando.
- La app tarda unos segundos en abrir en teléfonos medios (hay una pantalla de carga). No conviene
  sumar peso.

## 8. Pendientes y decisiones abiertas

**Para publicar en Play Store** (bloqueantes):
1. Correo de contacto en la política de privacidad (lo tiene que decidir Santiago).
2. La app vive en una subcarpeta; hay que renombrar el repositorio o usar un dominio propio.
3. Cuenta de Play Console, capturas y gráfico destacado.
4. 12 testers durante 14 días seguidos.

**Decisiones de diseño abiertas:**
- El calibre de las pruebas nuevas se escala con un factor de 0,6 que es una **estimación**. Hay
  que confirmarlo con datos reales: alguien que tenga una prueba vieja y una nueva del mismo
  ejercicio.
- La meta del día se puede bajar con el − de cada ejercicio, pero vuelve al valor original al día
  siguiente. Si alguien no llega nunca a una meta, la app le propone repetir la prueba cuando tres
  veces seguidas marca que la rutina le quedó "mucha"; no ajusta sola el volumen.
- Quedan textos en tuteo que deberían estar en voseo ("Conservas tu XP", "Pega aquí tu respaldo"…).
- Tamaño de texto ajustable: fuera de alcance por ahora, no descartado.
- Que el compañero se "escape" y corra por la pantalla para atraparlo quedó como idea para el
  resumen de la rutina, donde no hay nada en juego. Durante la rutina se asoma quieto, a propósito.
- La fuente "récord superado" de Primeras veces se dejó afuera a propósito: al principio casi toda
  sesión bate un récord y la lista se llenaría de ruido.
- Una notificación diaria no es viable sin servidor.

## 9. Cómo pasar una propuesta a Claude Code

Lo que se diseña acá se implementa en la PC. Para que llegue completo, cada propuesta termina con
este bloque, listo para copiar y pegar:

```
## Propuesta para Claude Code: <nombre corto>

Qué siente el jugador hoy: <el problema, desde la pantalla>
Qué cambia: <la mecánica en dos o tres frases>
Cómo pasa la tesis: <qué descubre el jugador de su cuerpo>
Qué ve en pantalla: <dónde, y los textos exactos en voseo>
Números: <XP, tiempos, límites, y de dónde salen>
Qué NO hace: <límites y casos que quedan afuera>
Con qué choca: <sistemas o principios que toca, y cómo se resuelve>
Cómo se prueba: <qué hacer en la app para verificar que funciona>
```
